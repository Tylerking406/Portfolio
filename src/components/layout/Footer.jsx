import { personal } from "../../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 24px",
        background: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}
        >
          &lt;AN /&gt; · {personal.name} · {year}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}
        >
          Built with React · Deployed on Cloudflare
        </span>
      </div>
    </footer>
  );
}
