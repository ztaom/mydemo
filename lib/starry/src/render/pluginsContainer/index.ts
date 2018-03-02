import * as fs from 'fs'
import * as Path from 'path'
import * as electron from 'electron'


let plugins = {}

export const init = () =>{
    // todo get local plugins

    // render local plugins
    updatePluginList()
}





function loadMainJs(mainJs) {
    console.log(mainJs)
    const loaderA = require(mainJs)
    // loaderA(__dirname)
}

let loadPlugin = async (pluginPath) =>  {
    let files = await getDirFiles(pluginPath)
    let packagePath
    let htmlPath
    let icon
    let mainJs
    files.map(function(file) {
        if (/package\.json/.test(file)) {
            packagePath = file
        }
        if (/index\.html/.test(file)) {
            htmlPath = file
        }
        if (/icon\.(png|jpg|jpeg)/.test(file)) {
            icon = file
        }
    })
    if (!packagePath || !htmlPath) {
        console.error('添加插件缺少package.json 或者 index.html')
    }
    let {pluginName, name } = <any>require(packagePath)
    if (!pluginName) {
        // 约束用户必须设置pluginName
        console.error('package.json 缺少 pluginName 或者 name')
    }

    // TODO验证是否有相同包名插件存在
    plugins[pluginName] = {
        name: pluginName,
        icon: icon,
        html: htmlPath,
        dirPath: pluginPath,
        files: files
    }
    console.log(plugins)
    updatePluginList()
}


function updatePluginList() {
    let listNode = document.createDocumentFragment()
    for(let i in plugins) {
        let { name, icon} = plugins[i]
        let wrapEl = document.createElement('div')
        wrapEl.setAttribute('data-name', i)
        let textEl = document.createElement('p')
        textEl.textContent = name
        textEl.classList.add('name')
        let iconEl = document.createElement('p')
        iconEl.classList.add('icon')
        iconEl.style.backgroundImage = `url(${icon})`
        wrapEl.appendChild(iconEl)
        wrapEl.appendChild(textEl)
        listNode.appendChild(wrapEl)
        wrapEl.addEventListener('click', function(){
            pluginClick(i)
        }, false)
    }
    let addBtnWrap = <HTMLElement> document.createElement('div')
    addBtnWrap.classList.add('add-btn')
    let addPluginEl = <any> document.createElement('input')
    addPluginEl.type = 'file'
    addPluginEl.directory = true
    addPluginEl.webkitdirectory = true
    addPluginEl.multiple = true
    addBtnWrap.appendChild(addPluginEl)
    listNode.appendChild(addBtnWrap)
    addPluginEl.addEventListener('change', addPluginFile, false )
    let listWrap = document.querySelector('#plugin-nav-list')
    listWrap.innerHTML = ''
    listWrap.appendChild(listNode)
}

function addPluginFile(e) {
    console.log(e.target.files[0].path)
    loadPlugin(e.target.files[0].path)
}

function pluginClick(name) {
    let { html } = plugins[name]
    let webView = <any> document.querySelector('#plugin-container')
    webView.src = html

    webView.addEventListener('did-finish-load', function(){
        console.log(webView.webContents)
        // webView.addEventListener('ipc-message', (event) => {
        //     console.log(event.channel)
        //   })
        // webView.send('globalData', 'aaa')
        // In embedder page.
        
        webView.send('ping', {root: __dirname})
    },false)
    webView.addEventListener('ipc-message', function(event){
        let { channel, args } = event
        if (channel == 'qytest:write-file') {
            console.log('write file status:' + args[0].status)
        }
    })
    webView.addEventListener('dom-ready', function() {
        webView.openDevTools()
    })
    
    // document.querySelector('#plugin-container').send('globalData', {path: __dirname})
}

function checkIsJs(filePath) {
    let fileName = Path.basename(filePath)
    if (/\.js$/.test(fileName)) {
        return true
    }
    return false
}

function getDirFiles(dirPath):Promise<string[]> {
    return new Promise(function(resolve, reject){
        let dirFiles: string[] = []
        fs.readdir(dirPath, function(err,files){
            if (err) {
                console.log('read path error')
                reject && reject()
            }
            files.forEach(function(fileName) {
                let filePath: string = Path.join(dirPath, fileName)
                 dirFiles.push(filePath)
            })
            resolve && resolve(dirFiles)
        })
    })
}



