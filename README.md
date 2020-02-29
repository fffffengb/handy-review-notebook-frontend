# handy-review-notebook-frontend

一个根据艾宾浩斯遗忘曲线复习的笔记本



# 开发全流程

## 初始化项目

1. 用vue脚手架新建项目后, 删除不需要的文件.

2. 安装使用ant design组件:

   1. cnpm i --save ant-design-vue

   2. cnpm install babel-plugin-import --dev : 想要按需导入组件需要这个插件

   3. 在main.js中添加如下代码:

      ```javascript
      import { Button } from 'ant-design-vue';
      Vue.use(Button)
      ```

   4. 在App.vue中修改template标签中的内容:

      ```vue
      <template>
        <div id="app">
          <a-button type="primary">Primary</a-button>
        </div>
      </template>
      ```

   5. 运行报错:Failed to resolve loader: less-loader; Error: Cannot find module 'less'

   6. cnpm install --save less-loader less

   7. 运行成功, 打开页面左上角出现ant design的按钮

3. 