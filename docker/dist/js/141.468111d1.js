"use strict";(self["webpackChunkmangosale"]=self["webpackChunkmangosale"]||[]).push([[141],{66141:function(t,s,a){a.r(s),a.d(s,{default:function(){return v}});a(57658);var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Lock"},[s("div",{staticClass:"panel-box"},[s("div",{staticClass:"token-list"},[t._m(0),t._l(t.list,(function(a,e){return s("div",{key:e,staticClass:"row"},[s("div",{staticClass:"col"},[t._v(" "+t._s(a.coinInfo?a.coinInfo.name:"")+" ")]),s("div",{staticClass:"col"},[t._v(" "+t._s(t.moment(new Date(parseInt(a.endTime))).format("MMMM Do YYYY, h:mm:ss a"))+" ")]),s("div",{staticClass:"col"},[t._v(" "+t._s(a.amount)+" ")]),s("div",{staticClass:"col"},[t._v(" "+t._s(a.owner?a.owner.substr(0,5)+"..."+a.owner.substr(a.owner.length-4,a.owner.length):"")+" ")]),s("div",{staticClass:"col"},[s("div",{staticClass:"mangobox-button",on:{click:function(s){return t.$router.push({path:"/LockDetail",params:a})}}},[t._v(" View ")])])])})),s("el-pagination",{staticClass:"pagination",attrs:{layout:"prev, pager, next",total:t.list.length}})],2)])])},i=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"list-header"},[s("div",{staticClass:"col"},[t._v(" Token ")]),s("div",{staticClass:"col"},[t._v(" Unlock Time ")]),s("div",{staticClass:"col"},[t._v(" Amount ")]),s("div",{staticClass:"col"},[t._v(" Owner ")]),s("div",{staticClass:"col"},[t._v(" View ")])])}],n=a(36797),o=a.n(n),c={name:"lockView",data(){return{moment:o(),list:[]}},computed:{account(){return this.$store.state.app.account}},watch:{account(){this.getUserLocks()}},methods:{async getUserLocks(){let t=await this.$store.dispatch("mangoLock/getUserLocks",this.$store.state.app.account),s=[];for(let a=0;a<t.length;a++){t[a].endTime=t[a].endTime.replace(new RegExp(",","g"),"");let e=await this.$store.dispatch("erc20/queryInfo",t[a].contract);s.push({coinInfo:e,...t[a]})}this.list=s}},created(){setTimeout((()=>{this.getUserLocks()}),1500)}},l=c,r=a(1001),u=(0,r.Z)(l,e,i,!1,null,"64f13260",null),v=u.exports}}]);
//# sourceMappingURL=141.468111d1.js.map