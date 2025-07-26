import { Base64Decoder } from '../parsers/base64Decoder';
import { HtmlParser } from '../parsers/htmlParser';
import axios from 'axios';

export const ledgerApi = {
  /**
   * Fetches and processes ledger data from API
   * @returns {Promise<Object>} - Processed ledger data
   */
  async fetchLedgerData() {
    const BASE_URL = 'http://localhost:3000/api/v1';
    const ENDPOINT = `${BASE_URL}/encoded_document`;

    try {
      const response = await axios.get(`${ENDPOINT}`);
      
      if (!response || !response.data) {
        throw new Error('No data received from API');
      }

      const htmlContent = Base64Decoder.decode(response.data.document);

      if (!HtmlParser.validateHtmlStructure(htmlContent)) {
        throw new Error('Invalid HTML structure in decoded content');
      }

      const parsedData = HtmlParser.parseTablesFromHtml(htmlContent);
      
      return {
        success: true,
        data: parsedData,
        rawHtml: htmlContent
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.error,
        data: error.response.data
      };
    }
  },
};
