import{s as ae,b as oe,d as ue,e as ne}from"./strategy.41e66528.js";import{d as se,c as A,b as p,l as de,q as pe,f as I,h as e,w as l,e as u,o as d,F as H,x as J,B as i,g as _,i as b,z as V,u as c,E as F,a1 as re,U as K}from"./index.e20aada4.js";const ie={class:"demo-collapse"},ce={class:"cell-item"},_e={class:"cell-item"},me={class:"cell-item"},be={class:"cell-item"},he=_("div",{style:{height:"10px"}},null,-1),fe=_("div",{style:{height:"10px"}},null,-1),ve=b("\u4E0B\u5355"),Ee=se({setup(we){const q=ae(),C=A([]),x=A([]),D=A([]),h=A([]),m=p(""),k=p("\u591A"),U=p("\u5F00"),r=p(1),z=p(1),f=p(3e3),B=p(0),G=p(["1"]),M=()=>(oe().then(s=>{C.length=0,s.data.accounts.forEach(a=>{C.push(a)}),x.length=0,s.data.positions.forEach(a=>{x.push(a)}),D.length=0,s.data.trades.forEach(a=>{D.push(a)}),h.length=0,s.data.orders.forEach(a=>{h.push(a)})}),M),O=()=>{ue(m.value).then(s=>{f.value=s.data.tick.last_price})},P=(s,a)=>{console.log(s,a)},T=s=>{console.log(s)},Q=()=>{if(m.value==""){re({message:K("p",null,[K("i",{style:"color: teal"},"\u5408\u7EA6\u4E0D\u80FD\u4E3A\u7A7A")])});return}let s={vt_symbol:m.value,direction:k.value,offset:U.value,volume:z.value,price:f.value};ne(s).then(a=>{})};return q.select_subscribe_vt_symbols(),de(()=>{clearInterval(B.value),B.value=window.setInterval(M(),3e3)}),pe(()=>{window.clearInterval(B.value)}),(s,a)=>{const R=u("user"),v=u("el-icon"),n=u("el-col"),w=u("el-tag"),W=u("Coin"),X=u("GobletFull"),Y=u("School"),S=u("el-row"),N=u("el-collapse-item"),Z=u("el-option"),$=u("el-select"),y=u("el-radio-button"),L=u("el-radio-group"),j=u("el-input-number"),ee=u("el-button"),g=u("el-tab-pane"),le=u("el-tabs"),t=u("el-table-column"),E=u("el-table"),te=u("el-collapse");return d(),I("div",ie,[e(te,{modelValue:G.value,"onUpdate:modelValue":a[6]||(a[6]=o=>G.value=o)},{default:l(()=>[e(N,{title:"Accounts list",name:"1"},{default:l(()=>[(d(!0),I(H,null,J(c(C),o=>(d(),i(S,null,{default:l(()=>[e(n,{span:1},{default:l(()=>[_("div",ce,[e(v,{style:{}},{default:l(()=>[e(R)]),_:1})])]),_:1}),e(n,{span:3},{default:l(()=>[e(w,{size:"small"},{default:l(()=>[b(V(o.account_id),1)]),_:2},1024)]),_:2},1024),e(n,{span:1},{default:l(()=>[_("div",_e,[e(v,{style:{}},{default:l(()=>[e(W)]),_:1})])]),_:1}),e(n,{span:3},{default:l(()=>[e(w,{size:"small"},{default:l(()=>[b(V(o.balance),1)]),_:2},1024)]),_:2},1024),e(n,{span:1},{default:l(()=>[_("div",me,[e(v,{style:{}},{default:l(()=>[e(X)]),_:1})])]),_:1}),e(n,{span:3},{default:l(()=>[e(w,{size:"small"},{default:l(()=>[b(V(o.frozen),1)]),_:2},1024)]),_:2},1024),e(n,{span:1},{default:l(()=>[_("div",be,[e(v,{style:{}},{default:l(()=>[e(Y)]),_:1})])]),_:1}),e(n,{span:3},{default:l(()=>[e(w,{size:"small"},{default:l(()=>[b(V(o.gateway_name),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),256))]),_:1}),e(N,{title:"\u624B\u52A8\u4E0B\u5355",name:"2"},{default:l(()=>[e($,{modelValue:m.value,"onUpdate:modelValue":a[0]||(a[0]=o=>m.value=o),placeholder:"select a vt_symbol",onChange:O},{default:l(()=>[(d(!0),I(H,null,J(c(q).strategy.subscribe_vt_symbols,o=>(d(),i(Z,{value:o},null,8,["value"]))),256))]),_:1},8,["modelValue"]),he,e(S,null,{default:l(()=>[e(n,{span:5},{default:l(()=>[e(L,{modelValue:k.value,"onUpdate:modelValue":a[1]||(a[1]=o=>k.value=o)},{default:l(()=>[e(y,{label:"\u591A"}),e(y,{label:"\u7A7A"})]),_:1},8,["modelValue"])]),_:1}),e(n,{span:4},{default:l(()=>[e(L,{modelValue:U.value,"onUpdate:modelValue":a[2]||(a[2]=o=>U.value=o)},{default:l(()=>[e(y,{label:"\u5F00"}),e(y,{label:"\u5E73"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),fe,e(S,null,{default:l(()=>[e(n,{span:5},{default:l(()=>[e(j,{modelValue:z.value,"onUpdate:modelValue":a[3]||(a[3]=o=>z.value=o),min:1,max:10,onChange:T},null,8,["modelValue"])]),_:1}),e(n,{span:4},{default:l(()=>[e(j,{modelValue:f.value,"onUpdate:modelValue":a[4]||(a[4]=o=>f.value=o),min:1,max:1e4,onChange:T},null,8,["modelValue"])]),_:1}),e(n,{span:4},{default:l(()=>[e(ee,{type:"primary",onClick:Q},{default:l(()=>[ve]),_:1})]),_:1}),e(n,{span:7})]),_:1})]),_:1}),e(N,{title:"\u6301\u4ED3\u4E00\u89C8",name:"3"},{default:l(()=>[e(le,{modelValue:r.value,"onUpdate:modelValue":a[5]||(a[5]=o=>r.value=o),class:"demo-tabs",onTabClick:P},{default:l(()=>[e(g,{label:"\u6301\u4ED3",name:"1"}),e(g,{label:"\u6302\u5355",name:"2"}),e(g,{label:"\u59D4\u6258",name:"3"}),e(g,{label:"\u6210\u4EA4",name:"4"})]),_:1},8,["modelValue"]),r.value==1?(d(),i(E,{key:0,data:c(x),stripe:"",style:{width:"100%"}},{default:l(()=>[e(t,{prop:"symbol",label:"\u5408\u7EA6\u540D\u79F0",width:"100"}),e(t,{prop:"exchange",label:"\u4EA4\u6613\u6240",width:"100"}),e(t,{prop:"direction",label:"\u591A\u7A7A",width:"100"}),e(t,{prop:"volume",label:"\u6210\u4EA4\u91CF",width:"100"}),e(t,{prop:"price",label:"\u5F00\u4ED3\u4EF7\u683C",width:"100"}),e(t,{prop:"frozen",label:"frozen",width:"100"}),e(t,{prop:"pnl",label:"pnl",width:"100"}),e(t,{prop:"yd_volume",label:"yd_volume",width:"120"})]),_:1},8,["data"])):F("",!0),r.value==2?(d(),i(E,{key:1,data:c(h),stripe:"",style:{width:"100%"}},{default:l(()=>[e(t,{prop:"symbol",label:"\u5408\u7EA6\u540D\u79F0",width:"100"}),e(t,{prop:"exchange",label:"\u4EA4\u6613\u6240",width:"100"}),e(t,{prop:"direction",label:"\u591A\u7A7A",width:"100"}),e(t,{prop:"volume",label:"\u6210\u4EA4\u91CF",width:"100"}),e(t,{prop:"price",label:"\u5F00\u4ED3\u4EF7\u683C",width:"100"})]),_:1},8,["data"])):F("",!0),r.value==3?(d(),i(E,{key:2,data:c(h),stripe:"",style:{width:"100%"}},{default:l(()=>[e(t,{prop:"symbol",label:"\u5408\u7EA6\u540D\u79F0",width:"80"}),e(t,{prop:"exchange",label:"\u4EA4\u6613\u6240",width:"80"}),e(t,{prop:"direction",label:"\u591A\u7A7A",width:"80"}),e(t,{prop:"volume",label:"\u6210\u4EA4\u91CF",width:"80"}),e(t,{prop:"price",label:"\u59D4\u6258\u4EF7\u683C",width:"100"}),e(t,{prop:"orderid",label:"orderid",width:"160"}),e(t,{prop:"type",label:"type",width:"80"}),e(t,{prop:"offset",label:"\u5F00\u5E73",width:"80"}),e(t,{prop:"traded",label:"traded",width:"80"}),e(t,{prop:"status",label:"status",width:"80"}),e(t,{prop:"reference",label:"reference",width:"100"})]),_:1},8,["data"])):F("",!0),r.value==4?(d(),i(E,{key:3,data:c(D),stripe:"",style:{width:"100%"}},{default:l(()=>[e(t,{prop:"symbol",label:"\u5408\u7EA6\u540D\u79F0",width:"100"}),e(t,{prop:"exchange",label:"\u4EA4\u6613\u6240",width:"100"}),e(t,{prop:"direction",label:"\u591A\u7A7A",width:"100"}),e(t,{prop:"volume",label:"\u6210\u4EA4\u91CF",width:"100"}),e(t,{prop:"price",label:"\u5F00\u4ED3\u4EF7\u683C",width:"100"}),e(t,{prop:"orderid",label:"orderid",width:"100"}),e(t,{prop:"orderid",label:"orderid",width:"100"}),e(t,{prop:"offset",label:"offset",width:"100"})]),_:1},8,["data"])):F("",!0)]),_:1})]),_:1},8,["modelValue"])])}}});export{Ee as default};