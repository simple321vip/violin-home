import{D as r}from"./index.ca1e8891.js";import{l as t}from"./index.350fa5f6.js";const m=o=>r({url:"/bookmark/api/v1/bookmark",method:"GET",params:o,paramsSerializer:a=>t.stringify(a,{arrayFormat:"repeat"})}),s=o=>r({url:"/bookmark/api/v1/bookmark/insert",method:"PUT",data:o}),b=o=>r({url:"/bookmark/api/v1/bookmark/update",method:"POST",data:o}),u=o=>r({url:"/bookmark/api/v1/bookmark/delete/"+o,method:"DELETE"}),n=()=>r({url:"/bookmark/api/v1/bookmark/count",method:"GET"});export{n as b,u as d,s as p,m as s,b as u};