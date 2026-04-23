import { useState, useEffect, useRef, useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend, Treemap } from "recharts";
import logoSrc from "./logo.png";

// ─── DATA ───────────────────────────────────────────────────────────────────

const landData = [
  { id: 1, thromde: "Paro", village: "Pathrom", dratshang: "Paro Rabdey", sqft: 2820, rate: 299.98, value: 845943.60 },
  { id: 2, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", sqft: 9365, rate: 172.19, value: 1612559.35 },
  { id: 3, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", sqft: 4704, rate: 172.19, value: 809981.76 },
  { id: 4, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", sqft: 16204, rate: 172.19, value: 2790166.76 },
  { id: 5, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", sqft: 6795, rate: 172.19, value: 1170031.05 },
  { id: 6, thromde: "Punakha", village: "Khuruthang", dratshang: "Talo Tsuk Lhakhang", sqft: 13286, rate: 172.19, value: 2287716.34 },
  { id: 7, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", sqft: 17119, rate: 172.19, value: 2947720.61 },
  { id: 8, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", sqft: 13460, rate: 172.19, value: 2317677.40 },
  { id: 9, thromde: "Thimphu", village: "Babesa", dratshang: "Dechenphodrang Kugyer", sqft: 7062, rate: 421.53, value: 2976844.86 },
  { id: 10, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 7384, rate: 421.53, value: 3112577.52 },
  { id: 11, thromde: "Thimphu", village: "Babesa", dratshang: "Phading Khangzang", sqft: 6712, rate: 421.53, value: 2829309.36 },
  { id: 12, thromde: "Thimphu", village: "Babesa", dratshang: "Phading Khangzang", sqft: 11716, rate: 421.53, value: 4938645.48 },
  { id: 13, thromde: "Thimphu", village: "Babesa", dratshang: "Barp Lhakhang", sqft: 37266, rate: 421.53, value: 15708736.98 },
  { id: 14, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 12307, rate: 421.53, value: 5187769.71 },
  { id: 15, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 8426, rate: 421.53, value: 3551811.78 },
  { id: 16, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 7895, rate: 421.53, value: 3327979.35 },
  { id: 17, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 7895, rate: 421.53, value: 3327979.35 },
  { id: 18, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 7895, rate: 421.53, value: 3327979.35 },
  { id: 19, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 6784, rate: 421.53, value: 2859659.52 },
  { id: 20, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 10617, rate: 421.53, value: 4475384.01 },
  { id: 21, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 5644, rate: 421.53, value: 2379115.32 },
  { id: 22, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 11053, rate: 421.53, value: 4659171.09 },
  { id: 23, thromde: "Thimphu", village: "Babesa", dratshang: "Barp Lhakhang", sqft: 5432, rate: 421.53, value: 2289750.96 },
  { id: 24, thromde: "Thimphu", village: "Babesa", dratshang: "Simtokha Shedra", sqft: 11108, rate: 421.53, value: 4682355.24 },
  { id: 25, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 12775, rate: 421.53, value: 5385045.75 },
  { id: 26, thromde: "Thimphu", village: "Babesa", dratshang: "Barp Lhakhang", sqft: 11170, rate: 421.53, value: 4708490.10 },
  { id: 27, thromde: "Thimphu", village: "Babesa", dratshang: "Haa Rabdey", sqft: 5369, rate: 421.53, value: 2263194.57 },
  { id: 28, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", sqft: 16236, rate: 421.53, value: 6843961.08 },
  { id: 29, thromde: "Thimphu", village: "Babesa", dratshang: "Phading Khangzang", sqft: 3049, rate: 421.53, value: 1285244.97 },
  { id: 30, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", sqft: 13325, rate: 432.7, value: 5765727.50 },
  { id: 31, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", sqft: 7022, rate: 432.7, value: 3038419.40 },
  { id: 32, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", sqft: 7122, rate: 432.7, value: 3081689.40 },
  { id: 33, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", sqft: 13730, rate: 432.7, value: 5940971.00 },
  { id: 34, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Danang Goenpa", sqft: 9714, rate: 432.7, value: 4203247.80 },
  { id: 35, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Danang Goenpa", sqft: 5066, rate: 432.7, value: 2192058.20 },
  { id: 36, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Tango Monastry", sqft: 17685, rate: 432.7, value: 7652299.50 },
  { id: 37, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Tango Monastry", sqft: 16738, rate: 432.7, value: 7242532.60 },
  { id: 38, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", sqft: 26323, rate: 432.7, value: 11389962.10 },
  { id: 39, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", sqft: 5495, rate: 432.7, value: 2377686.50 },
  { id: 40, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", sqft: 7020, rate: 432.7, value: 3037554.00 },
  { id: 41, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", sqft: 34107, rate: 432.7, value: 14758098.90 },
  { id: 42, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", sqft: 62837, rate: 432.7, value: 27189569.90 },
  { id: 43, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", sqft: 7175, rate: 432.7, value: 3104622.50 },
  { id: 44, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", sqft: 11578, rate: 432.7, value: 5009800.60 },
  { id: 45, thromde: "Thimphu", village: "Chang Khorlo", dratshang: "Central Monk Body", sqft: 9213, rate: 341.43, value: 3145594.59 },
  { id: 46, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", sqft: 20602, rate: 432.7, value: 8914485.40 },
  { id: 47, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", sqft: 6861, rate: 432.7, value: 2968754.70 },
  { id: 48, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", sqft: 12395, rate: 432.7, value: 5363316.50 },
  { id: 49, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", sqft: 7034, rate: 432.7, value: 3043611.80 },
  { id: 50, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", sqft: 22216, rate: 432.7, value: 9612863.20 },
  { id: 57, thromde: "Thimphu", village: "Changzamtog", dratshang: "Central Monk Body", sqft: 929919, rate: 432.7, value: 402375951.30 },
  { id: 58, thromde: "Thimphu", village: "Core", dratshang: "Cheri Monastry", sqft: 3380, rate: 2944.96, value: 9953964.80 },
  { id: 200, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", sqft: 77450, rate: 812.7, value: 62943615.00 },
  { id: 223, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", sqft: 97700, rate: 812.7, value: 79400790.00 },
  { id: 232, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", sqft: 87982, rate: 812.7, value: 71502971.40 },
];

const dratshangSummary = [
  { name: "Central Monk Body", landValue: 564275586.31, buildingValue: 63968611.66, shareValue: 332314140.00, total: 960558337.97, pct: 29.73 },
  { name: "Cheri Monastry", landValue: 325206071.98, buildingValue: 73975434.83, shareValue: 1423650.00, total: 400605156.81, pct: 12.40 },
  { name: "Tango Monastry", landValue: 366322663.40, buildingValue: 10691457.94, shareValue: 382420.00, total: 377396541.34, pct: 11.68 },
  { name: "Un-identified Owner", landValue: 543570331.50, buildingValue: 0, shareValue: 0, total: 543570331.50, pct: 16.82 },
  { name: "Dodeydra Shedra", landValue: 243878398.59, buildingValue: 14303485.72, shareValue: 289150.00, total: 258471034.31, pct: 8.00 },
  { name: "Gyeduen Dratshang Tawa", landValue: 115492504.83, buildingValue: 0, shareValue: 0, total: 115492504.83, pct: 3.57 },
  { name: "Tala Goenpa", landValue: 92882963.54, buildingValue: 14572421.45, shareValue: 0, total: 107455384.99, pct: 3.33 },
  { name: "Phading Khangzang", landValue: 83308531.05, buildingValue: 10254949.10, shareValue: 0, total: 93563480.15, pct: 2.90 },
  { name: "Simtokha Shedra", landValue: 38029474.64, buildingValue: 33347119.40, shareValue: 1228500.00, total: 72605094.04, pct: 2.25 },
  { name: "Trashigang Goenpa", landValue: 42413061.48, buildingValue: 21495620.88, shareValue: 0, total: 63908682.36, pct: 1.98 },
  { name: "Wangdue Rabdey", landValue: 16185485.30, buildingValue: 11176167.42, shareValue: 13175950.00, total: 40537602.72, pct: 1.25 },
  { name: "Pung-Thim Gyeduen Dratshang Kugyer", landValue: 16546572.00, buildingValue: 16546572.00, shareValue: 0, total: 33093144.00, pct: 1.02 },
  { name: "Rabdey Dratshang", landValue: 0, buildingValue: 0, shareValue: 24517170.00, total: 24517170.00, pct: 0.76 },
  { name: "Barp Lhakhang", landValue: 22706978.04, buildingValue: 2289750.96, shareValue: 0, total: 24996729.00, pct: 0.77 },
  { name: "Paro Rabdey", landValue: 9969066.40, buildingValue: 9969066.40, shareValue: 5079350.00, total: 25017482.80, pct: 0.77 },
  { name: "Trongsa Dratshang", landValue: 2405592.00, buildingValue: 0, shareValue: 12679290.00, total: 15084882.00, pct: 0.47 },
  { name: "Dagana Rabdey", landValue: 9048058.53, buildingValue: 0, shareValue: 2925000.00, total: 11973058.53, pct: 0.37 },
  { name: "Astrologer Institute", landValue: 0, buildingValue: 5606004.60, shareValue: 3960.00, total: 5609964.60, pct: 0.17 },
  { name: "Druk Phodrangding", landValue: 5606004.60, buildingValue: 0, shareValue: 0, total: 5606004.60, pct: 0.17 },
  { name: "Dechenphodrang Kugyer", landValue: 4732301.64, buildingValue: 4732301.64, shareValue: 0, total: 9464603.28, pct: 0.29 },
  { name: "Danang Goenpa", landValue: 6395306.00, buildingValue: 0, shareValue: 0, total: 6395306.00, pct: 0.20 },
  { name: "Gasa Rabdey", landValue: 2021574.40, buildingValue: 2021574.40, shareValue: 5280.00, total: 4048428.80, pct: 0.13 },
  { name: "Chimithangka Lhakhang", landValue: 4133397.88, buildingValue: 0, shareValue: 0, total: 4133397.88, pct: 0.13 },
  { name: "Yangtsi Dratshang", landValue: 2160528.65, buildingValue: 2160528.65, shareValue: 283500.00, total: 4604557.30, pct: 0.14 },
  { name: "Talo Tsuk Lhakhang", landValue: 2287716.34, buildingValue: 0, shareValue: 0, total: 2287716.34, pct: 0.07 },
  { name: "Choetse Rabdey Dratshang", landValue: 1730800.00, buildingValue: 1730800.00, shareValue: 171800.00, total: 3633400.00, pct: 0.11 },
  { name: "Haa Rabdey", landValue: 0, buildingValue: 0, shareValue: 492950.00, total: 492950.00, pct: 0.02 },
  { name: "Chukha Rabdey", landValue: 0, buildingValue: 0, shareValue: 3069150.00, total: 3069150.00, pct: 0.09 },
  { name: "Wangdue Bajo", landValue: 1257805.30, buildingValue: 0, shareValue: 0, total: 1257805.30, pct: 0.04 },
];

const thromdeStats = [
  { thromde: "Thimphu", plots: 185, totalValue: 1842000000 },
  { thromde: "Phuentsholing", plots: 38, totalValue: 618000000 },
  { thromde: "Punakha", plots: 7, totalValue: 13935873 },
  { thromde: "Paro", plots: 1, totalValue: 845943 },
  { thromde: "Wangdue Phodrang", plots: 1, totalValue: 1257805 },
];

const COLORS = ["#d4a853", "#c8693a", "#7a4f8a", "#2d7d9a", "#4a9e6b", "#e05c5c", "#5c8ee0", "#e0c55c", "#8e5ce0", "#5ce0b5", "#e08e5c", "#5ce0d8"];

const GRAND_TOTAL = 3231208556.15;
const TOTAL_LAND = 2523572163.67;
const TOTAL_BUILDING = 301105061.62;
const TOTAL_SHARES = 411057720.00;

const fmt = (n) => {
  if (!n || n === 0) return "Nu. 0";
  if (n >= 1e9) return `Nu. ${(n / 1e9).toFixed(3)}B`;
  if (n >= 1e6) return `Nu. ${(n / 1e6).toFixed(3)}M`;
  if (n >= 1e3) return `Nu. ${(n / 1e3).toFixed(2)}K`;
  return `Nu. ${n.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
};

const fmtFull = (n) => {
  if (!n || n === 0) return "Nu. 0.00";
  return `Nu. ${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = null;
    const duration = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return (
    <span>
      {prefix}
      {decimals > 0 ? display.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : Math.floor(display).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────
function ParticleBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.45 + 0.08,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,83,${p.alpha})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 0, opacity: 0.35 }} />;
}

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(10,8,4,0.97)", border: "1px solid #d4a853", borderRadius: 8, padding: "10px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.6)" }}>
        <p style={{ color: "#d4a853", fontWeight: 700, marginBottom: 4, fontSize: 11, margin: "0 0 6px" }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: "#e8d5a3", fontSize: 11, margin: "2px 0" }}>
            <span style={{ color: p.color }}>{p.name}: </span>
            {fmtFull(+p.value * (p.name !== "Holdings %" ? 1000000 : 1))}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [selectedDratshang, setSelectedDratshang] = useState("All");
  const [selectedThromde, setSelectedThromde] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState(null);

  const allDratshangs = useMemo(() => ["All", ...Array.from(new Set(dratshangSummary.map(d => d.name))).sort()], []);
  const allThromdes = useMemo(() => ["All", ...Array.from(new Set(landData.map(d => d.thromde))).sort()], []);

  const filteredLand = useMemo(() => {
    let f = landData;
    if (selectedThromde !== "All") f = f.filter(d => d.thromde === selectedThromde);
    if (selectedDratshang !== "All") f = f.filter(d => d.dratshang === selectedDratshang);
    return f;
  }, [selectedThromde, selectedDratshang]);

  const filteredSummary = useMemo(() => {
    let f = dratshangSummary;
    if (selectedDratshang !== "All") f = f.filter(d => d.name === selectedDratshang);
    return f.sort((a, b) => b.total - a.total);
  }, [selectedDratshang]);

  const selectedProfile = useMemo(() =>
    selectedDratshang !== "All" ? dratshangSummary.find(d => d.name === selectedDratshang) : null,
    [selectedDratshang]);

  const kpis = useMemo(() => {
    if (selectedProfile) {
      return {
        totalValue: selectedProfile.total,
        landValue: selectedProfile.landValue,
        buildingValue: selectedProfile.buildingValue,
        shareValue: selectedProfile.shareValue,
        plots: filteredLand.length,
        pct: selectedProfile.pct,
      };
    }
    return { totalValue: GRAND_TOTAL, landValue: TOTAL_LAND, buildingValue: TOTAL_BUILDING, shareValue: TOTAL_SHARES, plots: 232, pct: 100 };
  }, [selectedProfile, filteredLand]);

  const pieData = useMemo(() =>
    [...dratshangSummary].sort((a, b) => b.total - a.total).slice(0, 9).map(d => ({
      name: d.name.length > 22 ? d.name.slice(0, 20) + "…" : d.name,
      value: Math.round(d.total),
    })), []);

  const barData = useMemo(() =>
    filteredSummary.slice(0, 8).map(d => ({
      name: d.name.length > 14 ? d.name.slice(0, 12) + "…" : d.name,
      Land: +(d.landValue / 1e6).toFixed(2),
      Building: +(d.buildingValue / 1e6).toFixed(2),
      Shares: +(d.shareValue / 1e6).toFixed(2),
    })), [filteredSummary]);

  const radarData = selectedProfile ? [
    { subject: "Land", A: selectedProfile.total > 0 ? +((selectedProfile.landValue / selectedProfile.total) * 100).toFixed(1) : 0 },
    { subject: "Building", A: selectedProfile.total > 0 ? +((selectedProfile.buildingValue / selectedProfile.total) * 100).toFixed(1) : 0 },
    { subject: "Shares", A: selectedProfile.total > 0 ? +((selectedProfile.shareValue / selectedProfile.total) * 100).toFixed(1) : 0 },
    { subject: "Portfolio %", A: +(selectedProfile.pct * 3.33).toFixed(1) },
    { subject: "Plots", A: Math.min(filteredLand.length * 4, 100) },
  ] : [];

  const treemapChildren = useMemo(() =>
    dratshangSummary.sort((a, b) => b.total - a.total).slice(0, 14).map((d, i) => ({
      name: d.name.length > 20 ? d.name.slice(0, 18) + "…" : d.name,
      size: Math.max(Math.round(d.total / 1e5), 1),
      color: COLORS[i % COLORS.length],
    })), []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #080603 0%, #120f07 45%, #0a0804 100%)", fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: "#e8d5a3", position: "relative", overflow: "hidden" }}>
      <ParticleBg />

      {/* Top ornament bar */}
      <div style={{ height: 4, background: "linear-gradient(90deg, transparent 0%, #8a3a2a 10%, #d4a853 35%, #f0c870 50%, #d4a853 65%, #8a3a2a 90%, transparent 100%)" }} />

      {/* ── HEADER ── */}
      <div style={{ position: "relative", zIndex: 1, padding: "22px 36px 18px", borderBottom: "1px solid rgba(212,168,83,0.18)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>

          {/* Logo + Title */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(212,168,83,0.5)", boxShadow: "0 0 24px rgba(212,168,83,0.35), 0 0 60px rgba(200,105,58,0.15)", flexShrink: 0, background: "#000" }}>
              <img src={logoSrc} alt="Gerab Nyed Yon Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 21, fontWeight: 700, letterSpacing: 2.5, color: "#d4a853", textShadow: "0 0 30px rgba(212,168,83,0.5)", lineHeight: 1.15 }}>
                GERAB NYED YON LIMITED
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 10.5, color: "#8a6830", letterSpacing: 3, textTransform: "uppercase" }}>
                Religious Institution Portfolio · Asset Valuation Dashboard
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { key: "overview", label: "Overview" },
              { key: "breakdown", label: "Breakdown" },
              { key: "plots", label: "Land Plots" },
              { key: "detail", label: "Insights" },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding: "7px 16px", borderRadius: 20, border: `1px solid ${activeTab === t.key ? "#d4a853" : "rgba(212,168,83,0.25)"}`, background: activeTab === t.key ? "rgba(212,168,83,0.18)" : "transparent", color: activeTab === t.key ? "#d4a853" : "#6a5028", fontSize: 11, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "inherit", transition: "all 0.25s" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
          <select value={selectedThromde} onChange={e => setSelectedThromde(e.target.value)} style={{ background: "#0c0905", border: "1px solid rgba(212,168,83,0.28)", borderRadius: 20, padding: "7px 16px", color: "#d4a853", fontSize: 11.5, fontFamily: "inherit", cursor: "pointer", outline: "none" }}>
            {allThromdes.map(t => <option key={t} value={t}>{t === "All" ? "All Thromde" : t}</option>)}
          </select>
          <select value={selectedDratshang} onChange={e => setSelectedDratshang(e.target.value)} style={{ background: "#0c0905", border: "1px solid rgba(212,168,83,0.28)", borderRadius: 20, padding: "7px 16px", color: "#d4a853", fontSize: 11.5, fontFamily: "inherit", cursor: "pointer", outline: "none", maxWidth: 280 }}>
            {allDratshangs.map(d => <option key={d} value={d}>{d === "All" ? "All Institutions" : d}</option>)}
          </select>
          {(selectedDratshang !== "All" || selectedThromde !== "All") && (
            <button onClick={() => { setSelectedDratshang("All"); setSelectedThromde("All"); }}
              style={{ background: "rgba(200,105,58,0.18)", border: "1px solid rgba(200,105,58,0.5)", borderRadius: 20, padding: "7px 14px", color: "#c8693a", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
              ✕ Reset
            </button>
          )}
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, padding: "20px 36px 0" }}>
        {[
          { label: "Grand Total Value", rawValue: kpis.totalValue, icon: "◈", color: "#d4a853", glow: "#d4a85355" },
          { label: "Total Land Value", rawValue: kpis.landValue, icon: "⬡", color: "#7ac47a", glow: "#7ac47a44" },
          { label: "Total Building Value", rawValue: kpis.buildingValue, icon: "⬢", color: "#5cb8e0", glow: "#5cb8e044" },
          { label: "Total Share Value", rawValue: kpis.shareValue, icon: "◉", color: "#c87acc", glow: "#c87acc44" },
          { label: "Land Plots", rawValue: kpis.plots, icon: "◫", color: "#e0a05c", glow: "#e0a05c44", isCount: true },
        ].map((kpi, i) => (
          <div key={i} onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)}
            style={{ background: hoveredCard === i ? "rgba(212,168,83,0.09)" : "rgba(255,255,255,0.025)", border: `1px solid ${hoveredCard === i ? kpi.color : "rgba(212,168,83,0.12)"}`, borderRadius: 14, padding: "18px 18px 14px", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)", transform: hoveredCard === i ? "translateY(-4px) scale(1.02)" : "none", boxShadow: hoveredCard === i ? `0 10px 35px rgba(0,0,0,0.5), 0 0 25px ${kpi.glow}` : "none", cursor: "default" }}>
            <div style={{ fontSize: 24, color: kpi.color, marginBottom: 8, filter: `drop-shadow(0 0 8px ${kpi.color})` }}>{kpi.icon}</div>
            <div style={{ fontSize: 10, color: "#6a5028", marginBottom: 5, letterSpacing: 1.2, textTransform: "uppercase", fontFamily: "sans-serif" }}>{kpi.label}</div>
            <div style={{ fontSize: kpi.isCount ? 28 : 17, fontWeight: 700, color: kpi.color, lineHeight: 1.1 }}>
              {kpi.isCount
                ? <AnimatedNumber value={kpi.rawValue} />
                : <AnimatedNumber value={kpi.rawValue / 1e6} prefix="Nu. " suffix="M" decimals={3} />
              }
            </div>
            {!kpi.isCount && (
              <div style={{ fontSize: 10, color: "#5a4018", marginTop: 3 }}>
                = {fmtFull(kpi.rawValue)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ position: "relative", zIndex: 1, padding: "20px 36px 44px" }}>

        {/* ═══ OVERVIEW ═══ */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 18 }}>

              {/* Donut */}
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,168,83,0.14)", borderRadius: 14, padding: 24 }}>
                <h3 style={{ margin: "0 0 3px", fontSize: 12, color: "#d4a853", letterSpacing: 2, textTransform: "uppercase" }}>Portfolio Distribution</h3>
                <p style={{ margin: "0 0 14px", fontSize: 10.5, color: "#4a3818" }}>Top institutions by total portfolio value</p>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={pieData} cx="45%" cy="50%" innerRadius={65} outerRadius={108} paddingAngle={2} dataKey="value">
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="rgba(0,0,0,0.6)" strokeWidth={1.5} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [fmtFull(v), "Total Value"]} contentStyle={{ background: "#0c0905", border: "1px solid #d4a853", borderRadius: 8, color: "#e8d5a3", fontSize: 11 }} />
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 9.5, color: "#8a6830", paddingLeft: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Stacked Bar */}
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,168,83,0.14)", borderRadius: 14, padding: 24 }}>
                <h3 style={{ margin: "0 0 3px", fontSize: 12, color: "#d4a853", letterSpacing: 2, textTransform: "uppercase" }}>Asset Composition</h3>
                <p style={{ margin: "0 0 14px", fontSize: 10.5, color: "#4a3818" }}>Land · Building · Shares (Nu. Millions)</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={barData} margin={{ left: -14, right: 4 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 8.5, fill: "#6a5028" }} />
                    <YAxis tick={{ fontSize: 8.5, fill: "#6a5028" }} tickFormatter={v => `${v}M`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Land" stackId="a" fill="#7ac47a" />
                    <Bar dataKey="Building" stackId="a" fill="#5cb8e0" />
                    <Bar dataKey="Shares" stackId="a" fill="#c87acc" radius={[3, 3, 0, 0]} />
                    <Legend iconSize={7} wrapperStyle={{ fontSize: 9.5, color: "#8a6830" }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Treemap */}
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,168,83,0.14)", borderRadius: 14, padding: 24 }}>
              <h3 style={{ margin: "0 0 3px", fontSize: 12, color: "#d4a853", letterSpacing: 2, textTransform: "uppercase" }}>Portfolio Heatmap</h3>
              <p style={{ margin: "0 0 14px", fontSize: 10.5, color: "#4a3818" }}>Relative size of each institution's total portfolio</p>
              <ResponsiveContainer width="100%" height={190}>
                <Treemap data={treemapChildren} dataKey="size" stroke="#0a0804"
                  content={({ x, y, width, height, name, color }) => (
                    <g>
                      <rect x={x} y={y} width={width} height={height} fill={color} fillOpacity={0.72} stroke="#0a0804" strokeWidth={2} rx={4} />
                      {width > 55 && height > 24 && (
                        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={Math.min(width / 9, 11)} fontFamily="sans-serif" fontWeight="600">{name}</text>
                      )}
                    </g>
                  )} />
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ═══ BREAKDOWN ═══ */}
        {activeTab === "breakdown" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {selectedProfile && (
              <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 18 }}>
                {/* Profile Card */}
                <div style={{ background: "rgba(212,168,83,0.07)", border: "1px solid rgba(212,168,83,0.28)", borderRadius: 14, padding: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(212,168,83,0.4)", marginBottom: 12 }}>
                    <img src={logoSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <h3 style={{ margin: "0 0 12px", fontSize: 13, color: "#d4a853", lineHeight: 1.4 }}>{selectedProfile.name}</h3>
                  {[
                    { l: "Grand Total", v: fmtFull(selectedProfile.total), c: "#d4a853", big: true },
                    { l: "Land Assets", v: fmtFull(selectedProfile.landValue), c: "#7ac47a" },
                    { l: "Building Value", v: fmtFull(selectedProfile.buildingValue), c: "#5cb8e0" },
                    { l: "Share Value", v: fmtFull(selectedProfile.shareValue), c: "#c87acc" },
                    { l: "Portfolio Share", v: `${selectedProfile.pct}%`, c: "#e0a05c" },
                    { l: "Land Plots (filtered)", v: filteredLand.length, c: "#e8d5a3" },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(212,168,83,0.09)", fontSize: row.big ? 12 : 11 }}>
                      <span style={{ color: "#6a5028" }}>{row.l}</span>
                      <span style={{ color: row.c, fontWeight: row.big ? 700 : 500 }}>{row.v}</span>
                    </div>
                  ))}
                </div>
                {/* Radar */}
                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,168,83,0.14)", borderRadius: 14, padding: 24 }}>
                  <h3 style={{ margin: "0 0 14px", fontSize: 12, color: "#d4a853", letterSpacing: 2, textTransform: "uppercase" }}>Asset Radar — {selectedProfile.name}</h3>
                  <ResponsiveContainer width="100%" height={270}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(212,168,83,0.12)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#8a6830", fontSize: 11 }} />
                      <Radar dataKey="A" stroke="#d4a853" fill="#d4a853" fillOpacity={0.18} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Full Table */}
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,168,83,0.14)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(212,168,83,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: 12, color: "#d4a853", letterSpacing: 2, textTransform: "uppercase" }}>Full Institution Registry</h3>
                <span style={{ fontSize: 10.5, color: "#4a3818" }}>{filteredSummary.length} records · Click row to select</span>
              </div>
              <div style={{ overflowX: "auto", maxHeight: 440, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                    <tr style={{ background: "rgba(10,8,4,0.95)" }}>
                      {["#", "Institution", "Land Value", "Building Value", "Share Value", "Total Value", "Holdings %"].map(h => (
                        <th key={h} style={{ padding: "11px 14px", textAlign: h === "#" ? "center" : "left", color: "#d4a853", letterSpacing: 0.8, fontWeight: 600, borderBottom: "1px solid rgba(212,168,83,0.15)", whiteSpace: "nowrap", fontSize: 10.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSummary.map((d, i) => (
                      <tr key={i} onClick={() => setSelectedDratshang(d.name === selectedDratshang ? "All" : d.name)}
                        style={{ cursor: "pointer", background: selectedDratshang === d.name ? "rgba(212,168,83,0.1)" : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)", transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(212,168,83,0.07)"}
                        onMouseLeave={e => e.currentTarget.style.background = selectedDratshang === d.name ? "rgba(212,168,83,0.1)" : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)"}>
                        <td style={{ padding: "10px 14px", color: "#4a3818", borderBottom: "1px solid rgba(212,168,83,0.05)", textAlign: "center" }}>{i + 1}</td>
                        <td style={{ padding: "10px 14px", color: "#e8d5a3", borderBottom: "1px solid rgba(212,168,83,0.05)", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: selectedDratshang === d.name ? 700 : 400 }}>{d.name}</td>
                        <td style={{ padding: "10px 14px", color: "#7ac47a", borderBottom: "1px solid rgba(212,168,83,0.05)", whiteSpace: "nowrap" }}>{fmtFull(d.landValue)}</td>
                        <td style={{ padding: "10px 14px", color: "#5cb8e0", borderBottom: "1px solid rgba(212,168,83,0.05)", whiteSpace: "nowrap" }}>{fmtFull(d.buildingValue)}</td>
                        <td style={{ padding: "10px 14px", color: "#c87acc", borderBottom: "1px solid rgba(212,168,83,0.05)", whiteSpace: "nowrap" }}>{fmtFull(d.shareValue)}</td>
                        <td style={{ padding: "10px 14px", color: "#d4a853", fontWeight: 700, borderBottom: "1px solid rgba(212,168,83,0.05)", whiteSpace: "nowrap" }}>{fmtFull(d.total)}</td>
                        <td style={{ padding: "10px 14px", borderBottom: "1px solid rgba(212,168,83,0.05)", minWidth: 130 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ flex: 1, height: 4, background: "rgba(212,168,83,0.1)", borderRadius: 2 }}>
                              <div style={{ height: "100%", width: `${Math.min((d.pct / 30) * 100, 100)}%`, background: `linear-gradient(90deg, ${COLORS[i % COLORS.length]}, ${COLORS[(i + 1) % COLORS.length]})`, borderRadius: 2 }} />
                            </div>
                            <span style={{ color: "#e0a05c", fontSize: 10, flexShrink: 0 }}>{d.pct}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Grand Total Row */}
                    <tr style={{ background: "rgba(212,168,83,0.08)" }}>
                      <td colSpan={2} style={{ padding: "12px 14px", color: "#d4a853", fontWeight: 700, fontSize: 11, letterSpacing: 1 }}>GRAND TOTAL</td>
                      <td style={{ padding: "12px 14px", color: "#7ac47a", fontWeight: 700, whiteSpace: "nowrap" }}>{fmtFull(TOTAL_LAND)}</td>
                      <td style={{ padding: "12px 14px", color: "#5cb8e0", fontWeight: 700, whiteSpace: "nowrap" }}>{fmtFull(TOTAL_BUILDING)}</td>
                      <td style={{ padding: "12px 14px", color: "#c87acc", fontWeight: 700, whiteSpace: "nowrap" }}>{fmtFull(TOTAL_SHARES)}</td>
                      <td style={{ padding: "12px 14px", color: "#d4a853", fontWeight: 700, whiteSpace: "nowrap", fontSize: 12 }}>{fmtFull(GRAND_TOTAL)}</td>
                      <td style={{ padding: "12px 14px", color: "#d4a853", fontWeight: 700 }}>100.00%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ LAND PLOTS ═══ */}
        {activeTab === "plots" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Thromde Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
              {thromdeStats.map((t, i) => (
                <div key={i} onClick={() => setSelectedThromde(t.thromde === selectedThromde ? "All" : t.thromde)}
                  style={{ background: selectedThromde === t.thromde ? "rgba(212,168,83,0.14)" : "rgba(255,255,255,0.025)", border: `1px solid ${selectedThromde === t.thromde ? "#d4a853" : "rgba(212,168,83,0.14)"}`, borderRadius: 12, padding: 18, cursor: "pointer", transition: "all 0.25s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: "#d4a853", fontWeight: 600 }}>{t.thromde}</span>
                    <span style={{ fontSize: 10, background: "rgba(212,168,83,0.12)", padding: "2px 8px", borderRadius: 10, color: "#d4a853" }}>{t.plots}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e8d5a3", marginBottom: 8 }}>{fmt(t.totalValue)}</div>
                  <div style={{ height: 3, background: "rgba(212,168,83,0.08)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${(t.plots / 232) * 100}%`, background: COLORS[i], borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Plot Table */}
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,168,83,0.14)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(212,168,83,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: 12, color: "#d4a853", letterSpacing: 2, textTransform: "uppercase" }}>Land Plot Registry</h3>
                <span style={{ fontSize: 10.5, color: "#4a3818" }}>{filteredLand.length} of 232 plots</span>
              </div>
              <div style={{ overflowX: "auto", maxHeight: 480, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                    <tr style={{ background: "rgba(10,8,4,0.95)" }}>
                      {["SL.", "Thromde", "Village", "Institution", "Plot ID", "Area (sqft)", "PAVA Rate", "Valuation"].map(h => (
                        <th key={h} style={{ padding: "10px 13px", textAlign: "left", color: "#d4a853", letterSpacing: 0.8, fontWeight: 600, borderBottom: "1px solid rgba(212,168,83,0.15)", whiteSpace: "nowrap", fontSize: 10.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLand.map((d, i) => (
                      <tr key={d.id} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)", transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(212,168,83,0.06)"}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)"}>
                        <td style={{ padding: "9px 13px", color: "#4a3818", borderBottom: "1px solid rgba(212,168,83,0.04)" }}>{d.id}</td>
                        <td style={{ padding: "9px 13px", color: "#e0a05c", borderBottom: "1px solid rgba(212,168,83,0.04)" }}>{d.thromde}</td>
                        <td style={{ padding: "9px 13px", color: "#8a7050", borderBottom: "1px solid rgba(212,168,83,0.04)" }}>{d.village}</td>
                        <td style={{ padding: "9px 13px", color: "#e8d5a3", borderBottom: "1px solid rgba(212,168,83,0.04)", maxWidth: 190, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.dratshang}</td>
                        <td style={{ padding: "9px 13px", color: "#7a9aaa", borderBottom: "1px solid rgba(212,168,83,0.04)", whiteSpace: "nowrap" }}>{d.id}</td>
                        <td style={{ padding: "9px 13px", color: "#7ac47a", borderBottom: "1px solid rgba(212,168,83,0.04)", textAlign: "right", whiteSpace: "nowrap" }}>{d.sqft.toLocaleString()}</td>
                        <td style={{ padding: "9px 13px", color: "#8a8070", borderBottom: "1px solid rgba(212,168,83,0.04)", textAlign: "right" }}>{d.rate.toFixed(2)}</td>
                        <td style={{ padding: "9px 13px", color: "#d4a853", fontWeight: 600, borderBottom: "1px solid rgba(212,168,83,0.04)", whiteSpace: "nowrap", textAlign: "right" }}>{fmtFull(d.value)}</td>
                      </tr>
                    ))}
                    {/* Subtotal */}
                    <tr style={{ background: "rgba(212,168,83,0.07)" }}>
                      <td colSpan={5} style={{ padding: "11px 13px", color: "#d4a853", fontWeight: 700, fontSize: 11 }}>SUB-TOTAL ({filteredLand.length} plots)</td>
                      <td style={{ padding: "11px 13px", color: "#7ac47a", fontWeight: 700, textAlign: "right" }}>{filteredLand.reduce((s, d) => s + d.sqft, 0).toLocaleString()}</td>
                      <td style={{ padding: "11px 13px" }} />
                      <td style={{ padding: "11px 13px", color: "#d4a853", fontWeight: 700, textAlign: "right" }}>{fmtFull(filteredLand.reduce((s, d) => s + d.value, 0))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ INSIGHTS ═══ */}
        {activeTab === "detail" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,168,83,0.14)", borderRadius: 14, padding: 26 }}>
              <h3 style={{ margin: "0 0 18px", fontSize: 12, color: "#d4a853", letterSpacing: 2, textTransform: "uppercase" }}>Portfolio Summary</h3>
              {[
                { label: "Grand Total Portfolio Value", value: fmtFull(GRAND_TOTAL), highlight: true },
                { label: "Total Land Value", value: fmtFull(TOTAL_LAND) },
                { label: "  └ % of Grand Total", value: `${((TOTAL_LAND / GRAND_TOTAL) * 100).toFixed(2)}%`, sub: true },
                { label: "Total Building Value", value: fmtFull(TOTAL_BUILDING) },
                { label: "  └ % of Grand Total", value: `${((TOTAL_BUILDING / GRAND_TOTAL) * 100).toFixed(2)}%`, sub: true },
                { label: "Total Share Value", value: fmtFull(TOTAL_SHARES) },
                { label: "  └ % of Grand Total", value: `${((TOTAL_SHARES / GRAND_TOTAL) * 100).toFixed(2)}%`, sub: true },
                { label: "Number of Land Plots", value: "232" },
                { label: "Number of Buildings", value: "47 (63 registered)" },
                { label: "Total Share Entries", value: "18,947,628 shares" },
                { label: "Total Land Area (sqft)", value: "4,724,725 sqft" },
                { label: "Highest PAVA Rate", value: "Nu. 2,944.96 / sqft (Core)" },
                { label: "Largest Plot", value: "929,919 sqft (Changzamtog)" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(212,168,83,0.07)", fontSize: row.sub ? 10.5 : 11.5 }}>
                  <span style={{ color: row.sub ? "#4a3818" : "#6a5028" }}>{row.label}</span>
                  <span style={{ color: row.highlight ? "#d4a853" : row.sub ? "#5a4828" : "#e8d5a3", fontWeight: row.highlight ? 700 : 400 }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,168,83,0.14)", borderRadius: 14, padding: 24 }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 12, color: "#d4a853", letterSpacing: 2, textTransform: "uppercase" }}>Top 5 by Total Value</h3>
                {dratshangSummary.sort((a, b) => b.total - a.total).slice(0, 5).map((d, i) => (
                  <div key={i} onClick={() => { setSelectedDratshang(d.name); setActiveTab("breakdown"); }}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid rgba(212,168,83,0.07)", cursor: "pointer" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: COLORS[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#0a0804", flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11.5, color: "#e8d5a3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 5 }}>{d.name}</div>
                      <div style={{ height: 3, background: "rgba(212,168,83,0.08)", borderRadius: 2 }}>
                        <div style={{ height: "100%", width: `${(d.total / GRAND_TOTAL) * 100 * 3.5}%`, maxWidth: "100%", background: COLORS[i], borderRadius: 2 }} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, color: COLORS[i], fontWeight: 700 }}>{fmt(d.total)}</div>
                      <div style={{ fontSize: 9.5, color: "#4a3818" }}>{d.pct}%</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(212,168,83,0.06)", border: "1px solid rgba(212,168,83,0.18)", borderRadius: 14, padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(212,168,83,0.35)" }}>
                    <img src={logoSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#d4a853" }}>Gerab Nyed Yon Limited</div>
                    <div style={{ fontSize: 10, color: "#6a5028", letterSpacing: 1 }}>ASSET MANAGEMENT · BHUTAN</div>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: "#6a5028", lineHeight: 1.7 }}>
                  This dashboard presents the consolidated asset portfolio of religious institutions registered under Gerab Nyed Yon Limited. Holdings span land (232 plots), buildings (47 structures), and equity shares across multiple companies including BNBL, BBPL, PCAL, DFAL, BFAL, RICB and others.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(212,168,83,0.1)", padding: "14px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, color: "#4a3818", background: "rgba(0,0,0,0.25)" }}>
        <span style={{ letterSpacing: 1 }}>GERAB NYED YON LIMITED · CONFIDENTIAL ASSET REGISTRY</span>
        <span>Grand Total: {fmtFull(GRAND_TOTAL)} · 232 Plots · 47 Buildings · 18,947,628 Shares</span>
      </div>

      {/* Bottom ornament */}
      <div style={{ height: 3, background: "linear-gradient(90deg, transparent 0%, #8a3a2a 10%, #d4a853 35%, #f0c870 50%, #d4a853 65%, #8a3a2a 90%, transparent 100%)" }} />

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: rgba(212,168,83,0.04); }
        ::-webkit-scrollbar-thumb { background: rgba(212,168,83,0.28); border-radius: 3px; }
        select option { background: #0c0905; color: #e8d5a3; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        div > div[style*="border-radius: 14px"], div > div[style*="border-radius: 12px"] { animation: slideUp 0.35s ease both; }
      `}</style>
    </div>
  );
}