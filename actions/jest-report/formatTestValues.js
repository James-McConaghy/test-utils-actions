module.exports = function(json) {
    const failed = `${json.numFailedTests} / ${json.numTotalTests}`;
    const skipped = `${json.numPendingTests} / ${json.numTotalTests}`;
    const passed = `${json.numPassedTests} / ${json.numTotalTests}`;
  
    return { failed, skipped, passed };
};
