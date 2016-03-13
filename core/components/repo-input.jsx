const React = require('react');

module.exports = React.createClass({
  handleChange: function() {
    this.props.onUserInput(this.refs.repoString.value);
  },
  render: function() {
    return (
      <div className="input-group">
        <span className="input-group-addon">Repos</span>
        <input
          id="repos"
          type="textarea"
          className="form-control"
          placeholder="Tracking Repos seperated with ',' For example: user1/repo1,user2/repo2"
          ref="repoString"
          onChange={this.handleChange}
          value={this.props.repos} />
      </div>
    );
  }
});
