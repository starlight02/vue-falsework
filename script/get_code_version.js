const childProcess = require('child_process');
//获取当前分支最后一次提交的 hash
const hash = childProcess.execSync('git rev-parse HEAD').toString('utf-8').replace(/\s+/g, '');
const command = `git log --pretty=format:"作者：%an <%ae>；时间：%ad；版本:%h" --date=format:"%Y-%m-%d %H:%M:%S" ${hash} -1`;
const message = childProcess.execSync(command).toString('utf-8');
process.env.VUE_APP_VERSION = message;
// console.log(process);
// console.log(process.env.npm_package_version);
