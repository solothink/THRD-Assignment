import { useState, useEffect } from 'react';
import dataService from '../services/DataService';

export const useDataService = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await dataService.initialize();
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  return { dataService, isLoading, error };
};