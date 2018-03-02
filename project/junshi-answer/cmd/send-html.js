const glob = require('glob');
const fs = require('fs');
const path = require('path');
const request = require('request');
const pkg = require('../package.json');

// 获取项目名字
const project = pkg.name.replace(/@ali\//, ''.trim());

// 读取和发送文件
const files = glob.sync('*.html', {
    cwd: path.resolve(__dirname, '../build')
});
files.forEach((item) => {
    item = path.resolve(__dirname, `../build/${item}`);

    const html = fs.readFileSync(item).toString();

    request.post({
        url: 'http://127.0.0.1:3000/publish',
        form: {
            project,
            fileName: item.split('/').pop(),
            html
        }
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(body);
    });
});

