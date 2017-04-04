import React from "react";
import { LineChart } from "react-d3-basic";

const SELECTED_LINE = {
  opacity: 1,
  strokeWidth: "3px"
};

const UNSELECTED_LINE = {
  opacity: 0.3,
  strokeWidth: "1px"
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.x = (d) => {
      return d.x;
    };

    let dataSet = [];
    for (let i = 0; i < 10; i++) {
      dataSet.push({
        x: i,
        anger: Math.random(),
        disgust: Math.random(),
        fear: Math.random(),
        joy: Math.random(),
        sadness: Math.random()

      });
    }

    this.state = {
      tones: [
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
      dataSet: dataSet
    }
  }

  componentDidMount() {
    let tones = this.state.tones;
    let legendItems = $(".legend").children();

    $(".legend").attr("style", `width: 200px; height: 500px`);
    for (let i = 0; i < tones.length; i++) {
      let tone = tones[i];
      $(legendItems[i]).attr("style", `top: ${166 + i * 40}px; right: 20px; width: 100px; height: 40px; display: inline-block;`);
      if (tone.selected) {
        tone.style = SELECTED_LINE;
        $(legendItems[i]).addClass("selected-legend");
      } else {
        tone.style = UNSELECTED_LINE;
        $(legendItems[i]).addClass("unselected-legend");
      }
    }

    $(".legend > .legend").click((e) => {
      this.updateTones(e);
    });
  }

  updateTones(e) {
    let tones = this.state.tones;
    let index = $(e.currentTarget).index();
    for (let i = 0; i < tones.length; i++) {
      let tone = tones[i];
      if (index === i) {
        if (tone.selected) {
          tone.style = UNSELECTED_LINE;
          tone.selected = false;
          $(e.currentTarget).removeClass("selected-legend");
          $(e.currentTarget).addClass("unselected-legend");
        } else {
          tone.style = SELECTED_LINE;
          tone.selected = true;
          $(e.currentTarget).removeClass("unselected-legend");
          $(e.currentTarget).addClass("selected-legend");
        }
      }
    }

    this.setState({tones: tones});
  }

  render() {

    return <div className="chart">
      Welcome to our awesome dashboard!
      <LineChart
        margins={{left: 100, right: 100, top: 50, bottom: 50}}
        data={this.state.dataSet}
        width={800}
        height={500}
        chartSeries={this.state.tones}
        x={this.x}
        showXGrid={false}
        showYGrid={false}
      />
    </div>;
  }
}

export default Dashboard;
