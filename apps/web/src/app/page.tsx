"use client";

import { useEffect, useState } from "react";

const WA_NUMBER = "971566678811"; // رقمك بصيغة دولية بدون +

type Lang = "en" | "ar";

const translations = {
  en: {
    brand: "CasePilot",
    builtFor: "Built for UAE Visa & Typing Offices",
    mvpSoon: "MVP coming soon",
    navFeatures: "Features",
    navPricing: "Pricing",
    navWa: "WhatsApp Early Access",
    navEarlyAccess: "Request Early Access",

    heroTitle: "Take Control of Every Visa Case.",
    heroDesc:
      "CasePilot gives typing centers and visa offices one clean dashboard to track applications, upload documents, and update status—without the chaos of WhatsApp + Excel.",
    ctaLeaveDetails: "Leave your details",
    ctaSeeHow: "See how it works",

    pills: ["No complex CRM", "Simple statuses", "Secure file uploads", "Modern UI"],

    mockToday: "Today",
    mockOverview: "Office overview",
    mockAddCase: "+ Add Case",
    kpiTotal: "Total Cases",
    kpiPending: "Pending",
    kpiApproved: "Approved",
    kpiOverdue: "Overdue",
    recentActivity: "Recent activity",
    activity1: "Status updated to Approved",
    activity2: "Passport uploaded",
    activity3: "New case created",
    meta1: "Ahmed • 2m ago",
    meta2: "Fatima • 18m ago",
    meta3: "Omar • 1h ago",

    featuresTitle: "Everything you need for V1.",
    featuresDesc: "Focused features for visa & typing offices—built for speed and clarity.",
    feat1Title: "Applications Dashboard",
    feat1Desc: "See all cases, statuses, and overdue items in one clean view.",
    feat2Title: "Simple Status Tracking",
    feat2Desc: "Pending → Submitted → Approved/Rejected with instant updates.",
    feat3Title: "Secure Document Uploads",
    feat3Desc: "Attach PDFs and IDs to each case, without messy folders.",

    pricingTitle: "Early access pricing",
    pricingDesc: "Founders price for the first 20 offices. Lock it for life.",
    starter: "Starter",
    priceSuffix: "AED / month",
    starterBullets: [
      "Up to 300 active cases",
      "2 staff accounts",
      "File uploads included",
      "Activity timeline",
    ],
    pricingCta: "Request early access",
    whatsNext: "What’s next",
    whatsNextDesc:
      "After V1 traction, we’ll add WhatsApp reminders, client portal, and reporting.",
    v1: "✅ V1: Tracking + uploads + status",
    v2: "⏭ V2: WhatsApp templates/reminders",
    v3: "⏭ V3: Client portal + analytics",

    earlyTitle: "Request Early Access",
    earlyDesc: "Share your details and we’ll reach out when the MVP is ready. (No spam.)",
    formName: "Name",
    formOffice: "Office name",
    formPhone: "Phone / WhatsApp",
    submit: "Submit",
    tip:
      "Tip: An email will be shared with your details and we will contact you as soon as possible.",
    footerRights: "All rights reserved.",
    footerBuiltFor: "Built for UAE Visa & Typing Offices.",
    langToggleEn: "EN",
    langToggleAr: "AR",
  },
  ar: {
    brand: "CasePilot",
    builtFor: "مصمم لمكاتب التأشيرات والطباعة في الإمارات",
    mvpSoon: "النسخة الأولى قريباً",
    navFeatures: "المميزات",
    navPricing: "الأسعار",
    navWa: "الوصول عبر واتساب",
    navEarlyAccess: "اطلب الوصول المبكر",

    heroTitle: "تحكم كامل في جميع معاملات التأشيرات.",
    heroDesc:
      "CasePilot يمنح مكاتب الطباعة والتأشيرات لوحة تحكم منظمة لمتابعة الطلبات ورفع الملفات وتحديث الحالة — بدون فوضى الواتساب والإكسل.",
    ctaLeaveDetails: "اترك بياناتك",
    ctaSeeHow: "شاهد طريقة العمل",

    pills: ["بدون CRM معقد", "حالات بسيطة", "رفع ملفات آمن", "واجهة حديثة"],

    mockToday: "اليوم",
    mockOverview: "ملخص المكتب",
    mockAddCase: "+ إضافة معاملة",
    kpiTotal: "إجمالي المعاملات",
    kpiPending: "قيد الانتظار",
    kpiApproved: "تمت الموافقة",
    kpiOverdue: "متأخرة",
    recentActivity: "آخر النشاطات",
    activity1: "تم تحديث الحالة إلى: تمت الموافقة",
    activity2: "تم رفع جواز السفر",
    activity3: "تم إنشاء معاملة جديدة",
    meta1: "أحمد • منذ دقيقتين",
    meta2: "فاطمة • منذ 18 دقيقة",
    meta3: "عمر • منذ ساعة",

    featuresTitle: "كل ما تحتاجه في الإصدار الأول.",
    featuresDesc: "مميزات مركزة لمكاتب التأشيرات والطباعة — بسرعة ووضوح.",
    feat1Title: "لوحة متابعة المعاملات",
    feat1Desc: "شاهد كل المعاملات والحالات والمتأخرات في شاشة واحدة.",
    feat2Title: "تتبع حالات بسيط",
    feat2Desc: "قيد الانتظار → تم الإرسال → مقبول/مرفوض مع تحديثات فورية.",
    feat3Title: "رفع مستندات آمن",
    feat3Desc: "أرفق ملفات PDF والهوية لكل معاملة بدون فوضى المجلدات.",

    pricingTitle: "سعر الوصول المبكر",
    pricingDesc: "سعر المؤسسين لأول 20 مكتب — ثبّته مدى الحياة.",
    starter: "الأساسي",
    priceSuffix: "درهم / شهرياً",
    starterBullets: [
      "حتى 300 معاملة نشطة",
      "حسابين للموظفين",
      "رفع ملفات متضمن",
      "سجل نشاطات",
    ],
    pricingCta: "اطلب الوصول المبكر",
    whatsNext: "القادم",
    whatsNextDesc:
      "بعد نجاح الإصدار الأول سنضيف تذكيرات واتساب، بوابة عملاء، وتقارير.",
    v1: "✅ V1: متابعة + رفع ملفات + حالات",
    v2: "⏭ V2: قوالب/تذكيرات واتساب",
    v3: "⏭ V3: بوابة عملاء + تحليلات",

    earlyTitle: "اطلب الوصول المبكر",
    earlyDesc: "شارك بياناتك وسنتواصل معك عند جاهزية النسخة الأولى. (بدون إزعاج)",
    formName: "الاسم",
    formOffice: "اسم المكتب",
    formPhone: "الهاتف / واتساب",
    submit: "إرسال",
    tip: "ملاحظة: استبدل رابط الفورم برابط Formspree الخاص بك أو API بسيطة.",

    footerRights: "جميع الحقوق محفوظة.",
    footerBuiltFor: "مصمم لمكاتب التأشيرات والطباعة في الإمارات.",
    langToggleEn: "EN",
    langToggleAr: "AR",
  },
} as const;

function generateWaLink(lang: Lang) {
  const message =
    lang === "ar"
      ? "مرحباً CasePilot! أود التسجيل في الوصول المبكر.\nاسم المكتب:\nالمدينة:\nعدد المعاملات شهرياً (تقريباً):\n"
      : "Hi CasePilot! I'm interested in Early Access.\nOffice name:\nCity:\nNo. of cases/month (approx):\n";

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "ar") setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];
  const WA_LINK = generateWaLink(lang);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 rtl:flex-row-reverse">
            <div className="h-8 w-8 rounded-lg bg-slate-900" />
            <span className="text-lg font-semibold tracking-tight">{t.brand}</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">
              {t.navFeatures}
            </a>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {t.navWa}
            </a>

            <a href="#pricing" className="hover:text-slate-900">
              {t.navPricing}
            </a>

            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              aria-label="Toggle language"
            >
              {lang === "en" ? t.langToggleAr : t.langToggleEn}
            </button>
          </nav>

          <div className="flex items-center gap-3 rtl:flex-row-reverse">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="md:hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              aria-label="Toggle language"
            >
              {lang === "en" ? t.langToggleAr : t.langToggleEn}
            </button>

            <a
              href="#early-access"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {t.navEarlyAccess}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 rtl:flex-row-reverse">
              {t.builtFor}
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              {t.mvpSoon}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {t.heroTitle}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              {t.heroDesc}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row rtl:sm:flex-row-reverse">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                {t.navWa}
              </a>

              <a
                href="#early-access"
                className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                {t.ctaLeaveDetails}
              </a>

              <a
                href="#features"
                className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                {t.ctaSeeHow}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-500 rtl:flex-row-reverse">
              {t.pills.map((p) => (
                <span key={p} className="rounded-full bg-slate-100 px-3 py-1">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Mock card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between rtl:flex-row-reverse">
              <div>
                <p className="text-sm font-medium">{t.mockToday}</p>
                <p className="text-xs text-slate-500">{t.mockOverview}</p>
              </div>
              <div className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white">
                {t.mockAddCase}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Kpi title={t.kpiTotal} value="128" />
              <Kpi title={t.kpiPending} value="41" />
              <Kpi title={t.kpiApproved} value="67" />
              <Kpi title={t.kpiOverdue} value="6" />
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-medium text-slate-600">{t.recentActivity}</p>
              <div className="space-y-2">
                <Activity text={t.activity1} meta={t.meta1} />
                <Activity text={t.activity2} meta={t.meta2} />
                <Activity text={t.activity3} meta={t.meta3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">{t.featuresTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{t.featuresDesc}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Feature title={t.feat1Title} desc={t.feat1Desc} />
            <Feature title={t.feat2Title} desc={t.feat2Desc} />
            <Feature title={t.feat3Title} desc={t.feat3Desc} />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">{t.pricingTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{t.pricingDesc}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-medium">{t.starter}</p>
              <p className="mt-2 text-4xl font-semibold">
                199 <span className="text-base font-medium text-slate-500">{t.priceSuffix}</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                {t.starterBullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <a
                href="#early-access"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                {t.pricingCta}
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium">{t.whatsNext}</p>
              <p className="mt-2 text-sm text-slate-600">{t.whatsNextDesc}</p>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <div className="rounded-lg border border-slate-200 bg-white p-3">{t.v1}</div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">{t.v2}</div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">{t.v3}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section id="early-access" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-xl font-semibold tracking-tight">{t.earlyTitle}</h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">{t.earlyDesc}</p>

            <form
              className="mt-6 grid gap-3 md:grid-cols-3"
              action="https://formspree.io/f/xdaleobd"
              method="POST"
            >
              <input
                name="name"
                placeholder={t.formName}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
              />
              <input
                name="office"
                placeholder={t.formOffice}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
              />
              <input
                name="phone"
                placeholder={t.formPhone}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
              />

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
                >
                  {t.submit}
                </button>
                <p className="mt-2 text-xs text-slate-500">{t.tip}</p>
              </div>
            </form>
          </div>

          <footer className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center rtl:md:flex-row-reverse">
            <p>
              © {new Date().getFullYear()} {t.brand}. {t.footerRights}
            </p>
            <p>{t.footerBuiltFor}</p>
          </footer>
        </div>
      </section>
    </main>
  );
}

function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Activity({ text, meta }: { text: string; meta: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 rtl:flex-row-reverse">
      <p className="text-xs text-slate-700">{text}</p>
      <p className="text-[11px] text-slate-500">{meta}</p>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}
