# vue-antd-pro
基于vue-cli3 和 [ant-design-vue](https://vue.ant.design/docs/vue/introduce/)搭建的后台管理系统模板，使用json-server做数据mock。

### 数据mock服务启用
使用json-server做数据mock,关于json-server请移步[官网](https://github.com/typicode/json-server)
```
// 进入到server目录
cd server

// 安装依赖
yarn install

// 启动mock服务
yarn start
```


### 前端服务启动
```
// 返回项目根目录
cd ..

// 安装依赖
yarn install

// 启动本地服务
yarn serve
```

### 登录账号
用户名： 任意输入
密码： 字符数字[4-16]位的任意输入

### 生产环境构建
```
yarn run build
```

### 效果预览
![login.png](https://upload-images.jianshu.io/upload_images/1918644-2f1b535917c70642.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![table.gif](https://upload-images.jianshu.io/upload_images/1918644-3f2efc90b9014800.gif?imageMogr2/auto-orient/strip)
![analysis.gif](https://upload-images.jianshu.io/upload_images/1918644-cf68d69c84b192a5.gif?imageMogr2/auto-orient/strip)
![setting.gif](https://upload-images.jianshu.io/upload_images/1918644-85a50254f89fd963.gif?imageMogr2/auto-orient/strip)




##  Todo:
1.  Pie组件颜色有问题
2.  Pie组件Legend点击饼图没有变化
3.  offlineData组件中选中tab字体颜色问题
4.  响应式下销售额柱状图右边距太近
5.  响应式下销售额类别占比图和Legend应该分成两行
