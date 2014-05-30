/** @jsx React.DOM */

'use strict';

var CommentBox = React.createClass({displayName: 'CommentBox',
  getInitialState: function() {
    return {data: COMMENTS}
  },
  onNewComment: function(comment) {
    comment.avatar = 'http://s2.dmcdn.net/AVN/80x80-bQG.png'
    var comments = this.state.data
      , newComments = comments.concat([comment])

    this.setState({data: newComments})
  },
  render: function() {
    return (
      React.DOM.div(null, 
        CommentCount(null ),
        CommentForm( {onNewComment:this.onNewComment} ),
        CommentList( {data:this.state.data} )
      )
    )
  }
})

var CommentCount = React.createClass({displayName: 'CommentCount',
  getInitialState: function() {
    return {data: COMMENTS}
  },
  render: function() {
    var nbrComment = this.state.data.length
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
    this.props.onNewComment({message: message, date: new Date})
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
      return Comment( {message:comment.message, avatar:comment.avatar, date:comment.date} )
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
