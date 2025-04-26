import styles from './Alert.module.css';

export function Alert({ children, onClear }) {
  return (
    <div className={styles.Alert}>
      {children}
      <span onClick={onClear}>X</span>
    </div>
  );
}

export default Alert;