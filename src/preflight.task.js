const fs = require('fs/promises');
const core = require('@actions/core');

const PACKAGE_JSON_PATH = './package.json';

/**
 * Pre-flight checks and modifications.
 * This task manipulates the package.json in memory to prevent CI-specific issues.
 */
module.exports = async () => {
  core.debug('Starting pre-flight task.');

  try {
    // Read the package.json file
    const pkgJsonString = await fs.readFile(PACKAGE_JSON_PATH, 'utf-8');
    const pkgJson = JSON.parse(pkgJsonString);

    // Check if scripts and prepare script exist
    if (pkgJson.scripts && pkgJson.scripts.prepare) {
      core.debug('Found "prepare" script in package.json. Removing it for the release process.');
      // Remove the prepare script
      delete pkgJson.scripts.prepare;

      // Write the modified package.json back to disk
      await fs.writeFile(PACKAGE_JSON_PATH, JSON.stringify(pkgJson, null, 2));
      core.debug('Successfully removed "prepare" script from package.json.');
    } else {
      core.debug('No "prepare" script found in package.json. Nothing to do.');
    }
  } catch (error) {
    // If package.json doesn't exist or is invalid, we shouldn't fail the whole action,
    // as it might be running in a subdirectory. We just log the error.
    core.warning(`Could not read or modify package.json: ${error.message}`);
  }
};
