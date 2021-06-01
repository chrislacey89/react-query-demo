import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = (props) => {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => {
        {/* console.log("🚀 ~ file: CommentsList.js ~ line 8 ~ CommentsList ~ comment", comment.status) */}
        return(       
           <CommentItem key={comment.id} 
           text={comment.text} 
           loading={comment.status} />)
      }
      )}
    </ul>
  );
};

export default CommentsList;
