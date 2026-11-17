/* HIMA continuity layer: preserve portal, page and in-progress work across refreshes. */
(function(){
  'use strict';
  const KEY='hima:continuity:v1';
  const $=id=>document.getElementById(id);
  const safeParse=(raw)=>{try{return raw?JSON.parse(raw):null}catch(_){return null}};
  const read=()=>safeParse(localStorage.getItem(KEY));
  const formSnapshot=()=>{
    const values={};
    document.querySelectorAll('input,select,textarea').forEach((el)=>{
      if(!el.id || el.type==='password' || el.type==='file') return;
      if(el.type==='checkbox'||el.type==='radio') values[el.id]={checked:el.checked,value:el.value};
      else values[el.id]={value:el.value};
    });
    return values;
  };
  const write=()=>{
    try{
      if(typeof state==='undefined') return;
      const active=document.querySelector('.page.active');
      const data={version:1,portal:state.portal||null,page:active?.id||null,lang:state.lang||'ar',ticket:state.ticket??null,tickets:state.tickets||[],pendingBooking:state.pendingBooking??null,incidents:state.incidents||[],claims:state.claims||[],risk:state.risk||0,eventInsuranceRequests:state.eventInsuranceRequests||[],eventPolicies:state.eventPolicies||[],forms:formSnapshot(),savedAt:Date.now()};
      localStorage.setItem(KEY,JSON.stringify(data));
      try{history.replaceState({...history.state,hima:{portal:data.portal,page:data.page}},'',location.pathname+location.search+'#'+(data.portal||'gateway')+'/'+(data.page||''))}catch(_){ }
    }catch(e){console.warn('HIMA continuity save failed',e)}
  };
  const restoreForms=(values)=>{
    if(!values)return;
    Object.entries(values).forEach(([id,v])=>{const el=$(id);if(!el||!v)return;if('checked'in v&&(el.type==='checkbox'||el.type==='radio'))el.checked=!!v.checked;else if('value'in v)el.value=v.value});
  };
  const original={showPage:window.showPage,enterPortal:window.enterPortal,exitPortal:window.exitPortal,toggleLang:window.toggleLang,resetDemo:window.resetDemo};
  if(typeof original.showPage==='function')window.showPage=function(id){const result=original.showPage.apply(this,arguments);if(result!==false){write()}return result};
  if(typeof original.enterPortal==='function')window.enterPortal=function(role){const result=original.enterPortal.apply(this,arguments);write();return result};
  if(typeof original.exitPortal==='function')window.exitPortal=function(){const result=original.exitPortal.apply(this,arguments);write();return result};
  if(typeof original.toggleLang==='function')window.toggleLang=function(){const result=original.toggleLang.apply(this,arguments);write();return result};
  if(typeof original.resetDemo==='function')window.resetDemo=function(){const before=read();const result=original.resetDemo.apply(this,arguments);if(before&&before.portal&&!state.portal){write()}else write();return result};
  document.addEventListener('input',()=>{clearTimeout(window.__himaSaveDebounce);window.__himaSaveDebounce=setTimeout(write,250)},true);
  document.addEventListener('change',()=>{write()},true);
  document.addEventListener('click',()=>{Promise.resolve().then(write)},true);
  window.addEventListener('pagehide',write);
  window.addEventListener('beforeunload',write);
  window.addEventListener('popstate',(ev)=>{
    const r=ev.state?.hima||read();if(!r)return;
    if(r.portal&&typeof window.enterPortal==='function')window.enterPortal(r.portal);
    if(r.page&&typeof window.showPage==='function')window.showPage(r.page);
  });
  function restore(){
    const saved=read();if(!saved||saved.version!==1)return;
    try{
      const savedLang=saved.lang||state.lang;
      state.ticket=saved.ticket??null;state.tickets=Array.isArray(saved.tickets)?saved.tickets:(saved.ticket?[saved.ticket]:[]);state.pendingBooking=saved.pendingBooking??null;
      state.incidents=saved.incidents||[];state.claims=saved.claims||[];state.risk=saved.risk||0;
      state.eventInsuranceRequests=saved.eventInsuranceRequests||[];state.eventPolicies=saved.eventPolicies||[];
      // Keep workflow-owned records in sync with its own storage keys.
      localStorage.setItem('hima:eventInsuranceRequests',JSON.stringify(state.eventInsuranceRequests));
      localStorage.setItem('hima:eventPolicies',JSON.stringify(state.eventPolicies));
      if(typeof window.toggleLang==='function' && savedLang && savedLang!==document.documentElement.lang){state.lang=document.documentElement.lang==='en'?'en':'ar';window.toggleLang()}
      state.lang=savedLang;
      restoreForms(saved.forms);
      if(saved.portal&&['customer','organizer','insurer'].includes(saved.portal)){
        window.enterPortal(saved.portal);
        const allowed={customer:['overview','events','booking','payment','wallet','incident','account'],organizer:['organizer','organizerEvents','organizerCreate','organizerInsuranceRequest','organizerRequests','organizerRisk','organizerPolicies','account','incident'],insurer:['insurer','insurerRequests','insurerRisk','insurerCoverage','insurerPolicies','insurerClaims','insurerReports','account','incident']};
        if(saved.page&&allowed[saved.portal]?.includes(saved.page)&&$(saved.page))window.showPage(saved.page);
      }else if(typeof window.exitPortal==='function')window.exitPortal();
      // Re-render dependent views after restoring their data and form values.
      ['renderWallet','renderIncidents','renderClaims','renderEventUnderwriting','renderEventPolicies','renderOrganizerEventsList','renderRequestLists','renderInsurerServices'].forEach(fn=>{try{if(typeof window[fn]==='function')window[fn]()}catch(e){console.warn('HIMA restore render:',fn,e)}});
      write();
    }catch(e){console.error('HIMA continuity restore failed',e)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',restore,{once:true});else restore();
})();
