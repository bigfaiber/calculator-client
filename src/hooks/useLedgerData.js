import { useState, useEffect } from 'react';
import { ledgerApi } from '../services/api/ledgerApi';

export const useLedgerData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [rawHtml, setRawHtml] = useState(null);

  const fetchData = async () => {

    setError(null);
		setData(null);

    try {
      const result = await ledgerApi.fetchLedgerData();
      
      if (result.success) {
        setData(result.data);
        setRawHtml(result.rawHtml);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setRawHtml(null);
  };

    useEffect(() => {
			fetchData()
    }, []);

  return {
    data,
    error,
    rawHtml,
    fetchData,
    reset
  };
};
