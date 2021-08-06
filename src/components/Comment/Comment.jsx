/* eslint-disable react/prop-types */
import React from 'react';
import './Comment.scss';

export const Comment = ({ comment, deleteComment }) => {
  const { id, email, name, body, createdAt } = comment;

  return (
    <div className="comment" key={id}>
      <h5>{`Name: ${name}`}</h5>
      <div>
        Email:
        <a href={`mailto:${email}`}>
          {` ${email}`}
        </a>
      </div>

      <p>{`Comment body: ${body}`}</p>
      <div className="comment__footer">
        <span>{`Was published: ${new Date(createdAt).toDateString()}`}</span>

        <button
          type="button"
          onClick={() => deleteComment(id)}
          className="btn btn-primary comment__delete-button"
        >
          Delete comment
        </button>
      </div>
    </div>
  );
};
