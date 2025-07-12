const StudentResult = require("../models/Result");
const axios = require("axios");
const isOnline = require("is-online");

async function syncResultsToCloud() {
  const online = await isOnline();
  if (!online) {
    console.log("Offline - skipping cloud sync.");
    return;
  }

  const unsynced = await StudentResult.find({ synced: false });

  for (const result of unsynced) {
    try {
      const res = await axios.post("https://your-cloud-api.com/api/sync-result", result);
      if (res.status === 201) {
        result.synced = true;
        await result.save();
        console.log(`Synced result for: ${result.studentId}`);
      }
    } catch (err) {
      console.error("Cloud sync error:", err.message);
    }
  }
}

module.exports = syncResultsToCloud;
