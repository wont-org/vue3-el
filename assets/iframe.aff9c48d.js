var xe=Object.defineProperty,Me=Object.defineProperties;var Re=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var te=(t,o,r)=>o in t?xe(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r,m=(t,o)=>{for(var r in o||(o={}))Z.call(o,r)&&te(t,r,o[r]);if(B)for(var r of B(o))ee.call(o,r)&&te(t,r,o[r]);return t},g=(t,o)=>Me(t,Re(o));var oe=(t,o)=>{var r={};for(var e in t)Z.call(t,e)&&o.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&B)for(var e of B(t))o.indexOf(e)<0&&ee.call(t,e)&&(r[e]=t[e]);return r};import{c as n,A as Ie,M as Se,b as Ce,d as j,a as s,B as Pe,e as A,r as $,w as ne,o as _e,l as P,k as Te,f as De,g as Ne,F as ae,R as Fe,i as Oe,I as z,h as U,D as Ee,j as _,S as re,C as Be,m as H,n as je,p as Ae,t as Le,q as le,s as Ve,u as qe,v as We,x as $e,y as ze,z as Ue,E as He,G as Ye,H as Xe,J as Ge,K as Je,L as Ke,N as Qe,O as Ze,P as et}from"./vendor.1867b50d.js";const tt=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))e(c);new MutationObserver(c=>{for(const p of c)if(p.type==="childList")for(const b of p.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&e(b)}).observe(document,{childList:!0,subtree:!0});function r(c){const p={};return c.integrity&&(p.integrity=c.integrity),c.referrerpolicy&&(p.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?p.credentials="include":c.crossorigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function e(c){if(c.ep)return;c.ep=!0;const p=r(c);fetch(c.href,p)}};tt();const ot={controls:{matchers:{color:/(background|color)$/i,date:/Date$/}},backgrounds:{default:"white",values:[{name:"white",value:"#f4f4f4"},{name:"black",value:"#333"}]}};var nt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",parameters:ot}),at="/assets/code-brackets.9ef6443e.svg",rt="/assets/colors.ac9401f3.svg",lt="/assets/comments.f15a6837.svg",st="/assets/direction.94a9917f.svg",it="/assets/flow.275142c6.svg",ct="/assets/plugin.57148314.svg",dt="/assets/repo.fb4ece47.svg",ut="/assets/stackalt.2ad81543.svg";const pt={},mt="wrapper";function se(r){var e=r,{components:t}=e,o=oe(e,["components"]);return n(mt,g(m(m({},pt),o),{components:t,mdxType:"MDXLayout"}),n(Se,{title:"About/Introduction",mdxType:"Meta"}),n("style",null,`
  .subheading {
    --mediumdark: '#999999';
    font-weight: 900;
    font-size: 13px;
    color: #999;
    letter-spacing: 6px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 12px;
    margin-top: 40px;
  }

  .link-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 10px;
  }

  @media (min-width: 620px) {
    .link-list {
      row-gap: 20px;
      column-gap: 20px;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media all and (-ms-high-contrast:none) {
  .link-list {
      display: -ms-grid;
      -ms-grid-columns: 1fr 1fr;
      -ms-grid-rows: 1fr 1fr;
    }
  }

  .link-item {
    display: block;
    padding: 20px 30px 20px 15px;
    border: 1px solid #00000010;
    border-radius: 5px;
    transition: background 150ms ease-out, border 150ms ease-out, transform 150ms ease-out;
    color: #333333;
    display: flex;
    align-items: flex-start;
  }

  .link-item:hover {
    border-color: #1EA7FD50;
    transform: translate3d(0, -3px, 0);
    box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
  }

  .link-item:active {
    border-color: #1EA7FD;
    transform: translate3d(0, 0, 0);
  }

  .link-item strong {
    font-weight: 700;
    display: block;
    margin-bottom: 2px;
  }

  .link-item img {
    height: 40px;
    width: 40px;
    margin-right: 15px;
    flex: none;
  }

  .link-item span {
    font-size: 14px;
    line-height: 20px;
  }

  .tip {
    display: inline-block;
    border-radius: 1em;
    font-size: 11px;
    line-height: 12px;
    font-weight: 700;
    background: #E7FDD8;
    color: #66BF3C;
    padding: 4px 12px;
    margin-right: 10px;
    vertical-align: top;
  }

  .tip-wrapper {
    font-size: 13px;
    line-height: 20px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .tip-wrapper code {
    font-size: 12px;
    display: inline-block;
  }


`),n("h1",null,"Welcome to Storybook"),n("p",null,`Storybook helps you build UI components in isolation from your app's business logic, data, and context.
That makes it easy to develop hard-to-reach states. Save these UI states as `,n("strong",{parentName:"p"},"stories")," to revisit during development, testing, or QA."),n("p",null,`Browse example stories now by navigating to them in the sidebar.
View their code in the `,n("inlineCode",{parentName:"p"},"./stories"),` directory to learn how they work.
We recommend building UIs with a `,n("a",{parentName:"p",href:"https://componentdriven.org"},n("strong",{parentName:"a"},"component-driven"))," process starting with atomic components and ending with pages."),n("div",{className:"subheading"},"Configure"),n("div",{className:"link-list"},n("a",{className:"link-item",href:"https://storybook.js.org/docs/react/addons/addon-types",target:"_blank"},n("img",{src:ct,alt:"plugin"}),n("span",null,n("strong",null,"Presets for popular tools"),"Easy setup for TypeScript, SCSS and more.")),n("a",{className:"link-item",href:"https://storybook.js.org/docs/react/configure/webpack",target:"_blank"},n("img",{src:ut,alt:"Build"}),n("span",null,n("strong",null,"Build configuration"),"How to customize webpack and Babel")),n("a",{className:"link-item",href:"https://storybook.js.org/docs/react/configure/styling-and-css",target:"_blank"},n("img",{src:rt,alt:"colors"}),n("span",null,n("strong",null,"Styling"),"How to load and configure CSS libraries")),n("a",{className:"link-item",href:"https://storybook.js.org/docs/react/get-started/setup#configure-storybook-for-your-stack",target:"_blank"},n("img",{src:it,alt:"flow"}),n("span",null,n("strong",null,"Data"),"Providers and mocking for data libraries"))),n("div",{className:"subheading"},"Learn"),n("div",{className:"link-list"},n("a",{className:"link-item",href:"https://storybook.js.org/docs",target:"_blank"},n("img",{src:dt,alt:"repo"}),n("span",null,n("strong",null,"Storybook documentation"),"Configure, customize, and extend")),n("a",{className:"link-item",href:"https://storybook.js.org/tutorials/",target:"_blank"},n("img",{src:st,alt:"direction"}),n("span",null,n("strong",null,"In-depth guides"),"Best practices from leading teams")),n("a",{className:"link-item",href:"https://github.com/storybookjs/storybook",target:"_blank"},n("img",{src:at,alt:"code"}),n("span",null,n("strong",null,"GitHub project"),"View the source and add issues")),n("a",{className:"link-item",href:"https://discord.gg/storybook",target:"_blank"},n("img",{src:lt,alt:"comments"}),n("span",null,n("strong",null,"Discord chat"),"Chat with maintainers and the community"))),n("div",{className:"tip-wrapper"},n("span",{className:"tip"},"Tip"),"Edit the Markdown in"," ",n("code",null,"./stories/Introduction.stories.mdx")))}se.isMDXComponent=!0;const ie=()=>{throw new Error("Docs-only story")};ie.parameters={docsOnly:!0};const D={title:"About/Introduction",includeStories:["__page"]},ft={};D.parameters=D.parameters||{};D.parameters.docs=g(m({},D.parameters.docs||{}),{page:()=>n(Ie,{mdxStoryNameToKey:ft,mdxComponentMeta:D},n(se,null))});var gt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",__page:ie,default:D});const yt=["default","link","text","dashed","ghost","primary"],ce=["success","info","warning"],ht=Ce();var Y=j({name:"Button",props:g(m({},ht),{btnType:{type:String,default:""}}),setup(t,{slots:o}){const r=t.btnType||t.type;return()=>{const e=r?`ant-btn-${r}`:"";return s("section",{class:"ant-btn-wrap"},[s(Pe,m({class:`${e}`},t),{default:()=>[typeof o.default=="function"&&o.default()]})])}}});const X=[...yt,...ce];var bt={parameters:{storySource:{source:`import {
    Story, Meta 
} from '@storybook/vue3'
import type { ButtonProps } from 'ant-design-vue'
import Button, {
    btnType, antdBtnType 
} from '.'

const options = [...antdBtnType, ...btnType]
export default {
    title: 'Form/Button',
    component: Button,
    argTypes: {
        btnType: {
            description: \`antdv\u7684type\u57FA\u7840\u4E0A\u6269\u5C55\u4E86\u4E09\u79CD\uFF0C\u5206\u522B\u662F\${btnType.join(
                ','
            )}\`,
            table: {
                defaultValue: {
                    summary: 'default',
                },
                type: {
                    summary: options,
                },
            },
            options,
            control: {
                type: 'select',
                labels: options,
            },
        },
    },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const Default = Template.bind({})
Default.args = {
    btnType: 'default',
}
`,locationsMap:{default:{startLoc:{col:37,line:35},endLoc:{col:80,line:35},startBody:{col:37,line:35},endBody:{col:80,line:35}}}}},title:"Form/Button",component:Y,argTypes:{btnType:{description:`antdv\u7684type\u57FA\u7840\u4E0A\u6269\u5C55\u4E86\u4E09\u79CD\uFF0C\u5206\u522B\u662F${ce.join(",")}`,table:{defaultValue:{summary:"default"},type:{summary:X}},options:X,control:{type:"select",labels:X}}}};const vt=t=>s(Y,t,{default:()=>[A("Button")]}),de=vt.bind({});de.args={btnType:"default"};const wt=["Default"];var kt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:bt,Default:de,__namedExportsOrder:wt});const xt=(t,o)=>t.map(r=>({value:r[o.value]||"",label:r[o.label]})),Mt=(t,o)=>{if(!o)return[];const r=[];let e=!1;const c=p=>{for(let b=0;b<p.length&&!e;b+=1)if(r[p[b].level-1]=p[b].categoryId,p[b].categoryId===o){e=!0;break}else p[b].childs&&c(p[b].childs||[])};return c(t),e?r:[]};var L=j({name:"ProxyOption",props:{options:{type:[Array,Function],default:()=>[]},deps:{type:Array,default:()=>[]},type:{type:String,default:""},fieldNames:{type:Object,default:()=>({value:"value",label:"label"})}},setup(t,{slots:o}){const r=$({options:[]}),e=async()=>{let c=[];typeof t.options=="function"?c=await t.options()||[]:c=t.options||[],t.type!=="cascader"&&t.fieldNames&&Array.isArray(c)&&c.length>0&&(c=xt(c,t.fieldNames)),r.options=c};return ne(()=>[t.deps,t.options],async([c,p],[b,N])=>{P.exports.isEqual(c,b)?P.exports.isEqual(p,N)||(console.log("opt update"),await e()):(console.log("deps update"),await e())}),_e(async()=>{await e()}),()=>s("div",null,[typeof o.default=="function"?o.default(r.options):null])}});const R={date:"YYYY-MM-DD",time:"HH:mm:ss",datetime:"YYYY-MM-DD HH:mm:ss"};function T(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!Oe(t)}const ue=j({name:"WidgetForm",props:{dataSource:{type:Array,required:!0},config:{type:Object,default:()=>({})},watchInitModel:{type:Object,default:()=>({updateState:!1,emitInitModel:!1})},onInitModel:{type:Function,default:()=>{}},onChange:{type:Function,default:()=>{}}},emits:["update:value"],setup(t,{emit:o,expose:r}){const e=$({modelRef:{},rulesRef:{}}),c=Te(()=>({rootCls:{".ant-form-item-reset":{marginBottom:"10px"},".select-reset":{minWidth:"160px"},".input-reset":{minWidth:"140px",width:"auto"},".sep":{width:"20px",textAlign:"center",display:"inline-block"},".mr20":{marginRight:"20px"},".mr30":{marginRight:"30px"}}})),p=De(),b=()=>{const d={},a={};return t.dataSource.forEach(v=>{const{name:y,value:k,type:I,rules:w=[],isHidden:F}=v;if(y&&!F)if(a[y]=w,Array.isArray(k))if(I==="rangePicker"){const x={momentDate:[],dateString:[],second:[],msec:[],daySecond:[]};k.forEach(S=>{const M=new Date(S),h=M.getTime(),q=Math.floor(h/1e3),W=+_(h).startOf("day").format("X");x.momentDate.push(_(M,R.datetime)),x.dateString.push(_(M,R.datetime).format(R.datetime)),x.second.push(q),x.msec.push(h),x.daySecond.push(W)}),d[y]=x}else d[y]=[...k];else d[y]=k}),{rawModel:d,rawRules:a}},N=()=>{const{rawModel:d,rawRules:a}=b();Object.keys(d).forEach(v=>{e.modelRef[v]=d[v],e.rulesRef[v]=a[v]})};r({initModelRef:N,validate:d=>p.value.validate(d),validateFields:d=>p.value.validateFields(d),clearValidate:d=>{p.value.clearValidate(d)}});const ye=d=>{const{name:a="",eventName:v="",compProps:y={},selfProps:k={},customRender:I}=d,{type:w,fieldNames:F,deps:x={},options:S}=k,M=()=>{const i=[],{options:u=[]}=x;return u.forEach(l=>{e.modelRef[l]&&i.push(e.modelRef[l])}),i},h=i=>{i||v&&o(v,e.modelRef),t.onChange(Le(e.modelRef)),o("update:value",e.modelRef)},q=(i,u,l)=>{const f=[],O=[],E=[],J=[],K=typeof u=="function"?u():u;K.forEach((C,be)=>{typeof C=="string"&&(C=_(C,R.datetime));const Q=l[be];C=_(Q,R.datetime);const ve=+C.format("x"),we=Math.floor(+C.format("X")),ke=+C.startOf("day").format("X");O.push(we),E.push(ve),J.push(ke),f.push(Q)}),e.modelRef[i]={momentDate:K,dateString:f,second:O,msec:E,daySecond:J},h()},W=i=>{e.modelRef[a]=i,h()};switch(d.type){case"customRender":return I&&s(I,g(m({allowClear:!0},y),{onChange:W,value:e.modelRef[a]}),null);case"input":return s("section",null,[w==="number"?s(U,g(m({class:"input-reset",precision:0,min:0,onChange:()=>{h(!1)}},y),{value:e.modelRef[a],"onUpdate:value":i=>e.modelRef[a]=i}),null):s(z,g(m({class:"input-reset",allowClear:!0,onChange:()=>{h(!1)}},y),{value:e.modelRef[a],"onUpdate:value":i=>e.modelRef[a]=i}),null)]);case"switch":return s(Ae,g(m({onClick:()=>{h(!1)}},y),{checked:e.modelRef[a],"onUpdate:checked":i=>e.modelRef[a]=i}),null);case"checkbox":return s(L,{options:S,type:d.type,deps:M(),fieldNames:F},{default:i=>s(je.Group,g(m({onChange:(u=[])=>{if(v){const l=i.filter(f=>u.includes(f.value));o(v,l,u,e.modelRef),h(!0)}}},y),{options:i,value:e.modelRef[a],"onUpdate:value":u=>e.modelRef[a]=u}),null)});case"radio":return s(L,{options:S,type:d.type,deps:M(),fieldNames:F},{default:i=>{let u;return s(H.Group,g(m({onChange:l=>{if(v){const f=P.exports.get(l,"target.value",""),O=i.filter(E=>f===E.value);o(v,f,O,e.modelRef),h(!0)}}},y),{value:e.modelRef[a],"onUpdate:value":l=>e.modelRef[a]=l}),T(u=i.map(({value:l,label:f})=>s("span",{key:l},[w==="button"&&s(H.Button,{value:l},T(f)?f:{default:()=>[f]}),w==="radio"&&s(H,{value:l},T(f)?f:{default:()=>[f]})])))?u:{default:()=>[u]})}});case"btnGroup":return(S||[]).map(({compProps:i={},eventName:u="",label:l=""})=>s(Y,g(m({class:"mr20",key:l},i),{onClick:()=>{u&&o(u,e.modelRef),console.log("stateRef.modelRef :>> ",e.modelRef)}}),T(l)?l:{default:()=>[l]}));case"cascader":return s(L,{options:S,type:d.type,deps:M()},{default:i=>{if(P.exports.get(e,`modelRef[${a}].length`)===1){const l=P.exports.get(e.modelRef,`${a}[0]`),f=Mt(i,l);f.length>0&&(e.modelRef[a]=f)}return s(Be,g(m({onChange:()=>{h(!1)}},y),{options:i,value:e.modelRef[a],"onUpdate:value":l=>e.modelRef[a]=l}),null)}});case"select":return s(L,{options:S,type:d.type,deps:M(),fieldNames:F},{default:i=>{let u;return s(re,g(m({class:"select-reset",onChange:()=>{h(!1)},allowClear:!0},y),{value:e.modelRef[a],"onUpdate:value":l=>e.modelRef[a]=l}),T(u=i.map(({value:l,label:f})=>s(re.Option,{key:l,value:l},T(f)?f:{default:()=>[f]})))?u:{default:()=>[u]})}});case"rangePicker":return P.exports.get(e,`modelRef.${a}.momentDate`)&&s(Ee.RangePicker,g(m({showTime:{defaultValue:[_("00:00:00",R.time),_("23:59:59",R.time)]},format:R.datetime,style:{width:"380px"}},y),{value:e.modelRef[a].momentDate,onChange:(u,l)=>{q(a,u,l)}}),null);case"rangeInput":{const[i={},u={}]=y;return Array.isArray(e.modelRef[a])?s("section",null,[w==="input"&&s(z,g(m({class:"input-reset",allowClear:!0,onChange:()=>{h(!1)}},i),{value:e.modelRef[a][0],"onUpdate:value":l=>e.modelRef[a][0]=l}),null),w==="number"&&s(U,g(m({class:"input-reset",precision:0,min:0,onChange:()=>{h(!1)}},i),{value:e.modelRef[a][0],"onUpdate:value":l=>e.modelRef[a][0]=l}),null),s("span",{class:"sep"},[A("~")]),w==="input"&&s(z,g(m({class:"input-reset",allowClear:!0,onChange:()=>{h(!1)}},u),{value:e.modelRef[a][1],"onUpdate:value":l=>e.modelRef[a][1]=l}),null),w==="number"&&s(U,g(m({class:"input-reset",precision:0,min:0,onChange:()=>{h(!1)}},u),{value:e.modelRef[a][1],"onUpdate:value":l=>e.modelRef[a][1]=l}),null)]):null}default:return null}},G=(d=!1)=>{const{rawModel:a}=b();t.watchInitModel.updateState&&(N(),console.log("initModelRef")),(d||t.watchInitModel.emitInitModel)&&(t.onInitModel(a),console.log("onInitModel"))};ne(()=>t.dataSource,(d,a)=>{P.exports.isEqual(d,a)||G()}),Ne(()=>{N(),G(!0)});const{rootCls:he}=c.value;return()=>{let d;return s(ae,g(m({layout:"inline",class:he},t.config),{model:e.modelRef,rules:e.rulesRef,ref:p}),T(d=t.dataSource.map(a=>{const{formItemLabel:v,name:y="",isHidden:k,extraRender:I={},formItemProps:w={}}=a;return!k&&s(ae.Item,m({class:"ant-form-item-reset mr30",key:`${v}`,name:y,label:v},w),{default:()=>[ye(a),s(Fe,null,{default:()=>[I.tips&&s(I.tips,null,null)]})]})}))?d:{default:()=>[d]})}}}),V=[{label:"\u73A9\u7269\u5E73\u53F0",value:1},{label:"212",value:2}],Rt=[{label:"\u4E00\u7EA7\u7C7B\u76EE-1",value:"1-1",level:1,children:[{label:"\u4E8C\u7EA7\u7C7B\u76EE-1",value:"2-1",level:2,children:[{label:"\u4E09\u7EA7\u7C7B\u76EE-1",value:"3-1",level:3}]}]},{label:"\u4E00\u7EA7\u7C7B\u76EE-2",value:"1-2",level:1,children:[{label:"\u4E8C\u7EA7\u7C7B\u76EE-2",value:"2-2",level:2}]}],It=[{label:"link",eventName:"reset",compProps:{type:"link"}},{label:"default",eventName:"reset",compProps:{type:"default"}},{label:"primary",eventName:"query",compProps:{type:"primary"}},{label:"danger",eventName:"submit",compProps:{danger:!0}},{label:"success",eventName:"submit",compProps:{btnType:"success"}},{label:"info",eventName:"submit",compProps:{btnType:"info"}},{label:"warning",eventName:"submit",compProps:{btnType:"warning"}}],St=[{label:"\u6628\u65E5\u6570\u636E",value:1},{label:"7\u65E5\u6570\u636E",value:2},{label:"30\u65E5\u6570\u636E",value:3}],pe=[{formItemLabel:s("b",null,[A("\u81EA\u5B9A\u4E49\u7EC4\u4EF6")]),type:"customRender",value:null,name:"select",compProps:{placeholder:"\u8BF7\u9009\u62E9"},selfProps:{options:V},customRender:()=>s("div",null,[A("customRender")])},{formItemLabel:"\u6587\u672C/\u6570\u5B57",type:"input",value:null,name:"text",compProps:{placeholder:"\u8BF7\u8F93\u5165",type:"text"},selfProps:{},rules:[{type:"number",required:!0,message:"\u8BF7\u586B\u5199\u6570\u5B57",trigger:"change"},{validator:async(t,o="")=>o.length<3?Promise.reject(new Error("\u957F\u5EA6\u4E0D\u53EF\u4EE5\u5C0F\u4E8E3")):Promise.resolve(),trigger:"change"}]},{formItemLabel:"\u4E0B\u62C9\u9009\u62E9",type:"select",value:null,name:"select",selfProps:{options:V},compProps:{placeholder:"\u8BF7\u9009\u62E9"}},{formItemLabel:"\u591A\u7EA7\u83DC\u5355",type:"cascader",value:[],selfProps:{options:Rt,fieldNames:{label:"name",value:"cid",children:"children"}},name:"cascader",compProps:{placeholder:"\u8BF7\u9009\u62E9"}},{formItemLabel:"\u65E5\u671F\u533A\u95F4",type:"rangePicker",value:["2021-4-4 00:00:00","2021-4-5 23:59:59"],name:"rangePicker",compProps:{placeholder:["\u5F00\u59CB\u65F6\u95F4","\u7ED3\u675F\u65F6\u95F4"]}},{formItemLabel:"\u6587\u672C\u533A\u95F4",type:"rangeInput",value:[1,100],name:"rangeInput",compProps:[{placeholder:"\u8BF7\u8F93\u5165\u4F9B\u8D27\u4EF7"},{placeholder:"\u8BF7\u8F93\u5165\u4F9B\u8D27\u4EF7"}],selfProps:{type:"number"}},{formItemLabel:"  ",type:"btnGroup",selfProps:{options:It},formItemProps:{colon:!1,labelCol:{span:10}}},{formItemLabel:"\u5355\u9009",type:"radio",value:1,name:"radio",eventName:"radio",compProps:{buttonStyle:"solid"},selfProps:{options:V,type:"radio"}},{formItemLabel:"\u591A\u9009",type:"checkbox",value:[],name:"checkbox",eventName:"checkbox",selfProps:{options:St}},{formItemLabel:"\u5F00\u5173",type:"switch",value:!1,name:"switch",eventName:"switch",compProps:{checkedChildren:"\u9009\u4E2D",unCheckedChildren:"\u672A\u9009\u4E2D"},isHidden:!1}],Ct=()=>{const t=[{label:"\u5F02\u6B65\u6570\u636E1",value:"1"}];return new Promise(o=>{setTimeout(()=>{console.log("fetch"),o(t)},2e3)})},Pt=[{formItemLabel:"\u4E0B\u62C91",type:"select",value:"1",name:"select1",selfProps:{options:V},compProps:{placeholder:"\u8BF7\u9009\u62E9"},formItemProps:{required:!0}},{formItemLabel:"\u4E0B\u62C92\u3002\u4E0B\u62C91\u66F4\u65B0\u65F6\uFF0C\u91CD\u65B0\u53D1\u8D77\u8BF7\u6C42",type:"select",value:null,name:"select2",selfProps:{options:async()=>await Ct(),deps:{options:["select1"]}},compProps:{placeholder:"\u8BF7\u9009\u62E9"},formItemProps:{required:!0}}];var _t={title:"Form/WidgetForm",component:ue,parameters:{storySource:{source:`import {
    Story, Meta 
} from '@storybook/vue3'
import {
    defineComponent, reactive 
} from 'vue'
import WidgetForm, { WidgetFormProps } from '.'
import {
    mockData, formDateSource 
} from './demos'

export default {
    title: 'Form/WidgetForm',
    component: WidgetForm,
    parameters: {
        docs: {
            description: {
                component:
                    '\u591A\u529F\u80FDform\uFF0C\u53EF\u7528\u6765\u505A\u8868\u5355\uFF0C\u8868\u683C\u641C\u7D22\u9879\u3002\u5185\u7F6E\u7EC4\u4EF6\u8131\u80CE\u4E8Eantdv',
            },
        },
    },
    argTypes: {
        dataSource: {
            description:
                '\u8868\u5355\u914D\u7F6E\u539F\u6570\u636E\u3002<br/>\u8868\u5355\u6570\u636E\u4F1A\u6839\u636EDataSourceItem, \u5C06name\u4F5C\u4E3Akey, value\u4F5C\u4E3A\u9ED8\u8BA4\u503C\u751F\u6210\u3002<br/>\u7C7B\u578B\u8BE6\u89C1\`DataSourceItem[]\`',
            type: {
                required: true,
            },
            table: {
                defaultValue: {
                    summary: '\u5FC5\u9009\uFF0C\u65E0\u9ED8\u8BA4\u503C\u3002\u8BE6\u89C1\u53F3\u4FA7control\u6570\u636E',
                },
            },
            control: {
                type: 'array',
                labels: mockData,
            },
        },
        config: {
            description:
                '\u53C2\u7167antdv\uFF0Cmodel\u548Crules\u81EA\u52A8\u751F\u6210\uFF0C\u4E0D\u9700\u8981\u4F20\u3002\u7C7B\u578B\u8BE6\u89C1\`FormProps\`',
            type: {
                required: false,
            },
            table: {
                defaultValue: {
                    summary: '\u53EF\u9009\uFF0C\u9ED8\u8BA4\u503C\u540Cantdv\u7684form props',
                },
            },
            control: {
                type: 'object',
                // labels: {},
            },
        },
        watchInitModel: {
            description:
                'dataSource\u53D8\u5316\u65F6\uFF0C\u89E6\u53D1onInitModel\u65B9\u6CD5\u3002<br/>**\u614E\u7528\uFF01**\u5982onInitModel\u65B9\u6CD5\u4E2D\u6709\u526F\u4F5C\u7528\uFF0C\u5219\u4F1A\u5BFC\u81F4\u9012\u5F52\u3002<br/>\u4E00\u822C\u60C5\u51B5\uFF0ConInitModel\u4E0EwatchInitModel\u4E0D\u5171\u5B58\u3002',
            type: {
                required: false,
            },
            table: {
                defaultValue: {
                    summary: \`\u53EF\u9009\u3002\u8BE6\u89C1\u53F3\u4FA7control\u6570\u636E\`,
                },
            },
            control: {
                type: 'object',
            },
        },
        onInitModel: {
            description: '\u8868\u5355\u521D\u59CB\u5316\u65F6\u4F1A\u89E6\u53D1\u6B64\u65B9\u6CD5\uFF0C\u5165\u53C2\u662F\u521D\u59CB\u5316\u8868\u5355\u6570\u636E',
            type: {
                required: false,
            },
            table: {
                defaultValue: {
                    summary: \`()=> {}\`,
                },
            },
            control: {
                type: 'function',
            },
        },
        onChange: {
            description: '\u8868\u5355\u6570\u636E\u53D8\u5316\u65F6\u8C03\u7528\u3002',
            type: {
                required: false,
            },
            table: {
                defaultValue: {
                    summary: \`()=> {}\`,
                },
            },
            control: {
                type: 'function',
            },
        },
    },
} as Meta

const Template: Story<WidgetFormProps> = (args) =>
    defineComponent({
        name: 'WidgetFormTemplate',
        setup() {
            const stateRef = reactive({
                formModel: {},
            })
            return () => {
                return (
                    <WidgetForm
                        {...args}
                        onChange={(data) => {
                            console.log(
                                'stateRef.formModel, data :>> ',
                                stateRef.formModel,
                                data
                            )
                            stateRef.formModel = data
                        }}
                    />
                )
            }
        },
    })

// \u7EC4\u4EF6\u603B\u89C8
export const Overview = Template.bind({})
Overview.args = {
    dataSource: mockData,
    onInitModel: (state) => {
        console.log('onInitModel :>> ', state)
    },
}

// \u8868\u5355\u5F62\u5F0F
export const FormModel = Template.bind({})
FormModel.args = {
    dataSource: formDateSource,
    config: {
        layout: 'horizontal',
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        labelAlign: 'right',
    },
    watchInitModel: {
        updateState: false,
        emitInitModel: false,
    },
    onInitModel: (state) => {
        console.log('onInitModel :>> ', state)
    },
}
`,locationsMap:{overview:{startLoc:{col:41,line:102},endLoc:{col:6,line:125},startBody:{col:41,line:102},endBody:{col:6,line:125}},"form-model":{startLoc:{col:41,line:102},endLoc:{col:6,line:125},startBody:{col:41,line:102},endBody:{col:6,line:125}}}},docs:{description:{component:"\u591A\u529F\u80FDform\uFF0C\u53EF\u7528\u6765\u505A\u8868\u5355\uFF0C\u8868\u683C\u641C\u7D22\u9879\u3002\u5185\u7F6E\u7EC4\u4EF6\u8131\u80CE\u4E8Eantdv"}}},argTypes:{dataSource:{description:"\u8868\u5355\u914D\u7F6E\u539F\u6570\u636E\u3002<br/>\u8868\u5355\u6570\u636E\u4F1A\u6839\u636EDataSourceItem, \u5C06name\u4F5C\u4E3Akey, value\u4F5C\u4E3A\u9ED8\u8BA4\u503C\u751F\u6210\u3002<br/>\u7C7B\u578B\u8BE6\u89C1`DataSourceItem[]`",type:{required:!0},table:{defaultValue:{summary:"\u5FC5\u9009\uFF0C\u65E0\u9ED8\u8BA4\u503C\u3002\u8BE6\u89C1\u53F3\u4FA7control\u6570\u636E"}},control:{type:"array",labels:pe}},config:{description:"\u53C2\u7167antdv\uFF0Cmodel\u548Crules\u81EA\u52A8\u751F\u6210\uFF0C\u4E0D\u9700\u8981\u4F20\u3002\u7C7B\u578B\u8BE6\u89C1`FormProps`",type:{required:!1},table:{defaultValue:{summary:"\u53EF\u9009\uFF0C\u9ED8\u8BA4\u503C\u540Cantdv\u7684form props"}},control:{type:"object"}},watchInitModel:{description:"dataSource\u53D8\u5316\u65F6\uFF0C\u89E6\u53D1onInitModel\u65B9\u6CD5\u3002<br/>**\u614E\u7528\uFF01**\u5982onInitModel\u65B9\u6CD5\u4E2D\u6709\u526F\u4F5C\u7528\uFF0C\u5219\u4F1A\u5BFC\u81F4\u9012\u5F52\u3002<br/>\u4E00\u822C\u60C5\u51B5\uFF0ConInitModel\u4E0EwatchInitModel\u4E0D\u5171\u5B58\u3002",type:{required:!1},table:{defaultValue:{summary:"\u53EF\u9009\u3002\u8BE6\u89C1\u53F3\u4FA7control\u6570\u636E"}},control:{type:"object"}},onInitModel:{description:"\u8868\u5355\u521D\u59CB\u5316\u65F6\u4F1A\u89E6\u53D1\u6B64\u65B9\u6CD5\uFF0C\u5165\u53C2\u662F\u521D\u59CB\u5316\u8868\u5355\u6570\u636E",type:{required:!1},table:{defaultValue:{summary:"()=> {}"}},control:{type:"function"}},onChange:{description:"\u8868\u5355\u6570\u636E\u53D8\u5316\u65F6\u8C03\u7528\u3002",type:{required:!1},table:{defaultValue:{summary:"()=> {}"}},control:{type:"function"}}}};const me=t=>j({name:"WidgetFormTemplate",setup(){const o=$({formModel:{}});return()=>s(ue,g(m({},t),{onChange:r=>{console.log("stateRef.formModel, data :>> ",o.formModel,r),o.formModel=r}}),null)}}),fe=me.bind({});fe.args={dataSource:pe,onInitModel:t=>{console.log("onInitModel :>> ",t)}};const ge=me.bind({});ge.args={dataSource:Pt,config:{layout:"horizontal",labelCol:{span:8},wrapperCol:{span:16},labelAlign:"right"},watchInitModel:{updateState:!1,emitInitModel:!1},onInitModel:t=>{console.log("onInitModel :>> ",t)}};const Tt=["Overview","FormModel"];var Dt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:_t,Overview:fe,FormModel:ge,__namedExportsOrder:Tt});const Nt=[He,Ye,Xe,Ge,Je,Ke,Qe,Ze,et,nt];Nt.forEach(t=>{Object.keys(t).forEach(o=>{const r=t[o];switch(o){case"args":case"argTypes":return ze.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(r));case"decorators":return r.forEach(e=>$e(e,!1));case"loaders":return r.forEach(e=>We(e,!1));case"parameters":return le(m({},r),!1);case"argTypesEnhancers":return r.forEach(e=>qe(e));case"argsEnhancers":return r.forEach(e=>Ve(e));case"globals":case"globalTypes":{const e={};return e[o]=r,le(e,!1)}default:return console.log(o+" was not supported :( !")}})});Ue(()=>[gt,kt,Dt].filter(t=>t.default),{hot:!1},!1);
//# sourceMappingURL=iframe.aff9c48d.js.map
