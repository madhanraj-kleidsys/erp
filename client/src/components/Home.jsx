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
  Modal,
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
  ErrorOutline,
  Warning,
} from "@mui/icons-material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

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

// Mock data from your JSON
const mockOrderData = [
  { Buyer: "H&M HENNES & MAURITZ GBC AB", StyleCode: "ASTERTANK", Combo: "51-136 PINK DUSTY LIGHT", Size: "L", OPDQty: 50 },
  { Buyer: "H&M HENNES & MAURITZ GBC AB", StyleCode: "ASTERTANK", Combo: "51-136 PINK DUSTY LIGHT", Size: "M", OPDQty: 218 },
  { Buyer: "H&M HENNES & MAURITZ GBC AB", StyleCode: "ASTERTANK", Combo: "51-136 PINK DUSTY LIGHT", Size: "S", OPDQty: 388 },
  { Buyer: "H&M HENNES & MAURITZ GBC AB", StyleCode: "ASTERTANK", Combo: "51-136 PINK DUSTY LIGHT", Size: "XL", OPDQty: 50 },
  { Buyer: "H&M HENNES & MAURITZ GBC AB", StyleCode: "ASTERTANK", Combo: "51-136 PINK DUSTY LIGHT", Size: "XS", OPDQty: 208 },
  { Buyer: "H&M HENNES & MAURITZ GBC AB", StyleCode: "ASTERTANK", Combo: "51-136 PINK DUSTY LIGHT", Size: "XXS", OPDQty: 80 },
  { Buyer: "H&M HENNES & MAURITZ GBC AB", StyleCode: "ASTERTANK", Combo: "17-222 BROWN DARK", Size: "L", OPDQty: 64 },
  { Buyer: "H&M HENNES & MAURITZ GBC AB", StyleCode: "ASTERTANK", Combo: "17-222 BROWN DARK", Size: "M", OPDQty: 286 },
];

// Process Order Details Mock Data
const processOrderDetailsMock = {
  "Sourcing": [
    { orderCount: "292/62", progress: 85 },
    { orderCount: "180/34", progress: 78 },
    { orderCount: "120/20", progress: 55 },
    { orderCount: "160/45", progress: 92 },
  ],
  "Fabric Store": [
    { orderCount: "210/40", progress: 70 },
    { orderCount: "170/38", progress: 60 },
    { orderCount: "130/25", progress: 45 },
    { orderCount: "150/50", progress: 80 },
  ],
  "Cutting": [
    { orderCount: "200/50", progress: 55 },
    { orderCount: "180/40", progress: 45 },
    { orderCount: "160/30", progress: 30 },
    { orderCount: "140/35", progress: 50 },
  ],
  "VAP / Printing": [
    { orderCount: "120/20", progress: 48 },
    { orderCount: "110/18", progress: 35 },
    { orderCount: "90/10", progress: 25 },
    { orderCount: "100/22", progress: 40 },
  ],
};

const customers = [
  "All Customers",
  "H&M HENNES & MAURITZ GBC AB",
  "VINGINO",
  "GROUPE AUCHAN",
  "MAX HOLDINGS - INVESTMENTS LTD",
  "KMART AUSTRALIA LIMITED",
];

const stylesByCustomer = {
  "All Customers": ["ALL Styles"],
  "H&M HENNES & MAURITZ GBC AB": [
    "ASTERTANK",
    "AZURLSTOP",
    "BELLATEE",
    "BOSSTOP",
    "CILLALSTEE",
  ],
  "VINGINO": ["BOYSTANK2PACK"],
  "GROUPE AUCHAN": ["S26WKNTEE0009", "S26WKNTEE0031"],
  "MAX HOLDINGS - INVESTMENTS LTD": ["1203B", "1204B", "1217B"],
  "KMART AUSTRALIA LIMITED": ["026NS26LSL014", "06NS26DPL080"],
};

const processes = ["All", "Sourcing", "Fabric Store", "Cutting", "VAP Printing"];
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
      ],
    },
  },
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
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const week = Math.floor(diff / oneWeek);
  return `${week.toString().padStart(2, "0")}`;
};

const getWeekDateRange = (week) => {
  const weekNum = parseInt(week.substring(0));
  const year = new Date().getFullYear();
  const startDate = new Date(year, 0, 1 + (weekNum - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const options = { month: "short", day: "numeric" };
  return `${startDate.toLocaleDateString("en-US", options)} - ${endDate.toLocaleDateString("en-US", options)}, ${year}`;
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
  if (percent < 50) return "#ef4444";
  if (percent >= 50 && percent <= 60) return "#f59e0b";
  return "#10b981";
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
};

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

const getStatusConfig = (status) => {
  switch (status) {
    case "on-track":
      return {
        color: "#10b981",
        bgColor: "#ecfdf5",
        borderColor: "#10b981",
        label: "On Track",
      };
    case "warning":
      return {
        color: "#f59e0b",
        bgColor: "#fffbeb",
        borderColor: "#f59e0b",
        label: "At Risk",
      };
    case "critical":
      return {
        color: "#ef4444",
        bgColor: "#fef2f2",
        borderColor: "#ef4444",
        label: "Critical",
      };
    default:
      return {
        color: "#6b7280",
        bgColor: "#f9fafb",
        borderColor: "#6b7280",
        label: "Unknown",
      };
  }
};

// Cascading Filter Modal Component
const CascadingFilterModal = ({ open, onClose, kpiType }) => {
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedCombo, setSelectedCombo] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [buyers, setBuyers] = useState([]);
  const [styles, setStyles] = useState([]);
  const [combos, setCombos] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const uniqueBuyers = [...new Set(mockOrderData.map((d) => d.Buyer))];
    setBuyers(uniqueBuyers);
  }, []);

  useEffect(() => {
    if (selectedBuyer) {
      const filteredStyles = [
        ...new Set(
          mockOrderData
            .filter((d) => d.Buyer === selectedBuyer)
            .map((d) => d.StyleCode)
        ),
      ];
      setStyles(filteredStyles);
      setSelectedStyle("");
      setCombos([]);
      setSelectedCombo("");
      setSizes([]);
      setSelectedSize("");
      setOrderCount(0);
      setFilteredOrders([]);
    } else {
      setStyles([]);
    }
  }, [selectedBuyer]);

  useEffect(() => {
    if (selectedBuyer && selectedStyle) {
      const filteredCombos = [
        ...new Set(
          mockOrderData
            .filter((d) => d.Buyer === selectedBuyer && d.StyleCode === selectedStyle)
            .map((d) => d.Combo)
        ),
      ];
      setCombos(filteredCombos);
      setSelectedCombo("");
      setSizes([]);
      setSelectedSize("");
      setOrderCount(0);
      setFilteredOrders([]);
    } else {
      setCombos([]);
    }
  }, [selectedStyle, selectedBuyer]);

  useEffect(() => {
    if (selectedBuyer && selectedStyle && selectedCombo) {
      const filteredSizes = [
        ...new Set(
          mockOrderData
            .filter(
              (d) =>
                d.Buyer === selectedBuyer &&
                d.StyleCode === selectedStyle &&
                d.Combo === selectedCombo
            )
            .map((d) => d.Size)
        ),
      ];
      setSizes(filteredSizes);
      setSelectedSize("");
      setOrderCount(0);
      setFilteredOrders([]);
    } else {
      setSizes([]);
    }
  }, [selectedCombo, selectedStyle, selectedBuyer]);

  useEffect(() => {
    if (selectedBuyer && selectedStyle && selectedCombo && selectedSize) {
      const orders = mockOrderData.filter(
        (d) =>
          d.Buyer === selectedBuyer &&
          d.StyleCode === selectedStyle &&
          d.Combo === selectedCombo &&
          d.Size === selectedSize
      );
      const totalCount = orders.reduce((sum, order) => sum + order.OPDQty, 0);
      setOrderCount(totalCount);
      setFilteredOrders(orders);
    } else {
      setOrderCount(0);
      setFilteredOrders([]);
    }
  }, [selectedSize, selectedCombo, selectedStyle, selectedBuyer]);

  const getKPITitle = () => {
    switch (kpiType) {
      case "total":
        return "Total Orders";
      case "fullyOnRisk":
        return "Orders Fully On Risk";
      case "delayed":
        return "Delayed Orders";
      case "atRisk":
        return "At Risk Orders";
      default:
        return "Orders";
    }
  };

  const getKPIColor = () => {
    switch (kpiType) {
      case "total":
        return { bg: "linear-gradient(135deg, #1fc87e 0%, #0cba6b 100%)", text: "#1fc87e" };
      case "fullyOnRisk":
        return { bg: "linear-gradient(135deg, #fa3245 0%, #f86998 100%)", text: "#fa3245" };
      case "delayed":
        return { bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", text: "#ffecd2" };
      case "atRisk":
        return { bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", text: "#4facfe" };
      default:
        return { bg: "linear-gradient(135deg, #1fc87e 0%, #0cba6b 100%)", text: "#1fc87e" };
    }
  };

  const colorConfig = getKPIColor();

  return (
    <Modal open={open} onClose={onClose} placement="center">
      <Box
        sx={{
          width: 500,
          maxHeight: "90vh",
          overflow: "auto",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: 12,
          border: `2px solid ${colorConfig.text}`,
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            pb: 2,
            borderBottom: `2px solid ${colorConfig.text}`,
          }}
        >
          <Typography level="h4" sx={{ fontWeight: 700, color: colorConfig.text }}>
            🔍 {getKPITitle()} - Filter
          </Typography>
          <IconButton
            size="sm"
            variant="plain"
            onClick={onClose}
            sx={{ color: "#666" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Customer</FormLabel>
          <Select
            placeholder="Select Customer"
            value={selectedBuyer}
            onChange={(event, newValue) => setSelectedBuyer(newValue)}
          >
            {buyers.map((buyer) => (
              <Option key={buyer} value={buyer}>
                {buyer}
              </Option>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Style</FormLabel>
          <Select
            placeholder="Select Style"
            value={selectedStyle}
            onChange={(event, newValue) => setSelectedStyle(newValue)}
            disabled={!selectedBuyer}
          >
            {styles.map((style) => (
              <Option key={style} value={style}>
                {style}
              </Option>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Color</FormLabel>
          <Select
            placeholder="Select Color"
            value={selectedCombo}
            onChange={(event, newValue) => setSelectedCombo(newValue)}
            disabled={!selectedStyle}
          >
            {combos.map((combo) => (
              <Option key={combo} value={combo}>
                {combo}
              </Option>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ mb: 3 }}>
          <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Size</FormLabel>
          <Select
            placeholder="Select Size"
            value={selectedSize}
            onChange={(event, newValue) => setSelectedSize(newValue)}
            disabled={!selectedCombo}
          >
            {sizes.map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
        </FormControl>

        {selectedSize && (
          <Box
            sx={{
              p: 2,
              mb: 2,
              background: `linear-gradient(135deg, ${colorConfig.text}15 0%, ${colorConfig.text}05 100%)`,
              border: `2px solid ${colorConfig.text}`,
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <Typography level="body-sm" sx={{ color: "#666", mb: 0.5 }}>
              Total Order Quantity (OPDQty)
            </Typography>
            <Typography level="h2" sx={{ color: colorConfig.text, fontWeight: 700 }}>
              {orderCount}
            </Typography>
          </Box>
        )}

        {filteredOrders.length > 0 && (
          <Box>
            <Typography level="title-md" sx={{ fontWeight: 700, mb: 1.5 }}>
              📋 Order Details
            </Typography>
            <Box sx={{ overflowX: "auto", mb: 2 }}>
              <Table
                sx={{
                  "& thead th": {
                    backgroundColor: "#f8fafc",
                    fontWeight: 700,
                    borderBottom: "2px solid #e2e8f0",
                    py: 1,
                    fontSize: "0.875rem",
                  },
                  "& tbody td": {
                    py: 1,
                    borderBottom: "1px solid #f1f5f9",
                    fontSize: "0.875rem",
                  },
                }}
              >
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>OPDQty</th>
                    <th>TtlCutQty</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, idx) => (
                    <tr key={idx}>
                      <td>{order.Size}</td>
                      <td>{order.OPDQty}</td>
                      <td>{order.TtlCutQty}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

// Process Details Modal Component
const ProcessDetailsModal = ({ open, onClose, processName }) => {
  return (
    <Modal open={open} onClose={onClose} placement="center">
      <Box
        sx={{
          width: 450,
          maxHeight: "80vh",
          overflow: "auto",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: 12,
          border: `2px solid #cbd5e1`,
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            pb: 2,
            borderBottom: "2px solid #cbd5e1",
          }}
        >
          <Typography level="h4" sx={{ fontWeight: 700, color: "#0f172a" }}>
            📊 {processName} - Order Details
          </Typography>
          <IconButton
            size="sm"
            variant="plain"
            onClick={onClose}
            sx={{ color: "#666" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {processName && processOrderDetailsMock[processName] ? (
          <Box>
            {processOrderDetailsMock[processName].map(({ orderCount, progress }, idx) => (
              <Box
                key={idx}
                sx={{
                  p: 2,
                  mb: 2,
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  background: "#f8fafc",
                  "&:hover": {
                    background: "#f1f5f9",
                    borderColor: "#cbd5e1",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography level="title-sm" sx={{ fontWeight: 600, color: "#0f172a" }}>
                    Order Count
                  </Typography>
                  <Typography level="h5" sx={{ fontWeight: 700, color: "#1fc87e" }}>
                    {orderCount}
                  </Typography>
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <Typography level="body-sm" sx={{ color: "#64748b", fontWeight: 500 }}>
                      Progress
                    </Typography>
                    <Typography level="body-sm" sx={{ fontWeight: 700, color: "#0f172a" }}>
                      {progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    determinate
                    value={progress}
                    sx={{
                      "--LinearProgress-thickness": "8px",
                      "--LinearProgress-progressColor": progress >= 80 ? "#10b981" : progress >= 50 ? "#f59e0b" : "#ef4444",
                      borderRadius: "4px",
                      backgroundColor: "#e2e8f0",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography level="body-sm" sx={{ color: "#64748b" }}>
            No data available
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

const ProductionDashboard = () => {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedProcess, setSelectedProcess] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("On-time");
  const [weekSearch, setWeekSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [activeKPI, setActiveKPI] = useState(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Process Detail Modal States
  const [selectedProcessDetail, setSelectedProcessDetail] = useState(null);
  const [processDetailModalOpen, setProcessDetailModalOpen] = useState(false);

  const weeks = generateWeeks();

  useEffect(() => {
    setSelectedStyle(stylesByCustomer[selectedCustomer][0]);
  }, [selectedCustomer]);

  const filteredWeeks = weeks.filter((week) =>
    week.toLowerCase().includes(weekSearch.toLowerCase())
  );

  const getCurrentData = () => {
    const customerData = mockDataByFilters[selectedCustomer] || mockDataByFilters["H&M"];
    const statusData = customerData[selectedStatus] || customerData["On-time"];
    return statusData;
  };

  const currentData = getCurrentData();

  const getPlanningWeeks = () => {
    const weekNum = parseInt(selectedWeek);
    return {
      sourcing: {
        focus: `W${(weekNum + 4).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 3).toString().padStart(2, "0")}`,
      },
      fabricstore: {
        focus: `W${(weekNum + 3).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 3).toString().padStart(2, "0")}`,
      },
      cutting: {
        focus: `W${(weekNum + 2).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 2).toString().padStart(2, "0")}`,
      },
      vapprinting: {
        focus: `W${(weekNum + 2).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 2).toString().padStart(2, "0")}`,
      },
    };
  };

  const planningWeeks = getPlanningWeeks();

  const handleCardClick = (processRoute) => {
    navigate(processRoute, { state: { selectedWeek } });
  };

  const handleClickRoute = (processRoute) => {
    navigate(processRoute);
  };

  const handleKPIClick = (kpiType) => {
    setActiveKPI(kpiType);
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
    setActiveKPI(null);
  };

  // Process Detail Modal Handlers
  const openProcessDetails = (processName) => {
    setSelectedProcessDetail(processName);
    setProcessDetailModalOpen(true);
  };

  const closeProcessDetails = () => {
    setProcessDetailModalOpen(false);
    setSelectedProcessDetail(null);
  };

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Header />
          <Box sx={{ minHeight: "100vh" }}>
            <Box
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 110,
                p: { xs: 1, sm: 1, md: 2 },
                borderRadius: "16px",
                display: "flex",
                background: "#10b4f0ff",
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
                    color: "#000",
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
                  Selected Week : W{selectedWeek}
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

            <Drawer
              anchor="left"
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
                    // backgroundColor: "white",
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
                  <Typography level="h4" sx={{ fontWeight: 700 }}>
                    Filters
                  </Typography>
                  <IconButton
                    variant="plain"
                    onClick={() => setFilterOpen(false)}
                    sx={{ borderRadius: "8px" }}
                  >
                    <Close />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel sx={{ fontWeight: 600, mb: 1 }}>
                    <CalendarMonth sx={{ fontSize: 18, color: "#3b82f6", mr: 1 }} />
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
                  />
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel sx={{ fontWeight: 600, mb: 1 }}>
                    <BusinessCenter sx={{ fontSize: 18, color: "#3b82f6", mr: 1 }} />
                    Customer
                  </FormLabel>
                  <Select
                    value={selectedCustomer}
                    onChange={(event, newValue) =>
                      setSelectedCustomer(newValue)
                    }
                  >
                    {customers.map((customer) => (
                      <Option key={customer} value={customer}>
                        {customer}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel sx={{ fontWeight: 600, mb: 1 }}>
                    <Category sx={{ fontSize: 18, color: "#3b82f6", mr: 1 }} />
                    Style/Article
                  </FormLabel>
                  <Select
                    value={selectedStyle}
                    onChange={(event, newValue) => setSelectedStyle(newValue)}
                  >
                    {(stylesByCustomer[selectedCustomer] || []).map((style) => (
                      <Option key={style} value={style}>
                        {style}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel sx={{ fontWeight: 600, mb: 1 }}>
                    <Assessment sx={{ fontSize: 18, color: "#3b82f6", mr: 1 }} />
                    Process
                  </FormLabel>
                  <Select
                    value={selectedProcess}
                    onChange={(event, newValue) =>
                      setSelectedProcess(newValue)
                    }
                  >
                    {processes.map((process) => (
                      <Option key={process} value={process}>
                        {process}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel sx={{ fontWeight: 600, mb: 1 }}>
                    <CheckCircle sx={{ fontSize: 18, color: "#3b82f6", mr: 1 }} />
                    Status
                  </FormLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(event, newValue) =>
                      setSelectedStatus(newValue)
                    }
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
              {/* KPI Cards */}
              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    onClick={() => handleKPIClick("total")}
                    sx={{
                      background: "linear-gradient(135deg, #1fc87e 0%, #0cba6b 100%)",
                      color: "white",
                      boxShadow: "0 10px 25px rgba(35, 179, 120, 0.18)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
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
                          color: "#b4f3d2ff",
                          letterSpacing: 0.5,
                        }}
                      >
                        Total Orders
                      </Typography>
                      <Typography
                        level="h1"
                        sx={{ fontWeight: 700, mb: 1, color: "#ffffff" }}
                      >
                        {currentData.kpi.totalOrders}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
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
                    onClick={() => handleKPIClick("fullyOnRisk")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #fa3245 0%, #f86998 100%)",
                      color: "white",
                      boxShadow: "0 10px 25px rgba(250, 49, 69, 0.18)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
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
                          color: "#ffd4db",
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
                    onClick={() => handleKPIClick("delayed")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                      color: "#7c2d12",
                      boxShadow: "0 10px 25px rgba(252, 182, 159, 0.3)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
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
                          fontWeight: 600,
                          color: "#9a3412",
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
                    onClick={() => handleKPIClick("atRisk")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      color: "#0c4a6e",
                      boxShadow: "0 10px 25px rgba(79, 172, 254, 0.3)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
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
                          fontWeight: 600,
                          color: "#075985",
                        }}
                      >
                        At Risk (>2 Process Delays)
                      </Typography>
                      <Typography
                        level="h1"
                        sx={{ fontWeight: 700, mb: 1, color: "#ffffff" }}
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

              <CascadingFilterModal
                open={filterModalOpen}
                onClose={handleCloseFilterModal}
                kpiType={activeKPI}
              />

              {/* Process Planning Section - CLICKABLE ROWS */}
              <Card
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: "#e2e8f0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    level="h4"
                    sx={{
                      mb: 0.5,
                      fontWeight: 700,
                    }}
                  >
                    Process Planning
                  </Typography>

                  <Box sx={{ overflowX: "auto" }}>
                    <Table
                      sx={{
                        "& thead th": {
                          fontWeight: 700,
                          borderBottom: "2px solid #e2e8f0",
                          py: 1,
                        },
                        "& tbody td": {
                          py: 1,
                          borderBottom: "1px solid #f1f5f9",
                        },
                        "& tbody tr": {
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f0f9ff",
                          },
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
                            <tr
                              key={processName}
                              onClick={() => openProcessDetails(processName)}
                            >
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
                                    sx={{
                                      fontWeight: 600,
                                    }}
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
                                      {processData ? processData.progress : 0}%
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

              {/* Process Details Modal */}
              <ProcessDetailsModal
                open={processDetailModalOpen}
                onClose={closeProcessDetails}
                processName={selectedProcessDetail}
              />

              <Box sx={{ mb: 1 }}>
                <Typography
                  level="h4"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Production Status by Process
                </Typography>
                <Typography level="body-sm" sx={{ color: "#64748b", mt: 0.5 }}>
                  Real-time tracking of all production processes
                </Typography>
              </Box>

              {/* Process Cards */}
              <Grid container spacing={3} sx={{ mb: 2 }}>
                {currentData.processes
                  .filter(
                    (process) =>
                      selectedProcess === "All" || process.name === selectedProcess
                  )
                  .map((process) => {
                    const processColors = getProcessColor(process.name);
                    const statusConfig = getStatusConfig(process.status);

                    return (
                      <Grid key={process.name} xs={12} sm={6} md={3}>
                        <Card
                          sx={{
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
                            if (process.name === "Sourcing")
                              handleCardClick("/sourcing");
                            else if (process.name === "Fabric Store")
                              handleCardClick("/FabricDash");
                            else if (process.name === "Cutting")
                              handleCardClick("/CuttingDashboard");
                            else if (process.name === "VAP / Printing")
                              handleCardClick("/vaprinting");
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                                width: "100%",
                              }}
                            >
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

                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 1,
                              }}
                            >
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

                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  level="body-sm"
                                  sx={{
                                    color: processColors.text,
                                    fontWeight: 700,
                                  }}
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
                                    process.progress
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
                  boxShadow: "0 8px 20px rgba(239, 68, 68, 0.2)",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 12px 24px #475569 25`,
                    borderColor: "#1fc87e",
                  },
                }}
                onClick={() => {
                  handleClickRoute("/risksummary");
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background:
                          "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                        borderRadius: "12px",
                        overflow: "hidden",
                        "& thead th": {
                          backgroundColor: "#fef2f2",
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
                          backgroundColor: "#ffffffff",
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
                        {currentData.riskAlerts &&
                          currentData.riskAlerts.map((alert, index) => (
                            <tr key={index}>
                              <td>
                                <Typography
                                  level="body-sm"
                                  sx={{ fontWeight: 700, color: "#0f172a" }}
                                >
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
                                <Typography
                                  level="body-sm"
                                  sx={{ color: "#dc2626", fontWeight: 600 }}
                                >
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
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default ProductionDashboard;