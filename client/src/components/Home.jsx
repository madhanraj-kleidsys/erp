import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  Option,
  Grid,
  LinearProgress,
  Chip,
  FormControl,
  FormLabel,
  Autocomplete,
  IconButton,
  Drawer,
  Divider,
  Sheet,
  Table,
} from "@mui/joy";
import {
  FilterList,
  CalendarMonth,
  BusinessCenter,
  Category,
  Assessment,
  CheckCircle,
  Close,
  TrendingUp,
  Inventory,
  ContentCut,
  Print,
  NotificationImportant,
  ErrorOutline, Warning,
} from "@mui/icons-material";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Header from "./Header";
import Sidebar from "./Sidebar";
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#e3f2fd",
          500: "#2196f3",
          600: "#1976d2",
        },
      },
    },
  },
});

const customers = [
  "H&M HENNES & MAURITZ GBC AB",
  "VINGINO",
  "GROUPE AUCHAN",
  "MAX HOLDINGS - INVESTMENTS LTD",
  "KMART AUSTRALIA LIMITED",
];
// const stylesByCustomer = {
//   "H&M HENNES & MAURITZ GBC AB": ["Basic T-Shirt", "Denim Jacket", "Summer Dress", "Casual Pants"],
//   "VINGINO": ["Polo Shirt", "Cargo Pants", "Hoodie", "Jeans"],
//   "GROUPE AUCHAN": ["Formal Shirt", "Blazer", "Trousers", "Skirt"],
//   "MAX HOLDINGS - INVESTMENTS LTD": [
//     "Designer Top",
//     "Premium Jeans",
//     "Silk Scarf",
//     "Leather Jacket",
//   ],
//   "KMART AUSTRALIA LIMITED": [
//     "Kids T-Shirt",
//     "School Uniform",
//     "Baby Onesie",
//     "Sports Wear",
//   ],
// };
const stylesByCustomer = {
  "H&M HENNES & MAURITZ GBC AB": [
    "ASTERTANK",
    "AZURLSTOP",
    "BELLATEE",
    "BERTILSSKB5PACK",
    "BOSSTOP",
    "CHARLIETEE",
    "CILLA",
    "CILLALSTEE",
    "DF",
    "EQDD",
    "EQLICMINDYLSTEE",
    "EQLICPALMITA3PACK",
    "EQMARSTEE",
    "EQPANDORATEE",
    "EQSUETEE",
    "EQVALERIETOP",
    "GSRT",
    "JAML",
    "JOANNA",
    "JUNELSTOP",
    "LICBEATRIZDRESS",
    "LICMARSTEE",
    "LICPALMITA3PACK",
    "LICPIPERLSTOP",
    "LICSOFIADRESS",
    "LICSUSANTEE",
    "LOLACETANK",
    "LOTTIETEE",
    "MANTATUBETOP",
    "MARSTEE",
    "MIA",
    "MIALSTSHIRT",
    "MISTLSTOP",
    "MOLLYLSTOP",
    "PENELOPEPRINTEDTEE",
    "RNRGTS",
    "SABRINALONGSLEEVE",
    "SUELOWPRICETEE",
    "TOB3PACK",
    "TPBSSSB"
  ],
  "VINGINO": [
    "BOYSTANK2PACK"
  ],
  "GROUPE AUCHAN": [
    "S26WKNTEE0009",
    "S26WKNTEE0031"
  ],
  "MAX HOLDINGS - INVESTMENTS LTD": [
    "1203B",
    "1204B",
    "1217B",
    "1217BB",
    "1219B",
    "1276B",
    "B25KGOBCTT158",
    "B25KGOBCTT173",
    "B25KGOBCTT174",
    "B25KGOFSTOP385",
    "B25WBSBC1211",
    "B25WBSBC1414",
    "B25WCTFEKT126J",
    "B26KGOBCTT17",
    "B26KGOBCTT18",
    "B26KGOBCTT76",
    "B26KGOBCTT77",
    "B26KGOBCTT95",
    "B26KGOBCTT97",
    "B26KGOBCTT98",
    "B26KGOFSBOT290",
    "B26KGOFSCHTOP2038",
    "B26KGOFSCHTOP2039",
    "B26KGOFSSET783",
    "B26KGOFSTOP290",
    "B26KGYBCTGTDTR133",
    "B26WBSBC1203",
    "B26WBSBC1204",
    "B26WBSBC1211",
    "B26WBSBC1212",
    "B26WBSBC1217",
    "B26WBSBC1513",
    "B26WBSBC1801",
    "B26WMFEECOM116",
    "B26WMFEECOM156",
    "BSLEG",
    "C24WBSBCECOM1219",
    "C25KGOBCCHTOP1007",
    "C25KGOBCLEG422",
    "C25KGOBCTT24",
    "C25KGOBCTT31",
    "C25KGOBCTT35",
    "C25KGOBCTT39",
    "C25KGOBCTT42",
    "C25KGOBCTT51",
    "C25KGOBCTT58",
    "C25KGOBCTT59",
    "C25KGOBCTT60",
    "C25KGOFSCHDR2025",
    "C25KGOFSCHTOP2027",
    "C25KGOFSCHTOP2028",
    "C25KGOFSCHTOP2037",
    "C25KGOFSCHTOP2129",
    "C25KGOFSCHTOP2130",
    "C25KGOFSCHTOP2134",
    "C25KGOFSTOP211",
    "C25KGOFSTOP212",
    "C25KGOFSTOP217",
    "C25KGOFSTOP232",
    "C25KGOFSTOP272",
    "C25KGOFSTOP297EX",
    "C25KGOFSTOP322",
    "C25KGYBCTGT232",
    "C25KGYBCTGT233",
    "C25KGYBCTGT296",
    "C25KGYBCTGT299",
    "C25KGYBCTGT306",
    "C25KGYBCTGT307",
    "C25KGYBCTGT341A",
    "C25KGYBCTGT386",
    "C25KGYBCTGT387",
    "C25KGYBCTGT401",
    "C25KGYBCTGT418",
    "C25KGYBCTGT445EEX",
    "C25KGYFETGC218",
    "C25KGYFETGC219",
    "C25KGYFETGC220",
    "C25KGYFETGC222",
    "C25KGYFETGC239",
    "C25KGYFETGC241",
    "C25KGYFETGC242",
    "C25KGYFETGC298",
    "C25KGYFETGC437",
    "C25KGYFETGC439EEX",
    "C25KGYFETGCDTR222",
    "C25KGYFETGCDTR436",
    "C25WBSBC1203",
    "C25WBSBC1204",
    "C25WBSBC1211",
    "C25WBSBC1212",
    "C25WBSBC1217",
    "C25WBSBC1414B",
    "C25WBSBC1513",
    "C25WBSBC1801",
    "C25WBSBCTR1217",
    "C25WBSBCTR3014",
    "C25WBSBCTR3016",
    "C25WCTFEKT127A",
    "C25WCTFEKT127B",
    "C25WCTFEKT127C",
    "C25WCTFEKT127G",
    "C25WCTFEKT127H",
    "C25WCTFEKT127I",
    "C25WCTFEKT127L",
    "C25WCTFEKT127R",
    "C25WCTFEKT127U",
    "C25WCTFEKT127V",
    "C25WCTFEKT128B",
    "C25WCTFEKT128D",
    "C25WCTFEKT128G",
    "C25WCTFEKT128L",
    "C25WCTFEKT128M",
    "C25WCTFEKT128N",
    "C25WCTFEKT128P",
    "C25WCTFEKT129B",
    "C25WCTFEKT129E",
    "C25WCTFEKTRT120",
    "C25WCTFEKTRT120D",
    "C25WCTFEKTRT120L",
    "C25WCTFEKTRT120P",
    "C25WCTFEKTRT120Q",
    "C25WCTFEKTRT120U",
    "C25WCTFEKTRT120X",
    "C25WCTFEKTRT120Y",
    "C25WCTFEKTRT121N",
    "C25WMFEECOM115",
    "C25WMFEECOM116",
    "C25WMFEECOM117",
    "C25WMFEECOM155",
    "C25WUBNFEOMV403",
    "C25WUBNFEOMV404",
    "C25WUBNFEOMV416",
    "C25WUBNFEOMV417",
    "C25WUBNFETRI406",
    "C25WUBNFETRI407",
    "C25WUBNFETRI412",
    "C25WUBNFETRI413",
    "C25WUBNFETRI414",
    "C25WUBNFETRI415",
    "C25WUBNFETRI416",
    "C25WUBNFSATE400",
    "C25WUBNFSATE403",
    "C25WUBNFSATE404",
    "C25WUBNFSATE405",
    "C25WUBNFSATE406",
    "C25WUBNFSECOM201",
    "C25WUBNFSECOM202",
    "LDCS",
    "TGTNOOSLEGGING"
  ],
  "KMART AUSTRALIA LIMITED": [
    "026NS26LSL014",
    "06NS26DPL080",
    "06NS26DPL102",
    "06NS26DPL325",
    "06NS26DPL485",
    "06NS26DPL705",
    "06NS26LSL372",
    "06NS26LSL397",
    "06NS26SSH768",
    "06NS26SSS033",
    "06NS26SSS168",
    "06NS26SSS196",
    "06NS26SSS2146",
    "06NS26SSS290",
    "06NSTSKA7393",
    "06S24KSS001",
    "06S26DPL102",
    "06W24LEG009",
    "08NS25SSS191",
    "08NS26SSS146",
    "08NS26SSS162",
    "08NS26SSS282",
    "08NS26SSS513",
    "08NS26SSS685",
    "08NSTSKTDJ10",
    "08S24KSS001",
    "26NS26SSS790",
    "26NSTLKXPWIY"
  ]
};


const processes = [
  "All",
  "Sourcing",
  "Fabric Store",
  "Cutting",
  "VAP / Printing",
];
const statuses = ["On-time", "Delayed", "Risk"];

const mockDataByFilters = {
  "H&M": {
    "On-time": {
      kpi: { totalOrders: 245, fullOnRisk: 15, delayedOrders: 8, atRisk: 12 },
      processes: [
        { name: "Sourcing", progress: 85, status: "on-track", orders: 45, risk: 4 },
        { name: "Fabric Store", progress: 72, status: "on-track", orders: 34, risk: 6 },
        { name: "Cutting", progress: 55, status: "warning", orders: 25, risk: 9 },
        { name: "VAP / Printing", progress: 48, status: "warning", orders: 20, risk: 11 },
      ],
      riskAlerts: [
        { customer: "H&M", delivery: "W34", action: "Escalate PO" },
        { customer: "WALMART", delivery: "W35", action: "Follow up mill" },
        { customer: "GROUPE AUCHAN", delivery: "W36", action: "Check fabric" },
      ]
    },
    Delayed: {
      kpi: { totalOrders: 180, fullOnRisk: 25, delayedOrders: 18, atRisk: 22 },
      processes: [
        { name: "Sourcing", progress: 65, status: "warning", orders: 32, risk: 8 },
        { name: "Fabric Store", progress: 45, status: "critical", orders: 28, risk: 12 },
        { name: "Cutting", progress: 30, status: "critical", orders: 18, risk: 15 },
        { name: "VAP / Printing", progress: 25, status: "critical", orders: 12, risk: 18 },
      ],
      riskAlerts: [
        { customer: "H&M", delivery: "W33", action: "Urgent review" },
        { customer: "WALMART", delivery: "W34", action: "Expedite fabric" },
        { customer: "MAX HOLDINGS", delivery: "W35", action: "Call supplier" },
        { customer: "KMART AUSTRALIA", delivery: "W36", action: "Schedule meeting" },
      ]
    },
    Risk: {
      kpi: { totalOrders: 120, fullOnRisk: 45, delayedOrders: 35, atRisk: 40 },
      processes: [
        { name: "Sourcing", progress: 40, status: "critical", orders: 20, risk: 15 },
        { name: "Fabric Store", progress: 25, status: "critical", orders: 15, risk: 20 },
        { name: "Cutting", progress: 15, status: "critical", orders: 8, risk: 25 },
        { name: "VAP / Printing", progress: 10, status: "critical", orders: 5, risk: 30 },
      ],
      riskAlerts: [
        { customer: "H&M", delivery: "W32", action: "Critical escalation" },
        { customer: "WALMART", delivery: "W33", action: "Emergency order" },
        { customer: "GROUPE AUCHAN", delivery: "W34", action: "Management review" },
        { customer: "MAX HOLDINGS", delivery: "W34", action: "Rework plan" },
        { customer: "KMART AUSTRALIA", delivery: "W35", action: "Alternative source" },
      ]
    }
  },
  WALMART: {
    "On-time": {
      kpi: { totalOrders: 320, fullOnRisk: 12, delayedOrders: 5, atRisk: 8 },
      processes: [
        { name: "Sourcing", progress: 90, status: "on-track", orders: 65, risk: 2 },
        { name: "Fabric Store", progress: 85, status: "on-track", orders: 52, risk: 3 },
        { name: "Cutting", progress: 78, status: "on-track", orders: 38, risk: 5 },
        { name: "VAP / Printing", progress: 72, status: "warning", orders: 28, risk: 8 },
      ],
      riskAlerts: [
        { customer: "WALMART", delivery: "W36", action: "Monitor progress" },
        { customer: "H&M", delivery: "W37", action: "Quality check" },
      ]
    },
    Delayed: {
      kpi: { totalOrders: 280, fullOnRisk: 20, delayedOrders: 15, atRisk: 18 },
      processes: [
        { name: "Sourcing", progress: 70, status: "warning", orders: 48, risk: 7 },
        { name: "Fabric Store", progress: 60, status: "warning", orders: 42, risk: 10 },
        { name: "Cutting", progress: 45, status: "critical", orders: 28, risk: 13 },
        { name: "VAP / Printing", progress: 35, status: "critical", orders: 20, risk: 16 },
      ],
      riskAlerts: [
        { customer: "WALMART", delivery: "W34", action: "Speed up cutting" },
        { customer: "GROUPE AUCHAN", delivery: "W35", action: "Add resources" },
        { customer: "KMART AUSTRALIA", delivery: "W36", action: "Overtime approval" },
      ]
    },
    Risk: {
      kpi: { totalOrders: 200, fullOnRisk: 35, delayedOrders: 28, atRisk: 32 },
      processes: [
        { name: "Sourcing", progress: 50, status: "critical", orders: 35, risk: 12 },
        { name: "Fabric Store", progress: 35, status: "critical", orders: 25, risk: 18 },
        { name: "Cutting", progress: 25, status: "critical", orders: 18, risk: 22 },
        { name: "VAP / Printing", progress: 20, status: "critical", orders: 12, risk: 28 },
      ],
      riskAlerts: [
        { customer: "WALMART", delivery: "W32", action: "Emergency protocol" },
        { customer: "H&M", delivery: "W33", action: "CEO notification" },
        { customer: "MAX HOLDINGS", delivery: "W34", action: "Contract review" },
        { customer: "GROUPE AUCHAN", delivery: "W34", action: "Penalty waiver" },
      ]
    }
  }
};

const generateWeeks = () => {
  const weeks = [];
  for (let i = 1; i <= 52; i++) {
    weeks.push(`${i.toString().padStart(2, "0")}`);
  }
  return weeks;
};

const getCurrentWeek = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const week = Math.floor(diff / oneWeek);
  return `W${week.toString().padStart(2, "0")}`;
};

const getWeekDateRange = (week) => {
  const weekNum = parseInt(week.substring(1));
  const year = new Date().getFullYear();
  const startDate = new Date(year, 0, 1 + (weekNum - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const options = { month: "short", day: "numeric" };
  return `${startDate.toLocaleDateString(
    "en-US",
    options
  )} - ${endDate.toLocaleDateString("en-US", options)}, ${year}`;
};

const calculateFocusWeek = (baseWeek, offset) => {
  const weekNum = parseInt(baseWeek.substring(1));
  const newWeek = weekNum + offset;
  return `W${newWeek.toString().padStart(2, "0")}`;
};

const getProcessIcon = (name) => {
  switch (name) {
    case "Sourcing":
      return <TrendingUp sx={{ fontSize: 28, color: "#1fc87e" }} />;
    case "Fabric Store":
      return <Inventory sx={{ fontSize: 28, color: "#1c80fe" }} />;
    case "Cutting":
      return <ContentCut sx={{ fontSize: 28, color: "#ff9800" }} />;
    case "VAP / Printing":
      return <Print sx={{ fontSize: 28, color: "#f44336" }} />;
    default:
      return <Assessment sx={{ fontSize: 28, color: "#475569" }} />;
  }
};

const getLinearBarColor = (percent) => {
  if (percent < 50) return '#ef4444'; // red for <50%
  if (percent >= 50 && percent <= 60) return '#f59e0b'; // yellow
  return '#10b981'; // green for >60%
};


const getProcessIconOg = (name) => {
  switch (name) {
    case "Sourcing":
      return <TrendingUp sx={{ fontSize: 28, color: "#ffffffff" }} />;
    case "Fabric Store":
      return <Inventory sx={{ fontSize: 28, color: "#ffffffff" }} />;
    case "Cutting":
      return <ContentCut sx={{ fontSize: 28, color: "#ffffffff" }} />;
    case "VAP / Printing":
      return <Print sx={{ fontSize: 28, color: "#ffffffff" }} />;
    default:
      return <Assessment sx={{ fontSize: 28, color: "#ffffffff" }} />;
  }
}

const getProcessColor = (name) => {
  switch (name) {
    case "Sourcing":
      return { primary: "#1fc87e", secondary: "#0cba6b", text: "#065f3e" };
    case "Fabric Store":
      return { primary: "#1c80fe", secondary: "#0066cc", text: "#003d7a" };
    case "Cutting":
      return { primary: "#ff9800", secondary: "#f57c00", text: "#e65100" };
    case "VAP / Printing":
      return { primary: "#f44336", secondary: "#d32f2f", text: "#b71c1c" };
    default:
      return { primary: "#475569", secondary: "#334155", text: "#1e293b" };
  }
};

const getProgressColor = (name) => {
  switch (name) {
    case "Sourcing":
      return "#1fc87e";
    case "Fabric Store":
      return "#1c80fe";
    case "Cutting":
      return "#ff9800";
    case "VAP / Printing":
      return "#f44336";
    default:
      return "#475569";
  }
};

const getStatusConfig = (status) => {
  switch (status) {
    case "on-track":
      return {
        color: "#10b981",
        bgColor: "#ecfdf5",
        borderColor: "#10b981",
        cardBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        label: "On Track",
      };
    case "warning":
      return {
        color: "#f59e0b",
        bgColor: "#fffbeb",
        borderColor: "#f59e0b",
        cardBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        label: "At Risk",
      };
    case "critical":
      return {
        color: "#ef4444",
        bgColor: "#fef2f2",
        borderColor: "#ef4444",
        cardBg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        label: "Critical",
      };
    default:
      return {
        color: "#6b7280",
        bgColor: "#f9fafb",
        borderColor: "#6b7280",
        cardBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        label: "Unknown",
      };
  }
};

const RiskBadge = ({ count, color }) => (
  <Box
    sx={{
      position: "absolute",
      top: 12,
      right: 12,
      minWidth: 32,
      height: 32,
      borderRadius: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: 1,
      fontSize: "0.875rem",
      fontWeight: 700,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      animation: "pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "@keyframes pulseRing": {
        "0%, 100%": {
          transform: "scale(1)",
        },
        "50%": {
          transform: "scale(1.05)",
        },
      },
    }}
  >
    {count}
  </Box>
);

const ProductionDashboard = () => {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  // const [selectedStyle, setSelectedStyle] = useState(
  //   stylesByCustomer[customers[0]][0]
  // );
   const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedProcess, setSelectedProcess] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("On-time");
  const [weekSearch, setWeekSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

    const [totalOrders, setTotalOrders] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);

  const weeks = generateWeeks();

  useEffect(() => {
    setSelectedStyle(stylesByCustomer[selectedCustomer][0]);
  }, [selectedCustomer]);

    useEffect(() => {
    async function fetchDashboardData() {
      if (!selectedStyle) return;

      try {
        const weekNum = parseInt(selectedWeek.substring(1));
        
        const response = await axios.post(`${apiUrl}/homedashboard`, {
          Buyer: selectedCustomer,
          WeekNo: weekNum,
          StyleCode: selectedStyle,
        });

        if (response.data.success) {
          setDashboardData(response.data.data);
          setTotalOrders(response.data.totalOrders);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchDashboardData();
  }, [selectedWeek, selectedCustomer, selectedStyle]);


  const filteredWeeks = weeks.filter((week) =>
    week.toLowerCase().includes(weekSearch.toLowerCase())
  );

  const getCurrentData = () => {
    const customerData =
      mockDataByFilters[selectedCustomer] || mockDataByFilters["H&M"];
    const statusData = customerData[selectedStatus] || customerData["On-time"];
    return statusData;
  };

  const currentData = getCurrentData();

  const getPlanningWeeks = () => {
    const weekNum = parseInt(selectedWeek.substring(1));
    return {
      sourcing: {
        focus: `W${(weekNum + 4).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 3).toString().padStart(2, "0")}`,
      },
      fabricStore: {
        focus: `W${(weekNum + 3).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 3).toString().padStart(2, "0")}`,
      },
      cutting: {
        focus: `W${(weekNum + 2).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 2).toString().padStart(2, "0")}`,
      },
      vapPrinting: {
        focus: `W${(weekNum + 2).toString().padStart(2, '0')}`,
        planning: `W${(weekNum + 2).toString().padStart(2, '0')}`,
      }
    };
  };

  const planningWeeks = getPlanningWeeks();

  const getVisibleProcesses = () => {
    if (selectedProcess === "All") {
      return ["Sourcing", "Fabric Store", "Cutting", "VAP / Printing"];
    }
    return [selectedProcess];
  };


  const handleCardClick = (processRoute) => {
    navigate(processRoute, { state: { selectedWeek } });
  };

  //RISK DASH ROUTES ROUTER --->
  const handleClickRoute = (processRoute) => {
    navigate(processRoute);
  };

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "white" }}>
        <Sidebar />
        {/* <Box sx={{ flexGrow: 1, p: 1, overflowY: "auto" }}> */}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Header />
          {/* <Box
            component="main"
            className="MainContent"
            sx={{
              pt: {
                xs: "calc(12px + var(--Header-height))",
                sm: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: { xs: 2, sm: 2, md: 1 },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              gap: 1,
            }}
          > */}
          <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
            {/* <Box
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 110,
                  p: { xs: 1, sm: 2, md: 3 },
                  borderRadius: '22px',
                  background: "#10b4f0ff",
                  color: "white",
                  p: 3,
                  boxShadow: "0 4px 20px rgba(8, 179, 241, 0.3)",
                  position: "relative",
                }}
              > */}
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 110,
                p: { xs: 1, sm: 1, md: 2 },
                borderRadius: "16px",
                display: "flex", background: "#10b4f0ff",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={() => setFilterOpen(!filterOpen)}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#eff6ff",
                    "&:hover": { backgroundColor: "#eff6ff" },
                  }}
                >
                  <FilterList />
                </IconButton>
                <Typography
                  level="h3"
                  sx={{ fontWeight: "bold", color: "#ffffffff" }}
                >
                  4 - Week Production Planning Dashboard
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right", mr: 5 }}>
                <Typography level="body-lg" sx={{ color: "#ffffffff" }}>
                  Selected Week : {selectedWeek}
                </Typography>
                <Typography level="body-sm" sx={{ color: "#ffffffff" }}>
                  {getWeekDateRange(selectedWeek)}
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ color: "#ffffffff", mt: 0.5 }}
                >
                  {selectedCustomer} | {selectedStyle} | {selectedStatus}
                </Typography>
              </Box>
            </Box>

            {/* </Box> */}
            {/* Filter Drawer */}
            {/* <Drawer
              anchor="right"
              open={filterOpen}
              onClose={() => setFilterOpen(false)}
              slotProps={{
                backdrop: {
                  sx: {
                    backdropFilter: "none !important",
                    background: "rgba(0,0,0,0.12)",
                  },
                },
                content: {
                  sx: {
                    width: 280,
                    backgroundColor: "white", zIndex: 600,
                  },
                },
              }}
            >
 

              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    level="h4"
                    sx={{ color: "#0f172a", fontWeight: 700 }}
                  >
                    Filters
                  </Typography>
                  <IconButton
                    variant="plain"
                    color="neutral"
                    onClick={() => setFilterOpen(false)}
                    sx={{ borderRadius: "8px" }}
                  >
                    <Close />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <CalendarMonth sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Calendar Week
                  </FormLabel>
                  <Autocomplete
                    placeholder="Search week..."
                    options={filteredWeeks}
                    value={selectedWeek}
                    onChange={(event, newValue) =>
                      newValue && setSelectedWeek(newValue)
                    }
                    onInputChange={(event, newValue) =>
                      setWeekSearch(newValue)
                    }
                    sx={{ "& input": { fontSize: "0.875rem" } }}
                  />
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <BusinessCenter sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Customer
                  </FormLabel>
                  <Select
                    value={selectedCustomer}
                    onChange={(event, newValue) =>
                      setSelectedCustomer(newValue)
                    }
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {customers.map((customer) => (
                      <Option key={customer} value={customer}>
                        {customer}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <Category sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Style/Article
                  </FormLabel>
                  <Select
                    value={selectedStyle}
                    onChange={(event, newValue) => setSelectedStyle(newValue)}
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {stylesByCustomer[selectedCustomer].map((style) => (
                      <Option key={style} value={style}>
                        {style}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <Assessment sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Process
                  </FormLabel>
                  <Select
                    value={selectedProcess}
                    onChange={(event, newValue) =>
                      setSelectedProcess(newValue)
                    }
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {processes.map((process) => (
                      <Option key={process} value={process}>
                        {process}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Status
                  </FormLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(event, newValue) =>
                      setSelectedStatus(newValue)
                    }
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {statuses.map((status) => (
                      <Option key={status} value={status}>
                        {status}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Drawer> */}

            <Drawer
              anchor="right"
              open={filterOpen}
              onClose={() => setFilterOpen(false)}
              slotProps={{
                backdrop: {
                  sx: {
                    backdropFilter: "none !important",
                    background: "rgba(0,0,0,0.12)",
                  },
                },
                content: {
                  sx: {
                    width: 280,
                    backgroundColor: "white",
                    zIndex: 600,
                  },
                },
              }}
            >
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    level="h4"
                    sx={{ color: "#0f172a", fontWeight: 700 }}
                  >
                    Filters
                  </Typography>
                  <IconButton
                    variant="plain"
                    color="neutral"
                    onClick={() => setFilterOpen(false)}
                    sx={{ borderRadius: "8px" }}
                  >
                    <Close />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Week Filter */}
                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <CalendarMonth sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Calendar Week
                  </FormLabel>
                  <Autocomplete
                    placeholder="Search week..."
                    options={filteredWeeks}
                    value={selectedWeek}
                    onChange={(event, newValue) =>
                      newValue && setSelectedWeek(newValue)
                    }
                    onInputChange={(event, newValue) =>
                      setWeekSearch(newValue)
                    }
                    sx={{ "& input": { fontSize: "0.875rem" } }}
                  />
                </FormControl>

                {/* Customer Filter */}
                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <BusinessCenter sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Customer
                  </FormLabel>
                  <Select
                    value={selectedCustomer}
                    onChange={(event, newValue) =>
                      setSelectedCustomer(newValue)
                    }
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {customers.map((customer) => (
                      <Option key={customer} value={customer}>
                        {customer}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                {/* Style Filter - Dynamically Loaded */}
                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <Category sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Style/Article
                  </FormLabel>
                  <Select
                    value={selectedStyle}
                    onChange={(event, newValue) => setSelectedStyle(newValue)}
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {(stylesByCustomer[selectedCustomer] || []).map((style) => (
                      <Option key={style} value={style}>
                        {style}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                {/* Process Filter */}
                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <Assessment sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Process
                  </FormLabel>
                  <Select
                    value={selectedProcess}
                    onChange={(event, newValue) =>
                      setSelectedProcess(newValue)
                    }
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {processes.map((process) => (
                      <Option key={process} value={process}>
                        {process}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                {/* Status Filter */}
                <FormControl>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Status
                  </FormLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(event, newValue) =>
                      setSelectedStatus(newValue)
                    }
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {statuses.map((status) => (
                      <Option key={status} value={status}>
                        {status}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Drawer>

            <Box sx={{ p: { xs: 2, md: 2 } }}>
              {/* KPI Cards - Colorful Style */}
              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      background: "linear-gradient(135deg, #1fc87e 0%, #0cba6b 100%)", // Rich ERP green gradient
                      color: "white",
                      boxShadow: "0 10px 25px rgba(35, 179, 120, 0.18)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 35px rgba(31, 200, 126, 0.20)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        level="body-lg"
                        sx={{
                          fontWeight: 700,
                          color: "#b4f3d2ff", // Minty light green highlight
                          // mb: 1,
                          letterSpacing: 0.5,
                        }}
                      >
                        Total Orders
                      </Typography>
                      <Typography
                        level="h1"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#ffffff",
                        }}
                      >
                        {/* {currentData.kpi.totalOrders} */}
                         {totalOrders || 0}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {/* , justifyContent: 'center' */}
                        <Assessment sx={{ fontSize: 20, color: "#eaffed" }} />
                        <Typography level="body-sm" sx={{ color: "#eaffed" }}>
                          Active production
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      background:
                        "linear-gradient(135deg, #fa3245 0%, #f86998 100%)", // Premium ERP red gradient
                      color: "white",
                      boxShadow: "0 10px 25px rgba(250, 49, 69, 0.18)",
                      position: "relative",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 18px 40px rgba(250, 49, 69, 0.28)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        level="body-lg"
                        sx={{
                          fontWeight: 700,
                          color: "#ffd4db", // Soft pink for highlight
                          // mb:1,
                        }}
                      >
                        Orders Fully on Risk
                      </Typography>
                      <Typography
                        level="h1"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#ffffff",
                        }}
                      >
                        {currentData.kpi.fullOnRisk}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <ErrorOutline
                          sx={{ fontSize: 20, color: "#ffd4db" }}
                        />
                        <Typography level="body-xs" sx={{ color: "#ffe9ec" }}>
                          Requires attention
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      background:
                        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                      color: "#7c2d12",
                      boxShadow: "0 10px 25px rgba(252, 182, 159, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 35px rgba(252, 182, 159, 0.4)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        level="body-lg"
                        sx={{
                          fontWeight: 600, color: "#9a3412",
                          //  mb: 1
                        }}
                      >
                        Delayed Orders
                      </Typography>
                      <Typography level="h1" sx={{ fontWeight: 700, mb: 1 }}>
                        {currentData.kpi.delayedOrders}%
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <ErrorOutline
                          sx={{ fontSize: 20, color: "#9a3412" }}
                        />
                        <Typography level="body-xs" sx={{ color: "#9a3412" }}>
                          Behind schedule
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      background:
                        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      color: "#0c4a6e",
                      boxShadow: "0 10px 25px rgba(79, 172, 254, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 35px rgba(79, 172, 254, 0.4)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        level="body-lg"
                        sx={{
                          fontWeight: 600, color: "#075985",
                          // mb: 1
                        }}
                      >
                          At Risk (>2 Process Delays)
                      </Typography>
                      <Typography
                        level="h1"
                        sx={{ fontWeight: 700, mb: 1, color: "#ffff" }}
                      >
                        {currentData.kpi.atRisk}%
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <NotificationImportant
                          sx={{ fontSize: 20, color: "#075985" }}
                        />
                        <Typography level="body-xs" sx={{ color: "#075985" }}>
                          Multiple delays
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Process Planning Section - Table Style */}
              <Card
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: "#e2e8f0",
                  backgroundColor: "white",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    level="h4"
                    sx={{ mb: 0.5, color: "#0f172a", fontWeight: 700 }}
                  >
                    Process Planning
                  </Typography>

                  <Box sx={{ overflowX: "auto" }}>
                    <Table
                      sx={{
                        "& thead th": {
                          backgroundColor: "#f8fafc",
                          fontWeight: 700,
                          color: "#475569",
                          borderBottom: "2px solid #e2e8f0",
                          py: 1,
                        },
                        "& tbody td": {
                          py: 1,
                          borderBottom: "1px solid #f1f5f9",
                        },
                        "& tbody tr:hover": {
                          backgroundColor: "#f8fafc",
                        },
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "30%" }}>Process Planning</th>
                          <th style={{ width: "20%", textAlign: "center" }}>
                            Focus Week (Delivery)
                          </th>
                          <th style={{ width: "20%", textAlign: "center" }}>
                            Planning Week (Calendar)
                          </th>
                          <th style={{ width: "30%" }}>Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {getVisibleProcesses().map((processName) => {
                           */}
                        {[
                          "Sourcing",
                          "Fabric Store",
                          "Cutting",
                          "VAP / Printing",
                        ].map((processName) => {
                          const processKey = processName
                            .toLowerCase()
                            .replace(" / ", "")
                            .replace(" ", "");
                          const planData = planningWeeks[processKey] || {
                            focus: selectedWeek,
                            planning: selectedWeek,
                          };
                          const processData = currentData.processes.find(
                            (p) => p.name === processName
                          );
                          const statusConfig = processData
                            ? getStatusConfig(processData.status)
                            : getStatusConfig("on-track");

                          return (
                            <tr key={processName}>
                              <td>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: "10px",
                                      backgroundColor: statusConfig.bgColor,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: statusConfig.color,
                                    }}
                                  >
                                    {getProcessIcon(processName)}
                                  </Box>
                                  <Typography
                                    level="body-md"
                                    sx={{ fontWeight: 600, color: "#0f172a" }}
                                  >
                                    {processName}
                                  </Typography>
                                </Box>
                              </td>
                              <td>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Chip
                                    variant="outlined"
                                    sx={{
                                      borderColor: "#cbd5e1",
                                      color: "#475569",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {planData.focus}
                                  </Chip>
                                </Box>
                              </td>
                              <td>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Chip
                                    variant="solid"
                                    sx={{
                                      backgroundColor: statusConfig.color,
                                      color: "white",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {planData.planning}
                                  </Chip>
                                </Box>
                              </td>
                              <td>
                                <Box sx={{ width: "100%" }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      mb: 0.5,
                                    }}
                                  >
                                    <Typography
                                      level="body-xs"
                                      sx={{ color: "#8b7564ff" }}
                                    >
                                      {processData ? processData.progress : 0}
                                      %
                                    </Typography>
                                  </Box>
                                  <LinearProgress
                                    determinate
                                    value={
                                      processData ? processData.progress : 0
                                    }
                                    sx={{
                                      "--LinearProgress-thickness": "8px",
                                      "--LinearProgress-progressColor":
                                        statusConfig.color,
                                      borderRadius: "4px",
                                      backgroundColor: statusConfig.bgColor,
                                    }}
                                  />
                                </Box>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Box>
                </CardContent>
              </Card>

              <Box sx={{ mb: 1 }}>
                <Typography level="h4" sx={{ color: "#0f172a", fontWeight: 700 }}>
                  Production Status by Process
                </Typography>
                <Typography level="body-sm" sx={{ color: "#64748b", mt: 0.5 }}>
                  Real-time tracking of all production processes
                </Typography>
              </Box>

              {/* 4 Process Cards in Same Row */}
              <Grid container spacing={3} sx={{ mb: 2 }}>
                {currentData.processes
                  .filter((process) => selectedProcess === "All" || process.name === selectedProcess)
                  .map((process) => {
                    const processColors = getProcessColor(process.name);
                    const statusConfig = getStatusConfig(process.status);

                    return (
                      <Grid key={process.name} xs={12} sm={6} md={3}>
                        <Card
                          sx={{
                            background: "white",
                            cursor: "pointer",
                            border: `2px solid ${processColors.primary}20`,
                            boxShadow: `0 4px 12px ${processColors.primary}15`,
                            transition: "all 0.3s ease",
                            height: "100%",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: `0 12px 24px ${processColors.primary}25`,
                              borderColor: processColors.primary,
                            },
                          }}
                          onClick={() => {
                            if (process.name === "Sourcing") handleCardClick("/sourcing");
                            else if (process.name === "Fabric Store") handleCardClick("/FabricDash");
                            else if (process.name === "Cutting") handleCardClick("/CuttingDashboard");
                            else if (process.name === "VAP / Printing") handleCardClick("/vaprinting");
                          }}
                        >
                          <CardContent>
                            {/* Top bar: Icon left, Name right */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                                width: "100%",
                              }}
                            >
                              {/* Icon Top Left */}
                              <Box
                                sx={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: "12px",
                                  background: `linear-gradient(135deg, ${processColors.primary} 0%, ${processColors.secondary} 100%)`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                }}
                              >
                                {getProcessIconOg(process.name)}
                              </Box>
                              {/* Process Name Top Right */}
                              <Typography
                                level="title-md"
                                sx={{
                                  color: processColors.text,
                                  fontWeight: 700,
                                  alignSelf: "flex-start",
                                }}
                              >
                                {process.name}
                              </Typography>
                            </Box>

                            {/* Orders Count Centered */}
                            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                              <Typography
                                level="h1"
                                sx={{
                                  color: processColors.primary,
                                  fontWeight: 700,
                                }}
                              >
                                {process.orders}
                              </Typography>
                            </Box>

                            {/* Progress Bar below */}
                            <Box>
                              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                                <Typography
                                  level="body-sm"
                                  sx={{ color: processColors.text, fontWeight: 700 }}
                                >
                                  {process.progress}%
                                </Typography>
                              </Box>
                              <LinearProgress
                                determinate
                                value={process.progress}
                                sx={{
                                  "--LinearProgress-thickness": "8px",
                                  "--LinearProgress-progressColor": getLinearBarColor(
                                    processColors.primary
                                  ),
                                  borderRadius: "4px",
                                  backgroundColor: `${processColors.primary}20`,
                                }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>

                    );
                  })}
              </Grid>


              {/* Risk Alert Section */}
              <Card
                sx={{
                  background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                  border: "2px solid #ef4444",
                  boxShadow: "0 8px 20px rgba(239, 68, 68, 0.2)", cursor: 'pointer',
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 12px 24px #475569 25`,
                    borderColor: '#1fc87e',
                  },
                }}
                onClick={() => {
                  handleClickRoute('/risksummary');
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Warning sx={{ fontSize: 28, color: "#ffffff" }} />
                    </Box>
                    <Box>
                      <Typography level="h4" sx={{ color: "#991b1b", fontWeight: 700 }}>
                        Risk Alert
                      </Typography>
                      <Typography level="body-sm" sx={{ color: "#991b1b" }}>
                        Critical orders requiring immediate attention
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ overflowX: "auto" }}>
                    <Table
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        overflow: "hidden",
                        "& thead th": {
                          backgroundColor: "#fef2f2",
                          // 991b1b
                          fontWeight: 700,
                          color: "#09609eff",
                          borderBottom: "2px solid #fecaca",
                          py: 2,
                          textAlign: "center",
                        },
                        "& tbody td": {
                          py: 2,
                          textAlign: "center",
                          borderBottom: "1px solid #fee2e2",
                          fontWeight: 600,
                        },
                        "& tbody tr:hover": {
                          backgroundColor: "#fef2f2",
                        },
                      }}
                    >
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Delivery</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.riskAlerts && currentData.riskAlerts.map((alert, index) => (
                          <tr key={index}>
                            <td>
                              <Typography level="body-sm" sx={{ fontWeight: 700, color: "#0f172a" }}>
                                {alert.customer}
                              </Typography>
                            </td>
                            <td>
                              <Chip
                                size="sm"
                                variant="solid"
                                sx={{
                                  backgroundColor: "#ef4444",
                                  color: "white",
                                  fontWeight: 700,
                                }}
                              >
                                {alert.delivery}
                              </Chip>
                            </td>
                            <td>
                              <Typography level="body-sm" sx={{ color: "#dc2626", fontWeight: 600 }}>
                                {alert.action}
                              </Typography>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                </CardContent>
              </Card>
            </Box>

          </Box>

          {/* </Box> */}
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default ProductionDashboard;
