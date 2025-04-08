"use strict";var utils=(()=>{var m=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var I=Object.prototype.hasOwnProperty;var j=(s,D)=>{for(var u in D)m(s,u,{get:D[u],enumerable:!0})},S=(s,D,u,e)=>{if(D&&typeof D=="object"||typeof D=="function")for(let a of P(D))!I.call(s,a)&&a!==u&&m(s,a,{get:()=>D[a],enumerable:!(e=q(D,a))||e.enumerable});return s};var U=s=>S(m({},"__esModule",{value:!0}),s);var N={};j(N,{axium:()=>h,isEmail:()=>z,isGmail:()=>Z});var z=s=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s),Z=s=>/^[a-zA-Z0-9._%+-]+@(gmail|google|googlemail)\.com$/i.test(s);var B=class extends Error{constructor(u,e,a){super(u);this.message=u;this.status=e;this.response=a;this.name="FetchError"}},g=class{constructor(D,u){this.loaded=D;this.total=u}get percent(){return this.total>0?this.loaded/this.total*100:0}};var l=class{constructor(){this.interceptors=[]}add(D){this.interceptors.push(D)}async apply(D){let u=D;for(let e of this.interceptors)u=await e(u);return u}};var d=class{constructor(D){this.globalDefaults=D;this.requestInterceptors=new l;this.responseInterceptors=new l}addRequestInterceptor(D){this.requestInterceptors.add(D)}addResponseInterceptor(D){this.responseInterceptors.add(D)}setGlobalDefaults(D){this.globalDefaults={...this.globalDefaults,...D}}buildUrl(D,u){if(!u)return D;let e=new URL(D);return Object.entries(u).forEach(([a,C])=>{C!=null&&e.searchParams.append(a,String(C))}),e.toString()}async request(D,u={}){let{retries:e=0,retryDelay:a=0,timeout:C,params:T,onDownloadProgress:f,onUploadProgress:G,signal:k,...w}=await this.requestInterceptors.apply({...this.globalDefaults,...u}),_=this.buildUrl(D,T);for(let c=0;c<=e;c++){let b=new AbortController,p=C?setTimeout(()=>b.abort(),C):null,v=k||b.signal;try{let o=await fetch(_,{...w,signal:v,headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",...w.headers}});if(p&&clearTimeout(p),!o.ok)throw new B(`HTTP error! Status: ${o.status}`,o.status,o);if(w.method==="HEAD")return{data:null,status:o.status,statusText:o.statusText,headers:o.headers,config:u};if(f&&o.body){let r=o.body.getReader(),i=Number(o.headers.get("content-length"))||0,t=0,O=new ReadableStream({async start(x){for(;;){let{done:$,value:y}=await r.read();if($)break;t+=y.length,f(new g(t,i)),x.enqueue(y)}x.close()}}),R=new Response(O,{headers:o.headers,status:o.status,statusText:o.statusText}),n=await this.responseInterceptors.apply(R),E=n.headers.get("content-type"),F;if(u.responseType)switch(u.responseType){case"arraybuffer":F=await n.arrayBuffer(),F=Buffer.from(F);break;case"blob":F=await n.blob();break;case"json":F=await n.json();break;case"text":F=await n.text();break;default:F=await n.arrayBuffer(),F=Buffer.from(F)}else E?.includes("application/json")?F=await n.json():E?.includes("text")?F=await n.text():E?.includes("application/xml")||E?.includes("text/xml")?F=await n.text():E?.includes("application/pdf")?F=await n.blob():E?.includes("image/")?(F=await n.arrayBuffer(),F=Buffer.from(F)):E?.includes("application/octet-stream")?(F=await n.arrayBuffer(),F=Buffer.from(F)):(F=await n.arrayBuffer(),F=Buffer.from(F));return{data:F,status:n.status,statusText:n.statusText,headers:n.headers,config:u}}else{let r=await this.responseInterceptors.apply(o),i=r.headers.get("content-type"),t;if(u.responseType)switch(u.responseType){case"arraybuffer":t=await r.arrayBuffer(),t=Buffer.from(t);break;case"blob":t=await r.blob();break;case"json":t=await r.json();break;case"text":t=await r.text();break;default:t=await r.arrayBuffer(),t=Buffer.from(t)}else i?.includes("application/json")?t=await r.json():i?.includes("text")?t=await r.text():i?.includes("application/xml")||i?.includes("text/xml")?t=await r.text():i?.includes("application/pdf")?t=await r.blob():i?.includes("image/")?(t=await r.arrayBuffer(),t=Buffer.from(t)):i?.includes("application/octet-stream")?(t=await r.arrayBuffer(),t=Buffer.from(t)):(t=await r.arrayBuffer(),t=Buffer.from(t));return{data:t,status:r.status,statusText:r.statusText,headers:r.headers,config:u}}}catch(o){if(p&&clearTimeout(p),c>=e&&e>0)throw console.error(`Fetch failed after ${e} attempts`),new B(o.message||"Request failed");a>0&&c<e&&(console.warn(`Retrying... (${c+1}/${e})`),await new Promise(r=>setTimeout(r,a)))}}}};var A=class extends d{constructor(D){super({headers:{"Content-Type":"application/json"},...D})}get(D,u={}){return this.request(D,{...u,method:"GET"})}post(D,u,e={}){return this.request(D,{...e,method:"POST",body:JSON.stringify(u)})}put(D,u,e={}){return this.request(D,{...e,method:"PUT",body:JSON.stringify(u)})}patch(D,u,e={}){return this.request(D,{...e,method:"PATCH",body:JSON.stringify(u)})}delete(D,u={}){return this.request(D,{...u,method:"DELETE"})}postFormData(D,u,e={}){return this.request(D,{...e,method:"POST",body:u,headers:{...e.headers}})}postUrlEncoded(D,u,e={}){let a=new URLSearchParams(u).toString();return this.request(D,{...e,method:"POST",body:a,headers:{"Content-Type":"application/x-www-form-urlencoded",...e.headers}})}all(D){return Promise.all(D)}getBuffer(D,u={}){return this.request(D,{...u,method:"GET"})}head(D,u={}){return this.request(D,{...u,method:"HEAD"})}},H=new A,h=H;return U(N);})();
