const React = require('react');
const ReactDom = require('react-dom');
const TokenInput = require('./components/token-input');
const RepoInput = require('./components/repo-input');

const OptionsForm = React.createClass({
  getInitialState: function() {
    return {
      githubToken: '',
      trackingRepos: ''
    };
  },
  componentDidMount: function() {
    chrome.storage.sync.get('options', function(item) {
      console.log(item);
      this.setState({
        githubToken: item.options.token,
        trackingRepos: item.options.repos
      });
    }.bind(this));
  },
  saveButtonAction: function() {
    var token = document.querySelector('#github-token').value;
    var repos = document.querySelector('#repos').value;

    var options = {
      token: token || this.state.githubToken,
      repos: repos
    }

    chrome.storage.sync.set({'options': options}, function() {
      console.log(options);
      this.setState({
        githubToken: options.token,
        trackingRepos: options.repos
      });

      window.close();
    }.bind(this));
  },
  repoInputChange: function(repoString) {
    this.setState({
      trackingRepos: repoString
    });
  },
  render: function() {
    return (
      <div>
        <TokenInput token={this.state.githubToken} />
        <RepoInput
          repos={this.state.trackingRepos}
          onUserInput={this.repoInputChange} />
        <hr />
        <button className="btn btn-default" onClick={this.saveButtonAction}>Save</button>
      </div>
    );
  }
});


  ReactDom.render(<OptionsForm />, document.querySelector('#options-form'));
