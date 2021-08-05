(window["webpackJsonpcorona-react"]=window["webpackJsonpcorona-react"]||[]).push([[7],{195:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(){for(var e=arguments.length,a=Array(e),t=0;t<e;t++)a[t]=arguments[t];return(0,r.default)((function(){for(var e=arguments.length,t=Array(e),l=0;l<e;l++)t[l]=arguments[l];var n=null;return a.forEach((function(e){if(null==n){var a=e.apply(void 0,t);null!=a&&(n=a)}})),n}))};var l,n=t(196),r=(l=n)&&l.__esModule?l:{default:l};e.exports=a.default},196:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e){function a(a,t,l,n,r,s){var i=n||"<<anonymous>>",c=s||l;if(null==t[l])return a?new Error("Required "+r+" `"+c+"` was not specified in `"+i+"`."):null;for(var o=arguments.length,m=Array(o>6?o-6:0),d=6;d<o;d++)m[d-6]=arguments[d];return e.apply(void 0,[t,l,i,r,c].concat(m))}var t=a.bind(null,!1);return t.isRequired=a.bind(null,!0),t},e.exports=a.default},432:function(e,a,t){"use strict";var l=t(1),n=t(3),r=t(8),s=t.n(r),i=t(0),c=t.n(i),o=(t(195),t(19)),m=t.n(o),d={type:m.a.string.isRequired,as:m.a.elementType},u=c.a.forwardRef((function(e,a){var t=e.as,r=void 0===t?"div":t,i=e.className,o=e.type,m=Object(n.a)(e,["as","className","type"]);return c.a.createElement(r,Object(l.a)({},m,{ref:a,className:s()(i,o&&o+"-feedback")}))}));u.displayName="Feedback",u.propTypes=d,u.defaultProps={type:"valid"};var f=u,b=c.a.createContext({controlId:void 0}),p=t(10),h=c.a.forwardRef((function(e,a){var t=e.id,r=e.bsPrefix,o=e.bsCustomPrefix,m=e.className,d=e.isValid,u=e.isInvalid,f=e.isStatic,h=e.as,v=void 0===h?"input":h,N=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","isStatic","as"]),O=Object(i.useContext)(b),j=O.controlId;return r=O.custom?Object(p.b)(o,"custom-control-input"):Object(p.b)(r,"form-check-input"),c.a.createElement(v,Object(l.a)({},N,{ref:a,id:t||j,className:s()(m,r,d&&"is-valid",u&&"is-invalid",f&&"position-static")}))}));h.displayName="FormCheckInput",h.defaultProps={type:"checkbox"};var v=h,N=c.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.bsCustomPrefix,o=e.className,m=e.htmlFor,d=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),u=Object(i.useContext)(b),f=u.controlId;return t=u.custom?Object(p.b)(r,"custom-control-label"):Object(p.b)(t,"form-check-label"),c.a.createElement("label",Object(l.a)({},d,{ref:a,htmlFor:m||f,className:s()(o,t)}))}));N.displayName="FormCheckLabel";var O=N,j=c.a.forwardRef((function(e,a){var t=e.id,r=e.bsPrefix,o=e.bsCustomPrefix,m=e.inline,d=e.disabled,u=e.isValid,h=e.isInvalid,N=e.feedback,j=e.className,y=e.style,x=e.title,E=e.type,w=e.label,g=e.children,C=e.custom,P=e.as,k=void 0===P?"input":P,I=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedback","className","style","title","type","label","children","custom","as"]),F="switch"===E||C;r=F?Object(p.b)(o,"custom-control"):Object(p.b)(r,"form-check");var R=Object(i.useContext)(b).controlId,S=Object(i.useMemo)((function(){return{controlId:t||R,custom:F}}),[R,F,t]),L=null!=w&&!1!==w&&!g,V=c.a.createElement(v,Object(l.a)({},I,{type:"switch"===E?"checkbox":E,ref:a,isValid:u,isInvalid:h,isStatic:!L,disabled:d,as:k}));return c.a.createElement(b.Provider,{value:S},c.a.createElement("div",{style:y,className:s()(j,r,F&&"custom-"+E,m&&r+"-inline")},g||c.a.createElement(c.a.Fragment,null,V,L&&c.a.createElement(O,{title:x},w),(u||h)&&c.a.createElement(f,{type:u?"valid":"invalid"},N))))}));j.displayName="FormCheck",j.defaultProps={type:"checkbox",inline:!1,disabled:!1,isValid:!1,isInvalid:!1,title:""},j.Input=v,j.Label=O;var y=j,x=(t(36),c.a.forwardRef((function(e,a){var t,r,o=e.bsPrefix,m=e.type,d=e.size,u=e.id,f=e.className,h=e.isValid,v=e.isInvalid,N=e.plaintext,O=e.readOnly,j=e.as,y=void 0===j?"input":j,x=Object(n.a)(e,["bsPrefix","type","size","id","className","isValid","isInvalid","plaintext","readOnly","as"]),E=Object(i.useContext)(b).controlId;if(o=Object(p.b)(o,"form-control"),N)(r={})[o+"-plaintext"]=!0,t=r;else if("file"===m){var w;(w={})[o+"-file"]=!0,t=w}else{var g;(g={})[o]=!0,g[o+"-"+d]=d,t=g}return c.a.createElement(y,Object(l.a)({},x,{type:m,ref:a,readOnly:O,id:u||E,className:s()(f,t,h&&"is-valid",v&&"is-invalid")}))})));x.displayName="FormControl",x.Feedback=f;var E=x,w=c.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.className,o=e.children,m=e.controlId,d=e.as,u=void 0===d?"div":d,f=Object(n.a)(e,["bsPrefix","className","children","controlId","as"]);t=Object(p.b)(t,"form-group");var h=Object(i.useMemo)((function(){return{controlId:m}}),[m]);return c.a.createElement(b.Provider,{value:h},c.a.createElement(u,Object(l.a)({},f,{ref:a,className:s()(r,t)}),o))}));w.displayName="FormGroup";var g=w,C=["xl","lg","md","sm","xs"],P=c.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.className,i=e.as,o=void 0===i?"div":i,m=Object(n.a)(e,["bsPrefix","className","as"]),d=Object(p.b)(t,"col"),u=[],f=[];return C.forEach((function(e){var a,t,l,n=m[e];if(delete m[e],null!=n&&"object"===typeof n){var r=n.span;a=void 0===r||r,t=n.offset,l=n.order}else a=n;var s="xs"!==e?"-"+e:"";null!=a&&u.push(!0===a?""+d+s:""+d+s+"-"+a),null!=l&&f.push("order"+s+"-"+l),null!=t&&f.push("offset"+s+"-"+t)})),u.length||u.push(d),c.a.createElement(o,Object(l.a)({},m,{ref:a,className:s.a.apply(void 0,[r].concat(u,f))}))}));P.displayName="Col";var k=P,I=c.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.column,o=e.srOnly,m=e.className,d=e.htmlFor,u=Object(n.a)(e,["bsPrefix","column","srOnly","className","htmlFor"]),f=Object(i.useContext)(b).controlId;t=Object(p.b)(t,"form-label");var h=s()(m,t,o&&"sr-only",r&&"col-form-label");return d=d||f,r?c.a.createElement(k,Object(l.a)({as:"label",className:h,htmlFor:d},u)):c.a.createElement("label",Object(l.a)({ref:a,className:h,htmlFor:d},u))}));I.displayName="FormLabel",I.defaultProps={column:!1,srOnly:!1};var F=I,R=c.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.className,i=e.as,o=void 0===i?"small":i,m=e.muted,d=Object(n.a)(e,["bsPrefix","className","as","muted"]);return t=Object(p.b)(t,"form-text"),c.a.createElement(o,Object(l.a)({},d,{ref:a,className:s()(r,t,m&&"text-muted")}))}));R.displayName="FormText";var S=R,L=c.a.forwardRef((function(e,a){return c.a.createElement(y,Object(l.a)({},e,{ref:a,type:"switch"}))}));L.displayName="Switch",L.Input=y.Input,L.Label=y.Label;var V=L,T=t(37),_=c.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.inline,i=e.className,o=e.validated,m=e.as,d=void 0===m?"form":m,u=Object(n.a)(e,["bsPrefix","inline","className","validated","as"]);return t=Object(p.b)(t,"form"),c.a.createElement(d,Object(l.a)({},u,{ref:a,className:s()(i,o&&"was-validated",r&&t+"-inline")}))}));_.displayName="Form",_.defaultProps={inline:!1},_.Row=Object(T.a)("form-row"),_.Group=g,_.Control=E,_.Check=y,_.Switch=V,_.Label=F,_.Text=S;a.a=_},435:function(e,a,t){"use strict";var l,n=t(1),r=t(3),s=t(8),i=t.n(s),c=t(0),o=t.n(c),m=t(53),d=t(32),u=t(37),f=t(10),b=t(31),p=t(50),h=t.n(p),v=t(51),N=((l={})[b.b]="show",l[b.a]="show",l),O=o.a.forwardRef((function(e,a){var t=e.className,l=e.children,s=Object(r.a)(e,["className","children"]),m=Object(c.useCallback)((function(e){Object(v.a)(e),s.onEnter&&s.onEnter(e)}),[s]);return o.a.createElement(b.e,Object(n.a)({ref:a,addEndListener:h.a},s,{onEnter:m}),(function(e,a){return o.a.cloneElement(l,Object(n.a)({},a,{className:i()("fade",t,l.props.className,N[e])}))}))}));O.defaultProps={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1},O.displayName="Fade";var j=O,y=t(19),x=t.n(y),E={label:x.a.string.isRequired,onClick:x.a.func},w=o.a.forwardRef((function(e,a){var t=e.label,l=e.onClick,s=e.className,c=Object(r.a)(e,["label","onClick","className"]);return o.a.createElement("button",Object(n.a)({ref:a,type:"button",className:i()("close",s),onClick:l},c),o.a.createElement("span",{"aria-hidden":"true"},"\xd7"),o.a.createElement("span",{className:"sr-only"},t))}));w.displayName="CloseButton",w.propTypes=E,w.defaultProps={label:"Close"};var g,C=w,P=t(34),k={show:!0,transition:j,closeLabel:"Close alert"},I={show:"onClose"},F=o.a.forwardRef((function(e,a){var t=Object(m.a)(e,I),l=t.bsPrefix,s=t.show,c=t.closeLabel,u=t.className,b=t.children,p=t.variant,h=t.onClose,v=t.dismissible,N=t.transition,O=Object(r.a)(t,["bsPrefix","show","closeLabel","className","children","variant","onClose","dismissible","transition"]),j=Object(f.b)(l,"alert"),y=Object(d.a)((function(e){h(!1,e)})),x=o.a.createElement("div",Object(n.a)({role:"alert"},N?O:void 0,{className:i()(u,j,p&&j+"-"+p,v&&j+"-dismissible")}),v&&o.a.createElement(C,{onClick:y,label:c}),b);return N?o.a.createElement(N,Object(n.a)({unmountOnExit:!0,ref:a},O,{in:s}),x):s?x:null})),R=(g="h4",o.a.forwardRef((function(e,a){return o.a.createElement("div",Object(n.a)({},e,{ref:a,className:i()(e.className,g)}))})));R.displayName="DivStyledAsH4",F.displayName="Alert",F.defaultProps=k,F.Link=Object(u.a)("alert-link",{Component:P.a}),F.Heading=Object(u.a)("alert-heading",{Component:R});a.a=F},446:function(e,a,t){"use strict";t.r(a),t.d(a,"Login",(function(){return p}));var l=t(27),n=t(11),r=t(12),s=t(14),i=t(13),c=t(48),o=t(15),m=t(0),d=t.n(m),u=t(7),f=t(435),b=t(432),p=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(s.a)(this,Object(i.a)(a).call(this,e))).state={mail:"",pass:"",alert:!1},t.handlechange=t.handlechange.bind(Object(c.a)(t)),t.handleSubmit=t.handleSubmit.bind(Object(c.a)(t)),t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"handlechange",value:function(e){var a=e.target;console.log(this.state),this.setState(Object(l.a)({},a.name,a.value)),console.log(this.state)}},{key:"handleSubmit",value:function(e){var a=this;fetch("http://localhost:3001/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.state.mail,password:this.state.pass})}).then((function(e){if(e.ok)return e.json();throw new Error("request failed")}),(function(e){return console.log(e)})).then((function(e){console.log(e),a.props.history.push({pathname:"/dashboard",state:e})})),e.preventDefault()}},{key:"render",value:function(){return d.a.createElement("div",null,d.a.createElement("div",{className:"d-flex align-items-center auth px-0 login1"},d.a.createElement("div",{className:"row w-100 mx-0 "},d.a.createElement("div",{className:"col-lg-4 mx-auto"},d.a.createElement("div",{className:"card text-left py-5 px-4 px-sm-5 mylogincard"},d.a.createElement("div",{className:"brand-logo"},d.a.createElement("img",{src:t(70),alt:"logo"})),d.a.createElement("h4",null,"Hello! let's get started"),d.a.createElement("h6",{className:"font-weight-light"},"Sign in to continue."),this.state.alert&&d.a.createElement(f.a,{variant:"danger"},"passwords doesn't match!!!!!!!!"),d.a.createElement(b.a,{className:"pt-3",onSubmit:this.handleSubmit},d.a.createElement(b.a.Group,{className:"d-flex search-field"},d.a.createElement(b.a.Control,{name:"mail",type:"email",placeholder:"Username",size:"lg",className:"h-auto",onChange:this.handlechange})),d.a.createElement(b.a.Group,{className:"d-flex search-field"},d.a.createElement(b.a.Control,{name:"pass",type:"password",placeholder:"Password",size:"lg",className:"h-auto",onChange:this.handlechange})),d.a.createElement("button",{className:"mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn",type:"submit"}," submit"),d.a.createElement("div",{className:"my-2 d-flex justify-content-between align-items-center"},d.a.createElement("div",{className:"form-check"},d.a.createElement("label",{className:"form-check-label text-muted"},d.a.createElement("input",{type:"checkbox",className:"form-check-input"}),d.a.createElement("i",{className:"input-helper"}),"Keep me signed in")),d.a.createElement("a",{href:"!#",onClick:function(e){return e.preventDefault()},className:"auth-link text-muted"},"Forgot password?")),d.a.createElement("div",{className:"text-center mt-4 font-weight-light"},"Don't have an account? ",d.a.createElement(u.b,{to:"/user-pages/register-1",className:"text-primary"},"Create"))))))))}}]),a}(m.Component);a.default=p}}]);
//# sourceMappingURL=7.2066e9a3.chunk.js.map