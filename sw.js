!function(e){function t(r){if(n[r])return n[r].exports;var c=n[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,t),c.l=!0,c.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=130)}({130:function(e,t){var n=["/","/bundle.js","/styles.css"];self.addEventListener("install",function(e){e.waitUntil(caches.open("webpack-generator-v1").then(function(e){return e.addAll(n)}))}),self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(t){if(t)return t;var n=e.request.clone();return fetch(n).then(function(t){if(!t||200!==t.status||"basic"!==t.type)return t;var n=t.clone();return caches.open("webpack-generator-v1").then(function(t){t.put(e.request,n)}),t})}))})}});
//# sourceMappingURL=sw.js.map