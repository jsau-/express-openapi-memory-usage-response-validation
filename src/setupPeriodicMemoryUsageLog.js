const logCurrentMemoryUsage = (logPrefix) => {
  const currentMemoryUsage = process.memoryUsage();

  console.log(`${logPrefix}Memory usage at ${Date.now().toString()}`);
  console.table({
    'Resident Set Size': currentMemoryUsage.rss,
    'Heap Total': currentMemoryUsage.heapTotal,
    'Heap Used': currentMemoryUsage.heapUsed,
    'V8 External Memory': currentMemoryUsage.external,
  });
  console.log('\n');
};

const setupPeriodicMemoryUsageLog = (logPrefix) => setInterval(() => logCurrentMemoryUsage(logPrefix), 1000);

module.exports = { setupPeriodicMemoryUsageLog };
