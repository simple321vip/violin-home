import{d as s,B as a,w as n,a4 as c,Z as l,e as i,o as r,i as p}from"./index.89c8c085.js";const _=p("Click to open the Message Box"),f=s({setup(m){const t=()=>{c.alert("This is a message","Title",{confirmButtonText:"OK",callback:e=>{l({type:"info",message:`action: ${e}`})}})};return(e,u)=>{const o=i("el-button");return r(),a(o,{text:"",onClick:t},{default:n(()=>[_]),_:1})}}});export{f as default};