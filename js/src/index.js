/** @jsx React.DOM */

'use strict';

App.videoId = 'x1xlz9m'

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []}
  },
  componentWillMount: function() {
    var self = this
    self.getCommentsFromAPI(function(data) {
      self.setState({data: data.list})
    })
  },
  getCommentsFromAPI: function(cb) {
    $.get('https://api.dailymotion.com/video/' + App.videoId + '/comments?fields=message,created_time,owner.avatar_120_url%2Cowner.screenname&page=1&limit=100', function(data) {
      cb(data)
    })
  },
  onNewComment: function(comment) {
    var comments = this.state.data
      , newComments = comments.concat([comment])

    this.setState({data: newComments})

    var self = this

    DM.api('/video/' + App.videoId + '/comments', 'post', {message: comment.message}, function(res) {
      // remove comment if there was an error
      // and display an error
      if (typeof res.error !== 'undefined') {
        self.setState({postError: true})
        setTimeout(function() {
          self.setState({postError: false})
        }, 3000)
        self.getCommentsFromAPI(function(data) {
          self.setState({data: data.list})
        })
      }
    })
  },
  render: function() {
    return (
      <div>
        {this.state.postError ? <CommentError /> : ''}
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
    this.props.onNewComment({
      message: message,
      date: +new Date,
      'owner.avatar_120_url': App.user.avatar_120_url
    })
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

var CommentError = React.createClass({
  render: function() {
    return (
      <div className="alert alert-danger">
        An error occured
      </div>
    )
  }
})

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.data.map(function(comment) {
      return <Comment message={comment.message} avatar={comment['owner.avatar_120_url']} date={comment.created_time} />
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
          <p className="text-muted">{moment(this.props.date * 1000).fromNow()}</p>
        </div>
      </div>
    )
  }
})

React.renderComponent(
  <CommentBox />,
  document.querySelector('#comments')
)
