const React = require('react');
const Clipboard = require('clipboard');

new Clipboard('.clipboard-item');

module.exports = React.createClass({
  render: function() {
    console.log(this.props);
    return (
      <li className="list-group-item">
        <a href={this.props.html_url} target="_blank">{this.props.title}</a>
        <button className="btn btn-info clipboard-item" data-clipboard-action="copy" data-clipboard-text={this.props.html_url}>Copy Link</button>
      </li>
    );
  }
});
