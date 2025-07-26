import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => (
  <div className={styles.errorContainer}>
    <p className={styles.errorMessage}>Error: {message}</p>
  </div>
);

export default ErrorMessage;