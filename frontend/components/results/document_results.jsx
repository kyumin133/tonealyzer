import React from "react";
import { BarHorizontalChart } from "react-d3-basic";
const DESCRIPTIONS = {
  anger: "Likelihood of being perceived as angry.",
  disgust: "Likelihood of being perceived as disgusted.",
  fear: "Likelihood of being perceived as scared.",
  joy: "Likelihood of being perceived as happy.",
  sadness: "Likelihood of being perceived as sad.",
  analytical: "Likelihood of being perceived as intellectual, rational, systematic, emotionless, or impersonal.",
  confident: "Likelihood of being perceived as assured, collected, hopeful, or egotistical.",
  tentative: "Likelihood of being perceived as questionable, doubtful, limited, or debatable.",
  openness_big5: "Likelihood of being perceived as open to experiences for a variety of activities.",
  conscientiousness_big5: "Likelihood of being perceived as someone who would act in an organized or thoughtful way.",
  extraversion_big5: "Likelihood of being perceived as someone who would seek stimulation in the company of others.",
  agreeableness_big5: "Likelihood of being perceived as compassionate and cooperative towards others.",
  emotional_range_big5: "Likelihood of being perceived as someone sensitive to the environment."
}

class DocumentResults extends React.Component {
  constructor(props) {
    super(props);
    this.blurb = {
      "document_tone": {
        "tone_categories": [
          {
            "tones": [
              {
                "score": 0.52071,
                "tone_id": "anger",
                "tone_name": "Anger"
              },
              {
                "score": 0.086613,
                "tone_id": "disgust",
                "tone_name": "Disgust"
              },
              {
                "score": 0.1711,
                "tone_id": "fear",
                "tone_name": "Fear"
              },
              {
                "score": 0.116554,
                "tone_id": "joy",
                "tone_name": "Joy"
              },
              {
                "score": 0.636207,
                "tone_id": "sadness",
                "tone_name": "Sadness"
              }
            ],
            "category_id": "emotion_tone",
            "category_name": "Emotion Tone",
            index: 0
          },
          {
            "tones": [
              {
                "score": 0.306013,
                "tone_id": "analytical",
                "tone_name": "Analytical"
              },
              {
                "score": 0.138352,
                "tone_id": "confident",
                "tone_name": "Confident"
              },
              {
                "score": 0.70327,
                "tone_id": "tentative",
                "tone_name": "Tentative"
              }
            ],
            "category_id": "language_tone",
            "category_name": "Language Tone",
            index: 1
          },
          {
            "tones": [
              {
                "score": 0.195074,
                "tone_id": "openness_big5",
                "tone_name": "Openness"
              },
              {
                "score": 0.631838,
                "tone_id": "conscientiousness_big5",
                "tone_name": "Conscientiousness"
              },
              {
                "score": 0.977727,
                "tone_id": "extraversion_big5",
                "tone_name": "Extraversion"
              },
              {
                "score": 0.939484,
                "tone_id": "agreeableness_big5",
                "tone_name": "Agreeableness"
              },
              {
                "score": 0.778736,
                "tone_id": "emotional_range_big5",
                "tone_name": "Emotional Range"
              }
            ],
            "category_id": "social_tone",
            "category_name": "Social Tone",
            index: 2
          }
        ]
      }
    };

    let dataSets = [];
    let results = this.blurb.document_tone.tone_categories;
    let keys = Object.keys(results);

    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      dataSets.push(result.tones);
    }

    this.state = {
      dataSets,
      hoverBox: {
        class: "hidden"
      }
    }

    this.y = (d) => {
      return d.tone_name;
    }

    this.chartSeries = [
      {
        field: "score",
        name: "Score"
      }
    ]


  }

  showHover(e, chartIndex) {
    let index = $(e.currentTarget).index();
    let offset = $(e.currentTarget).offset();
    let field = this.state.dataSets[chartIndex][index];

    let value = Math.round(1000 * field.score) / 1000;

    let likelihood = " (unlikely)";
    let likelihoodClass = "unlikely";

    if (value >= 0.75) {
      likelihood = " (very likely)";
      likelihoodClass = "very-likely";
    } else if (value >= 0.5) {
      likelihood = " (likely)";
      likelihoodClass = "likely";
    }


    this.setState({
      hoverBox: {
        name: field.tone_name,
        value: `${value} ${likelihood}`,
        likelihoodClass,
        description: DESCRIPTIONS[field.tone_id],
        class: "hover-box",
        style: {
          left: offset.left,
          top: offset.top + parseInt($(e.currentTarget).attr("height")) + 5
        }
      }
    });
  }

  componentDidMount() {
    if (!!this.blurb) {
      $(".results-emotion .bar").off();
      $(".results-language .bar").off();
      $(".results-social .bar").off();

      $(".results-emotion .bar").mouseenter((e) => {
        this.showHover(e, 0);
      });

      $(".results-language .bar").mouseenter((e) => {
        this.showHover(e, 1);
      });

      $(".results-social .bar").mouseenter((e) => {
        this.showHover(e, 2);
      });

      $(".bar").mouseleave((e) => {
        this.setState({
          hoverBox: {
            class: "hidden-hover-box"
          }
        })
      });
    }
  }

  render() {
    let hoverBox = this.state.hoverBox;

    return <div className="dashboard-page">
        <div className={hoverBox.class} style={hoverBox.style}>
          <div className="hover-header">
            <span className="hover-name">{hoverBox.name}</span>
            <span className={hoverBox.likelihoodClass}>{hoverBox.value}</span>
          </div>
          <div className="hover-description">{hoverBox.description}</div>
        </div>
        <div className="chart-wrapper">
          <div className="results-title-wrapper">
            <span className="results-title">Emotion</span>
          </div>
          <BarHorizontalChart
            margins={{left: 60, right: 0, top: 0, bottom: 60}}
            data={this.state.dataSets[0]}
            width={270}
            height={300}
            chartSeries={this.chartSeries}
            xTicks={[6]}
            xDomain={[0, 1]}
            y={this.y}
            yScale = {'ordinal'}
            showXGrid={false}
            showYGrid={false}
            showLegend={false}
            svgClassName={"results-emotion"}
          />
      </div>
      <div className="chart-wrapper">
        <div className="results-title-wrapper">
          <span className="results-title">Language Style</span>
        </div>
        <BarHorizontalChart
            margins={{left: 80, right: 0, top: 0, bottom: 60}}
            data={this.state.dataSets[1]}
            width={290}
            height={300}
            chartSeries={this.chartSeries}
            xTicks={[6]}
            xDomain={[0, 1]}
            yTickSize={[100]}
            y={this.y}
            yScale = {'ordinal'}
            showXGrid={false}
            showYGrid={false}
            showLegend={false}
            svgClassName={"results-language"}
          />
      </div>
      <div className="chart-wrapper">
        <div className="results-title-wrapper">
          <span className="results-title">Social Tendencies</span>
        </div>
        <BarHorizontalChart
            margins={{left: 120, right: 0, top: 0, bottom: 60}}
            data={this.state.dataSets[2]}
            width={330}
            height={300}
            chartSeries={this.chartSeries}
            xTicks={[6]}
            xDomain={[0, 1]}
            y={this.y}
            yScale = {'ordinal'}
            showXGrid={false}
            showYGrid={false}
            showLegend={false}
            svgClassName={"results-social"}
          />
      </div>
    </div>;
  }
}

export default DocumentResults;
