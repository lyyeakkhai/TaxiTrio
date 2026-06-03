"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

/* ────────────────────────────────────────────────────────────────
   Scroll-reveal hook
──────────────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ────────────────────────────────────────────────────────────────
   SVG Icons (Heroicons-style, inline)
──────────────────────────────────────────────────────────────── */
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);
const IconCreditCard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const IconStar = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "#F97316" : "none"} stroke="#F97316" strokeWidth={1.8} className="w-4 h-4">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
  </svg>
);
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

/* ────────────────────────────────────────────────────────────────
   Data
──────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <IconShield />,
    title: "Verified Drivers",
    body: "Every driver is background-checked, licensed, and rated by past travelers. No surprises.",
  },
  {
    icon: <IconMap />,
    title: "Intercity Routes",
    body: "Phnom Penh ↔ Siem Reap, Sihanoukville, Kampot & more — fixed transparent fares.",
  },
  {
    icon: <IconCreditCard />,
    title: "Local Payment Methods",
    body: "Pay with Cash, ABA Pay, KHQR, Wing Pay, or card. Upload proof — we verify it.",
  },
  {
    icon: <IconClock />,
    title: "Real-Time Tracking",
    body: "Watch your booking move from Pending → Driver Arrived → In Progress → Completed.",
  },
  {
    icon: <IconGlobe />,
    title: "6 Languages",
    body: "Full support in English, Khmer, Chinese, Japanese, Korean & French for every traveler.",
  },
  {
    icon: <IconWhatsApp />,
    title: "WhatsApp Contact",
    body: "Tap to contact your driver on WhatsApp — auto-filled messages, no new app needed.",
  },
];

const STEPS = [
  { num: "01", title: "Search your route", body: "Enter your pickup, destination, and date. Browse fixed-price packages." },
  { num: "02", title: "Book & pay securely", body: "Choose your payment method — KHQR, ABA, Wing Pay, or card." },
  { num: "03", title: "Track in real time", body: "Get notified at every step. Contact your driver on WhatsApp." },
  { num: "04", title: "Arrive & review", body: "Rate your driver and help the next traveler choose with confidence." },
];

const TESTIMONIALS = [
  {
    name: "Sophie Martin",
    role: "France · Traveled Phnom Penh → Siem Reap",
    rating: 5,
    quote:
      "The booking was seamless and the driver spoke French! Pricing was exactly as listed — no hidden charges at all. Would absolutely use TaxiTrio again.",
    initials: "SM",
    color: "#1E3A8A",
  },
  {
    name: "Kenji Tanaka",
    role: "Japan · Angkor Sunrise Tour",
    rating: 5,
    quote:
      "Our guide was punctual, knowledgeable, and the payment via KHQR was super convenient. The real-time tracking feature gave us great peace of mind.",
    initials: "KT",
    color: "#0F2660",
  },
  {
    name: "Liu Wei",
    role: "China · City Tour Package",
    rating: 5,
    quote:
      "我可以用微信扫码支付，司机会说中文，服务非常专业。旅途中完全没有骗局，非常值得推荐！",
    initials: "LW",
    color: "#1d4ed8",
  },
];

const ROUTES = [
  { from: "Phnom Penh", to: "Siem Reap", time: "~6 hrs", price: "from $25" },
  { from: "Phnom Penh", to: "Sihanoukville", time: "~4 hrs", price: "from $20" },
  { from: "Siem Reap", to: "Kampot", time: "~5 hrs", price: "from $22" },
  { from: "Phnom Penh", to: "Kampot", time: "~3 hrs", price: "from $18" },
];

/* ────────────────────────────────────────────────────────────────
   Page Component
──────────────────────────────────────────────────────────────── */
export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#EFF6FF" }}>

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          right: "16px",
          zIndex: 100,
          background: "rgba(15, 38, 96, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "1rem",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <span style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
            TaxiTrio
          </span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden md:flex">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#routes" className="nav-link">Routes</a>
          <a href="#testimonials" className="nav-link">Reviews</a>
        </div>

        {/* Auth buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Show when="signed-out">
            <SignInButton>
              <button
                id="nav-sign-in-btn"
                style={{
                  background: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  borderRadius: "9999px",
                  padding: "0.5rem 1.25rem",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; (e.target as HTMLButtonElement).style.borderColor = "#fff"; }}
                onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "transparent"; (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)"; }}
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                id="nav-sign-up-btn"
                className="btn-cta"
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem", borderRadius: "9999px" }}
              >
                Book Now
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          {/* Mobile menu icon */}
          <button
            id="mobile-menu-btn"
            aria-label="Open menu"
            style={{ background: "transparent", border: "none", color: "#ffffff", cursor: "pointer", padding: "4px", display: "none" }}
            className="md:hidden"
          >
            <IconMenu />
          </button>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <Image
          src="/hero-bg.png"
          alt="Taxi driving near Angkor Wat at sunset"
          fill
          priority
          className="object-cover"
          style={{ zIndex: 0 }}
        />
        {/* Gradient overlay */}
        <div className="gradient-hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 80px" }}>
          <div style={{ maxWidth: "640px" }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(249, 115, 22, 0.18)", border: "1px solid rgba(249,115,22,0.4)",
              borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1.5rem",
              color: "#FED7AA", fontSize: "0.875rem", fontWeight: 500,
            }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><circle cx="12" cy="12" r="4"/></svg>
              Serving 6 Languages · Verified Drivers
            </div>

            <h1 style={{
              fontFamily: "EB Garamond, Georgia, serif",
              fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}>
              Explore Cambodia<br />
              <span style={{ color: "#FED7AA" }}>Without the Scams.</span>
            </h1>

            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
              maxWidth: "520px",
            }}>
              Book verified taxis, intercity routes, and guided tours across Cambodia. 
              Transparent pricing, real-time tracking, and local payment methods — trusted by travelers from 40+ countries.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <SignUpButton>
                <button id="hero-book-btn" className="btn-cta" style={{ fontSize: "1rem" }}>
                  Book a Ride
                  <IconArrowRight />
                </button>
              </SignUpButton>
              <a href="#how-it-works" className="btn-outline" style={{ fontSize: "1rem" }}>
                How it Works
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[
                { num: "12,000+", label: "Trips completed" },
                { num: "4.9★", label: "Average rating" },
                { num: "40+", label: "Countries served" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.875rem", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          <span>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)", animation: "none" }} />
        </div>
      </section>

      {/* ── PAYMENT BADGES ────────────────────────────────────── */}
      <section style={{ background: "#ffffff", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "1.25rem 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8125rem", color: "#64748B", marginRight: "0.5rem" }}>Accepted payments:</span>
          {["Cash", "ABA Pay", "KHQR", "Wing Pay", "Visa / MC"].map((p) => (
            <span key={p} className="payment-badge">{p}</span>
          ))}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section id="features" style={{ padding: "96px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "inline-block", background: "#DBEAFE", borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1rem", color: "#1E3A8A", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Why TaxiTrio
          </div>
          <h2 style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0F172A", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Travel smarter, safer,<br />without surprises
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "#475569", marginTop: "1rem", maxWidth: "480px", margin: "1rem auto 0" }}>
            Every feature is designed around the needs of international tourists in Cambodia.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div style={{ width: "56px", height: "56px", borderRadius: "1rem", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#1E3A8A", marginBottom: "1.25rem" }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: 1.65 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPULAR ROUTES ────────────────────────────────────── */}
      <section id="routes" style={{ background: "#ffffff", padding: "96px 24px", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-block", background: "#FFF7ED", borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1rem", color: "#C2410C", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Popular Routes
            </div>
            <h2 style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em" }}>
              Fixed prices, no haggling
            </h2>
            <p style={{ fontSize: "1.0625rem", color: "#475569", marginTop: "1rem" }}>
              All intercity fares are fixed and transparent — what you see is what you pay.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {ROUTES.map((r, i) => (
              <div
                key={`${r.from}-${r.to}`}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  background: "linear-gradient(135deg, #1E3A8A 0%, #1d4ed8 100%)",
                  borderRadius: "1.25rem",
                  padding: "1.75rem",
                  color: "#ffffff",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(30,58,138,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)", marginBottom: "0.75rem", fontWeight: 500 }}>INTERCITY ROUTE</div>
                <div style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "0.5rem" }}>
                  {r.from} → {r.to}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "1.25rem" }}>
                  <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "14px", height: "14px", display: "inline", marginRight: "4px", verticalAlign: "middle" }}>
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {r.time}
                  </div>
                  <div style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.625rem", fontWeight: 700, color: "#FED7AA" }}>{r.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <SignUpButton>
              <button id="routes-view-all-btn" className="btn-cta" style={{ fontSize: "0.9375rem" }}>
                View All Routes
                <IconArrowRight />
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "96px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "inline-block", background: "#DBEAFE", borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1rem", color: "#1E3A8A", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            How it Works
          </div>
          <h2 style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em" }}>
            From search to arrival<br />in 4 easy steps
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
          {STEPS.map((s, i) => (
            <div key={s.num} className={`reveal reveal-delay-${i + 1}`} style={{ textAlign: "center", position: "relative" }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: "linear-gradient(135deg, #1E3A8A, #3B82F6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.25rem",
                boxShadow: "0 8px 24px rgba(30,58,138,0.25)",
              }}>
                <span style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#ffffff" }}>{s.num}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  position: "absolute", top: "36px", left: "calc(50% + 36px)",
                  width: "calc(100% - 72px)", height: "2px",
                  background: "linear-gradient(to right, #BFDBFE, #93C5FD)",
                  display: "none",
                }} className="md:block" />
              )}
              <h3 style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: 1.6 }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Feature checklist */}
        <div className="reveal" style={{
          marginTop: "4rem",
          background: "linear-gradient(135deg, #0F2660 0%, #1E3A8A 100%)",
          borderRadius: "1.5rem",
          padding: "clamp(2rem, 4vw, 3.5rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          alignItems: "center",
        }}>
          <div>
            <h3 style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: "1rem" }}>
              Everything you need for stress-free travel
            </h3>
            <SignUpButton>
              <button id="checklist-cta-btn" className="btn-cta" style={{ marginTop: "0.5rem" }}>
                Get Started Free
                <IconArrowRight />
              </button>
            </SignUpButton>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              "Emergency contacts & tourist police info",
              "Rest stop information for long trips",
              "Driver language display & translation",
              "Complaint system with admin follow-up",
              "Photo proof upload for payment verification",
              "Booking history & status timeline",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "rgba(255,255,255,0.88)", fontSize: "0.9375rem" }}>
                <span style={{ flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%", background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
                  <IconCheck />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section id="testimonials" style={{ background: "#ffffff", padding: "96px 24px", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-block", background: "#FFF7ED", borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1rem", color: "#C2410C", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Traveler Reviews
            </div>
            <h2 style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em" }}>
              Trusted by travelers<br />from around the world
            </h2>
            {/* Aggregate rating */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
              <div style={{ display: "flex", gap: "2px" }}>{[1,2,3,4,5].map(n => <IconStar key={n} filled />)}</div>
              <span style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#0F172A" }}>4.9</span>
              <span style={{ color: "#64748B", fontSize: "0.9375rem" }}>from 1,240+ reviews</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
                {/* Stars */}
                <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
                  {[1,2,3,4,5].map(n => <IconStar key={n} filled={n <= t.rating} />)}
                </div>
                {/* Quote */}
                <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "0.875rem", fontWeight: 700, flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#0F172A", fontSize: "0.9375rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.8125rem", color: "#64748B" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            className="reveal"
            style={{
              background: "linear-gradient(135deg, #0F2660 0%, #1E3A8A 60%, #1d4ed8 100%)",
              borderRadius: "2rem",
              padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background accents */}
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(249,115,22,0.1)" }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-block", background: "rgba(249,115,22,0.2)", border: "1px solid rgba(249,115,22,0.4)", borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1.5rem", color: "#FED7AA", fontSize: "0.875rem", fontWeight: 500 }}>
                Start exploring Cambodia today
              </div>
              <h2 style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                Your journey across<br />Cambodia starts here
              </h2>
              <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.76)", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: 1.65 }}>
                Join 12,000+ travelers who explore Cambodia confidently with verified drivers and transparent pricing.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <SignUpButton>
                  <button id="cta-final-signup-btn" className="btn-cta" style={{ fontSize: "1.0625rem", padding: "1rem 2.25rem" }}>
                    Book Your First Ride
                    <IconArrowRight />
                  </button>
                </SignUpButton>
                <a href="#features" className="btn-outline" style={{ fontSize: "1.0625rem", padding: "1rem 2.25rem" }}>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ background: "#0F172A", color: "rgba(255,255,255,0.7)", padding: "3rem 24px 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#ffffff" }}>TaxiTrio</span>
              </div>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.65, maxWidth: "220px" }}>
                Smart tourist transportation and tour booking platform for Cambodia.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: "#ffffff", fontWeight: 600, marginBottom: "0.875rem", fontSize: "0.9375rem" }}>Services</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
                {["City Taxi Booking", "Intercity Routes", "Tour Packages", "Airport Transfers"].map(l => (
                  <li key={l}><a href="#" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#fff"} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)"}>{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 style={{ color: "#ffffff", fontWeight: 600, marginBottom: "0.875rem", fontSize: "0.9375rem" }}>Support</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
                {["Help Center", "Contact Us", "Safety Guidelines", "Tourist Police"].map(l => (
                  <li key={l}><a href="#" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#fff"} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)"}>{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h4 style={{ color: "#ffffff", fontWeight: 600, marginBottom: "0.875rem", fontSize: "0.9375rem" }}>Languages</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {["🇺🇸 EN", "🇰🇭 KH", "🇨🇳 ZH", "🇯🇵 JP", "🇰🇷 KR", "🇫🇷 FR"].map(l => (
                  <span key={l} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "6px", padding: "0.25rem 0.625rem", fontSize: "0.8125rem", cursor: "pointer" }}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: "0.8125rem" }}>
            <span>© 2026 TaxiTrio. Built for Cambodia&apos;s travelers.</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Privacy</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
