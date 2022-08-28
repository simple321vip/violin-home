import{d as R,I as _e,o as C,c as $,e as E,G as S,_ as M,r as d,a as e,g as n,F as K,j as J,k as W,f as b,b as x,D as O,w as B,v as F,u as m,J as L,t as G,K as pe,L as me}from"./index.4a6e9266.js";import{l as fe}from"./index.220e6de4.js";import{u as be}from"./tenant.25fbfc82.js";const ye=R({name:"CopyDocument"}),ke={viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},ve=E("path",{fill:"currentColor",d:"M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"},null,-1),ge=E("path",{fill:"currentColor",d:"M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"},null,-1),he=[ve,ge];function Ce(t,o,a,u,_,i){return C(),$("svg",ke,he)}var we=_e(ye,[["render",Ce]]);const De=t=>S({url:"/auth/api/v1/bookmark",method:"GET",params:t,paramsSerializer:o=>fe.stringify(o,{arrayFormat:"repeat"})}),xe=t=>S({url:"/auth/api/v1/bookmark/insert",method:"PUT",data:t}),H=t=>S({url:"/auth/api/v1/bookmark/update",method:"POST",data:t}),Ee=t=>S({url:"/auth/api/v1/bookmark/delete/"+t,method:"DELETE"}),Ve=t=>S({url:"/auth/api/v1/bookmark_type/insert",method:"PUT",data:t}),$e=()=>S({url:"/auth/api/v1/bookmark_type",method:"GET",data:{}});const Te={class:"dashboard"},Se={class:"dialog-footer"},Ae=b("\u53D6\u6D88"),Ue=b("\u63D0\u4EA4"),Be=R({props:{types:null,dialog_form:null,operate_code:null},emits:["on-concel","on-submit"],setup(t,{emit:o}){const a=t,u="140px",_=()=>{o("on-concel")},i=()=>{const f={bk_id:a.dialog_form.bk_id,bk_type_id:a.dialog_form.bk_type_id,comment:a.dialog_form.comment,url:a.dialog_form.url};a.operate_code=="0"?xe(f).then(l=>{o("on-submit")}):a.operate_code=="1"?H(f).then(l=>{o("on-submit")}):a.operate_code=="2"&&H(f).then(l=>{o("on-submit")})};return(f,l)=>{const g=d("el-option"),k=d("el-select"),p=d("el-input"),h=d("el-form-item"),w=d("el-form"),I=d("el-button");return C(),$("div",Te,[e(w,{model:t.dialog_form},{default:n(()=>[e(h,{label:"\u5206\u7C7B","label-width":u},{default:n(()=>[e(k,{modelValue:t.dialog_form.bk_type_id,"onUpdate:modelValue":l[0]||(l[0]=v=>t.dialog_form.bk_type_id=v),placeholder:""},{default:n(()=>[(C(!0),$(K,null,J(t.types,v=>(C(),W(g,{key:v.bk_type_id,value:v.bk_type_id,label:v.bk_type_name},null,8,["value","label"]))),128))]),_:1},8,["modelValue"]),e(h,{label:"\u5907\u6CE8","label-width":u},{default:n(()=>[e(p,{modelValue:t.dialog_form.comment,"onUpdate:modelValue":l[1]||(l[1]=v=>t.dialog_form.comment=v),autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(h,{label:"url","label-width":u},{default:n(()=>[e(p,{modelValue:t.dialog_form.url,"onUpdate:modelValue":l[2]||(l[2]=v=>t.dialog_form.url=v),autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["model"]),E("span",Se,[e(I,{onClick:_},{default:n(()=>[Ae]),_:1}),e(I,{type:"primary",onClick:i},{default:n(()=>[Ue]),_:1})])])}}});var Fe=M(Be,[["__scopeId","data-v-0b345e82"]]);const Re={class:"dashboard"},Ie={class:"dialog-footer"},Ne=b("\u63D0\u4EA4"),ze=R({emits:["on-update"],setup(t,{emit:o}){const a=x(""),u=()=>{const _={bookmark_type_name:a.value};Ve(_).then(i=>{o("on-update"),a.value=""})};return(_,i)=>{const f=d("el-input"),l=d("el-button");return C(),$("div",Re,[e(f,{modelValue:a.value,"onUpdate:modelValue":i[0]||(i[0]=g=>a.value=g),placeholder:"Please input"},null,8,["modelValue"]),E("span",Ie,[e(l,{type:"primary",onClick:u},{default:n(()=>[Ne]),_:1})])])}}});var Oe=M(ze,[["__scopeId","data-v-58aa0600"]]);const Pe={class:"dialog-footer"},Le=b("\u53D6\u6D88"),Me=b("\u786E\u8BA4"),je=R({props:{delete_id:null},emits:["on-concel","on-submit"],setup(t,{emit:o}){const a=t,u=()=>{o("on-concel")},_=()=>{o("on-submit",a.delete_id)};return(i,f)=>{const l=d("el-button");return C(),$("span",Pe,[e(l,{onClick:u},{default:n(()=>[Le]),_:1}),e(l,{type:"primary",onClick:_},{default:n(()=>[Me]),_:1})])}}});var Ge=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var o=document.activeElement,a=[],u=0;u<t.rangeCount;u++)a.push(t.getRangeAt(u));switch(o.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":o.blur();break;default:o=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||a.forEach(function(_){t.addRange(_)}),o&&o.focus()}},He=Ge,q={"text/plain":"Text","text/html":"Url",default:"Text"},qe="Copy to clipboard: #{key}, Enter";function Ke(t){var o=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,o)}function Je(t,o){var a,u,_,i,f,l,g=!1;o||(o={}),a=o.debug||!1;try{_=He(),i=document.createRange(),f=document.getSelection(),l=document.createElement("span"),l.textContent=t,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(p){if(p.stopPropagation(),o.format)if(p.preventDefault(),typeof p.clipboardData=="undefined"){a&&console.warn("unable to use e.clipboardData"),a&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var h=q[o.format]||q.default;window.clipboardData.setData(h,t)}else p.clipboardData.clearData(),p.clipboardData.setData(o.format,t);o.onCopy&&(p.preventDefault(),o.onCopy(p.clipboardData))}),document.body.appendChild(l),i.selectNodeContents(l),f.addRange(i);var k=document.execCommand("copy");if(!k)throw new Error("copy command was unsuccessful");g=!0}catch(p){a&&console.error("unable to copy using execCommand: ",p),a&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(o.format||"text",t),o.onCopy&&o.onCopy(window.clipboardData),g=!0}catch(h){a&&console.error("unable to copy using clipboardData: ",h),a&&console.error("falling back to prompt"),u=Ke("message"in o?o.message:qe),window.prompt(u,t)}}finally{f&&(typeof f.removeRange=="function"?f.removeRange(i):f.removeAllRanges()),l&&document.body.removeChild(l),_()}return g}var We=Je;const Xe={class:"bookmark"},Qe=b("\u68C0\u7D22"),Ye={class:"tag_list"},Ze=b("\u589E\u52A0"),et=b("\u81EA\u5B9A\u4E49"),tt={class:"create_dialog"},ot=b("\u65B0\u5EFA"),lt=["onClick"],at=b("\u7F16\u8F91 "),nt=b(" \u5220\u9664 "),st={style:{"margin-top":"20px"}},rt=b("\u53CD\u9009"),ct=b("\u6E05\u9664"),ut=R({setup(t){const o=be();let a=x("");const u=O({bk_type_ids:[],comment:""}),_=O([]),i=O({bk_id:"-1",bk_type_id:1,bk_type_name:"\u672A\u5206\u7C7B",comment:"",url:""}),f=x(),l=x([]),g=c=>{c?c.forEach(s=>{f.value.toggleRowSelection(s,void 0)}):f.value.clearSelection()};let k=x(!1),p=x(!1),h=x(!1),w=x(!1);const I=()=>{h.value=!0},v=()=>{w.value=!0},X=()=>{w.value=!1,U(),j()},A=O([]),j=()=>{$e().then(c=>{A.splice(0,A.length),c.data.forEach(s=>{const y=s.split("|"),T={bk_type_id:Number(y[0]),bk_type_name:y[1],clicked:!1};A.push(T)})})},Q=()=>{a.value="0",i.bk_id="-1",i.bk_type_id=1,i.bk_type_name="\u672A\u5206\u7C7B",i.comment="",i.url="",k.value=!0},Y=(c,s)=>{Object.assign(i,s),a.value="2",p.value=!0},Z=(c,s)=>{Object.assign(i,s),a.value="1",k.value=!0},ee=c=>{c.clicked?(c.clicked=!1,u.bk_type_ids.forEach(function(s,y,T){s==c.bk_type_id&&T.splice(y,1)})):(c.clicked=!0,u.bk_type_ids.push(c.bk_type_id))},te=c=>{l.value=c},oe=c=>{window.open(c)},U=()=>{const c={comment:u.comment,type_id:u.bk_type_ids};_.splice(0,_.length),De(c).then(s=>{s.data.forEach((y,T)=>{const N={bk_id:y.bk_id,bk_type_id:y.bk_type_id,bk_type_name:y.bk_type_name,comment:y.comment,url:y.url};_.push(N)})})},le=c=>{Ee(c).then(y=>{p.value=!1,U()})},ae=()=>{k.value=!1},ne=()=>{k.value=!1,U()},se=c=>{We(c.url+""),pe({title:"",message:me("i",{style:"color: teal"},"\u590D\u5236\u6210\u529F")})};return U(),j(),(c,s)=>{const y=d("el-input"),T=d("el-form-item"),N=d("el-col"),D=d("el-button"),re=d("el-row"),ce=d("el-tag"),ue=d("el-form"),V=d("el-table-column"),ie=d("el-icon"),de=d("el-table"),P=d("el-dialog");return C(),$("div",Xe,[e(ue,null,{default:n(()=>[e(re,null,{default:n(()=>[e(N,{span:6},{default:n(()=>[e(T,null,{default:n(()=>[e(y,{modelValue:m(u).comment,"onUpdate:modelValue":s[0]||(s[0]=r=>m(u).comment=r),placeholder:"\u8BF7\u8F93\u5165",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),e(N,{span:6},{default:n(()=>[e(D,{type:"primary",onClick:U},{default:n(()=>[Qe]),_:1})]),_:1})]),_:1}),E("div",Ye,[(C(!0),$(K,null,J(m(A),r=>(C(),W(ce,{class:"ml-2 click-icon",type:r.clicked?"danger":"info",onClick:z=>ee(r)},{default:n(()=>[b(G(r.bk_type_name),1)]),_:2},1032,["type","onClick"]))),256)),B(e(D,{type:"primary",onClick:v},{default:n(()=>[Ze]),_:1},512),[[F,m(o).account]]),B(e(D,{type:"primary",onClick:I},{default:n(()=>[et]),_:1},512),[[F,m(o).account]])])]),_:1}),E("div",tt,[B(e(D,{type:"primary",onClick:Q},{default:n(()=>[ot]),_:1},512),[[F,m(o).account]])]),e(de,{ref_key:"multipleTableRef",ref:f,data:m(_),onSelectionChange:te,style:{width:"100%"}},{default:n(()=>[e(V,{type:"selection",width:"55"}),e(V,{type:"index",label:"index",width:"80"}),e(V,{prop:"bk_type_name",label:"\u5206\u7C7B",width:"100"}),e(V,{prop:"comment",label:"\u540D\u79F0",width:"180"}),e(V,{prop:"facvion",label:"\u56FE\u6807",width:"60"}),e(V,{class:"click-icon",prop:"url",label:"url"},{default:n(r=>[E("span",{style:{cursor:"pointer"},onClick:z=>oe(r.row.url)},G(r.row.url),9,lt)]),_:1}),e(V,{label:"\u64CD\u4F5C"},{default:n(r=>[e(ie,{size:20,onClick:z=>se(r.row),class:"click-icon"},{default:n(()=>[e(m(we))]),_:2},1032,["onClick"]),B(e(D,{class:"click-icon",size:"small",onClick:z=>Z(r.$index,r.row)},{default:n(()=>[at]),_:2},1032,["onClick"]),[[F,m(o).account]]),B(e(D,{size:"small",type:"danger",onClick:z=>Y(r.$index,r.row)},{default:n(()=>[nt]),_:2},1032,["onClick"]),[[F,m(o).account]])]),_:1})]),_:1},8,["data"]),E("div",st,[e(D,{onClick:s[1]||(s[1]=r=>g([m(_)[1],m(_)[2]]))},{default:n(()=>[rt]),_:1}),e(D,{onClick:s[2]||(s[2]=r=>g())},{default:n(()=>[ct]),_:1})]),e(P,{modelValue:m(k),"onUpdate:modelValue":s[3]||(s[3]=r=>L(k)?k.value=r:k=r),title:"\u6DFB\u52A0\u4E66\u7B7E"},{default:n(()=>[e(Fe,{dialog_form:m(i),operate_code:m(a),types:m(A),onOnConcel:ae,onOnSubmit:ne},null,8,["dialog_form","operate_code","types"])]),_:1},8,["modelValue"]),e(P,{modelValue:m(p),"onUpdate:modelValue":s[4]||(s[4]=r=>L(p)?p.value=r:p=r)},{default:n(()=>[e(je,{delete_id:m(i).bk_id,onOnSubmit:le},null,8,["delete_id"])]),_:1},8,["modelValue"]),e(P,{modelValue:m(w),"onUpdate:modelValue":s[5]||(s[5]=r=>L(w)?w.value=r:w=r)},{default:n(()=>[e(Oe,{onOnUpdate:X})]),_:1},8,["modelValue"])])}}});var pt=M(ut,[["__scopeId","data-v-e97fae76"]]);export{pt as default};