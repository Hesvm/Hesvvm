export default function FaNotesPage() {
  return (
    <main
      className="site-content"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "rtl",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-persian)",
          fontWeight: 700,
          fontSize: "24px",
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        به‌زودی می‌نویسم.
      </p>
    </main>
  );
}
