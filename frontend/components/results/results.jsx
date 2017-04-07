import React from "react";
import DocumentResults from "./document_results";
import SentenceResults from "./sentence_results";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blurb: {},
      tabClasses: [
        "results-tab selected-results-tab",
        "results-tab unselected-results-tab"
      ],
      selectedIndex: 0,
    };

    this.components = [
      <DocumentResults blurb={this.props.blurb}/>,
      <SentenceResults blurb={this.props.blurb}/>
    ];

    this.clickTab = this.clickTab.bind(this);
  }

  clickTab(e) {
    let index = $(e.currentTarget).index();
    if (index === this.state.selectedIndex) {
      return;
    }

    let tabClasses = this.state.tabClasses;
    for (let i = 0; i < tabClasses.length; i++) {
      if (i === index) {
        tabClasses[i] = "results-tab selected-results-tab";
      } else {
        tabClasses[i] = "results-tab unselected-results-tab";
      }
    }

    this.setState({
      selectedIndex: index,
      tabClasses: tabClasses
    });
  }

  componentDidMount() {
    this.props.fetchBlurb(this.props.params.blurbId);
  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps.blurb);
    this.components[0] = <DocumentResults blurb={newProps.blurb}/>;
    this.setState({
      blurb: newProps.blurb
    });
  }

  render() {
    return <div className="results">
        <div className="results-tabs">
          <div className={this.state.tabClasses[0]} onClick={this.clickTab}>Document Level</div>
          <div className={this.state.tabClasses[1]} onClick={this.clickTab}>Sentence Level</div>
        </div>
        {this.components[this.state.selectedIndex]}
      </div>;
  }

}

export default Results;
