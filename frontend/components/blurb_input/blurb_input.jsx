import React from 'react';
import LoadingIndicator from 'react-loading-indicator';

class BlurbInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      analysisLoading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  updateBody(e) {
    this.setState({
      body: e.target.value
    });
  }

  updateTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // debugger;
    if (this.state.title.length > 0 && this.state.body.length > 0) {
      this.setState({analysisLoading: true});
      setTimeout(() => {
        this.props.createBlurb(this.state.title, this.state.body);
        this.setState({analysisLoading: true});
      }, 3000);
    } else {
      this.errors = "Please create a title and enter text for the document body."
    }
  }

  render() {
    if (this.state.analysisLoading) {
      return (
        <div className='load-message'>
          <h3>Analyzing your Document</h3>
          <LoadingIndicator segmentWidth="50"/>
        </div>
      );
    }

    return (
      <div className="blurb-div">
        <form onSubmit={this.handleSubmit} className="new-blurb-form">
          <h1>New Document</h1>
          <input
            className='f-input-3'
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.updateTitle}
            placeholder="Title..."/>
          <div className="new-blurb-input-area">
            <textarea
              className='f-input-2'
              onChange={this.updateBody}
              value={this.state.body}
              placeholder="Document Body...">
            </textarea>
          </div>
          <div className="form-submit-2"
               onClick={this.handleSubmit}>
            <input
              type="submit"
              value="Analyze!"/>
          </div>
        </form>
      </div>
    );
  }
}


export default BlurbInput;
