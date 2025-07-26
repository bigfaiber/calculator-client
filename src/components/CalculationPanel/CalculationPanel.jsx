import { useState } from 'react';
import styles from './CalculationPanel.module.css';

const CalculationPanel = ({
  expression,
  result,
  onExpressionChange,
  onCalculate,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  const pattern = /^(A|B|A[+-]A|A[+-]B|B[+-]A|B[+-]B)$/;

  const validateExpression = (value) => {
    if (!value.trim()) {
      setIsValid(true);
      setValidationMessage('');
      return true;
    }
    
    const isValidExpression = pattern.test(value.toUpperCase());
    setIsValid(isValidExpression);
    
    if (!isValidExpression) {
      setValidationMessage('Valid formats: A, B, A+A, A+B, A-A, A-B, B+A, B+B, B-A, B-B');
    } else {
      setValidationMessage('');
    }
    
    return isValidExpression;
  };

  const handleExpressionChange = (e) => {
    const value = e.target.value;
    validateExpression(value);
    onExpressionChange(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isValid) {
      onCalculate();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.resultDisplay}>
        ${result.toFixed(2)}
      </div>
      <div className={styles.calculationControls}>
        <input
          type="text"
          value={expression}
          onChange={handleExpressionChange}
          onKeyPress={handleKeyPress}
          className={`${styles.expressionInput} ${!isValid ? styles.invalid : ''}`}
          placeholder="Example: A+B"
        />
        {!isValid && (
          <div className={styles.validationMessage}>
            {validationMessage}
          </div>
        )}
        
        <button
          onClick={onCalculate}
          className={styles.calculateButton}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default CalculationPanel;