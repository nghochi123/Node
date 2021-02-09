const fs = require('fs');

const obj = JSON.parse(fs.readFileSync(('1-json.json')));
obj['name'] = 'MyName';
obj['age'] = 21;
const objJSON = JSON.stringify(obj);
fs.writeFileSync('1-json.json', objJSON);