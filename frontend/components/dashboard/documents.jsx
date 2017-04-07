import React from "react";
import javascript_time_ago from 'javascript-time-ago';
import { Link } from "react-router";

javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')
const time_ago_english = new javascript_time_ago('en-US')

class Documents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: this.props.blurbs
    }
    // this.state = {
    //   documents: [
    //     {
    //       title: "My first document",
    //       date: "2017-04-05T12:54:14.351Z"
    //     },
    //     {
    //       title: "My second document",
    //       date: "2017-04-01T11:01:05.019Z"
    //     },
    //     {
    //       title: "My third document",
    //       date: "2017-03-31T08:16:25.752Z"
    //     },
    //     {
    //       title: "My fourth document",
    //       date: "2017-03-27T01:28:45.248Z"
    //     },
    //     {
    //       title: "My fifth document",
    //       date: "2017-03-23T01:36:45.752Z"
    //     }
    //   ]
    // }
  }

  render() {

    let documentsArr = [];
    // for (let i = 0; i < this.state.documents.length; i++) {
    //   let document = this.state.documents[i];
    //   let li = <li key={i} className="documents-index-item">
    //     <div className="document-title">{document[3].title}</div>
    //     <div className="document-date">{time_ago_english.format(new Date(document[3].date))}</div>
    //   </li>;
    //   documentsArr.push(li);

    for (let key in this.state.documents) {
      let document = this.state.documents[key];
      // debugger;

      let li = <li key={key} className="documents-index-item">
        <Link onClick={this.forceUpdate} className="document-link" to={`results/${key}`} >
          <div className="document-title">{document.title}</div>
          <div className="document-body">{document.body.slice(0, 50)}...</div>
          <div className="document-date">{time_ago_english.format(new Date(document.created_at))}</div>
        </Link>
      </li>;
      documentsArr.push(li);
    }

    return <div className="documents-page">
      <div className="documents-title">
        {documentsArr.length} documents
      </div>
      <div className="documents-index">
        <ul className="documents-index-ul">{documentsArr}</ul>
      </div>
    </div>;
  }
}

export default Documents;
