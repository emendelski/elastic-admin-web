(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"/8Fb":function(t,e,n){var a=n("XKFU"),r=n("UExd")(!0);a(a.S,"Object",{entries:function(t){return r(t)}})},"1xcX":function(t,e,n){},B9Yq:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"snapshot-root"},[n("v-select",{attrs:{label:"Snapshot repository",items:t.repoItemsForSelect,"hide-details":""},model:{value:t.selectRepoName,callback:function(e){t.selectRepoName=e},expression:"selectRepoName"}}),t.snapshots.length?n("DebounceTextField",{attrs:{debounce:"1000",label:"Snapshot filter"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}):t._e(),n("v-data-table",{attrs:{headers:t.snapshotHeaders,items:t.snapshots,loading:t.loading,search:t.search,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(e){return[n("tr",{key:e.item.snapshot,class:{deleting:e.item.deleting}},[n("td",{staticStyle:{"text-align":"left"}},[n("span",[t._v(t._s(e.item.snapshot))]),n("v-btn",{attrs:{icon:""},nativeOn:{click:function(n){t.deleteSnapshot(t.selectRepoName,e.item)}}},[n("v-icon",[t._v("close")])],1)],1),n("td",[n("select",t._l(e.item.indices,function(e){return n("option",{key:e},[t._v(t._s(e))])}))]),n("td",[t._v(t._s(e.item.state))])])]}}])}),n("Dimmer",{staticStyle:{"z-index":"1"},attrs:{loading:t.loading,text:"Loading ..."}})],1)},r=[];function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){o(t,e,n[e])})}return t}var i=n("k5N+"),l=(n("rGqo"),n("/8Fb"),n("f3/d"),n("xmWZ")),c=n("3Aqn"),u=n("qpph"),p=n("0yhX"),h=n("EdlT"),f=(n("yt8O"),n("VRzm"),n("mrSG")),d=n("/yAk"),m=n("QL/d"),S=n("YKMj"),v=function(t){function e(){var t;return Object(l["a"])(this,e),t=Object(p["a"])(this,Object(h["a"])(e).apply(this,arguments)),t.loadingSnapshot=!1,t.loadingSnapshotAll=!1,t.snapshotHeaders=[{text:"Snapshot",value:"snapshot"},{text:"Indices",value:"indices"},{text:"State",value:"state"}],t.repos=[],t.snapshots=[],t.selectRepoName="",t.search="",t}return Object(u["a"])(e,[{key:"reloadSnapshot",value:function(){var t=this;return this.loadingSnapshot=!0,d["a"].snapshot().then(function(e){t.repos=[];for(var n=Object.entries(e.data),a=0;a<n.length;a++){var r=Object(i["a"])(n[a],2),o=r[0],s=(r[1],{});s.name=o,t.repos.push(s)}t.repos.length&&(t.selectRepoName=t.selectRepoName||t.repos[0].name),t.selectRepoName&&t.reloadSnapshotAll(t.selectRepoName)}).then(function(){t.loadingSnapshot=!1})}},{key:"reloadSnapshotAll",value:function(t){var e=this;return this.loadingSnapshotAll=!0,d["a"].snapshotAll(t).then(function(t){e.snapshots=t.data.snapshots.map(function(t){return s({deleting:!1},t)})}).then(function(){e.loadingSnapshotAll=!1})}},{key:"deleteSnapshot",value:function(t,e){var n=this;return e.deleting=!0,d["a"].deleteSnapshot(t,e.snapshot).then(function(){n.snapshots=n.snapshots.filter(function(t){return t.snapshot!==e.snapshot})})}},{key:"mounted",value:function(){Object(m["a"])().url&&this.reloadSnapshot()}},{key:"repoItemsForSelect",get:function(){return this.repos.map(function(t){return t.name})}},{key:"loading",get:function(){return this.loadingSnapshot||this.loadingSnapshotAll}}]),Object(c["a"])(e,t),e}(S["d"]);v=f["a"]([Object(S["a"])({components:{DebounceTextField:function(){return n.e(7).then(n.bind(null,"prZc"))},Dimmer:function(){return n.e(8).then(n.bind(null,"2RLG"))}}})],v);var y=v,b=y,g=(n("RzEa"),n("KHd+")),L=Object(g["a"])(b,a,r,!1,null,"66125fec",null);e["default"]=L.exports},"QL/d":function(t,e,n){"use strict";n.d(e,"a",function(){return a});n("pIFo");function a(){var t=(location.hash||"").replace(/^#/,"");if(t)try{var e=JSON.parse(decodeURIComponent(t));return e||{}}catch(e){try{var n=JSON.parse(t);return n||{}}catch(t){return{}}}return{}}},RzEa:function(t,e,n){"use strict";var a=n("1xcX"),r=n.n(a);r.a},UExd:function(t,e,n){var a=n("DVgA"),r=n("aCFj"),o=n("UqcF").f;t.exports=function(t){return function(e){var n,s=r(e),i=a(s),l=i.length,c=0,u=[];while(l>c)o.call(s,n=i[c++])&&u.push(t?[n,s[n]]:s[n]);return u}}},UqcF:function(t,e){e.f={}.propertyIsEnumerable},"k5N+":function(t,e,n){"use strict";function a(t){if(Array.isArray(t))return t}function r(t,e){var n=[],a=!0,r=!1,o=void 0;try{for(var s,i=t[Symbol.iterator]();!(a=(s=i.next()).done);a=!0)if(n.push(s.value),e&&n.length===e)break}catch(t){r=!0,o=t}finally{try{a||null==i["return"]||i["return"]()}finally{if(r)throw o}}return n}function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function s(t,e){return a(t)||r(t,e)||o()}n.d(e,"a",function(){return s})},rGqo:function(t,e,n){for(var a=n("yt8O"),r=n("DVgA"),o=n("KroJ"),s=n("dyZX"),i=n("Mukb"),l=n("hPIQ"),c=n("K0xU"),u=c("iterator"),p=c("toStringTag"),h=l.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=r(f),m=0;m<d.length;m++){var S,v=d[m],y=f[v],b=s[v],g=b&&b.prototype;if(g&&(g[u]||i(g,u,h),g[p]||i(g,p,v),l[v]=h,y))for(S in a)g[S]||o(g,S,a[S],!0)}}}]);
//# sourceMappingURL=Snapshot.43e7f6df.js.map