# حِمى | HIMA — V10
هذه النسخة تعيد صفحة اختيار البوابة أولاً، ثم تعرض مساحة مستقلة لكل طرف.

## البوابات
- المستفيد: قائمة جانبية خاصة به + شريط تنقل سفلي بأيقونات التطبيق.
- منظم الفعالية: قائمة جانبية خاصة بالمنظم، تربط بيانات الفعالية ومؤشرات المخاطر والوثائق وسجل الحوادث.
- شركة التأمين: قائمة جانبية خاصة بالشركة، تربط المطالبات والوثائق والتغطيات وسجل الحوادث وضوابط المراجعة.

## الرفع على GitHub Pages
ارفعي الملفات الأربعة في نفس المجلد الرئيسي للمستودع:
- index.html
- style.css
- app.js
- README.md

لا ترفعي index.html وحده لأن التنسيق والوظائف موجودة في الملفين الآخرين.
النموذج تجريبي ببيانات افتراضية ولا ينفذ إصدار وثائق أو قرارات تعويض فعلية.


تم تحسين صفحة اختيار البوابة في V10 مع الحفاظ على البوابات والقوائم المنفصلة.


## V11 updates
- The attendee claim summary / next-steps card is sticky on desktop so it remains visible while scrolling, without overlaying the rest of the page; on small screens it returns to normal document flow.
- Booking now proceeds to a separate demo payment page with Apple Pay, Mada, and bank-card options. Confirming the simulated payment creates the ticket and redirects to the ticket wallet. No real payment is processed.


## V12 hotfix
- Fixed the attendee "Continue to payment" action with explicit global binding, visible validation feedback, guarded summary rendering, and a clear error message if navigation fails.
- Kept the claim summary / "What happens after submission?" panel sticky at iPad and tablet widths instead of disabling sticky positioning under 800px.
- Updated local asset cache versions to v12.
- All payment processing remains a prototype simulation; no real payment gateway is connected.
