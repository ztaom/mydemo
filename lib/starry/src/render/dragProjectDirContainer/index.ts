window.addEventListener('dragover', (e) => {
    e.preventDefault()
}, false)
window.addEventListener('drop', (e) => {
    e.preventDefault()
    renderDir(e.dataTransfer.files[0].path)
}, false)

// todo 渲染目录
function renderDir(path) {
    console.log(path)
}

// 获取当前拖入项目目录路径
export const getDragProjectPath = () => {
    return ''
}