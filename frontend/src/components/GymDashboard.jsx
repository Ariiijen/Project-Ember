import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { day: "Mon", calories: 420, duration: 45, strength: 60 },
  { day: "Tue", calories: 310, duration: 30, strength: 40 },
  { day: "Wed", calories: 580, duration: 65, strength: 80 },
  { day: "Thu", calories: 200, duration: 20, strength: 30 },
  { day: "Fri", calories: 650, duration: 75, strength: 90 },
  { day: "Sat", calories: 480, duration: 55, strength: 70 },
  { day: "Sun", calories: 120, duration: 15, strength: 20 },
];

const members = [
  { id: 1, name: "Alex Rivera", plan: "Premium", sessions: 18, streak: 12, progress: 87, avatar: "AR", status: "active" },
  { id: 2, name: "Jamie Chen", plan: "Basic", sessions: 9, streak: 4, progress: 52, avatar: "JC", status: "active" },
  { id: 3, name: "Morgan Lee", plan: "Elite", sessions: 24, streak: 21, progress: 96, avatar: "ML", status: "active" },
  { id: 4, name: "Sam Patel", plan: "Premium", sessions: 6, streak: 0, progress: 31, avatar: "SP", status: "inactive" },
  { id: 5, name: "Taylor Brooks", plan: "Basic", sessions: 11, streak: 7, progress: 64, avatar: "TB", status: "active" },
  { id: 6, name: "Casey Kim", plan: "Elite", sessions: 20, streak: 15, progress: 91, avatar: "CK", status: "active" },
];

const navItems = [
  { icon: "⊞", label: "Dashboard", id: "dashboard" },
  { icon: "◎", label: "Workouts", id: "workouts" },
  { icon: "◈", label: "Members", id: "members" },
  { icon: "▦", label: "Analytics", id: "analytics" },
  { icon: "◇", label: "Nutrition", id: "nutrition" },
  { icon: "◉", label: "Schedule", id: "schedule" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#0f0f0f",
        border: "1px solid #2a2a2a",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 12,
        color: "#e0e0e0",
      }}>
        <p style={{ marginBottom: 4, color: "#888" }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, margin: "2px 0" }}>
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function GymDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeFilter, setActiveFilter] = useState("week");

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#080808",
      color: "#e8e8e8",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .nav-item:hover { background: #141414 !important; color: #e8e8e8 !important; }
        .nav-item:hover .nav-icon { color: #c8ff00 !important; }
        .card { animation: fadeUp 0.4s ease both; }
        .card:nth-child(1) { animation-delay: 0.05s; }
        .card:nth-child(2) { animation-delay: 0.1s; }
        .card:nth-child(3) { animation-delay: 0.15s; }
        .card:nth-child(4) { animation-delay: 0.2s; }
        .member-row:hover { background: #111 !important; }
        .filter-btn:hover { background: #1e1e1e !important; }
        .progress-bar { transition: width 1s ease; }
      `}</style>

      {/* SIDEBAR */}
      <aside style={{
        width: 220,
        minWidth: 220,
        background: "#0a0a0a",
        borderRight: "1px solid #1a1a1a",
        display: "flex",
        flexDirection: "column",
        padding: "28px 0",
        gap: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "0 24px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: "#FF5E00",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 700, color: "#080808",
            }}>🔥</div>
            <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.3px" }}>Ember</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className="nav-item"
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px",
                background: activeNav === item.id ? "#141414" : "transparent",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                color: activeNav === item.id ? "#e8e8e8" : "#555",
                fontSize: 13,
                fontWeight: activeNav === item.id ? 500 : 400,
                fontFamily: "inherit",
                transition: "all 0.15s ease",
                textAlign: "left",
                borderLeft: activeNav === item.id ? "2px solid #FF5E00" : "2px solid transparent",
              }}
            >
              <span className="nav-icon" style={{
                fontSize: 14,
                color: activeNav === item.id ? "#FF5E00" : "#444",
                transition: "color 0.15s",
              }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div style={{
          margin: "0 12px",
          padding: "14px",
          background: "#111",
          borderRadius: 10,
          border: "1px solid #1e1e1e",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #FF5E00, #ff7a33)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#080808",
              flexShrink: 0,
            }}>🔥</div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e0e0e0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>You, Owner</div>
              <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>Admin · Elite</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, overflow: "auto", padding: "32px 32px 40px" }}>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: 32,
          animation: "fadeUp 0.3s ease both",
        }}>
          <div>
            <p style={{ fontSize: 12, color: "#444", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.5px", color: "#f0f0f0", lineHeight: 1.1 }}>
              Good morning, Coach 👋
            </h1>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {["week", "month", "year"].map((f) => (
              <button
                key={f}
                className="filter-btn"
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "7px 14px",
                  background: activeFilter === f ? "#FF5E00" : "#141414",
                  border: "1px solid " + (activeFilter === f ? "#FF5E00" : "#222"),
                  borderRadius: 7,
                  color: activeFilter === f ? "#080808" : "#666",
                  fontSize: 12,
                  fontWeight: activeFilter === f ? 600 : 400,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}>
          {[
            { label: "Active Members", value: "1,284", delta: "+12%", icon: "◉", accent: "#FF5E00" },
            { label: "Sessions Today", value: "47", delta: "+5", icon: "◎", accent: "#7cb5ff" },
            { label: "Avg. Duration", value: "52 min", delta: "+3 min", icon: "◇", accent: "#ff9f7c" },
            { label: "Monthly Revenue", value: "$18.4k", delta: "+8.2%", icon: "◈", accent: "#FF5E00" },
          ].map((kpi, i) => (
            <div key={i} className="card" style={{
              background: "#0d0d0d",
              border: "1px solid #1a1a1a",
              borderRadius: 14,
              padding: "20px 22px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 80, height: 80,
                background: kpi.accent,
                opacity: 0.04,
                borderRadius: "0 14px 0 80px",
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em" }}>{kpi.label}</span>
                <span style={{ fontSize: 16, color: kpi.accent }}>{kpi.icon}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, color: "#f0f0f0", letterSpacing: "-0.5px", marginBottom: 6 }}>{kpi.value}</div>
              <div style={{
                fontSize: 11, color: kpi.accent,
                background: kpi.accent + "18",
                display: "inline-block",
                padding: "3px 8px", borderRadius: 5,
                fontFamily: "'DM Mono', monospace",
              }}>{kpi.delta} this week</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 24 }}>

          {/* Area Chart */}
          <div className="card" style={{
            background: "#0d0d0d",
            border: "1px solid #1a1a1a",
            borderRadius: 14,
            padding: "22px 22px 16px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0", marginBottom: 3 }}>Calories Burned</h3>
                <p style={{ fontSize: 11, color: "#444" }}>Weekly overview</p>
              </div>
              <div style={{
                fontSize: 11, color: "#FF5E00",
                fontFamily: "'DM Mono', monospace",
                background: "#FF5E0018",
                padding: "4px 10px", borderRadius: 6,
              }}>2,760 total</div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={weeklyData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5E00" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FF5E00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#161616" />
                <XAxis dataKey="day" tick={{ fill: "#444", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#444", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="calories" name="Cal" stroke="#FF5E00" strokeWidth={2} fill="url(#calGrad)" dot={{ fill: "#FF5E00", r: 3, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="card" style={{
            background: "#0d0d0d",
            border: "1px solid #1a1a1a",
            borderRadius: 14,
            padding: "22px 22px 16px",
          }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0", marginBottom: 3 }}>Strength vs Cardio</h3>
              <p style={{ fontSize: 11, color: "#444" }}>Session intensity split</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weeklyData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" stroke="#161616" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#444", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#444", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="strength" name="Strength" fill="#FF5E00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="duration" name="Duration" fill="#2a2a2a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Members Table */}
        <div className="card" style={{
          background: "#0d0d0d",
          border: "1px solid #1a1a1a",
          borderRadius: 14,
          padding: "22px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0", marginBottom: 3 }}>Active Members</h3>
              <p style={{ fontSize: 11, color: "#444" }}>Progress & engagement overview</p>
            </div>
            <button style={{
              padding: "7px 14px",
              background: "transparent",
              border: "1px solid #222",
              borderRadius: 7,
              color: "#555",
              fontSize: 11,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}>View all →</button>
          </div>

          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr 1fr",
            gap: 8,
            padding: "8px 12px",
            borderBottom: "1px solid #1a1a1a",
            marginBottom: 4,
          }}>
            {["Member", "Plan", "Sessions", "Streak", "Progress", "Status"].map((h) => (
              <span key={h} style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {members.map((m) => (
            <div
              key={m.id}
              className="member-row"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr 1fr",
                gap: 8,
                padding: "12px",
                borderRadius: 8,
                alignItems: "center",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              {/* Name */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30,
                  background: "linear-gradient(135deg, #1e2e00, #3a5500)",
                  border: "1px solid #FF5E0030",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 600, color: "#FF5E00",
                  flexShrink: 0,
                }}>{m.avatar}</div>
                <span style={{ fontSize: 13, color: "#d0d0d0", fontWeight: 500 }}>{m.name}</span>
              </div>

              {/* Plan */}
              <span style={{
                fontSize: 11,
                color: m.plan === "Elite" ? "#FF5E00" : m.plan === "Premium" ? "#7cb5ff" : "#888",
                fontFamily: "'DM Mono', monospace",
              }}>{m.plan}</span>

              {/* Sessions */}
              <span style={{ fontSize: 13, color: "#888", fontFamily: "'DM Mono', monospace" }}>{m.sessions}</span>

              {/* Streak */}
              <span style={{ fontSize: 13, color: m.streak > 10 ? "#FF5E00" : "#888", fontFamily: "'DM Mono', monospace" }}>
                {m.streak > 0 ? `🔥 ${m.streak}d` : "—"}
              </span>

              {/* Progress Bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: "#444" }}>Goal progress</span>
                  <span style={{ fontSize: 10, color: "#888", fontFamily: "'DM Mono', monospace" }}>{m.progress}%</span>
                </div>
                <div style={{ height: 4, background: "#1a1a1a", borderRadius: 4, overflow: "hidden" }}>
                  <div className="progress-bar" style={{
                    width: `${m.progress}%`,
                    height: "100%",
                    background: m.progress > 80 ? "#FF5E00" : m.progress > 50 ? "#7cb5ff" : "#444",
                    borderRadius: 4,
                  }} />
                </div>
              </div>

              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 6, height: 6,
                  borderRadius: "50%",
                  background: m.status === "active" ? "#FF5E00" : "#333",
                  animation: m.status === "active" ? "pulse 2s ease infinite" : "none",
                }} />
                <span style={{ fontSize: 11, color: m.status === "active" ? "#888" : "#333" }}>
                  {m.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}