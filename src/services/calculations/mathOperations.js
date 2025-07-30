export class MathOperations {
  /**
   * Calculates sum of all prices in a table
   * @param {Array} tableData - Array of items with price property
   * @returns {number} - Sum of all prices
   */
  static calculateTableSum(tableData) {
    if (!Array.isArray(tableData)) return 0;
    
    return tableData.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : 0;
      return sum + price;
    }, 0);
  }

  /**
   * Calculates sums for all tables
   * @param {Object} tablesData - Object containing table data
   * @returns {Object} - Object with table sums
   */
  static calculateAllTableSums(tablesData) {
    const sums = {};
    
    Object.entries(tablesData).forEach(([tableName, tableData]) => {
      sums[tableName] = this.calculateTableSum(tableData);
    });
    
    return sums;
  }

  /**
   * Evaluates mathematical expression with table variables
   * @param {string} expression - Mathematical expression (e.g., "A+B")
   * @param {Object} tableSums - Object with table name -> sum mappings
   * @returns {number} - Calculated result
   */
  static evaluateExpression(expression, tableSums) {
    try {
      let processedExpression = expression.toUpperCase();
      
      // Replace table names with their sums
      Object.entries(tableSums).forEach(([tableName, sum]) => {
        const regex = new RegExp(`\\b${tableName}\\b`, 'g');
        processedExpression = processedExpression.replace(regex, sum.toString());
      });
      
      // Validate the expression contains only allowed characters
      if (!/^[\d+\-*/().\s]+$/.test(processedExpression)) {
        throw new Error('Invalid characters in expression');
      }
      // Evaluate the expression safely


      const result = Function('"use strict"; return (' + processedExpression + ')')();

      
      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error('Expression did not evaluate to a valid number');
      }
      
      return result;
    } catch (error) {
      console.error('Expression evaluation error:', error);
      return 0;
    }
  }
}
