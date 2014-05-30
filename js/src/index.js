/** @jsx React.DOM */

'use strict';

var CommentBox = React.createClass({
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
      <div>
        <CommentCount data={this.state.data} />
        <CommentForm onNewComment={this.onNewComment} />
        <CommentList data={this.state.data} />
      </div>
    )
  }
})

var CommentCount = React.createClass({
  render: function() {
    var nbrComment = this.props.data.length
    return (
      <div>
        <h2>{nbrComment} {nbrComment === 1 ? 'Comment' : 'Comments'}</h2>
      </div>
    )
  }
})

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault()

    var message = this.refs.message.getDOMNode().value
    this.props.onNewComment({message: message, date: new Date})
    this.refs.message.getDOMNode().value = ''
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <textarea className="form-control" ref="message" placeholder="Leave a comment!"></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Post comment</button>
        </div>
      </form>
    )
  }
})

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.data.map(function(comment) {
      return <Comment message={comment.message} avatar={comment.avatar} date={comment.date} />
    })
    return (
      <div>
        {comments}
      </div>
    )
  }
})

var Comment = React.createClass({
  render: function() {
    return (
      <div className="row media">
        <div className="col-md-1">
          <img className="media-object" src={this.props.avatar} />
        </div>
        <div className="col-md-11">
          <div>{this.props.message}</div>
          <p className="text-muted">{moment(this.props.date).fromNow()}</p>
        </div>
      </div>
    )
  }
})

React.renderComponent(
  <CommentBox />,
  document.querySelector('#comments')
)
