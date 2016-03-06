const React = require('react');
const IssueItem = require('./issue-item');
const _ = require('lodash');

module.exports = IssueList = React.createClass({
  render: function() {
    var list = this.props.issueData.map(function(issue) {
      return <IssueItem {...issue} key={issue.id} />
    });
    return (
      <ul className="list-group">
        {list}
      </ul>
    );
  }
});
