/**
 * 平滑滚动插件 (Smooth Scroll Plugin)
 * 
 * 使用方法:
 * new SmoothScroller({
 *   friction: 0.9,      // 可选，速度衰减系数
 *   sensitivity: 0.2     // 可选，滚动灵敏度
 * });
 * 
 * 配置参数说明:
 * @param {Object} options 配置项
 * @param {number} [options.friction=0.9] - 速度衰减系数
 *   - 控制滚动的惯性
 *   - 值越小衰减越快（惯性小），建议范围：0.8-0.95
 *   - 默认值0.9适合大多数情况
 * 
 * @param {number} [options.sensitivity=0.2] - 滚动灵敏度
 *   - 控制滚动的响应程度
 *   - 值越大滚动越快，建议范围：0.1-1.0
 *   - 默认值0.2适合日常使用
 * 
 * 注意事项:
 * 1. 该插件会阻止默认的滚动行为
 * 2. 需要现代浏览器支持
 * 3. 建议在页面加载完成后初始化
 * 
 * 示例:
 * // 使用默认配置
 * new SmoothScroller();
 * 
 * // 自定义配置
 * new SmoothScroller({
 *   friction: 0.9,     // 更快停止
 *   sensitivity: 0.2   // 更温和的滚动
 * });
 */

// 平滑滚动插件
class SmoothScroller {
  constructor(options = {}) {
    // 初始化变量
    this.currentY = window.pageYOffset;
    this.velocity = 0;
    
    // 合并默认配置和用户配置
    this.friction = options.friction || 0.9;        
    this.sensitivity = options.sensitivity || 0.2;   
    this.isScrolling = false;
    
    // 记录上一次的滚动位置，用于检测手动滚动
    this.lastScrollY = window.pageYOffset;

    this.bindEvents();
    this.update();
  }

  // 绑定事件
  bindEvents() {
    // 监听鼠标滚轮事件
    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      // 使用灵敏度参数调整滚动速度
      this.velocity += e.deltaY * this.sensitivity;
      this.isScrolling = true;
    }, { passive: false });

    // 监听滚动事件，处理手动拖动滚动条的情况
    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        // 如果不是插件触发的滚动，则同步位置
        const currentScroll = window.pageYOffset;
        if (Math.abs(currentScroll - this.lastScrollY) > 1) {
          this.currentY = currentScroll;
          this.velocity = 0;
        }
      }
      // 更新上一次滚动位置
      this.lastScrollY = window.pageYOffset;
    });
  }

  // 更新滚动位置
  update() {
    if (Math.abs(this.velocity) > 0.1) {
      this.isScrolling = true;
      
      // 应用摩擦力减速
      this.velocity *= this.friction;
      
      // 更新当前位置
      this.currentY += this.velocity;
      
      // 确保不超出页面范围
      this.currentY = Math.max(0, Math.min(
        this.currentY,
        document.documentElement.scrollHeight - window.innerHeight
      ));

      // 应用滚动
      window.scrollTo(0, Math.round(this.currentY));
    } else {
      this.isScrolling = false;
      this.velocity = 0;
    }

    requestAnimationFrame(() => this.update());
  }
}

// 创建实例
window.addEventListener('DOMContentLoaded', () => {
  new SmoothScroller();
});
