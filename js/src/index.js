/** @jsx React.DOM */

'use strict';

var CommentBox = React.createClass({
  render: function() {
    return (
      <div>
        <CommentCount />
        <CommentList />
      </div>
    )
  }
})

var CommentCount = React.createClass({
  getInitialState: function() {
    return {data: COMMENTS}
  },
  render: function() {
    var nbrComment = this.state.data.length
    return (
      <div>
        <h2>{nbrComment} {nbrComment === 1 ? 'Comment' : 'Comments'}</h2>
      </div>
    )
  }
})

var CommentList = React.createClass({
  getInitialState: function() {
    return {data: COMMENTS}
  },
  render: function() {
    var comments = this.state.data.map(function(comment) {
      return <Comment message={comment.message} avatar={comment.avatar} />
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
          {this.props.message}
        </div>
      </div>
    )
  }
})

React.renderComponent(
  <CommentBox />,
  document.querySelector('#comments')
)
