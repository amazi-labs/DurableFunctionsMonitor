(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{108:function(e,t,n){e.exports=n(164)},115:function(e,t,n){},117:function(e,t,n){e.exports=n.p+"static/media/logo.9b5d7869.svg"},118:function(e,t,n){},120:function(e,t,n){},143:function(e,t,n){},145:function(e,t,n){},164:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(12),o=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function i(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}n(113),n(115);var l,s=n(7),c=n(27),u=n(101),m=n(69),h=n(218),p=n(210),d=n(220),f=n(199),g=n(226),y=n(216),E=(n(118),n(200)),v=n(165),_=n(230),b=n(227),C=n(201),O=n(202),P=n(203),T=n(204),w=n(225),N=n(208),D=n(209),S=n(95),k=n.n(S),F=n(6),R=n(228),M=n(196),x=n(94),I=n.n(x),W=n(90),V=n.n(W),B=(n(120),function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s.b(t,e),t.prototype.render=function(){var e=this.props.state;return r.createElement(R.a,{className:"error-snackbar",anchorOrigin:{vertical:"top",horizontal:"right"},open:!!e.errorMessage,autoHideDuration:6e3,onClose:this.handleClose},r.createElement(M.a,{className:"error-snackbar-content",message:r.createElement("span",null,r.createElement(V.a,{className:"error-icon"}),e.errorMessage),action:[r.createElement(E.a,{key:"close","aria-label":"Close",color:"inherit",onClick:this.handleClose},r.createElement(I.a,null))]}))},t.prototype.handleClose=function(){this.props.state.errorMessage=""},s.a([F.d.bound],t.prototype,"handleClose",null),t=s.a([c.a],t)}(r.Component)),j=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s.b(t,e),t.prototype.render=function(){var e=this.props.state;return r.createElement("div",null,r.createElement(E.a,{edge:"start",color:"inherit"},r.createElement(k.a,{onClick:function(t){return e.menuAnchorElement=t.currentTarget}})),r.createElement(v.a,{anchorEl:e.menuAnchorElement,keepMounted:!0,open:!!e.menuAnchorElement,onClose:function(){return e.menuAnchorElement=void 0}},r.createElement(_.a,{onClick:function(){return e.showConnectionParamsDialog()}},"Manage Storage Connection Settings")),r.createElement(b.a,{open:e.connectionParamsDialogOpen,onClose:function(){return e.connectionParamsDialogOpen=!1}},r.createElement(C.a,null,"Manage Storage Connection Setings"),r.createElement(O.a,null,e.inProgress?r.createElement(P.a,null):r.createElement(d.a,{height:4}),r.createElement(T.a,null,"The below values will be saved to host.json and local.settings.json respectively."),r.createElement(w.a,{autoFocus:!0,margin:"dense",label:"Hub Name",fullWidth:!0,disabled:e.inProgress,value:e.hubName,onChange:function(t){return e.hubName=t.target.value}}),r.createElement(w.a,{autoFocus:!0,margin:"dense",label:"Azure Storage Connection String",fullWidth:!0,disabled:e.inProgress,value:e.connectionString,onChange:function(t){return e.connectionString=t.target.value}}),r.createElement(B,{state:e})),r.createElement(N.a,null,r.createElement(D.a,{onClick:function(){return e.connectionParamsDialogOpen=!1},color:"primary"},"Cancel"),r.createElement(D.a,{onClick:function(){return e.saveConnectionParams()},disabled:!e.hubName||!e.connectionString||e.inProgress,color:"secondary"},"Save"))))},t=s.a([c.a],t)}(r.Component),z=n(206),L=n(234),A=n(222),J=n(223),K=n(207),U=n(211),q=n(212),H=n(213),Y=n(214),$=n(231),Q=n(215),Z=n(229),G=n(63),X=n.n(G),ee=(n(143),function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._columns=["instanceId","name","createdTime","lastUpdatedTime","runtimeStatus","input","output"],t}return s.b(t,e),t.prototype.componentDidMount=function(){var e=this;this.props.state.loadOrchestrations(),document.addEventListener("scroll",function(t){var n=t.target.scrollingElement;if(n){n.scrollHeight-window.innerHeight-n.scrollTop<100&&e.props.state.loadOrchestrations()}})},t.prototype.render=function(){var e=this,t=this.props.state;return r.createElement("div",null,t.inProgress?r.createElement(P.a,null):r.createElement(d.a,{height:4}),r.createElement(p.a,{variant:"dense",className:"top-toolbar"},r.createElement(w.a,{label:"From \xa0\xa0 (UTC)",type:"datetime-local",InputLabelProps:{shrink:!0},value:this.formatDateTime(t.timeFrom),onChange:function(n){t.timeFrom=e.getDateTimeValue(n)},onBlur:function(){return t.applyTimeFrom()},onKeyPress:this.handleKeyPress}),r.createElement(d.a,{width:20}),r.createElement(z.a,null,r.createElement(L.a,{className:"till-label",htmlFor:"till-checkbox",shrink:!0},"Till"),r.createElement(A.a,{id:"till-checkbox",className:"till-checkbox",checked:t.timeTillEnabled,onChange:function(e){return t.timeTillEnabled=e.target.checked}})),r.createElement(w.a,{className:"till-input",label:"(UTC)",placeholder:"[Now]",InputLabelProps:{shrink:!0},type:t.timeTillEnabled?"datetime-local":"text",disabled:!t.timeTillEnabled,value:t.timeTillEnabled?this.formatDateTime(t.timeTill):"",onChange:function(n){t.timeTill=e.getDateTimeValue(n)},onBlur:function(){return t.applyTimeTill()},onKeyPress:this.handleKeyPress}),r.createElement(d.a,{width:20}),r.createElement(z.a,null,r.createElement(L.a,{htmlFor:"filtered-column-select"},"Filtered Column"),r.createElement(J.a,{className:"toolbar-select",value:t.filteredColumn,onChange:function(e){return t.filteredColumn=e.target.value},inputProps:{id:"filtered-column-select"}},r.createElement(_.a,{value:"0"},"[Not Selected]"),this._columns.map(function(e){return r.createElement(_.a,{key:e,value:e},e)}))),r.createElement(d.a,{width:20}),r.createElement(z.a,null,r.createElement(L.a,{htmlFor:"filter-operator-select"},"Filter Operator"),r.createElement(J.a,{className:"toolbar-select",value:t.filterOperator,onChange:function(e){return t.filterOperator=e.target.value},inputProps:{id:"filter-operator-select"}},r.createElement(_.a,{value:0},"Equals"),r.createElement(_.a,{value:1},"Starts With"),r.createElement(_.a,{value:2},"Contains"))),r.createElement(d.a,{width:20}),r.createElement(w.a,{label:"Filter Value",InputLabelProps:{shrink:!0},placeholder:"[some text or 'null']",disabled:"0"===t.filteredColumn,value:t.filterValue,onChange:function(e){return t.filterValue=e.target.value},onBlur:function(){return t.applyFilterValue()},onKeyPress:this.handleKeyPress}),r.createElement(d.a,{width:10}),r.createElement(f.a,{style:{flex:1}}),r.createElement(z.a,null,r.createElement(L.a,{htmlFor:"auto-refresh-select"},"Auto-refresh"),r.createElement(J.a,{className:"toolbar-select",inputProps:{id:"auto-refresh-select"},value:t.autoRefresh,onChange:function(e){return t.autoRefresh=e.target.value}},r.createElement(_.a,{value:0},"Never"),r.createElement(_.a,{value:1},"Every 1 sec."),r.createElement(_.a,{value:5},"Every 5 sec."),r.createElement(_.a,{value:10},"Every 10 sec."))),r.createElement(d.a,{width:20}),r.createElement(D.a,{variant:"outlined",color:"default",size:"large",onClick:function(){return t.reloadOrchestrations()}},r.createElement(X.a,null))),r.createElement(K.a,{className:"items-count-label"},t.orchestrations.length," items shown"),t.orchestrations.length?this.renderTable(t):this.renderEmptyTable(),t.inProgress&&t.orchestrations.length?r.createElement(P.a,null):r.createElement(d.a,{height:4}),r.createElement(p.a,{variant:"dense"}),r.createElement(B,{state:this.props.state}))},t.prototype.renderEmptyTable=function(){return r.createElement(f.a,{variant:"h5",className:"empty-table-placeholder"},"This list is empty")},t.prototype.renderTable=function(e){return r.createElement(U.a,{size:"small"},r.createElement(q.a,null,r.createElement(H.a,null,this._columns.map(function(t){return r.createElement(Y.a,{key:t},r.createElement($.a,{active:e.orderBy===t,direction:e.orderByDirection,onClick:function(){return e.orderBy=t}},t))}))),r.createElement(Q.a,null,e.orchestrations.map(function(e){var t={verticalAlign:"top"};return r.createElement(H.a,{key:e.instanceId,className:"runtime-status-"+e.runtimeStatus.toLowerCase()},r.createElement(Y.a,{className:"instance-id-cell",style:t},r.createElement(y.a,{href:"/api/monitor/orchestrations/"+e.instanceId,target:"_blank"},e.instanceId)),r.createElement(Y.a,{className:"name-cell",style:t},e.name),r.createElement(Y.a,{className:"datetime-cell",style:t},e.createdTime),r.createElement(Y.a,{className:"datetime-cell",style:t},e.lastUpdatedTime),r.createElement(Y.a,{style:t},e.runtimeStatus),r.createElement(Y.a,{className:"long-text-cell",style:t},r.createElement(Z.a,{className:"long-text-cell-input",multiline:!0,fullWidth:!0,rowsMax:5,readOnly:!0,value:JSON.stringify(e.input)})),r.createElement(Y.a,{className:"long-text-cell",style:t},r.createElement(Z.a,{className:"long-text-cell-input",multiline:!0,fullWidth:!0,rowsMax:5,readOnly:!0,value:JSON.stringify(e.output)})))})))},t.prototype.handleKeyPress=function(e){"Enter"===e.key&&(e.preventDefault(),this.props.state.reloadOrchestrations())},t.prototype.getDateTimeValue=function(e){return new Date(e.target.value.slice(0,16)+":00Z")},t.prototype.formatDateTime=function(e){return e.toISOString().slice(0,16)},t.prototype.toJsonString=function(e){if(!e)return"null";var t=JSON.stringify(e);return t.length>256?t.slice(0,256)+"...":t},s.a([F.d.bound],t.prototype,"handleKeyPress",null),t=s.a([c.a],t)}(r.Component)),te=n(217),ne=(n(145),function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._columns=["Timestamp","EventType","Name","ScheduledTime","Result","Details"],t}return s.b(t,e),t.prototype.render=function(){var e=this.props.state;return r.createElement("div",null,e.inProgress?r.createElement(P.a,null):r.createElement(d.a,{height:4}),r.createElement(p.a,{variant:"dense",className:"top-toolbar"},r.createElement(D.a,{variant:"outlined",color:"primary",size:"large",onClick:function(){return e.rewindConfirmationOpen=!0}},"Rewind"),r.createElement(d.a,{width:20}),r.createElement(D.a,{variant:"outlined",color:"primary",size:"large",onClick:function(){return e.terminateConfirmationOpen=!0}},"Terminate"),r.createElement(d.a,{width:20}),r.createElement(D.a,{variant:"outlined",color:"primary",size:"large",onClick:function(){return e.raiseEventDialogOpen=!0}},"Raise Event"),r.createElement(f.a,{style:{flex:1}}),r.createElement(z.a,null,r.createElement(L.a,{htmlFor:"auto-refresh-select"},"Auto-refresh"),r.createElement(J.a,{className:"toolbar-select",value:e.autoRefresh,onChange:function(t){return e.autoRefresh=t.target.value},inputProps:{id:"auto-refresh-select"}},r.createElement(_.a,{value:0},"Never"),r.createElement(_.a,{value:1},"Every 1 sec."),r.createElement(_.a,{value:5},"Every 5 sec."),r.createElement(_.a,{value:10},"Every 10 sec."))),r.createElement(d.a,{width:20}),r.createElement(D.a,{variant:"outlined",color:"default",size:"large",onClick:function(){return e.loadDetails()}},r.createElement(X.a,null))),this.renderDetails(e.details),r.createElement(K.a,{className:"history-events-count-label"},"historyEvents: ",e.details.historyEvents?e.details.historyEvents.length:0," items"),e.details.historyEvents&&e.details.historyEvents.length?this.renderTable(e.details.historyEvents):this.renderEmptyTable(),e.inProgress?r.createElement(P.a,null):r.createElement(d.a,{height:4}),r.createElement(d.a,{height:10}),r.createElement(B,{state:this.props.state}),this.renderDialogs(e))},t.prototype.renderDialogs=function(e){return r.createElement("div",null,r.createElement(b.a,{open:e.rewindConfirmationOpen,onClose:function(){return e.rewindConfirmationOpen=!1}},r.createElement(C.a,null,"Confirm Rewind"),r.createElement(O.a,null,r.createElement(T.a,null,"You're about to rewind orchestration '",e.orchestrationId,"'. Are you sure?")),r.createElement(N.a,null,r.createElement(D.a,{onClick:function(){return e.rewindConfirmationOpen=!1},color:"primary",autoFocus:!0},"Cancel"),r.createElement(D.a,{onClick:function(){return e.rewind()},color:"secondary"},"Yes, rewind"))),r.createElement(b.a,{open:e.terminateConfirmationOpen,onClose:function(){return e.terminateConfirmationOpen=!1}},r.createElement(C.a,null,"Confirm Terminate"),r.createElement(O.a,null,r.createElement(T.a,null,"You're about to terminate orchestration '",e.orchestrationId,"'. This operation cannot be undone. Are you sure?")),r.createElement(N.a,null,r.createElement(D.a,{onClick:function(){return e.terminateConfirmationOpen=!1},color:"primary",autoFocus:!0},"Cancel"),r.createElement(D.a,{onClick:function(){return e.terminate()},color:"secondary"},"Yes, terminate"))),r.createElement(b.a,{open:e.raiseEventDialogOpen,onClose:function(){return e.raiseEventDialogOpen=!1}},r.createElement(C.a,null,"Raise Event"),r.createElement(O.a,null,r.createElement(T.a,null,"Provide event name and some additional data."),r.createElement(w.a,{autoFocus:!0,margin:"dense",label:"Event Name",fullWidth:!0,value:e.eventName,onChange:function(t){return e.eventName=t.target.value}}),r.createElement(w.a,{margin:"dense",label:"Event Data (JSON)",fullWidth:!0,multiline:!0,rows:7,value:e.eventData,onChange:function(t){return e.eventData=t.target.value}})),r.createElement(N.a,null,r.createElement(D.a,{onClick:function(){return e.raiseEventDialogOpen=!1},color:"primary"},"Cancel"),r.createElement(D.a,{onClick:function(){return e.raiseEvent()},disabled:!e.eventName,color:"secondary"},"Raise"))))},t.prototype.renderDetails=function(e){return r.createElement(te.a,{container:!0,className:"grid-container"},r.createElement(te.a,{item:!0,xs:12,sm:6,md:3,zeroMinWidth:!0,className:"grid-item"},r.createElement(w.a,{label:"name",value:e.name,margin:"normal",InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0})),r.createElement(te.a,{item:!0,xs:12,sm:6,md:3,zeroMinWidth:!0,className:"grid-item"},r.createElement(w.a,{label:"createdTime",value:e.createdTime,margin:"normal",InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0})),r.createElement(te.a,{item:!0,xs:12,sm:6,md:3,zeroMinWidth:!0,className:"grid-item"},r.createElement(w.a,{label:"runtimeStatus",value:e.runtimeStatus,margin:"normal",InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0,className:e.runtimeStatus?"runtime-status-"+e.runtimeStatus.toLowerCase():""})),r.createElement(te.a,{item:!0,xs:12,sm:6,md:3,zeroMinWidth:!0,className:"grid-item"},r.createElement(w.a,{label:"lastUpdatedTime",value:e.lastUpdatedTime,margin:"normal",InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0})),r.createElement(te.a,{item:!0,xs:12,zeroMinWidth:!0,className:"grid-item"},r.createElement(w.a,{label:"input",value:JSON.stringify(e.input),margin:"normal",InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0,multiline:!0,rowsMax:5})),r.createElement(te.a,{item:!0,xs:12,zeroMinWidth:!0,className:"grid-item"},r.createElement(w.a,{label:"output",value:JSON.stringify(e.output),margin:"normal",InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0,multiline:!0,rowsMax:5})))},t.prototype.renderEmptyTable=function(){return r.createElement(f.a,{variant:"h5",className:"empty-table-placeholder"},"This list is empty")},t.prototype.renderTable=function(e){return r.createElement(U.a,{size:"small"},r.createElement(q.a,null,r.createElement(H.a,null,this._columns.map(function(e){return r.createElement(Y.a,{key:e},e)}))),r.createElement(Q.a,null,e.map(function(e,t){var n={verticalAlign:"top"};return r.createElement(H.a,{key:t},r.createElement(Y.a,{style:n},e.Timestamp),r.createElement(Y.a,{className:"name-cell",style:n},e.EventType),r.createElement(Y.a,{style:n},e.Name?e.Name:e.FunctionName),r.createElement(Y.a,{style:n},e.ScheduledTime),r.createElement(Y.a,{className:"long-text-cell",style:n},r.createElement(Z.a,{className:"long-text-cell-input",multiline:!0,fullWidth:!0,rowsMax:5,readOnly:!0,value:JSON.stringify(e.Result)})),r.createElement(Y.a,{className:"long-text-cell",style:n},r.createElement(Z.a,{className:"long-text-cell-input",multiline:!0,fullWidth:!0,rowsMax:5,readOnly:!0,value:e.Details})))})))},t=s.a([c.a],t)}(r.Component)),re=n(117),ae=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s.b(t,e),t.prototype.render=function(){var e=this.props.state;return r.createElement(u.a,{basename:"/api/monitor"},r.createElement(h.a,{position:"static",color:"default",className:"app-bar"},r.createElement(p.a,null,r.createElement("img",{src:re,width:"30px"}),r.createElement(d.a,{width:5}),r.createElement(f.a,{variant:"h6",color:"inherit",className:"title-typography"},"Durable Functions Monitor"),r.createElement(g.a,{color:"inherit"},r.createElement(y.a,{color:"inherit",href:"/api/monitor"},"/ orchestrations"),r.createElement(f.a,{color:"inherit"},e.orchestrationDetailsState.orchestrationId)),r.createElement(d.a,{width:5}),r.createElement(f.a,{style:{flex:1}}),!e.orchestrationDetailsState.orchestrationId&&r.createElement(j,{state:e.mainMenuState}))),r.createElement(m.a,{path:"/",exact:!0,component:function(){return r.createElement(ee,{state:e.orchestrationsState})}}),r.createElement(m.a,{path:"/orchestrations/:id",component:function(t){return e.orchestrationDetailsState.orchestrationId=t.match.params.id,r.createElement(ne,{state:e.orchestrationDetailsState})}}))},t=s.a([c.a],t)}(r.Component),oe=n(30),ie=n.n(oe),le=function(){function e(){this.errorMessage=""}return s.a([F.l],e.prototype,"errorMessage",void 0),e}(),se=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.connectionParamsDialogOpen=!1,t._inProgress=!1,t}return s.b(t,e),Object.defineProperty(t.prototype,"inProgress",{get:function(){return this._inProgress},enumerable:!0,configurable:!0}),t.prototype.showConnectionParamsDialog=function(){var e=this;this.menuAnchorElement=void 0,this.connectionParamsDialogOpen=!0;this._inProgress=!0,ie.a.get("http://localhost:7072/api/manage-connection").then(function(t){e.connectionString=t.data.connectionString,e._oldConnectionString=e.connectionString,e.hubName=t.data.hubName},function(t){e.errorMessage="Load failed: "+t.message+"."+(t.response?t.response.data:"")+" "}).finally(function(){e._inProgress=!1})},t.prototype.saveConnectionParams=function(){var e=this;this._inProgress=!0,ie.a.put("http://localhost:7072/api/manage-connection",{connectionString:this.connectionString,hubName:this.hubName}).then(function(){e.connectionParamsDialogOpen=!1,e._oldConnectionString!==e.connectionString?alert("You've changed the Connection String, and the new value cannot currently be picked up automatically. Please, restart the Function Host."):location.reload()},function(t){e.errorMessage="Save failed: "+t.message+"."+(t.response?t.response.data:"")+" "}).finally(function(){e._inProgress=!1})},s.a([F.l],t.prototype,"menuAnchorElement",void 0),s.a([F.l],t.prototype,"hubName",void 0),s.a([F.l],t.prototype,"connectionString",void 0),s.a([F.l],t.prototype,"connectionParamsDialogOpen",void 0),s.a([F.e],t.prototype,"inProgress",null),s.a([F.l],t.prototype,"_inProgress",void 0),t}(le);!function(e){e[e.Equals=0]="Equals",e[e.StartsWith=1]="StartsWith",e[e.Contains=2]="Contains"}(l||(l={}));var ce=function(e){function t(){var t=e.call(this)||this;t._inProgress=!1,t._orchestrations=[],t._orderByDirection="asc",t._orderBy="",t._autoRefresh=0,t._filterValue="",t._filterOperator=l.Equals,t._filteredColumn="0",t._noMorePagesToLoad=!1,t._pageSize=50,t._oldFilterValue="";var n=new Date;return n.setDate(n.getDate()-1),t._timeFrom=n,t}return s.b(t,e),Object.defineProperty(t.prototype,"inProgress",{get:function(){return this._inProgress},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"orchestrations",{get:function(){return this._orchestrations},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"autoRefresh",{get:function(){return this._autoRefresh},set:function(e){this._autoRefresh=e,this.loadOrchestrations(!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"timeFrom",{get:function(){return this._timeFrom},set:function(e){this._timeFrom=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"timeTill",{get:function(){return this._timeTill?this._timeTill:new Date},set:function(e){this._timeTill=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"timeTillEnabled",{get:function(){return!!this._timeTill},set:function(e){this._timeTill=e?new Date:void 0,e||this.reloadOrchestrations()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"orderByDirection",{get:function(){return this._orderByDirection},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"orderBy",{get:function(){return this._orderBy},set:function(e){this._orderBy!==e?this._orderBy=e:this._orderByDirection="desc"===this._orderByDirection?"asc":"desc",this.reloadOrchestrations()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterValue",{get:function(){return this._filterValue},set:function(e){this._filterValue=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterOperator",{get:function(){return this._filterOperator},set:function(e){this._filterOperator=e,this._filterValue&&"0"!==this._filteredColumn&&this.reloadOrchestrations()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filteredColumn",{get:function(){return this._filteredColumn},set:function(e){this._filteredColumn=e,this._filterValue&&("0"===this._filteredColumn&&(this._filterValue=""),this.reloadOrchestrations())},enumerable:!0,configurable:!0}),t.prototype.applyTimeFrom=function(){this._oldTimeFrom!==this._timeFrom&&this.reloadOrchestrations()},t.prototype.applyTimeTill=function(){this._oldTimeTill!==this._timeTill&&this.reloadOrchestrations()},t.prototype.applyFilterValue=function(){this._oldFilterValue!==this._filterValue&&this.reloadOrchestrations()},t.prototype.reloadOrchestrations=function(){this._orchestrations=[],this._noMorePagesToLoad=!1,this.loadOrchestrations(),this._oldFilterValue=this._filterValue,this._oldTimeFrom=this._timeFrom,this._oldTimeTill=this._timeTill},t.prototype.loadOrchestrations=function(e){var t=this;if(void 0===e&&(e=!1),!(this.inProgress||this._noMorePagesToLoad&&!this._autoRefresh)){this._inProgress=!0;var n=e?0:this._orchestrations.length,r=this._timeTill?this._timeTill:new Date,a="&$filter=createdTime ge '"+this._timeFrom.toISOString()+"' and createdTime le '"+r.toISOString()+"'";if(this._filterValue&&"0"!==this._filteredColumn)switch(a+=" and ",this._filterOperator){case l.Equals:a+=this._filteredColumn+" eq '"+this._filterValue+"'";break;case l.StartsWith:a+="startswith("+this._filteredColumn+", '"+this._filterValue+"')";break;case l.Contains:a+="contains("+this._filteredColumn+", '"+this._filterValue+"')"}var o=this._orderBy?"&$orderby="+this._orderBy+" "+this.orderByDirection:"",i="http://localhost:7072/api/orchestrations?$top="+this._pageSize+"&$skip="+n+a+o;ie.a.get(i).then(function(n){var r;n.data.length?e?t._orchestrations=n.data:(r=t._orchestrations).push.apply(r,n.data):t._noMorePagesToLoad=!0,t._autoRefresh&&(t._autoRefreshToken&&clearTimeout(t._autoRefreshToken),t._autoRefreshToken=setTimeout(function(){return t.loadOrchestrations(!0)},1e3*t._autoRefresh))},function(e){t._autoRefresh=0,t.errorMessage="Load failed: "+e.message+"."+(e.response?e.response.data:"")+" "}).finally(function(){t._inProgress=!1})}},s.a([F.e],t.prototype,"inProgress",null),s.a([F.e],t.prototype,"orchestrations",null),s.a([F.e],t.prototype,"autoRefresh",null),s.a([F.e],t.prototype,"timeFrom",null),s.a([F.e],t.prototype,"timeTill",null),s.a([F.e],t.prototype,"timeTillEnabled",null),s.a([F.e],t.prototype,"orderByDirection",null),s.a([F.e],t.prototype,"orderBy",null),s.a([F.e],t.prototype,"filterValue",null),s.a([F.e],t.prototype,"filterOperator",null),s.a([F.e],t.prototype,"filteredColumn",null),s.a([F.l],t.prototype,"_inProgress",void 0),s.a([F.l],t.prototype,"_orchestrations",void 0),s.a([F.l],t.prototype,"_orderByDirection",void 0),s.a([F.l],t.prototype,"_orderBy",void 0),s.a([F.l],t.prototype,"_autoRefresh",void 0),s.a([F.l],t.prototype,"_timeFrom",void 0),s.a([F.l],t.prototype,"_timeTill",void 0),s.a([F.l],t.prototype,"_filterValue",void 0),s.a([F.l],t.prototype,"_filterOperator",void 0),s.a([F.l],t.prototype,"_filteredColumn",void 0),t}(le),ue=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.details={},t.rewindConfirmationOpen=!1,t.terminateConfirmationOpen=!1,t._inProgress=!1,t._sendEventDialogOpen=!1,t._autoRefresh=0,t}return s.b(t,e),Object.defineProperty(t.prototype,"orchestrationId",{get:function(){return this._orchestrationId},set:function(e){this._orchestrationId=e,this.loadDetails()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inProgress",{get:function(){return this._inProgress},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"autoRefresh",{get:function(){return this._autoRefresh},set:function(e){this._autoRefresh=e,this.loadDetails()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"raiseEventDialogOpen",{get:function(){return this._sendEventDialogOpen},set:function(e){this._sendEventDialogOpen=e,this.eventName="",this.eventData=""},enumerable:!0,configurable:!0}),t.prototype.rewind=function(){var e=this;this.rewindConfirmationOpen=!1;var t="http://localhost:7072/api/orchestrations('"+this._orchestrationId+"')/rewind";this._inProgress=!0,ie.a.post(t).then(function(){e.loadDetails()},function(t){e.errorMessage="Failed to rewind: "+t.message+"."+(t.response?t.response.data:"")+" "}).finally(function(){e._inProgress=!1})},t.prototype.terminate=function(){var e=this;this.terminateConfirmationOpen=!1;var t="http://localhost:7072/api/orchestrations('"+this._orchestrationId+"')/terminate";this._inProgress=!0,ie.a.post(t).then(function(){e.loadDetails()},function(t){e.errorMessage="Failed to terminate: "+t.message+"."+(t.response?t.response.data:"")+" "}).finally(function(){e._inProgress=!1})},t.prototype.raiseEvent=function(){var e=this,t="http://localhost:7072/api/orchestrations('"+this._orchestrationId+"')/raise-event",n={name:this.eventName,data:null};try{n.data=JSON.parse(this.eventData)}catch(r){return void(this.errorMessage="Event Data failed to parse: "+r.message)}finally{this.raiseEventDialogOpen=!1}this._inProgress=!0,ie.a.post(t,n).then(function(){e.loadDetails()},function(t){e.errorMessage="Failed to raise an event: "+t.message+"."+(t.response?t.response.data:"")+" "}).finally(function(){e._inProgress=!1})},t.prototype.loadDetails=function(){var e=this;if(!this.inProgress){this._inProgress=!0;var t="http://localhost:7072/api/orchestrations('"+this._orchestrationId+"')";ie.a.get(t).then(function(t){if(!t.data)return e.errorMessage="Orchestration '"+e._orchestrationId+"' not found.",void(e._autoRefresh=0);e.details=t.data,e._autoRefresh&&(e._autoRefreshToken&&clearTimeout(e._autoRefreshToken),e._autoRefreshToken=setTimeout(function(){return e.loadDetails()},1e3*e._autoRefresh))},function(t){e._autoRefresh=0,e.errorMessage="Load failed: "+t.message+"."+(t.response?t.response.data:"")+" "}).finally(function(){e._inProgress=!1})}},s.a([F.e],t.prototype,"orchestrationId",null),s.a([F.e],t.prototype,"inProgress",null),s.a([F.e],t.prototype,"autoRefresh",null),s.a([F.e],t.prototype,"raiseEventDialogOpen",null),s.a([F.l],t.prototype,"rewindConfirmationOpen",void 0),s.a([F.l],t.prototype,"terminateConfirmationOpen",void 0),s.a([F.l],t.prototype,"eventName",void 0),s.a([F.l],t.prototype,"eventData",void 0),s.a([F.l],t.prototype,"_orchestrationId",void 0),s.a([F.l],t.prototype,"_inProgress",void 0),s.a([F.l],t.prototype,"_sendEventDialogOpen",void 0),s.a([F.l],t.prototype,"_autoRefresh",void 0),t}(le),me=new(function(){return function(){this.mainMenuState=new se,this.orchestrationsState=new ce,this.orchestrationDetailsState=new ue}}());a.render(r.createElement(ae,{state:me}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/api/monitor",window.location.toString()).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="/api/monitor/service-worker.js";o?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):i(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):i(e)})}}()}},[[108,2,1]]]);
//# sourceMappingURL=main.0bc040a1.chunk.js.map