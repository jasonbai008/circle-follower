<template>
  <div class="custom_cursor" :style="cursorStyle" ref="cursor"></div>
</template>

<script>
/**
 * 鼠标跟随组件(Vue2)
 * 
 * Author: Jason Bai
 * Github: https://github.com/jasonbai008/circle-follower
 *
 * 1. 引入组件
 * import Follower from 'circle-follower/Follower.vue'
 *
 * 2. 全局注册组件
 * app.component('Follower', Follower)
 *
 * 3. 使用组件，可传入自定义配置
 * <Follower :options="followerOptions"/>
 *
 * export default {
 *   data() {
 *     return {
 *       followerOptions: {
 *         size: 30,                           // 圆环默认大小
 *         borderColor: '#999',                // 边框颜色
 *         borderWidth: 1,                     // 边框宽度
 *         hoverSize: 50,                      // hover时圆环大小
 *         hoverColor: 'rgba(0, 255, 0, 0.3)', // hover时背景色
 *         speed: 0.15                         // 跟随速度(0-1之间)
 *       }
 *     }
 *   }
 * }
 *
 * 4. 也可以不传options，使用默认配置
 * <Follower />
 */

// 添加全局单例控制
const GlobalFollowerSymbol = Symbol("follower-instance");

export default {
  name: "follower",
  props: {
    // 组件配置选项
    options: {
      type: Object,
      default: () => ({
        // 圆圈默认半径（单位：px）
        size: 30,
        // 边框颜色
        borderColor: "#999",
        // 边框宽度
        borderWidth: 1,
        // hover 时的大小
        hoverSize: 50,
        // hover 时的背景色
        hoverColor: "rgba(0, 255, 0, 0.3)",
        // 跟随动画的速度（0-1之间，越小越慢）
        speed: 0.15,
      }),
    },
  },

  data() {
    return {
      // 鼠标位置
      mouseX: 0,
      mouseY: 0,
      // 圆环位置
      cursorX: 0,
      cursorY: 0,
      // 是否处于hover状态
      isHover: false,
      // 动画帧ID
      animationFrameId: null,
    };
  },

  // 添加 beforeCreate 生命周期钩子进行单例检查
  beforeCreate() {
    if (window[GlobalFollowerSymbol]) {
      console.warn("Follower 组件实例已存在，请勿重复创建");
      this.$destroy();
      return;
    }
    window[GlobalFollowerSymbol] = this;
  },

  computed: {
    cursorStyle() {
      const size = this.isHover ? this.options.hoverSize : this.options.size;
      return {
        width: `${size}px`,
        height: `${size}px`,
        border: this.isHover ? "none" : `${this.options.borderWidth}px solid ${this.options.borderColor}`,
        borderRadius: "50%",
        position: "fixed",
        pointerEvents: "none",
        transition: "width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out, border 0.15s ease-out",
        zIndex: 9999,
        left: "0",
        top: "0",
        // 使用 transform 定位并保持居中
        transform: `translate3d(${this.cursorX}px, ${this.cursorY}px, 0) translate(-50%, -50%)`,
        willChange: "transform",
        backgroundColor: this.isHover ? this.options.hoverColor : "transparent",
      };
    },
  },

  mounted() {
    // 初始化鼠标位置为视窗中心
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.cursorX = this.mouseX;
    this.cursorY = this.mouseY;

    // 添加事件监听
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseleave", this.handleMouseLeave);
    document.addEventListener("mouseenter", this.handleMouseEnter);

    // 启动动画
    this.startAnimation();
  },

  // 修改 beforeDestroy 为 beforeUnmount（vue2中仍使用 beforeDestroy）
  beforeDestroy() {
    // 清理事件监听和动画
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseleave", this.handleMouseLeave);
    document.removeEventListener("mouseenter", this.handleMouseEnter);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // 清除单例引用
    if (window[GlobalFollowerSymbol] === this) {
      window[GlobalFollowerSymbol] = null;
    }
  },

  methods: {
    handleMouseMove(e) {
      // 更新鼠标位置
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      const targetElement = e.target;
      // 获取目标元素的 cursor 样式
      const cursorStyle = window.getComputedStyle(targetElement).cursor;
      // 如果是 pointer,则显示 hover 效果
      this.isHover = cursorStyle === "pointer";
    },

    handleMouseLeave() {
      this.$refs.cursor.style.opacity = "0";
    },

    handleMouseEnter() {
      this.$refs.cursor.style.opacity = "1";
    },

    startAnimation() {
      const animate = () => {
        // 使用线性插值计算新位置
        this.cursorX += (this.mouseX - this.cursorX) * this.options.speed;
        this.cursorY += (this.mouseY - this.cursorY) * this.options.speed;

        // 不需要手动更新 transform，
        // Vue 会通过响应式自动更新 cursorStyle 中的 transform 属性

        this.animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    },
  },
};
</script>

<style scoped></style>
