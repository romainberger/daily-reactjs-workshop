/** @jsx React.DOM */

'use strict';

var App = {
    session: false
  , user:    false
}

DM.init({
    apiKey: 'API Key'
  , status: true
  , cookie: true
})

var LoginBox = React.createClass({displayName: 'LoginBox',
  getInitialState: function() {
    return {logged: false}
  },
  componentWillMount: function() {
    var self = this
    DM.getLoginStatus(function(res) {
      if (res.status === 'connected') {
        App.session = res.session
        self.getUser()
      }
    })
  },
  login: function() {
    var self = this
    DM.login(function(res) {
      if (res.session) {
        if (res.session.scope) {
          App.session = res.session
          self.getUser()
        }
        else {
          alert('Fo real dude?')
        }
      }
    }, {scope: 'manage_comments'})
  },
  getUser: function(cb) {
    var self = this
    DM.api('/me', {fields: 'screenname,avatar_120_url'}, function(data) {
      App.user = data
      self.setState({username: data.screenname, logged: true})
    })
  },
  render: function() {
    return (
      React.DOM.div(null, 
        this.state.logged ?
          React.DOM.h4(null, "Hello ", this.state.username) :
          LoginButton( {onLogin:this.login} )
        
      )
    )
  }
})

var LoginButton = React.createClass({displayName: 'LoginButton',
  render: function() {
    return (
      React.DOM.button( {className:"pull-right btn btn-default", onClick:this.props.onLogin}, "Login")
    )
  }
})

React.renderComponent(
  LoginBox(null ),
  document.querySelector('#login-button')
)
