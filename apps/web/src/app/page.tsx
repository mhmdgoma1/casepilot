"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * SIMPLE CLIENT LOGIN + CASES (single file)
 * - No backend. Demo only (looks real).
 * - Login with: Client ID + PIN
 * - Persists session in localStorage
 * - Shows a clean "My Cases" dashboard
 * - Arabic/English toggle + RTL
 *
 * ✅ Demo credentials:
 *   - Client ID: CP-1001  PIN: 1234
 *   - Client ID: CP-1002  PIN: 2222
 */

type Lang = "en" | "ar";

type CaseStatus = "pending" | "submitted" | "approved" | "rejected" | "needs_docs";

type CaseItem = {
  id: string;
  type: string;
  applicant: string;
  status: CaseStatus;
  updatedAt: string;
  notes?: string;
  timeline: Array<{ at: string; text: string }>;
  docs: Array<{ name: string; state: "received" | "missing" }>;
};

type ClientRecord = {
  clientId: string;
  pin: string;
  name: string;
  phone: string;
  office: string;
  cases: CaseItem[];
};

const translations = {
  en: {
    brand: "CasePilot",
    clientPortal: "Client Portal",
    langAr: "AR",
    langEn: "EN",

    loginTitle: "Client Login",
    loginDesc:
      "Enter your Client ID and PIN to view your cases. (Demo only — no real data yet.)",
    clientId: "Client ID",
    pin: "PIN",
    login: "Login",
    logout: "Logout",
    wrongCreds: "Incorrect Client ID or PIN. Try the demo credentials below.",
    demoCreds: "Demo credentials",
    demo1: "Client ID: CP-1001 • PIN: 1234",
    demo2: "Client ID: CP-1002 • PIN: 2222",

    hello: "Hello",
    office: "Office",
    phone: "Phone",
    myCases: "My Cases",
    search: "Search cases…",
    filterAll: "All",
    filterPending: "Pending",
    filterSubmitted: "Submitted",
    filterApproved: "Approved",
    filterRejected: "Rejected",
    filterNeedsDocs: "Needs docs",

    caseId: "Case ID",
    type: "Type",
    applicant: "Applicant",
    status: "Status",
    lastUpdate: "Last update",
    open: "Open",
    back: "Back",

    caseDetails: "Case Details",
    timeline: "Timeline",
    documents: "Documents",
    docReceived: "Received",
    docMissing: "Missing",
    notes: "Notes",

    status_pending: "Pending",
    status_submitted: "Submitted",
    status_approved: "Approved",
    status_rejected: "Rejected",
    status_needs_docs: "Needs docs",

    tip:
      "Tip: Next step is to connect this to a real backend (Supabase/Firebase) and issue real Client IDs.",
    footer: "Built for UAE Visa & Typing Offices.",
  },
  ar: {
    brand: "CasePilot",
    clientPortal: "بوابة العملاء",
    langAr: "AR",
    langEn: "EN",

    loginTitle: "تسجيل دخول العميل",
    loginDesc:
      "أدخل رقم العميل والـ PIN لعرض معاملاتك. (نسخة تجريبية — لا توجد بيانات حقيقية بعد)",
    clientId: "رقم العميل",
    pin: "PIN",
    login: "دخول",
    logout: "خروج",
    wrongCreds: "رقم العميل أو PIN غير صحيح. جرّب بيانات الدخول التجريبية بالأسفل.",
    demoCreds: "بيانات تجريبية",
    demo1: "رقم العميل: CP-1001 • PIN: 1234",
    demo2: "رقم العميل: CP-1002 • PIN: 2222",

    hello: "مرحباً",
    office: "المكتب",
    phone: "الهاتف",
    myCases: "معاملاتي",
    search: "ابحث في المعاملات…",
    filterAll: "الكل",
    filterPending: "قيد الانتظار",
    filterSubmitted: "تم الإرسال",
    filterApproved: "موافق عليها",
    filterRejected: "مرفوضة",
    filterNeedsDocs: "ناقص مستندات",

    caseId: "رقم المعاملة",
    type: "النوع",
    applicant: "المتقدم",
    status: "الحالة",
    lastUpdate: "آخر تحديث",
    open: "عرض",
    back: "رجوع",

    caseDetails: "تفاصيل المعاملة",
    timeline: "سجل التحديثات",
    documents: "المستندات",
    docReceived: "مستلم",
    docMissing: "ناقص",
    notes: "ملاحظات",

    status_pending: "قيد الانتظار",
    status_submitted: "تم الإرسال",
    status_approved: "موافق عليها",
    status_rejected: "مرفوضة",
    status_needs_docs: "ناقص مستندات",

    tip:
      "ملاحظة: الخطوة التالية ربطها بباك-إند حقيقي (Supabase/Firebase) وإصدار أرقام عملاء حقيقية.",
    footer: "مصمم لمكاتب التأشيرات والطباعة في الإمارات.",
  },
} as const;

const DEMO_DB: ClientRecord[] = [
  {
    clientId: "CP-1001",
    pin: "1234",
    name: "Ahmed Al Mazrouei",
    phone: "+971 50 123 4567",
    office: "Golden Gate Typing Center",
    cases: [
      {
        id: "UAE-VC-24091",
        type: "Employment Visa Renewal",
        applicant: "Ahmed Al Mazrouei",
        status: "submitted",
        updatedAt: "Today • 11:20",
        notes: "Medical is completed. Waiting for ICP approval.",
        timeline: [
          { at: "Today • 11:20", text: "Application submitted to ICP." },
          { at: "Yesterday • 16:10", text: "Medical result received." },
          { at: "Yesterday • 10:05", text: "Documents verified by office." },
          { at: "2 days ago • 19:40", text: "Case created." },
        ],
        docs: [
          { name: "Passport copy", state: "received" },
          { name: "Emirates ID copy", state: "received" },
          { name: "Photo", state: "received" },
          { name: "Medical result", state: "received" },
        ],
      },
      {
        id: "UAE-VC-24107",
        type: "Family Visa (Wife)",
        applicant: "Mariam A.",
        status: "needs_docs",
        updatedAt: "Today • 09:55",
        notes: "Please upload marriage certificate attested copy.",
        timeline: [
          { at: "Today • 09:55", text: "Office requested additional documents." },
          { at: "Yesterday • 14:25", text: "Initial documents received." },
          { at: "Yesterday • 13:40", text: "Case created." },
        ],
        docs: [
          { name: "Passport copy", state: "received" },
          { name: "Photo", state: "received" },
          { name: "Marriage certificate (attested)", state: "missing" },
        ],
      },
    ],
  },
  {
    clientId: "CP-1002",
    pin: "2222",
    name: "Fatima Al Shehhi",
    phone: "+971 55 777 9911",
    office: "Al Noor Visa Services",
    cases: [
      {
        id: "UAE-VC-23988",
        type: "Visit Visa Extension",
        applicant: "Fatima Al Shehhi",
        status: "approved",
        updatedAt: "Yesterday • 18:05",
        notes: "Approved. You can collect your documents from the office.",
        timeline: [
          { at: "Yesterday • 18:05", text: "Status updated to Approved." },
          { at: "Yesterday • 12:35", text: "Application submitted." },
          { at: "2 days ago • 20:15", text: "Payment received." },
          { at: "3 days ago • 10:10", text: "Case created." },
        ],
        docs: [
          { name: "Passport copy", state: "received" },
          { name: "Photo", state: "received" },
        ],
      },
      {
        id: "UAE-VC-24002",
        type: "Cancellation Request",
        applicant: "Fatima Al Shehhi",
        status: "pending",
        updatedAt: "Today • 08:40",
        notes: "In queue. Office will submit today.",
        timeline: [
          { at: "Today • 08:40", text: "Office confirmed case details." },
          { at: "Yesterday • 21:30", text: "Case created." },
        ],
        docs: [{ name: "Passport copy", state: "received" }],
      },
    ],
  },
];

function statusPillClasses(status: CaseStatus) {
  switch (status) {
    case "approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "rejected":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "submitted":
      return "bg-sky-50 text-sky-700 border-sky-200";
    case "needs_docs":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "pending":
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

function tStatus(t: (typeof translations)["en"], status: CaseStatus) {
  if (status === "pending") return t.status_pending;
  if (status === "submitted") return t.status_submitted;
  if (status === "approved") return t.status_approved;
  if (status === "rejected") return t.status_rejected;
  return t.status_needs_docs;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [clientId, setClientId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [sessionClientId, setSessionClientId] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<
    "all" | "pending" | "submitted" | "approved" | "rejected" | "needs_docs"
  >("all");

  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // init
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Lang | null;
    if (savedLang === "en" || savedLang === "ar") setLang(savedLang);

    const savedSession = localStorage.getItem("cp_client_session");
    if (savedSession) setSessionClientId(savedSession);
  }, []);

  // apply lang
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  const client = useMemo(() => {
    if (!sessionClientId) return null;
    return DEMO_DB.find((c) => c.clientId.toLowerCase() === sessionClientId.toLowerCase()) ?? null;
  }, [sessionClientId]);

  const allCases = client?.cases ?? [];

  const filteredCases = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allCases
      .filter((c) => (filter === "all" ? true : c.status === filter))
      .filter((c) => {
        if (!q) return true;
        return (
          c.id.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q) ||
          c.applicant.toLowerCase().includes(q) ||
          (c.notes ?? "").toLowerCase().includes(q)
        );
      });
  }, [allCases, filter, query]);

  const selectedCase = useMemo(() => {
    if (!selectedCaseId) return null;
    return allCases.find((c) => c.id === selectedCaseId) ?? null;
  }, [allCases, selectedCaseId]);

  function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const found = DEMO_DB.find(
      (c) =>
        c.clientId.toLowerCase() === clientId.trim().toLowerCase() &&
        c.pin === pin.trim()
    );

    if (!found) {
      setError(t.wrongCreds);
      return;
    }

    localStorage.setItem("cp_client_session", found.clientId);
    setSessionClientId(found.clientId);
    setSelectedCaseId(null);
    setClientId("");
    setPin("");
  }

  function onLogout() {
    localStorage.removeItem("cp_client_session");
    setSessionClientId(null);
    setSelectedCaseId(null);
    setQuery("");
    setFilter("all");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 rtl:flex-row-reverse">
            <div className="h-8 w-8 rounded-lg bg-slate-900" />
            <div className="leading-tight">
              <div className="text-lg font-semibold tracking-tight">{t.brand}</div>
              <div className="text-xs text-slate-500">{t.clientPortal}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rtl:flex-row-reverse">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              aria-label="Toggle language"
            >
              {lang === "en" ? t.langAr : t.langEn}
            </button>

            {sessionClientId ? (
              <button
                onClick={onLogout}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                {t.logout}
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        {!sessionClientId || !client ? (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Login card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h1 className="text-2xl font-semibold tracking-tight">{t.loginTitle}</h1>
              <p className="mt-2 text-sm text-slate-600">{t.loginDesc}</p>

              <form onSubmit={onLogin} className="mt-6 space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    {t.clientId}
                  </label>
                  <input
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="CP-1001"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    {t.pin}
                  </label>
                  <input
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="1234"
                    inputMode="numeric"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>

                {error ? (
                  <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
                >
                  {t.login}
                </button>

                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-xs font-medium text-slate-700">{t.demoCreds}</div>
                  <div className="mt-1 text-xs text-slate-600">{t.demo1}</div>
                  <div className="mt-1 text-xs text-slate-600">{t.demo2}</div>
                </div>
              </form>
            </div>

            {/* Right: what client sees */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-800">{t.myCases}</p>
              <p className="mt-2 text-sm text-slate-600">
                {lang === "ar"
                  ? "بعد تسجيل الدخول، سيظهر للعميل قائمة بالمعاملات مع الحالة وآخر تحديث، ويمكنه فتح كل معاملة لرؤية التفاصيل والمستندات."
                  : "After login, the client sees a list of cases with status + last update, and can open each case to view details and required documents."}
              </p>

              <div className="mt-5 space-y-3">
                <MockCaseRow
                  id="UAE-VC-24091"
                  type={lang === "ar" ? "تجديد إقامة عمل" : "Employment Visa Renewal"}
                  status={lang === "ar" ? t.status_submitted : t.status_submitted}
                />
                <MockCaseRow
                  id="UAE-VC-24107"
                  type={lang === "ar" ? "تأشيرة عائلية" : "Family Visa"}
                  status={lang === "ar" ? t.status_needs_docs : t.status_needs_docs}
                />
                <MockCaseRow
                  id="UAE-VC-23988"
                  type={lang === "ar" ? "تمديد زيارة" : "Visit Visa Extension"}
                  status={lang === "ar" ? t.status_approved : t.status_approved}
                />
              </div>

              <p className="mt-6 text-xs text-slate-500">{t.tip}</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-12">
            {/* Left: profile + filters */}
            <aside className="md:col-span-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">
                  {t.hello}{" "}
                  <span className="text-slate-900 font-semibold">{client.name}</span>
                </p>

                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center justify-between rtl:flex-row-reverse">
                    <span className="text-slate-500">{t.clientId}</span>
                    <span className="font-medium">{client.clientId}</span>
                  </div>
                  <div className="flex items-center justify-between rtl:flex-row-reverse">
                    <span className="text-slate-500">{t.office}</span>
                    <span className="font-medium">{client.office}</span>
                  </div>
                  <div className="flex items-center justify-between rtl:flex-row-reverse">
                    <span className="text-slate-500">{t.phone}</span>
                    <span className="font-medium">{client.phone}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.search}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2 rtl:flex-row-reverse">
                  <FilterPill label={t.filterAll} active={filter === "all"} onClick={() => setFilter("all")} />
                  <FilterPill label={t.filterPending} active={filter === "pending"} onClick={() => setFilter("pending")} />
                  <FilterPill label={t.filterSubmitted} active={filter === "submitted"} onClick={() => setFilter("submitted")} />
                  <FilterPill label={t.filterApproved} active={filter === "approved"} onClick={() => setFilter("approved")} />
                  <FilterPill label={t.filterRejected} active={filter === "rejected"} onClick={() => setFilter("rejected")} />
                  <FilterPill label={t.filterNeedsDocs} active={filter === "needs_docs"} onClick={() => setFilter("needs_docs")} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-medium text-slate-700">
                  {lang === "ar"
                    ? "هذه صفحة تجريبية (Demo)."
                    : "This is a demo page."}
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  {lang === "ar"
                    ? "في الاجتماع: قل لهم أن هذا هو شكل بوابة العميل، وخطوتك التالية إضافة رفع مستندات وربطها بلوحة المكتب."
                    : "In the meeting: tell them this is the client portal UI; next step is enabling uploads + linking to office dashboard."}
                </p>
              </div>
            </aside>

            {/* Right: cases list / details */}
            <section className="md:col-span-8">
              {!selectedCase ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between rtl:flex-row-reverse">
                    <h2 className="text-xl font-semibold tracking-tight">{t.myCases}</h2>
                    <span className="text-xs text-slate-500">
                      {filteredCases.length} / {allCases.length}
                    </span>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                    <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-600">
                      <div className="col-span-3">{t.caseId}</div>
                      <div className="col-span-4">{t.type}</div>
                      <div className="col-span-3">{t.status}</div>
                      <div className="col-span-2 text-right rtl:text-left">{t.open}</div>
                    </div>

                    <div className="divide-y divide-slate-200">
                      {filteredCases.map((c) => (
                        <div
                          key={c.id}
                          className="grid grid-cols-12 items-center px-4 py-3 text-sm"
                        >
                          <div className="col-span-3 font-medium text-slate-900">{c.id}</div>
                          <div className="col-span-4 text-slate-700">{c.type}</div>
                          <div className="col-span-3">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusPillClasses(
                                c.status
                              )}`}
                            >
                              {tStatus(translations[lang] as any, c.status)}
                            </span>
                            <div className="mt-1 text-[11px] text-slate-500">{c.updatedAt}</div>
                          </div>
                          <div className="col-span-2 text-right rtl:text-left">
                            <button
                              onClick={() => setSelectedCaseId(c.id)}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                            >
                              {t.open}
                            </button>
                          </div>
                        </div>
                      ))}
                      {filteredCases.length === 0 ? (
                        <div className="px-4 py-8 text-sm text-slate-500">
                          {lang === "ar" ? "لا توجد نتائج." : "No results."}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between rtl:flex-row-reverse">
                    <div>
                      <p className="text-xs text-slate-500">{t.caseDetails}</p>
                      <h2 className="mt-1 text-xl font-semibold tracking-tight">
                        {selectedCase.id}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        {selectedCase.type} • {selectedCase.applicant}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusPillClasses(
                          selectedCase.status
                        )}`}
                      >
                        {tStatus(translations[lang] as any, selectedCase.status)}
                      </span>
                      <button
                        onClick={() => setSelectedCaseId(null)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        {t.back}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {/* Timeline */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold">{t.timeline}</p>
                      <div className="mt-4 space-y-3">
                        {selectedCase.timeline.map((item, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3"
                          >
                            <p className="text-xs text-slate-500">{item.at}</p>
                            <p className="mt-1 text-sm text-slate-700">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Docs + Notes */}
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-semibold">{t.documents}</p>
                        <div className="mt-4 space-y-2">
                          {selectedCase.docs.map((d, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 rtl:flex-row-reverse"
                            >
                              <p className="text-sm text-slate-700">{d.name}</p>
                              <span
                                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                                  d.state === "received"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : "bg-amber-50 text-amber-800 border-amber-200"
                                }`}
                              >
                                {d.state === "received" ? t.docReceived : t.docMissing}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-semibold">{t.notes}</p>
                        <p className="mt-2 text-sm text-slate-700">
                          {selectedCase.notes || (lang === "ar" ? "لا توجد ملاحظات." : "No notes.")}
                        </p>
                        <p className="mt-3 text-xs text-slate-500">{selectedCase.updatedAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <footer className="md:col-span-12 mt-2 text-xs text-slate-500">
              <div className="border-t border-slate-200 pt-6 flex items-center justify-between rtl:flex-row-reverse">
                <span>© {new Date().getFullYear()} {t.brand}</span>
                <span>{t.footer}</span>
              </div>
            </footer>
          </div>
        )}
      </section>
    </main>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium ${
        active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function MockCaseRow({ id, type, status }: { id: string; type: string; status: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center justify-between rtl:flex-row-reverse">
        <div>
          <p className="text-xs text-slate-500">{id}</p>
          <p className="mt-1 text-sm font-medium text-slate-800">{type}</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
          {status}
        </span>
      </div>
    </div>
  );
}
