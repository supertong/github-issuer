const React = require('react');

module.exports = SearchBox = React.createClass({
  handleChange: function() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  },
  render: function() {
    console.log('Rednered')
    return (
      <div className="col-md-12">
        <input
          type="text"
          value={this.props.filterText}
          className="form-control"
          placeholder="Search..."
          ref="filterTextInput"
          onChange={this.handleChange}
        />
      </div>
    );
  }
});
