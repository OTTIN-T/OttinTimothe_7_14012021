(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a6993de"],{"0d3a":function(e,t,r){"use strict";var n=r("7a23"),o={key:0,id:"update-router"},s=Object(n["f"])(" Update "),i=Object(n["g"])("i",{class:"gg-user-add"},null,-1),a={key:1,id:"update-router"},c=Object(n["f"])(" Update "),u=Object(n["g"])("i",{class:"gg-pen"},null,-1),p={key:2,id:"update-router"},d=Object(n["f"])(" Update "),l=Object(n["g"])("i",{class:"gg-pen"},null,-1);function m(e,t,r,m,h,f){var b=Object(n["v"])("router-link"),j=Object(n["v"])("router-view");return Object(n["p"])(),Object(n["d"])(n["a"],null,[r.userId===r.id?(Object(n["p"])(),Object(n["d"])("div",o,[Object(n["g"])(b,{id:"update-link",to:{name:"ProfileUpdate",params:{id:r.id}},title:"Lien pour update son profile"},{default:Object(n["B"])((function(){return[s]})),_:1},8,["to"]),i])):Object(n["e"])("",!0),null===r.commentUserId?(Object(n["p"])(),Object(n["d"])("div",a,[Object(n["g"])(b,{id:"update-link",to:{name:"PostUpdate",params:{id:r.id}},title:"Lien pour update son post "},{default:Object(n["B"])((function(){return[c,u]})),_:1},8,["to"])])):Object(n["e"])("",!0),null===r.postUserId?(Object(n["p"])(),Object(n["d"])("div",p,[Object(n["g"])(b,{id:"update-link",to:{name:"CommentUpdate",params:{id:r.id}},title:"Lien pour update son commentaire"},{default:Object(n["B"])((function(){return[d]})),_:1},8,["to"]),l])):Object(n["e"])("",!0),Object(n["g"])(j)],64)}var h={name:"RouterUpdate",props:["id","userId","postUserId","commentUserId"]};r("e0c1");h.render=m;t["a"]=h},"3b4a":function(e,t,r){"use strict";r.r(t);r("b0c0"),r("9911");var n=r("7a23"),o={id:"post-unique"},s={id:"title-post-unique"},i=Object(n["f"])(" Posté par: "),a=Object(n["g"])("i",{class:"gg-user"},null,-1),c={class:"inactive"};function u(e,t,r,u,p,d){var l=Object(n["v"])("NavHome"),m=Object(n["v"])("router-link"),h=Object(n["v"])("ButtonReport"),f=Object(n["v"])("ButtonLike"),b=Object(n["v"])("ButtonDislike"),j=Object(n["v"])("RouterComment"),k=Object(n["v"])("RouterUpdate"),g=Object(n["v"])("ButtonDelete"),O=Object(n["v"])("Post"),v=Object(n["v"])("Comment"),I=Object(n["v"])("Footer");return Object(n["p"])(),Object(n["d"])(n["a"],null,[Object(n["g"])(l),Object(n["g"])("main",null,[Object(n["g"])("section",o,[Object(n["g"])("h1",s,[i,Object(n["g"])(m,{id:"nav-user",to:{name:"ProfilePage",params:{id:p.post.UserId}},title:"Lien vers le profil de l'utilisateur"},{default:Object(n["B"])((function(){return[a,Object(n["f"])(Object(n["x"])(p.name),1)]})),_:1},8,["to"])]),Object(n["g"])(O,{title:p.post.title,message:p.post.message,comment:p.comments.length,link:p.post.link,like:p.post.like,createdAt:d.formatCreateDate,updatedAt:d.formatUpdateDate,UserId:p.post.UserId},{default:Object(n["B"])((function(){return[p.userId!=p.post.UserId&&!1===p.isAdmin?(Object(n["p"])(),Object(n["d"])(h,{key:0,id:p.post.id,userId:p.userId,reportMessage:p.post.reportMessage,onReport:t[1]||(t[1]=function(e){return d.reportPost(p.post.id,p.userId)})},null,8,["id","userId","reportMessage"])):Object(n["e"])("",!0),Object(n["g"])(f,{id:p.post.id,userId:p.userId,likeMessage:p.likeMessage,onLike:t[2]||(t[2]=function(e){return d.likePost(p.post.id,p.userId)})},null,8,["id","userId","likeMessage"]),Object(n["g"])(b,{id:p.post.id,userId:p.userId,dislikeMessage:p.dislikeMessage,onDislike:t[3]||(t[3]=function(e){return d.dislikePost(p.post.id,p.userId)})},null,8,["id","userId","dislikeMessage"]),Object(n["g"])(j,{id:p.post.id},null,8,["id"]),p.userId===p.post.UserId||!0===p.isAdmin?(Object(n["p"])(),Object(n["d"])(k,{key:1,id:p.post.id,commentUserId:null},null,8,["id"])):Object(n["e"])("",!0),p.userId===p.post.UserId||!0===p.isAdmin?(Object(n["p"])(),Object(n["d"])(g,{key:2,postId:p.post.id,UserId:p.post.UserId,postUserId:p.post.UserId,action:p.action,onDeleteButton:t[4]||(t[4]=function(e){return d.deletePost(p.post.id,p.post.UserId)})},null,8,["postId","UserId","postUserId","action"])):Object(n["e"])("",!0)]})),_:1},8,["title","message","comment","link","like","createdAt","updatedAt","UserId"])]),Object(n["g"])("aside",c,[(Object(n["p"])(!0),Object(n["d"])(n["a"],null,Object(n["t"])(p.comments,(function(e,t){return Object(n["p"])(),Object(n["d"])(v,{key:e,UserId:e.UserId,userName:e.User.name,comment:e.comment,like:e.like},{default:Object(n["B"])((function(){return[Object(n["g"])(f,{id:e.id,userId:p.userId,onLike:function(r){return d.likeComment(e.id,p.userId,t)}},null,8,["id","userId","onLike"]),Object(n["g"])(b,{id:e.id,userId:p.userId,onDislike:function(r){return d.dislikeComment(e.id,p.userId,t)}},null,8,["id","userId","onDislike"]),p.userId!=e.UserId&&!1===p.isAdmin?(Object(n["p"])(),Object(n["d"])(h,{key:0,id:e.id,userId:p.userId,reportMessage:e.reportMessage,onReport:function(r){return d.reportComment(e.id,p.userId,t)}},null,8,["id","userId","reportMessage","onReport"])):Object(n["e"])("",!0),p.userId===e.UserId||!0===p.isAdmin?(Object(n["p"])(),Object(n["d"])(g,{key:1,onDeleteButton:function(t){return d.deleteComment(e.id,e.UserId)},action:p.action},null,8,["onDeleteButton","action"])):Object(n["e"])("",!0),p.userId===e.UserId||!0===p.isAdmin?(Object(n["p"])(),Object(n["d"])(k,{key:2,id:e.id,postUserId:null},null,8,["id"])):Object(n["e"])("",!0)]})),_:2},1032,["UserId","userName","comment","like"])})),128))])]),Object(n["g"])(I)],64)}r("99af"),r("a630"),r("a15b"),r("fb6a"),r("a434"),r("d3b7"),r("ac1f"),r("3ca3"),r("1276"),r("96cf");var p=r("1da1"),d=r("9c93"),l=r("f85e"),m={id:"comment-div"},h={id:"name-comment"},f=Object(n["g"])("i",{class:"gg-user"},null,-1),b={class:"like-comment"},j=Object(n["g"])("p",null,"Tendance:",-1),k={key:0,class:"like"},g=Object(n["g"])("i",{class:"gg-smile-mouth-open"},null,-1),O={key:1,class:"like"},v=Object(n["g"])("i",{class:"gg-smile-no-mouth"},null,-1),I={key:2,class:"like"},U=Object(n["g"])("i",{class:"gg-smile-neutral"},null,-1),w=Object(n["f"])("0 "),A={id:"text-comment"};function B(e,t,r,o,s,i){var a=Object(n["v"])("router-link");return Object(n["p"])(),Object(n["d"])("div",m,[Object(n["g"])("span",h,[Object(n["g"])(a,{id:"nav-user",to:{name:"ProfilePage",params:{id:r.UserId}},title:"Lien vers le profil de l'utilisateur"},{default:Object(n["B"])((function(){return[Object(n["f"])(" De: "+Object(n["x"])(r.userName)+" ",1),f]})),_:1},8,["to"])]),Object(n["g"])("div",b,[j,r.like>=1?(Object(n["p"])(),Object(n["d"])("span",k,[g,Object(n["f"])(Object(n["x"])(r.like),1)])):r.like<=-1?(Object(n["p"])(),Object(n["d"])("span",O,[v,Object(n["f"])(Object(n["x"])(r.like),1)])):(Object(n["p"])(),Object(n["d"])("span",I,[U,w]))]),Object(n["u"])(e.$slots,"default"),Object(n["g"])("p",A,Object(n["x"])(r.comment),1)])}var x={name:"Comment",props:["userName","comment","like","UserId"]};r("bdf9");x.render=B;var y=x,R=r("e203"),C=r("f383"),P=r("c7bb"),D=r("64ac"),M=r("0d3a"),$=r("0b43"),E=r("fd2d"),T={name:"PostUnique",components:{Post:d["a"],NavHome:l["a"],Comment:y,RouterComment:R["a"],ButtonLike:C["a"],ButtonDislike:P["a"],ButtonDelete:D["a"],RouterUpdate:M["a"],ButtonReport:$["a"],Footer:E["a"]},data:function(){return{post:[],comments:[],createdAt:"",updatedAt:"",name:"",token:"",userId:"",isAdmin:"",reportMessage:"",likeMessage:"",dislikeMessage:"",messageComment:"",action:"Supprimer",error:""}},created:function(){var e=this,t=localStorage.getItem("user"),r=JSON.parse(t);if(null===r)return this.$router.push({path:"/"});this.token=r.token,this.userId=r.userId,this.isAdmin=r.isAdmin,fetch("https://localhost:3000/groupomania/post/"+this.$route.params.id,{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(this.token)})}).then((function(e){return e.json()})).then((function(t){t.error||(e.post=t.post,e.name=t.post.User.name,e.comments=t.post.Comments,e.createdAt=t.post.createdAt,e.updatedAt=t.post.updatedAt),e.error=t.error})).catch((function(e){console.log(e)}))},computed:{formatCreateDate:function(){var e=Array.from(this.createdAt);e.splice(10,1),e.splice(15,8);var t=e.slice(0,10),r=e.slice(10),n=t.join(""),o=n.split("-",3);return o.reverse(),o.join("/")+" à "+r.join("")},formatUpdateDate:function(){var e=Array.from(this.updatedAt);e.splice(10,1),e.splice(15,8);var t=e.slice(0,10),r=e.slice(10),n=t.join(""),o=n.split("-",3);return o.reverse(),o.join("/")+" à "+r.join("")}},methods:{reportPost:function(e,t){var r=this;if(null===this.token)return this.$router.push({path:"/"});fetch("https://localhost:3000/groupomania/report/post/".concat(e,"/").concat(t,"/"),{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(this.token)})}).then(function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:n=e.sent,n.message&&(r.post.reportMessage=n.message),r.error=n.error;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))},reportComment:function(e,t,r){var n=this;if(null===this.token)return this.$router.push({path:"/"});fetch("https://localhost:3000/groupomania/report/comment/".concat(e,"/").concat(t,"/"),{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(this.token)})}).then(function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:o=e.sent,o.message&&(n.comments[r].reportMessage=o.message),n.error=o.error;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))},deletePost:function(e,t){var r=this;return null===this.token?this.$router.push({path:"/"}):t!=this.userId&&1!=this.isAdmin?this.$router.push({path:"/home"}):void fetch("https://localhost:3000/groupomania/post/"+e,{method:"DELETE",headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer ".concat(this.token)})}).then(function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:n=e.sent,n.error||(r.reportMessage="Post supprimé",r.$router.push({path:"/home"})),r.error=n.error;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))},deleteComment:function(e,t){var r=this;return null===this.token?this.$router.push({path:"/"}):t!=this.userId&&1!=this.isAdmin?this.$router.push({path:"/home"}):void fetch("https://localhost:3000/groupomania/comment/"+e,{method:"DELETE",headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer ".concat(this.token)})}).then(function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(n=e.sent,n.error){e.next=6;break}return r.reportMessage="Commentaire supprimé",e.abrupt("return",fetch("https://localhost:3000/groupomania/post/"+r.$route.params.id,{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(r.token)})}).then((function(e){return e.json()})).then((function(e){e.error||(r.post=e.post,r.name=e.post.User.name,r.comments=e.post.Comments,r.createdAt=e.post.createdAt,r.updatedAt=e.post.updatedAt),r.error=e.error})).catch((function(e){console.log(e)})));case 6:r.error=n.error;case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))},likePost:function(e,t){var r=this;if(null===this.token)return this.$router.push({path:"/"});fetch("https://localhost:3000/groupomania/likePost/like/".concat(e,"/").concat(t),{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(this.token)})}).then(function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(n=e.sent,n.error){e.next=7;break}if("Déjà liké"==n.message){e.next=6;break}return e.abrupt("return",r.post.like+=1);case 6:r.post.like,r.post.like;case 7:r.error=n.error;case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))},dislikePost:function(e,t){var r=this;if(null===this.token)return this.$router.push({path:"/"});fetch("https://localhost:3000/groupomania/likePost/dislike/".concat(e,"/").concat(t),{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(this.token)})}).then(function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(n=e.sent,n.error){e.next=7;break}if("Déjà disliké"==n.message){e.next=6;break}return e.abrupt("return",r.post.like-=1);case 6:r.post.like,r.post.like;case 7:r.error=n.error;case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))},likeComment:function(e,t,r){var n=this;if(null===this.token)return this.$router.push({path:"/"});fetch("https://localhost:3000/groupomania/likeComment/like/".concat(e,"/").concat(t),{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(this.token)})}).then(function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:o=e.sent,o.error||(n.comments[r].like=o.comment.like),n.error=o.error;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))},dislikeComment:function(e,t,r){var n=this;if(null===this.token)return this.$router.push({path:"/"});fetch("https://localhost:3000/groupomania/likeComment/dislike/".concat(e,"/").concat(t),{method:"GET",headers:new Headers({Authorization:"Bearer ".concat(this.token)})}).then(function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:o=e.sent,o.error||(n.comments[r].like=o.comment.like),n.error=o.error;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))}}};r("d83e");T.render=u;t["default"]=T},"5ccc":function(e,t,r){"use strict";r("84ec")},"64ac":function(e,t,r){"use strict";var n=r("7a23"),o={id:"delete-div"},s=Object(n["g"])("i",{class:"gg-trash"},null,-1);function i(e,t,r,i,a,c){return Object(n["p"])(),Object(n["d"])("div",o,[s,Object(n["g"])("button",{id:"delete-btn",onClick:t[1]||(t[1]=function(){return c.deleteButton&&c.deleteButton.apply(c,arguments)})},Object(n["x"])(r.action),1)])}var a={name:"ButtonDelete",props:["action"],methods:{deleteButton:function(){this.$emit("deleteButton")}}};r("5ccc");a.render=i;t["a"]=a},"7ca7":function(e,t,r){},"84ec":function(e,t,r){},bdf9:function(e,t,r){"use strict";r("e25c")},d83e:function(e,t,r){"use strict";r("ec30")},e0c1:function(e,t,r){"use strict";r("7ca7")},e25c:function(e,t,r){},ec30:function(e,t,r){}}]);
//# sourceMappingURL=chunk-7a6993de.4131536f.js.map