"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

/* ── Scroll-reveal ─────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Icons ─────────────────────────────────────────────────── */
const IconShield = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const IconMap = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>);
const IconCard = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>);
const IconClock = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const IconGlobe = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
const IconWhatsApp = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>);
const IconArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const IconCheck = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>);
const IconStar = ({ on }: { on?: boolean }) => (<svg viewBox="0 0 24 24" fill={on ? "#E9B649" : "none"} stroke="#E9B649" strokeWidth={1.5} width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);

/* ── Data ──────────────────────────────────────────────────── */
const FEATURES = [
  { icon: <IconShield />, title: "Verified Drivers", body: "Every driver is background-checked, licensed, and rated by past travelers. No surprises, ever." },
  { icon: <IconMap />, title: "Intercity Routes", body: "Phnom Penh ↔ Siem Reap, Sihanoukville, Kampot & more — fixed transparent fares, zero haggling." },
  { icon: <IconCard />, title: "Local Payments", body: "Pay with Cash, ABA Pay, KHQR, Wing Pay, or card. Upload proof — we verify in minutes." },
  { icon: <IconClock />, title: "Real-Time Tracking", body: "Live status: Pending → Driver Arrived → In Progress → Completed. Always know where you stand." },
  { icon: <IconGlobe />, title: "6 Languages", body: "English, Khmer, Chinese, Japanese, Korean & French — full support for every traveler." },
  { icon: <IconWhatsApp />, title: "WhatsApp Contact", body: "Tap to contact your driver on WhatsApp with auto-filled messages. No new app needed." },
];

const STEPS = [
  { num: "01", title: "Search your route", body: "Enter pickup, destination & date. Browse fixed-price packages with no hidden fees." },
  { num: "02", title: "Book & pay securely", body: "Choose your payment method — KHQR, ABA, Wing Pay, or card. Instant confirmation." },
  { num: "03", title: "Track in real time", body: "Get notified at every status change. Contact your driver on WhatsApp anytime." },
  { num: "04", title: "Arrive & rate", body: "Review your driver and help the next traveler choose with confidence." },
];

const ROUTES = [
  { from: "Phnom Penh", to: "Siem Reap", time: "~6 hrs", price: "from $25" },
  { from: "Phnom Penh", to: "Sihanoukville", time: "~4 hrs", price: "from $20" },
  { from: "Siem Reap", to: "Kampot", time: "~5 hrs", price: "from $22" },
  { from: "Phnom Penh", to: "Kampot", time: "~3 hrs", price: "from $18" },
];

const TESTIMONIALS = [
  { name: "Sophie Martin", role: "France · Phnom Penh → Siem Reap", rating: 5, quote: "The booking was seamless and the driver spoke French! Pricing was exactly as listed — no hidden charges. Would absolutely use TaxiTrio again.", initials: "SM" },
  { name: "Kenji Tanaka", role: "Japan · Angkor Sunrise Tour", rating: 5, quote: "Punctual, knowledgeable, and KHQR payment was super convenient. The real-time tracking gave us total peace of mind the entire journey.", initials: "KT" },
  { name: "Liu Wei", role: "China · City Tour Package", rating: 5, quote: "我可以用微信扫码支付，司机会说中文，服务非常专业。旅途中完全没有骗局，非常值得推荐！", initials: "LW" },
];

const CHECKLIST = [
  "Emergency contacts & tourist police info",
  "Rest stop information for long trips",
  "Driver language display & translation",
  "Complaint system with admin follow-up",
  "Photo proof upload for payment verification",
  "Full booking history & status timeline",
];

/* ── Logo ──────────────────────────────────────────────────── */
const TaxiLogo = ({ size = 36 }: { size?: number }) => (
  <div style={{ width: size, height: size, borderRadius: "10px", background: "linear-gradient(135deg, #F9D976 0%, #E9B649 50%, #B8860B 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" fill="#0B0A08" width={size * 0.55} height={size * 0.55}>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   Page
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  useScrollReveal();

  return (
    <div style={{ background: "#141311", color: "#e7e2dd", fontFamily: "Outfit, system-ui, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        style={{
          position: "fixed", top: "14px", left: "14px", right: "14px", zIndex: 100,
          background: "rgba(11,10,8,0.72)",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          borderRadius: "1.25rem",
          border: "1px solid rgba(212,175,55,0.12)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          padding: "0 1.5rem",
          height: "62px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <TaxiLogo size={36} />
          <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#F7F5F0", letterSpacing: "-0.01em" }}>TaxiTrio</span>
        </Link>

        <div className="hidden md:flex" style={{ gap: "2rem", alignItems: "center" }}>
          {["Features","Routes","How it Works","Reviews"].map((label, i) => (
            <a key={label} href={`#${["features","routes","how-it-works","testimonials"][i]}`} className="nav-link">{label}</a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Show when="signed-out">
            <SignInButton>
              <button id="nav-signin-btn" style={{ background: "transparent", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "9999px", padding: "0.4375rem 1.125rem", color: "#D4AF37", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.7)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.3)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button id="nav-signup-btn" className="btn-gold" style={{ padding: "0.4375rem 1.25rem", fontSize: "0.875rem" }}>
                Book Now
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in"><UserButton /></Show>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* BG image */}
        <Image src="/hero-bg.png" alt="Taxi near Angkor Wat at golden hour" fill priority className="object-cover" style={{ zIndex: 0 }} />
        {/* Dark vignette overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(11,10,8,0.92) 0%, rgba(11,10,8,0.75) 55%, rgba(11,10,8,0.3) 100%)" }} />
        {/* Gold glow bottom */}
        <div style={{ position: "absolute", bottom: "-80px", left: "20%", width: "500px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)", zIndex: 1, pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 80px" }}>
          <div style={{ maxWidth: "660px" }}>
            {/* Label */}
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              <svg viewBox="0 0 8 8" fill="#D4AF37" width="7" height="7"><circle cx="4" cy="4" r="4"/></svg>
              Verified Drivers · 6 Languages · Real-Time Tracking
            </div>

            <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2.75rem, 6vw, 4.5rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: "#F7F5F0" }}>
              Explore Cambodia<br />
              <span className="text-gold-gradient">Without the Scams.</span>
            </h1>

            <p style={{ fontSize: "clamp(1rem, 2vw, 1.175rem)", color: "rgba(231,226,221,0.75)", lineHeight: 1.65, marginBottom: "2.5rem", maxWidth: "520px" }}>
              Book verified taxis, intercity routes, and guided tours across Cambodia. Transparent pricing, real-time tracking, and local payment methods — trusted by travelers from 40+ countries.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <SignUpButton>
                <button id="hero-book-btn" className="btn-gold" style={{ fontSize: "1rem", padding: "1rem 2.25rem" }}>
                  Book a Ride <IconArrow />
                </button>
              </SignUpButton>
              <a href="#how-it-works" className="btn-glass" style={{ fontSize: "1rem", padding: "1rem 2.25rem" }}>How it Works</a>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[["12,000+", "Trips completed"], ["4.9★", "Average rating"], ["40+", "Countries served"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1, background: "linear-gradient(135deg, #F9D976, #E9B649)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{num}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(231,226,221,0.5)", marginTop: "0.25rem", letterSpacing: "0.03em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: "rgba(212,175,55,0.4)", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <span>Scroll</span>
          <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, rgba(212,175,55,0.5), transparent)" }} />
        </div>
      </section>

      {/* ── PAYMENT STRIP ─────────────────────────────────────── */}
      <section style={{ background: "rgba(11,10,8,0.9)", borderTop: "1px solid rgba(212,175,55,0.1)", borderBottom: "1px solid rgba(212,175,55,0.1)", padding: "1.125rem 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8rem", color: "#A39E93", marginRight: "0.25rem", letterSpacing: "0.04em" }}>ACCEPTED PAYMENTS</span>
          {["Cash", "ABA Pay", "KHQR", "Wing Pay", "Visa / MC"].map((p) => (
            <span key={p} className="payment-badge">{p}</span>
          ))}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section id="features" style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ marginBottom: "1.25rem" }}>Why TaxiTrio</div>
          <div className="gold-divider" style={{ marginBottom: "1.25rem" }} />
          <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#F7F5F0", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Travel smarter, safer,<br />without surprises
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "#A39E93", marginTop: "1rem", maxWidth: "460px", margin: "1rem auto 0" }}>
            Every feature is designed for international tourists navigating Cambodia.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`glass-card reveal reveal-delay-${(i % 4) + 1}`}>
              <div style={{ width: "54px", height: "54px", borderRadius: "1rem", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4AF37", marginBottom: "1.25rem" }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: "Outfit, system-ui, sans-serif", fontSize: "1.25rem", fontWeight: 600, color: "#F7F5F0", marginBottom: "0.5rem" }}>{f.title}</h3>
              <p style={{ fontSize: "0.9375rem", color: "#A39E93", lineHeight: 1.65 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROUTES ────────────────────────────────────────────── */}
      <section id="routes" style={{ padding: "100px 24px", background: "rgba(15,14,12,0.6)", borderTop: "1px solid rgba(212,175,55,0.08)", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="section-label" style={{ marginBottom: "1.25rem" }}>Popular Routes</div>
            <div className="gold-divider" style={{ marginBottom: "1.25rem" }} />
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#F7F5F0", letterSpacing: "-0.02em" }}>
              Fixed prices, no haggling
            </h2>
            <p style={{ fontSize: "1.0625rem", color: "#A39E93", marginTop: "1rem" }}>
              All intercity fares are fixed and transparent — what you see is what you pay.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {ROUTES.map((r, i) => (
              <div key={`${r.from}-${r.to}`} className={`route-card reveal reveal-delay-${i + 1}`}>
                {/* Gold accent corner */}
                <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "100px", height: "100px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,175,55,0.08), transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "0.7rem", color: "#8A7323", marginBottom: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Intercity Route</div>
                  <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#F7F5F0", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                    {r.from}<br />
                    <span style={{ color: "#D4AF37", fontSize: "1rem", fontFamily: "Outfit, sans-serif", fontWeight: 400 }}>→</span> {r.to}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.875rem", color: "#A39E93", display: "flex", alignItems: "center", gap: "4px" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="13" height="13"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {r.time}
                    </span>
                    <span className="text-gold-gradient" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.625rem", fontWeight: 700 }}>{r.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <SignUpButton>
              <button id="routes-view-all-btn" className="btn-gold" style={{ fontSize: "0.9375rem" }}>
                View All Routes <IconArrow />
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ marginBottom: "1.25rem" }}>How it Works</div>
          <div className="gold-divider" style={{ marginBottom: "1.25rem" }} />
          <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#F7F5F0", letterSpacing: "-0.02em" }}>
            From search to arrival<br />in 4 easy steps
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {STEPS.map((s, i) => (
            <div key={s.num} className={`reveal reveal-delay-${i + 1}`} style={{ textAlign: "center" }}>
              <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "linear-gradient(135deg, #F9D976 0%, #E9B649 50%, #B8860B 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", boxShadow: "0 0 28px rgba(212,175,55,0.3)" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", fontWeight: 700, color: "#0B0A08" }}>{s.num}</span>
              </div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#F7F5F0", marginBottom: "0.5rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.9375rem", color: "#A39E93", lineHeight: 1.65 }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Checklist CTA banner */}
        <div className="reveal glass-card" style={{ padding: "clamp(2rem,4vw,3.5rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", alignItems: "center", background: "rgba(20,18,15,0.6)" }}>
          {/* Gold glow accent */}
          <div className="gold-glow-orb" style={{ width: "300px", height: "300px", background: "radial-gradient(ellipse, rgba(212,175,55,0.12), transparent 70%)", right: "0", top: "-50px" }} />
          <div style={{ position: "relative" }}>
            <div className="section-label" style={{ marginBottom: "1rem" }}>Everything included</div>
            <h3 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, color: "#F7F5F0", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              Stress-free travel,<br />from start to finish
            </h3>
            <SignUpButton>
              <button id="checklist-cta-btn" className="btn-gold">
                Get Started Free <IconArrow />
              </button>
            </SignUpButton>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem", position: "relative" }}>
            {CHECKLIST.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "#D0C5AF", fontSize: "0.9375rem" }}>
                <span style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg, #F9D976, #B8860B)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
                  <IconCheck />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section id="testimonials" style={{ padding: "100px 24px", background: "rgba(15,14,12,0.6)", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="section-label" style={{ marginBottom: "1.25rem" }}>Traveler Reviews</div>
            <div className="gold-divider" style={{ marginBottom: "1.25rem" }} />
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#F7F5F0", letterSpacing: "-0.02em" }}>
              Trusted by travelers<br />from around the world
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
              <div style={{ display: "flex", gap: "2px" }}>{[1,2,3,4,5].map(n => <IconStar key={n} on />)}</div>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.375rem", fontWeight: 700, color: "#E9B649" }}>4.9</span>
              <span style={{ color: "#A39E93", fontSize: "0.9375rem" }}>from 1,240+ reviews</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
                {/* Quote mark */}
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "4rem", lineHeight: 0.8, color: "rgba(212,175,55,0.2)", marginBottom: "0.75rem", userSelect: "none" }}>&ldquo;</div>
                <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
                  {[1,2,3,4,5].map(n => <IconStar key={n} on={n <= t.rating} />)}
                </div>
                <p style={{ fontSize: "0.9375rem", color: "#D0C5AF", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg, #F9D976, #B8860B)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0B0A08", fontSize: "0.875rem", fontWeight: 700, flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#F7F5F0", fontSize: "0.9375rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.8125rem", color: "#A39E93" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="reveal glass-card" style={{ padding: "clamp(3rem,6vw,5rem) clamp(2rem,5vw,5rem)", textAlign: "center", position: "relative", overflow: "hidden" }}>
            {/* Gold orbs */}
            <div className="gold-glow-orb" style={{ width: "350px", height: "350px", background: "radial-gradient(ellipse, rgba(212,175,55,0.14), transparent 70%)", top: "-100px", right: "-100px" }} />
            <div className="gold-glow-orb" style={{ width: "250px", height: "250px", background: "radial-gradient(ellipse, rgba(212,175,55,0.1), transparent 70%)", bottom: "-60px", left: "-60px" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="section-label" style={{ marginBottom: "1.5rem" }}>Start today</div>
              <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 600, lineHeight: 1.15, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                <span className="text-gold-gradient">Your journey</span> across<br />Cambodia starts here
              </h2>
              <p style={{ fontSize: "1.0625rem", color: "#A39E93", maxWidth: "460px", margin: "0 auto 2.5rem", lineHeight: 1.65 }}>
                Join 12,000+ travelers who explore Cambodia confidently with verified drivers and transparent pricing.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <SignUpButton>
                  <button id="final-cta-btn" className="btn-gold" style={{ fontSize: "1.0625rem", padding: "1.0625rem 2.5rem" }}>
                    Book Your First Ride <IconArrow />
                  </button>
                </SignUpButton>
                <a href="#features" className="btn-glass" style={{ fontSize: "1.0625rem", padding: "1.0625rem 2.5rem" }}>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ background: "#0f0e0c", borderTop: "1px solid rgba(212,175,55,0.1)", padding: "3.5rem 24px 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem", marginBottom: "3rem" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
                <TaxiLogo size={30} />
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.125rem", fontWeight: 700, color: "#F7F5F0" }}>TaxiTrio</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#A39E93", lineHeight: 1.65, maxWidth: "200px" }}>Smart tourist transportation and tour booking for Cambodia.</p>
            </div>
            {/* Services */}
            <div>
              <h4 style={{ color: "#D4AF37", fontWeight: 600, marginBottom: "1rem", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Services</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["City Taxi", "Intercity Routes", "Tour Packages", "Airport Transfers"].map(l => (
                  <li key={l}><a href="#" style={{ color: "#A39E93", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#D4AF37"} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "#A39E93"}>{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Support */}
            <div>
              <h4 style={{ color: "#D4AF37", fontWeight: 600, marginBottom: "1rem", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Support</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Help Center", "Contact Us", "Safety Info", "Tourist Police"].map(l => (
                  <li key={l}><a href="#" style={{ color: "#A39E93", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#D4AF37"} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "#A39E93"}>{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Languages */}
            <div>
              <h4 style={{ color: "#D4AF37", fontWeight: 600, marginBottom: "1rem", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Languages</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {["🇺🇸 EN","🇰🇭 KH","🇨🇳 ZH","🇯🇵 JP","🇰🇷 KR","🇫🇷 FR"].map(l => (
                  <span key={l} style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: "6px", padding: "0.25rem 0.625rem", fontSize: "0.8rem", color: "#D0C5AF", cursor: "pointer" }}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(212,175,55,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontSize: "0.8125rem", color: "#A39E93" }}>© 2026 TaxiTrio. Built for Cambodia&apos;s travelers.</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy","Terms"].map(l => (
                <a key={l} href="#" style={{ color: "#A39E93", fontSize: "0.8125rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#D4AF37"} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "#A39E93"}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
