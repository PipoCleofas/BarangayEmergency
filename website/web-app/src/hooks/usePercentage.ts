import { useState, useEffect } from 'react';

export const usePercentage = (data: Record<string, number>) => {
  const [percentages, setPercentages] = useState<Record<string, string>>({});

  const calculatePercentages = (data: Record<string, number>) => {
    const total = Object.values(data).reduce((acc: number, value: number) => acc + value, 0);
    const result = Object.keys(data).reduce((acc: Record<string, string>, key: string) => {
      acc[key] = ((data[key] / total) * 100).toFixed(2);
      return acc;
    }, {});
    setPercentages(result);
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      calculatePercentages(data);
    }
  }, [data]);

  return percentages;
};
