import{E as s}from"./style.7c712c9e.js";import{d as c,b as u,B as d,u as l,R as i,a8 as p,o as m}from"./index.038313d9.js";import{u as f,a as _}from"./profile.bf350e5f.js";const U=c({setup(v){let e=u(""),a=u("");p().query;const r=async()=>{await f({content:e.value}).then(t=>{a.value=t.data.updateDatetime}).catch(()=>{})};return(async()=>{await _().then(t=>{e.value=t.data.content,a.value=t.data.updateDatetime}).catch(()=>{})})(),(t,o)=>(m(),d(l(s),{modelValue:l(e),"onUpdate:modelValue":o[0]||(o[0]=n=>i(e)?e.value=n:e=n),onSave:r},null,8,["modelValue"]))}});export{U as default};
