"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "Georgia, serif",
          background: "#fbfaf7",
          color: "#24272a",
        }}
      >
        <main style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontWeight: 300, fontSize: "2.5rem" }}>Somabay is briefly unavailable.</h1>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.9rem 2rem",
              border: "1px solid #24272a",
              background: "transparent",
              cursor: "pointer",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
