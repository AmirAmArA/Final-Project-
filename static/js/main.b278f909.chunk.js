(this["webpackJsonpmin-adm-simulator"]=this["webpackJsonpmin-adm-simulator"]||[]).push([[0],{19:function(e,t,n){},30:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),s=n(24),i=n.n(s),l=(n(30),n(19),n(4)),o=n(7),c=n(9),h=n(8),u=n(11),p=n(2),d=n(14),g=function e(t,n,a,r,s,i){Object(l.a)(this,e),this.index=s,this.neighbor_vertex1=a,this.neighbor_vertex2=r,this.edge1=t,this.edge2=n,this.passing_lightpaths=i},v=function e(t,n,a,r,s,i){Object(l.a)(this,e),this.index=s,this.neighbor_edge1=t,this.neighbor_edge2=n,this.vertex1=a,this.vertex2=r,this.passing_lightpaths=i},j=n(12),b=function e(t,n,a,r,s){Object(l.a)(this,e),this.wavelength=t,this.passing_edges=s,this.startVertex=n,this.endVertex=a,this.index=r},O=function(e,t){return Math.floor(Math.random()*(t-e))+e},f=function e(t){console.log(t,"yoooooooooooooo");var n=t.length,a=Math.floor(Math.random()*n-3)+3,r=new Array(a),s=new Array(a);if(a>n)throw new RangeError("ERROR in length");for(;a--;){var i=Math.floor(Math.random()*n);r[a]=t[i in s?s[i]:i],s[i]=--n in s?s[n]:n}return r.length>1?r.sort((function(e,t){return e.index>t.index?1:-1})):e(t)},x=function(e,t,n){for(var a=[],r=0;r<e.length;r++){for(var s=e[r],i=0;i<s.length-1;i++)a.push(new b({r:O(0,255),g:O(0,255),b:O(0,255)},s[i].index,s[i+1].index,a.length));a.push(new b({r:O(0,255),g:O(0,255),b:O(0,255)},s[s.length-1].index,s[0].index,a.length))}return a.forEach((function(e){e.passing_edges=function(e,t,n){var a=new g,r=new g,s=new g,i=[];a=Object(j.a)({},n[e]),r=Object(j.a)({},n[t]),s=Object(j.a)({},a);for(;JSON.stringify(r)!==JSON.stringify(s);)i.push(s.edge2),s=Object(j.a)({},n[s.neighbor_vertex2]);return console.log(i),i}(e.startVertex,e.endVertex,t)})),a},m=function(e,t,n){var a=new g,r=new g,s=new g,i=[];for(a=Object(j.a)({},n[e]),r=Object(j.a)({},n[t]),s=Object(j.a)({},a);JSON.stringify(r)!==JSON.stringify(s);)i.push(s.edge2),s=Object(j.a)({},n[s.neighbor_vertex2]);return i};var N=n(16),w=n.n(N);function C(e,t,n,a,r,s){var i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"purple",l=arguments.length>7?arguments[7]:void 0;e.append("svg:path").attr("d","M50 ".concat(t," a ").concat(a," ").concat(a," 0 0 1 0 ").concat(2*a," a ").concat(a," ").concat(a," 0 0 1 0 ").concat(-2*a)).attr("fill","none").attr("stroke",i).attr("stroke-width","".concat(s)).attr("stroke-dasharray","0,".concat(n,",").concat(r,", ").concat(2*a*Math.PI-n-r<1e-5?0:2*a*Math.PI-n-r)).attr("display","none").attr("class","p".concat(l))}function y(e,t,n,a,r,s){var i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"purple";e.append("svg:path").attr("d","M50 ".concat(t," a ").concat(a," ").concat(a," 0 0 1 0 ").concat(2*a," a ").concat(a," ").concat(a," 0 0 1 0 ").concat(-2*a)).attr("fill","none").attr("stroke",i).attr("stroke-width","".concat(s)).attr("stroke-dasharray","0,".concat(n,",").concat(r,", ").concat(2*a*Math.PI-n-r))}function T(e,t,n){for(var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".svgpainter",r=w.a.select(a).append("svg:svg").attr("viewBox","0 0 90 90"),s=e.length,i=0;i<s;i++){for(var l=0,o=5+3*i,c=(2*o*Math.PI-t/2)/t,h=30-3*i,u=0;u<e[i].length;u++){c=(2*o*Math.PI-t/2)/t;var p=e[i][u].index;y(r,h,l,o,c=u>0?c*(p=e[i][u].index-e[i][u-1].index)+p/2-.5:0===p?0:c*p+p/2,1),y(r,h,l+=c,o,.5,n),l+=.5}c=(2*o*Math.PI-t/2)/t,y(r,h,l,o,2*Math.PI*o-l,1)}return r}function S(e,t){for(var n=0;n<e.length;n++)for(var a=0;a<t.length;a++)if(e[n]===t[a])return!0;return!1}function L(e){var t,n,a;for(a=e.length-1;a>0;a--)t=Math.floor(Math.random()*(a+1)),n=e[a],e[a]=e[t],e[t]=n;return e}n(31);function A(e,t,n){e.forEach((function(e,a){e.forEach((function(e){var r=30-3*(a+1),s=5+3*(a+1),i=2*s*Math.PI/n;C(t,r,e.startVertex*i,s,.5,3,"red","".concat(e.index,"999")),C(t,r,e.endVertex*i,s,.5,3,"red","".concat(e.index,"999"))}))}))}function M(e,t,n,a,r){var s=30-3*t,i=5+3*t,l=2*i*Math.PI/n;e.passing_edges.forEach((function(t){C(a,s,t*l,i,l,3,"rgb(".concat(e.wavelength.r,",").concat(e.wavelength.g,",").concat(e.wavelength.b,")"),r)}))}function P(e,t){for(var n=0;n<t.length;n++)if(S([t[n].startVertex,t[n].endVertex],[e.startVertex,e.endVertex]))return!0;return!1}function k(e,t,n,a){var r=[],s=[],i=T(e,n,3,".svgpainter3");return t.forEach((function(e,t){e.index=t;var a=!1;s.forEach((function(l,o){a||!S(e.passing_edges,l)&&P(e,r[o])&&(s[o]=s[o].concat(e.passing_edges),r[o].push(e),e.wavelength.r=r[o][0].wavelength.r,e.wavelength.g=r[o][0].wavelength.g,e.wavelength.b=r[o][0].wavelength.b,M(e,o+1,n,i,t),a=!0)})),a||(s.push(e.passing_edges),r.push([e]),M(e,r.length,n,i,t))})),A(r,i,n),_(r,a)}var _=function(e,t){var n=0;return console.log("i am herre"),console.log(e),e.forEach((function(e){var a=0;e.forEach((function(e){return a=e.passing_edges.length+a})),a===t?n+=e.length:n=n+e.length+1})),n},E=n(0),R=function(e){Object(c.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).loadState=function(t){"Nodes"===t.target.placeholder?e.setState({vertexCount:t.target.value}):"Circles"===t.target.placeholder&&e.setState({circlesCount:t.target.value})},e.produceGraph=function(){for(var t=e.state,n=t.vertexCount,a=t.vertexArr,r=t.edgeArr,s=0;s<n;s++)switch(s){case 0:a.push(new g(n-1,s,n-1,s+1,s)),r.push(new v(n-1,s,s,s+1,s));break;case n-1:a.push(new g(s-1,n-1,s-1,0,s)),r.push(new v(n-1-1,0,n-1,0,s));break;default:a.push(new g(s-1,s,s-1,s+1,s)),r.push(new v(s-1,s+1,s,s+1,s))}},e.produceLightpathsOptimal=function(){for(var t,n,a=e.state,r=a.circlesCount,s=a.vertexArr,i=a.edgeArr,l=a.lightpathArr,o=a.LParr,c=a.lpOnlineCNT,h=parseInt(r,10),u=new Array(h),p=0;p<h;p++)u[p]=f(s);l.push.apply(l,Object(d.a)(x(u,s))),u.unshift(s),t=u,n=s.length,T(t,n,3),o.push.apply(o,Object(d.a)(L(l))),e.setState({lpOnlineCNT:c+k([s],o,s.length,i.length)})},e.completeRun=function(){for(var t=e.state.LParr,n=0;n<t.length;){for(var a=document.querySelectorAll(".p".concat(n)),r=0;r<t[n].passing_edges.length;r++)a[r].removeAttribute("display");for(var s=document.querySelectorAll(".p".concat(n,"999")),i=0;i<s.length;i++)s[i].removeAttribute("display");n+=1}e.setState({lpCNT:e.state.lpCNT+n}),e.setState({showLpOnlineCNT:!0})},e.appear=function(){var t=e.state,n=t.LParr,a=t.lpCNT;console.log(a);var r=document.querySelectorAll(".p".concat(a));if(a>=n.length)e.setState({showLpOnlineCNT:!0});else for(var s=0;s<n[a].passing_edges.length;s++)r[s].removeAttribute("display");if(r=document.querySelectorAll(".p".concat(a,"999")),a>=n.length)e.setState({showLpOnlineCNT:!0});else for(var i=0;i<r.length;i++)r[i].removeAttribute("display");e.setState({lpCNT:e.state.lpCNT+1})},e.simulate=function(){e.setState({showOffline:!0,showOnline:!0}),e.produceGraph(),e.produceLightpathsOptimal()},e.reset=function(){e.setState({vertexArr:[],edgeArr:[],lightpathArr:[],LParr:[],circlesCount:0,lpOnlineCNT:0,lpCNT:0,showOffline:!1,showOnline:!1,vertexCount:0,showLpOnlineCNT:!1}),document.querySelectorAll("input")[0].value="",document.querySelectorAll("input")[1].value="",document.querySelector(".svgpainter").innerHTML="",document.querySelector(".svgpainter3").innerHTML=""},e.state={vertexCount:0,circlesCount:0,vertexArr:[],edgeArr:[],lightpathArr:[],LParr:[],lpCNT:0,showOffline:!1,showOnline:!1,lpOnlineCNT:0,showLpOnlineCNT:!1},e}return Object(o.a)(n,[{key:"render",value:function(){return Object(E.jsxs)("div",{className:"container",children:[Object(E.jsx)("h1",{children:"Ring Toplogy Simulation"}),Object(E.jsxs)("div",{className:"tc",children:[Object(E.jsxs)("div",{children:[Object(E.jsx)("p",{children:"Enter The Number Of Nodes"}),Object(E.jsx)("input",{type:"text",placeholder:"Nodes",width:"40%",style:{borderRadius:"10px"},onBlur:this.loadState,className:"pa1 ma2 ba b--light-blue "})]}),Object(E.jsxs)("div",{children:[Object(E.jsx)("p",{children:"Enter The Number Of Circles"}),Object(E.jsx)("input",{type:"text",placeholder:"Circles",width:"40%",style:{borderRadius:"10px"},onBlur:this.loadState,className:"pa1 ma2 ba b--light-blue "})]}),Object(E.jsxs)("div",{children:[Object(E.jsxs)(u.b,{to:"/",className:"generalButton",children:[" ","Go Home"," "]}),Object(E.jsx)("button",{className:"generalButton",onClick:this.simulate,children:"Simulate"}),Object(E.jsx)("button",{className:"generalButton",onClick:this.appear,children:"Step Over"}),Object(E.jsx)("button",{className:"generalButton",onClick:this.completeRun,children:"Compelete Run"}),Object(E.jsx)("button",{className:"generalButton",onClick:this.reset,children:"Reset"})]})]}),Object(E.jsx)("div",{className:"tc",children:this.state.showLpOnlineCNT?Object(E.jsxs)("h3",{children:["The C-Ratio in this Simulation is :"," ",(this.state.lpOnlineCNT/this.state.LParr.length).toFixed(2)]}):null}),Object(E.jsxs)("div",{className:"container2",children:[Object(E.jsxs)("div",{className:"tc ",style:{display:this.state.showOffline?null:"none"},children:[Object(E.jsxs)("h3",{children:["Optimal Solution ",Object(E.jsx)("br",{})," Total ADMs: ",this.state.LParr.length]}),Object(E.jsx)("div",{className:"tc svgpainter "})]}),Object(E.jsxs)("div",{className:"tc ",style:{display:this.state.showOnline?null:"none"},children:[Object(E.jsxs)("h3",{children:["OnLine minADM Solution ",Object(E.jsx)("br",{}),"Total ADMs:",this.state.showLpOnlineCNT?this.state.lpOnlineCNT:null]}),Object(E.jsxs)("h4",{children:[this.state.showOnline&&void 0!==this.state.LParr[this.state.lpCNT]?"Next Lightpath start is : "+this.state.LParr[this.state.lpCNT].startVertex:null," ",Object(E.jsx)("br",{})," ",this.state.showOnline&&void 0!==this.state.LParr[this.state.lpCNT]?"end is : "+this.state.LParr[this.state.lpCNT].endVertex:null]}),Object(E.jsx)("div",{className:"tc svgpainter3",style:{transform:"all 1s ease-in-out"}})]})]})]})}}]),n}(a.Component);function B(e,t,n,a,r,s){e.append("svg:line").attr("x1","".concat(t)).attr("y1","".concat(50*a+20)).attr("x2","".concat(n)).attr("y2","".concat(50*a+20)).attr("stroke",s).attr("stroke-width","".concat(r))}function q(e,t,n,a,r,s,i){e.append("svg:line").attr("x1","".concat(t)).attr("y1","".concat(50*a+20)).attr("x2","".concat(n)).attr("y2","".concat(50*a+20)).attr("stroke",s).attr("stroke-width","".concat(r)).attr("display","none").attr("class","p".concat(i))}function V(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".svgpainter",a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];!1===a&&(a=70*e.length+20);var r=w.a.select(n).append("svg:svg").attr("height","".concat(a)).attr("width","250"),s=250/t;return e.forEach((function(e,t){for(var n=0;n<e.length-1;n++){var a=e[n].index;B(r,a*s,e[n+1].index*s,t,10,"purple"),B(r,a*s,a*s+5,t,20,"purple"),B(r,e[n+1].index*s,e[n+1].index*s+5,t,20,"purple")}})),r}function I(e,t,n){var a=250/n;e.forEach((function(e,n){e.forEach((function(e,r){q(t,e.passing_edges[0]*a,e.passing_edges[0]*a+5,n+1,20,"purple","".concat(e.index,"999")),q(t,(e.passing_edges[e.passing_edges.length-1]+1)*a,(e.passing_edges[e.passing_edges.length-1]+1)*a+5,n+1,20,"purple","".concat(e.index,"999"))}))}))}function D(e,t,n){var a=[],r=[];t.forEach((function(e,t){e.index=t;var n=!1;a.forEach((function(t,s){n||!S(t,e.passing_edges)&&P(e,r[s])&&(a[s]=a[s].concat(e.passing_edges),r[s].push(e),e.wavelength.r=r[s][0].wavelength.r,e.wavelength.g=r[s][0].wavelength.g,e.wavelength.b=r[s][0].wavelength.b,n=!0)})),n||(a.push(e.passing_edges),r.push([e]))})),console.log("================="),console.log(t);var s=function(e,t,n){console.log("================="),console.log(t);var a=V([e],n,".svgpainter2",50*t.length+70),r=250/n;return t.forEach((function(e,t){e.forEach((function(e,n){e.passing_edges.forEach((function(n){q(a,n*r,(n+1)*r,t+1,10,"rgb(".concat(e.wavelength.r,",").concat(e.wavelength.g,",").concat(e.wavelength.b,")"),e.index)}))}))})),a}(e,r,n);return I(r,s,n),r.length}var G=function(e){Object(c.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).produceGraph=function(){for(var t=e.state,n=t.vertexCount,a=t.vertexArr,r=t.edgeArr,s=0;s<n;s++)switch(s){case 0:a.push(new g(null,s,null,s+1,s)),r.push(new v(null,s+1,0,s+1,s));break;case n-1:a.push(new g(s-1,null,s-1,null,s));break;default:a.push(new g(s-1,s,s-1,s+1,s)),r.push(new v(s,s+1,s-1,s+1,s))}console.log(a,r)},e.loadState=function(t){"Nodes"===t.target.placeholder?e.setState({vertexCount:t.target.value}):"Lines"===t.target.placeholder&&e.setState({linesCount:t.target.value})},e.produceLightpaths=function(){var t=e.state,n=t.vertexCount,a=t.vertexArr,r=t.linesCount,s=t.lightpathArr,i=t.LParr,l=parseInt(r,10);e.setState({levelsCNT:l});var o=new Array(l),c=Object(d.a)(a);c.pop(),c.shift();for(var h=0;h<l;h++)o[h]=f(c),o[h].unshift(a[0]),o[h].push(a[n-1]);s.push.apply(s,Object(d.a)(function(e,t){for(var n=[],a=0;a<e.length;a++)for(var r=e[a],s=0;s<r.length-1;s++)n.push(new b({r:O(0,255),g:O(0,255),b:O(0,255)},r[s].index,r[s+1].index,n.length));return n.forEach((function(e){e.passing_edges=m(e.startVertex,e.endVertex,t)})),n}(o,a))),o.unshift(a),V(o,a.length),i.push.apply(i,Object(d.a)(L(s))),e.setState({lpOnlineCNT:e.state.lpOnlineCNT+i.length+D(a,i,a.length)})},e.completeRun=function(){for(var t=e.state.LParr,n=0;n<t.length;){for(var a=document.querySelectorAll(".p".concat(n)),r=0;r<t[n].passing_edges.length;r++)a[r].removeAttribute("display");for(var s=document.querySelectorAll(".p".concat(n,"999")),i=0;i<s.length;i++)s[i].removeAttribute("display");n+=1}e.setState({lpCNT:e.state.lpCNT+n}),e.setState({showLpOnlineCNT:!0})},e.appear=function(){var t=e.state,n=t.LParr,a=t.lpCNT;console.log(a);var r=document.querySelectorAll(".p".concat(a));if(a>=n.length)e.setState({showLpOnlineCNT:!0});else for(var s=0;s<n[a].passing_edges.length;s++)r[s].removeAttribute("display");if(r=document.querySelectorAll(".p".concat(a,"999")),a>=n.length)e.setState({showLpOnlineCNT:!0});else for(var i=0;i<r.length;i++)r[i].removeAttribute("display");e.setState({lpCNT:e.state.lpCNT+1})},e.simulate=function(){e.setState({showOffline:!0,showOnline:!0}),e.produceGraph(),e.produceLightpaths()},e.reset=function(){e.setState({vertexArr:[],edgeArr:[],lightpathArr:[],LParr:[],linesCount:0,lpOnlineCNT:0,lpCNT:0,showOffline:!1,showOnline:!1,vertexCount:0,showLpOnlineCNT:!1,levelsCNT:0}),document.querySelectorAll("input")[0].value="",document.querySelectorAll("input")[1].value="",document.querySelector(".svgpainter").innerHTML="",document.querySelector(".svgpainter2").innerHTML=""},e.state={vertexCount:0,linesCount:0,vertexArr:[],edgeArr:[],lightpathArr:[],LParr:[],lpCNT:0,showOffline:!1,showOnline:!1,lpOnlineCNT:0,showLpOnlineCNT:!1,levelsCNT:0},e}return Object(o.a)(n,[{key:"render",value:function(){return Object(E.jsxs)("div",{className:"container",children:[Object(E.jsx)("h1",{children:"Line Topology Simulation"}),Object(E.jsxs)("div",{className:"tc",children:[Object(E.jsxs)("div",{children:[Object(E.jsx)("p",{children:"Enter The Number Of Nodes"}),Object(E.jsx)("input",{type:"text",placeholder:"Nodes",width:"40%",style:{borderRadius:"10px"},onBlur:this.loadState,className:"pa1 ma2 ba b--light-blue "})]}),Object(E.jsxs)("div",{children:[Object(E.jsx)("p",{children:"Enter The Number Of Lines"}),Object(E.jsx)("input",{type:"text",placeholder:"Lines",width:"40%",style:{borderRadius:"10px"},onBlur:this.loadState,className:"pa1 ma2 ba b--light-blue "})]}),Object(E.jsxs)("div",{children:[Object(E.jsxs)(u.b,{to:"/",className:"generalButton",children:[" ","Go Home"," "]}),Object(E.jsx)("button",{className:"generalButton",onClick:this.simulate,children:"Simulate"}),Object(E.jsx)("button",{className:"generalButton",onClick:this.appear,children:"Step Over"}),Object(E.jsx)("button",{className:"generalButton",onClick:this.completeRun,children:"Compelete Run"}),Object(E.jsx)("button",{className:"generalButton",onClick:this.reset,children:"Reset"})]})]}),Object(E.jsx)("div",{className:"tc",children:this.state.showLpOnlineCNT?Object(E.jsxs)("h3",{children:["The C-Ratio in this Simulation is :"," ",(this.state.lpOnlineCNT/(this.state.LParr.length+this.state.levelsCNT)).toFixed(2)]}):null}),Object(E.jsxs)("div",{className:"container2",children:[Object(E.jsxs)("div",{className:" tc",style:{display:this.state.showOffline?null:"none"},children:[Object(E.jsxs)("h3",{children:["Optimal Solution ",Object(E.jsx)("br",{})," Total ADMs:"," ",this.state.LParr.length+this.state.levelsCNT]}),Object(E.jsx)("div",{className:"tc svgpainter container"})]}),Object(E.jsxs)("div",{className:"tc ",style:{display:this.state.showOnline?null:"none"},children:[Object(E.jsxs)("h3",{children:["OnLine minADM Solution ",Object(E.jsx)("br",{}),"Total ADMs:",this.state.showLpOnlineCNT?this.state.lpOnlineCNT:null]}),Object(E.jsxs)("h4",{children:[this.state.showOnline&&void 0!==this.state.LParr[this.state.lpCNT]?"Next Lightpath start is : "+this.state.LParr[this.state.lpCNT].startVertex:null," ",Object(E.jsx)("br",{})," ",this.state.showOnline&&void 0!==this.state.LParr[this.state.lpCNT]?"end is : "+this.state.LParr[this.state.lpCNT].endVertex:null]}),Object(E.jsx)("div",{className:"tc svgpainter2 container",style:{transform:"all 1s ease-in-out"}})]})]})]})}}]),n}(a.Component),H=function(e){Object(c.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(E.jsxs)("div",{className:"container",children:[Object(E.jsx)("h1",{children:"Today we are going to present to you the span MinADM Algorithm and simulate it!"}),Object(E.jsx)("h3",{children:"Buckle Up!"}),Object(E.jsx)("p",{children:"We are going to present infront of you simulations on two topologies, Ring and Line Topology."}),Object(E.jsxs)("div",{children:[Object(E.jsx)(u.b,{to:"/",className:"generalButton",children:" More Info"}),Object(E.jsx)(u.b,{to:"/Ring",className:"generalButton",children:" Ring Topology"}),Object(E.jsx)(u.b,{to:"/Line",className:"generalButton",children:" Line Topology"})]}),Object(E.jsx)("h4",{style:{alignSelf:"center"},children:"This Project is Brought to you by Amir & Fida"}),Object(E.jsx)("h4",{children:"Supervised By Prof. Shmuel"})]})}}]),n}(a.Component),J=(a.Component,function(){return Object(E.jsx)(u.a,{basename:"/",children:Object(E.jsx)("div",{children:Object(E.jsxs)(p.c,{children:[Object(E.jsx)(p.a,{path:"/",component:H,exact:!0}),Object(E.jsx)(p.a,{path:"/Ring",component:R}),Object(E.jsx)(p.a,{path:"/Line",component:G})]})})})}),F=function(e){Object(c.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(E.jsx)("div",{className:"row justify-content-center",children:Object(E.jsx)("div",{className:"col ml-3 mt-3"})})}}]),n}(r.a.Component),U=function(e){Object(c.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).state={isLoading:!0},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){e.setState({isLoading:!1})}),3e3)}},{key:"render",value:function(){return this.state.isLoading?Object(E.jsx)(F,{}):Object(E.jsx)(J,{})}}]),n}(r.a.Component);n(38);i.a.render(Object(E.jsx)("div",{className:"container",children:Object(E.jsx)(U,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.b278f909.chunk.js.map