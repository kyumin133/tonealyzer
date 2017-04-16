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

    this.fields = this.props.fields;
    this.title = this.props.title;

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleClick(e) {
    let target = e.target;
    if (($(target).hasClass("legend")) || ($(target).hasClass("line"))) {
      this.updateResults(target);
    } else if ($(target.parentNode).hasClass("legend")) {
      this.updateResults(target.parentNode);
    }
  }

  handleMouseOver(e) {
    let target = e.target;
    if ($(target).hasClass("legend")) {
      this.hoverLine(target);
    } else if ($(target.parentNode).hasClass("legend")) {
      this.hoverLine(target.parentNode);
    } else if ($(target).hasClass("line")) {
      this.hoverLine(target)
    } else {
      this.hideHoverLine();
    }
  }

  handleMouseLeave(e) {
    let target = e.target;
    if ($(target).hasClass("legend")) {
      this.hoverLine(target);
    } else if ($(target.parentNode).hasClass("legend")) {
      this.hoverLine(target.parentNode);
    } else if ($(target).hasClass("line")) {
      this.hideHoverLine(target)
    }
  }

  componentWillReceiveProps(newProps) {
    // let analysis = newProps.analysis;
    this.fields = newProps.fields;
    this.setState({
      dataSet: newProps.dataSet
    })
  }

  componentWillMount() {
    this.setState({
      dataSet: this.props.dataSet
    });
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    this.updateLegend();
    // this.updateListeners();
  }

  updateLegend() {
    let results = this.fields;
    let legendItems = $(".legend:first-of-type").children();

    $(".legend:first-of-type").attr("style", `width: 250px; height: 500px`);
    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      $(legendItems[i]).attr("style", `top: ${101 + i * 40}px; right: 20px; width: 250px; height: 40px; display: inline-block;`);
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

  // hoverLegend(target) {
  //
  // }

  hoverLine(target) {
    let results = this.fields;
    let index = $(target).index();
    let result = results[index];
    if (!result.selected) {
      result.style = HOVER_LINE;
    }

    this.forceUpdate();
  }

  hideHoverLine(target) {
    if (!target) {
      for (let i = 0; i < this.fields.length; i++) {
        let result = this.fields[i];
        if (!result.selected) {
          result.style = UNSELECTED_LINE;
        }
      }
    } else {
      let results = this.fields;
      let index = $(target).index();
      let result = results[index];
      if (!result.selected) {
        result.style = UNSELECTED_LINE;
      }
    }
    this.forceUpdate();
  }

  updateListeners() {
    // $(".legend > .legend").off();
    // $(".legend > .legend").click((e) => {
    //   this.updateResults(e);
    // });
    //
    // $(".legend > .legend").mouseenter((e) => {
    //   let results = this.fields;
    //   let index = $(e.currentTarget).index();
    //   let result = results[index];
    //   if (!result.selected) {
    //     result.style = HOVER_LINE;
    //   }
    //   this.forceUpdate();
    // });
    //
    // $(".legend > .legend").mouseleave((e) => {
    //   let results = this.fields;
    //   let index = $(e.currentTarget).index();
    //   let result = results[index];
    //   if (!result.selected) {
    //     result.style = UNSELECTED_LINE;
    //   }
    //   this.forceUpdate();
    // });
    //
    // $(".line").off();
    // $(".line").click((e) => {
    //   this.updateResults(e);
    // });
    //
    // $(".line").mouseover((e) => {
    //   let results = this.fields;
    //   let index = $(e.currentTarget).index();
    //   let result = results[index];
    //   if (!result.selected) {
    //     result.style = HOVER_LINE;
    //   }
    //   this.forceUpdate();
    // });
    //
    // $(".line").mouseleave((e) => {
    //   let results = this.fields;
    //   let index = $(e.currentTarget).index();
    //   let result = results[index];
    //   if (!result.selected) {
    //     result.style = UNSELECTED_LINE;
    //   }
    //   this.forceUpdate();
    // });
    //
    // $(document).off("keydown");
  }

  updateResults(target) {
    let results = this.fields;
    let index = $(target).index();
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
    if ((!this.fields) || (!this.title) || (this.state.dataSet.length === 0) || (this.props.index === undefined)) {
      return (<div className="empty-chart">&nbsp;</div>);
    }

    let circles = [];
    for (let i = 0; i < 3; i++) {
      if (i === this.props.index) {
        circles.push(<div key={i} className="circle selected-circle">&nbsp;</div>)
      } else {
        circles.push(<div key={i} className="circle unselected-circle">&nbsp;</div>)
      }
    }

    return <div className="chart-inner" onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
      <span className="chart-title">{this.props.title}</span>
      <LineChart
        margins={{left: 100, right: 100, top: 50, bottom: 50}}
        data={this.state.dataSet}
        width={750}
        height={400}
        chartSeries={this.fields}
        x={this.x}
        xTicks={[0]}
        xLabel={"Submission"}
        yTicks={[11]}
        yDomain={[0, 1]}
        yLabel={"Score"}
        showXGrid={false}
        showYGrid={false}
      />
      <span className="circles">
        {circles}
      </span>
    </div>
  }
}

export default ToneChart;
