import { PageTransition } from "@/components/PageTransition";

export default function NotesPage() {
  return (
    <PageTransition>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-bg)",
          paddingLeft: "var(--page-padding)",
          paddingRight: "var(--page-padding)",
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
    </PageTransition>
  );
}
