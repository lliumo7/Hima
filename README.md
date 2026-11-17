# HIMA — تطوير بوابتي المنظم وشركة التأمين وإدارة الفعاليات

هذه النسخة مبنية على الملف الذي حدده المستخدم كأساس (HIMA_Same_App_Organizer_Insurer_Upgrade_Icons_Updated). تم الحفاظ على ملفات بوابة المستفيد وأصول الصور والأيقونات الأصلية، وإضافة صفحات خدمات مستقلة للمنظم وشركة التأمين.

## الملفات
- `index.html`
- `style.css`
- `app.js`
- `hima-icons.js`
- `hima-workflows.js`
- `assets/events/` صور الفعاليات حسب النوع

## التحديثات
- لوحة رئيسية مستقلة للمنظم وشركة التأمين.
- صفحات مستقلة لخدمات المنظم: جميع الفعاليات، إضافة فعالية، طلب تأمين الفعالية، متابعة الطلبات، المخاطر والسلامة، والوثائق.
- صفحات مستقلة لخدمات شركة التأمين: طلبات تأمين الفعاليات، تقييم المخاطر، التغطيات وعروض الأسعار، الوثائق، مطالبات المستفيدين، والتقارير.
- يمكن للمنظم إضافة فعالية كمسودة أو نشرها مباشرة للمستفيد، مع صورة الفئة المناسبة تلقائيًا من صور المشروع.
- يمكن تعديل الفعاليات المضافة وإيقاف نشرها أو إعادة نشرها. إذا ارتبطت الفعالية بطلب تأمين، يؤدي الحذف إلى أرشفتها وإيقاف نشرها للحفاظ على سجل الطلب.
- طلب تأمين الفعالية مسار مستقل عن نشر الفعالية. تظهر الفعالية المنشورة للمستفيد حتى لو كان طلب التأمين قيد المراجعة، مع بيان حالة التأمين.
- تنتقل طلبات التأمين إلى بوابة شركة التأمين للمراجعة والقبول أو الرفض وإصدار وثيقة تجريبية عند القبول.
- مطالبات المستفيدين منفصلة عن طلبات تأمين الفعاليات وتأمين التذاكر الاختياري.
- تحفظ فعاليات المنظم وطلبات تأمين الفعاليات ووثائقها في `localStorage` على نفس المتصفح والجهاز.

## النشر
ارفع محتويات المجلد إلى جذر مستودع GitHub Pages بحيث يكون `index.html` في الجذر.

## حدود النسخة التجريبية
هذه تجربة Front-end وليست نظامًا متعدد المستخدمين متصلًا بخادم. البيانات المشتركة بين البوابات تعمل على المتصفح نفسه، ولا تتزامن تلقائيًا بين أجهزة مختلفة أو مستخدمين مختلفين. لا يوجد دفع فعلي أو تكامل مع شركة تأمين، والوثائق والقرارات ومؤشر المخاطر تجريبية فقط. لا تمثل أي وثيقة تغطية تأمينية فعلية.


## Continuity and navigation update
- Added `hima-persistence.js` to preserve the active portal, current page, key workflow records, language, and in-progress form values across refreshes using browser local storage.
- The active portal/page is restored after the workflow pages are initialized.
- Added clearer role dashboard cards and a stronger purple welcome banner for organizer and insurer portals.
- This is a browser-local prototype persistence layer; it does not synchronize data across different devices or browsers.


## V18 visual and ticket-flow refinements
- Ticket completion now refreshes the insured-ticket selector in the claim form immediately.
- Booking, payment, and claim pages use natural document scrolling instead of nested fixed-height scroll panes, with responsive single-column layout on smaller screens.
- Event category badges are compact and truncate long labels instead of appearing oversized.
- Organizer/insurer welcome banners use subtle decorative rings while preserving the purple HIMA identity.


## Organizer dashboard redesign
- Reworked only the organizer portal dashboard into a more structured overview with a photo-led welcome banner, KPI cards, workflow track, quick actions, recent-events table, publication summary, and upcoming events.
- Kept organizer navigation in the existing hamburger drawer.
- Kept attendee and insurer dashboard markup unchanged.
- Dashboard metrics are derived from the current local prototype event and insurance records.


Focused update: insurer portal entry now forces the redesigned insurer dashboard to open immediately when selecting the Insurance Company portal. The old intermediate landing/workspace transition is bypassed. Insurer hero text is right-aligned. Attendee and organizer portal logic and icons were not intentionally changed.
