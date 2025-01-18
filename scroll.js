/**
 * 平滑滚动插件 (Smooth Scroll Plugin)
 * 
 * 使用方法:
 * new SmoothScroll({
 *   friction: 0.85,      // 可选，速度衰减系数
 *   sensitivity: 0.5     // 可选，滚动灵敏度
 * });
 * 
 * 配置参数说明:
 * @param {Object} options 配置项
 * @param {number} [options.friction=0.85] - 速度衰减系数
 *   - 控制滚动的惯性
 *   - 值越小衰减越快（惯性小），建议范围：0.8-0.95
 *   - 默认值0.85适合大多数情况
 * 
 * @param {number} [options.sensitivity=0.5] - 滚动灵敏度
 *   - 控制滚动的响应程度
 *   - 值越大滚动越快，建议范围：0.1-1.0
 *   - 默认值0.5适合日常使用
 * 
 * 注意事项:
 * 1. 该插件会阻止默认的滚动行为
 * 2. 需要现代浏览器支持
 * 3. 建议在页面加载完成后初始化
 * 
 * 示例:
 * // 使用默认配置
 * new SmoothScroll();
 * 
 * // 自定义配置
 * new SmoothScroll({
 *   friction: 0.9,     // 更快停止
 *   sensitivity: 0.3   // 更温和的滚动
 * });
 */

// 平滑滚动插件
class SmoothScroll {
  constructor(options = {}) {
    // 初始化变量
    this.currentY = window.pageYOffset;
    this.velocity = 0;
    
    // 合并默认配置和用户配置
    this.friction = options.friction || 0.85;        // 速度衰减系数
    this.sensitivity = options.sensitivity || 0.5;    // 滚动灵敏度
    this.isScrolling = false;

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
  }

  // 更新滚动位置
  update() {
    if (Math.abs(this.velocity) > 0.1) {
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
      // 当速度很小时，完全停止
      this.velocity = 0;
    }

    requestAnimationFrame(() => this.update());
  }
}
