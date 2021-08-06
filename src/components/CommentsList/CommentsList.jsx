
/* eslint-disable react/prop-types */
import React from 'react';
import { Comment } from '../Comment';

export class CommentsList extends React.Component {
  state = {
    preparedComments: this.props.comments,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.comments !== this.props.comments) {
      this.setState({
        preparedComments: this.props.comments,
      });
    }
  }

  deleteComment = (commentId) => {
    this.setState(state => ({
      preparedComments: [...state.preparedComments].filter(
        comment => comment.id !== commentId,
      ),
    }));
  };

  render() {
    const { preparedComments } = this.state;

    return preparedComments.length > 0 ? (
      <ul className="comments__list">
        {preparedComments.map(comment => (
          <li key={comment.id} className="comments__item">
            <Comment
              key={comment.id}
              comment={comment}
              deleteComment={this.deleteComment}
            />
          </li>
        ))}
      </ul>
    ) : (
      <div className="comments__dontExist">No comments for this product</div>
    );
  }
}
