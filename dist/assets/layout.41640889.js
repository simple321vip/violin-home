import{d as W,r as S,c as k,a as B,b as n,e as G,w as E,u as i,o as a,f as m,g as d,h as u,_ as F,t as $,F as A,i as o,j as e,k as f,l as M,v as Q,m as N,n as J,p as K,q as O,s as U,x as X,y as Y,z as Z}from"./index.e6d357a4.js";const T=W("settings",()=>{const c=S({sideMode:"#191a23",isMobile:!1,isRouterAlive:!0,isLoading:!1}),t=k(()=>c.value.sideMode),l=k(()=>c.value.isMobile),_=k(()=>c.value.isRouterAlive),s=k(()=>c.value.isLoading);return{settings:c,sideMode:t,isMobile:l,isRouterAlive:_,isLoading:s}});const ee={class:"section-main","element-loading-text":"\u9875\u9762\u52A0\u8F7D\u4E2D\u2026\u2026","element-loading-background":"rgba(0, 0, 0, 0.1)"},te=B({setup(c){const t=T();return(l,_)=>{const s=n("router-view"),r=G("loading");return E((a(),m("section",ee,[i(t).isRouterAlive?(a(),d(s,{key:0})):u("",!0)])),[[r,i(t).isLoading]])}}});var ne="/assets/nobody.f25a906a.jpg";const oe={class:"headerAvatar"},ae=["src"],se=["src"],ce=["src"],re=B({props:{picType:{type:String,required:!1,default:"avatar"},picSrc:{type:String,required:!1,default:""}},setup(c){const t=c,l=S({}.VITE_BASE_API+"/"),_=S(ne),s=$(),r=k(()=>t.picSrc===""?s.tenant.headerImg!==""&&s.tenant.headerImg.slice(0,4)==="http"?s.tenant.headerImg:l.value+s.tenant.headerImg:t.picSrc!==""&&t.picSrc.slice(0,4)==="http"?t.picSrc:l.value+t.picSrc),h=k(()=>t.picSrc&&t.picSrc.slice(0,4)!=="http"?l.value+t.picSrc:t.picSrc);return(b,y)=>{const p=n("el-avatar");return a(),m("span",oe,[c.picType==="avatar"?(a(),m(A,{key:0},[i(s).tenant.headerImg?(a(),d(p,{key:0,size:30,src:i(r)},null,8,["src"])):(a(),d(p,{key:1,size:30,src:_.value},null,8,["src"]))],64)):u("",!0),c.picType==="img"?(a(),m(A,{key:1},[i(s).tenant.headerImg?(a(),m("img",{key:0,src:i(r),class:"avatar"},null,8,ae)):(a(),m("img",{key:1,src:_.value,class:"avatar"},null,8,se))],64)):u("",!0),c.picType==="file"?(a(),m("img",{key:2,src:i(h),class:"file"},null,8,ce)):u("",!0)])}}});var ie=F(re,[["__scopeId","data-v-db52df48"]]);const le={class:"right-box"},de={class:"dp-flex justify-content-center align-items height-full width-full"},ue={class:"header-avatar",style:{cursor:"pointer"}},_e={style:{"font-weight":"600"}},pe=N("\u4E2A\u4EBA\u4FE1\u606F"),ve=N("\u767B \u51FA"),me=B({setup(c){const t=$(),l=T(),_=()=>{};return t.reflush(),(s,r)=>{const h=n("el-col"),b=n("arrow-down"),y=n("el-icon"),p=n("el-dropdown-item"),w=n("el-dropdown-menu"),v=n("el-dropdown"),x=n("el-row");return a(),d(x,{class:"pd-0"},{default:o(()=>[e(h,{xs:2,lg:1,md:1,sm:1,xl:1,style:{"z-index":"100"}}),e(h,{xs:10,lg:14,md:14,sm:9,xl:14,pull:1}),e(h,{xs:12,lg:9,md:9,sm:14,xl:9},{default:o(()=>[f("div",le,[e(v,null,{dropdown:o(()=>[e(w,{class:"dropdown-group"},{default:o(()=>[e(p,null,{default:o(()=>[f("span",_e," \u5F53\u524D\u89D2\u8272\uFF1A"+M(i(t).tenant.account),1)]),_:1}),i(t).tenant.account?(a(),m(A,{key:0},[],64)):u("",!0),e(p,{icon:"avatar",onClick:_},{default:o(()=>[pe]),_:1}),e(p,{icon:"reading-lamp",onClick:i(t).logout},{default:o(()=>[ve]),_:1},8,["onClick"])]),_:1})]),default:o(()=>[f("div",de,[f("span",ue,[e(ie),E(f("span",{style:{"margin-left":"5px"}},M(i(t).tenant.account),513),[[Q,!i(l).isMobile]]),e(y,null,{default:o(()=>[e(b)]),_:1})])])]),_:1})])]),_:1})]),_:1})}}});var fe=F(me,[["__scopeId","data-v-c76ebeb4"]]);const ge={class:"gva-menu-item"},he=B({setup(c){J(y=>({"400e7370":b.value}));const t=T();let l=S(""),_=K.options.routes[0].children;const s=S({background:"#fff",activeBackground:"#4D70FF",activeText:"#fff",normalText:"#333",hoverBackground:"rgba(64, 158, 255, 0.08)",hoverText:"#333"}),r=()=>{b.value="#4D70FF"};(()=>{switch(t.sideMode){case"#fff":s.value={background:"#fff",activeBackground:"#4D70FF",activeText:"#fff",normalText:"#333",hoverBackground:"rgba(64, 158, 255, 0.08)",hoverText:"#333"};break;case"#191a23":s.value={background:"#191a23",activeBackground:"#4D70FF",activeText:"#fff",normalText:"#fff",hoverBackground:"rgba(64, 158, 255, 0.08)",hoverText:"#fff"};break}})(),O(()=>{l.value=window.innerHeight+"px"});const b=S(s.value.activeBackground);return r(),(y,p)=>{var D;const w=n("Sunny"),v=n("el-icon"),x=n("EditPen"),P=n("Star"),j=n("Notebook"),V=n("Calendar"),L=n("MostlyCloudy"),R=n("Setting"),q=n("el-menu-item"),H=n("el-menu");return a(),m("div",null,[e(H,{router:"",class:"el-menu-vertical",style:X({height:i(l)}),"background-color":s.value.background,"active-text-color":(D=s.value)==null?void 0:D.background},{default:o(()=>[(a(!0),m(A,null,U(i(_),(C,g)=>{var z;return a(),d(q,{key:g,index:C.path,title:(z=C.meta)==null?void 0:z.name,onClick:p[0]||(p[0]=I=>r())},{title:o(()=>{var I;return[f("div",ge,[g==0?(a(),d(v,{key:0,size:20},{default:o(()=>[e(w)]),_:1})):u("",!0),g==1?(a(),d(v,{key:1,size:20},{default:o(()=>[e(x)]),_:1})):u("",!0),g==2?(a(),d(v,{key:2,size:20},{default:o(()=>[e(P)]),_:1})):u("",!0),g==3?(a(),d(v,{key:3,size:20},{default:o(()=>[e(j)]),_:1})):u("",!0),g==4?(a(),d(v,{key:4,size:20},{default:o(()=>[e(V)]),_:1})):u("",!0),g==5?(a(),d(v,{key:5,size:20},{default:o(()=>[e(L)]),_:1})):u("",!0),g==10?(a(),d(v,{key:6,size:20},{default:o(()=>[e(R)]),_:1})):u("",!0),f("span",null,M((I=C.meta)==null?void 0:I.name),1)])]}),_:2},1032,["index","title"])}),128))]),_:1},8,["style","background-color","active-text-color"])])}}});var be=F(he,[["__scopeId","data-v-9bec03b6"]]);const ye=c=>(Y("data-v-82d0b598"),c=c(),Z(),c),xe=ye(()=>f("span",null," \u7BA1\u7965\u73AE\u7684\u4E2A\u4EBA\u7F51\u7AD9 \xA9Copyright 2022-2022 ",-1)),ke=B({setup(c){const t=T(),l=()=>{const r=document.body.clientWidth;r<1e3?t.settings.isMobile=!0:(r>=1e3&&r<1200,t.settings.isMobile=!1)},_=()=>{let r="https://github.com/simple321vip";window.open(r,"_blank")},s=()=>{let r="https://beian.miit.gov.cn/#/Integrated/index";window.open(r,"_blank")};return l(),(r,h)=>{const b=n("el-aside"),y=n("el-header"),p=n("el-main"),w=n("el-avatar"),v=n("el-footer"),x=n("el-container");return a(),m("div",null,[e(x,null,{default:o(()=>[e(b,{width:"180px"},{default:o(()=>[e(be)]),_:1}),e(x,null,{default:o(()=>[e(y,null,{default:o(()=>[e(fe)]),_:1}),e(p,null,{default:o(()=>[e(te)]),_:1}),e(v,null,{default:o(()=>[xe,f("span",{onClick:s},"\u8FBDICP\u59072022003637\u53F7-2"),f("div",null,[e(w,{onClick:_,src:"https://github.githubassets.com/favicons/favicon.svg"})])]),_:1})]),_:1})]),_:1})])}}});var we=F(ke,[["__scopeId","data-v-82d0b598"]]);export{we as default};
