const exec = require('./src/_exec');
const path = require('path');

const run = async () => {
  // Install Dependencies
  try {
    const { stdout } = await exec('npm install --only=prod --no-audit --silent', {
      cwd: path.resolve(__dirname)
    });
    console.log(stdout);
  } catch (error) {
    console.error(`Failed to install dependencies: ${error.message}`);
    process.exit(1);
  }

  // Now that dependencies are installed, we can require the main logic.
  require('./src/index')();
};

run();
