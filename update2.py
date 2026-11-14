from pathlib import Path
p=Path('/mnt/data/hima_design_work/app.js'); s=p.read_text()
# update first page map in enterPortal
s=s.replace("const first={customer:'overview',organizer:'organizer',insurer:'insurer'}[role]||'overview';", "const first={customer:'overview',organizer:'organizerHome',insurer:'insurerHome'}[role]||'overview';")
# replace allowed page map
s=s.replace("organizer:['organizer','incident','account'],\n  insurer:['insurer','insurerPolicies','incident','account']", "organizer:['organizerHome','organizer','organizerRequestsPage','organizerPoliciesPage','incident','account'],\n  insurer:['insurerHome','insurer','insurerPolicies','insurerClaims','incident','account']")
# Replace final showPage body segment logic exact
old=""" if(id==='wallet')renderWallet();
 if(id==='payment')renderPaymentSummary();
 if(id==='incident'){renderIncidents();if(state.portal==='customer'){renderClaimTicketOptions();renderClaims();}}
 if(id==='insurer')renderClaims();
 if(id==='events'){renderCategoryCards();renderEventCatalog()}
 openPortalNavState(id);"""
new=""" if(id==='wallet')renderWallet();
 if(id==='payment')renderPaymentSummary();
 if(id==='incident'){renderIncidents();if(state.portal==='customer'){renderClaimTicketOptions();renderClaims();}}
 if(id==='insurer'){renderEventUnderwriting();renderEventPolicies()}
 if(id==='insurerClaims')renderClaims();
 if(id==='organizerHome'||id==='organizer'||id==='organizerRequestsPage'||id==='organizerPoliciesPage')updateOrganizerDashboard();
 if(id==='insurerHome')updateInsurerHome();
 if(id==='insurerPolicies')renderEventPolicies();
 if(id==='events'){renderCategoryCards();renderEventCatalog()}
 openPortalNavState(id);"""
if old not in s: print('showPage segment missing')
else: s=s.replace(old,new)
# Extend organizer dashboard after counters
needle=""" $('orgPolicyCount').textContent=pol.length;
 const list=$('organizerRequests');"""
rep=""" $('orgPolicyCount').textContent=pol.length;
 if($('orgHomeEventCount'))$('orgHomeEventCount').textContent=req.length?new Set(req.map(x=>x.eventName)).size:'0';
 if($('orgHomePendingCount'))$('orgHomePendingCount').textContent=req.filter(x=>x.status==='قيد المراجعة').length;
 if($('orgHomePolicyCount'))$('orgHomePolicyCount').textContent=pol.length;
 const list=$('organizerRequests');"""
s=s.replace(needle,rep)
# after rendering list block before function close add mirror list and policies
needle=""" else{list.className='request-list';list.innerHTML=req.slice().reverse().map(r=>`<article class="request-card"><div class="request-card-head"><div><h4>${escapeHtml(r.eventName)}</h4><small>${escapeHtml(r.id)} · ${escapeHtml(r.date)}</small></div><span class="pill ${organizerStatusClass(r.status)}">${escapeHtml(r.status)}</span></div><div class="request-details">المدينة: ${escapeHtml(r.city)} · الحضور المتوقع: ${Number(r.attendance).toLocaleString('ar-SA')}<br>${r.status==='مرفوض'?'سبب الرفض: '+escapeHtml(r.decisionNote||'غير محدد'):r.status==='مقبول'?'رقم الوثيقة: '+escapeHtml(r.policyNo||'بانتظار الإصدار'):'بانتظار مراجعة شركة التأمين'}</div></article>`).join('')}}
}"""
rep=""" else{list.className='request-list';list.innerHTML=req.slice().reverse().map(r=>`<article class="request-card"><div class="request-card-head"><div><h4>${escapeHtml(r.eventName)}</h4><small>${escapeHtml(r.id)} · ${escapeHtml(r.date)}</small></div><span class="pill ${organizerStatusClass(r.status)}">${escapeHtml(r.status)}</span></div><div class="request-details">المدينة: ${escapeHtml(r.city)} · الحضور المتوقع: ${Number(r.attendance).toLocaleString('ar-SA')}<br>${r.status==='مرفوض'?'سبب الرفض: '+escapeHtml(r.decisionNote||'غير محدد'):r.status==='مقبول'?'رقم الوثيقة: '+escapeHtml(r.policyNo||'بانتظار الإصدار'):'بانتظار مراجعة شركة التأمين'}</div></article>`).join('')}}
 const mirror=$('organizerRequestsPageList');if(mirror){if(!req.length){mirror.className='request-list empty';mirror.textContent='لم ترسل طلبات بعد.'}else{mirror.className='request-list';mirror.innerHTML=list?.innerHTML||''}}
 const policyList=$('organizerPoliciesPageList');if(policyList){if(!pol.length){policyList.className='request-list empty';policyList.textContent='لا توجد وثائق صادرة بعد.'}else{policyList.className='request-list';policyList.innerHTML=pol.slice().reverse().map(x=>`<article class="request-card"><div class="request-card-head"><div><h4>${escapeHtml(x.eventName)}</h4><small>${escapeHtml(x.policyNo)} · ${escapeHtml(x.requestId)}</small></div><span class="pill green">${escapeHtml(x.status||'وثيقة تجريبية')}</span></div><div class="request-details">التغطيات: ${escapeHtml(x.coverage)}<br>القسط المقترح: ${Number(x.premium||0).toLocaleString('ar-SA')} ر.س</div></article>`).join('')}}
}
function updateInsurerHome(){const req=state.eventInsuranceRequests||[],pol=state.eventPolicies||[];if($('insHomeRequestCount'))$('insHomeRequestCount').textContent=req.length;if($('insHomePendingCount'))$('insHomePendingCount').textContent=req.filter(x=>x.status==='قيد المراجعة').length;if($('insHomePolicyCount'))$('insHomePolicyCount').textContent=pol.length}
"""
if needle not in s: print('organizer end pattern missing')
else: s=s.replace(needle,rep)
# update insurer home when rendering underwriting and after decision
s=s.replace("if(stats){stats.innerHTML=`<div class=\"statbox\">", "updateInsurerHome();if(stats){stats.innerHTML=`<div class=\"statbox\">")
s=s.replace("renderEventUnderwriting();updateOrganizerDashboard();renderEventPolicies();", "renderEventUnderwriting();updateInsurerHome();updateOrganizerDashboard();renderEventPolicies();")
# initial startup add refresh after region/city init if known
s += "\n// Refresh portal dashboard summaries from the current in-session demo state.\ndocument.addEventListener('DOMContentLoaded',()=>{try{updateOrganizerDashboard();updateInsurerHome()}catch(e){}});\n"
p.write_text(s)
print('js updated')
