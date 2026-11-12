
const state={lang:'ar',ticket:null,incidents:[],claims:[],risk:0,portal:null};
const $=id=>document.getElementById(id);
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));if(id==='wallet')renderWallet();if(id==='incident')renderIncidents();if(id==='insurer')renderClaims();window.scrollTo({top:0,behavior:'smooth'})}
function toggleLang(){state.lang=state.lang==='ar'?'en':'ar';document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==='ar'?'rtl':'ltr';$('langBtn').textContent=state.lang==='ar'?'English':'العربية';document.querySelectorAll('[data-ar]').forEach(el=>el.textContent=el.dataset[state.lang]);document.querySelectorAll('.nav button').forEach(b=>{const icon=b.querySelector('.nav-icon');b.textContent=b.dataset[state.lang];if(icon)b.prepend(icon)});$('brandTitle').textContent=state.lang==='ar'?'حِمى | HIMA':'HIMA | حِمى';$('brandSub').textContent=state.lang==='ar'?'منظومة التأمين الذكي وإدارة مخاطر الفعاليات':'Smart insurance & event risk management';$('resetBtn').textContent=state.lang==='ar'?'إعادة ضبط التجربة':'Reset demo';$('heroTag').textContent=state.lang==='ar'?'نموذج أولي تفاعلي • بيانات افتراضية':'Interactive prototype • Demo data';$('heroTitle').textContent=state.lang==='ar'?'من التذكرة إلى المطالبة، في رحلة واحدة':'From ticket to claim, in one journey';$('heroText').textContent=state.lang==='ar'?'تربط حِمى منظم الفعالية وحامل التذكرة وشركة التأمين عبر مسارين تأمينيين منفصلين، وسجل رقمي موحد للحوادث والمطالبات.':'HIMA connects event organizers, ticket holders and insurers through two distinct insurance paths and a linked incident and claim record.';$('heroStep1').textContent=state.lang==='ar'?'إدارة مخاطر المنظم':'Organizer risk management';$('heroStep2').textContent=state.lang==='ar'?'حماية اختيارية للحضور':'Optional attendee protection';$('heroStep3').textContent=state.lang==='ar'?'بصمة الحادث التأمينية':'Insurance incident fingerprint';$('footerText').textContent=state.lang==='ar'?'حِمى | HIMA — نموذج أولي للاختبار والتطوير فقط. لا يمثل وثيقة تأمين أو عرضًا تأمينيًا أو تكاملًا فعليًا مع أي جهة.':'HIMA — prototype for testing and development only. Not an insurance policy, offer or live integration.';
const gatewayText={ar:{title:'اختر نوع الدخول',sub:'حدد الجهة التي تمثلك للوصول إلى خدمات حِمى.',customer:'المستفيد',customerDesc:'استكشف الفعاليات، احجز تذكرتك، وأضف الحماية التأمينية الاختيارية.',customerAction:'دخول المستفيد',organizer:'منظم الفعالية',organizerDesc:'سجّل فعاليتك، قيّم المخاطر، وتابع طلبات ووثائق التأمين.',organizerAction:'دخول المنظم',insurer:'شركة التأمين',insurerDesc:'راجع طلبات التأمين، التغطيات، الحوادث والمطالبات.',insurerAction:'دخول شركة التأمين'},en:{title:'Choose your portal',sub:'Select the role that best describes you to access HIMA services.',customer:'Attendee',customerDesc:'Explore events, book tickets and add optional insurance protection.',customerAction:'Enter attendee portal',organizer:'Event organizer',organizerDesc:'Register events, assess risks and track insurance requests and policies.',organizerAction:'Enter organizer portal',insurer:'Insurance company',insurerDesc:'Review insurance requests, coverage, incidents and claims.',insurerAction:'Enter insurer portal'}};
const gt=gatewayText[state.lang];if($('gatewayTitle'))$('gatewayTitle').textContent=gt.title;if($('gatewaySub'))$('gatewaySub').textContent=gt.sub;
['customer','organizer','insurer'].forEach(k=>{const t=$(k+'RoleTitle'),d=$(k+'RoleDesc'),a=$(k+'RoleAction');if(t)t.textContent=gt[k];if(d)d.textContent=gt[k+'Desc'];if(a)a.textContent=gt[k+'Action']});
renderWallet();renderIncidents();renderClaims()}
function calculateRisk(){let cap=+$('capacity').value||1,att=+$('attendance').value||0,crowd=+$('crowd').value,safety=+$('safety').value;let ratio=Math.min(1.5,att/cap);let score=Math.round(Math.min(100,ratio*45+crowd*12+(4-safety)*12));state.risk=score;$('statCapacity').textContent=cap.toLocaleString();$('statAttendance').textContent=att.toLocaleString();let label=score>=70?'مرتفع':score>=45?'متوسط':'منخفض';$('riskResult').innerHTML=`<b>المؤشر التوضيحي: ${score}/100 — ${label}</b><br>نتيجة افتراضية تعتمد على مدخلات السعة والحضور والازدحام وجاهزية السلامة. لا تستخدم للتسعير أو قرارات السلامة الفعلية.`}
function updateTotal(){let base=+$('ticketType').value,cover=$('addCover').checked?5:0;$('basePrice').textContent=base+' ر.س';$('coverPrice').textContent=cover+' ر.س';$('totalPrice').textContent=(base+cover)+' ر.س'}
function issueTicket(){let msg=$('bookingMsg');if(!$('agreeDemo').checked){msg.classList.remove('hide');msg.className='notice warn';msg.textContent='يرجى تأكيد فهمك أن هذه تجربة افتراضية قبل إصدار التذكرة.';return}let base=+$('ticketType').value,cover=$('addCover').checked;state.ticket={id:'TKT-HIMA-0001',event:$('eventName').value||'فعالية تجريبية',type:$('ticketType').selectedOptions[0].text,base,cover,coverPrice:cover?5:0,total:base+(cover?5:0),date:'24 نوفمبر 2026',certificate:cover?'HIMA-CERT-DEMO-001':null};msg.classList.remove('hide');msg.className='notice good';msg.textContent='تم إنشاء تذكرة تجريبية بنجاح. يمكنك مشاهدتها في محفظة التذاكر.';renderWallet()}
function renderWallet(){let el=$('walletContent');if(!state.ticket){el.className='empty';el.textContent=state.lang==='ar'?'لا توجد تذاكر بعد. انتقل إلى «حجز التذكرة» لإنشاء تذكرة تجريبية.':'No tickets yet. Go to Ticket booking to create a demo ticket.';return}let t=state.ticket;el.className='ticket';el.innerHTML=`<div class="tickethead"><div><span class="pill green">HIMA • DEMO</span><h2>${escapeHtml(t.event)}</h2><p class="muted">${t.date}</p></div><div class="qr" aria-label="نمط QR توضيحي"></div></div><hr style="border:0;border-top:1px dashed #c9b8e2"><div class="row"><span>رقم التذكرة</span><b class="ticketcode">${t.id}</b></div><div class="row"><span>الفئة</span><b>${escapeHtml(t.type)}</b></div><div class="row"><span>قيمة التذكرة</span><b>${t.base} ر.س</b></div><div class="row"><span>حماية حِمى</span><b>${t.cover?'مضافة — 5 ر.س':'غير مضافة'}</b></div><div class="row"><b>الإجمالي التجريبي</b><b>${t.total} ر.س</b></div>${t.cover?`<div class="notice good"><b>شهادة حماية تجريبية</b><br>المرجع: ${t.certificate}<br>هذه ليست وثيقة تأمين فعلية.</div>`:`<div class="notice warn">لم تتم إضافة الحماية الاختيارية. يمكن فحص مسار مسؤولية المنظم بشكل مستقل إذا وقعت واقعة.</div>`}<button class="btn secondary" onclick="showPage('incident')">الانتقال إلى بصمة الحادث / المطالبة</button>`}
function createIncident(){let id='INC-HIMA-'+String(state.incidents.length+1).padStart(3,'0');let incident={id,type:$('incidentType').value,location:$('incidentLocation').value,description:$('incidentDescription').value,time:$('incidentTime').value||new Date().toLocaleString('sv-SE'),event:$('eventName').value};state.incidents.push(incident);$('incidentMsg').className='notice good';$('incidentMsg').classList.remove('hide');$('incidentMsg').textContent='تم إنشاء بصمة الحادث: '+id+' — سجل تجريبي.';renderIncidents();$('claimIncident').value=id}
function renderIncidents(){let el=$('incidentList');if(!state.incidents.length){el.className='empty';el.textContent='لا توجد حوادث مسجلة.';return}el.className='tablewrap';el.innerHTML='<table><thead><tr><th>رقم الواقعة</th><th>النوع</th><th>الموقع</th><th>الوصف</th></tr></thead><tbody>'+state.incidents.map(i=>`<tr><td><b>${i.id}</b></td><td>${escapeHtml(i.type)}</td><td>${escapeHtml(i.location)}</td><td>${escapeHtml(i.description)}</td></tr>`).join('')+'</tbody></table>'}
function submitClaim(){let ticket=$('claimTicket').value.trim(),incident=$('claimIncident').value.trim(),t=state.ticket;let msg=$('claimMsg');if(!ticket||!incident){msg.className='notice warn';msg.classList.remove('hide');msg.textContent='أدخل رقم التذكرة ورقم الحادث.';return}let knownTicket=!!(t&&ticket===t.id),knownIncident=state.incidents.some(i=>i.id===incident);let coverage=knownTicket&&t.cover;let claim={id:'CLM-HIMA-'+String(state.claims.length+1).padStart(3,'0'),ticket,incident,description:$('claimDescription').value,docs:$('claimDocs').value,knownTicket,knownIncident,coverage,status:'قيد المراجعة الأولية'};state.claims.push(claim);msg.className='notice '+(knownTicket&&knownIncident?'good':'warn');msg.classList.remove('hide');msg.textContent=`تم تسجيل المطالبة ${claim.id}. ${knownTicket?'التذكرة مطابقة.':'التذكرة تحتاج تحققًا.'} ${knownIncident?'الواقعة مسجلة.':'الواقعة غير موجودة في السجل وتحتاج تحققًا.'} ${coverage?'توجد حماية حوادث شخصية تجريبية.':'لا توجد حماية شخصية مسجلة؛ يمكن فحص مسؤولية المنظم بصورة مستقلة.'}`;renderClaims()}
function renderClaims(){let el=$('claimsList');if(!state.claims.length){el.className='empty';el.textContent='لا توجد مطالبات واردة بعد.';return}el.className='tablewrap';el.innerHTML='<table><thead><tr><th>رقم المطالبة</th><th>التذكرة</th><th>الواقعة</th><th>التحقق الأولي</th><th>الحالة</th><th>إجراء المراجع</th></tr></thead><tbody>'+state.claims.map((c,i)=>`<tr><td><b>${c.id}</b></td><td>${escapeHtml(c.ticket)}</td><td>${escapeHtml(c.incident)}</td><td>${c.knownTicket?'التذكرة موجودة':'التذكرة تحتاج تحقق'} / ${c.knownIncident?'الواقعة مسجلة':'الواقعة تحتاج تحقق'} / ${c.coverage?'حماية شخصية موجودة':'لا توجد حماية شخصية'}</td><td><span class="pill amber">${c.status}</span></td><td><select onchange="updateClaim(${i},this.value)"><option value="">اختر إجراءً</option><option>طلب مستندات إضافية</option><option>إحالة لمراجعة مختص</option><option>استكمال التحقق</option><option>قيد الدراسة لدى المختص</option></select></td></tr>`).join('')+'</tbody></table><div class="notice warn">تحديث الحالة محاكاة لسير المراجعة فقط. لا يوجد قرار قبول أو رفض أو صرف تعويض تلقائي.</div>'}
function updateClaim(i,status){if(!status)return;state.claims[i].status=status;renderClaims()}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function resetDemo(){if(!confirm(state.lang==='ar'?'هل تريد إعادة ضبط بيانات التجربة؟':'Reset demo data?'))return;state.ticket=null;state.incidents=[];state.claims=[];state.risk=0;$('agreeDemo').checked=false;$('addCover').checked=false;updateTotal();renderWallet();renderIncidents();renderClaims();if(state.portal==='customer')showPage('overview');else if(state.portal==='organizer')showPage('organizer');else if(state.portal==='insurer')showPage('insurer');else exitPortal()}
$('incidentTime').value=new Date().toISOString().slice(0,16);updateTotal();


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
function eventCard(e){return `<article class="event-card"><div class="event-art art-${e.category}"><span>${HIMA_CATEGORIES.find(c=>c.id===e.category)?.icon||'✨'}</span><small>${categoryLabel(e.category)}</small></div><div class="event-card-body"><h4>${escapeHtml(e.name)}</h4><p class="muted">📍 ${e.city} • ${e.venue}</p><p class="muted">🗓️ ${e.date}</p><div class="event-card-foot"><b>${e.price} ر.س <small>سعر تجريبي</small></b><button class="btn" onclick="chooseHimaEvent('${e.id}')">اختيار الفعالية</button></div></div></article>`}
function renderCategoryCards(){const html=HIMA_CATEGORIES.map(c=>`<button class="category-card" onclick="selectHimaCategory('${c.id}')"><span>${c.icon}</span><b>${c.name}</b><small>${c.desc}</small></button>`).join('');if($('homeCategories'))$('homeCategories').innerHTML=html;if($('eventCategoryFilters'))$('eventCategoryFilters').innerHTML=`<button class="category-filter ${state.selectedCategory==='all'?'selected':''}" onclick="selectHimaCategory('all')">الكل</button>`+HIMA_CATEGORIES.map(c=>`<button class="category-filter ${state.selectedCategory===c.id?'selected':''}" onclick="selectHimaCategory('${c.id}')">${c.icon} ${c.name}</button>`).join('')}
function selectHimaCategory(id){state.selectedCategory=id;renderCategoryCards();renderEventCatalog();showPage('events')}
function renderEventCatalog(){const region=$('filterRegion')?.value||'all',city=$('filterCity')?.value||'all';let list=HIMA_EVENTS.filter(e=>(state.selectedCategory==='all'||e.category===state.selectedCategory)&&(region==='all'||e.region===region)&&(city==='all'||e.city===city));if($('eventCatalog'))$('eventCatalog').innerHTML=list.length?list.map(eventCard).join(''):'<div class="empty">لا توجد فعاليات تجريبية ضمن هذه الاختيارات. جرّب منطقة أو تصنيفًا آخر.</div>';if($('catalogTitle'))$('catalogTitle').textContent=state.selectedCategory==='all'?'كل الفعاليات':categoryLabel(state.selectedCategory);if($('catalogCount'))$('catalogCount').textContent=`${list.length} فعالية تجريبية متاحة ضمن الاختيارات`}
function fillRegions(select,includeAll=true){if(!select)return;select.innerHTML=(includeAll?'<option value="all">كل مناطق المملكة</option>':'')+Object.keys(HIMA_REGIONS).map(r=>`<option value="${r}">${r}</option>`).join('')}
function updateCityOptions(){const region=$('filterRegion')?.value||'all',sel=$('filterCity');if(!sel)return;let cities=region==='all'?[...new Set(Object.values(HIMA_REGIONS).flat())]:HIMA_REGIONS[region]||[];sel.innerHTML='<option value="all">كل المدن</option>'+cities.map(c=>`<option value="${c}">${c}</option>`).join('')}
function chooseHimaEvent(id){const ev=HIMA_EVENTS.find(e=>e.id===id);if(!ev)return;state.selectedEvent=ev;$('eventName').value=ev.name;$('eventType').value=ev.kind;$('eventLocation').value=`${ev.region} — ${ev.city} — ${ev.venue}`;$('bookingEvent').textContent=ev.name;$('selectedEventName').textContent=ev.name;$('ticketType').innerHTML=[['العادية',ev.price],['المميزة',ev.price+100],['الذهبية',ev.price+200]].map(([n,p])=>`<option value="${p}">الفئة ${n} — ${p} ر.س</option>`).join('');$('bookingEvent').nextElementSibling.textContent=`${ev.region} • ${ev.city} • ${ev.date}`;updateTotal();showPage('booking')}
function renderOrganizerEvents(){const cat=$('organizerType')?.value||'sports',sel=$('organizerEvent');if(!sel)return;const list=HIMA_EVENTS.filter(e=>e.category===cat);sel.innerHTML=list.map(e=>`<option value="${e.id}">${e.name} — ${e.city}</option>`).join('');syncOrganizerEvent()}
function updateOrganizerCities(){const region=$('organizerRegion')?.value||Object.keys(HIMA_REGIONS)[0],sel=$('organizerCity');if(!sel)return;sel.innerHTML=(HIMA_REGIONS[region]||[]).map(c=>`<option>${c}</option>`).join('');syncOrganizerEvent()}
function syncOrganizerEvent(){const ev=HIMA_EVENTS.find(e=>e.id===$('organizerEvent')?.value);if(!ev)return;$('eventName').value=ev.name;$('eventType').value=ev.kind;$('eventLocation').value=`${$('organizerRegion')?.value||ev.region} — ${$('organizerCity')?.value||ev.city} — ${ev.venue}`}
function enterPortal(role){
 state.portal=role;
 document.body.classList.remove('portal-customer','portal-organizer','portal-insurer');
 document.body.classList.add('portal-active','portal-'+role);
 $('roleGateway').hidden=true;
 $('exitPortalBtn').hidden=false;
 $('portalChip').hidden=false;
 const labels={customer:'بوابة المستفيد',organizer:'بوابة منظم الفعالية',insurer:'بوابة شركة التأمين'};
 $('portalChip').textContent=labels[role]||'';
 document.querySelectorAll('.nav button').forEach(b=>{b.hidden=b.dataset.portal!==role});
 const first={customer:'overview',organizer:'organizer',insurer:'insurer'}[role]||'overview';
 showPage(first);
}
function exitPortal(){
 state.portal=null;
 document.body.classList.remove('portal-active','portal-customer','portal-organizer','portal-insurer');
 $('roleGateway').hidden=false;
 $('exitPortalBtn').hidden=true;
 $('portalChip').hidden=true;
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 document.querySelectorAll('.nav button').forEach(b=>{b.hidden=false;b.classList.remove('active')});
 window.scrollTo({top:0,behavior:'smooth'});
}
function showPage(id){
 const target=document.getElementById(id);
 if(!target)return;
 const allowed={customer:['overview','events','booking','wallet','incident','account'],organizer:['organizer'],insurer:['insurer']};
 if(state.portal && !allowed[state.portal]?.includes(id))return;
 document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));
 document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
 if(id==='wallet')renderWallet();
 if(id==='incident')renderIncidents();
 if(id==='insurer')renderClaims();
 if(id==='events'){renderCategoryCards();renderEventCatalog()}
 window.scrollTo({top:0,behavior:'smooth'});
}
function issueTicket(){const msg=$('bookingMsg');if(!state.selectedEvent){msg.className='notice warn';msg.classList.remove('hide');msg.textContent='اختاري فعالية من صفحة استكشف الفعاليات أولًا.';return}if(!$('agreeDemo').checked){msg.className='notice warn';msg.classList.remove('hide');msg.textContent='يرجى تأكيد فهمك أن هذه تجربة افتراضية قبل إصدار التذكرة.';return}const base=+$('ticketType').value,cover=$('addCover').checked;state.ticket={id:'TKT-HIMA-'+String(Date.now()).slice(-6),event:state.selectedEvent.name,type:$('ticketType').selectedOptions[0].text,base,cover,coverPrice:cover?5:0,total:base+(cover?5:0),date:state.selectedEvent.date,certificate:cover?'HIMA-CERT-DEMO-'+String(Date.now()).slice(-5):null,location:`${state.selectedEvent.region} — ${state.selectedEvent.city}`};msg.className='notice good';msg.classList.remove('hide');msg.textContent='تم إنشاء تذكرة تجريبية بنجاح. يمكنك مشاهدتها في محفظة التذاكر.';renderWallet()}
function resetDemo(){if(!confirm(state.lang==='ar'?'هل تريد إعادة ضبط بيانات التجربة؟':'Reset demo data?'))return;state.ticket=null;state.incidents=[];state.claims=[];state.risk=0;state.selectedEvent=null;$('agreeDemo').checked=false;$('addCover').checked=false;updateTotal();renderWallet();renderIncidents();renderClaims();if(state.portal==='customer')showPage('overview');else if(state.portal==='organizer')showPage('organizer');else if(state.portal==='insurer')showPage('insurer');else exitPortal()}
// Initialize guided experience and region selectors.
fillRegions($('filterRegion'));updateCityOptions();fillRegions($('organizerRegion'),false);if($('organizerRegion'))$('organizerRegion').value='الرياض';updateOrganizerCities();renderOrganizerEvents();renderCategoryCards();renderEventCatalog();
// Extend icon set for the new primary navigation.
himaIcons.events=himaIcons.booking;himaIcons.account=himaIcons.wallet;

// Start at the role-selection gateway; users choose a portal before seeing its workspace.
document.body.classList.remove('portal-active');document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));if($('roleGateway'))$('roleGateway').hidden=false;
