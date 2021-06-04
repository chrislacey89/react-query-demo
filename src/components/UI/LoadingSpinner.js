import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div class={classes.loader}>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
