/** @jsx React.DOM */

'use strict';

var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.DOM.div(null, 
        CommentCount(null ),
        CommentList(null )
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

var CommentList = React.createClass({displayName: 'CommentList',
  getInitialState: function() {
    return {data: COMMENTS}
  },
  render: function() {
    var comments = this.state.data.map(function(comment) {
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
