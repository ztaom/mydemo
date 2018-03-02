// communicate with render
import * as electron from 'electron'
let { ipcMain } = electron

ipcMain.on('fireMain', (event, arg) =>  {
  console.log(arg)
  let { eventType } = arg
  event.sender.send(eventType, {root: __dirname})
})