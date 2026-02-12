export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900" />
            <span className="text-lg font-semibold tracking-tight">CasePilot</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#early-access" className="hover:text-slate-900">Early Access</a>
          </nav>

          <a
            href="#early-access"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Request Early Access
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
              Built for UAE Visa & Typing Offices
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              MVP coming soon
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Take Control of Every Visa Case.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              CasePilot gives typing centers and visa offices one clean dashboard to track applications,
              upload documents, and update status—without the chaos of WhatsApp + Excel.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#early-access"
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                Request Early Access
              </a>
              <a
                href="#features"
                className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                See how it works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1">No complex CRM</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Simple statuses</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Secure file uploads</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Modern UI</span>
            </div>
          </div>

          {/* Mock card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Today</p>
                <p className="text-xs text-slate-500">Office overview</p>
              </div>
              <div className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white">
                + Add Case
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Kpi title="Total Cases" value="128" />
              <Kpi title="Pending" value="41" />
              <Kpi title="Approved" value="67" />
              <Kpi title="Overdue" value="6" />
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-medium text-slate-600">Recent activity</p>
              <div className="space-y-2">
                <Activity text="Status updated to Approved" meta="Ahmed • 2m ago" />
                <Activity text="Passport uploaded" meta="Fatima • 18m ago" />
                <Activity text="New case created" meta="Omar • 1h ago" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">Everything you need for V1.</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Focused features for visa & typing offices—built for speed and clarity.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Feature
              title="Applications Dashboard"
              desc="See all cases, statuses, and overdue items in one clean view."
            />
            <Feature
              title="Simple Status Tracking"
              desc="Pending → Submitted → Approved/Rejected with instant updates."
            />
            <Feature
              title="Secure Document Uploads"
              desc="Attach PDFs and IDs to each case, without messy folders."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">Early access pricing</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Founders price for the first 20 offices. Lock it for life.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-medium">Starter</p>
              <p className="mt-2 text-4xl font-semibold">
                199 <span className="text-base font-medium text-slate-500">AED / month</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                <li>• Up to 300 active cases</li>
                <li>• 2 staff accounts</li>
                <li>• File uploads included</li>
                <li>• Activity timeline</li>
              </ul>
              <a
                href="#early-access"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                Request early access
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium">What’s next</p>
              <p className="mt-2 text-sm text-slate-600">
                After V1 traction, we’ll add WhatsApp reminders, client portal, and reporting.
              </p>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  ✅ V1: Tracking + uploads + status
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  ⏭ V2: WhatsApp templates/reminders
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  ⏭ V3: Client portal + analytics
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section id="early-access" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-xl font-semibold tracking-tight">Request Early Access</h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Share your details and we’ll reach out when the MVP is ready. (No spam.)
            </p>

            <form
              className="mt-6 grid gap-3 md:grid-cols-3"
              action="https://formspree.io/f/your_form_id"
              method="POST"
            >
              <input
                name="name"
                placeholder="Name"
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
              />
              <input
                name="office"
                placeholder="Office name"
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
              />
              <input
                name="phone"
                placeholder="Phone / WhatsApp"
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
              />

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Submit
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  Tip: Replace the form action with your Formspree endpoint or a simple API route.
                </p>
              </div>
            </form>
          </div>

          <footer className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} CasePilot. All rights reserved.</p>
            <p>Built for UAE Visa & Typing Offices.</p>
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
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
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
