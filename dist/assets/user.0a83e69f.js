var m=Object.defineProperty,h=Object.defineProperties;var d=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var o=(t,s,e)=>s in t?m(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e,n=(t,s)=>{for(var e in s||(s={}))f.call(s,e)&&o(t,e,s[e]);if(a)for(var e of a(s))g.call(s,e)&&o(t,e,s[e]);return t},r=(t,s)=>h(t,d(s));import{m as k,q as l,s as p,x as w,y,z as i,A as z}from"./index.ec680239.js";const U=k({id:"user",state:()=>({name:"",token:"",owner:!1}),getters:{},actions:{logout(){this.$patch({name:"",token:"",owner:!1}),l()},async login(t,s){const e=await p({user_id:t,user_password:s});return e.data.token&&(this.$patch(r(n({name:t},e.data),{owner:!0})),w(e.data.token),y(e),console.log("authorize success!")),new Promise((c,u)=>{e.data.message?u(e.data.message):c(e.data)})},async reflush(){if(i()){const t=JSON.parse(z()),s=i();this.$patch({name:t.id,token:s,owner:!0})}}}});export{U as u};