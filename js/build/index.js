/** @jsx React.DOM */

'use strict';

App.videoId = 'x1xlz9m'

var CommentBox = React.createClass({displayName: 'CommentBox',
  getInitialState: function() {
    return {data: []}
  },
  componentWillMount: function() {
    var self = this
    $.get('https://api.dailymotion.com/video/' + App.videoId + '/comments?fields=message,created_time,owner.avatar_120_url%2Cowner.screenname&page=1&limit=100', function(data) {
      self.setState({data: data.list})
    })
  },
  onNewComment: function(comment) {
    var comments = this.state.data
      , newComments = comments.concat([comment])

    this.setState({data: newComments})
  },
  render: function() {
    return (
      React.DOM.div(null, 
        CommentCount( {data:this.state.data} ),
        CommentForm( {onNewComment:this.onNewComment} ),
        CommentList( {data:this.state.data} )
      )
    )
  }
})

var CommentCount = React.createClass({displayName: 'CommentCount',
  render: function() {
    var nbrComment = this.props.data.length
    return (
      React.DOM.div(null, 
        React.DOM.h2(null, nbrComment, " ", nbrComment === 1 ? 'Comment' : 'Comments')
      )
    )
  }
})

var CommentForm = React.createClass({displayName: 'CommentForm',
  handleSubmit: function(e) {
    e.preventDefault()

    var message = this.refs.message.getDOMNode().value
    this.props.onNewComment({
      message: message,
      date: new Date,
      'owner.avatar_120_url': App.user.avatar_120_url
    })
    this.refs.message.getDOMNode().value = ''
  },
  render: function() {
    return (
      React.DOM.form( {onSubmit:this.handleSubmit}, 
        React.DOM.div( {className:"form-group"}, 
          React.DOM.textarea( {className:"form-control", ref:"message", placeholder:"Leave a comment!"})
        ),
        React.DOM.div( {className:"form-group"}, 
          React.DOM.button( {className:"btn btn-primary"}, "Post comment")
        )
      )
    )
  }
})

var CommentList = React.createClass({displayName: 'CommentList',
  render: function() {
    var comments = this.props.data.map(function(comment) {
      return Comment( {message:comment.message, avatar:comment['owner.avatar_120_url'], date:comment.created_time} )
    })
    return (
      React.DOM.div(null, 
        comments
      )
    )
  }
})

var Comment = React.createClass({displayName: 'Comment',
  render: function() {
    return (
      React.DOM.div( {className:"row media"}, 
        React.DOM.div( {className:"col-md-1"}, 
          React.DOM.img( {className:"media-object", src:this.props.avatar} )
        ),
        React.DOM.div( {className:"col-md-11"}, 
          React.DOM.div(null, this.props.message),
          React.DOM.p( {className:"text-muted"}, moment(this.props.date).fromNow())
        )
      )
    )
  }
})

React.renderComponent(
  CommentBox(null ),
  document.querySelector('#comments')
)
