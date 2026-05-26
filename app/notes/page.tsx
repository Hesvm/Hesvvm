export default function NotesPage() {
  return (
    <main
      className="site-content"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "24px",
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        Writing soon.
      </p>
    </main>
  );
}
