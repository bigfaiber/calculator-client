import { useState, useMemo } from 'react';
import { MathOperations } from '../services/calculations/mathOperations';

export const useCalculations = (tablesData) => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(0);

  // Calculate table sums whenever data changes
  const tableSums = useMemo(() => {
    if (!tablesData || !tablesData.tables) return {};
    return MathOperations.calculateAllTableSums(tablesData.tables);
  }, [tablesData]);

  const updateExpression = (newExpression) => {
    setExpression(newExpression);
  };

  const recalculate = () => {
    if (Object.keys(tableSums).length > 0) {
      const calculatedResult = MathOperations.evaluateExpression(expression, tableSums);
      setResult(calculatedResult);
    }
  };

  return {
    expression,
    result,
    tableSums,
    updateExpression,
    recalculate
  };
};