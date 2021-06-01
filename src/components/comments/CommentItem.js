import classes from './CommentItem.module.css';

const CommentItem = (props) => {
console.log("🚀 ~ file: CommentItem.js ~ line 4 ~ CommentItem ~ props", props)
  return (
    <li className={classes.item}>
      <p>{props.text}</p>
      {props.loading === 'loading'? <p>'loading...'</p> : null}
    </li>
  );
};

export default CommentItem;
