import { useState, useEffect, useRef, useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend, Treemap, LineChart, Line, CartesianGrid } from "recharts";
import logoSrc from "./logo.png";

// ═══════════════════════════════════════════════════════════════════════════
// DATA & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

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

const COLORS = ["#d4a853", "#c8693a", "#7a4f8a", "#2d7d9a", "#4a9e6b", "#e05c5c", "#5c8ee0", "#e0c55c", "#8e5ce0", "#5ce0b5", "#e08e5c", "#5ce0d8", "#ff6b9d", "#c44569"];
const GRAND_TOTAL = 3231208556.15;
const TOTAL_LAND = 2523572163.67;
const TOTAL_BUILDING = 301105061.62;
const TOTAL_SHARES = 411057720.00;

// ═══════════════════════════════════════════════════════════════════════════
// FORMATTING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER WITH ENHANCED EFFECTS
// ═══════════════════════════════════════════════════════════════════════════

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = null;
    const duration = 2000;
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
    <span style={{ display: "inline-block", animation: "countPulse 0.6s ease-out" }}>
      {prefix}
      {decimals > 0 ? display.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : Math.floor(display).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ENHANCED PARTICLE BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════

function ParticleBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 60 + 30,
      pulse: Math.random() * Math.PI * 2,
    }));

    let id, time = 0;
    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.pulse += 0.02;
        const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.2;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${pulseAlpha})`;
        ctx.fill();

        // Draw connecting lines
        particles.forEach((p2, j) => {
          if (i < j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              ctx.strokeStyle = `rgba(212,168,83,${0.1 * (1 - dist / 150)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 0, opacity: 0.4 }} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM ENHANCED TOOLTIP
// ═══════════════════════════════════════════════════════════════════════════

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        background: "linear-gradient(135deg, rgba(10,8,4,0.98), rgba(30,20,10,0.95))", 
        border: "1px solid #d4a853", 
        borderRadius: 12, 
        padding: "12px 18px", 
        boxShadow: "0 12px 40px rgba(0,0,0,0.8), 0 0 30px rgba(212,168,83,0.3)",
        backdropFilter: "blur(10px)"
      }}>
        <p style={{ color: "#d4a853", fontWeight: 700, marginBottom: 6, fontSize: 12, margin: "0 0 8px", letterSpacing: 1 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: "#e8d5a3", fontSize: 11, margin: "3px 0" }}>
            <span style={{ color: p.color, fontWeight: 600 }}>● {p.name}: </span>
            {fmtFull(+p.value * (p.name !== "Holdings %" ? 1000000 : 1))}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function Dashboard() {
  const [selectedDratshang, setSelectedDratshang] = useState("All");
  const [selectedThromde, setSelectedThromde] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    [...dratshangSummary].sort((a, b) => b.total - a.total).slice(0, 10).map(d => ({
      name: d.name.length > 20 ? d.name.slice(0, 18) + "…" : d.name,
      value: Math.round(d.total),
    })), []);

  const barData = useMemo(() =>
    filteredSummary.slice(0, 10).map(d => ({
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
    dratshangSummary.sort((a, b) => b.total - a.total).slice(0, 16).map((d, i) => ({
      name: d.name.length > 18 ? d.name.slice(0, 16) + "…" : d.name,
      size: Math.max(Math.round(d.total / 1e5), 1),
      color: COLORS[i % COLORS.length],
    })), []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0804 0%, #1a1208 20%, #0f0d06 40%, #120f08 60%, #0d0b05 80%, #080603 100%)", fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: "#e8d5a3", position: "relative", overflow: "hidden" }}>
      <ParticleBg />

      {/* Aurora Background */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `
          radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,168,83,0.08) 0%, transparent 30%),
          radial-gradient(circle at 20% 50%, rgba(212,168,83,0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(200,105,58,0.04) 0%, transparent 50%)
        `,
        pointerEvents: "none",
        zIndex: 0,
        transition: "background 0.3s ease"
      }} />

      {/* Top Ornament */}
      <div style={{ height: 5, background: "linear-gradient(90deg, transparent 0%, #d4a853 20%, #f0c870 50%, #d4a853 80%, transparent 100%)", boxShadow: "0 0 20px rgba(212,168,83,0.4)" }} />

      {/* HEADER */}
      <div style={{ position: "relative", zIndex: 1, padding: "24px 36px 20px", borderBottom: "1px solid rgba(212,168,83,0.15)", background: "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))", backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>

          {/* Logo + Title */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", overflow: "hidden",
              border: "2.5px solid rgba(212,168,83,0.6)",
              boxShadow: "0 0 30px rgba(212,168,83,0.4), 0 0 60px rgba(200,105,58,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
              flexShrink: 0, background: "#000",
              transition: "all 0.4s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(212,168,83,0.6), 0 0 80px rgba(200,105,58,0.3), inset 0 1px 0 rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(212,168,83,0.4), 0 0 60px rgba(200,105,58,0.2), inset 0 1px 0 rgba(255,255,255,0.3)";
            }}>
              <img src={logoSrc} alt="Gerab Nyed Yon Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: 2.8, color: "#d4a853", textShadow: "0 0 20px rgba(212,168,83,0.5), 0 2px 8px rgba(0,0,0,0.6)", lineHeight: 1.1, animation: "titleGlow 3s ease-in-out infinite" }}>
                GERAB NYED YON LIMITED
              </h1>
              <p style={{ margin: "6px 0 0", fontSize: 11, color: "#8a6830", letterSpacing: 3, textTransform: "uppercase", fontWeight: 500 }}>
                ✦ Religious Institution Portfolio ✦ Asset Valuation Dashboard ✦
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { key: "overview", label: "◆ Overview", icon: "📊" },
              { key: "breakdown", label: "◆ Breakdown", icon: "📈" },
              { key: "plots", label: "◆ Land Plots", icon: "🗺️" },
              { key: "detail", label: "◆ Insights", icon: "🔍" },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                padding: "10px 20px",
                borderRadius: 24,
                border: `2px solid ${activeTab === t.key ? "#d4a853" : "rgba(212,168,83,0.25)"}`,
                background: activeTab === t.key
                  ? "linear-gradient(135deg, rgba(212,168,83,0.35), rgba(200,105,58,0.25))"
                  : "rgba(0,0,0,0.3)",
                color: activeTab === t.key ? "#d4a853" : "#6a5028",
                fontSize: 11,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: 1.6,
                fontFamily: "inherit",
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: activeTab === t.key
                  ? "0 10px 30px rgba(212,168,83,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                  : "0 4px 12px rgba(0,0,0,0.3)",
                transform: activeTab === t.key ? "translateY(-4px)" : "none",
                fontWeight: activeTab === t.key ? 800 : 600,
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(12px)"
              }}>
                {activeTab === t.key && (
                  <>
                    <div style={{
                      position: "absolute",
                      top: 0, left: "-100%", right: 0, bottom: 0,
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      animation: "shine 2.5s infinite"
                    }} />
                  </>
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
          <select value={selectedThromde} onChange={e => setSelectedThromde(e.target.value)} style={{
            background: "linear-gradient(135deg, rgba(15,13,8,0.8), rgba(20,15,10,0.8))",
            border: "1.5px solid rgba(212,168,83,0.35)",
            borderRadius: 22,
            padding: "9px 16px",
            color: "#d4a853",
            fontSize: 11.5,
            fontFamily: "inherit",
            cursor: "pointer",
            outline: "none",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,168,83,0.1)"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#d4a853";
            e.target.style.boxShadow = "0 8px 20px rgba(212,168,83,0.3), inset 0 1px 0 rgba(212,168,83,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(212,168,83,0.35)";
            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,168,83,0.1)";
          }}>
            {allThromdes.map(t => <option key={t} value={t}>{t === "All" ? "✦ All Thromde" : t}</option>)}
          </select>
          <select value={selectedDratshang} onChange={e => setSelectedDratshang(e.target.value)} style={{
            background: "linear-gradient(135deg, rgba(15,13,8,0.8), rgba(20,15,10,0.8))",
            border: "1.5px solid rgba(212,168,83,0.35)",
            borderRadius: 22,
            padding: "9px 16px",
            color: "#d4a853",
            fontSize: 11.5,
            fontFamily: "inherit",
            cursor: "pointer",
            outline: "none",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s",
            maxWidth: 300,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,168,83,0.1)"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#d4a853";
            e.target.style.boxShadow = "0 8px 20px rgba(212,168,83,0.3), inset 0 1px 0 rgba(212,168,83,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(212,168,83,0.35)";
            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,168,83,0.1)";
          }}>
            {allDratshangs.map(d => <option key={d} value={d}>{d === "All" ? "✦ All Institutions" : d}</option>)}
          </select>
          {(selectedDratshang !== "All" || selectedThromde !== "All") && (
            <button onClick={() => { setSelectedDratshang("All"); setSelectedThromde("All"); }}
              style={{
                background: "linear-gradient(135deg, rgba(200,105,58,0.25), rgba(200,105,58,0.15))",
                border: "1.5px solid rgba(200,105,58,0.5)",
                borderRadius: 22,
                padding: "9px 16px",
                color: "#c8693a",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.3s",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(200,105,58,0.2)",
                backdropFilter: "blur(12px)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(200,105,58,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(200,105,58,0.2)";
              }}>
              ✕ RESET
            </button>
          )}
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, padding: "24px 36px 0" }}>
        {[
          { label: "Grand Total Value", rawValue: kpis.totalValue, icon: "💎", color: "#d4a853", glow: "rgba(212,168,83,0.4)" },
          { label: "Total Land Value", rawValue: kpis.landValue, icon: "🗺️", color: "#7ac47a", glow: "rgba(122,196,122,0.3)" },
          { label: "Total Building Value", rawValue: kpis.buildingValue, icon: "🏛️", color: "#5cb8e0", glow: "rgba(92,184,224,0.3)" },
          { label: "Total Share Value", rawValue: kpis.shareValue, icon: "📊", color: "#c87acc", glow: "rgba(200,122,204,0.3)" },
          { label: "Land Plots", rawValue: kpis.plots, icon: "📍", color: "#e0a05c", glow: "rgba(224,160,92,0.3)", isCount: true },
        ].map((kpi, i) => (
          <div key={i} onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)}
            style={{
              background: hoveredCard === i
                ? `linear-gradient(135deg, ${kpi.glow}, rgba(212,168,83,0.15))`
                : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(212,168,83,0.01))",
              border: `1.5px solid ${hoveredCard === i ? kpi.color : "rgba(212,168,83,0.15)"}`,
              borderRadius: 18,
              padding: "22px 20px 18px",
              transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
              transform: hoveredCard === i ? "translateY(-12px) scale(1.06) perspective(1200px) rotateX(8deg)" : "none",
              boxShadow: hoveredCard === i
                ? `0 25px 50px rgba(0,0,0,0.6), 0 0 50px ${kpi.glow}, inset 0 1px 0 rgba(255,255,255,0.2)`
                : "0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.08)",
              backdropFilter: "blur(12px)",
              cursor: "default",
              position: "relative",
              overflow: "hidden"
            }}>

            {/* Shine Effect */}
            {hoveredCard === i && (
              <div style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)",
                animation: "shine 3s infinite"
              }} />
            )}

            {/* Background Glow */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: `radial-gradient(circle at 30% 30%, ${kpi.glow} 0%, transparent 70%)`,
              opacity: hoveredCard === i ? 0.6 : 0.2,
              pointerEvents: "none",
              transition: "opacity 0.3s"
            }} />

            <div style={{
              fontSize: 32,
              color: kpi.color,
              marginBottom: 12,
              filter: `drop-shadow(0 0 16px ${kpi.color})`,
              textShadow: `0 0 24px ${kpi.glow}`,
              transition: "all 0.3s",
              transform: hoveredCard === i ? "scale(1.2)" : "scale(1)",
              position: "relative",
              zIndex: 1
            }}>
              {kpi.icon}
            </div>

            <div style={{
              fontSize: 9,
              color: "#6a5028",
              marginBottom: 7,
              letterSpacing: 1.8,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              fontWeight: 700,
              position: "relative",
              zIndex: 1
            }}>
              {kpi.label}
            </div>

            <div style={{
              fontSize: kpi.isCount ? 30 : 18,
              fontWeight: 900,
              color: kpi.color,
              lineHeight: 1.1,
              textShadow: `0 0 16px ${kpi.color}, 0 2px 8px rgba(0,0,0,0.4)`,
              position: "relative",
              zIndex: 1
            }}>
              {kpi.isCount
                ? <AnimatedNumber value={kpi.rawValue} />
                : <AnimatedNumber value={kpi.rawValue / 1e6} prefix="Nu. " suffix="M" decimals={2} />
              }
            </div>

            {!kpi.isCount && (
              <div style={{
                fontSize: 9,
                color: "#5a4018",
                marginTop: 5,
                fontWeight: 500,
                position: "relative",
                zIndex: 1
              }}>
                = {fmtFull(kpi.rawValue)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1, padding: "24px 36px 50px" }}>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>

              {/* Pie Chart */}
              <div style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(212,168,83,0.03))",
                border: "1px solid rgba(212,168,83,0.2)",
                borderRadius: 18,
                padding: 28,
                backdropFilter: "blur(14px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)",
                transition: "all 0.4s",
                cursor: "default",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,168,83,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)";
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 30% 30%, rgba(212,168,83,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
                <h3 style={{ margin: "0 0 4px", fontSize: 13, color: "#d4a853", letterSpacing: 2.2, textTransform: "uppercase", textShadow: "0 0 12px rgba(212,168,83,0.4)", fontWeight: 800, position: "relative", zIndex: 1 }}>Portfolio Distribution</h3>
                <p style={{ margin: "0 0 16px", fontSize: 10.5, color: "#4a3818", position: "relative", zIndex: 1 }}>Top institutions by portfolio value</p>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} cx="45%" cy="50%" innerRadius={70} outerRadius={115} paddingAngle={2} dataKey="value">
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="rgba(0,0,0,0.8)" strokeWidth={2.5} style={{ filter: `drop-shadow(0 4px 12px rgba(0,0,0,0.5))` }} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [fmtFull(v), "Value"]} contentStyle={{ background: "rgba(10,8,4,0.98)", border: "1px solid #d4a853", borderRadius: 12, color: "#e8d5a3", fontSize: 11, boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 9.5, color: "#8a6830", paddingLeft: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(212,168,83,0.03))",
                border: "1px solid rgba(212,168,83,0.2)",
                borderRadius: 18,
                padding: 28,
                backdropFilter: "blur(14px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)",
                transition: "all 0.4s",
                cursor: "default",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,168,83,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)";
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 70% 30%, rgba(212,168,83,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
                <h3 style={{ margin: "0 0 4px", fontSize: 13, color: "#d4a853", letterSpacing: 2.2, textTransform: "uppercase", textShadow: "0 0 12px rgba(212,168,83,0.4)", fontWeight: 800, position: "relative", zIndex: 1 }}>Asset Composition</h3>
                <p style={{ margin: "0 0 16px", fontSize: 10.5, color: "#4a3818", position: "relative", zIndex: 1 }}>Land · Building · Shares (Nu. Millions)</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData} margin={{ left: -14, right: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,83,0.1)" />
                    <XAxis dataKey="name" tick={{ fontSize: 8.5, fill: "#6a5028" }} />
                    <YAxis tick={{ fontSize: 8.5, fill: "#6a5028" }} tickFormatter={v => `${v}M`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Land" stackId="a" fill="#7ac47a" radius={[4, 4, 0, 0]} style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.3))" }} />
                    <Bar dataKey="Building" stackId="a" fill="#5cb8e0" radius={[4, 4, 0, 0]} style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.3))" }} />
                    <Bar dataKey="Shares" stackId="a" fill="#c87acc" radius={[4, 4, 0, 0]} style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.3))" }} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: 9.5, color: "#8a6830", paddingTop: 10 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Treemap - Full Width */}
            <div style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(212,168,83,0.03))",
              border: "1px solid rgba(212,168,83,0.2)",
              borderRadius: 18,
              padding: 28,
              backdropFilter: "blur(14px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)",
              transition: "all 0.4s",
              cursor: "default",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,168,83,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)";
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 50% 50%, rgba(212,168,83,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
              <h3 style={{ margin: "0 0 4px", fontSize: 13, color: "#d4a853", letterSpacing: 2.2, textTransform: "uppercase", textShadow: "0 0 12px rgba(212,168,83,0.4)", fontWeight: 800, position: "relative", zIndex: 1 }}>Portfolio Heatmap</h3>
              <p style={{ margin: "0 0 18px", fontSize: 10.5, color: "#4a3818", position: "relative", zIndex: 1 }}>Relative size of each institution's total portfolio</p>
              <ResponsiveContainer width="100%" height={420}>
                <Treemap data={treemapChildren} dataKey="size" stroke="#1a1a1a" strokeWidth={3}
                  content={({ x, y, width, height, name, color }) => (
                    <g>
                      <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation={1.5} />
                        </filter>
                      </defs>
                      <rect x={x} y={y} width={width} height={height} fill={color} fillOpacity={0.9} stroke="#1a1a1a" strokeWidth={3} rx={8} style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }} />
                      {width > 40 && height > 22 && (
                        <>
                          <text x={x + width / 2} y={y + height / 2 - 4} textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize={Math.min(width / 10.5, 16)} fontFamily="Arial, sans-serif" fontWeight="900" opacity={0.6} filter="url(#glow)">{name}</text>
                          <text x={x + width / 2} y={y + height / 2 - 4} textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize={Math.min(width / 10.5, 16)} fontFamily="Arial, sans-serif" fontWeight="800" style={{ paintOrder: "stroke", stroke: "#000", strokeWidth: 0.6 }}>{name}</text>
                        </>
                      )}
                    </g>
                  )} />
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* BREAKDOWN TAB */}
        {activeTab === "breakdown" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {selectedProfile && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                {/* Profile Card */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(212,168,83,0.1), rgba(212,168,83,0.05))",
                  border: "1.5px solid rgba(212,168,83,0.3)",
                  borderRadius: 18,
                  padding: 28,
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.2)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 20% 20%, rgba(212,168,83,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />

                  <div style={{
                    width: 48, height: 48, borderRadius: "50%", overflow: "hidden",
                    border: "2px solid rgba(212,168,83,0.5)",
                    marginBottom: 14,
                    boxShadow: "0 0 20px rgba(212,168,83,0.3)",
                    position: "relative",
                    zIndex: 1
                  }}>
                    <img src={logoSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  <h3 style={{ margin: "0 0 16px", fontSize: 14, color: "#d4a853", lineHeight: 1.4, fontWeight: 800, textShadow: "0 0 12px rgba(212,168,83,0.3)", position: "relative", zIndex: 1 }}>{selectedProfile.name}</h3>

                  {[
                    { l: "Grand Total", v: fmtFull(selectedProfile.total), c: "#d4a853", big: true },
                    { l: "Land Assets", v: fmtFull(selectedProfile.landValue), c: "#7ac47a" },
                    { l: "Building Value", v: fmtFull(selectedProfile.buildingValue), c: "#5cb8e0" },
                    { l: "Share Value", v: fmtFull(selectedProfile.shareValue), c: "#c87acc" },
                    { l: "Portfolio Share", v: `${selectedProfile.pct}%`, c: "#e0a05c" },
                    { l: "Land Plots", v: filteredLand.length, c: "#e8d5a3" },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(212,168,83,0.12)", fontSize: row.big ? 12 : 11, position: "relative", zIndex: 1 }}>
                      <span style={{ color: "#6a5028", fontWeight: row.big ? 700 : 500 }}>{row.l}</span>
                      <span style={{ color: row.c, fontWeight: row.big ? 800 : 600, textShadow: `0 0 8px ${row.c}44` }}>{row.v}</span>
                    </div>
                  ))}
                </div>

                {/* Radar */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(212,168,83,0.03))",
                  border: "1px solid rgba(212,168,83,0.2)",
                  borderRadius: 18,
                  padding: 28,
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 50% 50%, rgba(212,168,83,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
                  <h3 style={{ margin: "0 0 18px", fontSize: 13, color: "#d4a853", letterSpacing: 2.2, textTransform: "uppercase", textShadow: "0 0 12px rgba(212,168,83,0.4)", fontWeight: 800, position: "relative", zIndex: 1 }}>Asset Radar — {selectedProfile.name}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(212,168,83,0.15)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#8a6830", fontSize: 11 }} />
                      <Radar dataKey="A" stroke="#d4a853" fill="#d4a853" fillOpacity={0.25} strokeWidth={2.5} style={{ filter: "drop-shadow(0 0 8px rgba(212,168,83,0.4))" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Full Table */}
            <div style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(212,168,83,0.01))",
              border: "1px solid rgba(212,168,83,0.2)",
              borderRadius: 18,
              overflow: "hidden",
              backdropFilter: "blur(14px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)"
            }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(212,168,83,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(90deg, rgba(212,168,83,0.05), transparent)" }}>
                <h3 style={{ margin: 0, fontSize: 13, color: "#d4a853", letterSpacing: 2.2, textTransform: "uppercase", fontWeight: 800 }}>Institution Registry</h3>
                <span style={{ fontSize: 10.5, color: "#4a3818" }}>{filteredSummary.length} records</span>
              </div>
              <div style={{ overflowX: "auto", maxHeight: 500, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                    <tr style={{ background: "rgba(10,8,4,0.98)" }}>
                      {["#", "Institution", "Land Value", "Building Value", "Share Value", "Total Value", "Holdings %"].map(h => (
                        <th key={h} style={{ padding: "12px 14px", textAlign: h === "#" ? "center" : "left", color: "#d4a853", letterSpacing: 1, fontWeight: 700, borderBottom: "1px solid rgba(212,168,83,0.2)", whiteSpace: "nowrap", fontSize: 10.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSummary.map((d, i) => (
                      <tr key={i} onClick={() => setSelectedDratshang(d.name === selectedDratshang ? "All" : d.name)}
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          cursor: "pointer",
                          background: hoveredRow === i
                            ? "rgba(212,168,83,0.12)"
                            : selectedDratshang === d.name
                              ? "rgba(212,168,83,0.1)"
                              : i % 2 === 0
                                ? "transparent"
                                : "rgba(255,255,255,0.015)",
                          transition: "all 0.2s",
                          transform: hoveredRow === i ? "scale(1.01)" : "none",
                          boxShadow: hoveredRow === i ? "inset 0 0 12px rgba(212,168,83,0.1)" : "none"
                        }}>
                        <td style={{ padding: "11px 14px", color: "#4a3818", borderBottom: "1px solid rgba(212,168,83,0.05)", textAlign: "center", fontWeight: 600 }}>{i + 1}</td>
                        <td style={{ padding: "11px 14px", color: "#e8d5a3", borderBottom: "1px solid rgba(212,168,83,0.05)", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: selectedDratshang === d.name ? 700 : 500 }}>{d.name}</td>
                        <td style={{ padding: "11px 14px", color: "#7ac47a", borderBottom: "1px solid rgba(212,168,83,0.05)", whiteSpace: "nowrap", fontWeight: 600 }}>{fmtFull(d.landValue)}</td>
                        <td style={{ padding: "11px 14px", color: "#5cb8e0", borderBottom: "1px solid rgba(212,168,83,0.05)", whiteSpace: "nowrap", fontWeight: 600 }}>{fmtFull(d.buildingValue)}</td>
                        <td style={{ padding: "11px 14px", color: "#c87acc", borderBottom: "1px solid rgba(212,168,83,0.05)", whiteSpace: "nowrap", fontWeight: 600 }}>{fmtFull(d.shareValue)}</td>
                        <td style={{ padding: "11px 14px", color: "#d4a853", fontWeight: 800, borderBottom: "1px solid rgba(212,168,83,0.05)", whiteSpace: "nowrap", textShadow: "0 0 10px rgba(212,168,83,0.3)" }}>{fmtFull(d.total)}</td>
                        <td style={{ padding: "11px 14px", borderBottom: "1px solid rgba(212,168,83,0.05)", minWidth: 140 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ flex: 1, height: 5, background: "rgba(212,168,83,0.1)", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{
                                height: "100%",
                                width: `${Math.min((d.pct / 30) * 100, 100)}%`,
                                background: `linear-gradient(90deg, ${COLORS[i % COLORS.length]}, ${COLORS[(i + 1) % COLORS.length]})`,
                                borderRadius: 3,
                                boxShadow: `0 0 12px ${COLORS[i % COLORS.length]}`,
                                transition: "all 0.3s"
                              }} />
                            </div>
                            <span style={{ color: "#e0a05c", fontSize: 10, flexShrink: 0, fontWeight: 700 }}>{d.pct}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr style={{ background: "linear-gradient(90deg, rgba(212,168,83,0.1), transparent)" }}>
                      <td colSpan={2} style={{ padding: "13px 14px", color: "#d4a853", fontWeight: 800, fontSize: 11.5, letterSpacing: 1.2, borderBottom: "1px solid rgba(212,168,83,0.2)" }}>GRAND TOTAL</td>
                      <td style={{ padding: "13px 14px", color: "#7ac47a", fontWeight: 800, whiteSpace: "nowrap", borderBottom: "1px solid rgba(212,168,83,0.2)", textShadow: "0 0 8px rgba(122,196,122,0.3)" }}>{fmtFull(TOTAL_LAND)}</td>
                      <td style={{ padding: "13px 14px", color: "#5cb8e0", fontWeight: 800, whiteSpace: "nowrap", borderBottom: "1px solid rgba(212,168,83,0.2)", textShadow: "0 0 8px rgba(92,184,224,0.3)" }}>{fmtFull(TOTAL_BUILDING)}</td>
                      <td style={{ padding: "13px 14px", color: "#c87acc", fontWeight: 800, whiteSpace: "nowrap", borderBottom: "1px solid rgba(212,168,83,0.2)", textShadow: "0 0 8px rgba(200,122,204,0.3)" }}>{fmtFull(TOTAL_SHARES)}</td>
                      <td style={{ padding: "13px 14px", color: "#d4a853", fontWeight: 900, whiteSpace: "nowrap", fontSize: 12.5, borderBottom: "1px solid rgba(212,168,83,0.2)", textShadow: "0 0 12px rgba(212,168,83,0.4)" }}>{fmtFull(GRAND_TOTAL)}</td>
                      <td style={{ padding: "13px 14px", color: "#d4a853", fontWeight: 900, borderBottom: "1px solid rgba(212,168,83,0.2)" }}>100.00%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* LAND PLOTS TAB */}
        {activeTab === "plots" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 14 }}>
              {thromdeStats.map((t, i) => (
                <div key={i} onClick={() => setSelectedThromde(t.thromde === selectedThromde ? "All" : t.thromde)}
                  style={{
                    background: selectedThromde === t.thromde
                      ? `linear-gradient(135deg, rgba(212,168,83,0.2), rgba(212,168,83,0.1))`
                      : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(212,168,83,0.01))",
                    border: `1.5px solid ${selectedThromde === t.thromde ? "#d4a853" : "rgba(212,168,83,0.2)"}`,
                    borderRadius: 14,
                    padding: 18,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    transform: selectedThromde === t.thromde ? "scale(1.05)" : "none",
                    boxShadow: selectedThromde === t.thromde
                      ? "0 10px 30px rgba(212,168,83,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                      : "0 4px 12px rgba(0,0,0,0.3)",
                    backdropFilter: "blur(12px)",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                  <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: `radial-gradient(circle at 50% 50%, rgba(212,168,83,0.1) 0%, transparent 70%)`,
                    opacity: selectedThromde === t.thromde ? 0.5 : 0.2,
                    transition: "opacity 0.3s"
                  }} />

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, position: "relative", zIndex: 1 }}>
                    <span style={{ fontSize: 13, color: "#d4a853", fontWeight: 800, textShadow: "0 0 10px rgba(212,168,83,0.3)" }}>{t.thromde}</span>
                    <span style={{ fontSize: 10, background: "linear-gradient(135deg, rgba(212,168,83,0.2), rgba(200,105,58,0.1))", padding: "3px 10px", borderRadius: 12, color: "#d4a853", fontWeight: 700 }}>{t.plots}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#e8d5a3", marginBottom: 10, textShadow: "0 0 8px rgba(212,168,83,0.2)", position: "relative", zIndex: 1 }}>{fmt(t.totalValue)}</div>
                  <div style={{ height: 4, background: "rgba(212,168,83,0.1)", borderRadius: 2, overflow: "hidden", position: "relative", zIndex: 1 }}>
                    <div style={{
                      height: "100%",
                      width: `${(t.plots / 232) * 100}%`,
                      background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[(i + 1) % COLORS.length]})`,
                      borderRadius: 2,
                      boxShadow: `0 0 12px ${COLORS[i]}`,
                      transition: "all 0.4s"
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Plot Table */}
            <div style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(212,168,83,0.01))",
              border: "1px solid rgba(212,168,83,0.2)",
              borderRadius: 18,
              overflow: "hidden",
              backdropFilter: "blur(14px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)"
            }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(212,168,83,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(90deg, rgba(212,168,83,0.05), transparent)" }}>
                <h3 style={{ margin: 0, fontSize: 13, color: "#d4a853", letterSpacing: 2.2, textTransform: "uppercase", fontWeight: 800 }}>Land Plots</h3>
                <span style={{ fontSize: 10.5, color: "#4a3818" }}>{filteredLand.length} of 232 plots</span>
              </div>
              <div style={{ overflowX: "auto", maxHeight: 500, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10.5 }}>
                  <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                    <tr style={{ background: "rgba(10,8,4,0.98)" }}>
                      {["SL.", "Thromde", "Village", "Institution", "Area (sqft)", "Rate", "Value"].map(h => (
                        <th key={h} style={{ padding: "11px 12px", textAlign: "left", color: "#d4a853", letterSpacing: 0.8, fontWeight: 700, borderBottom: "1px solid rgba(212,168,83,0.2)", whiteSpace: "nowrap", fontSize: 10 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLand.map((d, i) => (
                      <tr key={d.id} style={{
                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.008)",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(212,168,83,0.08)";
                        e.currentTarget.style.transform = "scale(1.01)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.008)";
                        e.currentTarget.style.transform = "scale(1)";
                      }}>
                        <td style={{ padding: "9px 12px", color: "#4a3818", borderBottom: "1px solid rgba(212,168,83,0.04)", fontWeight: 600 }}>{d.id}</td>
                        <td style={{ padding: "9px 12px", color: "#e0a05c", borderBottom: "1px solid rgba(212,168,83,0.04)", fontWeight: 600 }}>{d.thromde}</td>
                        <td style={{ padding: "9px 12px", color: "#8a7050", borderBottom: "1px solid rgba(212,168,83,0.04)" }}>{d.village}</td>
                        <td style={{ padding: "9px 12px", color: "#e8d5a3", borderBottom: "1px solid rgba(212,168,83,0.04)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.dratshang}</td>
                        <td style={{ padding: "9px 12px", color: "#7ac47a", borderBottom: "1px solid rgba(212,168,83,0.04)", textAlign: "right", whiteSpace: "nowrap", fontWeight: 600 }}>{d.sqft.toLocaleString()}</td>
                        <td style={{ padding: "9px 12px", color: "#8a8070", borderBottom: "1px solid rgba(212,168,83,0.04)", textAlign: "right" }}>{d.rate.toFixed(2)}</td>
                        <td style={{ padding: "9px 12px", color: "#d4a853", fontWeight: 700, borderBottom: "1px solid rgba(212,168,83,0.04)", whiteSpace: "nowrap", textAlign: "right", textShadow: "0 0 8px rgba(212,168,83,0.3)" }}>{fmtFull(d.value)}</td>
                      </tr>
                    ))}
                    <tr style={{ background: "linear-gradient(90deg, rgba(212,168,83,0.1), transparent)" }}>
                      <td colSpan={4} style={{ padding: "11px 12px", color: "#d4a853", fontWeight: 800, fontSize: 11, borderBottom: "1px solid rgba(212,168,83,0.2)" }}>SUB-TOTAL ({filteredLand.length} plots)</td>
                      <td style={{ padding: "11px 12px", color: "#7ac47a", fontWeight: 800, textAlign: "right", borderBottom: "1px solid rgba(212,168,83,0.2)", textShadow: "0 0 8px rgba(122,196,122,0.3)" }}>{filteredLand.reduce((s, d) => s + d.sqft, 0).toLocaleString()}</td>
                      <td style={{ padding: "11px 12px", borderBottom: "1px solid rgba(212,168,83,0.2)" }} />
                      <td style={{ padding: "11px 12px", color: "#d4a853", fontWeight: 800, textAlign: "right", borderBottom: "1px solid rgba(212,168,83,0.2)", textShadow: "0 0 10px rgba(212,168,83,0.4)" }}>{fmtFull(filteredLand.reduce((s, d) => s + d.value, 0))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* INSIGHTS TAB */}
        {activeTab === "detail" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(212,168,83,0.03))",
              border: "1px solid rgba(212,168,83,0.2)",
              borderRadius: 18,
              padding: 28,
              backdropFilter: "blur(14px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 30% 30%, rgba(212,168,83,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />

              <h3 style={{ margin: "0 0 20px", fontSize: 13, color: "#d4a853", letterSpacing: 2.2, textTransform: "uppercase", fontWeight: 800, textShadow: "0 0 12px rgba(212,168,83,0.4)", position: "relative", zIndex: 1 }}>Portfolio Summary</h3>

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
              ].map((row, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(212,168,83,0.08)",
                  fontSize: row.sub ? 10.5 : 11.5,
                  position: "relative",
                  zIndex: 1
                }}>
                  <span style={{ color: row.sub ? "#4a3818" : "#6a5028", fontWeight: row.sub ? 500 : 600 }}>{row.label}</span>
                  <span style={{
                    color: row.highlight ? "#d4a853" : row.sub ? "#5a4828" : "#e8d5a3",
                    fontWeight: row.highlight ? 900 : 600,
                    textShadow: row.highlight ? "0 0 12px rgba(212,168,83,0.4)" : "none"
                  }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(212,168,83,0.03))",
                border: "1px solid rgba(212,168,83,0.2)",
                borderRadius: 18,
                padding: 28,
                backdropFilter: "blur(14px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.1)",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 70% 30%, rgba(212,168,83,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />

                <h3 style={{ margin: "0 0 18px", fontSize: 13, color: "#d4a853", letterSpacing: 2.2, textTransform: "uppercase", fontWeight: 800, textShadow: "0 0 12px rgba(212,168,83,0.4)", position: "relative", zIndex: 1 }}>Top 5 by Total Value</h3>

                {dratshangSummary.sort((a, b) => b.total - a.total).slice(0, 5).map((d, i) => (
                  <div key={i} onClick={() => { setSelectedDratshang(d.name); setActiveTab("breakdown"); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "13px 0",
                      borderBottom: "1px solid rgba(212,168,83,0.08)",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      position: "relative",
                      zIndex: 1
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateX(8px)";
                      e.currentTarget.style.background = "rgba(212,168,83,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.background = "transparent";
                    }}>
                    <div style={{
                      width: 32, height: 32,
                      borderRadius: "50%",
                      background: COLORS[i],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 900,
                      color: "#0a0804",
                      flexShrink: 0,
                      boxShadow: `0 0 16px ${COLORS[i]}`
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11.5, color: "#e8d5a3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 6, fontWeight: 600 }}>{d.name}</div>
                      <div style={{ height: 4, background: "rgba(212,168,83,0.1)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${(d.total / GRAND_TOTAL) * 100 * 4}%`,
                          maxWidth: "100%",
                          background: COLORS[i],
                          borderRadius: 2,
                          boxShadow: `0 0 12px ${COLORS[i]}`,
                          transition: "all 0.3s"
                        }} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, color: COLORS[i], fontWeight: 900, textShadow: `0 0 10px ${COLORS[i]}55` }}>{fmt(d.total)}</div>
                      <div style={{ fontSize: 9.5, color: "#4a3818", fontWeight: 600 }}>{d.pct}%</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: "linear-gradient(135deg, rgba(212,168,83,0.12), rgba(200,105,58,0.08))",
                border: "1.5px solid rgba(212,168,83,0.25)",
                borderRadius: 18,
                padding: 26,
                backdropFilter: "blur(14px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,168,83,0.15)",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: "radial-gradient(circle at 50% 0%, rgba(212,168,83,0.1) 0%, transparent 60%)",
                  pointerEvents: "none"
                }} />

                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid rgba(212,168,83,0.5)",
                    boxShadow: "0 0 16px rgba(212,168,83,0.3)"
                  }}>
                    <img src={logoSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#d4a853", textShadow: "0 0 12px rgba(212,168,83,0.4)" }}>Gerab Nyed Yon Limited</div>
                    <div style={{ fontSize: 9.5, color: "#6a5028", letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 600 }}>✦ Asset Management ✦</div>
                  </div>
                </div>

                <p style={{
                  margin: 0,
                  fontSize: 11,
                  color: "#6a5028",
                  lineHeight: 1.7,
                  position: "relative",
                  zIndex: 1,
                  fontWeight: 500
                }}>
                  This premium dashboard showcases the consolidated asset portfolio of religious institutions registered under Gerab Nyed Yon Limited. Holdings span land (232 plots), buildings (47 structures), and equity shares across multiple companies including BNBL, BBPL, PCAL, DFAL, BFAL, RICB and others. <span style={{ color: "#d4a853", fontWeight: 700 }}>All data is fully interactive and real-time.</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(212,168,83,0.15)",
        padding: "16px 36px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 10,
        color: "#4a3818",
        background: "linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.2))",
        backdropFilter: "blur(12px)",
        flexWrap: "wrap",
        gap: 16
      }}>
        <span style={{ letterSpacing: 1.5, fontWeight: 600 }}>✦ GERAB NYED YON LIMITED ✦ CONFIDENTIAL ASSET REGISTRY ✦</span>
        <span style={{ fontWeight: 600 }}>Grand Total: {fmtFull(GRAND_TOTAL)} · 232 Plots · 47 Buildings</span>
      </div>

      {/* Bottom Ornament */}
      <div style={{ height: 5, background: "linear-gradient(90deg, transparent 0%, #d4a853 20%, #f0c870 50%, #d4a853 80%, transparent 100%)", boxShadow: "0 0 20px rgba(212,168,83,0.4)" }} />

      {/* PREMIUM STYLES */}
      <style>{`
        * { box-sizing: border-box; }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(212,168,83,0.04);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #d4a853 0%, #c8693a 100%);
          border-radius: 4px;
          box-shadow: inset 0 0 8px rgba(0,0,0,0.4);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e0b563 0%, #d47b4a 100%);
          box-shadow: inset 0 0 12px rgba(0,0,0,0.5), 0 0 16px rgba(212,168,83,0.3);
        }

        select option {
          background: #0c0905;
          color: #e8d5a3;
        }

        /* ═══ ANIMATIONS ═══ */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(-45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(-45deg); }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 8px currentColor, 0 0 16px currentColor; }
          50% { text-shadow: 0 0 16px currentColor, 0 0 32px currentColor; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0.8); }
          50% { box-shadow: 0 0 0 15px rgba(212,168,83,0); }
        }

        @keyframes countPulse {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(212,168,83,0.5), 0 2px 8px rgba(0,0,0,0.6); }
          50% { text-shadow: 0 0 30px rgba(212,168,83,0.8), 0 2px 12px rgba(0,0,0,0.6); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ═══ MOBILE RESPONSIVE ═══ */
        @media (max-width: 768px) {
          * { padding: 0; margin: 0; }
          body { font-size: 13px; }
          h1 { font-size: 16px !important; letter-spacing: 1.2px !important; }
          h3 { font-size: 11px !important; }
          p { font-size: 9px !important; }

          div[style*="padding: 24px"] {
            padding: 14px !important;
          }

          select, input, button {
            font-size: 11px !important;
            padding: 6px 12px !important;
          }

          table { font-size: 9.5px !important; }
          th, td { padding: 6px 8px !important; }
        }

        @media (max-width: 480px) {
          h1 { font-size: 13px !important; letter-spacing: 0.8px !important; }
          h3 { font-size: 10px !important; }
          p { font-size: 8px !important; }

          div[style*="padding"] {
            padding: 10px !important;
          }

          select, input, button {
            font-size: 10px !important;
            padding: 5px 10px !important;
          }

          table { font-size: 8.5px !important; }
          th, td { padding: 5px 6px !important; }
        }
      `}</style>
    </div>
  );
}