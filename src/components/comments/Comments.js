import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

function useComments(quoteId) {
  return useQuery(['allComments', quoteId], async () => {
    const { data } = await axios.get(
      `https://react-query-practice-default-rtdb.firebaseio.com/comments/${quoteId}.json`,
    );

    const transformedComments = [];

    for (const key in data) {
      const commentObj = {
        id: key,
        ...data[key],
        status: 'done',
      };

      transformedComments.push(commentObj);
    }

    return transformedComments;
  });
}

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params;
  const {
    status,
    data: loadedComments,
    error,
    isFetching,
  } = useComments(quoteId);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments;

  if (status === 'loading') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'success' && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === 'success' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} />}
      {comments}
    </section>
  );
};

export default Comments;
