import{s as F}from"./settings.5938f8d1.js";import{d as w,e as t,G as W,H as $,u as r,o as a,f as v,B as i,I as d,_ as A,b as S,t as M,J as E,F as B,w as o,h as e,g as m,z as I,K as J,i as N,L as K,r as Q,M as R,x as O,n as U,p as X,j as Y}from"./index.ca1e8891.js";const Z={class:"section-main","element-loading-text":"\u9875\u9762\u52A0\u8F7D\u4E2D\u2026\u2026","element-loading-background":"rgba(0, 0, 0, 0.1)"},ee=w({setup(l){const n=F();return(u,f)=>{const s=t("router-view"),c=W("loading");return $((a(),v("section",Z,[r(n).isRouterAlive?(a(),i(s,{key:0})):d("",!0)])),[[c,r(n).isLoading]])}}});var te="/assets/nobody.f25a906a.jpg";const ne={class:"headerAvatar"},oe=["src"],ae=["src"],se=["src"],ce=w({props:{picType:{type:String,required:!1,default:"avatar"},picSrc:{type:String,required:!1,default:""}},setup(l){const n=l,u=S({}.VITE_BASE_API+"/"),f=S(te),s=M(),c=E(()=>n.picSrc===""?s.tenant.headerImg!==""&&s.tenant.headerImg.slice(0,4)==="http"?s.tenant.headerImg:u.value+s.tenant.headerImg:n.picSrc!==""&&n.picSrc.slice(0,4)==="http"?n.picSrc:u.value+n.picSrc),h=E(()=>n.picSrc&&n.picSrc.slice(0,4)!=="http"?u.value+n.picSrc:n.picSrc);return(b,y)=>{const _=t("el-avatar");return a(),v("span",ne,[l.picType==="avatar"?(a(),v(B,{key:0},[r(s).tenant.headerImg?(a(),i(_,{key:0,size:30,src:r(c)},null,8,["src"])):(a(),i(_,{key:1,size:30,src:f.value},null,8,["src"]))],64)):d("",!0),l.picType==="img"?(a(),v(B,{key:1},[r(s).tenant.headerImg?(a(),v("img",{key:0,src:r(c),class:"avatar"},null,8,oe)):(a(),v("img",{key:1,src:f.value,class:"avatar"},null,8,ae))],64)):d("",!0),l.picType==="file"?(a(),v("img",{key:2,src:r(h),class:"file"},null,8,se)):d("",!0)])}}});var re=A(ce,[["__scopeId","data-v-db52df48"]]);const le={class:"right-box"},ie={class:"dp-flex justify-content-center align-items height-full width-full"},de={class:"header-avatar",style:{cursor:"pointer"}},ue={style:{"font-weight":"600"}},_e=N("\u4E2A\u4EBA\u4FE1\u606F"),pe=N("\u767B \u51FA"),ve=w({setup(l){const n=M(),u=F(),f=()=>{};return n.reflush(),(s,c)=>{const h=t("el-col"),b=t("arrow-down"),y=t("el-icon"),_=t("el-dropdown-item"),k=t("el-dropdown-menu"),p=t("el-dropdown"),x=t("el-row");return a(),i(x,{class:"pd-0"},{default:o(()=>[e(h,{xs:2,lg:1,md:1,sm:1,xl:1,style:{"z-index":"100"}}),e(h,{xs:10,lg:14,md:14,sm:9,xl:14,pull:1}),e(h,{xs:12,lg:9,md:9,sm:14,xl:9},{default:o(()=>[m("div",le,[e(p,null,{dropdown:o(()=>[e(k,{class:"dropdown-group"},{default:o(()=>[e(_,null,{default:o(()=>[m("span",ue," \u5F53\u524D\u89D2\u8272\uFF1A"+I(r(n).tenant.account),1)]),_:1}),r(n).tenant.account?(a(),v(B,{key:0},[],64)):d("",!0),e(_,{icon:"avatar",onClick:f},{default:o(()=>[_e]),_:1}),e(_,{icon:"reading-lamp",onClick:r(n).logout},{default:o(()=>[pe]),_:1},8,["onClick"])]),_:1})]),default:o(()=>[m("div",ie,[m("span",de,[e(re),$(m("span",{style:{"margin-left":"5px"}},I(r(n).tenant.account),513),[[J,!r(u).isMobile]]),e(y,null,{default:o(()=>[e(b)]),_:1})])])]),_:1})])]),_:1})]),_:1})}}});var me=A(ve,[["__scopeId","data-v-c76ebeb4"]]);const fe={class:"gva-menu-item"},ge=w({setup(l){K(y=>({"400e7370":b.value}));const n=F();let u=S(""),f=Q.options.routes[0].children;const s=S({background:"#fff",activeBackground:"#4D70FF",activeText:"#fff",normalText:"#333",hoverBackground:"rgba(64, 158, 255, 0.08)",hoverText:"#333"}),c=()=>{b.value="#4D70FF"};(()=>{switch(n.sideMode){case"#fff":s.value={background:"#fff",activeBackground:"#4D70FF",activeText:"#fff",normalText:"#333",hoverBackground:"rgba(64, 158, 255, 0.08)",hoverText:"#333"};break;case"#191a23":s.value={background:"#191a23",activeBackground:"#4D70FF",activeText:"#fff",normalText:"#fff",hoverBackground:"rgba(64, 158, 255, 0.08)",hoverText:"#fff"};break}})(),R(()=>{u.value=window.innerHeight+"px"});const b=S(s.value.activeBackground);return c(),(y,_)=>{var D;const k=t("Sunny"),p=t("el-icon"),x=t("EditPen"),P=t("Star"),j=t("Notebook"),V=t("Calendar"),H=t("MostlyCloudy"),L=t("Setting"),q=t("el-menu-item"),G=t("el-menu");return a(),v("div",null,[e(G,{router:"",class:"el-menu-vertical",style:U({height:r(u)}),"background-color":s.value.background,"active-text-color":(D=s.value)==null?void 0:D.background},{default:o(()=>[(a(!0),v(B,null,O(r(f),(T,g)=>{var z;return a(),i(q,{key:g,index:T.path,title:(z=T.meta)==null?void 0:z.name,onClick:_[0]||(_[0]=C=>c())},{title:o(()=>{var C;return[m("div",fe,[g==0?(a(),i(p,{key:0,size:20},{default:o(()=>[e(k)]),_:1})):d("",!0),g==1?(a(),i(p,{key:1,size:20},{default:o(()=>[e(x)]),_:1})):d("",!0),g==2?(a(),i(p,{key:2,size:20},{default:o(()=>[e(P)]),_:1})):d("",!0),g==3?(a(),i(p,{key:3,size:20},{default:o(()=>[e(j)]),_:1})):d("",!0),g==4?(a(),i(p,{key:4,size:20},{default:o(()=>[e(V)]),_:1})):d("",!0),g==5?(a(),i(p,{key:5,size:20},{default:o(()=>[e(H)]),_:1})):d("",!0),g==10?(a(),i(p,{key:6,size:20},{default:o(()=>[e(L)]),_:1})):d("",!0),m("span",null,I((C=T.meta)==null?void 0:C.name),1)])]}),_:2},1032,["index","title"])}),128))]),_:1},8,["style","background-color","active-text-color"])])}}});var he=A(ge,[["__scopeId","data-v-9bec03b6"]]);const be=l=>(X("data-v-82d0b598"),l=l(),Y(),l),ye=be(()=>m("span",null," \u7BA1\u7965\u73AE\u7684\u4E2A\u4EBA\u7F51\u7AD9 \xA9Copyright 2022-2022 ",-1)),xe=w({setup(l){const n=F(),u=()=>{const c=document.body.clientWidth;c<1e3?n.settings.isMobile=!0:(c>=1e3&&c<1200,n.settings.isMobile=!1)},f=()=>{let c="https://github.com/simple321vip";window.open(c,"_blank")},s=()=>{let c="https://beian.miit.gov.cn/#/Integrated/index";window.open(c,"_blank")};return u(),(c,h)=>{const b=t("el-aside"),y=t("el-header"),_=t("el-main"),k=t("el-avatar"),p=t("el-footer"),x=t("el-container");return a(),v("div",null,[e(x,null,{default:o(()=>[e(b,{width:"180px"},{default:o(()=>[e(he)]),_:1}),e(x,null,{default:o(()=>[e(y,null,{default:o(()=>[e(me)]),_:1}),e(_,null,{default:o(()=>[e(ee)]),_:1}),e(p,null,{default:o(()=>[ye,m("span",{onClick:s},"\u8FBDICP\u59072022003637\u53F7-2"),m("div",null,[e(k,{onClick:f,src:"https://github.githubassets.com/favicons/favicon.svg"})])]),_:1})]),_:1})]),_:1})])}}});var we=A(xe,[["__scopeId","data-v-82d0b598"]]);export{we as default};