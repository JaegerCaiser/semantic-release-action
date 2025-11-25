const exec = require('./src/_exec');
const path = require('path');

const run = async () => {
  // Install Dependencies
  {
    const {stdout, stderr} = await exec('npm install --only=prod --no-audit --silent', {
      cwd: path.resolve(__dirname)
    });
    console.log(stdout);
    if (stderr) {
      return Promise.reject(stderr);
    }
  }

  require('./src/index')();
};

run().catch(console.error);
