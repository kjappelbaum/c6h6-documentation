'use strict';

const fs = require('fs');
const { join } = require('path');

const exec = require('child-process-promise').exec;

build();

async function build() {
  await exec(
    'node node_modules/gitbook-cli/bin/gitbook.js build -- tips/src tips/build'
  );
  //  var stdout = result.stdout;
  //  var stderr = result.stderr;

  const homedir = join(__dirname, 'src');
  let dirs = fs.readdirSync(homedir).filter((item) => item.length === 32);
  for (let dir of dirs) {
    let summary = join(homedir, dir, 'SUMMARY.md');
    let readme = join(homedir, dir, 'README.md');
    if (fs.existsSync(summary) && fs.existsSync(readme)) {
      await exec(
        `cd tips; node ../node_modules/gitbook-cli/bin/gitbook.js build -- src/${dir} pages/${dir}`
      );
    }
  }
}
