import React from "react";
import { LineChart } from "react-d3-basic";

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
    this.x = (d) => {
      return d.x;
    };


    this.state = {
      emotion: {
        fields: [
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
        title: "Emotion"
      },

      languageStyle: {
        fields: [
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
        title: "Language Style"
      },

      socialTendencies: {
        fields: [
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
        title: "Social Tendencies"
      },
      analysisIndex: 0
    }

    this.analysisArr = [this.state.emotion, this.state.languageStyle, this.state.socialTendencies];

    this.changeSelectedIndex = this.changeSelectedIndex.bind(this);
    // this.updateLegend();
    // this.updateListeners();
  }

  changeSelectedIndex(increment) {
    this.setState({
      analysisIndex: (this.analysisArr.length + this.state.analysisIndex + increment) % (this.analysisArr.length)
    });
    this.updateLegend();
    this.updateListeners();
    // console.log(this.state.analysisIndex);
    this.forceUpdate();
  }


  updateLegend() {
    let results = this.analysisArr[this.state.analysisIndex].fields;
    let legendItems = $(".legend").children();

    $(".legend").attr("style", `width: 250px; height: 500px`);
    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      $(legendItems[i]).attr("style", `top: ${141 + i * 40}px; right: 20px; width: 150px; height: 40px; display: inline-block;`);
      if (result.selected) {
        result.style = SELECTED_LINE;
        $(legendItems[i]).removeClass("unselected-legend");
        $(legendItems[i]).addClass("selected-legend");
      } else {
        result.style = UNSELECTED_LINE;
        $(legendItems[i]).removeClass("selected-legend");
        $(legendItems[i]).addClass("unselected-legend");
      }
    }
  }

  updateListeners() {
    $(".legend > .legend").off();
    $(".legend > .legend").click((e) => {
      this.updateResults(e);
    });

    $(".legend > .legend").mouseenter((e) => {
      let results = this.analysisArr[this.state.analysisIndex].fields;
      let index = $(e.currentTarget).index();
      let result = results[index];
      if (!result.selected) {
        result.style = HOVER_LINE;
      }
      this.forceUpdate();
    });

    $(".legend > .legend").mouseleave((e) => {
      let results = this.analysisArr[this.state.analysisIndex].fields;
      let index = $(e.currentTarget).index();
      let result = results[index];
      if (!result.selected) {
        result.style = UNSELECTED_LINE;
      }
      this.forceUpdate();
    });

    $(".line").off();
    $(".line").click((e) => {
      this.updateResults(e);
    });

    $(".line").mouseenter((e) => {
      let results = this.analysisArr[this.state.analysisIndex].fields;
      let index = $(e.currentTarget).index();
      let result = results[index];
      if (!result.selected) {
        result.style = HOVER_LINE;
      }
      this.forceUpdate();
    });

    $(".line").mouseleave((e) => {
      let results = this.analysisArr[this.state.analysisIndex].fields;
      let index = $(e.currentTarget).index();
      let result = results[index];
      if (!result.selected) {
        result.style = UNSELECTED_LINE;
      }
      this.forceUpdate();
    });

    $(document).off("keydown");
    $(document).keydown((e) => {
      if (e.keyCode === 37) {
        // console.log("left");
        this.changeSelectedIndex(-1);
      } else if (e.keyCode === 39) {
        // console.log("right");
        this.changeSelectedIndex(1);
      }
    })
  }

  componentDidUpdate() {
    this.updateLegend();
    this.updateListeners();
  }

  componentDidMount() {
    this.props.fetchBlurbs();
    this.updateLegend();
    this.updateListeners();
  }

  componentWillReceiveProps(newProps) {
    if (!!newProps.blurbs) {
      let dataSet = [];
      let blurbs = newProps.blurbs;
      // console.log(blurbs);
      for (let i in Object.keys(blurbs)) {
        if (!blurbs[i]) {
          continue;
        }

        let results = blurbs[i].analysis.document_tone.tone_categories;
        // console.log(results[1].tones[0]);
        dataSet.push({
          x: i,
          anger: results[0].tones[0].score,
          disgust: results[0].tones[1].score,
          fear: results[0].tones[2].score,
          joy: results[0].tones[3].score,
          sadness: results[0].tones[4].score,
          analytical: results[1].tones[0].score,
          confident: results[1].tones[1].score,
          tentative: results[1].tones[2].score,
          openness: results[2].tones[0].score,
          conscientiousness: results[2].tones[1].score,
          extraversion: results[2].tones[2].score,
          agreeableness: results[2].tones[3].score,
          emotionalRange: results[2].tones[4].score,
        });
      }
      this.setState({
        dataSet
      });
    }
  }

  updateResults(e) {
    let results = this.analysisArr[this.state.analysisIndex].fields;
    let index = $(e.currentTarget).index();
    let result = results[index];

    let legendItems = $(".legend").children();

    if (result.selected) {
      result.style = UNSELECTED_LINE;
      result.selected = false;
      $(legendItems[index]).removeClass("selected-legend");
      $(legendItems[index]).addClass("unselected-legend");
    } else {
      result.style = SELECTED_LINE;
      result.selected = true;
      $(legendItems[index]).removeClass("unselected-legend");
      $(legendItems[index]).addClass("selected-legend");
    }

    this.forceUpdate();
  }

  render() {
    if (!this.state.dataSet) {
      return <div></div>;
    }

    let analysis = this.analysisArr[this.state.analysisIndex];

    let circles = [];
    for (let i = 0; i < this.analysisArr.length; i++) {
      if (i === this.state.analysisIndex) {
        circles.push(<div key={i} className="circle selected-circle">&nbsp;</div>)
      } else {
        circles.push(<div key={i} className="circle unselected-circle">&nbsp;</div>)
      }
    }

    return <div className="dashboard-page">
      <div className="chart">
        <i className="fa fa-angle-left fa-5x chart-nav" aria-hidden="true" onClick={() => (this.changeSelectedIndex(-1))}></i>
        <div className="chart-inner">
          <span className="chart-title">{analysis.title}</span>
          <LineChart
            margins={{left: 100, right: 100, top: 50, bottom: 50}}
            data={this.state.dataSet}
            width={750}
            height={400}
            chartSeries={analysis.fields}
            x={this.x}
            showXGrid={false}
            showYGrid={false}
          />
          <span className="circles">
            {circles}
          </span>
        </div>
      <i className="fa fa-angle-right fa-3x chart-nav" aria-hidden="true" onClick={() => (this.changeSelectedIndex(1))}></i>
      </div>
    </div>;
  }
}

export default ToneTrends;
