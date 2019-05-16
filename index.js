let fs = require('fs');
let ps = require('process');
let path = require('path');
const Axios = require('axios');
let CURR_DIR  = ps.cwd();
console.log(CURR_DIR)
const isRootDir = fs.existsSync(path.join(CURR_DIR,'package.json'));
const isAngularProject = fs.existsSync(path.join(CURR_DIR, 'tslint.json'));
if(isAngularProject) {
  if(isRootDir) {
  let tslintObj = JSON.parse(fs.readFileSync('./tslint.json'));
  let ext = tslintObj.extends;
  // TODO: we should check if the ext node is an object or string 
  tslintObj.extends = [ext,"tslint-config-prettier"];
  fs.writeFile("./tslint.json", JSON.stringify(tslintObj, null, 2), function (err) {
        if (err) return console.log(err);
    });
    downloadPrettierConfig();
  }else {
    console.log(`you dont appear to be in the project root folder!`);
  }
  }
  else {
    console.log(`you dont appear to be in the project root folder!`);
  }

  async function downloadPrettierConfig() {
    const pretConfigUrl = `https://gist.githubusercontent.com/karanpal-dhillon/46da46308ffde3417ab64a85cf123580/raw/df8f17a7af07820a7aa491791e90b2af80af481f/angular.prettierrc`;
    const pretPath = path.join(CURR_DIR, '.prettierrc');
    const writer = fs.createWriteStream(pretPath);

    const response = await Axios({
      url: pretConfigUrl, 
      method: 'get',
      responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error',reject);
    });
  }

    

