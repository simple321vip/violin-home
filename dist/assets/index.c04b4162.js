import{D as V,_ as B,d as E,b,T as N,e as F,o as v,f,g,n as S,u as l,H as y,K as w,h as T,U,z as I,w as M,i as O,c as C,F as P,x as $,B as D,p as j,j as q}from"./index.ca1e8891.js";const z=e=>V({url:"/onenote/api/v1/one_note",method:"GET",params:e}),L=e=>V({url:"/onenote/api/v1/one_note/update_page",method:"POST",data:e}),G=e=>V({url:"/onenote/api/v1/one_note/update_section",method:"POST",data:e}),H=()=>V({url:"/onenote/api/v1/one_note/insert_section",method:"PUT"}),A=e=>V({url:"/onenote/one_note/insert_page",method:"PUT",data:e});const J=["id"],Q=E({props:{row_key:null,checked:{type:Boolean},page_data:null},setup(e){const t=e;let o=b("aliceblue"),a=b("aliceblue"),n=b(!1);N(t,(i,_)=>{t.checked?(o.value="background-color: #d0d0d0;",a.value="background-color: blueviolet;"):(o.value="background-color: white;",a.value="background-color: white;")}),t.checked&&(o.value="background-color: #d0d0d0;",a.value="background-color: blueviolet;");const r=i=>{n.value=!n.value;const _=document.getElementById("input_edit"+i);setTimeout(()=>_.focus())},k=()=>{n.value=!n.value;const i={page_id:t.page_data.page_id,page_name:t.page_data.page_name};L(i).then(_=>{}),u()},m=i=>{i.target.blur()},x=i=>{t.checked||n.value||(o.value="background-color: #FDF5E6;")},u=()=>{t.checked||n.value||(o.value="background-color: white;")};return(i,_)=>{const c=F("el-input");return v(),f("div",{class:"page_tab",onMouseover:x,onMouseleave:u,onDblclick:_[1]||(_[1]=s=>r(e.row_key)),style:S(l(o))},[g("div",{class:"input_prex",style:S(l(a))},null,4),y(T(c,{id:"input_edit"+e.row_key,class:"input_edit",modelValue:e.page_data.page_name,"onUpdate:modelValue":_[0]||(_[0]=s=>e.page_data.page_name=s),onBlur:k,onKeyup:U(m,["enter"])},null,8,["id","modelValue","onKeyup"]),[[w,l(n)]]),y(g("div",{id:"input_show"+e.row_key,class:"input_show"},I(e.page_data.page_name),9,J),[[w,!l(n)]])],36)}}});var R=B(Q,[["__scopeId","data-v-900d970e"]]);const W=["id"],X=E({props:{row_key:null,checked:{type:Boolean},section_data:null},setup(e){const t=e;let o=b("aliceblue"),a=b(!1);N(t,(u,i)=>{t.checked?o.value="background-color: #d0d0d0;":o.value="background-color: white;"}),t.checked&&(o.value="background-color: #d0d0d0;");const n=u=>{a.value=!a.value;const i=document.getElementById("section_edit"+u);setTimeout(()=>i.focus())},r=()=>{a.value=!a.value;const u={section_id:t.section_data.section_id,section_name:t.section_data.section_name};G(u).then(i=>{}),x()},k=u=>{u.target.blur()},m=u=>{t.checked||a.value||(o.value="background-color: #FDF5E6;")},x=()=>{t.checked||a.value||(o.value="background-color: white;")};return(u,i)=>{const _=F("el-input");return v(),f("div",{class:"section_tab",onMouseover:m,onMouseleave:x,onDblclick:i[1]||(i[1]=c=>n(e.row_key)),style:S(l(o))},[y(T(_,{id:"section_edit"+e.row_key,modelValue:e.section_data.section_name,"onUpdate:modelValue":i[0]||(i[0]=c=>e.section_data.section_name=c),onBlur:r,onKeyup:U(k,["enter"])},null,8,["id","modelValue","onKeyup"]),[[w,l(a)]]),y(g("div",{id:"section_show"+e.row_key},I(e.section_data.section_name),9,W),[[w,!l(a)]])],36)}}});var Y=B(X,[["__scopeId","data-v-09a30288"]]);const Z=E({props:{row_key:null,checked:{type:Boolean},nav_name:null},setup(e){const t=e;let o=b("blueviolet");N(t,(r,k)=>{t.checked?o.value="background-color: blueviolet;":o.value="background-color: white;"}),t.checked&&(o.value="background-color: blueviolet;");const a=r=>{t.checked||(o.value="background-color: #FDF5E6;")},n=()=>{t.checked||(o.value="background-color: white;")};return(r,k)=>{const m=F("el-button");return v(),f("div",{class:"nav_tab",style:{display:"flex"},onMouseover:a,onMouseleave:n},[g("div",{class:"nav_before",style:S(l(o))},null,4),T(m,{id:"input_edit"+e.row_key,class:"nav_button"},{default:M(()=>[O(I(e.nav_name),1)]),_:1},8,["id"])],32)}}});var ee=B(Z,[["__scopeId","data-v-2a86777c"]]);const te=e=>(j("data-v-7d25d508"),e=e(),q(),e),oe={class:"one_note"},ae={class:"nav_tabs common_box"},ne={class:"section_tabs common_box"},ce=O("+"),ie={class:"page_tabs common_box"},de=O("+"),se=te(()=>g("div",null,null,-1)),le=E({setup(e){let t=b(0),o=b(""),a=C({});const n=C([]),r=C([]),k=C(["\u56FE\u4E66\u9986","\u68C0\u7D22","\u5386\u53F2"]);z({}).then(c=>{c.data.forEach(s=>{const p={section_id:s.section_id,section_name:s.section_name,page_list:[]};s.page_list.forEach(d=>{const h={page_id:d.page_id,section_id:d.section_id,page_name:d.page_name};p.page_list.push(h)}),n.push(p)})}).then(()=>{Object.assign(r,n[0].page_list)});const m=c=>{t.value=c},x=c=>{o.value=c},u=(c,s)=>{a.section_id=c,Object.assign(r,n[s].page_list)},i=()=>{H().then(c=>{const s=c.data,p={section_id:s.section_id+"",section_name:s.section_name,page_list:s.page_list};n.push(p)}).then(()=>{let c=n.length-1;u(n[c].section_id,c)})},_=()=>{const c={section_id:a.section_id};A(c).then(s=>{const p=s.data,d={page_id:p.page_id,section_id:p.section_id,page_name:p.page_name};r.push(d)})};return(c,s)=>{const p=F("el-button");return v(),f("div",oe,[g("div",ae,[(v(!0),f(P,null,$(l(k),(d,h)=>(v(),D(ee,{row_key:h,checked:l(t)==h,nav_name:d,onClick:K=>m(h)},null,8,["row_key","checked","nav_name","onClick"]))),256))]),g("div",ne,[g("div",null,[(v(!0),f(P,null,$(l(n),(d,h)=>(v(),D(Y,{row_key:d.section_id+"",onClick:K=>u(d.section_id,h),checked:d.section_id===l(a).section_id,section_data:d},null,8,["row_key","onClick","checked","section_data"]))),256))]),T(p,{class:"plus_button",onClick:i},{default:M(()=>[ce]),_:1})]),g("div",ie,[g("div",null,[(v(!0),f(P,null,$(l(r),(d,h)=>y((v(),D(R,{row_key:d.page_id+"",onClick:K=>x(d.page_id),checked:d.page_id===l(o),page_data:d},null,8,["row_key","onClick","checked","page_data"])),[[w,d.section_id==l(a).section_id]])),256))]),T(p,{class:"plus_button",onClick:_},{default:M(()=>[de]),_:1})]),se])}}});var _e=B(le,[["__scopeId","data-v-7d25d508"]]);export{_e as default};