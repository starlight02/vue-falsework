# vue-template
一个基于 vue@cli 3 生成的 vue 2.x 模板项目，无 TypeScript，非 PWA。

## 快速开始
```bash
yarn && yarn start
```

### 生产环境编译
```bash
yarn build
```

### 检查并修复文件
```bash
yarn lint
```

## 如何开发

### 1. 如何新增模块

1. 使用模块新增脚本
    ```bash
    yarn module NEW_MODULE_NAME
    ```
2. 在 `src/modules/NEW_MODULE_NAME/views` 目录下添加 vue 页面
3. 在 `src/modules/NEW_MODULE_NAME/components` 目录下添加模块的组件
3. 在 `src/modules/NEW_MODULE_NAME/assets` 目录下添加**仅本模块使用**的静态资源
4. 在 `src/modules/NEW_MODULE_NAME/routes.js` 文件里添加页面对应的路由
5. 在 `src/modules/NEW_MODULE_NAME/apis.js` 文件里添加本模块的请求配置

### 2. 如何发送请求

如 `apis.js` 里已有以下配置，请求配置的参数除 `restful` 外其他的参数和 `axios` 的一致
```javascript
export default {
    getTest: {
        url: '/user/{id}',
        restful: true,
    }
}
```

在代码中使用 `window.api` 获取请求方法
```javascript
//这些方法返回的都是 Promise
window.api.getTest({id:1}).then(result => {
    //do something
}).catch(error => {
    //do error thing  
})
```
### 3. 优雅地使用异步函数（推荐）

使用 `async/awit` 来解决 Promise 嵌套回调的问题
```javascript
import to from '@/lib/to';

async function foo(){
    const [error,result] = await to(window.api.getTest({id:1}));
    if(error){
        ...
        return;
    }
    ...
}
```
