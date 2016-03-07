const React = require('react');
const Clipboard = require('clipboard');

new Clipboard('.clipboard-item');

module.exports = React.createClass({
  render: function() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-9">
            <a href={this.props.html_url} target="_blank">{this.props.title}</a>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3">
            <button
              className="btn btn-xs btn-info clipboard-item"
              data-clipboard-action="copy"
              data-clipboard-text={this.props.html_url}>
              Copy Link
            </button>
          </div>
        </div>
              </li>
    );
  }
});
