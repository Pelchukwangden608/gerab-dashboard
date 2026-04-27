import { useState, useEffect, useRef, useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend, Treemap, LineChart, Line, CartesianGrid } from "recharts";
import logoSrc from "./logo.png";

// ═══════════════════════════════════════════════════════════════════════════
// DATA & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const landData = [
  { id: 1, thromde: "Paro", village: "Pathrom", dratshang: "Paro Rabdey", plotId: "PT1-233", sqft: 2820.00, rate: 299.98, value: 845943.60 },
  { id: 2, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", plotId: "KU1-172", sqft: 9365.00, rate: 172.19, value: 1612559.35 },
  { id: 3, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", plotId: "KU1-173", sqft: 4704.00, rate: 172.19, value: 809981.76 },
  { id: 4, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", plotId: "KU1-174", sqft: 16204.00, rate: 172.19, value: 2790166.76 },
  { id: 5, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", plotId: "KU1-175", sqft: 6795.00, rate: 172.19, value: 1170031.05 },
  { id: 6, thromde: "Punakha", village: "Khuruthang", dratshang: "Talo Tsuk Lhakhang", plotId: "KU1-54", sqft: 13286.00, rate: 172.19, value: 2287716.34 },
  { id: 7, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", plotId: "KU1-177", sqft: 17119.00, rate: 172.19, value: 2947720.61 },
  { id: 8, thromde: "Punakha", village: "Khuruthang", dratshang: "Gyeduen Dratshang Tawa", plotId: "KU1-178", sqft: 13460.00, rate: 172.19, value: 2317677.40 },
  { id: 9, thromde: "Thimphu", village: "Babesa", dratshang: "Dechenphodrang Kugyer", plotId: "BA1-671", sqft: 7062.00, rate: 421.53, value: 2976844.86 },
  { id: 10, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-727", sqft: 7384.00, rate: 421.53, value: 3112577.52 },
  { id: 11, thromde: "Thimphu", village: "Babesa", dratshang: "Phading Khangzang", plotId: "BA1-731", sqft: 6712.00, rate: 421.53, value: 2829309.36 },
  { id: 12, thromde: "Thimphu", village: "Babesa", dratshang: "Phading Khangzang", plotId: "BA1-732", sqft: 11716.00, rate: 421.53, value: 4938645.48 },
  { id: 13, thromde: "Thimphu", village: "Babesa", dratshang: "Barp Lhakhang", plotId: "BA1-425", sqft: 37266.00, rate: 421.53, value: 15708736.98 },
  { id: 14, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-853", sqft: 12307.00, rate: 421.53, value: 5187769.71 },
  { id: 15, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-806", sqft: 8426.00, rate: 421.53, value: 3551811.78 },
  { id: 16, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-860", sqft: 7895.00, rate: 421.53, value: 3327979.35 },
  { id: 17, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-861", sqft: 7895.00, rate: 421.53, value: 3327979.35 },
  { id: 18, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-862", sqft: 7895.00, rate: 421.53, value: 3327979.35 },
  { id: 19, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-458", sqft: 6784.00, rate: 421.53, value: 2859659.52 },
  { id: 20, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-836", sqft: 10617.00, rate: 421.53, value: 4475384.01 },
  { id: 21, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-485", sqft: 5644.00, rate: 421.53, value: 2379115.32 },
  { id: 22, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-884", sqft: 11053.00, rate: 421.53, value: 4659171.09 },
  { id: 23, thromde: "Thimphu", village: "Babesa", dratshang: "Barp Lhakhang", plotId: "BA1-514", sqft: 5432.00, rate: 421.53, value: 2289750.96 },
  { id: 24, thromde: "Thimphu", village: "Babesa", dratshang: "Simtokha Shedra", plotId: "BA1-2", sqft: 11108.00, rate: 421.53, value: 4682355.24 },
  { id: 25, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-544", sqft: 12775.00, rate: 421.53, value: 5385045.75 },
  { id: 26, thromde: "Thimphu", village: "Babesa", dratshang: "Barp Lhakhang", plotId: "BA1-551", sqft: 11170.00, rate: 421.53, value: 4708490.10 },
  { id: 27, thromde: "Thimphu", village: "Babesa", dratshang: "Haa Rabdey", plotId: "BA1-555", sqft: 5369.00, rate: 421.53, value: 2263194.57 },
  { id: 28, thromde: "Thimphu", village: "Babesa", dratshang: "Tala Goenpa", plotId: "BA1-557", sqft: 16236.00, rate: 421.53, value: 6843961.08 },
  { id: 29, thromde: "Thimphu", village: "Babesa", dratshang: "Phading Khangzang", plotId: "BA1-621", sqft: 3049.00, rate: 421.53, value: 1285244.97 },
  { id: 30, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", plotId: "CB1-197", sqft: 13325.00, rate: 432.7, value: 5765727.50 },
  { id: 31, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", plotId: "CB1-199", sqft: 7022.00, rate: 432.7, value: 3038419.40 },
  { id: 32, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", plotId: "CB1-46", sqft: 7122.00, rate: 432.7, value: 3081689.40 },
  { id: 33, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", plotId: "CB1-200", sqft: 13730.00, rate: 432.7, value: 5940971.00 },
  { id: 34, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Danang Goenpa", plotId: "CB1-122", sqft: 9714.00, rate: 432.7, value: 4203247.80 },
  { id: 35, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Danang Goenpa", plotId: "CB1-124", sqft: 5066.00, rate: 432.7, value: 2192058.20 },
  { id: 36, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Tango Monastry", plotId: "CB1-203", sqft: 17685.00, rate: 432.7, value: 7652299.50 },
  { id: 37, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Tango Monastry", plotId: "CB1-204", sqft: 16738.00, rate: 432.7, value: 7242532.60 },
  { id: 38, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", plotId: "CB1-274", sqft: 26323.00, rate: 432.7, value: 11389962.10 },
  { id: 39, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", plotId: "CB1-297", sqft: 5495.00, rate: 432.7, value: 2377686.50 },
  { id: 40, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", plotId: "CB1-26", sqft: 7020.00, rate: 432.7, value: 3037554.00 },
  { id: 41, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", plotId: "CB1-27", sqft: 34107.00, rate: 432.7, value: 14758098.90 },
  { id: 42, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", plotId: "CB1-28", sqft: 62837.00, rate: 432.7, value: 27189569.90 },
  { id: 43, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Cheri Monastry", plotId: "CB1-29", sqft: 7175.00, rate: 432.7, value: 3104622.50 },
  { id: 44, thromde: "Thimphu", village: "Chang Bangdu", dratshang: "Phading Khangzang", plotId: "CB1-195", sqft: 11578.00, rate: 432.7, value: 5009800.60 },
  { id: 45, thromde: "Thimphu", village: "Chang Khorlo", dratshang: "Central Monk Body", plotId: "KH1-052", sqft: 9213.00, rate: 341.43, value: 3145594.59 },
  { id: 46, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", plotId: "CZ1-850", sqft: 20602.00, rate: 432.7, value: 8914485.40 },
  { id: 47, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", plotId: "CZ1-144", sqft: 6861.00, rate: 432.7, value: 2968754.70 },
  { id: 48, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", plotId: "CZ1-946", sqft: 12395.00, rate: 432.7, value: 5363316.50 },
  { id: 49, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", plotId: "CZ1-571", sqft: 7034.00, rate: 432.7, value: 3043611.80 },
  { id: 50, thromde: "Thimphu", village: "Changzamtog", dratshang: "Cheri Monastry", plotId: "CZ1-947", sqft: 22216.00, rate: 432.7, value: 9612863.20 },
  { id: 51, thromde: "Thimphu", village: "Changzamtog", dratshang: "Central Monk Body", plotId: "CZ1-884", sqft: 3920.00, rate: 432.7, value: 1696184.00 },
  { id: 52, thromde: "Thimphu", village: "Changzamtog", dratshang: "Central Monk Body", plotId: "CZ1-894", sqft: 12741.00, rate: 432.7, value: 5513030.70 },
  { id: 53, thromde: "Thimphu", village: "Changzamtog", dratshang: "Central Monk Body", plotId: "CZ1-923", sqft: 12667.00, rate: 432.7, value: 5481010.90 },
  { id: 54, thromde: "Thimphu", village: "Changzamtog", dratshang: "Central Monk Body", plotId: "CZ1-925", sqft: 6861.00, rate: 432.7, value: 2968754.70 },
  { id: 55, thromde: "Thimphu", village: "Changzamtog", dratshang: "Simtokha Shedra", plotId: "CZ1-929", sqft: 4512.00, rate: 432.7, value: 1952342.40 },
  { id: 56, thromde: "Thimphu", village: "Changzamtog", dratshang: "Central Monk Body", plotId: "CZ1-290", sqft: 10019.00, rate: 432.7, value: 4335221.30 },
  { id: 57, thromde: "Thimphu", village: "Changzamtog", dratshang: "Central Monk Body", plotId: "CZ1-697", sqft: 929919.00, rate: 432.7, value: 402375951.30 },
  { id: 58, thromde: "Thimphu", village: "Core", dratshang: "Cheri Monastry", plotId: "CORE-080", sqft: 3380.00, rate: 2944.96, value: 9953964.80 },
  { id: 59, thromde: "Thimphu", village: "Dechencholing", dratshang: "Central Monk Body", plotId: "DL1-111", sqft: 34630.00, rate: 430.06, value: 14892977.80 },
  { id: 60, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-24", sqft: 38768.00, rate: 433.83, value: 16818721.44 },
  { id: 61, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Tango Monastry", plotId: "HS1-188", sqft: 14741.00, rate: 433.83, value: 6395088.03 },
  { id: 62, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-171", sqft: 7063.00, rate: 433.83, value: 3064141.29 },
  { id: 63, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-30", sqft: 11977.00, rate: 433.83, value: 5195981.91 },
  { id: 64, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Tango Monastry", plotId: "HS1-189", sqft: 18733.00, rate: 433.83, value: 8126937.39 },
  { id: 65, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-172", sqft: 30640.00, rate: 433.83, value: 13292551.20 },
  { id: 66, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-432", sqft: 22970.00, rate: 433.83, value: 9965075.10 },
  { id: 67, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-31", sqft: 21532.00, rate: 433.83, value: 9341227.56 },
  { id: 68, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Tango Monastry", plotId: "HS1-190", sqft: 10134.00, rate: 433.83, value: 4396433.22 },
  { id: 69, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-433", sqft: 21663.00, rate: 433.83, value: 9398059.29 },
  { id: 70, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-32", sqft: 16408.00, rate: 433.83, value: 7118282.64 },
  { id: 71, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Trashigang Goenpa", plotId: "HS1-325", sqft: 6756.00, rate: 433.83, value: 2930955.48 },
  { id: 72, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-173", sqft: 1742.00, rate: 433.83, value: 755731.86 },
  { id: 73, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-33", sqft: 34321.00, rate: 433.83, value: 14889479.43 },
  { id: 74, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-607", sqft: 10073.00, rate: 433.83, value: 4369969.59 },
  { id: 75, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-608", sqft: 18104.00, rate: 433.83, value: 7854058.32 },
  { id: 76, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-174", sqft: 23032.00, rate: 433.83, value: 9991972.56 },
  { id: 77, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-34", sqft: 14127.00, rate: 433.83, value: 6128716.41 },
  { id: 78, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-609", sqft: 10210.00, rate: 433.83, value: 4429404.30 },
  { id: 79, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-175", sqft: 20268.00, rate: 433.83, value: 8792866.44 },
  { id: 80, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-35", sqft: 11056.00, rate: 433.83, value: 4796424.48 },
  { id: 81, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Phading Khangzang", plotId: "HS1-605", sqft: 4914.00, rate: 433.83, value: 2131840.62 },
  { id: 82, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-176", sqft: 14127.00, rate: 433.83, value: 6128716.41 },
  { id: 83, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-36", sqft: 3992.00, rate: 433.83, value: 1731849.36 },
  { id: 84, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-546", sqft: 5227.00, rate: 433.83, value: 2267629.41 },
  { id: 85, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-177", sqft: 13205.00, rate: 433.83, value: 5728725.15 },
  { id: 86, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-37", sqft: 4914.00, rate: 433.83, value: 2131840.62 },
  { id: 87, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-40", sqft: 11996.00, rate: 433.83, value: 5204224.68 },
  { id: 88, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Central Monk Body", plotId: "HS1-591", sqft: 22216.00, rate: 433.83, value: 9637967.28 },
  { id: 89, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-178", sqft: 12898.00, rate: 433.83, value: 5595539.34 },
  { id: 90, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Central Monk Body", plotId: "HS1-606", sqft: 5221.00, rate: 433.83, value: 2265026.43 },
  { id: 91, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-179", sqft: 9520.00, rate: 433.83, value: 4130061.60 },
  { id: 92, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-431", sqft: 16592.00, rate: 433.83, value: 7198107.36 },
  { id: 93, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-722", sqft: 36150.00, rate: 433.83, value: 15682954.50 },
  { id: 94, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-180", sqft: 7063.00, rate: 433.83, value: 3064141.29 },
  { id: 95, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-181", sqft: 6142.00, rate: 433.83, value: 2664583.86 },
  { id: 96, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-430", sqft: 21213.00, rate: 433.83, value: 9202835.79 },
  { id: 97, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Central Monk Body", plotId: "HS1-182", sqft: 7677.00, rate: 433.83, value: 3330512.91 },
  { id: 98, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-168", sqft: 32859.00, rate: 433.83, value: 14255219.97 },
  { id: 99, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Central Monk Body", plotId: "HS1-416", sqft: 7985.00, rate: 433.83, value: 3464132.55 },
  { id: 100, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-169", sqft: 11670.00, rate: 433.83, value: 5062796.10 },
  { id: 101, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-10", sqft: 6314.00, rate: 433.83, value: 2739202.62 },
  { id: 102, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Phading Khangzang", plotId: "HS1-186", sqft: 39615.00, rate: 433.83, value: 17186175.45 },
  { id: 103, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Cheri Monastry", plotId: "HS1-170", sqft: 5408.00, rate: 433.83, value: 2346152.64 },
  { id: 104, thromde: "Thimphu", village: "Hejo-Samteling", dratshang: "Dodeydra Shedra", plotId: "HS1-17", sqft: 88137.00, rate: 433.83, value: 38236474.71 },
  { id: 105, thromde: "Thimphu", village: "Jungshina", dratshang: "Central Monk Body", plotId: "JN1-364", sqft: 12284.00, rate: 464.18, value: 5701987.12 },
  { id: 106, thromde: "Thimphu", village: "Jungshina", dratshang: "Dodeydra Shedra", plotId: "JN1-281", sqft: 4914.00, rate: 464.18, value: 2280980.52 },
  { id: 107, thromde: "Thimphu", village: "Jungshina", dratshang: "Central Monk Body", plotId: "JN1-365", sqft: 11670.00, rate: 464.18, value: 5416980.60 },
  { id: 108, thromde: "Thimphu", village: "Jungshina", dratshang: "Phading Khangzang", plotId: "JN1-47", sqft: 12419.00, rate: 464.18, value: 5764651.42 },
  { id: 109, thromde: "Thimphu", village: "Jungshina", dratshang: "Phading Khangzang", plotId: "JN1-426", sqft: 13307.00, rate: 464.18, value: 6176843.26 },
  { id: 110, thromde: "Thimphu", village: "Jungshina", dratshang: "Central Monk Body", plotId: "JN1-392", sqft: 6756.00, rate: 464.18, value: 3136000.08 },
  { id: 111, thromde: "Thimphu", village: "Jungshina", dratshang: "Central Monk Body", plotId: "JN1-394", sqft: 6756.00, rate: 464.18, value: 3136000.08 },
  { id: 112, thromde: "Thimphu", village: "Jungshina", dratshang: "Phading Khangzang", plotId: "JN1-49", sqft: 17812.00, rate: 464.18, value: 8267974.16 },
  { id: 113, thromde: "Thimphu", village: "Jungshina", dratshang: "Central Monk Body", plotId: "JN1-419", sqft: 4606.00, rate: 464.18, value: 2138013.08 },
  { id: 114, thromde: "Thimphu", village: "Jungshina", dratshang: "Trashigang Goenpa", plotId: "JN1-144", sqft: 7985.00, rate: 464.18, value: 3706477.30 },
  { id: 115, thromde: "Thimphu", village: "Jungshina", dratshang: "Central Monk Body", plotId: "JN1-420", sqft: 26103.00, rate: 464.18, value: 12116490.54 },
  { id: 116, thromde: "Thimphu", village: "Jungshina", dratshang: "Trashigang Goenpa", plotId: "JN1-146", sqft: 4959.00, rate: 464.18, value: 2301868.62 },
  { id: 117, thromde: "Thimphu", village: "Jungshina", dratshang: "Dodeydra Shedra", plotId: "JN1-15", sqft: 11670.00, rate: 464.18, value: 5416980.60 },
  { id: 118, thromde: "Thimphu", village: "Jungshina", dratshang: "Paro Rabdey", plotId: "JN1-194", sqft: 7985.00, rate: 464.18, value: 3706477.30 },
  { id: 119, thromde: "Thimphu", village: "Jungshina", dratshang: "Cheri Monastry", plotId: "JN1-506", sqft: 4000.00, rate: 464.18, value: 1856720.00 },
  { id: 120, thromde: "Thimphu", village: "Jungshina", dratshang: "Tango Monastry", plotId: "JN1-525", sqft: 5342.00, rate: 464.18, value: 2479649.56 },
  { id: 121, thromde: "Thimphu", village: "Jungshina", dratshang: "Cheri Monastry", plotId: "JN1-509", sqft: 7444.00, rate: 464.18, value: 3455355.92 },
  { id: 122, thromde: "Thimphu", village: "Jungshina", dratshang: "Tango Monastry", plotId: "JN1-283", sqft: 4792.00, rate: 464.18, value: 2224350.56 },
  { id: 123, thromde: "Thimphu", village: "Jungshina", dratshang: "Cheri Monastry", plotId: "JN1-261", sqft: 29266.00, rate: 464.18, value: 13584691.88 },
  { id: 124, thromde: "Thimphu", village: "Jungshina", dratshang: "Cheri Monastry", plotId: "JN1-262", sqft: 12680.00, rate: 464.18, value: 5885802.40 },
  { id: 125, thromde: "Thimphu", village: "Jungshina", dratshang: "Cheri Monastry", plotId: "JN1-263", sqft: 4345.00, rate: 464.18, value: 2016862.10 },
  { id: 126, thromde: "Thimphu", village: "Jungshina", dratshang: "Tango Monastry", plotId: "JN1-282", sqft: 11670.00, rate: 464.18, value: 5416980.60 },
  { id: 127, thromde: "Thimphu", village: "Jungshina", dratshang: "Dodeydra Shedra", plotId: "JN1-11", sqft: 14434.00, rate: 464.18, value: 6699974.12 },
  { id: 128, thromde: "Thimphu", village: "Jungshina", dratshang: "Tango Monastry", plotId: "JN1-284", sqft: 11363.00, rate: 464.18, value: 5274477.34 },
  { id: 129, thromde: "Thimphu", village: "Jungshina", dratshang: "Dodeydra Shedra", plotId: "JN1-12", sqft: 36545.00, rate: 464.18, value: 16963458.10 },
  { id: 130, thromde: "Thimphu", village: "Jungshina", dratshang: "Dodeydra Shedra", plotId: "JN1-13", sqft: 18426.00, rate: 464.18, value: 8552980.68 },
  { id: 131, thromde: "Thimphu", village: "Jungshina", dratshang: "Dodeydra Shedra", plotId: "JN1-285", sqft: 7985.00, rate: 464.18, value: 3706477.30 },
  { id: 132, thromde: "Thimphu", village: "Jungshina", dratshang: "Dodeydra Shedra", plotId: "JN1-14", sqft: 27332.00, rate: 464.18, value: 12686967.76 },
  { id: 133, thromde: "Thimphu", village: "Jungshina", dratshang: "Dodeydra Shedra", plotId: "JN1-286", sqft: 14741.00, rate: 464.18, value: 6842477.38 },
  { id: 134, thromde: "Thimphu", village: "Kawang Damisa", dratshang: "Central Monk Body", plotId: "DA1-311", sqft: 4000.00, rate: 432.7, value: 1730800.00 },
  { id: 135, thromde: "Thimphu", village: "Kawang Damisa", dratshang: "Choetse Rabdey Dratshang", plotId: "DA1-124", sqft: 4000.00, rate: 432.7, value: 1730800.00 },
  { id: 136, thromde: "Thimphu", village: "Kawang Damisa", dratshang: "Central Monk Body", plotId: "DA1-295", sqft: 24394.00, rate: 432.7, value: 10555283.80 },
  { id: 137, thromde: "Thimphu", village: "Kawang Jangsa", dratshang: "Central Monk Body", plotId: "KA1-042", sqft: 25047.00, rate: 803.06, value: 20114243.82 },
  { id: 138, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-265", sqft: 54156.00, rate: 436.03, value: 23613640.68 },
  { id: 139, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Phading Khangzang", plotId: "LT1-330", sqft: 10416.00, rate: 436.03, value: 4541688.48 },
  { id: 140, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-420", sqft: 4646.00, rate: 436.03, value: 2025795.38 },
  { id: 141, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-340", sqft: 9046.00, rate: 436.03, value: 3944327.38 },
  { id: 142, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-428", sqft: 11301.00, rate: 436.03, value: 4927575.03 },
  { id: 143, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-391", sqft: 5396.00, rate: 436.03, value: 2352817.88 },
  { id: 144, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Dechenphodrang Kugyer", plotId: "LT1-350", sqft: 4026.00, rate: 436.03, value: 1755456.78 },
  { id: 145, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-600", sqft: 21463.00, rate: 436.03, value: 9358511.89 },
  { id: 146, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-554", sqft: 9117.00, rate: 436.03, value: 3975285.51 },
  { id: 147, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Trashigang Goenpa", plotId: "LT1-77", sqft: 14247.00, rate: 436.03, value: 6212119.41 },
  { id: 148, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Central Monk Body", plotId: "LT1-584", sqft: 4026.00, rate: 436.03, value: 1755456.78 },
  { id: 149, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Central Monk Body", plotId: "LT1-96", sqft: 6535.00, rate: 436.03, value: 2849456.05 },
  { id: 150, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-161", sqft: 29732.00, rate: 436.03, value: 12964043.96 },
  { id: 151, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Tala Goenpa", plotId: "LT1-194", sqft: 15331.00, rate: 436.03, value: 6684775.93 },
  { id: 152, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Tala Goenpa", plotId: "LT1-262", sqft: 13615.00, rate: 436.03, value: 5936548.45 },
  { id: 153, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Tala Goenpa", plotId: "LT1-366", sqft: 8616.00, rate: 436.03, value: 3756834.48 },
  { id: 154, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-189", sqft: 4177.00, rate: 436.03, value: 1821297.31 },
  { id: 155, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Trashigang Goenpa", plotId: "LT1-213", sqft: 4617.00, rate: 436.03, value: 2013150.51 },
  { id: 156, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-190", sqft: 7118.00, rate: 436.03, value: 3103661.54 },
  { id: 157, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Trashigang Goenpa", plotId: "LT1-228", sqft: 4646.00, rate: 436.03, value: 2025795.38 },
  { id: 158, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-6", sqft: 6194.00, rate: 436.03, value: 2700769.82 },
  { id: 159, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Trashigang Goenpa", plotId: "LT1-414", sqft: 3281.00, rate: 436.03, value: 1430614.43 },
  { id: 160, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-192", sqft: 17344.00, rate: 436.03, value: 7562504.32 },
  { id: 161, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Yangtsi Dratshang", plotId: "LT1-221", sqft: 4955.00, rate: 436.03, value: 2160528.65 },
  { id: 162, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-193", sqft: 9771.00, rate: 436.03, value: 4260449.13 },
  { id: 163, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Dagana Rabdey", plotId: "LT1-234", sqft: 8053.00, rate: 436.03, value: 3511349.59 },
  { id: 164, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-198", sqft: 7312.00, rate: 436.03, value: 3188251.36 },
  { id: 165, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Dagana Rabdey", plotId: "LT1-256", sqft: 12698.00, rate: 436.03, value: 5536708.94 },
  { id: 166, thromde: "Thimphu", village: "Lungtenphu", dratshang: "Cheri Monastry", plotId: "LT1-263", sqft: 8672.00, rate: 436.03, value: 3781252.16 },
  { id: 167, thromde: "Thimphu", village: "Simtokha", dratshang: "Tala Goenpa", plotId: "SM1-363", sqft: 8324.00, rate: 466.49, value: 3883062.76 },
  { id: 168, thromde: "Thimphu", village: "Simtokha", dratshang: "Central Monk Body", plotId: "SM1-202", sqft: 18748.00, rate: 466.49, value: 8745754.52 },
  { id: 169, thromde: "Thimphu", village: "Simtokha", dratshang: "Central Monk Body", plotId: "SM1-949", sqft: 8227.00, rate: 466.49, value: 3837813.23 },
  { id: 170, thromde: "Thimphu", village: "Simtokha", dratshang: "Tala Goenpa", plotId: "SM1-247", sqft: 10769.00, rate: 466.49, value: 5023630.81 },
  { id: 171, thromde: "Thimphu", village: "Simtokha", dratshang: "Central Monk Body", plotId: "SM1-974", sqft: 3537.00, rate: 466.49, value: 1649975.13 },
  { id: 172, thromde: "Thimphu", village: "Simtokha", dratshang: "Tala Goenpa", plotId: "SM1-252", sqft: 9761.00, rate: 466.49, value: 4553408.89 },
  { id: 173, thromde: "Thimphu", village: "Simtokha", dratshang: "Tala Goenpa", plotId: "SM1-268", sqft: 6145.00, rate: 466.49, value: 2866581.05 },
  { id: 174, thromde: "Thimphu", village: "Simtokha", dratshang: "Tala Goenpa", plotId: "SM1-13", sqft: 25166.00, rate: 466.49, value: 11739687.34 },
  { id: 175, thromde: "Thimphu", village: "Simtokha", dratshang: "Cheri Monastry", plotId: "SM1-25", sqft: 32962.00, rate: 466.49, value: 15376443.38 },
  { id: 176, thromde: "Thimphu", village: "Simtokha", dratshang: "Wangdue Rabdey", plotId: "SM1-663", sqft: 23958.00, rate: 466.49, value: 11176167.42 },
  { id: 177, thromde: "Thimphu", village: "Simtokha", dratshang: "Trashigang Goenpa", plotId: "SM1-76", sqft: 8350.00, rate: 466.49, value: 3895191.50 },
  { id: 178, thromde: "Thimphu", village: "Simtokha", dratshang: "Trashigang Goenpa", plotId: "SM1-113", sqft: 8669.00, rate: 466.49, value: 4044001.81 },
  { id: 179, thromde: "Thimphu", village: "Simtokha", dratshang: "Central Monk Body", plotId: "SM1-78", sqft: 9680.00, rate: 466.49, value: 4515623.20 },
  { id: 180, thromde: "Thimphu", village: "Simtokha", dratshang: "Dodeydra Shedra", plotId: "SM1-199", sqft: 6195.00, rate: 466.49, value: 2889905.55 },
  { id: 181, thromde: "Thimphu", village: "Simtokha", dratshang: "Simtokha Shedra", plotId: "SM1-860", sqft: 67300.00, rate: 466.49, value: 31394777.00 },
  { id: 182, thromde: "Thimphu", village: "Simtokha", dratshang: "Trashigang Goenpa", plotId: "SM1-230", sqft: 12077.00, rate: 466.49, value: 5633799.73 },
  { id: 183, thromde: "Thimphu", village: "Simtokha", dratshang: "Trashigang Goenpa", plotId: "SM1-204", sqft: 17619.00, rate: 466.49, value: 8219087.31 },
  { id: 184, thromde: "Thimphu", village: "Simtokha", dratshang: "Wangdue Rabdey", plotId: "SM1-309", sqft: 4021.00, rate: 466.49, value: 1875756.29 },
  { id: 185, thromde: "Thimphu", village: "Simtokha", dratshang: "Phading Khangzang", plotId: "SM1-7", sqft: 8425.00, rate: 466.49, value: 3930178.25 },
  { id: 186, thromde: "Thimphu", village: "Simtokha", dratshang: "Wangdue Rabdey", plotId: "SM1-310", sqft: 4021.00, rate: 466.49, value: 1875756.29 },
  { id: 187, thromde: "Thimphu", village: "Simtokha", dratshang: "Central Monk Body", plotId: "SM1-8", sqft: 7602.00, rate: 466.49, value: 3546256.98 },
  { id: 188, thromde: "Thimphu", village: "Simtokha", dratshang: "Phading Khangzang", plotId: "SM1-348", sqft: 7330.00, rate: 466.49, value: 3419371.70 },
  { id: 189, thromde: "Thimphu", village: "Simtokha", dratshang: "Central Monk Body", plotId: "SM1-12", sqft: 26156.00, rate: 466.49, value: 12201512.44 },
  { id: 190, thromde: "Thimphu", village: "Taba", dratshang: "Gasa Rabdey", plotId: "TA1-387", sqft: 4672.00, rate: 432.7, value: 2021574.40 },
  { id: 191, thromde: "Thimphu", village: "Taba", dratshang: "Central Monk Body", plotId: "TA1-297", sqft: 4672.00, rate: 432.7, value: 2021574.40 },
  { id: 192, thromde: "Thimphu", village: "Zilukha", dratshang: "Chimithangka Lhakhang", plotId: "ZL1-82", sqft: 6510.00, rate: 372.11, value: 2422436.10 },
  { id: 193, thromde: "Thimphu", village: "Zilukha", dratshang: "Chimithangka Lhakhang", plotId: "ZL1-134", sqft: 4598.00, rate: 372.11, value: 1710961.78 },
  { id: 194, thromde: "Wangdue Phodrang", village: "Bajo", dratshang: "Wangdue Rabdey", plotId: "BJ1-602", sqft: 9161.00, rate: 137.3, value: 1257805.30 },
  { id: 195, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Gyeduen Dratshang Tawa", plotId: "PGT-1022", sqft: 7028.00, rate: 812.7, value: 5711655.60 },
  { id: 196, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4351", sqft: 7725.00, rate: 812.7, value: 6278107.50 },
  { id: 197, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-2915", sqft: 10886.00, rate: 812.7, value: 8847052.20 },
  { id: 198, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Pung-Thim Gyeduen Dratshang Kugyer", plotId: "PGT-1023", sqft: 20360.00, rate: 812.7, value: 16546572.00 },
  { id: 199, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4352", sqft: 19160.00, rate: 812.7, value: 15571332.00 },
  { id: 200, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", plotId: "PGT-2916", sqft: 77450.00, rate: 812.7, value: 62943615.00 },
  { id: 201, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", plotId: "PGT-2891", sqft: 18900.00, rate: 812.7, value: 15360030.00 },
  { id: 202, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4353", sqft: 64345.00, rate: 812.7, value: 52293181.50 },
  { id: 203, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", plotId: "PGT-2893", sqft: 16101.00, rate: 812.7, value: 13085282.70 },
  { id: 204, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4354", sqft: 60440.00, rate: 812.7, value: 49119588.00 },
  { id: 205, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4357", sqft: 17422.00, rate: 812.7, value: 14158859.40 },
  { id: 206, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", plotId: "PGT-2895", sqft: 30392.00, rate: 812.7, value: 24699578.40 },
  { id: 207, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4364", sqft: 42700.00, rate: 812.7, value: 34702290.00 },
  { id: 208, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4339", sqft: 35158.00, rate: 812.7, value: 28572906.60 },
  { id: 209, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4423", sqft: 7371.00, rate: 812.7, value: 5990411.70 },
  { id: 210, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4341", sqft: 63646.00, rate: 812.7, value: 51725104.20 },
  { id: 211, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Paro Rabdey", plotId: "PGT-108", sqft: 6665.00, rate: 812.7, value: 5416645.50 },
  { id: 212, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4342", sqft: 28447.00, rate: 812.7, value: 23118876.90 },
  { id: 213, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-2590", sqft: 31711.00, rate: 812.7, value: 25771529.70 },
  { id: 214, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4343", sqft: 35517.00, rate: 812.7, value: 28864665.90 },
  { id: 215, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Gyeduen Dratshang Tawa", plotId: "PGT-3073", sqft: 45143.00, rate: 812.7, value: 36687716.10 },
  { id: 216, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4344", sqft: 23304.00, rate: 812.7, value: 18939160.80 },
  { id: 217, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Gyeduen Dratshang Tawa", plotId: "PGT-3074", sqft: 29734.00, rate: 812.7, value: 24164821.80 },
  { id: 218, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4345", sqft: 56970.00, rate: 812.7, value: 46299519.00 },
  { id: 219, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4346", sqft: 13351.00, rate: 812.7, value: 10850357.70 },
  { id: 220, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-2222", sqft: 35579.00, rate: 812.7, value: 28915053.30 },
  { id: 221, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Gyeduen Dratshang Tawa", plotId: "PGT-3832", sqft: 16075.00, rate: 812.7, value: 13064152.50 },
  { id: 222, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4347", sqft: 57414.00, rate: 812.7, value: 46660357.80 },
  { id: 223, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", plotId: "PGT-2223", sqft: 97700.00, rate: 812.7, value: 79400790.00 },
  { id: 224, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Gyeduen Dratshang Tawa", plotId: "PGT-3833", sqft: 29797.00, rate: 812.7, value: 24216021.90 },
  { id: 225, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Trongsa Dratshang", plotId: "PGT-430", sqft: 2960.00, rate: 812.7, value: 2405592.00 },
  { id: 226, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4348", sqft: 28237.00, rate: 812.7, value: 22948209.90 },
  { id: 227, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", plotId: "PGT-2224", sqft: 8453.00, rate: 812.7, value: 6869753.10 },
  { id: 228, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Druk Phodrangding", plotId: "PGT-73", sqft: 6898.00, rate: 812.7, value: 5606004.60 },
  { id: 229, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4349", sqft: 16146.00, rate: 812.7, value: 13121854.20 },
  { id: 230, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", plotId: "PGT-2225", sqft: 53220.00, rate: 812.7, value: 43251894.00 },
  { id: 231, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Un-identified Owner", plotId: "PGT-4350", sqft: 13316.00, rate: 812.7, value: 10821913.20 },
  { id: 232, thromde: "Phuentsholing", village: "Phuentsholing", dratshang: "Tango Monastry", plotId: "PGT-2914", sqft: 87982.00, rate: 812.7, value: 71502971.40 },
];

const dratshangSummary = [
  { name: "Central Monk Body", landValue: 564275586.31, buildingValue: 63968611.66, shareValue: 332314140.00, total: 960558337.97, pct: 29.73 },
  { name: "Cheri Monastry", landValue: 325206071.98, buildingValue: 73975434.83, shareValue: 1423650.00, total: 400605156.81, pct: 12.40 },
  { name: "Tango Monastry", landValue: 366322663.40, buildingValue: 10691457.94, shareValue: 382420.00, total: 377396541.34, pct: 11.68 },
  { name: "Un-identified Owner", landValue: 543570331.50, buildingValue: 0.00, shareValue: 0.00, total: 543570331.50, pct: 16.82 },
  { name: "Dodeydra Shedra", landValue: 243878398.59, buildingValue: 14303485.72, shareValue: 286769.70, total: 258468654.01, pct: 8.00 },
  { name: "Gyeduen Dratshang Tawa", landValue: 115492504.83, buildingValue: 0.00, shareValue: 0.00, total: 115492504.83, pct: 3.57 },
  { name: "Tala Goenpa", landValue: 92882963.54, buildingValue: 14572421.45, shareValue: 0.00, total: 107455384.99, pct: 3.33 },
  { name: "Phading Khangzang", landValue: 83308531.05, buildingValue: 10254949.10, shareValue: 0.00, total: 93563480.15, pct: 2.90 },
  { name: "Simtokha Shedra", landValue: 38029474.64, buildingValue: 33347119.40, shareValue: 1228500.00, total: 72605094.04, pct: 2.25 },
  { name: "Trashigang Goenpa", landValue: 42413061.48, buildingValue: 21495620.88, shareValue: 0.00, total: 63908682.36, pct: 1.98 },
  { name: "Wangdue Rabdey", landValue: 16185485.30, buildingValue: 11176167.42, shareValue: 13175950.00, total: 40537602.72, pct: 1.25 },
  { name: "Pung-Thim Gyeduen Dratshang Kugyer", landValue: 16546572.00, buildingValue: 16546572.00, shareValue: 0.00, total: 33093144.00, pct: 1.02 },
  { name: "Rabdey Dratshang", landValue: 0.00, buildingValue: 0.00, shareValue: 24517170.00, total: 24517170.00, pct: 0.76 },
  { name: "Barp Lhakhang", landValue: 22706978.04, buildingValue: 2289750.96, shareValue: 0.00, total: 24996729.00, pct: 0.77 },
  { name: "Paro Rabdey", landValue: 9969066.40, buildingValue: 9969066.40, shareValue: 5079350.00, total: 25017482.80, pct: 0.77 },
  { name: "Trongsa Dratshang", landValue: 2405592.00, buildingValue: 0.00, shareValue: 12679290.00, total: 15084882.00, pct: 0.47 },
  { name: "Dagana Rabdey", landValue: 9048058.53, buildingValue: 0.00, shareValue: 2925000.00, total: 11973058.53, pct: 0.37 },
  { name: "Astrologer Institute", landValue: 0.00, buildingValue: 5606004.60, shareValue: 3960.00, total: 5609964.60, pct: 0.17 },
  { name: "Druk Phodrangding", landValue: 5606004.60, buildingValue: 0.00, shareValue: 0.00, total: 5606004.60, pct: 0.17 },
  { name: "Dechenphodrang Kugyer", landValue: 4732301.64, buildingValue: 4732301.64, shareValue: 0.00, total: 9464603.28, pct: 0.29 },
  { name: "Danang Goenpa", landValue: 6395306.00, buildingValue: 0.00, shareValue: 0.00, total: 6395306.00, pct: 0.20 },
  { name: "Gasa Rabdey", landValue: 2021574.40, buildingValue: 2021574.40, shareValue: 5280.00, total: 4048428.80, pct: 0.13 },
  { name: "Chimithangka Lhakhang", landValue: 4133397.88, buildingValue: 0.00, shareValue: 0.00, total: 4133397.88, pct: 0.13 },
  { name: "Yangtsi Dratshang", landValue: 2160528.65, buildingValue: 2160528.65, shareValue: 283500.00, total: 4604557.30, pct: 0.14 },
  { name: "Talo Tsuk Lhakhang", landValue: 2287716.34, buildingValue: 0.00, shareValue: 0.00, total: 2287716.34, pct: 0.07 },
  { name: "Choetse Rabdey Dratshang", landValue: 1730800.00, buildingValue: 1730800.00, shareValue: 171800.00, total: 3633400.00, pct: 0.11 },
  { name: "Haa Rabdey", landValue: 0.00, buildingValue: 0.00, shareValue: 492950.00, total: 492950.00, pct: 0.02 },
  { name: "Chukha Rabdey", landValue: 0.00, buildingValue: 0.00, shareValue: 3069150.00, total: 3069150.00, pct: 0.09 },
  { name: "Wangdue Bajo", landValue: 1257805.30, buildingValue: 0.00, shareValue: 0.00, total: 1257805.30, pct: 0.04 },
  { name: "Shalipangkha Goenpa", landValue: 0.00, buildingValue: 0.00, shareValue: 3086350.00, total: 3086350.00, pct: 0.10 },
  { name: "Khothang Rinchenling", landValue: 0.00, buildingValue: 0.00, shareValue: 1028100.00, total: 1028100.00, pct: 0.03 },
  { name: "Zhemgang Rabdey", landValue: 0.00, buildingValue: 0.00, shareValue: 860000.00, total: 860000.00, pct: 0.03 },
];

const thromdeStats = [
  { thromde: "Thimphu", plots: 185, totalValue: 1851471098.88 },
  { thromde: "Phuentsholing", plots: 38, totalValue: 617859357.90 },
  { thromde: "Punakha", plots: 7, totalValue: 13935873.11 },
  { thromde: "Paro", plots: 1, totalValue: 845943.60 },
  { thromde: "Wangdue Phodrang", plots: 1, totalValue: 1257805.30 },
];

const COLORS = ["#d4a853", "#c8693a", "#7a4f8a", "#2d7d9a", "#4a9e6b", "#e05c5c", "#5c8ee0", "#e0c55c", "#8e5ce0", "#5ce0b5", "#e08e5c", "#5ce0d8", "#ff6b9d", "#c44569"];
const GRAND_TOTAL = 3231196298.35;
const TOTAL_LAND = 2521308969.10;
const TOTAL_BUILDING = 298841867.05;
const TOTAL_SHARES = 411012692.20;

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
                { label: "  └ % of Grand Total", value: `${((TOTAL_LAND / GRAND_TOTAL) * 100).toFixed(4)}%`, sub: true },
                { label: "Total Building Value", value: fmtFull(TOTAL_BUILDING) },
                { label: "  └ % of Grand Total", value: `${((TOTAL_BUILDING / GRAND_TOTAL) * 100).toFixed(4)}%`, sub: true },
                { label: "Total Share Value", value: fmtFull(TOTAL_SHARES) },
                { label: "  └ % of Grand Total", value: `${((TOTAL_SHARES / GRAND_TOTAL) * 100).toFixed(4)}%`, sub: true },
                { label: "Number of Land Plots", value: "232" },
                { label: "Number of Buildings", value: "63 Registered" },
                { label: "Total Share Entries", value: "18,943,125 Shares" },
                { label: "Total Land Area (sqft)", value: "4,724,725.00 sqft" },
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
        <span style={{ fontWeight: 600 }}>Grand Total: {fmtFull(GRAND_TOTAL)} · 232 Plots · 63 Registered Buildings</span>
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