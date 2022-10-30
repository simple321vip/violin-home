import{d as ae,e as oe,f as ue}from"./capital.bf514cc5.js";import{s as ne}from"./strategy.f25d3f6d.js";import{d as se,b as p,A,s as de,L as pe,o as d,c as S,a as e,w as l,r as u,F as q,k as j,m as i,e as g,h as m,f as V,u as c,M as F,E as re,x as H}from"./index.5f24bcd9.js";const ie={class:"demo-collapse"},ce={class:"cell-item"},_e={class:"cell-item"},me={class:"cell-item"},be={class:"cell-item"},fe=m("\u4E0B\u5355"),Ee=se({setup(he){const J=ne(),_=p(""),C=p("\u591A"),x=p("\u5F00"),r=p(1),k=p(1),b=p(3e3),D=p(0),U=A([]),z=A([]),B=A([]),f=A([]),I=p(["1"]),K=()=>{ae().then(s=>{U.length=0,s.data.accounts.forEach(a=>{U.push(a)}),z.length=0,s.data.positions.forEach(a=>{z.push(a)}),B.length=0,s.data.trades.forEach(a=>{B.push(a)}),f.length=0,s.data.orders.forEach(a=>{f.push(a)})})},O=()=>{oe(_.value).then(s=>{b.value=s.data.tick.last_price})},P=(s,a)=>{console.log(s,a)},M=s=>{console.log(s)},Q=()=>{if(_.value==""){re({message:H("p",null,[H("i",{style:"color: teal"},"\u5408\u7EA6\u4E0D\u80FD\u4E3A\u7A7A")])});return}let s={vt_symbol:_.value,direction:C.value,offset:x.value,volume:k.value,price:b.value};ue(s).then(a=>{})};return de(()=>{clearInterval(D.value),D.value=window.setInterval(K,3e3)}),pe(()=>{window.clearInterval(D.value)}),(s,a)=>{const R=u("user"),h=u("el-icon"),n=u("el-col"),v=u("el-tag"),W=u("Coin"),X=u("GobletFull"),Y=u("School"),G=u("el-row"),N=u("el-collapse-item"),w=u("el-radio-button"),L=u("el-radio-group"),Z=u("el-option"),$=u("el-select"),T=u("el-input-number"),ee=u("el-button"),y=u("el-tab-pane"),le=u("el-tabs"),t=u("el-table-column"),E=u("el-table"),te=u("el-collapse");return d(),S("div",ie,[e(te,{modelValue:I.value,"onUpdate:modelValue":a[6]||(a[6]=o=>I.value=o)},{default:l(()=>[e(N,{title:"Accounts list",name:"1"},{default:l(()=>[(d(!0),S(q,null,j(c(U),o=>(d(),i(G,null,{default:l(()=>[e(n,{span:1},{default:l(()=>[g("div",ce,[e(h,{style:{}},{default:l(()=>[e(R)]),_:1})])]),_:1}),e(n,{span:3},{default:l(()=>[e(v,{size:"small"},{default:l(()=>[m(V(o.account_id),1)]),_:2},1024)]),_:2},1024),e(n,{span:1},{default:l(()=>[g("div",_e,[e(h,{style:{}},{default:l(()=>[e(W)]),_:1})])]),_:1}),e(n,{span:3},{default:l(()=>[e(v,{size:"small"},{default:l(()=>[m(V(o.balance),1)]),_:2},1024)]),_:2},1024),e(n,{span:1},{default:l(()=>[g("div",me,[e(h,{style:{}},{default:l(()=>[e(X)]),_:1})])]),_:1}),e(n,{span:3},{default:l(()=>[e(v,{size:"small"},{default:l(()=>[m(V(o.frozen),1)]),_:2},1024)]),_:2},1024),e(n,{span:1},{default:l(()=>[g("div",be,[e(h,{style:{}},{default:l(()=>[e(Y)]),_:1})])]),_:1}),e(n,{span:3},{default:l(()=>[e(v,{size:"small"},{default:l(()=>[m(V(o.gateway_name),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),256))]),_:1}),e(N,{title:"\u624B\u52A8\u4E0B\u5355",name:"2",style:{display:"flex"}},{default:l(()=>[e(G,null,{default:l(()=>[e(n,{span:2},{default:l(()=>[e(L,{modelValue:C.value,"onUpdate:modelValue":a[0]||(a[0]=o=>C.value=o)},{default:l(()=>[e(w,{label:"\u591A"}),e(w,{label:"\u7A7A"})]),_:1},8,["modelValue"])]),_:1}),e(n,{span:2},{default:l(()=>[e(L,{modelValue:x.value,"onUpdate:modelValue":a[1]||(a[1]=o=>x.value=o)},{default:l(()=>[e(w,{label:"\u5F00"}),e(w,{label:"\u5E73"})]),_:1},8,["modelValue"])]),_:1}),e(n,{span:1}),e(n,{span:3},{default:l(()=>[e($,{modelValue:_.value,"onUpdate:modelValue":a[2]||(a[2]=o=>_.value=o),placeholder:"select a vt_symbol",onChange:O},{default:l(()=>[(d(!0),S(q,null,j(c(J).subscribe_vt_symbols,o=>(d(),i(Z,{value:o},null,8,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),e(n,{span:1}),e(n,{span:4},{default:l(()=>[e(T,{modelValue:k.value,"onUpdate:modelValue":a[3]||(a[3]=o=>k.value=o),min:1,max:10,onChange:M},null,8,["modelValue"])]),_:1}),e(n,{span:4},{default:l(()=>[e(T,{modelValue:b.value,"onUpdate:modelValue":a[4]||(a[4]=o=>b.value=o),min:1,max:1e4,onChange:M},null,8,["modelValue"])]),_:1}),e(n,{span:4},{default:l(()=>[e(ee,{type:"primary",onClick:Q},{default:l(()=>[fe]),_:1})]),_:1})]),_:1})]),_:1}),e(N,{title:"\u6301\u4ED3\u4E00\u89C8",name:"3"},{default:l(()=>[e(le,{modelValue:r.value,"onUpdate:modelValue":a[5]||(a[5]=o=>r.value=o),class:"demo-tabs",onTabClick:P},{default:l(()=>[e(y,{label:"\u6301\u4ED3",name:"1"}),e(y,{label:"\u6302\u5355",name:"2"}),e(y,{label:"\u59D4\u6258",name:"3"}),e(y,{label:"\u6210\u4EA4",name:"4"})]),_:1},8,["modelValue"]),r.value==1?(d(),i(E,{key:0,data:c(z),stripe:"",style:{width:"100%"}},{default:l(()=>[e(t,{prop:"symbol",label:"\u5408\u7EA6\u540D\u79F0",width:"100"}),e(t,{prop:"exchange",label:"\u4EA4\u6613\u6240",width:"100"}),e(t,{prop:"direction",label:"\u591A\u7A7A",width:"100"}),e(t,{prop:"volume",label:"\u6210\u4EA4\u91CF",width:"100"}),e(t,{prop:"price",label:"\u5F00\u4ED3\u4EF7\u683C",width:"100"}),e(t,{prop:"frozen",label:"frozen",width:"100"}),e(t,{prop:"pnl",label:"pnl",width:"100"}),e(t,{prop:"yd_volume",label:"yd_volume",width:"120"})]),_:1},8,["data"])):F("",!0),r.value==2?(d(),i(E,{key:1,data:c(f),stripe:"",style:{width:"100%"}},{default:l(()=>[e(t,{prop:"symbol",label:"\u5408\u7EA6\u540D\u79F0",width:"100"}),e(t,{prop:"exchange",label:"\u4EA4\u6613\u6240",width:"100"}),e(t,{prop:"direction",label:"\u591A\u7A7A",width:"100"}),e(t,{prop:"volume",label:"\u6210\u4EA4\u91CF",width:"100"}),e(t,{prop:"price",label:"\u5F00\u4ED3\u4EF7\u683C",width:"100"})]),_:1},8,["data"])):F("",!0),r.value==3?(d(),i(E,{key:2,data:c(f),stripe:"",style:{width:"100%"}},{default:l(()=>[e(t,{prop:"symbol",label:"\u5408\u7EA6\u540D\u79F0",width:"80"}),e(t,{prop:"exchange",label:"\u4EA4\u6613\u6240",width:"80"}),e(t,{prop:"direction",label:"\u591A\u7A7A",width:"80"}),e(t,{prop:"volume",label:"\u6210\u4EA4\u91CF",width:"80"}),e(t,{prop:"price",label:"\u59D4\u6258\u4EF7\u683C",width:"100"}),e(t,{prop:"orderid",label:"orderid",width:"160"}),e(t,{prop:"type",label:"type",width:"80"}),e(t,{prop:"offset",label:"\u5F00\u5E73",width:"80"}),e(t,{prop:"traded",label:"traded",width:"80"}),e(t,{prop:"status",label:"status",width:"80"}),e(t,{prop:"reference",label:"reference",width:"100"})]),_:1},8,["data"])):F("",!0),r.value==4?(d(),i(E,{key:3,data:c(B),stripe:"",style:{width:"100%"}},{default:l(()=>[e(t,{prop:"symbol",label:"\u5408\u7EA6\u540D\u79F0",width:"100"}),e(t,{prop:"exchange",label:"\u4EA4\u6613\u6240",width:"100"}),e(t,{prop:"direction",label:"\u591A\u7A7A",width:"100"}),e(t,{prop:"volume",label:"\u6210\u4EA4\u91CF",width:"100"}),e(t,{prop:"price",label:"\u5F00\u4ED3\u4EF7\u683C",width:"100"}),e(t,{prop:"orderid",label:"orderid",width:"100"}),e(t,{prop:"orderid",label:"orderid",width:"100"}),e(t,{prop:"offset",label:"offset",width:"100"})]),_:1},8,["data"])):F("",!0)]),_:1})]),_:1},8,["modelValue"])])}}});export{Ee as default};
