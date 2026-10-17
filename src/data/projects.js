// Bilingual content: every user-facing string is { en, ar }.
// `live` stays null until the project is deployed; the Live button is hidden while it is null.
const f = (en, ar) => ({ en, ar })

export const projects = [
  {
    id: 'coffee-store',
    image: 'coffee-store',
    featured: true,
    title: f('Ember Roastery', 'إمبر روستري'),
    kind: f('Full-stack store and admin dashboard', 'متجر كامل ولوحة تحكم'),
    summary: f(
      'A specialty-coffee shop for Egypt: a customer storefront and a live admin dashboard on one Next.js app and one Postgres database. An order placed in the store appears in the dashboard.',
      'متجر قهوة مختصة لمصر: واجهة متجر للعملاء ولوحة تحكم مباشرة داخل تطبيق Next.js واحد وقاعدة بيانات Postgres واحدة. الطلب الذي يتم في المتجر يظهر في اللوحة.',
    ),
    highlights: [
      f('Arabic (RTL) and English, light and dark, phone first', 'عربي (RTL) وإنجليزي، فاتح وداكن، يبدأ بالموبايل'),
      f('Checkout with test gateway, stock-safe orders, PDF invoices', 'إتمام شراء ببوابة تجريبية وطلبات آمنة للمخزون وفواتير PDF'),
      f('139 unit tests, 240+ end-to-end tests, Storybook design system', '139 اختبار وحدة وأكثر من 240 اختبار شامل ونظام تصميم في Storybook'),
      f('Lighthouse mobile 90+, accessibility 100', 'Lighthouse على الموبايل 90+ وإمكانية الوصول 100'),
    ],
    stack: ['Next.js', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Playwright'],
    live: 'https://coffee-ten-khaki.vercel.app',
    code: 'https://github.com/mostafa-m-m-m/coffee',
  },
  {
    id: 'masar',
    image: 'masar',
    title: f('Masar Car Rental', 'مسار لتأجير السيارات'),
    kind: f('Booking flow (concept project)', 'رحلة حجز (مشروع تصوري)'),
    summary: f(
      'Search a catalog, pick dates, see a live price breakdown with VAT, and make a validated reservation you can manage later.',
      'ابحث في الكتالوج وحدد التواريخ وشاهد السعر لحظيًا مع الضريبة واحجز بعد تحقق من البيانات وأدِر حجزك لاحقًا.',
    ),
    highlights: [
      f('Pure, unit-tested pricing and date logic; no double bookings', 'منطق أسعار وتواريخ نقي مختبَر ومنع الحجز المزدوج'),
      f('Filters, sorting and search live in the URL', 'الفلاتر والترتيب والبحث محفوظة في الرابط'),
      f('Lighthouse accessibility 100 on every page, both languages', 'إمكانية الوصول 100 في كل الصفحات وباللغتين'),
    ],
    stack: ['React 19', 'Vite', 'React Router', 'CSS', 'Vitest', 'Playwright'],
    live: null,
    code: 'https://github.com/mostafa-m-m-m/cars-website',
  },
  {
    id: 'forma',
    image: 'forma',
    title: f('Forma Fitness', 'فورما فيتنس'),
    kind: f('Bilingual gym website (concept project)', 'موقع جيم بلغتين (مشروع تصوري)'),
    summary: f(
      'Programs, a filterable class schedule, membership plans with a validated join dialog, a gallery lightbox and a BMI calculator.',
      'برامج وجدول حصص قابل للتصفية واشتراكات بنافذة انضمام مع تحقق ومعرض صور وحاسبة مؤشر كتلة الجسم.',
    ),
    highlights: [
      f('Full RTL, localized numbers, prices and times', 'دعم RTL كامل وأرقام وأسعار وأوقات محلية'),
      f('Accessible dialog, accordion, carousel and lightbox', 'نافذة وأكورديون وكاروسيل ومعرض صور متاحة للجميع'),
      f('Lighthouse mobile 98 / 100 / 100 / 100', 'Lighthouse على الموبايل 98 / 100 / 100 / 100'),
    ],
    stack: ['React 19', 'Vite', 'React Router', 'CSS', 'Vitest', 'Playwright'],
    live: null,
    code: 'https://github.com/mostafa-m-m-m/vawuLens--website',
  },
  {
    id: 'spotify',
    image: 'spotify',
    title: f('Spotify Web Player', 'مشغّل ويب بأسلوب سبوتيفاي'),
    kind: f('Music player', 'مشغّل موسيقى'),
    summary: f(
      'Search real artists, albums and songs from the iTunes API, build playlists, queue tracks and listen to previews. The UI takes its colors from the album art.',
      'ابحث عن فنانين وألبومات وأغانٍ حقيقية من iTunes API وكوّن قوائم تشغيل وأضف للطابور واستمع للمقاطع. وألوان الواجهة مأخوذة من غلاف الألبوم.',
    ),
    highlights: [
      f('Queue, shuffle, repeat, keyboard shortcuts, Media Session', 'طابور وعشوائي وتكرار واختصارات كيبورد وMedia Session'),
      f('Colors extracted from the cover with a canvas sampler', 'ألوان مستخرجة من الغلاف باستخدام canvas'),
      f('31 unit tests; Lighthouse desktop 97 / 100 / 100 / 100', '31 اختبار وحدة؛ Lighthouse على الديسكتوب 97 / 100 / 100 / 100'),
    ],
    stack: ['React 19', 'Vite', 'React Router', 'iTunes API', 'Vitest', 'Playwright'],
    live: null,
    code: 'https://github.com/mostafa-m-m-m/Spotify-page',
  },
]
