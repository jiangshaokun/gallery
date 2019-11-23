基于 react + redux + react-router 的画廊

![画廊](./gallery.png)

## 修改
可通过修改 `data/` 目录下的 `projectData.js` 与 `images/` 目录下的图片来修改画廊中用到的图片

## 开发
`npm start`

使用[yeoman](yeoman.io)生成器[generator-react-webpack](https://github.com/newtriks/generator-react-webpack)生成目录

## 发布
`npm run build`

需手动修改 `dist/` 目录下 index.html 的 `<script>` 的 `src` 为绝对路径