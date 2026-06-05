"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export const TaxiLogo = ({ size = 36 }: { size?: number }) => (
  <div style={{ width: size, height: size, borderRadius: "10px", background: "linear-gradient(135deg, #F9D976 0%, #E9B649 50%, #B8860B 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" fill="#0B0A08" width={size * 0.55} height={size * 0.55}>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  </div>
);

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Routes", href: "#routes" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
];

export function NavigationBar() {

  return (
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
        {NAV_LINKS.map((link) => (
          <Link 
            key={link.label} 
            href={link.href} 
            className="nav-link"
          >
            {link.label}
          </Link>
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
        <Show when="signed-in">
          <Link href="/customer/dashboard" className="btn-gold" style={{ padding: "0.4375rem 1.25rem", fontSize: "0.875rem" }}>
            Customer
          </Link>
          <UserButton />
        </Show>
      </div>
    </nav>
  );
}
