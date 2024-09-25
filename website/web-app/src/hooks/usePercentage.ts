import { useState } from 'react';

export const usePercentage = (data: any) => {
  const [percentages, setPercentages] = useState({});

  const calculatePercentages = (data: any) => {
    const total = Object.values(data).reduce((acc, value) => acc + value, 0);
    const result = Object.keys(data).reduce((acc, key) => {
      acc[key] = ((data[key] / total) * 100).toFixed(2);
      return acc;
    }, {});
    setPercentages(result);
  };

  // Calculate the percentages on the first render
  if (!Object.keys(percentages).length) {
    calculatePercentages(data);
  }

  return percentages;
};
