webpackJsonp([1],{PKQG:function(e,t,r){e.exports=r.p+"img/green_light.3b7f83c.png"},"Q/Oh":function(e,t,r){"use strict";r("YFWx");var n=r("4wpP");t.a={head:function(){return{title:"스터디멤버"}},data:function(){return{ready:!1,name:"",step:0}},computed:{imgPath:function(){return this.ready?r("PKQG"):r("zxvv")}},methods:{onReady:function(){this.ready?(this.ready=!1,n.a.emit("user chagned ready status",{ready:!1})):(this.ready=!0,n.a.emit("user chagned ready status",{ready:!0}))}},created:function(){this.name=this.$route.query.name},beforeMount:function(){var e=this;n.a.emit("enter",{name:this.name}),n.a.on("initilize status",function(t){e.ready=!1,e.step=t.step,n.a.emit("user chagned ready status",{ready:!1})})},destroyed:function(){n.a.emit("logout")}}},QDrm:function(e,t,r){(e.exports=r("FZ+f")(!1)).push([e.i,"input[type=text][data-v-2104db96]{border:1px solid #ddd}img[data-v-2104db96]{width:50%;max-width:300px;cursor:pointer}",""])},YFWx:function(e,t,r){"use strict";var n=r("mtWM"),a=(r.n(n),{});n.create(a)},ekZN:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("Q/Oh"),a=r("muCw"),i=!1;var s=function(e){i||r("lIeo")},u=r("VU/8")(n.a,a.a,!1,s,"data-v-2104db96",null);u.options.__file="pages/member/index.vue",t.default=u.exports},lIeo:function(e,t,r){var n=r("QDrm");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);r("rjj0")("98b2c9c8",n,!1,{sourceMap:!1})},muCw:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h2",[r("u",[e._v("STEP "+e._s(e.step))])]),r("br"),r("img",{attrs:{src:e.imgPath},on:{click:e.onReady}}),r("br"),r("b",[e._v(e._s(e.name))]),e._v("님\n  "),r("h3",[e._v(e._s(e.ready?"준비가 덜 됐으면 Buzzer를 누르세요.":"준비됐으면 Buzzer를 누르세요!"))])])};n._withStripped=!0;var a={render:n,staticRenderFns:[]};t.a=a},zxvv:function(e,t,r){e.exports=r.p+"img/red_light.b73159f.png"}});