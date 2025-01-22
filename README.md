# Circle Follower

一个简单优雅的鼠标跟随效果插件。【附赠平滑滚动插件】

## 鼠标跟随插件

### 使用方式

#### 方式一：通过 script 标签直接引入

```html
<script src="https://unpkg.com/circle-follower@latest/index.js"></script>
<script>
  // 创建实例
  const follower = new Follower({
    size: 30,
    borderColor: "#00c569",
    borderWidth: 2,
  });
</script>
```

#### 方式二：在模块化项目中使用

```bash
npm install circle-follower
```

```javascript
import Follower from "circle-follower";

// 创建实例
const follower = new Follower();
```

### 配置选项

创建实例时可以传入配置对象，所有配置项都是可选的：

```javascript
const follower = new Follower({
  // 以下是默认值
  size: 30, // 圆环默认大小
  bgColor: "transparent", // 背景色
  borderColor: "#00c569", // 边框颜色
  borderWidth: 2, // 边框宽度
  backdropFilter: "", // 背景滤镜效果，例如：'blur(5px)'
  hoverSize: 60, // hover时圆环大小
  hoverBgColor: "rgba(0, 255, 0, 0.3)", // hover时背景色
  hoverBackdropFilter: "", // hover时的背景滤镜效果
  speed: 0.15, // 跟随速度(0-1之间)
});
```

### 配置项说明

| 参数                | 说明                             | 类型   | 默认值                 |
| ------------------- | -------------------------------- | ------ | ---------------------- |
| size                | 圆环默认大小（像素）             | Number | 30                     |
| bgColor             | 背景色                           | String | 'transparent'          |
| borderColor         | 边框颜色                         | String | '#00c569'              |
| borderWidth         | 边框宽度（像素）                 | Number | 2                      |
| backdropFilter      | 背景滤镜效果                     | String | ''                     |
| hoverSize           | 鼠标悬停时圆环大小（像素）       | Number | 60                     |
| hoverBgColor        | 鼠标悬停时背景色                 | String | 'rgba(0, 255, 0, 0.3)' |
| hoverBackdropFilter | hover 时的背景滤镜效果           | String | ''                     |
| speed               | 跟随速度，范围 0-1，越大跟随越快 | Number | 0.15                   |

### 实例方法

#### destroy()

销毁实例，移除事件监听和 DOM 元素：

```javascript
const follower = new Follower();
// ... 使用一段时间后
follower.destroy(); // 销毁实例
```

## 平滑滚动插件【赠品】

### 使用方式

```html
<script src="https://unpkg.com/circle-follower@latest/smoothScroller.js"></script>
<script>
  // 实例化平滑滚动插件
  new SmoothScroller({
    friction: 0.9,
    sensitivity: 0.12,
  });
</script>
```

### Demo

- [demo](https://jasonbai008.github.io/circle-follower/test.html)

## License

MIT © JasonBai
