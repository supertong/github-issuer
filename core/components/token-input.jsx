const React = require('react');

module.exports = React.createClass({
  render: function() {
    if (this.props.token) {
      var placeholder = 'Current token ends with ****' + this.props.token.slice(-4);
    } else {
      var placeholder = 'Put your Github private token here';
    }

    return (
      <div className="input-group">
        <span className="input-group-addon">Private Token</span>
        <input id="github-token" type="text" className="form-control" placeholder={placeholder} />
      </div>
    );
  }
});
