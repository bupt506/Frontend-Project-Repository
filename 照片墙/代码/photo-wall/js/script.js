// script.js

// 获取上传按钮和拖放区域元素
const uploadButton = document.querySelector('.upload-button');
const dropArea = document.querySelector('.drop-area');
const fileInput = document.getElementById('file-upload');
const gridContainer = document.getElementById('grid-container');
const confirmButton = document.getElementById('confirm-button');
const cancelButton = document.getElementById('cancel-button');

// 添加事件监听器
uploadButton.addEventListener('click', handleUploadClick);
dropArea.addEventListener('dragover', handleDragOver);
dropArea.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', handleFileInput);
confirmButton.addEventListener('click', handleConfirm);
cancelButton.addEventListener('click', handleCancel);

// 处理上传操作
function handleUploadClick(event) {
    event.preventDefault();
    fileInput.click();
}

// 处理拖放区域的拖放操作
function handleDragOver(event) {
    event.preventDefault();
}

// 处理拖放区域放置文件操作
function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
}

// 处理文件输入框选择文件操作
function handleFileInput(event) {
    const files = event.target.files;
    handleFiles(files);
}

// 处理选择的文件
function handleFiles(files) {
    // 检查已有的预览图片数量
    const existingPreviewCount = document.querySelectorAll('.preview-container').length;

    // 如果已有的预览图片数量加上新选择的文件数量超过30张，给出提示并返回
    if (existingPreviewCount + files.length > 30) {
        alert('最多只能上传30张图片');
        return;
    }

    // 清空拖放区域的提示文本
    dropArea.innerHTML = '';

    // 遍历文件数组
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // 创建预览图像容器
        const previewContainer = document.createElement('div');
        previewContainer.classList.add('preview-container');
        gridContainer.appendChild(previewContainer);

        // 创建预览图像元素
        const img = document.createElement('img');
        img.classList.add('preview-image');
        img.file = file;
        previewContainer.appendChild(img);

        // 创建删除按钮
        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '&#10006;'; // 叉号字符
        previewContainer.appendChild(deleteButton);

        // 使用 FileReader 对象读取文件数据
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// 处理删除预览图片操作
gridContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const previewContainer = event.target.parentNode;
        gridContainer.removeChild(previewContainer);

        // 检查是否需要恢复拖拽区域的提示文本
        if (gridContainer.childElementCount === 0) {
            dropArea.innerHTML = '<p>拖放照片至此上传</p>';
        }
    }
});

// 处理确定按钮点击事件
function handleConfirm() {
    // 检查预览照片数量
    const previewCount = document.querySelectorAll('.preview-container').length;
    if (previewCount === 0) {
        alert('请先上传照片');
        return;
    }
    // 如果预览照片数量不为零，调用重新排版函数
    layoutPhotos();
}

// 处理取消按钮点击事件
function handleCancel() {
    // 删除所有预览图片
    gridContainer.innerHTML = '';
    // 恢复拖拽区域的提示文本
    dropArea.innerHTML = '<p>拖放照片至此上传</p>';
}

// 重新排版照片
function layoutPhotos() {
    // 调用瀑布流布局算法进行排版
    // 这里只是示意，实际实现需要根据具体需求进行
    console.log('重新排版照片');
}
