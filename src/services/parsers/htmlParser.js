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
          const tableStyles = this.extractTableStyles(header, table);
          tables[tableName] = {
            data: tableData,
            styles: tableStyles
          }
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

    static extractTableStyles(headerElement, tableElement) {
    const styles = {
      header: this.getInlineStyles(headerElement),
      table: this.getInlineStyles(tableElement),
      thead: {},
      tbody: {},
      th: {},
      td: {}
    };

    const thead = tableElement.querySelector('thead');
    if (thead) {
      styles.thead = this.getInlineStyles(thead);
      const thElements = thead.querySelectorAll('th');
      if (thElements.length > 0) {
        styles.th = this.getInlineStyles(thElements[0]);
      }
    }

    const tbody = tableElement.querySelector('tbody');
    if (tbody) {
      styles.tbody = this.getInlineStyles(tbody);
      const tdElements = tbody.querySelectorAll('td');
      if (tdElements.length > 0) {
        styles.td = this.getInlineStyles(tdElements[0]);
      }
    }

    return styles;
  }

  static getInlineStyles(element) {
    if (!element || !element.style) return {};

    const styles = {};
    const styleDeclaration = element.style;

    for (let i = 0; i < styleDeclaration.length; i++) {
      const property = styleDeclaration[i];
      const value = styleDeclaration.getPropertyValue(property);
      // Convert kebab-case to camelCase for React
      const camelCaseProperty = property.replace(/-([a-z])/g, (match, letter) =>
        letter.toUpperCase()
      );
      styles[camelCaseProperty] = value;
    }

    return styles;
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