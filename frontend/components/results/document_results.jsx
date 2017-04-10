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
  neuroticism_big5: "Likelihood of being perceived as someone sensitive to the environment."
}

class DocumentResults extends React.Component {
  constructor(props) {
    super(props);

    this.y = (d) => {
      return d.tone_name;
    };

    this.chartSeries = [
      {
        field: "score",
        name: "Score"
      }
    ];

    this.state = {
      hoverBox: {
        class: "hidden-hover-box"
      }
    };

    this.showHover = this.showHover.bind(this);
    this.hideHover = this.hideHover.bind(this);
  }

  showHover(e, chartIndex) {
    if (e.target.nodeName === "rect") {
      let index = $(e.target).index();
      let offset = $(e.target).offset();
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

      let hoverBox = {
        name: field.tone_name,
        value: `${value} ${likelihood}`,
        likelihoodClass,
        description: DESCRIPTIONS[field.tone_id],
        class: "hover-box",
        style: {
          left: offset.left,
          top: offset.top + parseInt($(e.target).attr("height")) + 5
        }
      }


      this.setState({
        hoverBox
      });
    }

  }

  hideHover(e) {
    this.setState({
        hoverBox: {
          class: "hidden-hover-box"
        }
      });
  }

  componentWillReceiveProps(newProps) {
    if (!!newProps.blurb) {
      if (!!this.props.blurb) {
        if (newProps.blurb.id === this.props.blurb.id) {
          return;
        }
      }

      this.updateDatasets(newProps.blurb);
      this.setState({
        blurb: newProps.blurb
      });
    }
    this.updateListeners();
  }

  componentDidUpdate() {
    this.updateListeners();
  }

  componentDidMount() {
    if (!!this.props.blurb) {
      this.updateDatasets(this.props.blurb);
    }
    // this.updateListeners();
  }

  updateDatasets(blurb) {
    let dataSets = [];
    let results = blurb.analysis.document_tone.tone_categories;
    let keys = Object.keys(results);

    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      dataSets.push(result.tones);
    }
    this.setState({
      dataSets
    });

  }

  updateListeners() {
    // if (this.state.hoverBox.class === "hover-box") {
    //   return;
    // }
    // $(".results-emotion .bar").off();
    // $(".results-language .bar").off();
    // $(".results-social .bar").off();
    //
    // $(".results-emotion .bar").mouseenter((e) => {
    //   this.showHover(e, 0);
    // });
    //
    // $(".results-language .bar").mouseenter((e) => {
    //   this.showHover(e, 1);
    // });
    //
    // $(".results-social .bar").mouseenter((e) => {
    //   this.showHover(e, 2);
    // });
    //
    // $(".bar").mouseleave((e) => {
    //   this.setState({
    //     hoverBox: {
    //       class: "hidden-hover-box"
    //     }
    //   })
    // });
    // this.forceUpdate();
  }

  render() {
    if ((!this.props.blurb) || (!this.state.dataSets)) {
      return (<div></div>);
    }

    let hoverBox = this.state.hoverBox;

    return <div className="results-page">
        <div className="chart-wrapper" onMouseOver={(e) => (this.showHover(e, 2))} onMouseLeave={this.hideHover}>
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
      <div className="chart-wrapper" onMouseOver={(e) => (this.showHover(e, 2))} onMouseLeave={this.hideHover}>
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
      <div className="chart-wrapper" onMouseOver={(e) => (this.showHover(e, 2))} onMouseLeave={this.hideHover}>
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
      <div className={hoverBox.class} style={hoverBox.style}>
        <div className="hover-header">
          <span className="hover-name">{hoverBox.name}</span>
          <span className={hoverBox.likelihoodClass}>{hoverBox.value}</span>
        </div>
        <div className="hover-description">{hoverBox.description}</div>
      </div>
    </div>;
  }
}

export default DocumentResults;
