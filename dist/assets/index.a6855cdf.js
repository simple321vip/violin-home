import{C as V,_ as B,d as E,b,J as N,r as F,o as v,c as m,e as g,n as T,u as d,g as w,v as x,a as C,K as q,f as I,w as M,h as O,A as S,F as P,k as $,m as D,p as L,q as U}from"./index.5f24bcd9.js";const j=e=>V({url:"/auth/api/v1/one_note",method:"GET",params:e}),z=e=>V({url:"/auth/api/v1/one_note/update_page",method:"POST",data:e}),A=e=>V({url:"/auth/api/v1/one_note/update_section",method:"POST",data:e}),G=()=>V({url:"/auth/api/v1/one_note/insert_section",method:"PUT"}),J=e=>V({url:"/auth/one_note/insert_page",method:"PUT",data:e});const H=["id"],Q=E({props:{row_key:null,checked:{type:Boolean},page_data:null},setup(e){const t=e;let a=b("aliceblue"),o=b("aliceblue"),n=b(!1);N(t,(i,_)=>{t.checked?(a.value="background-color: #d0d0d0;",o.value="background-color: blueviolet;"):(a.value="background-color: white;",o.value="background-color: white;")}),t.checked&&(a.value="background-color: #d0d0d0;",o.value="background-color: blueviolet;");const r=i=>{n.value=!n.value;const _=document.getElementById("input_edit"+i);setTimeout(()=>_.focus())},k=()=>{n.value=!n.value;const i={page_id:t.page_data.page_id,page_name:t.page_data.page_name};z(i).then(_=>{}),u()},f=i=>{i.target.blur()},y=i=>{t.checked||n.value||(a.value="background-color: #FDF5E6;")},u=()=>{t.checked||n.value||(a.value="background-color: white;")};return(i,_)=>{const c=F("el-input");return v(),m("div",{class:"page_tab",onMouseover:y,onMouseleave:u,onDblclick:_[1]||(_[1]=l=>r(e.row_key)),style:T(d(a))},[g("div",{class:"input_prex",style:T(d(o))},null,4),w(C(c,{id:"input_edit"+e.row_key,class:"input_edit",modelValue:e.page_data.page_name,"onUpdate:modelValue":_[0]||(_[0]=l=>e.page_data.page_name=l),onBlur:k,onKeyup:q(f,["enter"])},null,8,["id","modelValue","onKeyup"]),[[x,d(n)]]),w(g("div",{id:"input_show"+e.row_key,class:"input_show"},I(e.page_data.page_name),9,H),[[x,!d(n)]])],36)}}});var R=B(Q,[["__scopeId","data-v-1d6e4caa"]]);const W=["id"],X=E({props:{row_key:null,checked:{type:Boolean},section_data:null},setup(e){const t=e;let a=b("aliceblue"),o=b(!1);N(t,(u,i)=>{t.checked?a.value="background-color: #d0d0d0;":a.value="background-color: white;"}),t.checked&&(a.value="background-color: #d0d0d0;");const n=u=>{o.value=!o.value;const i=document.getElementById("section_edit"+u);setTimeout(()=>i.focus())},r=()=>{o.value=!o.value;const u={section_id:t.section_data.section_id,section_name:t.section_data.section_name};A(u).then(i=>{}),y()},k=u=>{u.target.blur()},f=u=>{t.checked||o.value||(a.value="background-color: #FDF5E6;")},y=()=>{t.checked||o.value||(a.value="background-color: white;")};return(u,i)=>{const _=F("el-input");return v(),m("div",{class:"section_tab",onMouseover:f,onMouseleave:y,onDblclick:i[1]||(i[1]=c=>n(e.row_key)),style:T(d(a))},[w(C(_,{id:"section_edit"+e.row_key,modelValue:e.section_data.section_name,"onUpdate:modelValue":i[0]||(i[0]=c=>e.section_data.section_name=c),onBlur:r,onKeyup:q(k,["enter"])},null,8,["id","modelValue","onKeyup"]),[[x,d(o)]]),w(g("div",{id:"section_show"+e.row_key},I(e.section_data.section_name),9,W),[[x,!d(o)]])],36)}}});var Y=B(X,[["__scopeId","data-v-3103ea96"]]);const Z=E({props:{row_key:null,checked:{type:Boolean},nav_name:null},setup(e){const t=e;let a=b("blueviolet");N(t,(r,k)=>{t.checked?a.value="background-color: blueviolet;":a.value="background-color: white;"}),t.checked&&(a.value="background-color: blueviolet;");const o=r=>{t.checked||(a.value="background-color: #FDF5E6;")},n=()=>{t.checked||(a.value="background-color: white;")};return(r,k)=>{const f=F("el-button");return v(),m("div",{class:"nav_tab",style:{display:"flex"},onMouseover:o,onMouseleave:n},[g("div",{class:"nav_before",style:T(d(a))},null,4),C(f,{id:"input_edit"+e.row_key,class:"nav_button"},{default:M(()=>[O(I(e.nav_name),1)]),_:1},8,["id"])],32)}}});var ee=B(Z,[["__scopeId","data-v-177a8ff4"]]);const te=e=>(L("data-v-13b1c78a"),e=e(),U(),e),ae={class:"one_note"},oe={class:"nav_tabs common_box"},ne={class:"section_tabs common_box"},ce=O("+"),ie={class:"page_tabs common_box"},se=O("+"),le=te(()=>g("div",null,null,-1)),de=E({setup(e){let t=b(0),a=b(""),o=S({});const n=S([]),r=S([]),k=S(["\u56FE\u4E66\u9986","\u68C0\u7D22","\u5386\u53F2"]);j({}).then(c=>{c.data.forEach(l=>{const p={section_id:l.section_id,section_name:l.section_name,page_list:[]};l.page_list.forEach(s=>{const h={page_id:s.page_id,section_id:s.section_id,page_name:s.page_name};p.page_list.push(h)}),n.push(p)})}).then(()=>{Object.assign(r,n[0].page_list)});const f=c=>{t.value=c},y=c=>{a.value=c},u=(c,l)=>{o.section_id=c,Object.assign(r,n[l].page_list)},i=()=>{G().then(c=>{const l=c.data,p={section_id:l.section_id+"",section_name:l.section_name,page_list:l.page_list};n.push(p)}).then(()=>{let c=n.length-1;u(n[c].section_id,c)})},_=()=>{const c={section_id:o.section_id};J(c).then(l=>{const p=l.data,s={page_id:p.page_id,section_id:p.section_id,page_name:p.page_name};r.push(s)})};return(c,l)=>{const p=F("el-button");return v(),m("div",ae,[g("div",oe,[(v(!0),m(P,null,$(d(k),(s,h)=>(v(),D(ee,{row_key:h,checked:d(t)==h,nav_name:s,onClick:K=>f(h)},null,8,["row_key","checked","nav_name","onClick"]))),256))]),g("div",ne,[g("div",null,[(v(!0),m(P,null,$(d(n),(s,h)=>(v(),D(Y,{row_key:s.section_id+"",onClick:K=>u(s.section_id,h),checked:s.section_id===d(o).section_id,section_data:s},null,8,["row_key","onClick","checked","section_data"]))),256))]),C(p,{class:"plus_button",onClick:i},{default:M(()=>[ce]),_:1})]),g("div",ie,[g("div",null,[(v(!0),m(P,null,$(d(r),(s,h)=>w((v(),D(R,{row_key:s.page_id+"",onClick:K=>y(s.page_id),checked:s.page_id===d(a),page_data:s},null,8,["row_key","onClick","checked","page_data"])),[[x,s.section_id==d(o).section_id]])),256))]),C(p,{class:"plus_button",onClick:_},{default:M(()=>[se]),_:1})]),le])}}});var _e=B(de,[["__scopeId","data-v-13b1c78a"]]);export{_e as default};
