const fs = require('fs');
const core = require('@actions/core');

/**
 * handleNpmConfig
 * Writes npm config variables from the environment to the .npmrc file.
 * This ensures that the npm CLI, when called by plugins, respects these settings.
 */
module.exports = async () => {
  core.debug('Checking for npm config overrides from environment variables.');
  let npmrcContent = '';

  if (process.env.npm_config_ignore_scripts === 'true') {
    core.debug('Found npm_config_ignore_scripts. Adding "ignore-scripts=true" to .npmrc.');
    npmrcContent += 'ignore-scripts=true\n';
  }

  // Future npm_config_* variables can be handled here.

  if (npmrcContent) {
    core.debug('Appending generated config to .npmrc file.');
    // Using appendFileSync to ensure we don't overwrite the auth token
    // set by the setup-node action.
    fs.appendFileSync('.npmrc', `\n${npmrcContent}`);
  }
};
