import classes from './CommentItem.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const CommentItem = ({ loading, text }) => {
  return (
    <>
      {loading === 'loading' ? (
        <li className={classes.loading}>
          <div>{text}</div>
          <LoadingSpinner />
        </li>
      ) : (
        <div className={classes.item}>
          <div>{text}</div>
        </div>
      )}
    </>
  );
};

export default CommentItem;
