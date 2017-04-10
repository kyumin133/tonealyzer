import React from "react";
import ToneChart from "./tone_chart";

const SELECTED_LINE = {
  opacity: 1,
  strokeWidth: "4px",
};

const HOVER_LINE = {
  opacity: 0.7,
  strokeWidth: "3px",
}

const UNSELECTED_LINE = {
  opacity: 0.3,
  strokeWidth: "2px",
};


class ToneTrends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSets: []
    }

    this.changeSelectedIndex = this.changeSelectedIndex.bind(this);
    this.chartComponents = [];
  }

  componentWillMount() {
      this.analysisIndex = 0;

      this.titles = ["Emotion", "Language Style", "Social Tendencies"];
      this.fields = [
        [
          {
            field: 'anger',
            name: 'Anger',
            color: 'firebrick',
            style: SELECTED_LINE,
            selected: true
          },
          {
            field: 'disgust',
            name: 'Disgust',
            color: 'darkgreen',
            style: UNSELECTED_LINE,
            selected: false
          },
          {
            field: 'fear',
            name: 'Fear',
            color: 'darkviolet',
            style: UNSELECTED_LINE,
            selected: false
          },
          {
            field: 'joy',
            name: 'Joy',
            color: 'gold',
            style: UNSELECTED_LINE,
            selected: false
          },
          {
            field: 'sadness', //blue
            name: 'Sadness',
            color: 'steelblue',
            style: UNSELECTED_LINE,
            selected: false
          }
        ],

        [
          {
            field: 'analytical',
            name: 'Analytical',
            color: 'darkblue',
            style: SELECTED_LINE,
            selected: true
          },
          {
            field: 'confident',
            name: 'Confident',
            color: 'crimson',
            style: UNSELECTED_LINE,
            selected: false
          },
          {
            field: 'tentative',
            name: 'Tentative',
            color: 'darkgoldenrod',
            style: UNSELECTED_LINE,
            selected: false
          },
        ],
        [
          {
            field: 'openness',
            name: 'Openness',
            color: 'teal',
            style: SELECTED_LINE,
            selected: true
          },
          {
            field: 'conscientiousness',
            name: 'Conscientiousness',
            color: 'maroon',
            style: UNSELECTED_LINE,
            selected: false
          },
          {
            field: 'extraversion',
            name: 'Extraversion',
            color: 'indigo',
            style: UNSELECTED_LINE,
            selected: false
          },
          {
            field: 'agreeableness',
            name: 'Agreeableness',
            color: 'navy',
            style: UNSELECTED_LINE,
            selected: false
          },
          {
            field: 'emotionalRange',
            name: 'Emotional Range',
            color: 'chocolate',
            style: UNSELECTED_LINE,
            selected: false
          },
        ],
      ];
  }

  changeSelectedIndex(increment) {
    this.analysisIndex = (3 + this.analysisIndex + increment) % (3)

    // this.analysisIndex = analysisIndex;
    // this.currentAnalysis = this.analysisArr[analysisIndex];
    // this.updateChart();

    this.forceUpdate();
  }
  //
  // componentDidUpdate() {
  //   this.updateChart();
  // }

  componentDidMount() {
    this.props.fetchBlurbs();
    // this.updateChart();
  }

  componentWillReceiveProps(newProps) {
    if (!!newProps.blurbs) {
      let dataSets = [[], [], []];
      let blurbs = newProps.blurbs;
      for (let i = 0; i < Object.keys(blurbs).length; i++) {
        let key = Object.keys(blurbs)[i];
        if (!blurbs[key]) {
          continue;
        }
        
        if (!blurbs[key].analysis.document_tone) {
          continue;
        }

        let results = blurbs[key].analysis.document_tone.tone_categories;

        dataSets[0].push({
          x: key,
          anger: results[0].tones[0].score,
          disgust: results[0].tones[1].score,
          fear: results[0].tones[2].score,
          joy: results[0].tones[3].score,
          sadness: results[0].tones[4].score
        });

        dataSets[1].push({
          x: key,
          analytical: results[1].tones[0].score,
          confident: results[1].tones[1].score,
          tentative: results[1].tones[2].score,
        });

        dataSets[2].push({
          x: key,
          openness: results[2].tones[0].score,
          conscientiousness: results[2].tones[1].score,
          extraversion: results[2].tones[2].score,
          agreeableness: results[2].tones[3].score,
          emotionalRange: results[2].tones[4].score,
        });

      }
      // console.log(dataSets);
      this.setState({
        dataSets,
        blurbs
      });
      // this.setState
      // for (let i = 0; i < this.fields.length; i++) {
      //   this.chartComponents[i] =
      // }
    }
  }

  render() {
    if (!this.fields) {
      return null;
    }

    let index = this.analysisIndex;
    let chart;
    let counter = 0;
    counter += 1;
    if (!!this.state.dataSets[index] && this.state.dataSets[0].length > 0) {
      chart = (
      <div className="chart">
        <i className="fa fa-angle-left fa-5x chart-nav" aria-hidden="true" onClick={() => (this.changeSelectedIndex(-1))}></i>
        <ToneChart index={index} title={this.titles[index]} changeSelectedIndex={this.changeSelectedIndex} fields={this.fields[index]} dataSet={this.state.dataSets[index]} />
        <i className="fa fa-angle-right fa-5x chart-nav" aria-hidden="true" onClick={() => (this.changeSelectedIndex(1))}></i>
      </div>)
    // } else if (this.state.dataSets[0] && this.state.dataSets[0].length === 0) {
      // chart = <h2 className="graph-filler empty-chart chart-inner">Click the new 'New Analysis' button at the top to generate your tone trends graph here.</h2>
    } else if (counter > 1) {
      //TODO can we keep this from showing up before the graph is shown?
      chart = <h2 className="graph-filler empty-chart chart-inner">Click the new 'New Analysis' button at the top to generate your tone trends graph here.</h2>
      // chart = <div className="empty-chart">&nbsp;</div>;
    }

    return (
      <div className="dashboard-page">
        {chart}
      </div>);
  }
}

export default ToneTrends;
