(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cdbf0f54"],{"0db7":function(e,t,n){},2785:function(e,t,n){"use strict";n("8227")},"39b8":function(e,t,n){"use strict";var r=n("7a23"),i={id:"update-div"},o=Object(r["g"])("i",{class:"gg-pen"},null,-1);function a(e,t,n,a,u,c){return Object(r["p"])(),Object(r["d"])("div",i,[o,Object(r["g"])("button",{id:"update-btn",onClick:t[1]||(t[1]=function(){return c.update&&c.update.apply(c,arguments)})},"Modifier")])}var u={name:"ButtonUpdate",methods:{update:function(){this.$emit("update")}}};n("67e6");u.render=a;t["a"]=u},"46c3":function(e,t,n){},"67e6":function(e,t,n){"use strict";n("6b26")},"6b26":function(e,t,n){},8227:function(e,t,n){},b0c0:function(e,t,n){var r=n("83ab"),i=n("9bf2").f,o=Function.prototype,a=o.toString,u=/^\s*function ([^ (]*)/,c="name";r&&!(c in o)&&i(o,c,{configurable:!0,get:function(){try{return a.call(this).match(u)[1]}catch(e){return""}}})},c277:function(e,t,n){"use strict";n("46c3")},cd4a:function(e,t,n){"use strict";n("0db7")},f85e:function(e,t,n){"use strict";var r=n("7a23"),i=n("e2f0"),o=n.n(i),a=Object(r["g"])("img",{id:"logo",src:o.a,alt:"logo de l'entreprise gropupomania"},null,-1),u={id:"nav"},c=Object(r["f"])("Accueil"),s=Object(r["f"])("Profil"),d=Object(r["g"])("i",{class:"gg-log-in"},null,-1);function l(e,t,n,i,o,l){var p=Object(r["v"])("router-link"),f=Object(r["v"])("router-view");return Object(r["p"])(),Object(r["d"])(r["a"],null,[Object(r["g"])("header",null,[a,Object(r["g"])("nav",u,[Object(r["g"])(p,{id:"item-nav-home",to:"/home",title:"Lien vers l'accueil"},{default:Object(r["B"])((function(){return[c]})),_:1}),Object(r["g"])(p,{id:"item-nav-profil",to:{name:"ProfilePage",params:{id:o.userId}},title:"Lien vers son profil"},{default:Object(r["B"])((function(){return[s]})),_:1},8,["to"]),Object(r["g"])(p,{id:"item-nav-logout",to:"/",title:"Bouton déconnexion"},{default:Object(r["B"])((function(){return[d]})),_:1})])]),Object(r["g"])(f)],64)}var p={name:"NavHome",data:function(){return{token:"",userId:"",isAdmin:""}},created:function(){var e=localStorage.getItem("user"),t=JSON.parse(e);if(null===t)return this.$router.push({path:"/"});this.token=t.token,this.userId=t.userId,this.isAdmin=t.isAdmin}};n("2785");p.render=l;t["a"]=p},faad:function(e,t,n){"use strict";n.r(t);n("b0c0");var r=n("7a23"),i={id:"profile-page"},o=Object(r["g"])("div",{id:"intro-profile"},[Object(r["g"])("h1",{id:"title-profile"},"Modifier votre profil:")],-1),a={action:"",method:"post",id:"form-profile"},u=Object(r["g"])("label",{id:"name-label",for:"name"},[Object(r["g"])("i",{class:"gg-profile"}),Object(r["f"])("Nom: ")],-1),c=Object(r["g"])("label",{id:"firstname-label",for:"id"},[Object(r["g"])("i",{class:"gg-mail-forward"}),Object(r["f"])("Prénom: ")],-1),s=Object(r["g"])("label",{id:"poste-label",for:"id"},[Object(r["g"])("i",{class:"gg-briefcase"}),Object(r["f"])("Poste: ")],-1);function d(e,t,n,d,l,p){var f=Object(r["v"])("NavHome"),m=Object(r["v"])("ButtonUpdate"),b=Object(r["v"])("Footer");return Object(r["p"])(),Object(r["d"])(r["a"],null,[Object(r["g"])(f),Object(r["g"])("main",null,[Object(r["g"])("section",i,[o,Object(r["g"])("form",a,[u,Object(r["C"])(Object(r["g"])("input",{id:"name-input",type:"text","onUpdate:modelValue":t[1]||(t[1]=function(e){return l.name=e}),maxlength:"50",autofocus:"",required:""},null,512),[[r["z"],l.name]]),c,Object(r["C"])(Object(r["g"])("input",{id:"firstname-input",type:"text","onUpdate:modelValue":t[2]||(t[2]=function(e){return l.firstname=e}),maxlength:"50",required:""},null,512),[[r["z"],l.firstname]]),s,Object(r["C"])(Object(r["g"])("input",{id:"poste-input",type:"text","onUpdate:modelValue":t[3]||(t[3]=function(e){return l.poste=e}),maxlength:"50",required:""},null,512),[[r["z"],l.poste]])]),l.name.length<=2||l.firstname.length<=2||l.poste.length<=2?(Object(r["p"])(),Object(r["d"])(m,{key:0,id:"delete-opacity-btn"})):l.userId===l.idProfile||!0===l.isAdmin?(Object(r["p"])(),Object(r["d"])(m,{key:1,title:"Bouton pour update son profil",onUpdate:t[4]||(t[4]=function(e){return p.updateProfile(l.idProfile)})})):Object(r["e"])("",!0)])]),Object(r["g"])(b)],64)}n("d3b7"),n("498a"),n("96cf");var l=n("1da1"),p=n("f85e"),f=n("39b8"),m=n("fd2d"),b={name:"ProfilePage",components:{NavHome:p["a"],ButtonUpdate:f["a"],Footer:m["a"]},data:function(){return{idProfile:"",name:"",firstname:"",poste:"",token:"",userId:"",isAdmin:"",error:""}},created:function(){var e=this,t=localStorage.getItem("user"),n=JSON.parse(t);return null===n?this.$router.push({path:"/"}):(this.token=n.token,this.userId=n.userId,this.isAdmin=n.isAdmin,this.$route.params.id!=this.userId&&1!=this.isAdmin?this.$router.push({path:"/home"}):void fetch("https://localhost:3000/groupomania/profile/"+this.$route.params.id,{headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer ".concat(this.token)})}).then((function(e){return e.json()})).then((function(t){if(t.error)return e.$router.push({path:"/"});e.idProfile=t.user.id,e.name=t.user.name,e.firstname=t.user.firstname,e.poste=t.user.poste})).catch((function(e){console.log(e)})))},methods:{updateProfile:function(e){var t=this;if(null===this.token)return this.$router.push({path:"/"});if(this.$route.params.id!=this.userId&&1!=this.isAdmin)return this.$router.push({path:"/home"});var n={name:this.name.trim(),firstname:this.firstname.trim(),poste:this.poste.trim()};fetch("https://localhost:3000/groupomania/profile/"+e,{method:"PUT",headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer ".concat(this.token)}),body:JSON.stringify(n)}).then(function(){var n=Object(l["a"])(regeneratorRuntime.mark((function n(r){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,r.json();case 2:if(i=n.sent,i.error){n.next=5;break}return n.abrupt("return",t.$router.push({name:"ProfilePage",params:e}));case 5:t.error=i.error,t.$router.push({name:"ProfilePage",params:e});case 7:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(e){console.log(e)}))}}};n("c277");b.render=d;t["default"]=b},fd2d:function(e,t,n){"use strict";var r=n("7a23"),i=Object(r["g"])("section",{id:"footer-profile"},[Object(r["g"])("a",{id:"mail-contact",href:"mailto:test@test.com",title:"Lien vers l'email d'aide"},"Un problème ?")],-1);function o(e,t){return Object(r["p"])(),Object(r["d"])("footer",null,[i])}n("cd4a");const a={};a.render=o;t["a"]=a}}]);
//# sourceMappingURL=chunk-cdbf0f54.65e73b8d.js.map