
const state={lang:'ar',ticket:null,pendingBooking:null,incidents:[],claims:[],risk:0,portal:null};
const $=id=>document.getElementById(id);
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));if(id==='wallet')renderWallet();if(id==='incident')renderIncidents();if(id==='insurer')renderClaims();window.scrollTo({top:0,behavior:'smooth'})}
function toggleLang(){state.lang=state.lang==='ar'?'en':'ar';document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==='ar'?'rtl':'ltr';$('langBtn').textContent=state.lang==='ar'?'English':'العربية';document.querySelectorAll('[data-ar]').forEach(el=>el.textContent=el.dataset[state.lang]);document.querySelectorAll('.nav button').forEach(b=>{const icon=b.querySelector('.nav-icon');b.textContent=b.dataset[state.lang];if(icon)b.prepend(icon)});document.querySelectorAll('.bottom-link small[data-ar]').forEach(el=>el.textContent=el.dataset[state.lang]);$('brandTitle').textContent=state.lang==='ar'?'حِمى | HIMA':'HIMA | حِمى';$('brandSub').textContent=state.lang==='ar'?'منظومة التأمين الذكي وإدارة مخاطر الفعاليات':'Smart insurance & event risk management';$('resetBtn').textContent=state.lang==='ar'?'إعادة ضبط التجربة':'Reset demo';$('heroTag').textContent=state.lang==='ar'?'منصة موحدة للفعاليات والتأمين':'One connected platform for events & insurance';$('heroTitle').textContent=state.lang==='ar'?'مرحبًا بك في حِمى':'Welcome to HIMA';$('heroText').textContent=state.lang==='ar'?'منظومة رقمية متكاملة تربط منظم الفعالية، وشركة التأمين، والمستفيد في تجربة واحدة لإدارة المخاطر والتأمين ومتابعة الحوادث والمطالبات بكفاءة وثقة.':'A connected digital platform bringing event organizers, insurers and attendees together to manage risk, insurance, incidents and claims with clarity and confidence.';$('heroStep1').textContent=state.lang==='ar'?'إدارة مخاطر ذكية':'Smart risk management';$('heroStep2').textContent=state.lang==='ar'?'تغطية تأمينية مرنة':'Flexible insurance coverage';$('heroStep3').textContent=state.lang==='ar'?'متابعة المطالبات بسهولة':'Simple claims tracking';$('footerText').textContent=state.lang==='ar'?'حِمى | HIMA — نموذج أولي للاختبار والتطوير فقط. لا يمثل وثيقة تأمين أو عرضًا تأمينيًا أو تكاملًا فعليًا مع أي جهة.':'HIMA — prototype for testing and development only. Not an insurance policy, offer or live integration.';
const gatewayText={ar:{title:'اختر بوابتك للدخول',sub:'كل طرف لديه مساحة مستقلة وأدوات مصممة لتلبية احتياجاته.',customer:'المستفيد',customerDesc:'استكشف الفعاليات، احجز تذكرتك، وأضف الحماية التأمينية الاختيارية.',customerAction:'الدخول كمستفيد',organizer:'منظم الفعالية',organizerDesc:'سجّل فعاليتك، قيّم المخاطر، وتابع طلبات ووثائق التأمين.',organizerAction:'الدخول كمنظم',insurer:'شركة التأمين',insurerDesc:'راجع طلبات التأمين، التغطيات، الحوادث والمطالبات.',insurerAction:'الدخول لشركة التأمين'},en:{title:'Choose your portal',sub:'Each role has its own dedicated workspace and tools.',customer:'Attendee',customerDesc:'Explore events, book tickets and add optional insurance protection.',customerAction:'Enter as attendee',organizer:'Event organizer',organizerDesc:'Register events, assess risks and track insurance requests and policies.',organizerAction:'Enter as organizer',insurer:'Insurance company',insurerDesc:'Review insurance requests, coverage, incidents and claims.',insurerAction:'Enter insurer portal'}};
const gt=gatewayText[state.lang];if($('gatewayTitle'))$('gatewayTitle').textContent=gt.title;if($('gatewaySub'))$('gatewaySub').textContent=gt.sub;
['customer','organizer','insurer'].forEach(k=>{const t=$(k+'RoleTitle'),d=$(k+'RoleDesc'),a=$(k+'RoleAction');if(t)t.textContent=gt[k];if(d)d.textContent=gt[k+'Desc'];if(a)a.textContent=gt[k+'Action']});
const activeRole=state.portal||'customer';const roleNames={customer:['بوابة المستفيد','Attendee portal'],organizer:['بوابة منظم الفعالية','Event organizer portal'],insurer:['بوابة شركة التأمين','Insurance company portal']};if($('portalBadge'))$('portalBadge').textContent=roleNames[activeRole][state.lang==='ar'?0:1];if($('portalChip'))$('portalChip').textContent=roleNames[activeRole][state.lang==='ar'?0:1];if($('drawerSubtitle'))$('drawerSubtitle').textContent=roleNames[activeRole][state.lang==='ar'?0:1];if($('drawerTitle'))$('drawerTitle').textContent=state.lang==='ar'?'قائمة حِمى':'HIMA menu';renderWallet();renderIncidents();renderClaims()}
function calculateRisk(){let cap=+$('capacity').value||1,att=+$('attendance').value||0,crowd=+$('crowd').value,safety=+$('safety').value;let ratio=Math.min(1.5,att/cap);let score=Math.round(Math.min(100,ratio*45+crowd*12+(4-safety)*12));state.risk=score;$('statCapacity').textContent=cap.toLocaleString();$('statAttendance').textContent=att.toLocaleString();let label=score>=70?'مرتفع':score>=45?'متوسط':'منخفض';$('riskResult').innerHTML=`<b>المؤشر التوضيحي: ${score}/100 — ${label}</b><br>نتيجة افتراضية تعتمد على مدخلات السعة والحضور والازدحام وجاهزية السلامة. لا تستخدم للتسعير أو قرارات السلامة الفعلية.`}
const HIMA_COVER_PACKAGES={basic:{name:'الحماية الأساسية',price:5,level:'أساسي'},balanced:{name:'الحماية المتوازنة',price:10,level:'متوازن'},extended:{name:'الحماية الموسعة',price:15,level:'موسع'}};
function getSelectedCoverPackage(){const selected=document.querySelector('input[name="coverPackage"]:checked');return selected?HIMA_COVER_PACKAGES[selected.value]:null}
function updateTotal(){const base=+$('ticketType').value,pack=getSelectedCoverPackage(),cover=pack?pack.price:0;$('basePrice').textContent=base+' ر.س';$('coverPrice').textContent=cover+' ر.س';$('totalPrice').textContent=(base+cover)+' ر.س';if($('coverPackageSummary'))$('coverPackageSummary').textContent=pack?pack.name:'بدون حماية'}
function issueTicket(){let msg=$('bookingMsg');if(!$('agreeDemo').checked){msg.classList.remove('hide');msg.className='notice warn';msg.textContent='يرجى تأكيد فهمك أن هذه تجربة افتراضية قبل إصدار التذكرة.';return}let base=+$('ticketType').value,cover=$('addCover').checked;state.ticket={id:'TKT-HIMA-0001',event:$('eventName').value||'فعالية تجريبية',type:$('ticketType').selectedOptions[0].text,base,cover,coverPrice:cover?5:0,total:base+(cover?5:0),date:'24 نوفمبر 2026',certificate:cover?'HIMA-CERT-DEMO-001':null};msg.classList.remove('hide');msg.className='notice good';msg.textContent='تم إنشاء تذكرة تجريبية بنجاح. يمكنك مشاهدتها في محفظة التذاكر.';renderWallet()}
function renderWallet(){
 let el=$('walletContent');
 if(!state.ticket){el.className='empty';el.textContent=state.lang==='ar'?'لا توجد تذاكر بعد. انتقل إلى «حجز التذكرة» لإنشاء تذكرة تجريبية.':'No tickets yet. Go to Ticket booking to create a demo ticket.';return}
 const t=state.ticket;el.className='ticket wallet-ticket';
 el.innerHTML=`<div class="tickethead"><div><span class="pill green">HIMA • DEMO</span><h2>${escapeHtml(t.event)}</h2><p class="muted">${escapeHtml(t.location||'')} • ${escapeHtml(t.date||'')}</p><p class="muted">${escapeHtml(t.venue||'')}</p></div><div class="qr" aria-label="نمط QR توضيحي"></div></div><hr style="border:0;border-top:1px dashed #c9b8e2"><div class="row"><span>رقم التذكرة</span><b class="ticketcode">${escapeHtml(t.id)}</b></div><div class="row"><span>فئة التذكرة</span><b>${escapeHtml(t.type)}</b></div><div class="row"><span>قيمة التذكرة</span><b>${t.base} ر.س</b></div><div class="row"><span>باقة حماية حِمى</span><b>${t.cover?escapeHtml(t.coverPackage)+' — '+t.coverPrice+' ر.س':'غير مضافة'}</b></div><div class="row"><b>الإجمالي التجريبي</b><b>${t.total} ر.س</b></div><div class="row"><span>وسيلة الدفع</span><b>${escapeHtml(t.paymentMethod||'—')}</b></div><div class="row"><span>حالة الدفع</span><b class="pill green">${escapeHtml(t.paymentStatus||'—')}</b></div>${t.cover?`<div class="notice good"><b>شهادة حماية تجريبية</b><br>الباقة: ${escapeHtml(t.coverPackage)}<br>المرجع: ${escapeHtml(t.certificate)}<br>هذه ليست وثيقة تأمين فعلية، وتخضع التغطية الفعلية لشروط الوثيقة عند توفرها.</div>`:`<div class="notice warn">لم تتم إضافة الحماية الاختيارية إلى هذه التذكرة.</div>`}<div class="wallet-actions"><button class="btn secondary" onclick="showPage('events')">استكشاف فعاليات أخرى</button><button class="btn" onclick="showPage('incident')">الانتقال إلى بصمة الحادث / المطالبة</button></div>`
}
function renderClaimTicketOptions(){
 const select=$('claimTicket');if(!select)return;
 const previous=select.value;
 const eligible=state.ticket&&state.ticket.cover?[state.ticket]:[];
 select.innerHTML='<option value="">اختر التذكرة المؤمّن عليها</option>'+eligible.map(t=>`<option value="${escapeHtml(t.id)}">${escapeHtml(t.event)} — ${escapeHtml(t.id)}</option>`).join('');
 if(eligible.some(t=>t.id===previous))select.value=previous;
 else if(eligible.length===1)select.value=eligible[0].id;
 if(!eligible.length){$('claimTicketSummary').className='notice warn claim-ticket-summary';$('claimTicketSummary').textContent='لا توجد تذكرة صادرة تحتوي على حماية حِمى. احجز تذكرة مع إضافة الحماية أولًا حتى تتمكن من تقديم مطالبة.';}
 else renderClaimTicketSummary();
}
function renderClaimTicketSummary(){
 const t=state.ticket,box=$('claimTicketSummary');if(!box)return;
 if(!t||!t.cover||$('claimTicket').value!==t.id){box.className='notice claim-ticket-summary';box.textContent='اختر تذكرتك المؤمّن عليها لعرض تفاصيلها.';renderClaimLiveSummary();return;}
 box.className='claim-ticket-summary notice good';box.innerHTML=`<div class="claim-ticket-name"><b>${escapeHtml(t.event)}</b><span class="pill green">حماية حِمى مفعّلة</span></div><div class="claim-ticket-meta"><span>رقم التذكرة</span><b>${escapeHtml(t.id)}</b></div><div class="claim-ticket-meta"><span>فئة التذكرة</span><b>${escapeHtml(t.type)}</b></div><div class="claim-ticket-meta"><span>باقة الحماية</span><b>${escapeHtml(t.coverPackage||'حماية حِمى')}</b></div><div class="claim-ticket-meta"><span>الموقع والتاريخ</span><b>${escapeHtml((t.location||'')+' — '+(t.date||''))}</b></div>`;
 renderClaimLiveSummary();
}
function renderClaimLiveSummary(){
 const el=$('claimLiveSummary');if(!el)return;
 const t=state.ticket&&$('claimTicket')?.value===state.ticket.id?state.ticket:null;
 const fields=[['نوع الحادث',$('claimIncidentType')?.value],['الموقع',$('claimIncidentLocation')?.value],['وقت الحادث',$('claimIncidentTime')?.value],['الوصف',$('claimDescription')?.value]];
 if(!t){el.className='claim-summary-empty';el.textContent='اختر تذكرة مؤمّنًا عليها وأكمل بيانات الحادث لتظهر تفاصيل مطالبتك هنا.';return;}
 el.className='claim-summary-details';el.innerHTML=`<div class="claim-summary-ticket"><small>التذكرة المختارة</small><b>${escapeHtml(t.id)}</b><strong>${escapeHtml(t.event)}</strong></div>`+fields.map(([label,value])=>`<div class="claim-summary-row"><span>${label}</span><b>${escapeHtml(value||'لم يحدد بعد')}</b></div>`).join('')+`<div class="claim-summary-row"><span>المرفقات</span><b>${$('claimFiles')?.files?.length||0} ملف</b></div>`;
}
function renderClaimFileList(){
 const el=$('claimFileList'),files=[...($('claimFiles')?.files||[])];if(!el)return;
 const tooLarge=files.filter(f=>f.size>10*1024*1024);
 if(tooLarge.length){el.innerHTML='<div class="notice warn">بعض الملفات يتجاوز حجمها 10MB: '+tooLarge.map(f=>escapeHtml(f.name)).join('، ')+'</div>';}
 else el.innerHTML=files.map(f=>`<div class="claim-file-chip"><span>▤</span><span>${escapeHtml(f.name)}</span><small>${(f.size/1024/1024).toFixed(2)} MB</small></div>`).join('');
 renderClaimLiveSummary();
}
function createIncident(){
 const id='INC-HIMA-'+String(state.incidents.length+1).padStart(3,'0');
 const incident={id,type:$('incidentType')?.value||'واقعة مسجلة',location:$('incidentLocation')?.value||'',description:$('incidentDescription')?.value||'',time:$('incidentTime')?.value||new Date().toLocaleString('sv-SE'),event:$('eventName')?.value||state.ticket?.event||'فعالية'};
 state.incidents.push(incident);renderIncidents();return incident;
}
function renderIncidents(){
 let el=$('incidentList');if(!el)return;
 if(!state.incidents.length){el.className='empty';el.textContent='لا توجد حوادث مسجلة.';return}
 el.className='tablewrap';el.innerHTML='<table><thead><tr><th>رقم الواقعة</th><th>النوع</th><th>الموقع</th><th>الوصف</th></tr></thead><tbody>'+state.incidents.map(i=>`<tr><td><b>${escapeHtml(i.id)}</b></td><td>${escapeHtml(i.type)}</td><td>${escapeHtml(i.location)}</td><td>${escapeHtml(i.description)}</td></tr>`).join('')+'</tbody></table>';
}
function submitClaim(){
 const msg=$('claimMsg'),ticketId=$('claimTicket').value,t=state.ticket,files=[...($('claimFiles')?.files||[])];
 const type=$('claimIncidentType').value,location=$('claimIncidentLocation').value.trim(),time=$('claimIncidentTime').value,description=$('claimDescription').value.trim();
 const eligible=!!(t&&t.cover&&ticketId===t.id);
 if(!eligible){msg.className='notice warn';msg.classList.remove('hide');msg.textContent='يرجى اختيار تذكرة صادرة تتضمن حماية حِمى.';return;}
 if(!type||!location||!time||!description){msg.className='notice warn';msg.classList.remove('hide');msg.textContent='يرجى استكمال جميع بيانات الحادث المطلوبة قبل الإرسال.';return;}
 if(files.some(f=>f.size>10*1024*1024)){msg.className='notice warn';msg.classList.remove('hide');msg.textContent='يوجد ملف يتجاوز الحد الأقصى المسموح به (10MB).';return;}
 const incidentId='INC-HIMA-'+String(state.incidents.length+1).padStart(3,'0');
 const incident={id:incidentId,type,location,description,time,event:t.event};state.incidents.push(incident);
 const claim={id:'CLM-HIMA-'+String(state.claims.length+1).padStart(4,'0'),ticket:t.id,ticketEvent:t.event,ticketType:t.type,ticketDate:t.date,ticketLocation:t.location,coverPackage:t.coverPackage||'حماية حِمى',incident:incidentId,incidentType:type,incidentLocation:location,incidentTime:time,incidentDescription:description,docs:files.map(f=>({name:f.name,size:f.size,type:f.type,file:f,url:URL.createObjectURL(f)})),knownTicket:true,knownIncident:true,coverage:true,status:'قيد مراجعة شركة التأمين',reviewNote:'',submittedAt:new Date().toLocaleString('ar-SA'),decisionAt:null};
 state.claims.push(claim);
 msg.className='notice good';msg.classList.remove('hide');msg.innerHTML=`تم إرسال مطالبتك بنجاح. رقم المطالبة: <b>${escapeHtml(claim.id)}</b>. يمكنك متابعة قرار شركة التأمين من سجل «مطالباتي» أدناه.`;
 $('claimDescription').value='';$('claimIncidentLocation').value='';$('claimIncidentType').value='';$('claimIncidentTime').value='';$('claimFiles').value='';renderClaimFileList();renderClaimLiveSummary();renderIncidents();renderClaims();renderClaimTicketOptions();
 $('customerClaimsCard').scrollIntoView({behavior:'smooth',block:'start'});
}
function statusClass(status){return status==='مقبولة'?'green':status==='مرفوضة'?'red':'amber'}
function renderClaims(){
 const el=$('claimsList');if(el){
  const pending=state.claims.filter(c=>c.status==='قيد مراجعة شركة التأمين').length,accepted=state.claims.filter(c=>c.status==='مقبولة').length,rejected=state.claims.filter(c=>c.status==='مرفوضة').length;
  const stats=$('claimInsurerStats');if(stats)stats.innerHTML=`<div class="claim-stat"><small>إجمالي المطالبات</small><b>${state.claims.length}</b></div><div class="claim-stat"><small>قيد المراجعة</small><b>${pending}</b></div><div class="claim-stat"><small>مقبولة</small><b>${accepted}</b></div><div class="claim-stat"><small>مرفوضة</small><b>${rejected}</b></div>`;
  if(!state.claims.length){el.className='empty';el.textContent='لا توجد مطالبات واردة بعد. عند إرسال مطالبة من بوابة المستفيد ستظهر هنا للمراجعة.';}
  else{el.className='claim-review-list';el.innerHTML=state.claims.map((c,i)=>`<article class="claim-review-card"><div class="claim-review-head"><div><small>رقم المطالبة</small><h3>${escapeHtml(c.id)}</h3></div><span class="pill ${statusClass(c.status)}">${escapeHtml(c.status)}</span></div><div class="claim-review-grid"><section><h4>بيانات العميل والتذكرة</h4><div class="claim-review-row"><span>العميل</span><b>المستخدم التجريبي</b></div><div class="claim-review-row"><span>رقم التذكرة</span><b>${escapeHtml(c.ticket)}</b></div><div class="claim-review-row"><span>الفعالية</span><b>${escapeHtml(c.ticketEvent)}</b></div><div class="claim-review-row"><span>باقة الحماية</span><b>${escapeHtml(c.coverPackage)}</b></div></section><section><h4>بيانات الحادث</h4><div class="claim-review-row"><span>رقم الحادث</span><b>${escapeHtml(c.incident)}</b></div><div class="claim-review-row"><span>نوع الحادث</span><b>${escapeHtml(c.incidentType)}</b></div><div class="claim-review-row"><span>الموقع</span><b>${escapeHtml(c.incidentLocation)}</b></div><div class="claim-review-row"><span>وقت الحادث</span><b>${escapeHtml(c.incidentTime)}</b></div></section></div><div class="claim-review-description"><h4>وصف الضرر</h4><p>${escapeHtml(c.incidentDescription)}</p></div><div class="claim-review-docs"><h4>المرفقات (${c.docs?.length||0})</h4>${c.docs?.length?c.docs.map(d=>`<a class="claim-file-chip claim-file-link" href="${escapeHtml(d.url||'#')}" target="_blank" rel="noopener">▤ ${escapeHtml(d.name)} <small>فتح الملف · ${(d.size/1024/1024).toFixed(2)} MB</small></a>`).join(''):'<span class="muted">لا توجد مرفقات</span>'}</div>${c.status==='قيد مراجعة شركة التأمين'?`<div class="claim-review-actions"><div class="field"><label for="claimNote${i}">ملاحظة المراجع (اختياري)</label><textarea id="claimNote${i}" placeholder="أضف ملاحظة للعميل عند الحاجة..."></textarea></div><div class="field"><label for="claimRejectReason${i}">سبب الرفض (إلزامي عند الرفض)</label><input id="claimRejectReason${i}" placeholder="يظهر للعميل في حال رفض المطالبة"></div><div class="claim-decision-buttons"><button class="btn claim-accept" onclick="updateClaim(${i},'مقبولة')">✓ قبول المطالبة</button><button class="btn claim-reject" onclick="updateClaim(${i},'مرفوضة')">✕ رفض المطالبة</button></div></div>`:`<div class="notice ${c.status==='مقبولة'?'good':'warn'}"><b>قرار شركة التأمين: ${escapeHtml(c.status)}</b>${c.reviewNote?`<p>${escapeHtml(c.reviewNote)}</p>`:''}${c.rejectionReason?`<p><b>سبب الرفض:</b> ${escapeHtml(c.rejectionReason)}</p>`:''}<small>${escapeHtml(c.decisionAt||'')}</small></div>`}</article>`).join('');}
 }
 const customer=$('customerClaimsList');if(customer){
  if(!state.claims.length){customer.className='empty';customer.textContent='لا توجد مطالبات مرسلة حتى الآن.';}
  else{customer.className='customer-claims-list';customer.innerHTML=state.claims.map(c=>`<article class="customer-claim-card"><div class="customer-claim-head"><div><small>رقم المطالبة</small><b>${escapeHtml(c.id)}</b></div><span class="pill ${statusClass(c.status)}">${escapeHtml(c.status)}</span></div><div class="customer-claim-info"><span>الفعالية: <b>${escapeHtml(c.ticketEvent)}</b></span><span>التذكرة: <b>${escapeHtml(c.ticket)}</b></span><span>الحادث: <b>${escapeHtml(c.incidentType)} — ${escapeHtml(c.incidentLocation)}</b></span><span>تاريخ الإرسال: <b>${escapeHtml(c.submittedAt)}</b></span></div><div class="claim-progress ${c.status==='قيد مراجعة شركة التأمين'?'pending':c.status==='مقبولة'?'accepted':'rejected'}"><span class="progress-node done">تم الإرسال</span><span class="progress-line"></span><span class="progress-node ${c.status==='قيد مراجعة شركة التأمين'?'current':c.status!=='قيد مراجعة شركة التأمين'?'done':''}">مراجعة شركة التأمين</span><span class="progress-line"></span><span class="progress-node ${c.status==='قيد مراجعة شركة التأمين'?'': 'current'}">قرار المطالبة</span></div>${c.status==='مرفوضة'?`<div class="notice warn"><b>سبب الرفض:</b> ${escapeHtml(c.rejectionReason||c.reviewNote||'يرجى مراجعة شركة التأمين للتفاصيل.')}</div>`:c.status==='مقبولة'?`<div class="notice good"><b>تم قبول المطالبة.</b> ${escapeHtml(c.reviewNote||'تم تحديث حالة مطالبتك من شركة التأمين.')}</div>`:`<div class="notice">مطالبتك لدى شركة التأمين للمراجعة. ستظهر نتيجة القرار هنا بعد اعتمادها.</div>`}</article>`).join('');}
 }
}
function updateClaim(i,decision){
 const claim=state.claims[i];if(!claim||claim.status!=='قيد مراجعة شركة التأمين')return;
 const note=$('claimNote'+i)?.value.trim()||'';
 const reason=$('claimRejectReason'+i)?.value.trim()||'';
 if(decision==='مرفوضة'&&!reason){alert('يرجى كتابة سبب الرفض قبل اعتماد القرار.');return;}
 claim.status=decision;claim.reviewNote=note;claim.rejectionReason=decision==='مرفوضة'?reason:'';claim.decisionAt=new Date().toLocaleString('ar-SA');
 renderClaims();
}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function resetDemo(){if(!confirm(state.lang==='ar'?'هل تريد إعادة ضبط بيانات التجربة؟':'Reset demo data?'))return;state.ticket=null;state.incidents=[];state.claims=[];state.risk=0;$('agreeDemo').checked=false;document.querySelectorAll('input[name="coverPackage"]').forEach(input=>input.checked=false);updateTotal();renderWallet();renderIncidents();renderClaims();renderClaimTicketOptions();if(state.portal==='customer')showPage('overview');else if(state.portal==='organizer')showPage('organizer');else if(state.portal==='insurer')showPage('insurer');else exitPortal()}
if($('incidentTime'))$('incidentTime').value=new Date().toISOString().slice(0,16);
['claimIncidentType','claimIncidentLocation','claimIncidentTime','claimDescription'].forEach(id=>$(id)?.addEventListener('input',renderClaimLiveSummary));
updateTotal();


const himaIcons={overview:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',events:'<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM8 3v4m8-4v4M4 9h16"/></svg>',account:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',organizer:'<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V5l7-2v18M12 9h7v12M8 7h1m-1 4h1m-1 4h1m8-3h1m-1 4h1"/></svg>',booking:'<svg viewBox="0 0 24 24"><path d="M4 7a2 2 0 0 0 0 4v2a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4v-2a2 2 0 0 0 0-4H4Z"/><path d="M13 7v2m0 3v2m0 3v1"/></svg>',wallet:'<svg viewBox="0 0 24 24"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v16H6a3 3 0 0 1-3-3V6.5Z"/><path d="M3 8h17M16 13h4"/></svg>',incident:'<svg viewBox="0 0 24 24"><path d="M12 11a2 2 0 0 0-2 2c0 3-.5 5.5-1.5 7M12 7a6 6 0 0 0-6 6c0 2-.2 4-1 6M12 3a10 10 0 0 0-10 10m10-6a6 6 0 0 1 6 6c0 3-.4 5.3-1.3 7M12 11a2 2 0 0 1 2 2c0 2.7.3 4.6 1 6"/></svg>',insurer:'<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></svg>'};
document.querySelectorAll('.nav button').forEach(b=>{const key=b.dataset.page;const icon=document.createElement('span');icon.className='nav-icon';icon.innerHTML=himaIcons[key]||himaIcons.overview;b.prepend(icon)});

/* HIMA guided attendee journey — categorized demo catalogue */
const HIMA_REGIONS={
 'الرياض':['الرياض','الخرج','الدرعية'],
 'مكة المكرمة':['مكة المكرمة','جدة','الطائف'],
 'المدينة المنورة':['المدينة المنورة','ينبع'],
 'القصيم':['بريدة','عنيزة','الرس'],
 'المنطقة الشرقية':['الدمام','الخبر','الأحساء','الجبيل'],
 'عسير':['أبها','خميس مشيط'],
 'تبوك':['تبوك','ضباء'],
 'حائل':['حائل'],
 'جازان':['جازان'],
 'نجران':['نجران'],
 'الجوف':['سكاكا','القريات'],
 'الحدود الشمالية':['عرعر','رفحاء'],
 'الباحة':['الباحة']
};
const HIMA_CATEGORIES=[
 {id:'sports',name:'المباريات الرياضية',icon:'⚽',desc:'كرة القدم ومختلف المنافسات الرياضية'},
 {id:'concert',name:'الحفلات الغنائية',icon:'🎤',desc:'الحفلات والعروض الموسيقية'},
 {id:'gaming',name:'الألعاب والرياضات الإلكترونية',icon:'🎮',desc:'بطولات الألعاب والرياضات الإلكترونية'},
 {id:'festival',name:'المهرجانات',icon:'🎪',desc:'المهرجانات الثقافية والترفيهية'},
 {id:'exhibition',name:'المعارض',icon:'🏛️',desc:'المعارض والمؤتمرات والملتقيات'},
 {id:'entertainment',name:'الفعاليات الترفيهية',icon:'🎡',desc:'تجارب عائلية وأنشطة ترفيهية'}
];
const HIMA_EVENTS=[
 {id:'s1',category:'sports',name:'مباراة كرة قدم — مثال تجريبي',region:'الرياض',city:'الرياض',venue:'ملعب افتراضي',date:'موعد افتراضي',price:150,kind:'مباراة كرة قدم'},
 {id:'s2',category:'sports',name:'مباراة كرة قدم — جدة',region:'مكة المكرمة',city:'جدة',venue:'ملعب افتراضي',date:'موعد افتراضي',price:180,kind:'مباراة كرة قدم'},
 {id:'s3',category:'sports',name:'بطولة رياضية — بريدة',region:'القصيم',city:'بريدة',venue:'صالة افتراضية',date:'موعد افتراضي',price:90,kind:'بطولة رياضية'},
 {id:'c1',category:'concert',name:'حفل غنائي — الرياض',region:'الرياض',city:'الرياض',venue:'مسرح افتراضي',date:'موعد افتراضي',price:220,kind:'حفل غنائي'},
 {id:'c2',category:'concert',name:'أمسية موسيقية — جدة',region:'مكة المكرمة',city:'جدة',venue:'مسرح افتراضي',date:'موعد افتراضي',price:190,kind:'حفل غنائي'},
 {id:'g1',category:'gaming',name:'بطولة ألعاب إلكترونية',region:'الرياض',city:'الرياض',venue:'ساحة ألعاب افتراضية',date:'موعد افتراضي',price:75,kind:'بطولة ألعاب'},
 {id:'g2',category:'gaming',name:'منافسات الرياضات الإلكترونية',region:'المنطقة الشرقية',city:'الدمام',venue:'مركز افتراضي',date:'موعد افتراضي',price:85,kind:'بطولة ألعاب'},
 {id:'f1',category:'festival',name:'مهرجان ثقافي — العلا',region:'المدينة المنورة',city:'المدينة المنورة',venue:'موقع افتراضي',date:'موعد افتراضي',price:60,kind:'مهرجان'},
 {id:'f2',category:'festival',name:'مهرجان ترفيهي — أبها',region:'عسير',city:'أبها',venue:'موقع افتراضي',date:'موعد افتراضي',price:55,kind:'مهرجان'},
 {id:'e1',category:'exhibition',name:'معرض ابتكار وتقنية',region:'الرياض',city:'الرياض',venue:'مركز معارض افتراضي',date:'موعد افتراضي',price:40,kind:'معرض'},
 {id:'e2',category:'exhibition',name:'معرض أعمال — جدة',region:'مكة المكرمة',city:'جدة',venue:'مركز معارض افتراضي',date:'موعد افتراضي',price:45,kind:'معرض'},
 {id:'t1',category:'entertainment',name:'فعالية عائلية ترفيهية',region:'القصيم',city:'عنيزة',venue:'موقع افتراضي',date:'موعد افتراضي',price:35,kind:'فعالية ترفيهية'},
 {id:'t2',category:'entertainment',name:'تجربة ترفيهية — الخبر',region:'المنطقة الشرقية',city:'الخبر',venue:'موقع افتراضي',date:'موعد افتراضي',price:50,kind:'فعالية ترفيهية'}
];
state.selectedCategory='all';
state.selectedEvent=null;
function categoryLabel(id){return HIMA_CATEGORIES.find(c=>c.id===id)?.name||'كل الفعاليات'}
function eventPhoto(category){return `assets/events/${({sports:'sports',concert:'concert',gaming:'gaming',festival:'festival',exhibition:'exhibition',entertainment:'entertainment'}[category]||'festival')}.jpg`}
function eventCard(e){return `<article class="event-card"><div class="event-art art-${e.category}"><img src="${eventPhoto(e.category)}" alt="صورة توضيحية لفئة ${categoryLabel(e.category)}" loading="lazy"><span class="event-category-label">${categoryLabel(e.category)}</span></div><div class="event-card-body"><h4>${escapeHtml(e.name)}</h4><p class="muted event-meta"><span aria-hidden="true">⌖</span> ${e.city} • ${e.venue}</p><p class="muted event-meta"><span aria-hidden="true">▦</span> ${e.date}</p><div class="event-card-foot"><b>${e.price} ر.س <small>سعر تجريبي</small></b><button class="btn" onclick="chooseHimaEvent('${e.id}')">اختيار الفعالية</button></div></div></article>`}
function renderCategoryCards(){const html=HIMA_CATEGORIES.map(c=>`<button class="category-card" onclick="selectHimaCategory('${c.id}')"><span>${c.icon}</span><b>${c.name}</b><small>${c.desc}</small></button>`).join('');if($('homeCategories'))$('homeCategories').innerHTML=html;if($('eventCategoryFilters'))$('eventCategoryFilters').innerHTML=`<button class="category-filter ${state.selectedCategory==='all'?'selected':''}" onclick="selectHimaCategory('all')">الكل</button>`+HIMA_CATEGORIES.map(c=>`<button class="category-filter ${state.selectedCategory===c.id?'selected':''}" onclick="selectHimaCategory('${c.id}')">${c.icon} ${c.name}</button>`).join('')}
function selectHimaCategory(id){state.selectedCategory=id;renderCategoryCards();renderEventCatalog();showPage('events')}
function renderEventCatalog(){const region=$('filterRegion')?.value||'all',city=$('filterCity')?.value||'all';let list=HIMA_EVENTS.filter(e=>(state.selectedCategory==='all'||e.category===state.selectedCategory)&&(region==='all'||e.region===region)&&(city==='all'||e.city===city));if($('eventCatalog'))$('eventCatalog').innerHTML=list.length?list.map(eventCard).join(''):'<div class="empty">لا توجد فعاليات تجريبية ضمن هذه الاختيارات. جرّب منطقة أو تصنيفًا آخر.</div>';if($('catalogTitle'))$('catalogTitle').textContent=state.selectedCategory==='all'?'كل الفعاليات':categoryLabel(state.selectedCategory);if($('catalogCount'))$('catalogCount').textContent=`${list.length} فعالية تجريبية متاحة ضمن الاختيارات`}
function fillRegions(select,includeAll=true){if(!select)return;select.innerHTML=(includeAll?'<option value="all">كل مناطق المملكة</option>':'')+Object.keys(HIMA_REGIONS).map(r=>`<option value="${r}">${r}</option>`).join('')}
function updateCityOptions(){const region=$('filterRegion')?.value||'all',sel=$('filterCity');if(!sel)return;let cities=region==='all'?[...new Set(Object.values(HIMA_REGIONS).flat())]:HIMA_REGIONS[region]||[];sel.innerHTML='<option value="all">كل المدن</option>'+cities.map(c=>`<option value="${c}">${c}</option>`).join('')}
function chooseHimaEvent(id){const ev=HIMA_EVENTS.find(e=>e.id===id);if(!ev)return;state.selectedEvent=ev;$('eventName').value=ev.name;$('eventType').value=ev.kind;$('eventLocation').value=`${ev.region} — ${ev.city} — ${ev.venue}`;$('bookingEvent').textContent=ev.name;$('selectedEventName').textContent=ev.name;$('ticketType').innerHTML=[['العادية',ev.price],['المميزة',ev.price+100],['الذهبية',ev.price+200]].map(([n,p])=>`<option value="${p}">الفئة ${n} — ${p} ر.س</option>`).join('');$('bookingEvent').nextElementSibling.textContent=`${ev.region} • ${ev.city} • ${ev.date}`;updateTotal();showPage('booking')}
function renderOrganizerEvents(){const cat=$('organizerType')?.value||'sports',sel=$('organizerEvent');if(!sel)return;const list=HIMA_EVENTS.filter(e=>e.category===cat);sel.innerHTML=list.map(e=>`<option value="${e.id}">${e.name} — ${e.city}</option>`).join('');syncOrganizerEvent()}
function updateOrganizerCities(){const region=$('organizerRegion')?.value||Object.keys(HIMA_REGIONS)[0],sel=$('organizerCity');if(!sel)return;sel.innerHTML=(HIMA_REGIONS[region]||[]).map(c=>`<option>${c}</option>`).join('');syncOrganizerEvent()}
function syncOrganizerEvent(){const ev=HIMA_EVENTS.find(e=>e.id===$('organizerEvent')?.value);if(!ev)return;$('eventName').value=ev.name;$('eventType').value=ev.kind;$('eventLocation').value=`${$('organizerRegion')?.value||ev.region} — ${$('organizerCity')?.value||ev.city} — ${ev.venue}`}
function openDrawer(){
 const overlay=$('drawerOverlay'),trigger=$('menuTrigger');
 if(!overlay||!trigger)return;
 overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');
 trigger.setAttribute('aria-expanded','true');document.body.classList.add('drawer-open');
 const role=state.portal||'customer';
 const names={customer:'بوابة المستفيد',organizer:'بوابة منظم الفعالية',insurer:'بوابة شركة التأمين'};
 $('drawerSubtitle').textContent=state.lang==='ar'?names[role]:(role==='customer'?'Attendee portal':role==='organizer'?'Event organizer portal':'Insurance company portal');
}
function closeDrawer(){
 const overlay=$('drawerOverlay'),trigger=$('menuTrigger');
 if(!overlay||!trigger)return;
 overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');
 trigger.setAttribute('aria-expanded','false');document.body.classList.remove('drawer-open');
}
function toggleDrawer(){ $('drawerOverlay')?.classList.contains('open')?closeDrawer():openDrawer() }
function goFromDrawer(page,anchor){
 closeDrawer();showPage(page);
 if(anchor){setTimeout(()=>{const el=$(anchor);if(el)el.scrollIntoView({behavior:'smooth',block:'center'})},80)}
}
function enterPortal(role){
 state.portal=role;
 document.body.classList.remove('portal-customer','portal-organizer','portal-insurer');
 document.body.classList.add('portal-active','portal-'+role);
 $('roleGateway').hidden=true;
 $('exitPortalBtn').hidden=false;$('portalChip').hidden=false;$('menuTrigger').hidden=false;
 const labels={customer:'بوابة المستفيد',organizer:'بوابة منظم الفعالية',insurer:'بوابة شركة التأمين'};
 $('portalChip').textContent=labels[role]||'';
 if($('drawerSubtitle'))$('drawerSubtitle').textContent=labels[role]||'';
 const first={customer:'overview',organizer:'organizer',insurer:'insurer'}[role]||'overview';
 showPage(first);
 openPortalNavState(first);
}
function openPortalNavState(id){
 document.querySelectorAll('.bottom-link').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
}
function exitPortal(){
 closeDrawer();
 state.portal=null;
 document.body.classList.remove('portal-active','portal-customer','portal-organizer','portal-insurer');
 $('roleGateway').hidden=false;
 $('exitPortalBtn').hidden=true;$('portalChip').hidden=true;$('menuTrigger').hidden=true;
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 document.querySelectorAll('.nav button,.bottom-link').forEach(b=>b.classList.remove('active'));
 window.scrollTo({top:0,behavior:'smooth'});
}
function showPage(id){
 const target=$(id);if(!target)return;
 const allowed={
  customer:['overview','events','booking','payment','wallet','incident','account'],
  organizer:['organizer','incident','account'],
  insurer:['insurer','insurerPolicies','incident','account']
 };
 if(state.portal && !allowed[state.portal]?.includes(id))return;
 document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));
 document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
 if(id==='wallet')renderWallet();
 if(id==='payment')renderPaymentSummary();
 if(id==='incident'){renderIncidents();if(state.portal==='customer'){renderClaimTicketOptions();renderClaims();}}
 if(id==='insurer')renderClaims();
 if(id==='events'){renderCategoryCards();renderEventCatalog()}
 openPortalNavState(id);
 window.scrollTo({top:0,behavior:'smooth'});
}
function showBookingFeedback(message){
 const msg=$('bookingMsg');
 if(!msg)return;
 msg.className='notice warn';msg.classList.remove('hide');msg.textContent=message;
 msg.scrollIntoView({behavior:'smooth',block:'center'});
}
function goToPayment(){
 try{
  const msg=$('bookingMsg');
  if(!state.selectedEvent){
   // Recover the selected catalogue item if the page was restored with its form values.
   const eventText=$('eventName')?.value?.trim();
   state.selectedEvent=HIMA_EVENTS.find(e=>e.name===eventText)||null;
  }
  if(!state.selectedEvent){showBookingFeedback('اختاري فعالية من صفحة استكشف الفعاليات أولًا.');return}
  if(!$('agreeDemo')?.checked){showBookingFeedback('يرجى تحديد مربع الإقرار بأن هذه تجربة افتراضية قبل المتابعة للدفع.');return}
  const ticketSelect=$('ticketType');
  if(!ticketSelect){showBookingFeedback('تعذر قراءة فئة التذكرة. أعيدي اختيار التذكرة ثم حاولي مرة أخرى.');return}
  const base=Number(ticketSelect.value),pack=getSelectedCoverPackage();
  state.pendingBooking={event:state.selectedEvent,type:ticketSelect.selectedOptions?.[0]?.text||'فئة التذكرة',base,cover:!!pack,coverPackage:pack?pack.name:null,coverLevel:pack?pack.level:null,coverPrice:pack?pack.price:0,total:base+(pack?pack.price:0),date:state.selectedEvent.date,location:`${state.selectedEvent.region} — ${state.selectedEvent.city}`,venue:state.selectedEvent.venue};
  renderPaymentSummary();
  $('paymentMsg')?.classList.add('hide');
  showPage('payment');
  if(!$('payment')?.classList.contains('active'))throw new Error('تعذر فتح صفحة الدفع من بوابة المستفيد.');
 }catch(error){
  console.error('HIMA payment navigation:',error);
  showBookingFeedback('تعذر الانتقال إلى الدفع. تأكدي من اختيار التذكرة ثم أعيدي المحاولة.');
 }
}
function renderPaymentSummary(){
 const b=state.pendingBooking;if(!b)return;
 const values={paymentEventName:b.event?.name||'',paymentTicketType:b.type||'',paymentBasePrice:(b.base??0)+' ر.س',paymentCoverPackage:b.coverPackage||'بدون حماية',paymentCoverPrice:(b.coverPrice??0)+' ر.س',paymentTotal:(b.total??0)+' ر.س'};
 Object.entries(values).forEach(([id,value])=>{const el=$(id);if(el)el.textContent=value});
}
function confirmPayment(){
 const b=state.pendingBooking,msg=$('paymentMsg');if(!b){msg.className='notice warn';msg.classList.remove('hide');msg.textContent='لا يوجد طلب جاهز للدفع. عودي إلى اختيار الفعالية والتذكرة.';return}
 const method=document.querySelector('input[name="paymentMethod"]:checked')?.value||'Apple Pay';
 const stamp=String(Date.now()).slice(-6);
 state.ticket={id:'TKT-HIMA-'+stamp,event:b.event.name,type:b.type,base:b.base,cover:b.cover,coverPackage:b.coverPackage,coverLevel:b.coverLevel,coverPrice:b.coverPrice,total:b.total,date:b.date,certificate:b.cover?'HIMA-CERT-DEMO-'+stamp:null,location:b.location,venue:b.venue,paymentMethod:method,paymentStatus:'مدفوع تجريبيًا'};
 state.pendingBooking=null;renderWallet();showPage('wallet');
}
function resetDemo(){if(!confirm(state.lang==='ar'?'هل تريد إعادة ضبط بيانات التجربة؟':'Reset demo data?'))return;state.ticket=null;state.pendingBooking=null;state.incidents=[];state.claims=[];state.risk=0;state.selectedEvent=null;$('agreeDemo').checked=false;document.querySelectorAll('input[name="coverPackage"]').forEach(input=>input.checked=false);updateTotal();renderWallet();renderIncidents();renderClaims();renderClaimTicketOptions();if(state.portal==='customer')showPage('overview');else if(state.portal==='organizer')showPage('organizer');else if(state.portal==='insurer')showPage('insurer');else exitPortal()}
// Initialize guided experience and region selectors.
fillRegions($('filterRegion'));updateCityOptions();fillRegions($('organizerRegion'),false);if($('organizerRegion'))$('organizerRegion').value='الرياض';updateOrganizerCities();renderOrganizerEvents();renderCategoryCards();renderEventCatalog();
// Extend icon set for the new primary navigation.
himaIcons.events=himaIcons.booking;himaIcons.account=himaIcons.wallet;

// Start at the role-selection gateway; users choose a portal before seeing its workspace.
document.body.classList.remove('portal-active');document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));if($('roleGateway'))$('roleGateway').hidden=false;

// V9 startup: return to the portal-selection landing page.
closeDrawer();document.body.classList.remove('portal-active','portal-customer','portal-organizer','portal-insurer');state.portal=null;if($('roleGateway'))$('roleGateway').hidden=false;if($('menuTrigger'))$('menuTrigger').hidden=true;if($('customerBottomNav'))$('customerBottomNav').style.display='none';

// Ensure inline booking controls can always invoke the payment transition.
window.goToPayment=goToPayment;


