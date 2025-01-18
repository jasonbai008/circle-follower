# Circle Follower

一个简单优雅的鼠标跟随效果库。

## 安装

```bash
npm install circle-follower
```

## 使用方式

### 方式一：通过 script 标签直接引入

```html
<script src="https://unpkg.com/circle-follower@1.0.0/index.js"></script>
<script>
  // 创建实例
  const follower = new Follower({
    size: 30,
    borderColor: '#999',
    borderWidth: 1
  });
</script>
```

### 方式二：在模块化项目中使用

```javascript
import Follower from 'circle-follower'

// 创建实例
const follower = new Follower();
```

## 配置选项

创建实例时可以传入配置对象，所有配置项都是可选的：

```javascript
const follower = new Follower({
  // 以下是默认值
  size: 30,                           // 圆环默认大小
  borderColor: '#999',                // 边框颜色
  borderWidth: 1,                     // 边框宽度
  hoverSize: 50,                      // hover时圆环大小
  hoverColor: 'rgba(0, 255, 0, 0.3)', // hover时背景色
  speed: 0.15                         // 跟随速度(0-1之间)
});
```

### 配置项说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| size | 圆环默认大小（像素） | Number | 30 |
| borderColor | 边框颜色 | String | '#999' |
| borderWidth | 边框宽度（像素） | Number | 1 |
| hoverSize | 鼠标悬停时圆环大小（像素） | Number | 50 |
| hoverColor | 鼠标悬停时背景色 | String | 'rgba(0, 255, 0, 0.3)' |
| speed | 跟随速度，范围 0-1，越大跟随越快 | Number | 0.15 |

## 实例方法

### destroy()

销毁实例，移除事件监听和 DOM 元素：

```javascript
const follower = new Follower();
// ... 使用一段时间后
follower.destroy(); // 销毁实例
```

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## License

MIT © JasonBai
