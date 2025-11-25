const exec = require('./src/_exec');
const path = require('path');
const core = require('@actions/core');

const run = async () => {
  // Install Dependencies
  try {
    const {stdout} = await exec('npm install --only=prod --no-audit --silent', {
      cwd: path.resolve(__dirname)
    });
    console.log(stdout);
  } catch (error) {
    core.setFailed(`Failed to install dependencies: ${error.message}`);
    return;
  }

  require('./src/index')();
};

run();
