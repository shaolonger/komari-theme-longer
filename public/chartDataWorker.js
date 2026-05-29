// Web Worker for processing chart data
self.onmessage = function(e) {
  const { chartData, startIndex, endIndex } = e.data;
  
  // Process the batch of data
  const processedData = chartData.slice(startIndex, endIndex);
  
  // Send back the processed data with indices
  self.postMessage({
    startIndex,
    endIndex,
    data: processedData
  });
};