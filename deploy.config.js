const dayjs = require('dayjs');
const OSS = require('ali-oss');
const args = process.argv.slice(2);
const client = new OSS({
  region: 'oss-cn-qingdao',
  accessKeyId: 'LTAIXdnnEt4Sth1s',
  accessKeySecret: args[0],
  bucket: 'kysw-static'
});
const version = dayjs().format('YYYYMMDDHHmmssSSS');
const uploadFile = target => {
  const split = target.lastIndexOf('.');
  return client.put(`${target.slice(0, split)}${version}.${target.slice(split + 1)}`, `dist/${target}`).then(console.log).catch(console.log);
};
const recursive = (fn, arr = []) => {
  if (arr.length === 0) {
    return;
  }
  let ele = arr.shift();
  fn(ele).then(data => {
    console.log(data);
    recursive(fn, arr);
  }).catch(console.log);
};

recursive(uploadFile, ['askdata.js', 'askdata.css']);
console.log(version);
