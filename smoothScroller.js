/**
 * 平滑滚动插件 (Smooth Scroll Plugin)
 * 
 * 使用方法:
 * new SmoothScroller({
 *   friction: 0.92,     // 可选，速度衰减系数
 *   sensitivity: 0.18   // 可选，滚动灵敏度
 * });
 * 
 * 配置参数说明:
 * @param {Object} options 配置项
 * @param {number} [options.friction=0.92] - 速度衰减系数
 *   - 控制滚动的惯性
 *   - 值越小衰减越快（惯性小），建议范围：0.85-0.95
 *   - 默认值0.92适合大多数情况
 * 
 * @param {number} [options.sensitivity=0.18] - 滚动灵敏度
 *   - 控制滚动的响应程度
 *   - 值越大滚动越快，建议范围：0.1-0.5
 *   - 默认值0.18适合日常使用
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

/**
 * 平滑滚动插件 (Smooth Scroll Plugin)
 * 优化版本 - 使用改进的滚动算法实现更流畅的效果
 */
class SmoothScroller {
  constructor(options = {}) {
    // 初始化变量
    this.currentY = window.pageYOffset;
    this.targetY = this.currentY;
    this.velocity = 0;
    
    // 合并默认配置和用户配置
    this.friction = options.friction || 0.92;        
    this.sensitivity = options.sensitivity || 0.18;   
    
    // 节流相关变量
    this.lastWheelTime = 0;
    this.wheelThrottle = 1000 / 60; // 60fps
    
    // 动画相关
    this.isRunning = false;
    this.maxScrollY = 0;
    
    // 添加手动滚动检测
    this.lastScrollY = window.pageYOffset;
    this.isManualScrolling = false;
    
    this.bindEvents();
    this.updateMaxScroll();
    this.update();
  }

  // 更新最大滚动距离
  updateMaxScroll() {
    this.maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  }

  // 绑定事件
  bindEvents() {
    // 使用节流处理wheel事件
    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      const now = performance.now();
      if (now - this.lastWheelTime >= this.wheelThrottle) {
        // 计算目标位置
        this.velocity += e.deltaY * this.sensitivity;
        this.lastWheelTime = now;
        
        // 确保动画循环在运行
        if (!this.isRunning) {
          this.isRunning = true;
          this.update();
        }
      }
    }, { passive: false });

    // 添加滚动事件监听，处理手动滚动
    window.addEventListener('scroll', () => {
      if (!this.isRunning) {
        const currentScroll = window.pageYOffset;
        // 检测是否是手动滚动
        if (Math.abs(currentScroll - this.lastScrollY) > 1) {
          this.isManualScrolling = true;
          this.currentY = currentScroll;
          this.targetY = currentScroll;
          this.velocity = 0;
        }
        this.lastScrollY = currentScroll;
      } else {
        this.lastScrollY = this.currentY;
      }
    });

    // 监听resize事件，更新最大滚动距离
    window.addEventListener('resize', () => {
      this.updateMaxScroll();
    });

    // 监听文档高度变化
    const resizeObserver = new ResizeObserver(() => {
      this.updateMaxScroll();
    });
    resizeObserver.observe(document.body);
  }

  // 使用LERP算法实现平滑过渡
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  // 更新滚动位置
  update() {
    // 如果是手动滚动，等待下一次wheel事件
    if (this.isManualScrolling) {
      this.isManualScrolling = false;
      this.isRunning = false;
      return;
    }

    // 计算目标位置
    this.targetY += this.velocity;
    this.targetY = Math.max(0, Math.min(this.targetY, this.maxScrollY));

    // 使用LERP实现平滑过渡
    this.currentY = this.lerp(this.currentY, this.targetY, 0.1);
    
    // 应用摩擦力减速
    this.velocity *= this.friction;

    // 应用滚动，使用小数点提高精度
    window.scrollTo({
      top: this.currentY,
      behavior: 'auto' // 使用auto避免与smooth产生冲突
    });

    // 优化动画帧请求
    if (Math.abs(this.velocity) > 0.05 || Math.abs(this.targetY - this.currentY) > 0.05) {
      this.isRunning = true;
      requestAnimationFrame(() => this.update());
    } else {
      this.isRunning = false;
      this.velocity = 0;
      // 确保最终位置精确
      if (Math.abs(this.targetY - this.currentY) > 0.1) {
        window.scrollTo(0, this.targetY);
      }
    }
  }
}

// 等待DOM加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
  new SmoothScroller();
});
