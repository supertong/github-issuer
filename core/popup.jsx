const React = require('react');
const ReactDom = require('react-dom');
const IssueList = require('./components/issue-list');
const api = require('./helper/github-api');

const Popup = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      issueData: []
    };
  },
  componentDidMount: function() {
    api.retriveIssues(this.props.apiToken, function(err, data) {
      console.log(data);
      this.setState({
        filterText: '',
        issueData: data
      });
    }.bind(this));
  },
  render: function() {
    return (
      <IssueList issueData={this.state.issueData}/>
    );
  }
});

chrome.storage.sync.get('token', function(item) {
  if (typeof item === 'undefined') {
    console.log('No token found!!!!');
  }
  const token = item.token;
  ReactDom.render(<Popup apiToken={token}/>, document.querySelector('#popup-content'));
});
