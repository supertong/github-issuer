const React = require('react');
const IssueItem = require('./issue-item');

module.exports = IssueList = React.createClass({
  render: function() {
    var list = [];
    this.props.issueData.forEach(function(issue) {
      if (issue.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }
      list.push(<IssueItem {...issue} key={issue.id} />);
    }.bind(this));

    console.log(list);
    return (
      <div className="col-md-12">
        <ul className="list-group">
          {list}
        </ul>
      </div>
    );
  }
});
