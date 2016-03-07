const React = require('react');
const ReactDom = require('react-dom');
const IssueList = require('./components/issue-list');
const SearchBox = require('./components/search-box');
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
        issueData: data
      });
    }.bind(this));
  },
  handleUserInput: function(filterText) {
    this.setState({
      filterText: filterText
    });
  },
  render: function() {
    return (
      <div className="row">
        <SearchBox
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <IssueList
          issueData={this.state.issueData}
          filterText={this.state.filterText}
        />
      </div>
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
