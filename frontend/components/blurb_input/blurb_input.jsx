import React from 'react';

class BlurbInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  updateForm(e) {
    this.setState({
      body: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    return this.props.createBlurb(this.state.body);
  }

  render() {


    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Submit a new sample!</h1>
          <textarea
            onChange={this.updateForm}
          >
          </textarea>

          <input
            type="submit"
            value="Submit!"
          />

        </form>
      </div>

    );

  }

}


export default BlurbInput;
