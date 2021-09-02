---
  to: components/<%= name %>/index.less
---
@import '../style/index.less';

@component: <%= h.changeCase.paramCase(name) %>;
@prefix: ~"@{pkg-name}-@{component}";

.@{prefix}-container {
    display: flex;
}
