(this["webpackJsonpadm-web"]=this["webpackJsonpadm-web"]||[]).push([[0],{110:function(e,t,a){e.exports=a(140)},133:function(e,t,a){},139:function(e,t,a){},140:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(12),c=a.n(o),l=a(94),i=a(41),s=a(23),u=a.n(s),m=a(34),d=a(15),f=a(83),p=a.n(f).a.create({baseURL:"http://localhost:4444",timeout:3e4}),g=a(48),h=a.n(g);function b(e){var t=e.history,a=Object(n.useState)(""),o=Object(d.a)(a,2),c=o[0],l=o[1],i=Object(n.useState)(""),s=Object(d.a)(i,2),f=s[0],g=s[1],b=Object(n.useState)(""),v=Object(d.a)(b,2),E=v[0],O=v[1],w=Object(n.useState)(""),j=Object(d.a)(w,2),y=j[0],S=j[1],C=Object(n.useState)(""),x=Object(d.a)(C,2),k=x[0],N=x[1],I=Object(n.useState)(!1),D=Object(d.a)(I,2),F=D[0],P=D[1];function R(){var e=!0;return f?O(""):(O("Informe o login."),e=!1),y?N(""):(N("Informe a senha."),e=!1),e}function A(){return(A=Object(m.a)(u.a.mark((function e(a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l(""),a.preventDefault(),R()&&(P(!0),p.get("/login",{headers:{login:f,senha:y}}).then((function(e){P(!1);var a=e.data.dados;localStorage.setItem("@admfrontendppv/hash",a),localStorage.setItem("@admfrontendppv/login",f),t&&t.push("/")})).catch((function(e){P(!1),e.response&&l(e.response.data.msg)})));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("img",{src:h.a,style:{cursor:"pointer"},alt:"Pilotando para Vida",className:"logo",onClick:function(){return localStorage.removeItem("@admfrontendppv/login"),localStorage.removeItem("@admfrontendppv/hash"),void(t&&t.push("/login"))}}),r.a.createElement("div",{className:"content"},r.a.createElement("form",{onSubmit:function(e){return A.apply(this,arguments)}},r.a.createElement("label",{htmlFor:"login"},"Login*"),r.a.createElement("div",{style:{fontSize:12,color:"red"}},E),r.a.createElement("input",{type:"text",id:"login",placeholder:"Login",onChange:function(e){return g(e.target.value)},value:f}),r.a.createElement("label",{htmlFor:"nascimento"},"Senha*"),r.a.createElement("div",{style:{fontSize:12,color:"red"}},k),r.a.createElement("input",{type:"password",id:"senha",placeholder:"Senha",onChange:function(e){return S(e.target.value)},value:y}),r.a.createElement("div",{style:{fontSize:12,color:"red"}},c),r.a.createElement("button",{type:"submit",disabled:F},F&&r.a.createElement("i",{className:"fa fa-refresh fa-spin"}),"Entrar")))))}var v=a(84),E=a(67),O=(a(133),a(8)),w=a(21),j=a(180),y=a(185),S=a(182),C=a(183),x=a(189),k=a(184),N=a(186),I=a(188),D=a(91),F=a.n(D),P=a(90),R=a.n(P),A=a(92),T=a.n(A),z=a(93),M=a.n(z),_=a(7),L=a(58),V=a(10),W=a(187),U=Object(_.a)({root:{height:10,backgroundColor:Object(V.e)("#F58D50",.8)},bar:{borderRadius:20,backgroundColor:"#F58D50"}})(W.a),Y=function(e){var t=e.value,a=(e.style,e.row),r=Object(L.a)(e,["value","style","row"]),o=100*t;return a.hasOwnProperty("vagas")&&(o=100*t/a.vagas),n.createElement(N.a,r,n.createElement("center",null,t," (",o.toFixed(2),"%)"),n.createElement(U,{variant:"determinate",color:"secondary",value:o}))},B=function(e){var t=e.value,a=(e.style,Object(L.a)(e,["value","style"]));return r.a.createElement(w.d.Cell,a,r.a.createElement("span",{style:{color:"CONFIRMADO"===t?"green":"INSCRITO"===t?"blue":"red"}},t))};function J(e){var t=new Date(e);return t.getDate()+"/"+t.getMonth()+"/"+t.getFullYear()}function q(){return(q=Object(m.a)(u.a.mark((function e(){var t,a,n,r,o,c,l,i,s,m;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.prev=1,e.next=4,p.get("/turma");case 4:a=e.sent,n=a.data.dados,r=0;case 7:if(!(r<n.length)){e.next=28;break}return e.prev=8,e.next=11,p.get("/aluno/turma",{headers:{turma_id:n[r]._id}});case 11:for(o=e.sent,c=0,l=0,0,i=0,s=o.data.dados,m=0;m<s.length;++m)"CONCLUIDO"===s[m].estado?c++:"TRANSFERIDO"===s[m].estado?l++:"CONFIRMADO"===s[m].estado?c++:"FALTOSO"===s[m].estado&&i++;"ESPERA"===n[r].descricao?t.push({id:n[r]._id,data:"\xc0 definir",descricao:n[r].descricao,vagas:0,totalinscritos:n[r].totalinscritos,confirmado:0,concluido:0,faltoso:0,transferido:0}):t.push({id:n[r]._id,data:J(n[r].data),descricao:n[r].descricao,vagas:n[r].vagas,totalinscritos:n[r].totalinscritos,confirmado:c,concluido:0,faltoso:i,transferido:l}),e.next=25;break;case 21:e.prev=21,e.t0=e.catch(8),e.t0.response&&console.log(e.t0.response.data.msg),alert("Error!");case 25:++r,e.next=7;break;case 28:e.next=33;break;case 30:e.prev=30,e.t1=e.catch(1),e.t1.response&&console.log(e.t1.response.data.msg);case 33:return e.abrupt("return",t);case 34:case"end":return e.stop()}}),e,null,[[1,30],[8,21]])})))).apply(this,arguments)}var H=function(){return q.apply(this,arguments)};function Q(e){var t=new Date(e);return t.getDate()+"/"+t.getMonth()+"/"+t.getFullYear()}function $(){return($=Object(m.a)(u.a.mark((function e(){var t,a,n,r,o,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.prev=1,e.next=4,p.get("/aluno");case 4:a=e.sent,n=a.data.dados,r=0;case 7:if(!(r<n.length)){e.next=24;break}return e.prev=8,e.next=11,p.get("/turma/".concat(n[r].turma));case 11:return o=e.sent,e.next=14,p.get("/aluno/turma",{headers:{aluno_id:n[r]._id,turma_id:n[r].turma}});case 14:c=e.sent,t.push({id:n[r]._id,nome:n[r].nome,cnh:n[r].cnh+"/"+n[r].ufcnh,celular:n[r].celular,sexo:n[r].sexo,nascimento:n[r].nascimento,turma:o.data.dados.descricao,data:Q(o.data.dados.data),estado:c.data.dados.estado}),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(8),e.t0.response&&console.log(e.t0.response.data.msg);case 21:++r,e.next=7;break;case 24:e.next=29;break;case 26:e.prev=26,e.t1=e.catch(1),e.t1.response&&console.log(e.t1.response.data.msg);case 29:return e.abrupt("return",t);case 30:case"end":return e.stop()}}),e,null,[[1,26],[8,18]])})))).apply(this,arguments)}var G=function(){return $.apply(this,arguments)};function K(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function X(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?K(a,!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):K(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var Z={add:function(e){var t=e.onExecute;return r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(y.a,{color:"primary",onClick:t,title:"Criar"},"Adicionar"))},edit:function(e){var t=e.onExecute;return r.a.createElement(S.a,{onClick:t,title:"Editar"},r.a.createElement(R.a,null))},delete:function(e){var t=e.onExecute;return r.a.createElement(S.a,{onClick:function(){window.confirm("Voc\xea tem certeza que deseja deletar este item?")&&t()},title:"Delete row"},r.a.createElement(F.a,null))},commit:function(e){var t=e.onExecute;return r.a.createElement(S.a,{onClick:t,title:"Salvar altera\xe7\xf5es"},r.a.createElement(T.a,null))},cancel:function(e){var t=e.onExecute;return r.a.createElement(S.a,{color:"secondary",onClick:t,title:"Cancelar altera\xe7\xf5es"},r.a.createElement(M.a,null))}},ee=function(e){var t=e.id,a=e.onExecute,n=Z[t];return r.a.createElement(n,{onExecute:a})},te=(Object(_.a)((function(e){return{lookupEditCell:{padding:e.spacing(1)},dialog:{width:"calc(100% - 16px)"},inputRoot:{width:"100%"},selectMenu:{position:"absolute !important"}}}),{name:"ControlledModeDemo"})((function(e){var t=e.availableColumnValues,a=e.value,n=e.onValueChange,o=e.classes;return r.a.createElement(N.a,{className:o.lookupEditCell},r.a.createElement(x.a,{value:a,onChange:function(e){return n(e.target.value)},MenuProps:{className:o.selectMenu},input:r.a.createElement(C.a,{classes:{root:o.inputRoot}})},t.map((function(e){return r.a.createElement(k.a,{key:e,value:e},e)}))))})),function(e){return r.a.createElement(w.g.Cell,e)}),ae=function(e){return e.id};function ne(e){var t=e.history,a=Object(n.useState)(localStorage.getItem("@admfrontendppv/login")||""),o=Object(d.a)(a,1)[0],c=Object(n.useState)(localStorage.getItem("@admfrontendppv/hash")||""),l=Object(d.a)(c,1)[0],i=Object(n.useState)(!1),s=Object(d.a)(i,2),f=s[0],p=s[1],g=Object(n.useState)(!1),b=Object(d.a)(g,2),v=b[0],y=b[1],S=Object(n.useState)([]),C=Object(d.a)(S,2),x=C[0],k=C[1],N=Object(n.useState)([]),D=Object(d.a)(N,2),F=D[0],P=D[1],R=Object(n.useState)(""),A=Object(d.a)(R,2),T=A[0],z=A[1],M=Object(n.useState)([]),_=Object(d.a)(M,2),L=_[0],V=_[1],W=Object(n.useState)([]),U=Object(d.a)(W,2),J=U[0],q=U[1],Q=Object(n.useState)([]),$=Object(d.a)(Q,2),K=$[0],Z=$[1],ne=Object(n.useState)({}),re=Object(d.a)(ne,2),oe=re[0],ce=re[1],le=Object(n.useState)(0),ie=Object(d.a)(le,2),se=ie[0],ue=ie[1],me=Object(n.useState)(0),de=Object(d.a)(me,2),fe=de[0],pe=de[1],ge=Object(n.useState)([5,10,0]),he=Object(d.a)(ge,1)[0],be=Object(n.useState)([w.f.COLUMN_TYPE]),ve=Object(d.a)(be,1)[0],Ee=Object(n.useState)([]),Oe=Object(d.a)(Ee,2),we=Oe[0],je=Oe[1],ye=Object(n.useState)([]),Se=Object(d.a)(ye,2),Ce=Se[0],xe=Se[1],ke=Object(n.useState)([]),Ne=Object(d.a)(ke,2),Ie=Ne[0],De=Ne[1],Fe=Object(n.useState)([]),Pe=Object(d.a)(Fe,2),Re=Pe[0],Ae=Pe[1],Te=Object(n.useState)({}),ze=Object(d.a)(Te,2),Me=ze[0],_e=ze[1],Le=Object(n.useState)([]),Ve=Object(d.a)(Le,2),We=Ve[0],Ue=Ve[1];function Ye(){return(Ye=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p(!0),z("Turma"),xe([]),De([{columnName:"data",width:100,align:"center"},{columnName:"descricao",width:150,align:"left"},{columnName:"vagas",width:100,align:"center"},{columnName:"totalinscritos",width:130,align:"center"},{columnName:"confirmado",width:140,align:"center"},{columnName:"concluido",width:130,align:"center"},{columnName:"faltoso",width:130,align:"center"},{columnName:"transferido",width:130,align:"center"}]),je([{name:"data",title:"Data"},{name:"descricao",title:"Descri\xe7\xe3o"},{name:"vagas",title:"Vagas"},{name:"totalinscritos",title:"Inscrito"},{name:"confirmado",title:"Confirmado"},{name:"transferido",title:"Transferido"},{name:"concluido",title:"Conclu\xeddo"},{name:"faltoso",title:"Faltoso"}]),Ae(["data","descricao","vagas","totalinscritos","confirmado","concluido","faltoso","transferido"]),_e({confirmado:!0,totalinscritos:!0,concluido:!0,faltoso:!0,transferido:!0}),Ue([{columnName:"concluido",type:"sum"},{columnName:"totalinscritos",type:"sum"},{columnName:"faltoso",type:"sum"},{columnName:"confirmado",type:"sum"},{columnName:"transferido",type:"sum"}]),xe(F),p(!1);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Be(){return(Be=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y(!0),z("Aluno"),xe([]),De([{columnName:"nome",width:180,align:"left",wordWrapEnabled:!0},{columnName:"cnh",width:150,align:"right"},{columnName:"nascimento",width:130,align:"center"},{columnName:"celular",width:130,align:"left"},{columnName:"sexo",width:80,align:"center"},{columnName:"turma",width:100,align:"center"},{columnName:"data",width:100,align:"center"},{columnName:"estado",width:130,align:"center"}]),je([{name:"nome",title:"Nome"},{name:"cnh",title:"CNH"},{name:"nascimento",title:"Nascimento"},{name:"celular",title:"Celular"},{name:"sexo",title:"Sexo"},{name:"turma",title:"Turma"},{name:"data",title:"Data"},{name:"estado",title:"Estado"}]),Ae(["nome","cnh","nascimento","celular","sexo","turma","data","estado"]),xe(x),y(!1);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){function e(){return(e=Object(m.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(!0),p(!0),e.t0=P,e.next=5,H();case 5:return e.t1=e.sent,(0,e.t0)(e.t1),p(!1),e.t2=k,e.next=11,G();case 11:e.t3=e.sent,(0,e.t2)(e.t3),y(!1);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(n.useEffect)((function(){""!==o&&""!==l&&void 0!==l&&void 0!==o||(localStorage.removeItem("@admfrontendppv/login"),localStorage.removeItem("@admfrontendppv/hash"),t&&t.push("/login"))}),[o,l,t]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement("img",{src:h.a,style:{cursor:"pointer"},alt:"Pilotando para Vida",className:"logo",onClick:function(){return localStorage.removeItem("@admfrontendppv/login"),localStorage.removeItem("@admfrontendppv/hash"),void(t&&t.push("/login"))}}),r.a.createElement("div",{className:"content"},r.a.createElement("div",{style:{display:"flex",flexDirection:"row"}},r.a.createElement("button",{style:{margin:"5px"},onClick:function(){return Ye.apply(this,arguments)}},f&&r.a.createElement(I.a,{disableShrink:!0,size:"20px",style:{color:"#FFF"}}),!f&&"Turma"),r.a.createElement("button",{style:{margin:"5px"},onClick:function(){return Be.apply(this,arguments)}},v&&r.a.createElement(I.a,{disableShrink:!0,size:"20px",style:{color:"#FFF"}}),!v&&"Aluno")))),r.a.createElement("div",{className:"data",id:"data"},r.a.createElement("center",null,r.a.createElement("h1",null,T)),r.a.createElement("p",null),r.a.createElement(j.a,null,r.a.createElement(w.b,{rows:Ce,columns:we,getRowId:ae},r.a.createElement(O.l,{sorting:L,onSortingChange:V}),r.a.createElement(O.j,{currentPage:se,onCurrentPageChange:ue,pageSize:fe,onPageSizeChange:pe}),r.a.createElement(O.c,{editingRowIds:J,onEditingRowIdsChange:q,rowChanges:oe,onRowChangesChange:ce,addedRows:K,onAddedRowsChange:function(e){return Z(e.map((function(e){return Object.keys(e).length?e:{amount:0,discount:0,saleDate:(new Date).toISOString().split("T")[0]}})))},onCommitChanges:function(e){var t,a=e.added,n=e.changed,r=e.deleted;if(a){var o=Ce.length>0?Ce[Ce.length-1].id+1:0;t=[].concat(Object(E.a)(Ce),Object(E.a)(a.map((function(e,t){return X({id:o+t},e)}))))}n&&(t=Ce.map((function(e){return n[e.id]?X({},e,{},n[e.id]):e}))),r&&(t=function(e){var t=Ce.slice();return e.forEach((function(e){var a=t.findIndex((function(t){return t.id===e}));a>-1&&t.splice(a,1)})),t}(r)),xe(t)}}),r.a.createElement(O.n,{totalItems:We,title:"Total"}),r.a.createElement(O.g,null),r.a.createElement(O.f,null),r.a.createElement(O.h,null),r.a.createElement(w.a,null),r.a.createElement(w.d,{columnExtensions:Ie,cellComponent:function(e){var t=e.column;if("Turma"===T){if(Me.hasOwnProperty(t.name))return e.row.hasOwnProperty("descricao")&&"ESPERA"===e.row.descricao?r.a.createElement(w.d.Cell,e):r.a.createElement(Y,e)}else if("estado"===t.name)return r.a.createElement(B,e);return r.a.createElement(w.d.Cell,e)}}),r.a.createElement(w.e,{order:Re,onOrderChange:Ae}),r.a.createElement(w.i,{showSortingControls:!0}),r.a.createElement(w.g,{cellComponent:te}),r.a.createElement(w.f,{width:170,showAddCommand:!K.length,showEditCommand:!0,showDeleteCommand:!0,commandComponent:ee}),r.a.createElement(w.j,null),r.a.createElement(w.h,{leftColumns:ve}),r.a.createElement(w.c,{pageSizes:he})))))}function re(){return r.a.createElement(l.a,{basename:"/adm-web"},r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/login",component:b}),r.a.createElement(i.a,{path:"/",exact:!0,component:ne})))}a(139);var oe=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(re,null))},ce=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function le(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(r.a.createElement(oe,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/adm-web",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/adm-web","/service-worker.js");ce?(!function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):le(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):le(e)}))}}()},48:function(e,t,a){e.exports=a.p+"static/media/logo.90f64a36.png"}},[[110,1,2]]]);
//# sourceMappingURL=main.c9eaa298.chunk.js.map