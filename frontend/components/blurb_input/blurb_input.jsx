import React from 'react';

class BlurbInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
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
    return this.props.createBlurb(this.state.title, this.state.body);
  }

  render() {


    return (
      <div>
        <form onSubmit={this.handleSubmit} className="new-blurb-form">
          <h1>Submit a new Document:</h1>
          <br/>
          <input
            className='f-input-3'
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.updateTitle}
            placeholder="Enter Title Here..."
          />
          <br/>
          <textarea
            className='f-input-2'
            onChange={this.updateBody}
            value={this.state.body}
            placeholder="Enter Document to be Analyzed Here"
          >
          </textarea>
          <div className="form-submit">
            <input
              type="submit"
              value="Analyze!"
              onClick={this.handleSubmit}
            />
          </div>

        </form>
      </div>

    );

  }

}


export default BlurbInput;
