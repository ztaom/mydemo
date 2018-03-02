import * as fs from 'fs'
import * as Path from 'path'
import * as electron from 'electron'
import * as pluginsCom from './pluginsContainer/index'
import * as userInfoCom from './userInfo/index'
import * as projectDirCom from './dragProjectDirContainer/index'
import './index.scss'

pluginsCom.init()
const userInfo = userInfoCom.getUserInfo()
const projectDirPath = projectDirCom.getDragProjectPath()