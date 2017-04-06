import React from "react";
import { BarHorizontalChart } from "react-d3-basic";

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
                "score": 0,
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
      dataSets
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
  render() {
    return <div className="dashboard-page">
      <BarHorizontalChart
        margins={{left: 60, right: 60, top: 60, bottom: 60}}
        data={this.state.dataSets[0]}
        width={300}
        height={300}
        chartSeries={this.chartSeries}
        y={this.y}
        yScale = {'ordinal'}
        showXGrid={false}
        showYGrid={false}
        showLegend={false}
      />
    <BarHorizontalChart
        margins={{left: 60, right: 60, top: 60, bottom: 60}}
        data={this.state.dataSets[1]}
        width={300}
        height={300}
        chartSeries={this.chartSeries}
        y={this.y}
        yScale = {'ordinal'}
        showXGrid={false}
        showYGrid={false}
        showLegend={false}
      />
    <BarHorizontalChart
        margins={{left: 60, right: 60, top: 60, bottom: 60}}
        data={this.state.dataSets[2]}
        width={300}
        height={300}
        chartSeries={this.chartSeries}
        y={this.y}
        yScale = {'ordinal'}
        showXGrid={false}
        showYGrid={false}
        showLegend={false}
      />
    </div>;
  }
}

export default DocumentResults;
