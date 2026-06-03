import { SignIn } from "@clerk/nextjs";

const TaxiLogo = () => (
  <div style={{ width: 44, height: 44, borderRadius: "12px", background: "linear-gradient(135deg, #F9D976 0%, #E9B649 50%, #B8860B 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" fill="#0B0A08" width="24" height="24">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  </div>
);

export default function SignInPage() {
  return (
    <>
      {/* Fixed background — dark atmospheric */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 0,
          background: "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(212,175,55,0.05) 0%, transparent 50%), #0f0e0c",
        }}
      >
        {/* Subtle gold glow orbs */}
        <div style={{ position: "absolute", top: "-100px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,175,55,0.09), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,175,55,0.06), transparent 70%)", pointerEvents: "none" }} />
        {/* Fine grid texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,175,55,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.02) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
      </div>

      {/* Scrollable content */}
      <div
        style={{
          position: "relative", zIndex: 1,
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "3rem 1rem", boxSizing: "border-box",
          fontFamily: "Outfit, system-ui, sans-serif",
        }}
      >
        {/* Logo + tagline */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "0.875rem" }}>
            <TaxiLogo />
            <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#F7F5F0", letterSpacing: "-0.01em" }}>TaxiTrio</span>
          </a>
          <p style={{ color: "#A39E93", fontSize: "0.9375rem", marginTop: "0.5rem" }}>
            Welcome back — sign in to your account
          </p>
          {/* Gold divider */}
          <div style={{ width: "2.5rem", height: "2px", background: "linear-gradient(135deg, #F9D976, #B8860B)", borderRadius: "9999px", margin: "1rem auto 0" }} />
        </div>

        {/* Clerk widget */}
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <SignIn
            appearance={{
              variables: {
                colorPrimary: "#D4AF37",
                colorBackground: "#1a1815",
                colorForeground: "#E7E2DD",
                colorMutedForeground: "#A39E93",
                colorInputForeground: "#E7E2DD",
                colorNeutral: "#99907C",
                borderRadius: "0.875rem",
                fontFamily: "Outfit, system-ui, sans-serif",
                fontSize: "0.9375rem",
              },
              options: {
                socialButtonsVariant: "blockButton",
                socialButtonsPlacement: "bottom",
              },
              elements: {
                rootBox: { width: "100%" },
                card: {
                  width: "100%",
                  margin: "0",
                  background: "rgba(26, 24, 21, 0.85)",
                  backdropFilter: "blur(20px) saturate(120%)",
                  WebkitBackdropFilter: "blur(20px) saturate(120%)",
                  border: "1px solid rgba(212,175,55,0.18)",
                  borderRadius: "1.5rem",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                },
                headerTitle: {
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontSize: "1.625rem",
                  fontWeight: 700,
                  color: "#F7F5F0",
                  letterSpacing: "-0.01em",
                },
                headerSubtitle: { color: "#A39E93", fontSize: "0.875rem" },
                formButtonPrimary: {
                  background: "linear-gradient(135deg, #F9D976 0%, #E9B649 50%, #B8860B 100%)",
                  color: "#0B0A08",
                  borderRadius: "9999px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  border: "none",
                },
                formFieldInput: {
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(163,158,147,0.2)",
                  borderRadius: "0.75rem",
                  color: "#E7E2DD",
                  fontSize: "0.9375rem",
                },
                formFieldLabel: {
                  color: "#D0C5AF",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                },
                footerActionLink: {
                  color: "#D4AF37",
                  fontWeight: 600,
                },
                dividerLine: { background: "rgba(212,175,55,0.15)" },
                dividerText: { color: "#A39E93", fontSize: "0.8125rem" },
                socialButtonsBlockButton: {
                  background: "rgba(30,28,24,0.5)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  borderRadius: "9999px",
                  color: "#D0C5AF",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                },
                identityPreviewEditButton: { color: "#D4AF37" },
                alert: { borderRadius: "0.75rem" },
              },
            }}
          />
        </div>

        {/* Back link */}
        <a
          href="/"
          style={{ marginTop: "1.5rem", color: "rgba(163,158,147,0.6)", fontSize: "0.875rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.375rem", transition: "color 0.2s" }}
          onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = "#D4AF37")}
          onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = "rgba(163,158,147,0.6)")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><polyline points="15 18 9 12 15 6"/></svg>
          Back to home
        </a>
      </div>
    </>
  );
}
