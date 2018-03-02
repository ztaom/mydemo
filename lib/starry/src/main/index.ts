import * as path from 'path'
import * as url from 'url'
import * as glob from 'glob'
import * as electron from 'electron'
import './event'

const { BrowserWindow, app, BrowserView, ipcMain } = electron

const debug = /--debug/.test(process.argv[2])
const appName = 'starry'

if (process.mas) app.setName(appName)

let mainWindow = null

function initialize() {
    const shouldQuit = makeSingleInstance()
    if (shouldQuit) return app.quit()

    loadDemos()

    function createWindow() {
        const windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName()
        }

        if (process.platform === 'linux') {
            // windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
        }

        mainWindow = new BrowserWindow(windowOptions)
        mainWindow.webContents.openDevTools()
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, 'app.html'),
                protocol: 'file:',
                slashes: true
            })
        )

        // Launch fullscreen with DevTools open, usage: npm run debug
        if (debug) {
            // mainWindow.webContents.openDevTools()
            mainWindow.maximize()
            // require('devtron').install()
            console.log(mainWindow.webContents.debugger.isAttached())
            console.log(app.getLocale())
        }

        mainWindow.on('closed', () => {
            mainWindow = null
        })
    }

    app.on('ready', () => {
        createWindow()
        console.log('ready')
        console.log('appdata' + app.getPath('appData'))
        console.log('userData' + app.getPath('userData'))
    })

    app.on('open-file', (e) => {
        e.preventDefault()
        console.log('open-file')
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })
}

function makeSingleInstance() {
    if (process.mas) return false

    return app.makeSingleInstance(() => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

// Require each JS file in the main-process dir
function loadDemos() {
    const files = glob.sync(path.join(__dirname, 'build/**/*.js'))
    files.forEach((file) => {
        require(file)
    })
}

// Handle Squirrel on Windows startup events
console.log(process.argv[1])
switch (process.argv[1]) {
    case '--squirrel-install':
        break
    case '--squirrel-uninstall':
        break
    case '--squirrel-obsolete':
    case '--squirrel-updated':
        app.quit()
        break
    default:
        initialize()
}
