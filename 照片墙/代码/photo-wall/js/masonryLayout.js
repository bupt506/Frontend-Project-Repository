// masonryLayout.js

// 引入 Masonry.js 库
// 注意：你需要在项目中引入 Masonry.js 库的文件或链接
// 可以在 https://masonry.desandro.com/ 下载或获取相关信息

document.addEventListener('DOMContentLoaded', function() {
    // 初始化瀑布流布局
    var masonryGrid = new Masonry('#masonry-grid', {
        itemSelector: '.grid-item',
        columnWidth: 200, // 每列宽度
        gutter: 10 // 列之间的间距
    });
});


// 瀑布流布局函数
function waterfallLayout() {
    // 获取所有预览容器
    const previewContainers = document.querySelectorAll('.preview-container');
    
    // 计算每张图片的位置和大小
    let left = 0;
    let top = 0;
    const containerWidth = gridContainer.clientWidth; // 容器宽度
    const gap = 10; // 图片之间的间距
    const cols = Math.floor(containerWidth / (previewWidth + gap)); // 计算列数
    const colHeights = new Array(cols).fill(0); // 用于存储每列的高度

    // 设置每个预览容器的位置
    previewContainers.forEach((container, index) => {
        // 找出最短列的索引和高度
        const minHeight = Math.min(...colHeights);
        const minIndex = colHeights.indexOf(minHeight);

        // 计算容器的位置
        left = minIndex * (previewWidth + gap);
        top = colHeights[minIndex];

        // 更新最短列的高度
        colHeights[minIndex] += container.clientHeight + gap;

        // 设置容器的位置
        container.style.left = left + 'px';
        container.style.top = top + 'px';
    });

    // 更新容器的高度，使其适应图片布局
    const maxHeight = Math.max(...colHeights);
    gridContainer.style.height = maxHeight + 'px';
}
