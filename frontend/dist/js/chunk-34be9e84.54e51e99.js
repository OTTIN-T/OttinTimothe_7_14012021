(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34be9e84"],{"0137":function(e,t,r){"use strict";r.r(t);r("b0c0");var n=r("7a23"),i={id:"profile-page"},o=Object(n["g"])("div",{id:"intro-profile"},[Object(n["g"])("h1",{id:"title-profile"},"Supprimer votre profil:"),Object(n["g"])("p",{id:"text-profile"}," Êtes-vous sûr de vouloir supprimer votre compte ? Merci de confirmer votre nom et prénom: ")],-1),c={action:"",method:"post",id:"form-profile"},a=Object(n["g"])("label",{id:"name-label",for:"name"},[Object(n["g"])("i",{class:"gg-profile"}),Object(n["f"])("Nom:")],-1),u=Object(n["g"])("label",{id:"firstname-label",for:"id"},[Object(n["g"])("i",{class:"gg-mail-forward"}),Object(n["f"])("Prénom: ")],-1),s={id:"succes"},l={id:"error"};function d(e,t,r,d,f,p){var m=this,b=Object(n["v"])("NavHome"),h=Object(n["v"])("ButtonDelete"),g=Object(n["v"])("Footer");return Object(n["p"])(),Object(n["d"])(n["a"],null,[Object(n["g"])(b),Object(n["g"])("main",null,[Object(n["g"])("section",i,[o,Object(n["g"])("form",c,[a,Object(n["C"])(Object(n["g"])("input",{id:"name-input",type:"text","onUpdate:modelValue":t[1]||(t[1]=function(e){return f.name=e}),autofocus:"",required:""},null,512),[[n["z"],f.name]]),u,Object(n["C"])(Object(n["g"])("input",{id:"firstname-input",type:"text","onUpdate:modelValue":t[2]||(t[2]=function(e){return f.firstname=e}),required:""},null,512),[[n["z"],f.firstname]])]),f.userId===f.idProfile||!0===f.isAdmin?(Object(n["p"])(),Object(n["d"])(h,{key:0,title:"Bouton pour supprimer son profil",action:f.action,onDeleteButton:t[3]||(t[3]=function(e){return p.deleteProfile(m.$route.params.id)})},null,8,["action"])):Object(n["e"])("",!0),Object(n["g"])("p",s,Object(n["x"])(f.userSucces),1),Object(n["g"])("p",l,Object(n["x"])(f.error),1)])]),Object(n["g"])(g)],64)}r("d3b7"),r("498a"),r("96cf");var f=r("1da1"),p=r("f85e"),m=r("64ac"),b=r("fd2d"),h={name:"ProfilePage",components:{NavHome:p["a"],ButtonDelete:m["a"],Footer:b["a"]},data:function(){return{idProfile:"",name:"",firstname:"",token:"",userId:"",isAdmin:"",action:"Supprimer",userSucces:"",error:""}},created:function(){var e=this,t=localStorage.getItem("user"),r=JSON.parse(t);return null===r?this.$router.push({path:"/"}):(this.token=r.token,this.userId=r.userId,this.isAdmin=r.isAdmin,this.$route.params.id!=this.userId&&1!=this.isAdmin?this.$router.push({path:"/home"}):void fetch("https://localhost:3000/groupomania/profile/"+this.$route.params.id,{headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer ".concat(this.token)})}).then((function(e){return e.json()})).then((function(t){if(t.error||t.user.id!=e.$route.params.id)return e.$router.push({path:"/"});e.idProfile=t.user.id,e.name=t.user.name,e.firstname=t.user.firstname})).catch((function(e){console.log(e)})))},methods:{deleteProfile:function(e){var t=this;if(null===this.token)return this.$router.push({path:"/"});if(this.$route.params.id!=this.userId&&1!=this.isAdmin)return this.$router.push({path:"/home"});var r={name:this.name.trim(),firstname:this.firstname.trim()};fetch("https://localhost:3000/groupomania/profile/"+e,{method:"DELETE",headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer ".concat(this.token)}),body:JSON.stringify(r)}).then(function(){var e=Object(f["a"])(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r.json();case 2:if(n=e.sent,n.error){e.next=6;break}return t.userSucces="User supprimé !",e.abrupt("return",t.$router.push({path:"/signup"}));case 6:t.error=n.error;case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))}}};r("ba42");h.render=d;t["default"]=h},"0db7":function(e,t,r){},2785:function(e,t,r){"use strict";r("8227")},"5ccc":function(e,t,r){"use strict";r("84ec")},"64ac":function(e,t,r){"use strict";var n=r("7a23"),i={id:"delete-div"},o=Object(n["g"])("i",{class:"gg-trash"},null,-1);function c(e,t,r,c,a,u){return Object(n["p"])(),Object(n["d"])("div",i,[o,Object(n["g"])("button",{id:"delete-btn",onClick:t[1]||(t[1]=function(){return u.deleteButton&&u.deleteButton.apply(u,arguments)})},Object(n["x"])(r.action),1)])}var a={name:"ButtonDelete",props:["action"],methods:{deleteButton:function(){this.$emit("deleteButton")}}};r("5ccc");a.render=c;t["a"]=a},8227:function(e,t,r){},"84ec":function(e,t,r){},b0c0:function(e,t,r){var n=r("83ab"),i=r("9bf2").f,o=Function.prototype,c=o.toString,a=/^\s*function ([^ (]*)/,u="name";n&&!(u in o)&&i(o,u,{configurable:!0,get:function(){try{return c.call(this).match(a)[1]}catch(e){return""}}})},ba42:function(e,t,r){"use strict";r("ff50")},cd4a:function(e,t,r){"use strict";r("0db7")},f85e:function(e,t,r){"use strict";var n=r("7a23"),i=r("e2f0"),o=r.n(i),c=Object(n["g"])("img",{id:"logo",src:o.a,alt:"logo de l'entreprise gropupomania"},null,-1),a={id:"nav"},u=Object(n["f"])("Accueil"),s=Object(n["f"])("Profil"),l=Object(n["g"])("i",{class:"gg-log-in"},null,-1);function d(e,t,r,i,o,d){var f=Object(n["v"])("router-link"),p=Object(n["v"])("router-view");return Object(n["p"])(),Object(n["d"])(n["a"],null,[Object(n["g"])("header",null,[c,Object(n["g"])("nav",a,[Object(n["g"])(f,{id:"item-nav-home",to:"/home",title:"Lien vers l'accueil"},{default:Object(n["B"])((function(){return[u]})),_:1}),Object(n["g"])(f,{id:"item-nav-profil",to:{name:"ProfilePage",params:{id:o.userId}},title:"Lien vers son profil"},{default:Object(n["B"])((function(){return[s]})),_:1},8,["to"]),Object(n["g"])(f,{id:"item-nav-logout",to:"/",title:"Bouton déconnexion"},{default:Object(n["B"])((function(){return[l]})),_:1})])]),Object(n["g"])(p)],64)}var f={name:"NavHome",data:function(){return{token:"",userId:"",isAdmin:""}},created:function(){var e=localStorage.getItem("user"),t=JSON.parse(e);if(null===t)return this.$router.push({path:"/"});this.token=t.token,this.userId=t.userId,this.isAdmin=t.isAdmin}};r("2785");f.render=d;t["a"]=f},fd2d:function(e,t,r){"use strict";var n=r("7a23"),i=Object(n["g"])("section",{id:"footer-profile"},[Object(n["g"])("a",{id:"mail-contact",href:"mailto:test@test.com",title:"Lien vers l'email d'aide"},"Un problème ?")],-1);function o(e,t){return Object(n["p"])(),Object(n["d"])("footer",null,[i])}r("cd4a");const c={};c.render=o;t["a"]=c},ff50:function(e,t,r){}}]);
//# sourceMappingURL=chunk-34be9e84.54e51e99.js.map