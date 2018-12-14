const fs = require('fs-extra');

let arguments = process.argv.splice(2);
let dirArr = ['assets', 'components', 'views'];
let configArr = ['apis', 'routes'];
let content = '';
fs.mkdirSync(`src/modules/${arguments}`);
dirArr.forEach((item) => {
    fs.mkdirSync(`src/modules/${arguments}/${item}`, () => {
    });
});
configArr.forEach((item, idx) => {
    switch (idx) {
        case 0:
            content = 'export default {}';
            break;
        case 1:
            content = 'export default []';
            break;

    }
    fs.writeFileSync(`src/modules/${arguments}/${item}.js`, content);
});
// fs.writeFileSync(`mock/${arguments}.js`, 'module.exports = {}');
