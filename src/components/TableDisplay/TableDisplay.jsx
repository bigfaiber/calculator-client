import styles from './TableDisplay.module.css';

const TableDisplay = ({ tableName, tableInfo, sum }) => {
  const items = tableInfo?.data || tableInfo || [];
  const inlineStyles = tableInfo?.styles || {};

  if (!items || items.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title} style={inlineStyles.header || {}}>{tableName}</h2>
        <p className={styles.noData}>No data available</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title } style={inlineStyles.header || {}}>{tableName}</h2>
      
      <div className={styles.wrapper}>
        <table className={styles.wrapper} style={inlineStyles.table || {}}>
          <thead style={inlineStyles.thead || {}}>
            <tr className={styles.row}>
              <th style={inlineStyles.th || {}}>Item</th>
              <th style={inlineStyles.th || {}}>Price</th>
            </tr>
          </thead>
          <tbody style={inlineStyles.tbody || {}}>
            {items.map((item, index) => (
              <tr className={styles.row} key={index}>
                <td className={styles.row} style={inlineStyles.td || {}}>{item.item}</td>
                <td style={inlineStyles.td || {}}>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sum !== undefined && (
          <div className={styles.sum}>
            Total: ${sum.toFixed(2)}
          </div>
        )}
        </div>
    </div>
  );
};

export default TableDisplay;