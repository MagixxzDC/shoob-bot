const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'moderationLogs.json');

function loadLogs() {
  if (!fs.existsSync(logFilePath)) {
    return { warnings: {} };
  }

  try {
    return JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
  } catch (error) {
    console.error('Failed to load moderation logs:', error);
    return { warnings: {} };
  }
}

function saveLogs(logs) {
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
}

function safeTag(user) {
  if (!user) return 'UnknownUser';
  return user.tag || user.username || 'UnknownUser';
}

/*
STRUCTURE FIXED TO:

warnings: {
  guildId: {
    userId: [warnings]
  }
}
*/

function addWarning(guildId, user, moderator, reason) {
  const logs = loadLogs();

  if (!logs.warnings[guildId]) {
    logs.warnings[guildId] = {};
  }

  if (!logs.warnings[guildId][user.id]) {
    logs.warnings[guildId][user.id] = [];
  }

  logs.warnings[guildId][user.id].push({
    userId: user.id,
    userTag: safeTag(user),

    moderatorId: moderator.id,
    moderatorTag: safeTag(moderator),

    reason: reason || 'No reason provided',
    timestamp: new Date().toISOString(),
  });

  saveLogs(logs);
}

function getWarnings(guildId, userId) {
  const logs = loadLogs();

  const guild = logs.warnings[guildId];
  if (!guild) return [];

  const userWarnings = guild[userId];
  if (!userWarnings) return [];

  return userWarnings;
}

module.exports = {
  addWarning,
  getWarnings,
};