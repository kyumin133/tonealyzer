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


class ToneChart extends React.Component {
  constructor(props) {
    super(props);
    this.x = (d) => {
      return d.x;
    };
    this.state = {
      dataSet: []
    };
  }

  componentWillReceiveProps(newProps) {
    // let analysis = newProps.analysis;
    this.fields = newProps.fields;
    // this.updateChart();
    this.setState({
      dataSet: newProps.dataSet
    })
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    this.updateLegend();
    this.updateListeners();
  }

  updateLegend() {
    let results = this.fields;
    let legendItems = $(".legend:first-of-type").children();

    $(".legend:first-of-type").attr("style", `width: 250px; height: 500px`);
    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      $(legendItems[i]).attr("style", `top: ${101 + i * 40}px; right: 20px; width: 150px; height: 40px; display: inline-block;`);
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
      let results = this.fields;
      let index = $(e.currentTarget).index();
      let result = results[index];
      if (!result.selected) {
        result.style = HOVER_LINE;
      }
      this.forceUpdate();
    });

    $(".legend > .legend").mouseleave((e) => {
      let results = this.fields;
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

    $(".line").mouseover((e) => {
      let results = this.fields;
      let index = $(e.currentTarget).index();
      let result = results[index];
      if (!result.selected) {
        result.style = HOVER_LINE;
      }
      this.forceUpdate();
    });

    $(".line").mouseleave((e) => {
      let results = this.fields;
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
        this.props.changeSelectedIndex(-1);
      } else if (e.keyCode === 39) {
        this.props.changeSelectedIndex(1);
      }
    })
  }

  updateResults(e) {
    let results = this.fields;
    let index = $(e.currentTarget).index();
    let result = results[index];

    let legendItems = $(".legend:first-of-type").children();

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
    if (this.state.dataSet.length === 0) {
      return <div className="empty-chart">&nbsp;</div>;
    }

    return <LineChart
        margins={{left: 100, right: 100, top: 50, bottom: 50}}
        data={this.state.dataSet}
        width={750}
        height={400}
        chartSeries={this.fields}
        x={this.x}
        showXGrid={false}
        showYGrid={false}
      />;
  }
}

export default ToneChart;
