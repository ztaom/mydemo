// Mod.js
// More info at https://github.com/modjs/mod/

/* 在浏览器里面查看
var http = require("http"); 
http.createServer(function(request, response) { 
response.writeHead(200, {"Content-Type": "text/plain"}); 
response.write("test nodjs"); 
response.write("  已安装express, modjs,grunt"); 
response.end(); 
}).listen(8899); 
console.log("nodejs start listen 8899 port!");
*/


/*生成html文件
module.exports = {
    tasks: {
        build: {
            src: "./index.html"     
        }
    }
}
*/

/*压缩html文件*/
module.exports = {
    tasks: {
        min: {
            src: "*.html",
            dest: "./libs"
        }
    }
};


/* 合并js文件 
module.exports = {
    tasks: {
        cat: {
            src: ["a.js", "b.js"],
            dest: "./dist/a-b.js"
        }
    }
};
*/

/*合并css
module.exports = {
    tasks: {
        cat: {
            src: ["a.css","b.css"],
            dest: "dist/a-b.css"
        }
    }
};
*/

/* 压缩js文件
module.exports = {
    tasks: {
        min: {
            src: "a.js",
            dest: "./dist/a.min.js"
        }
    }
};
*/

/*压缩css
module.exports = {
    tasks: {
        min: {
            src: "test.css",
            dest: "./dist/test.min.css"
        }
    }
};
*/

/* css文件中的背景图转换成datauri
module.exports = {
    tasks: {
        datauri: {
            src: "datauri.css",
            dest: "dist/test.datauri.css",
            igts: true
        }
    }
};
 */