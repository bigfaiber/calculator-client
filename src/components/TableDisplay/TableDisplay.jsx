import styles from './TableDisplay.module.css';

const TableDisplay = ({ tableName, items, sum }) => {
  if (!items || items.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{tableName}</h2>
        <p className={styles.noData}>No data available</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{tableName}</h2>
      
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span>Item</span>
          <span>Price</span>
        </div>
        
        {items.map((item, index) => (
          <div key={index} className={styles.row}>
            <span>{item.item}</span>
            <span>{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      {sum !== undefined && (
        <div className={styles.sum}>
          Total: ${sum.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default TableDisplay;