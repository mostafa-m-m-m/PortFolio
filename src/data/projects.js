// Bilingual content: every user-facing string is { en, ar }.
// `live` stays null until the project is deployed; the Live button is hidden while it is null.
const f = (en, ar) => ({ en, ar })

export const projects = [
  {
    id: 'coffee-store',
    image: 'coffee-store',
    featured: true,
    title: f('Ember Roastery', 'إمبر روستري'),
    kind: f('Online store and admin dashboard', 'متجر إلكتروني ولوحة تحكم'),
    summary: f(
      'A coffee shop with a customer storefront and an admin dashboard on one database. Place an order in the store and it shows up in the dashboard.',
      'متجر قهوة بواجهة للعملاء ولوحة تحكم على قاعدة بيانات واحدة. اطلب من المتجر وشاهد الطلب يظهر في اللوحة.',
    ),
    highlights: [
      f('Arabic and English, light and dark', 'عربي وإنجليزي، فاتح وداكن'),
      f('Checkout with a test gateway, PDF invoices', 'إتمام شراء ببوابة تجريبية وفواتير PDF'),
      f('139 unit tests and 240+ end-to-end tests', '139 اختبار وحدة وأكثر من 240 اختبار شامل'),
    ],
    stack: ['Next.js', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Playwright'],
    live: 'https://coffee-ten-khaki.vercel.app',
    code: 'https://github.com/mostafa-m-m-m/coffee',
  },
  {
    id: 'masar',
    image: 'masar',
    title: f('Masar Car Rental', 'مسار لتأجير السيارات'),
    kind: f('Car booking site (concept)', 'موقع حجز سيارات (مشروع تصوري)'),
    summary: f(
      'Pick your dates, see the real total with VAT, and book a car. It will not let you book the same car twice for the same days.',
      'اختر التواريخ وشاهد الإجمالي الحقيقي مع الضريبة واحجز سيارة. ولن يسمح لك بحجز نفس السيارة مرتين في نفس الأيام.',
    ),
    highlights: [
      f('Price and date rules covered by unit tests', 'قواعد السعر والتواريخ مغطاة باختبارات وحدة'),
      f('Search and filters are kept in the URL', 'البحث والفلاتر محفوظة في الرابط'),
      f('Accessibility score 100 on every page', 'درجة إمكانية الوصول 100 في كل صفحة'),
    ],
    stack: ['React 19', 'Vite', 'React Router', 'CSS', 'Vitest', 'Playwright'],
    live: 'https://masar-car-rental.vercel.app',
    code: 'https://github.com/mostafa-m-m-m/cars-website',
  },
  {
    id: 'forma',
    image: 'forma',
    title: f('Forma Fitness', 'فورما فيتنس'),
    kind: f('Gym website (concept)', 'موقع جيم (مشروع تصوري)'),
    summary: f(
      'A gym site with a class schedule you can filter, membership plans with a sign-up dialog, and a photo gallery.',
      'موقع جيم بجدول حصص قابل للتصفية واشتراكات بنافذة تسجيل ومعرض صور.',
    ),
    highlights: [
      f('Full right-to-left layout, with local numbers, prices and times', 'تخطيط كامل من اليمين لليسار مع أرقام وأسعار وأوقات محلية'),
      f('Dialog, accordion and gallery work with a keyboard', 'النافذة والأكورديون والمعرض تعمل بلوحة المفاتيح'),
      f('Lighthouse mobile score of 98', 'درجة Lighthouse على الموبايل 98'),
    ],
    stack: ['React 19', 'Vite', 'React Router', 'CSS', 'Vitest', 'Playwright'],
    live: 'https://forma-fitness-six.vercel.app',
    code: 'https://github.com/mostafa-m-m-m/vawuLens--website',
  },
  {
    id: 'spotify',
    image: 'spotify',
    title: f('Spotify Web Player', 'مشغّل ويب بأسلوب سبوتيفاي'),
    kind: f('Music player', 'مشغّل موسيقى'),
    summary: f(
      'Search any artist, queue songs and make playlists. The page takes its colors from the album art.',
      'ابحث عن أي فنان وأضف أغاني للطابور وكوّن قوائم تشغيل. وألوان الصفحة مأخوذة من غلاف الألبوم.',
    ),
    highlights: [
      f('Real data from the iTunes API', 'بيانات حقيقية من iTunes API'),
      f('Keyboard shortcuts and lock-screen controls', 'اختصارات كيبورد وأزرار التحكم على شاشة القفل'),
      f('31 unit tests', '31 اختبار وحدة'),
    ],
    stack: ['React 19', 'Vite', 'React Router', 'iTunes API', 'Vitest', 'Playwright'],
    live: 'https://spotify-web-player-jet.vercel.app',
    code: 'https://github.com/mostafa-m-m-m/Spotify-page',
  },
]
