export class HtmlParser {
  /**
   * Parses HTML content and extracts table data
   * @param {string} htmlContent - HTML string content
   * @returns {Object} - Parsed table data
   */
  static parseTablesFromHtml(htmlContent) {
    try {
      // Create a temporary DOM element to parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      const tables = {};
      
      // Find all h2 elements (table headers) and their following tables
      const headers = doc.querySelectorAll('h2');
      
      headers.forEach(header => {
        const tableName = header.textContent.trim();
        const table = header.nextElementSibling;
        
        if (table && table.tagName === 'TABLE') {
          const tableData = this.extractTableData(table);
          tables[tableName] = tableData;
        }
      });
      
      return { tables };
    } catch (error) {
      throw new Error(`Failed to parse HTML: ${error.message}`);
    }
  }

  /**
   * Extracts data from a table element
   * @param {HTMLElement} tableElement - Table DOM element
   * @returns {Array} - Array of row objects
   */
  static extractTableData(tableElement) {
    const rows = [];
    const tbody = tableElement.querySelector('tbody');
    
    if (!tbody) return rows;
    
    const tableRows = tbody.querySelectorAll('tr');
    
    tableRows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 2) {
        const item = cells[0].textContent.trim();
        const priceText = cells[1].textContent.trim();
        const price = parseFloat(priceText);
        
        if (!isNaN(price)) {
          rows.push({
            item: parseInt(item) || item,
            price: price
          });
        }
      }
    });
    
    return rows;
  }

  /**
   * Validates HTML structure for expected format
   * @param {string} htmlContent - HTML content to validate
   * @returns {boolean} - True if valid structure
   */
  static validateHtmlStructure(htmlContent) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Check for required elements
      const headers = doc.querySelectorAll('h2');
      const tables = doc.querySelectorAll('table');
      
      return headers.length > 0 && tables.length > 0;
    } catch (error) {
      return false;
    }
  }
}