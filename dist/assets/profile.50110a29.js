import{H as r}from"./index.e20aada4.js";const o={"Content-Type":"application/json;charsetset=UTF-8"},t=e=>r({url:"/wiki/api/v1/author/profile",method:"POST",data:e}),a=e=>r({url:"/wiki/api/v1/author/profile",method:"PUT",data:e}),p=()=>r({url:"/wiki/api/v1/author/profile/publish",method:"PUT"}),u=()=>r({url:"/wiki/api/v1/author/profile",method:"GET",headers:o}),l=()=>r({url:"/wiki/api/v1/author/profile/name",method:"GET",headers:o}),s=e=>r({url:"/wiki/api/v1/author/profile/judge",method:"POST",data:e});export{u as a,t as c,l as g,s as j,p,a as u};