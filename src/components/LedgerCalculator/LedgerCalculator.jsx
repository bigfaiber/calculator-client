import { useLedgerData } from '../../hooks/useLedgerData';
import { useCalculations } from '../../hooks/useCalculations';
import TableDisplay from '../TableDisplay/TableDisplay';
import CalculationPanel from '../CalculationPanel/CalculationPanel';
import ErrorMessage from '../common/ErrorMessage/ErrorMessage';
import styles from './LedgerCalculator.module.css';

const LedgerCalculator = () => {
  const { data, error } = useLedgerData();
  const { expression, result, tableSums, updateExpression, recalculate } = useCalculations(data);

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Ledger Calculator</h1>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ledger Calculator</h1>
      
      <div className={styles.content}>
        <div className={styles.tablesSection}>
          {data && data.tables && Object.entries(data.tables).map(([tableName, items]) => (
            <TableDisplay
              key={tableName}
              tableName={tableName}
              items={items}
              sum={tableSums[tableName]}
            />
          ))}
        </div>
        
        <div className={styles.calculationSection}>
          <CalculationPanel
            expression={expression}
            result={result}
            onExpressionChange={updateExpression}
            onCalculate={recalculate}
          />
        </div>
      </div>
    </div>
  );
};

export default LedgerCalculator;