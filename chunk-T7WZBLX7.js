import{a as N,b as R,c as q,d as A,e as j,f as z}from"./chunk-4OCG4LV5.js";import{Aa as V,Ba as w,Ca as T,D as f,E as k,Ea as C,Fa as F,Ga as B,Ha as S,Ja as O,L as a,M as d,Na as g,Pa as D,Q as u,R as x,Ta as $,Ua as L,W as p,Ya as Y,_a as H,da as P,ga as v,ia as h,ka as b,la as E,ma as y,na as s,oa as r,qa as I,ra as _,sa as l,za as m}from"./chunk-47Z3RRFM.js";var Q=()=>["/home"],J=(()=>{let i=class i{constructor(){this.checklist=x.required(),this.items=x.required(),this.addItem=u(),this.resetChecklist=u(),this.itemsNum=g(()=>this.items().length),this.checkedNum=g(()=>this.items().filter(c=>c.checked).length)}};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=k({type:i,selectors:[["app-checklist-header"]],inputs:{checklist:[1,"checklist"],items:[1,"items"]},outputs:{addItem:"addItem",resetChecklist:"resetChecklist"},standalone:!0,features:[C],decls:11,vars:5,consts:[[1,"back-btn"],[3,"routerLink"],[3,"click"]],template:function(e,t){e&1&&(s(0,"header")(1,"button",0)(2,"a",1),m(3,"Back"),r()(),s(4,"h1"),m(5),r(),s(6,"div")(7,"button",2),_("click",function(){return t.resetChecklist.emit(t.checklist().id)}),m(8,"Reset"),r(),s(9,"button",2),_("click",function(){return t.addItem.emit()}),m(10,"Add item"),r()()()),e&2&&(p(2),h("routerLink",F(4,Q)),p(3),T(" ",t.checklist().title," [",t.checkedNum(),"/",t.itemsNum(),"] "))},dependencies:[H],styles:["h1[_ngcontent-%COMP%] + div[_ngcontent-%COMP%]{min-width:fit-content}h1[_ngcontent-%COMP%] + div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:.5rem}h1[_ngcontent-%COMP%] + div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-of-type{margin-right:0}.back-btn[_ngcontent-%COMP%]{padding:10px 0}.back-btn[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:10px 20px;text-decoration:none;color:var(--color-btn-600)}.back-btn[_ngcontent-%COMP%]:hover{color:var(--color-btn-700)}h1[_ngcontent-%COMP%]{padding:0 1rem;margin:0}"]});let n=i;return n})();var U=(n,i)=>i.id,W=n=>({checked:n});function X(n,i){if(n&1&&(s(0,"span"),m(1),S(2,"date"),r()),n&2){let o=l().$implicit;p(),w(" - ",O(2,1,o.closedDate,"dd/MM/YYYY HH:mm")," ")}}function Z(n,i){if(n&1){let o=I();s(0,"li",0)(1,"div",1)(2,"p"),m(3),r(),s(4,"p",2)(5,"span"),m(6),S(7,"date"),r(),v(8,X,3,4,"span"),r()(),s(9,"div")(10,"button",3),_("click",function(){let e=a(o).$implicit,t=l();return d(t.toggle.emit(e.id))}),m(11,"Toggle"),r(),s(12,"button",3),_("click",function(){let e=a(o).$implicit,t=l();return d(t.edit.emit(e))}),m(13,"Edit"),r(),s(14,"button",3),_("click",function(){let e=a(o).$implicit,t=l();return d(t.delete.emit(e.id))}),m(15,"Delete"),r()()()}if(n&2){let o=i.$implicit;h("ngClass",B(7,W,o.checked)),p(3),V(o.title),p(3),w(" ",O(7,4,o.createdDate,"dd/MM/YYYY HH:mm")," "),p(2),b(o.closedDate?8:-1)}}function ee(n,i){n&1&&(s(0,"div")(1,"h2"),m(2,"Add an item"),r(),s(3,"p"),m(4,"Click the add button to add your first item to this quicklist"),r()())}var K=(()=>{let i=class i{constructor(){this.checklistItems=x.required(),this.toggle=u(),this.edit=u(),this.delete=u()}};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=k({type:i,selectors:[["app-checklist-item-list"]],inputs:{checklistItems:[1,"checklistItems"]},outputs:{toggle:"toggle",edit:"edit",delete:"delete"},standalone:!0,features:[C],decls:5,vars:1,consts:[[3,"ngClass"],[1,"item-content"],[1,"date-text"],[3,"click"]],template:function(e,t){e&1&&(s(0,"section")(1,"ul"),E(2,Z,16,9,"li",0,U,!1,ee,5,0,"div"),r()()),e&2&&(p(2),y(t.checklistItems()))},dependencies:[$,L],styles:["section[_ngcontent-%COMP%]{margin:1rem}ul[_ngcontent-%COMP%]{list-style:none;padding:0;display:flex;flex-direction:column;gap:1rem}li[_ngcontent-%COMP%]{background:var(--color-light);border-radius:15px;padding:1rem;display:flex;justify-content:space-between;align-items:center}li[_ngcontent-%COMP%]:has(a:hover){background-color:#f1f1f187;box-shadow:0 0 7px 1px #c5c5c52e}li.checked[_ngcontent-%COMP%]{background:#8bf3b580;box-shadow:0 0 7px #b5b5b53d}.item-content[_ngcontent-%COMP%]{font-size:1.5rem;color:var(--color-dark);padding-right:1rem;width:100%;text-decoration:none}.item-content[_ngcontent-%COMP%] + div[_ngcontent-%COMP%]{min-width:fit-content}.item-content[_ngcontent-%COMP%] + div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:.5rem}.item-content[_ngcontent-%COMP%] + div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-of-type{margin-right:0}p[_ngcontent-%COMP%]{margin:0;margin-bottom:.5rem}p.date-text[_ngcontent-%COMP%]{margin-bottom:0;font-size:1rem;color:var(--color-dark-secondary)}"]});let n=i;return n})();function te(n,i){if(n&1){let o=I();s(0,"app-checklist-header",1),_("addItem",function(){a(o);let e=l();return d(e.checklistItemsBeingEdited.set({}))})("resetChecklist",function(e){a(o);let t=l();return d(t.checklistItemService.resetToggles$.next(e))}),r(),s(1,"app-checklist-item-list",2),_("toggle",function(e){a(o);let t=l();return d(t.checklistItemService.toggle$.next(e))})("edit",function(e){a(o);let t=l();return d(t.checklistItemsBeingEdited.set(e))})("delete",function(e){a(o);let t=l();return d(t.checklistItemService.remove$.next(e))}),r()}if(n&2){let o=l();h("checklist",i)("items",o.items()),p(),h("checklistItems",o.items())}}function ie(n,i){if(n&1){let o=I();s(0,"app-form-modal",3),_("save",function(){let e;a(o);let t=l();return d((e=t.checklistItemsBeingEdited())!=null&&e.id?t.checklistItemService.edit$.next({id:t.checklistItemsBeingEdited().id,data:t.checklistItemForm.getRawValue()}):t.checklistItemService.add$.next({item:t.checklistItemForm.getRawValue(),checklistId:(e=t.checklist())==null?null:e.id}))})("close",function(){a(o);let e=l();return d(e.checklistItemsBeingEdited.set(null))}),r()}if(n&2){let o=l();h("formGroup",o.checklistItemForm)}}var Ie=(()=>{let i=class i{constructor(){this.checklistService=f(z),this.checklistItemService=f(j),this.route=f(Y),this.formBuilder=f(R),this.params=A(this.route.paramMap),this.checklistItemsBeingEdited=P(null),this.checklist=g(()=>this.checklistService.checklists().find(c=>c.id===this.params()?.get("id"))),this.checklistItemForm=this.formBuilder.nonNullable.group({title:[""]}),this.items=g(()=>this.checklistItemService.checklistItems().filter(c=>c.checklistId===this.params()?.get("id"))),D(()=>{let c=this.checklistItemsBeingEdited();c?this.checklistItemForm.patchValue({title:c.title}):this.checklistItemForm.reset()})}};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=k({type:i,selectors:[["app-checklist"]],standalone:!0,features:[C],decls:3,vars:2,consts:[[3,"isOpen"],[3,"addItem","resetChecklist","checklist","items"],[3,"toggle","edit","delete","checklistItems"],["title","Create Item",3,"save","close","formGroup"]],template:function(e,t){if(e&1&&(v(0,te,2,3),s(1,"app-modal",0),v(2,ie,1,1,"ng-template"),r()),e&2){let M;b((M=t.checklist())?0:-1,M),p(),h("isOpen",!!t.checklistItemsBeingEdited())}},dependencies:[J,N,q,K]});let n=i;return n})();export{Ie as default};
