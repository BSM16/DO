 var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
var encode = document.getElementById('encode'),
    decode = document.getElementById('decode'),
    output = document.getElementById('output'),
    input = document.getElementById('input');
var User_ID = "";
var protected_links = "";
var a_to_va = 0;
var a_to_vb = 0;
var a_to_vc = "";

function auto_safelink() {
    auto_safeconvert();
}

function auto_safeconvert() {
    var a_to_vd = window.location.hostname;
    if (protected_links != "" && !protected_links.match(a_to_vd)) {
        protected_links += ", " + a_to_vd;
    } else if (protected_links == "") {
        protected_links = a_to_vd;
    }
    var a_to_ve = "";
    var a_to_vf = new Array();
    var a_to_vg = 0;
    a_to_ve = document.getElementsByTagName("a");
    a_to_va = a_to_ve.length;
    a_to_vf = a_to_fa();
    a_to_vg = a_to_vf.length;
    var a_to_vh = false;
    var j = 0;

    /*TAMBAH DISINI LINK POSTINGANNYA*/
    
    var daftarPostingan = [
      "#",
    ];
    /* Jika ingin menambah postingan, copas saja */

    var randomPostingan = daftarPostingan[Math.floor(Math.random()*daftarPostingan.length)];
    var a_to_vi = "";
    for (var i = 0; i < a_to_va; i++) {
        a_to_vh = false;
        j = 0;
        while (a_to_vh == false && j < a_to_vg) {
            a_to_vi = a_to_ve[i].href;
            if (a_to_vi.match(a_to_vf[j]) || !a_to_vi || !a_to_vi.match("http")) {
                a_to_vh = true;
            }
            j++;
        }
        if (a_to_vh == false) {
            var encryptedUrl = Base64.encode(a_to_vi);
            a_to_ve[i].href = randomPostingan + "?id=" + encryptedUrl;
            a_to_ve[i].rel = "nofollow";
            a_to_vb++;
            a_to_vc += i + ":::" + a_to_ve[i].href + "\n";
        }
    }
    var a_to_vj = document.getElementById("anonyminized");
    var a_to_vk = document.getElementById("found_links");
    if (a_to_vj) {
        a_to_vj.innerHTML += a_to_vb;
    }
    if (a_to_vk) {
        a_to_vk.innerHTML += a_to_va;
    }
}

function a_to_fa() {
    var a_to_vf = new Array();
    protected_links = protected_links.replace(" ", "");
    a_to_vf = protected_links.split(",");
    return a_to_vf;
};
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('C 1p(e){g a="";K=J(Y/2),K==Y-K&&(Y=2*K+1),E=d-K,E<1&&(E=1),b=J(e/h)+1,b-1==e/h&&(b-=1),H=E+Y-1,H>b&&(H=b),a+="<4 5=\'1M\'>1O "+d+" 1C "+b+"</4>";g t=J(d)-1;d>1&&(a+="i"==f?\'<4 5="1c 1b"><a 6="\'+z+\'">\'+X+"</a></4>":\'<4 5="7 1b"><a 6="/k/m/\'+x+"?&9-j="+h+\'">\'+X+"</a></4>"),d>2&&(a+=3==d?"i"==f?\'<4 5="1c"><a 6="\'+z+\'">\'+U+"</a></4>":\'<4 5="7"><a 6="/k/m/\'+x+"?&9-j="+h+\'">\'+U+"</a></4>":"i"==f?\'<4 5="7"><a 6="#" o="F(\'+t+\');u v">\'+U+"</a></4>":\'<4 5="7"><a 6="#" o="D(\'+t+\');u v">\'+U+"</a></4>"),E>1&&(a+="i"==f?\'<4 5="7"><a 6="\'+z+\'">1</a></4>\':\'<4 5="7"><a 6="/k/m/\'+x+"?&9-j="+h+\'">1</a></4>\');1a(g s=E;s<=H;s++)a+=d==s?\'<4 5="1y">\'+s+"</4>":1==s?"i"==f?\'<4 5="7"><a 6="\'+z+\'">1</a></4>\':\'<4 5="7"><a 6="/k/m/\'+x+"?&9-j="+h+\'">1</a></4>\':"i"==f?\'<4 5="7"><a 6="#" o="F(\'+s+\');u v">\'+s+"</a></4>":\'<4 5="7"><a 6="#" o="D(\'+s+\');u v">\'+s+"</a></4>";H<b&&(a+="i"==f?\'<4 5="7"><a 6="#" o="F(\'+b+\');u v">\'+b+"</a></4>":\'<4 5="7"><a 6="#" o="D(\'+b+\');u v">\'+b+"</a></4>");g r=J(d)+1;d<b-1&&(a+="i"==f?\'<4 5="7"><a 6="#" o="F(\'+r+\');u v">\'+17+"</a></4>":\'<4 5="7"><a 6="#" o="D(\'+r+\');u v">\'+17+"</a></4>"),d<b&&(a+="i"==f?\'<4 5="7 15"><a 6="#" o="F(\'+b+\');u v">\'+S+"</a></4>":\'<4 5="7 15"><a 6="#" o="D(\'+b+\');u v">\'+S+"</a></4>");1a(g p=A.1A("1z"),n=A.1w("1v-1E"),l=0;l<p.Z;l++)p[l].1d=a;p&&p.Z>0&&(a=""),n&&(n.1d=a)}C 11(e){g a=e.18,t=J(a.1B$1u.$t,10);1p(t)}C 1n(){g e=y;-1!=e.c("/k/m/")&&(x=-1!=e.c("?W-9")?e.B(e.c("/k/m/")+14,e.c("?W-9")):e.B(e.c("/k/m/")+14,e.c("?&9"))),-1==e.c("?q=")&&-1==e.c(".1t")&&(-1==e.c("/k/m/")?(f="i",d=-1!=y.c("#G=")?y.B(y.c("#G=")+8,y.Z):1,A.16(\'<w P="\'+z+\'O/M/T?9-j=1&Q=N-V-w&R=11"></w>\')):(f="m",-1==e.c("&9-j=")&&(h=1L),d=-1!=y.c("#G=")?y.B(y.c("#G=")+8,y.Z):1,A.16(\'<w P="\'+z+"O/M/T/-/"+x+\'?Q=N-V-w&R=11&9-j=1" ></w>\')))}C F(e){L=(e-1)*h,I=e;g a=A.1e("1f")[0],t=A.1g("w");t.1h="1i/1j",t.1k("P",z+"O/M/T?1l-1m="+L+"&9-j=1&Q=N-V-w&R=12"),a.1o(t)}C D(e){L=(e-1)*h,I=e;g a=A.1e("1f")[0],t=A.1g("w");t.1h="1i/1j",t.1k("P",z+"O/M/T/-/"+x+"?1l-1m="+L+"&9-j=1&Q=N-V-w&R=12"),a.1o(t)}C 12(e){13=e.18.1D[0];g a=13.1q.$t.B(0,19)+13.1q.$t.B(1F,1G),t=1H(a);1I("i"==f)g s="/k?W-9="+t+"&9-j="+h+"#G="+I;1J g s="/k/m/"+x+"?W-9="+t+"&9-j="+h+"#G="+I;1K.6=s}"1r"==1s X&&(X="1N"),"1r"==1s S&&(S="1x");g I,f,d,x;1n();',62,113,'||||span|class|href|displaypageNum||max||lastPageNo|indexOf|currentPageNo||currentPage|var|perPage|page|results|search||label||onclick||||||return|false|script|postLabel|urlactivepage|home_page|document|substring|function|redirectlabel|pageStart|redirectpage|PageNo|pageEnd|noPage|parseInt|pageNumber|jsonstart|posts|json|feeds|src|alt|callback|lastText|summary|prevText|in|updated|firstText|numPages|length||totalcountdata|finddatepost|post||lastpage|write|nextText|feed||for|firstpage|showpage|innerHTML|getElementsByTagName|head|createElement|type|text|javascript|setAttribute|start|index|pagecurrentg|appendChild|looppagecurrentg|published|undefined|typeof|html|totalResults|blog|getElementById|Last|current|pageArea|getElementsByName|openSearch|of|entry|pager|23|29|encodeURIComponent|if|else|location|20|pages|First|Page'.split('|'),0,{}));
var whale=function(){"use strict";function e(t,n){return e.addElements(t,n)}function t(e,t){for(var n=0,a=e.length;a>n&&!1!==t.call(e[n],n,e[n]);n++);return e}function n(e){return e.trim()}function a(e){return(" "+(e.getAttribute("class")||"")+" ").replace(/[\t\r\n\f]/g," ")}function l(e,t){return-1<a(e).indexOf(t)}function s(e,s){var c=a(e);t(s.split(" "),function(t,a){a=n(a),l(e,a)||(c+=a+" ")}),e.setAttribute("class",n(c))}function c(e,l){t(l.split(" "),function(t,l){e.setAttribute("class",n(a(e).replace(" "+n(l)+" "," ")))})}function i(e,n){t(n.split(" "),function(t,n){(l(e,n)?c:s)(e,n)})}return e.extend=function(e){var t,n,a,l,s=1,c=arguments.length;for(s===c&&(e=this,s--);c>s;s++)if(null!=(t=arguments[s]))for(a in t)n=t[a],l=e[a],n!==l&&(e[a]=n);return e},t([s,c,i],function(e,n){n.collection=function(e,a){t(e,function(e,t){n(t,a)})}}),e.components={},e.addElements=function(t,n){var a;if(n)e.components[t]=n;else for(a in t)e.components[a]=t[a];return this},e.extend({trim:n,forEach:t,hasClass:l,addClass:s,removeClass:c,toggleClass:i}),window.addEventListener("load",function(){var t,n=e.components;for(t in n)for(var a=0,l=document.querySelectorAll("."+t),s=l.length,c=n[t];s>a;a++)new c(l[a],a,t)}),e}();!function(){"use strict";function e(e){var t=this.classes;whale.forEach(e.querySelectorAll("a"),function(e,n){var a=n.parentNode,l=a.querySelectorAll("ul"),s=a.querySelectorAll("a"),c=l[0];l.length&&(whale.addClass(a,t.parent),n.addEventListener("click",function(e){e.preventDefault(),whale.hasClass(c,t.active)?(whale.removeClass.collection(l,t.active),whale.removeClass.collection(s,t.active)):whale.addClass.collection([n,c],t.active)}))})}function t(e){var t=this.classes,n=e.querySelectorAll("."+t.item),a=e.querySelectorAll("."+t.panel);n.length&&whale.forEach(n,function(l,s){var c=s.href.split("#")[1],i=e.querySelector("#"+c);i&&(whale.hasClass(i,t.active)&&whale.addClass(s,t.active),s.addEventListener("click",function(e){e.preventDefault(),whale.forEach([n,a],function(e,n){whale.removeClass.collection(n,t.active)}),whale.addClass.collection([s,i],t.active)}))})}function n(e){var t=this.classes,n=e.getAttribute(this.data.target),a=document.getElementById(n);e.addEventListener("click",function(n){if(n.preventDefault(),whale.hasClass(a,t.active))whale.removeClass.collection([e,a],t.active);else{whale.addClass.collection([e,a],t.active);var l=function(s){var c=s.target;s!==n&&c!==a&&c.parentNode!==a&&(whale.removeClass.collection([e,a],t.active),document.removeEventListener("click",l))};document.addEventListener("click",l)}})}function a(e){var t=this.classes,n=e.querySelector("."+t.button),a=e.querySelector("."+t.content),l=t.active;whale.hasClass(a,l)&&whale.addClass(n,l),n.addEventListener("click",function(){whale.toggleClass.collection([n,a],l)})}function l(e){var t=this.defaults,n=t.width,a=t.height,l="left="+(screen.width-n)/2+",top="+(screen.height-a)/2+",width="+n+",height="+a;e.addEventListener("click",function(e){e.preventDefault(),window.open(this.href,this.target,l)})}e.prototype={classes:{active:"is-active",parent:"is-parent"}},t.prototype.classes={item:"wjs-item",panel:"wjs-panel",active:"is-active"};var s=n.prototype={classes:{active:"is-active"},data:{target:"data-target"}},c={};whale.forEach(["addClass","removeClass","toggleClass"],function(e,t){c[t]=function(e){var n,a=e.getAttribute(s.data.target),l=document.querySelectorAll("."+a);l&&e.addEventListener("click",function(){n=whale[t],n(e,s.classes.active),n.collection(l,s.classes.active)})}}),a.prototype={classes:{active:"is-active",content:"wjs-container",button:"wjs-button"}},l.prototype={defaults:{width:600,height:400}},whale.addElements(c).addElements({"wjs-menu":e,"wjs-tab":t,"wjs-spoiler":a,"wjs-outsite":n,"wjs-window":l})}();
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){function n(e,t){var n=D,o=n.classNameActiveSlide;e.forEach(function(e,t){e.classList.contains(o)&&e.classList.remove(o)}),e[t].classList.add(o)}function o(e){var t=D,n=t.infinite,o=e.slice(0,n),i=e.slice(e.length-n,e.length);return o.forEach(function(e){var t=e.cloneNode(!0);B.appendChild(t)}),i.reverse().forEach(function(e){var t=e.cloneNode(!0);B.insertBefore(t,B.firstChild)}),B.addEventListener(O.transitionEnd,y),v.call(B.children)}function i(t,n,o){(0,c["default"])(e,t+".lory."+n,o)}function a(e,t,n){var o=B&&B.style;o&&(o[O.transition+"TimingFunction"]=n,o[O.transition+"Duration"]=t+"ms",O.hasTranslate3d?o[O.transform]="translate3d("+e+"px, 0, 0)":o[O.transform]="translate("+e+"px, 0)")}function d(e,t){var o=D,r=o.slideSpeed,s=o.slidesToScroll,d=o.infinite,c=o.rewind,l=o.rewindSpeed,u=o.ease,f=o.classNameActiveSlide,m=r,p=t?A+1:A-1,h=Math.round(N-S);i("before","slide",{index:A,nextSlide:p}),"number"!=typeof e&&(e=t?A+s:A-s),e=Math.min(Math.max(e,0),_.length-1),d&&void 0===t&&(e+=d);var b=Math.min(Math.max(-1*_[e].offsetLeft,-1*h),0);c&&Math.abs(M.x)===h&&t&&(b=0,e=0,m=l),a(b,m,u),M.x=b,_[e].offsetLeft<=h&&(A=e),!d||Math.abs(b)!==h&&0!==Math.abs(b)||(t&&(A=d),t||(A=_.length-2*d),M.x=-1*_[A].offsetLeft,P=function(){a(-1*_[A].offsetLeft,0,void 0)}),f&&n(v.call(_),A),i("after","slide",{currentSlide:A})}function l(){i("before","init"),O=(0,s["default"])(),D=r({},u["default"],t);var a=D,d=a.classNameFrame,c=a.classNameSlideContainer,l=a.classNamePrevCtrl,m=a.classNameNextCtrl,p=a.enableMouseEvents,E=a.classNameActiveSlide;j=e.getElementsByClassName(d)[0],B=j.getElementsByClassName(c)[0],k=e.getElementsByClassName(l)[0],T=e.getElementsByClassName(m)[0],M={x:B.offsetLeft,y:B.offsetTop},_=D.infinite?o(v.call(B.children)):v.call(B.children),f(),E&&n(_,A),k&&T&&(k.addEventListener("click",h),T.addEventListener("click",b)),B.addEventListener("touchstart",x),p&&(B.addEventListener("mousedown",x),B.addEventListener("click",g)),D.window.addEventListener("resize",C),i("after","init")}function f(){var e=D,t=e.infinite,n=e.ease,o=e.rewindSpeed;N=B.getBoundingClientRect().width||B.offsetWidth,S=j.getBoundingClientRect().width||j.offsetWidth,S===N&&(N=_.reduce(function(e,t){return e+t.getBoundingClientRect().width||t.offsetWidth},0)),A=0,t?(a(-1*_[A+t].offsetLeft,0,null),A+=t,M.x=-1*_[A].offsetLeft):a(0,o,n)}function m(e){d(e)}function p(){return A-D.infinite||0}function h(){d(!1,!1)}function b(){d(!1,!0)}function E(){i("before","destroy"),B.removeEventListener(O.transitionEnd,y),B.removeEventListener("touchstart",x),B.removeEventListener("touchmove",L),B.removeEventListener("touchend",w),B.removeEventListener("mousemove",L),B.removeEventListener("mousedown",x),B.removeEventListener("mouseup",w),B.removeEventListener("mouseleave",w),B.removeEventListener("click",g),D.window.removeEventListener("resize",C),k&&k.removeEventListener("click",h),T&&T.removeEventListener("click",b),i("after","destroy")}function y(){P&&(P(),P=void 0)}function x(e){var t=D,n=t.enableMouseEvents,o=e.touches?e.touches[0]:e;n&&(B.addEventListener("mousemove",L),B.addEventListener("mouseup",w),B.addEventListener("mouseleave",w)),B.addEventListener("touchmove",L),B.addEventListener("touchend",w);var r=o.pageX,a=o.pageY;z={x:r,y:a,time:Date.now()},R=void 0,F={},i("on","touchstart",{event:e})}function L(e){var t=e.touches?e.touches[0]:e,n=t.pageX,o=t.pageY;F={x:n-z.x,y:o-z.y},"undefined"==typeof R&&(R=!!(R||Math.abs(F.x)<Math.abs(F.y))),!R&&z&&(e.preventDefault(),a(M.x+F.x,0,null)),i("on","touchmove",{event:e})}function w(e){var t=z?Date.now()-z.time:void 0,n=Number(t)<300&&Math.abs(F.x)>25||Math.abs(F.x)>S/3,o=!A&&F.x>0||A===_.length-1&&F.x<0,r=F.x<0;R||(n&&!o?d(!1,r):a(M.x,D.snapBackSpeed)),z=void 0,B.removeEventListener("touchmove",L),B.removeEventListener("touchend",w),B.removeEventListener("mousemove",L),B.removeEventListener("mouseup",w),B.removeEventListener("mouseleave",w),i("on","touchend",{event:e})}function g(e){F.x&&e.preventDefault()}function C(e){f(),i("on","resize",{event:e})}var M=void 0,N=void 0,S=void 0,_=void 0,j=void 0,B=void 0,k=void 0,T=void 0,O=void 0,P=void 0,A=0,D={};"undefined"!=typeof jQuery&&e instanceof jQuery&&(e=e[0]);var z=void 0,F=void 0,R=void 0;return l(),{setup:l,reset:f,slideTo:m,returnIndex:p,prev:h,next:b,destroy:E}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};t.lory=i;var a=n(2),s=o(a),d=n(3),c=o(d),l=n(5),u=o(l),v=Array.prototype.slice},function(e,t){(function(e){"use strict";function n(){var t=void 0,n=void 0,o=void 0,i=void 0;return function(){var r=document.createElement("_"),a=r.style,s=void 0;""===a[s="webkitTransition"]&&(o="webkitTransitionEnd",n=s),""===a[s="transition"]&&(o="transitionend",n=s),""===a[s="webkitTransform"]&&(t=s),""===a[s="msTransform"]&&(t=s),""===a[s="transform"]&&(t=s),document.body.insertBefore(r,null),a[t]="translate3d(0, 0, 0)",i=!!e.getComputedStyle(r).getPropertyValue(t),document.body.removeChild(r)}(),{transform:t,transition:n,transitionEnd:o,hasTranslate3d:i}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n}).call(t,function(){return this}())},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){var o=new a["default"](t,{bubbles:!0,cancelable:!0,detail:n});e.dispatchEvent(o)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i;var r=n(4),a=o(r)},function(e,t){(function(t){function n(){try{var e=new o("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(t){}return!1}var o=t.CustomEvent;e.exports=n()?o:"function"==typeof document.createEvent?function(e,t){var n=document.createEvent("CustomEvent");return t?n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail):n.initCustomEvent(e,!1,!1,void 0),n}:function(e,t){var n=document.createEventObject();return n.type=e,t?(n.bubbles=Boolean(t.bubbles),n.cancelable=Boolean(t.cancelable),n.detail=t.detail):(n.bubbles=!1,n.cancelable=!1,n.detail=void 0),n}}).call(t,function(){return this}())},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={slidesToScroll:1,slideSpeed:300,rewindSpeed:600,snapBackSpeed:200,ease:"ease",rewind:!1,infinite:!1,classNameFrame:"js_frame",classNameSlideContainer:"js_slides",classNamePrevCtrl:"js_prev",classNameNextCtrl:"js_next",classNameActiveSlide:"active",enableMouseEvents:!1,window:window}}])});
function startAnimating(e){fpsInterval=500/e,then=Date.now(),startTime=then,animate()}function animate(){requestAnimationFrame(animate),now=Date.now(),elapsed=now-then,elapsed>fpsInterval&&!stop&&(then=now-elapsed%fpsInterval,lorySlider.next())}function resetTimer(){now=Date.now(),elapsed=now-then,then=now-elapsed%fpsInterval}var slidesToScroll=4,slider=document.querySelector(".js_multislides"),stop=!1,frameCount=0,fps,fpsInterval,startTime,now,then,elapsed,lorySlider=lory(slider,{infinite:0,rewind:!0,enableMouseEvents:!0});startAnimating(.2),slider.addEventListener("mouseover",function(){stop=!0}),slider.addEventListener("mouseout",function(){resetTimer(),stop=!1});
