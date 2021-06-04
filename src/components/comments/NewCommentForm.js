import axios from 'axios';
import { useRef, useEffect } from 'react';

import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
  useMutation,
} from 'react-query';

const NewCommentForm = ({ quoteId }) => {
  const queryClient = new useQueryClient();

  const addCommentMutation = useMutation(
    (newComment) =>
      axios.post(
        `https://react-query-practice-default-rtdb.firebaseio.com/comments/${quoteId}.json`,
        newComment,
      ),
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: async (newComment) => {
        await queryClient.cancelQueries(['allComments', quoteId]);
        console.log(
          '🚀 ~ file: NewCommentForm.js ~ line 34 ~ onMutate: ~ newComment',
          newComment,
        );
        const previousValue = queryClient.getQueryData([
          'allComments',
          quoteId,
        ]);
        newComment.status = 'loading';
        queryClient.setQueryData(['allComments', quoteId], (old) => [
          ...old,
          newComment,
        ]);

        return previousValue;
      },

      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) =>
        queryClient.setQueryData(['allComments', quoteId], previousValue),
      // After success or failure, refetch the todos query
      onSettled: () => {
        queryClient.invalidateQueries(['allComments', quoteId]);
      },
    },
  );

  const commentTextRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    addCommentMutation.mutate({ text: enteredText });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
