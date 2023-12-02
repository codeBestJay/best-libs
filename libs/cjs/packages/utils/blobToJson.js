"use strict";function s(o){return new Promise((t,e)=>{const r=new FileReader;r.readAsText(o),r.onload=n=>{try{t(JSON.parse(n.target.result))}catch{e()}},r.onerror=()=>{e()}})}module.exports=s;
