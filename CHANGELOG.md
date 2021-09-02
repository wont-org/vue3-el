## 0.1.1-alpha.3 (2021-08-25)

### Features

-   WidgetForm 组件，formItemLabel ts 类型转向 antv

## 0.1.1-alpha.2

`2021-8-16`

### Bug Fixes

-   WidgetForm 处理 antd FormItem, layout="inline"，上下间距 0 问题。

## 0.1.1-alpha

`2021-8-16`

-   版本变更，vue ~3.0.5=> ^3.2.2， ant-design-vue ~2.1.6 => ^2.2.6。其中 antd 有破坏性更新。移除 type="danger"，新增 `danger` 属性 [#4291](https://github.com/vueComponent/ant-design-vue/issues/4291)
-   重构。使用 context.expose 代替 useProxyRef，useProxyRef 即将废弃
