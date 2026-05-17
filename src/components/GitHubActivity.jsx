import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { GitBranch, Star, Users, Code } from "lucide-react";

const GITHUB_USER = "Tylerking406";

export default function GitHubActivity() {
  const { ref, isVisible } = useScrollReveal();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`).then(r => r.json()),
    ])
      .then(([user, repoList]) => {
        const totalStars = Array.isArray(repoList)
          ? repoList.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
          : 0;

        const recentRepos = Array.isArray(repoList)
          ? repoList
              .filter(r => !r.fork)
              .slice(0, 4)
              .map(r => ({
                name: r.name,
                description: r.description,
                language: r.language,
                stars: r.stargazers_count,
                url: r.html_url,
                pushed: r.pushed_at,
              }))
          : [];

        setStats({
          repos: user.public_repos || 0,
          followers: user.followers || 0,
          stars: totalStars,
          since: user.created_at ? new Date(user.created_at).getFullYear() : "2020",
        });
        setRepos(recentRepos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const LANG_COLORS = {
    "C#": "#178600", JavaScript: "#f1e05a", TypeScript: "#3178c6",
    Python: "#3572A5", Java: "#b07219", Kotlin: "#A97BFF",
    Vue: "#41b883", HTML: "#e34c26", CSS: "#563d7c",
  };

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  }

  return (
    <section style={{
      padding: "80px 24px",
      borderTop: "1px solid var(--border)",
      background: "var(--bg-secondary)",
    }}>
      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "40px", flexWrap: "wrap", gap: "16px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <div>
            <span className="section-label"><span className="h-line" />GitHub Activity</span>
            <h2 className="font-display" style={{
              fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800,
              marginTop: "8px", letterSpacing: "-0.02em",
            }}>
              Always Shipping
            </h2>
          </div>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer"
            className="font-mono" style={{
              fontSize: "0.68rem", color: "var(--accent-cyan)", textDecoration: "none",
              letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "6px",
            }}>
            <GitBranch size={13} /> @{GITHUB_USER}
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px", marginBottom: "32px",
          opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease 0.1s",
        }} className="github-stats-grid">
          {[
            { icon: Code, label: "Public Repos", value: loading ? "—" : stats?.repos, color: "var(--accent-cyan)" },
            { icon: Star, label: "Total Stars", value: loading ? "—" : stats?.stars, color: "var(--accent-gold)" },
            { icon: Users, label: "Followers", value: loading ? "—" : stats?.followers, color: "var(--accent-cyan)" },
            { icon: GitBranch, label: "Coding Since", value: loading ? "—" : stats?.since, color: "var(--accent-gold)" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "4px", padding: "20px 24px",
            }}>
              <Icon size={14} color={color} style={{ marginBottom: "10px" }} />
              <p className="font-display" style={{
                fontSize: "28px", fontWeight: 800, color,
                letterSpacing: "-0.02em", lineHeight: 1,
              }}>{value ?? "—"}</p>
              <p className="font-mono" style={{
                fontSize: "0.6rem", color: "var(--text-muted)",
                letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "6px",
              }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Recent repos */}
        {repos.length > 0 && (
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease 0.2s",
          }} className="github-repos-grid">
            {repos.map((repo) => (
              <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer"
                className="card-hover"
                style={{
                  display: "block", textDecoration: "none",
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: "4px", padding: "18px 20px",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span className="font-mono" style={{
                    fontSize: "0.72rem", color: "var(--accent-cyan)",
                    letterSpacing: "0.05em", fontWeight: 700,
                  }}>
                    {repo.name}
                  </span>
                  <span className="font-mono" style={{
                    fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.08em",
                  }}>
                    {timeAgo(repo.pushed)}
                  </span>
                </div>
                {repo.description && (
                  <p style={{
                    fontSize: "12px", color: "var(--text-muted)",
                    lineHeight: 1.5, marginBottom: "10px", fontWeight: 300,
                  }}>
                    {repo.description.slice(0, 80)}{repo.description.length > 80 ? "…" : ""}
                  </p>
                )}
                {repo.language && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: LANG_COLORS[repo.language] || "#888",
                      flexShrink: 0,
                    }} />
                    <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                      {repo.language}
                    </span>
                  </div>
                )}
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .github-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .github-repos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
