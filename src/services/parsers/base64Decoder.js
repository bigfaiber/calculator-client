export class Base64Decoder {
  /**
   * Decodes base64 string to text
   * @param {string} base64String - The base64 encoded string
   * @returns {string} - Decoded text content
   */
  static decode(base64String) {
    try {
      // Clean the base64 string (remove any whitespace/newlines)
      console.log("Decoding base64 string:", base64String);
      const cleanBase64 = base64String.replace(/\s/g, '');
      
      // Decode base64 to text
      const decodedText = atob(cleanBase64);
      
      return decodedText;
    } catch (error) {
      throw new Error(`Failed to decode base64: ${error.message}`);
    }
  }

  /**
   * Validates if string is valid base64
   * @param {string} str - String to validate
   * @returns {boolean} - True if valid base64
   */
  static isValidBase64(str) {
    try {
      const cleanStr = str.replace(/\s/g, '');
      return btoa(atob(cleanStr)) === cleanStr;
    } catch (error) {
      return false;
    }
  }
}
