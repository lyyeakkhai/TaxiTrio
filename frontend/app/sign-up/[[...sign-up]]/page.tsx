import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      {/* Fixed full-screen background */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "linear-gradient(135deg, #0F2660 0%, #1E3A8A 60%, #1d4ed8 100%)",
        }}
      >
        {/* Decorative blobs — fixed so they don't scroll */}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "380px", height: "380px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(249,115,22,0.09)", pointerEvents: "none" }} />
      </div>

      {/* Scrollable content layer */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1rem",
          boxSizing: "border-box",
        }}
      >
        {/* Logo + tagline */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <a
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <span style={{ fontFamily: "EB Garamond, Georgia, serif", fontSize: "1.875rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
              TaxiTrio
            </span>
          </a>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9375rem", marginTop: "0.5rem", letterSpacing: "0.01em" }}>
            Create your account and explore Cambodia safely
          </p>
        </div>

        {/* Clerk SignUp widget */}
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <SignUp
            appearance={{
              variables: {
                colorPrimary: "#1E3A8A",
                colorBackground: "#ffffff",
                colorForeground: "#0F172A",
                colorMutedForeground: "#475569",
                colorInputForeground: "#0F172A",
                colorNeutral: "#64748B",
                borderRadius: "0.875rem",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "0.9375rem",
              },
              options: {
                socialButtonsVariant: "blockButton",
                socialButtonsPlacement: "bottom",
              },
              elements: {
                rootBox: {
                  width: "100%",
                },
                card: {
                  width: "100%",
                  boxShadow: "0 24px 64px rgba(15,38,96,0.22), 0 4px 16px rgba(15,38,96,0.1)",
                  border: "1px solid rgba(203,213,225,0.5)",
                  borderRadius: "1.25rem",
                  margin: "0",
                },
                headerTitle: {
                  fontFamily: "EB Garamond, Georgia, serif",
                  fontSize: "1.625rem",
                  fontWeight: 700,
                  color: "#0F172A",
                  letterSpacing: "-0.01em",
                },
                headerSubtitle: {
                  color: "#475569",
                  fontSize: "0.875rem",
                },
                formButtonPrimary: {
                  backgroundColor: "#F97316",
                  borderRadius: "9999px",
                  fontSize: "1rem",
                  fontWeight: 600,
                },
                formFieldInput: {
                  borderRadius: "0.75rem",
                  border: "1.5px solid #CBD5E1",
                  backgroundColor: "#F8FAFC",
                  fontSize: "0.9375rem",
                },
                formFieldLabel: {
                  color: "#374151",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                },
                footerActionLink: {
                  color: "#1E3A8A",
                  fontWeight: 600,
                },
                dividerLine: {
                  backgroundColor: "#E2E8F0",
                },
                dividerText: {
                  color: "#94A3B8",
                  fontSize: "0.8125rem",
                },
                socialButtonsBlockButton: {
                  borderRadius: "9999px",
                  border: "1.5px solid #E2E8F0",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                },
                alert: {
                  borderRadius: "0.75rem",
                },
                // Hide phone number field
                phoneNumberField: {
                  display: "none",
                },
                formField__phoneNumber: {
                  display: "none",
                },
              },
            }}
          />
        </div>

        {/* Back to home */}
        <a
          href="/"
          style={{
            marginTop: "1.5rem",
            color: "rgba(255,255,255,0.55)",
            fontSize: "0.875rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)")}
          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to home
        </a>
      </div>
    </>
  );
}
