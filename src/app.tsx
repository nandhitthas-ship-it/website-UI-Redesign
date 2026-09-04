import { useState } from "react";

const NAV_ITEMS = ["Overview", "Evaluation", "Mood Board", "Style Guide", "Mockups"];

const HEURISTIC_ISSUES = [
  {
    id: "H1",
    severity: "critical",
    heuristic: "Visibility of System Status",
    issue: "No loading indicators during async operations",
    impact: "Users abandon tasks after 3s with no feedback",
    fix: "Add skeleton screens and progress indicators",
  },
  {
    id: "H2",
    severity: "major",
    heuristic: "Error Prevention",
    issue: "Destructive actions lack confirmation dialogs",
    impact: "Accidental data loss reported by 23% of users",
    fix: "Implement two-step confirmation for irreversible actions",
  },
  {
    id: "H3",
    severity: "major",
    heuristic: "Consistency & Standards",
    issue: "CTA labels vary across equivalent actions (Save / Submit / Apply)",
    impact: "Increased cognitive load, 18% drop-off at form completion",
    fix: "Standardize action vocabulary in a content style guide",
  },
  {
    id: "H4",
    severity: "minor",
    heuristic: "Aesthetic & Minimalist Design",
    issue: "Sidebar contains 14 navigation items at top level",
    impact: "Users struggle to locate secondary features",
    fix: "Group related items, use progressive disclosure",
  },
  {
    id: "H5",
    severity: "minor",
    heuristic: "Flexibility & Efficiency",
    issue: "No keyboard shortcuts or power-user affordances",
    impact: "Experienced users rate efficiency 4.1/10",
    fix: "Introduce command palette (⌘K) and contextual shortcuts",
  },
];

const COLORS = [
  { name: "Ink", hex: "#1a1814", role: "Primary text" },
  { name: "Ground", hex: "#f7f5f0", role: "Page background" },
  { name: "Accent", hex: "#2a5c45", role: "Interactive / CTA" },
  { name: "Warm Rule", hex: "#dedad3", role: "Dividers / borders" },
  { name: "Caution", hex: "#c04f2a", role: "Errors / warnings" },
  { name: "Soft Ink", hex: "#5a574f", role: "Secondary text" },
];

const TYPE_SCALE = [
  { label: "Display", size: "72px", weight: "300", family: "Fraunces", sample: "Redesigned" },
  { label: "Heading 1", size: "48px", weight: "400", family: "Fraunces", sample: "Section Title" },
  { label: "Heading 2", size: "32px", weight: "600", family: "Inter", sample: "Subsection" },
  { label: "Body", size: "16px", weight: "400", family: "Inter", sample: "The quick brown fox jumps over the lazy dog." },
  { label: "Caption", size: "12px", weight: "500", family: "JetBrains Mono", sample: "LABEL · METADATA · TAG" },
];

const MOCKUP_SCREENS = [
  {
    id: "dashboard",
    label: "Dashboard",
    bg: "#1a1814",
    accent: "#2a5c45",
    description: "Dark-mode analytics overview with live KPI tiles",
  },
  {
    id: "form",
    label: "Form Flow",
    bg: "#f7f5f0",
    accent: "#2a5c45",
    description: "Multi-step onboarding with inline validation",
  },
  {
    id: "detail",
    label: "Detail View",
    bg: "#ffffff",
    accent: "#c04f2a",
    description: "Content-first record detail with contextual actions",
  },
];

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    critical: "bg-red-100 text-red-800 border border-red-200",
    major: "bg-orange-100 text-orange-800 border border-orange-200",
    minor: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  };
  return (
    <span
      className={`font-mono-tag text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded ${styles[severity]}`}
    >
      {severity}
    </span>
  );
}

function DashboardMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-[#dedad3] shadow-lg bg-[#1a1814] font-body p-5 h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
        </div>
        <span className="font-mono-tag text-[10px] text-white/30 tracking-widest">ANALYTICS · v2.0</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Sessions", value: "84,201", delta: "+12%" },
          { label: "Retention", value: "67.4%", delta: "+4%" },
          { label: "Errors", value: "0.3%", delta: "−89%" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="font-mono-tag text-[9px] text-white/40 tracking-widest mb-1">{kpi.label}</div>
            <div className="font-display text-white text-xl font-light">{kpi.value}</div>
            <div className="font-mono-tag text-[9px] text-[#2a5c45] mt-1">{kpi.delta}</div>
          </div>
        ))}
      </div>
      <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex-1">
        <div className="font-mono-tag text-[9px] text-white/40 tracking-widest mb-3">ENGAGEMENT OVER TIME</div>
        <div className="flex items-end gap-1 h-16">
          {[40, 65, 50, 80, 70, 90, 75, 95, 60, 85, 100, 78].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-[#2a5c45] opacity-70"
              style={{ height: `${h}%`, opacity: i === 11 ? 1 : 0.4 + i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FormMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-[#dedad3] shadow-lg bg-[#f7f5f0] p-5 h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-300/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-300/60" />
          <div className="w-3 h-3 rounded-full bg-green-300/60" />
        </div>
        <span className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest">ONBOARDING · STEP 2/4</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-full ${s <= 2 ? "bg-[#2a5c45]" : "bg-[#dedad3]"}`} />
        ))}
      </div>
      <div>
        <div className="font-display text-[#1a1814] text-2xl font-light mb-1">Tell us about your role</div>
        <div className="text-[#5a574f] text-xs">This helps us personalise your experience.</div>
      </div>
      <div className="flex flex-col gap-3">
        {["Product Designer", "Engineer", "Product Manager", "Founder"].map((role, i) => (
          <div
            key={role}
            className={`flex items-center gap-3 p-2.5 rounded-lg border text-sm cursor-pointer transition-colors ${
              i === 0
                ? "border-[#2a5c45] bg-[#e6f0eb] text-[#2a5c45]"
                : "border-[#dedad3] bg-white text-[#1a1814]"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                i === 0 ? "border-[#2a5c45]" : "border-[#dedad3]"
              }`}
            >
              {i === 0 && <div className="w-2 h-2 rounded-full bg-[#2a5c45]" />}
            </div>
            {role}
          </div>
        ))}
      </div>
      <button className="mt-auto w-full bg-[#1a1814] text-white text-sm py-2.5 rounded-lg font-medium">
        Continue →
      </button>
    </div>
  );
}

function DetailMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-[#dedad3] shadow-lg bg-white p-5 h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-300/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-300/60" />
          <div className="w-3 h-3 rounded-full bg-green-300/60" />
        </div>
        <span className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest">RECORD · #PRJ-0042</span>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-display text-[#1a1814] text-xl font-light leading-snug">
            Homepage Redesign<br />
            <span className="italic text-[#5a574f]">Sprint 4</span>
          </div>
        </div>
        <span className="font-mono-tag text-[9px] bg-[#e6f0eb] text-[#2a5c45] border border-[#2a5c45]/20 px-2 py-0.5 rounded-full tracking-widest">
          IN REVIEW
        </span>
      </div>
      <div className="border-t border-[#dedad3] pt-3 grid grid-cols-2 gap-3">
        {[
          { label: "Owner", value: "Maya Chen" },
          { label: "Due", value: "Sep 12, 2026" },
          { label: "Priority", value: "High" },
          { label: "Effort", value: "8 pts" },
        ].map((f) => (
          <div key={f.label}>
            <div className="font-mono-tag text-[9px] text-[#9c9890] tracking-widest mb-0.5">{f.label}</div>
            <div className="text-[#1a1814] text-sm">{f.value}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#dedad3] pt-3 flex-1">
        <div className="font-mono-tag text-[9px] text-[#9c9890] tracking-widest mb-2">ACTIVITY</div>
        {["Figma file linked", "Copy review complete", "Dev handoff queued"].map((item, i) => (
          <div key={i} className="flex items-center gap-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#dedad3]" />
            <span className="text-[#5a574f] text-xs">{item}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-[#1a1814] text-white text-xs py-2 rounded-lg font-medium">Approve</button>
        <button className="flex-1 border border-[#c04f2a] text-[#c04f2a] text-xs py-2 rounded-lg font-medium">
          Request Changes
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [expandedIssue, setExpandedIssue] = useState<string | null>("H1");

  const scrollTo = (section: string) => {
    setActiveSection(section);
    const el = document.getElementById(section.toLowerCase().replace(" ", "-"));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-full" style={{ fontFamily: "var(--font-body)" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#f7f5f0]/90 backdrop-blur-md border-b border-[#dedad3]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#1a1814] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#2a5c45]" />
            </div>
            <span
              className="font-display text-[#1a1814] font-light text-lg tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              UX Redesign
            </span>
            <span
              className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest border border-[#dedad3] px-2 py-0.5 rounded-full"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              v2.0
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  activeSection === item
                    ? "bg-[#1a1814] text-white"
                    : "text-[#5a574f] hover:text-[#1a1814] hover:bg-[#dedad3]/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {/* Hero */}
        <section id="overview" className="pt-20 pb-24 border-b border-[#dedad3]">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <div
                className="font-mono-tag text-[11px] text-[#9c9890] tracking-[0.15em] mb-6 uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                UX Research · Visual Design · Interaction Design
              </div>
              <h1
                className="font-display text-[clamp(52px,8vw,96px)] font-light leading-[0.9] text-[#1a1814] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Redesigning
                <br />
                <em className="italic text-[#2a5c45]">for people,</em>
                <br />
                not habits.
              </h1>
              <p className="text-[#5a574f] text-lg leading-relaxed max-w-lg">
                A systematic overhaul guided by heuristic evaluation, user research, and principled visual design — producing interfaces that reduce friction and build trust.
              </p>
            </div>
            <div className="flex flex-col gap-6 min-w-[200px]">
              {[
                { value: "5", label: "Critical issues resolved" },
                { value: "67%", label: "Task completion lift" },
                { value: "4.8", label: "Post-redesign SUS score" },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-[#2a5c45] pl-4">
                  <div
                    className="font-display text-4xl font-light text-[#1a1814]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest mt-1 uppercase"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Heuristic Evaluation */}
        <section id="evaluation" className="py-20 border-b border-[#dedad3]">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div
                className="font-mono-tag text-[11px] text-[#9c9890] tracking-[0.15em] mb-3 uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Step 01 · Heuristic Evaluation
              </div>
              <h2
                className="font-display text-5xl font-light text-[#1a1814]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Usability Audit
              </h2>
            </div>
            <div className="hidden md:flex gap-4 text-right">
              {[
                { count: "1", label: "Critical", color: "text-red-600" },
                { count: "2", label: "Major", color: "text-orange-600" },
                { count: "2", label: "Minor", color: "text-yellow-600" },
              ].map((s) => (
                <div key={s.label}>
                  <div className={`font-display text-3xl font-light ${s.color}`} style={{ fontFamily: "var(--font-display)" }}>
                    {s.count}
                  </div>
                  <div className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {HEURISTIC_ISSUES.map((issue) => {
              const isOpen = expandedIssue === issue.id;
              return (
                <div
                  key={issue.id}
                  className={`border rounded-xl transition-all duration-200 ${
                    isOpen ? "border-[#1a1814] bg-white shadow-sm" : "border-[#dedad3] bg-white/50 hover:bg-white hover:border-[#9c9890]"
                  }`}
                >
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left"
                    onClick={() => setExpandedIssue(isOpen ? null : issue.id)}
                  >
                    <span
                      className="font-mono-tag text-[11px] text-[#9c9890] w-8 shrink-0"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {issue.id}
                    </span>
                    <SeverityBadge severity={issue.severity} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[#1a1814] font-medium text-sm truncate">{issue.issue}</div>
                      <div
                        className="font-mono-tag text-[10px] text-[#9c9890] tracking-wide mt-0.5"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {issue.heuristic}
                      </div>
                    </div>
                    <div
                      className={`text-[#9c9890] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 grid md:grid-cols-2 gap-4 border-t border-[#dedad3] mt-0">
                      <div className="pt-4">
                        <div
                          className="font-mono-tag text-[9px] text-[#9c9890] tracking-widest uppercase mb-2"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          User Impact
                        </div>
                        <p className="text-[#5a574f] text-sm leading-relaxed">{issue.impact}</p>
                      </div>
                      <div className="pt-4">
                        <div
                          className="font-mono-tag text-[9px] text-[#2a5c45] tracking-widest uppercase mb-2"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Recommended Fix
                        </div>
                        <p className="text-[#1a1814] text-sm leading-relaxed">{issue.fix}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Mood Board */}
        <section id="mood-board" className="py-20 border-b border-[#dedad3]">
          <div className="mb-12">
            <div
              className="font-mono-tag text-[11px] text-[#9c9890] tracking-[0.15em] mb-3 uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Step 02 · Mood Board
            </div>
            <h2
              className="font-display text-5xl font-light text-[#1a1814]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Visual Direction
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 row-span-2 rounded-2xl overflow-hidden bg-[#dedad3] relative group h-72 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&auto=format"
                alt="Minimal workspace with clean editorial design aesthetic"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="font-mono-tag text-[10px] text-white/60 tracking-widest uppercase mb-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Keyword
                </div>
                <div
                  className="font-display text-white text-2xl font-light italic"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Editorial Calm
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-[#dedad3] relative group h-44">
              <img
                src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=400&h=350&fit=crop&auto=format"
                alt="Typography specimen showing hierarchical type layout"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814]/50 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <div
                  className="font-display text-white text-lg font-light italic"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Type as Image
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-[#2a5c45] relative group h-44 flex items-end p-4">
              <div>
                <div
                  className="font-mono-tag text-[10px] text-white/50 tracking-widest uppercase mb-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Tone
                </div>
                <div
                  className="font-display text-white text-2xl font-light"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Purposeful & Warm
                </div>
              </div>
            </div>
            <div className="md:col-span-3 grid grid-cols-3 gap-4">
              {[
                { label: "Generous Space", icon: "◻", desc: "Breathing room creates trust" },
                { label: "Clear Hierarchy", icon: "≡", desc: "Display + body contrast" },
                { label: "Tactile Texture", icon: "◈", desc: "Warm off-white ground" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-white border border-[#dedad3] rounded-xl p-5 flex flex-col gap-2 hover:border-[#1a1814] transition-colors"
                >
                  <div className="text-2xl text-[#2a5c45]">{m.icon}</div>
                  <div className="font-medium text-[#1a1814] text-sm">{m.label}</div>
                  <div className="text-[#9c9890] text-xs">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style Guide */}
        <section id="style-guide" className="py-20 border-b border-[#dedad3]">
          <div className="mb-12">
            <div
              className="font-mono-tag text-[11px] text-[#9c9890] tracking-[0.15em] mb-3 uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Step 03 · Style Guide
            </div>
            <h2
              className="font-display text-5xl font-light text-[#1a1814]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Design System
            </h2>
          </div>

          {/* Color palette */}
          <div className="mb-12">
            <div
              className="font-mono-tag text-[11px] text-[#9c9890] tracking-[0.15em] mb-6 uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Color Palette
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {COLORS.map((c) => (
                <div key={c.name}>
                  <div
                    className="h-16 rounded-xl mb-2 border border-black/5"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="text-[#1a1814] text-xs font-medium">{c.name}</div>
                  <div
                    className="font-mono-tag text-[10px] text-[#9c9890] tracking-wide"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {c.hex}
                  </div>
                  <div className="text-[#9c9890] text-[10px] mt-0.5">{c.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Type scale */}
          <div className="mb-12">
            <div
              className="font-mono-tag text-[11px] text-[#9c9890] tracking-[0.15em] mb-6 uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Type Scale
            </div>
            <div className="flex flex-col divide-y divide-[#dedad3]">
              {TYPE_SCALE.map((t) => (
                <div key={t.label} className="py-4 flex items-baseline gap-6">
                  <div className="w-28 shrink-0">
                    <div
                      className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {t.label}
                    </div>
                    <div
                      className="font-mono-tag text-[9px] text-[#9c9890]/70"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {t.size} · {t.weight}
                    </div>
                  </div>
                  <div
                    className="flex-1 text-[#1a1814] overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{
                      fontFamily: t.family === "Fraunces" ? "var(--font-display)" : t.family === "JetBrains Mono" ? "var(--font-mono)" : "var(--font-body)",
                      fontSize: `clamp(14px, ${t.size}, ${t.size})`,
                      fontWeight: t.weight,
                    }}
                  >
                    {t.sample}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Component examples */}
          <div>
            <div
              className="font-mono-tag text-[11px] text-[#9c9890] tracking-[0.15em] mb-6 uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Components
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Buttons */}
              <div className="bg-white border border-[#dedad3] rounded-xl p-5">
                <div className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Buttons
                </div>
                <div className="flex flex-col gap-2">
                  <button className="w-full bg-[#1a1814] text-white text-sm py-2.5 px-4 rounded-lg font-medium hover:bg-[#2a2520] transition-colors">
                    Primary Action
                  </button>
                  <button className="w-full border border-[#1a1814] text-[#1a1814] text-sm py-2.5 px-4 rounded-lg font-medium hover:bg-[#1a1814]/5 transition-colors">
                    Secondary
                  </button>
                  <button className="w-full border border-[#dedad3] text-[#5a574f] text-sm py-2.5 px-4 rounded-lg font-medium hover:bg-[#dedad3]/50 transition-colors">
                    Ghost
                  </button>
                  <button className="w-full bg-[#c04f2a] text-white text-sm py-2.5 px-4 rounded-lg font-medium hover:bg-[#a8431f] transition-colors">
                    Destructive
                  </button>
                </div>
              </div>
              {/* Inputs */}
              <div className="bg-white border border-[#dedad3] rounded-xl p-5">
                <div className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Inputs
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block font-mono-tag text-[10px] text-[#9c9890] tracking-widest uppercase mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                      Project Name
                    </label>
                    <input
                      className="w-full border border-[#dedad3] rounded-lg px-3 py-2 text-sm text-[#1a1814] bg-[#f7f5f0] placeholder-[#9c9890] focus:outline-none focus:border-[#1a1814] transition-colors"
                      placeholder="e.g. Homepage Redesign"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tag text-[10px] text-[#c04f2a] tracking-widest uppercase mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                      Email · Required
                    </label>
                    <input
                      className="w-full border border-[#c04f2a] rounded-lg px-3 py-2 text-sm text-[#1a1814] bg-[#fdf0eb] focus:outline-none focus:border-[#c04f2a] transition-colors"
                      placeholder="Enter email"
                    />
                    <p className="text-[#c04f2a] text-xs mt-1">Please enter a valid email address.</p>
                  </div>
                </div>
              </div>
              {/* Badges + tags */}
              <div className="bg-white border border-[#dedad3] rounded-xl p-5">
                <div className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Status & Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "In Review", bg: "#e6f0eb", color: "#2a5c45" },
                    { label: "In Progress", bg: "#fef9c3", color: "#854d0e" },
                    { label: "Blocked", bg: "#fee2e2", color: "#991b1b" },
                    { label: "Done", bg: "#f0fdf4", color: "#166534" },
                    { label: "Draft", bg: "#f7f5f0", color: "#5a574f" },
                  ].map((b) => (
                    <span
                      key={b.label}
                      className="font-mono-tag text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wide border"
                      style={{
                        fontFamily: "var(--font-mono)",
                        backgroundColor: b.bg,
                        color: b.color,
                        borderColor: b.color + "33",
                      }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
                <div className="mt-4 border-t border-[#dedad3] pt-4">
                  <div className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Progress
                  </div>
                  {[75, 42, 90].map((v, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-[#5a574f] text-xs">Sprint {i + 1}</span>
                        <span className="font-mono-tag text-[10px] text-[#9c9890]" style={{ fontFamily: "var(--font-mono)" }}>{v}%</span>
                      </div>
                      <div className="h-1.5 bg-[#dedad3] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#2a5c45]"
                          style={{ width: `${v}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mockups */}
        <section id="mockups" className="py-20">
          <div className="mb-12">
            <div
              className="font-mono-tag text-[11px] text-[#9c9890] tracking-[0.15em] mb-3 uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Step 04 · High-Fidelity Mockups
            </div>
            <h2
              className="font-display text-5xl font-light text-[#1a1814]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Screens
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {MOCKUP_SCREENS.map((screen, i) => (
              <div key={screen.id} className="flex flex-col gap-3">
                <div className="h-64">
                  {i === 0 && <DashboardMockup />}
                  {i === 1 && <FormMockup />}
                  {i === 2 && <DetailMockup />}
                </div>
                <div>
                  <div
                    className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest uppercase mb-0.5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(i + 1).padStart(2, "0")} · {screen.label}
                  </div>
                  <p className="text-[#5a574f] text-sm">{screen.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Responsive preview */}
          <div className="bg-white border border-[#dedad3] rounded-2xl p-6 md:p-8">
            <div
              className="font-mono-tag text-[11px] text-[#9c9890] tracking-[0.15em] mb-6 uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Responsive Breakpoints
            </div>
            <div className="flex flex-col md:flex-row items-end gap-4 justify-center">
              {/* Desktop */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#f7f5f0] border-2 border-[#dedad3] rounded-lg w-64 h-36 flex flex-col p-2 gap-1.5">
                  <div className="h-4 bg-[#dedad3] rounded flex items-center px-1.5 gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9c9890]" />
                    <div className="h-1.5 bg-[#9c9890]/30 rounded flex-1" />
                  </div>
                  <div className="flex gap-1.5 flex-1">
                    <div className="w-10 bg-[#dedad3] rounded" />
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="h-8 bg-[#dedad3] rounded" />
                      <div className="grid grid-cols-3 gap-1 flex-1">
                        <div className="bg-[#dedad3] rounded" />
                        <div className="bg-[#dedad3] rounded" />
                        <div className="bg-[#dedad3] rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-16 h-1.5 bg-[#dedad3] rounded-full" />
                <div
                  className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  1440px
                </div>
              </div>

              {/* Tablet */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#f7f5f0] border-2 border-[#dedad3] rounded-lg w-36 h-44 flex flex-col p-2 gap-1.5">
                  <div className="h-3 bg-[#dedad3] rounded" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="h-12 bg-[#dedad3] rounded" />
                    <div className="grid grid-cols-2 gap-1 flex-1">
                      <div className="bg-[#dedad3] rounded" />
                      <div className="bg-[#dedad3] rounded" />
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#dedad3] mx-auto" />
                </div>
                <div
                  className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  768px
                </div>
              </div>

              {/* Mobile */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#f7f5f0] border-2 border-[#dedad3] rounded-xl w-20 h-36 flex flex-col p-1.5 gap-1">
                  <div className="w-6 h-1 bg-[#dedad3] rounded-full mx-auto" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="h-8 bg-[#dedad3] rounded" />
                    <div className="h-4 bg-[#dedad3] rounded" />
                    <div className="h-4 bg-[#dedad3] rounded" />
                    <div className="h-6 bg-[#2a5c45]/20 rounded mt-auto" />
                  </div>
                </div>
                <div
                  className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  375px
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#dedad3] pt-6 grid md:grid-cols-3 gap-4">
              {[
                { bp: "≥1024px", layout: "3-column grid, persistent sidebar" },
                { bp: "768–1023px", layout: "2-column grid, collapsible nav" },
                { bp: "<768px", layout: "Single column, bottom nav sheet" },
              ].map((b) => (
                <div key={b.bp} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2a5c45] mt-1.5 shrink-0" />
                  <div>
                    <div className="font-mono-tag text-[11px] text-[#1a1814] font-medium tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>
                      {b.bp}
                    </div>
                    <div className="text-[#9c9890] text-xs mt-0.5">{b.layout}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#dedad3] bg-[#f7f5f0]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="font-display text-xl text-[#1a1814] font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            UX Redesign
          </div>
          <div
            className="font-mono-tag text-[10px] text-[#9c9890] tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            HEURISTIC EVALUATION · MOOD BOARD · STYLE GUIDE · MOCKUPS
          </div>
        </div>
      </footer>
    </div>
  );
}
