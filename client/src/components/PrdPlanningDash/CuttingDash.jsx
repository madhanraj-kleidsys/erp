import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid, Sheet,
  Typography,
  Card,
  Select,
  Option,
  Button,
  Chip,
} from "@mui/joy";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import LayersIcon from "@mui/icons-material/Layers";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import WarningIcon from "@mui/icons-material/Warning";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SpeedIcon from "@mui/icons-material/Speed";
import ReplyIcon from '@mui/icons-material/Reply';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Header from "../Header";
import Sidebar from "../Sidebar";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: "#0f172a",
          surface: "#1e293b",
        },
      },
    },
  },
});

const CUT_PLAN_ACTUAL = [
  { label: "Plan", value: 1000, color: "#60A5FA" },
  { label: "Actual", value: 870, color: "#22C55E" },
];

const READY_PANELS = 800;
const REQUIREMENT_PANELS = 1000;
const BALANCE_TO_CUT = 200;

const LINES = ["Bloomsburg", "Flamingo", "bllomsburg"];
const BLOCKS = ["Block A", "Block B"];
const STYLES = ["Athletic", "Casual"];
const COLORS = ["Red", "Blue", "Grey"];

const DAILY_CUTTING_TREND = [
  { day: "Mon", plan: 200, actual: 180 },
  { day: "Tue", plan: 220, actual: 210 },
  { day: "Wed", plan: 190, actual: 185 },
  { day: "Thu", plan: 210, actual: 200 },
  { day: "Fri", plan: 180, actual: 125 },
  { day: "Sat", plan: 150, actual: 70 },
];

const keyframes = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
    50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8); }
  }
`;

const LATE_STARTS = [
  { day: "Monday", delay: 2, risk: "Critical", sone: "Late starts in this process may increase overall risk" },
  { day: "Tuesday", delay: 1.5, risk: "Warning", sone: "should be carefully monitored" },
  { day: "Wednesday", delay: 1.2, risk: "Warning", sone: "avoid further delays." },
  { day: "Thursday", delay: 1.8, risk: "Critical", sone: "immediate Action Required" },
];

// Total units at delivery risk from these late starts
const UNITS_AT_RISK = 130;

// Sum of delay hours
const TOTAL_DELAY_HOURS = 6.5;
// { selectedWeek = "W40" }
export default function CuttingDashboard() {
  const location = useLocation();
  const { selectedWeek } = location.state || { selectedWeek: "default err" };
  const weekNumber = parseInt(selectedWeek.replace(/\D/g, ""), 10);
  const deliveryWeekNumber = weekNumber + 2;
  const deliveryWeek = `W${deliveryWeekNumber}`;



  const [line, setLine] = React.useState(LINES[0]);
  const [block, setBlock] = React.useState(BLOCKS[0]);
  const [style, setStyle] = React.useState(STYLES[0]);
  const [color, setColor] = React.useState(COLORS[0]);
  // const deliveryWeek = "W42";

  const actualPercent = ((CUT_PLAN_ACTUAL[1].value / CUT_PLAN_ACTUAL[0].value) * 100).toFixed(1);
  const readyPercent = ((READY_PANELS / REQUIREMENT_PANELS) * 100).toFixed(1);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Header />
          <Box sx={{ pt: 1, pb: 2, flex: 1, display: "flex", flexDirection: "column", minWidth: 0, gap: 2 }}>
            {/* Title Bar */}
            <Sheet
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, md: 4 },
                p: { xs: 3, md: 2 },
                borderRadius: 12,
                // background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                color: "#ffffff",
                background: "#ec4899",
                // linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)
                backgroundSize: "200% 200%",
                // animation: "gradientShift 8s ease infinite",
              }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <button onClick={() => window.history.back()} style={{ border: 'none', display: 'flex', alignItems: 'center', background: "none" }} >
                  <ReplyIcon sx={{ fontSize: 50, color: "#fff", marginRight: 0.5, cursor: "pointer" }} />
                </button>
                <ContentCutIcon sx={{ fontSize: 35, color: "#fff", animation: "float 4s ease-in-out infinite" }} />
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  width: "100%"
                }}>
                  <Typography level="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                    Cutting Dashboard
                  </Typography>
                  <Typography level="h5" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 400 }}>
                    real-time production monitoring
                  </Typography>
                </Box>
              </Box>

              <Box sx={{
                display: "flex",
                gap: { xs: 2, sm: 4 },
                flexWrap: "wrap"
              }}>
                <Box>
                  <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.8)", mb: 0.5 }}>
                    Current Week
                  </Typography>
                  <Typography level="title-lg" sx={{ fontWeight: 700, color: "#fff" }}>
                    {selectedWeek}
                  </Typography>
                </Box>
                <Box>
                  <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.8)", mb: 0.5 }}>
                    Delivery Week
                  </Typography>
                  <Typography level="title-lg" sx={{ fontWeight: 700, color: "#fff" }}>
                    {deliveryWeek}
                  </Typography>
                </Box>
              </Box>
            </Sheet>
            <style>{keyframes}</style>

            <Box sx={{ minHeight: "100vh", p: { xs: 2, sm: 3, md: 3 } }}>

              {/* KPI Cards - Animated */}
              {/* KPI Cards - Professional & Compact */}
              <Grid container spacing={2.5} sx={{ mb: 1 }}>
                {/* Cut Plan vs Actual */}
                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      p: 2.5,
                      height: "100%",
                      background: "linear-gradient(135deg, #a0b0e0ff 0%, #2f2accc6 100%)",
                      //  background: "linear-gradient(135deg, #E8F5E8 0%, #4CAF50 100%)",
                      backgroundSize: "200% 200%",
                      animation: "gradientShift 10s ease infinite",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.01)",
                        boxShadow: "0 12px 24px rgba(30, 58, 138, 0.4)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        <SpeedIcon sx={{ color: "#fff", fontSize: 24, animation: "pulse 2s ease-in-out infinite" }} />
                        <Typography level="title-md" sx={{ fontWeight: 600, color: "#fff" }}>
                          Cut Performance
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography level="h2" sx={{ fontWeight: 700, color: "#fff", mb: 0.5, fontSize: "1.8rem" }}>
                            {CUT_PLAN_ACTUAL[0].value}
                          </Typography>
                          <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                            Planned
                          </Typography>
                        </Box>
                        <Box sx={{ width: 1.5, bgcolor: "rgba(255,255,255,0.3)" }} />
                        <Box sx={{ textAlign: "center" }}>
                          <Typography level="h2" sx={{ fontWeight: 700, color: "#fff", mb: 0.5, fontSize: "1.8rem" }}>
                            {CUT_PLAN_ACTUAL[1].value}
                          </Typography>
                          <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                            Actual
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ position: "relative", width: "100%", height: 6, bgcolor: "rgba(255,255,255,0.2)", borderRadius: 1, overflow: "hidden" }}>
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            width: `${actualPercent}%`,
                            background: "linear-gradient(90deg, #059669 0%, #047857 100%)",
                            borderRadius: 5,
                            transition: "width 1s ease-out",
                          }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, alignItems: "center" }}>
                        <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                          {actualPercent}% Complete
                        </Typography>
                        <Chip size="sm" sx={{ bgcolor: "rgba(5, 150, 105, 0.9)", color: "#fff", fontWeight: 600, fontSize: "0.7rem" }}>
                          <TrendingUpIcon sx={{ fontSize: 12, mr: 0.5 }} />
                          87%
                        </Chip>
                      </Box>
                    </Box>

                  </Card>
                </Grid>

                {/* Ready Panels */}
                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      p: 2.5,
                      height: "100%",
                      background: "linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)", // Professional teal
                      backgroundSize: "200% 200%",
                      animation: "gradientShift 12s ease infinite",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.01)",
                        boxShadow: "0 12px 24px rgba(15, 118, 110, 0.4)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        <LayersIcon sx={{ color: "#fff", fontSize: 24, animation: "float 4s ease-in-out infinite" }} />
                        <Typography level="title-md" sx={{ fontWeight: 600, color: "#fff" }}>
                          Ready Panels
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography level="h2" sx={{ fontWeight: 700, color: "#fff", mb: 0.5, fontSize: "1.8rem" }}>
                            {READY_PANELS}
                          </Typography>
                          <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                            Ready
                          </Typography>
                        </Box>
                        <Box sx={{ width: 1.5, bgcolor: "rgba(255, 255, 255, 0.3)" }} />
                        <Box sx={{ textAlign: "center" }}>
                          <Typography level="h2" sx={{ fontWeight: 700, color: "#fff", mb: 0.5, fontSize: "1.8rem" }}>
                            {REQUIREMENT_PANELS}
                          </Typography>
                          <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                            Required
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ position: "relative", width: "100%", height: 6, bgcolor: "rgba(255,255,255,0.2)", borderRadius: 1, overflow: "hidden" }}>
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            width: `${readyPercent}%`,
                            background: "linear-gradient(90deg, #22d3ee 0%, #06b6d4 100%)",
                            borderRadius: 1,
                            transition: "width 1s ease-out",
                          }}
                        />
                      </Box>
                      <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500, mt: 1 }}>
                        {readyPercent}% Ready
                      </Typography>
                    </Box>
                  </Card>
                </Grid>

                {/* Balance to Cut */}
                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      p: 2.5,
                      height: "100%",
                      background: "linear-gradient(135deg, #be185d 0%, #db2777 50%, #ec4899 100%)", // Professional rose/pink
                      backgroundSize: "200% 200%",
                      animation: "gradientShift 14s ease infinite",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.01)",
                        boxShadow: "0 12px 24px rgba(190, 24, 93, 0.4)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        <LinearScaleIcon sx={{ color: "#fff", fontSize: 24, animation: "pulse 3s ease-in-out infinite" }} />
                        <Typography level="title-md" sx={{ fontWeight: 600, color: "#fff" }}>
                          Balance to Cut
                        </Typography>
                      </Box>
                      <Typography level="h1" sx={{ color: "#fff", fontWeight: 700, mb: 1.5, fontSize: "2.2rem" }}>
                        {BALANCE_TO_CUT}
                      </Typography>
                      <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.9)", mb: 2, fontWeight: 500 }}>
                        Units Remaining
                      </Typography>
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1.5,
                        bgcolor: "rgba(255,255,255,0.15)",
                        borderRadius: 1.5,
                        backdropFilter: "blur(10px)"
                      }}>
                        <FlashOnIcon sx={{ color: "#fbbf24", fontSize: 18 }} />
                        <Typography level="body-xs" sx={{ color: "#fff", fontWeight: 600 }}>
                          Priority Processing
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>

                {/* Drill Down */}
                <Grid xs={12} sm={6} lg={3}>
                  <Card sx={{ p: 1.2, height: "100%", borderRadius: 8 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <AssessmentIcon sx={{ color: "#475569", fontSize: 16 }} />
                      <Typography level="body-sm" sx={{ fontWeight: 600, fontSize: 20
                        // , color: "#1e293b"
                       }}>
                        Filter & Search
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Box>
                        <Typography level="body-xs" sx={{ mb: 0.35, fontWeight: 600, fontSize: 11 }}>
                           {/*-------------- COLOR FOR ALL ----- color: "#475569", */}
                          Line
                        </Typography>
                        <Select
                          value={line}
                          onChange={(e, val) => setLine(val)}
                          size="sm"
                          // add tis below sx bgcolor: "#fff", 
                          sx={{ width: "100%", fontSize: 10, minHeight: 26 }}
                        >
                          {LINES.map(l => <Option key={l} value={l}>{l}</Option>)}
                        </Select>
                      </Box>
                      <Box>
                        <Typography level="body-xs" sx={{ mb: 0.35, fontWeight: 600, fontSize: 11 }}>
                          Block
                        </Typography>
                        <Select
                          value={block}
                          onChange={(e, val) => setBlock(val)}
                          size="sm"
                          sx={{ width: "100%", fontSize: 10, minHeight: 26 }}
                        >
                          {BLOCKS.map(b => <Option key={b} value={b}>{b}</Option>)}
                        </Select>
                      </Box>
                      <Box>
                        <Typography level="body-xs" sx={{ mb: 0.35, fontWeight: 600,fontSize: 11 }}>
                          Style
                        </Typography>
                        <Select
                          value={style}
                          onChange={(e, val) => setStyle(val)}
                          size="sm"
                          sx={{ width: "100%", fontSize: 10, minHeight: 26 }}
                        >
                          {STYLES.map(s => <Option key={s} value={s}>{s}</Option>)}
                        </Select>
                      </Box>
                      <Box>
                        <Typography level="body-xs" sx={{ mb: 0.35, fontWeight: 600, fontSize: 11 }}>
                          Color
                        </Typography>
                        <Select
                          value={color}
                          onChange={(e, val) => setColor(val)}
                          size="sm"
                          sx={{ width: "100%", fontSize: 10, minHeight: 26 }}
                        >
                          {COLORS.map(c => <Option key={c} value={c}>{c}</Option>)}
                        </Select>
                      </Box>
                      <Button
                        variant="solid"
                        size="sm"
                        sx={{
                          mt: 1,
                          background: "linear-gradient(135deg, #475569 0%, #334155 100%)",
                          fontWeight: 600,
                          fontSize: 10,
                          minHeight: 24,
                          "&:hover": {
                            background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
                            transform: "scale(1.02)"
                          },
                          transition: "all 0.3s ease"
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>

              {/* Charts Section */}
              <Grid container spacing={3}>
                {/* Daily Cutting Trend */}
                <Grid xs={12} lg={12}>
                  <Card sx={{
                    p: 4,
                    // background: "#ffffffff",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    boxShadow: "0 8px 32px rgba(99, 102, 241, 0.2)",
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                      <TimelineIcon sx={{ fontSize: 28, color: "#6366f1" }} />
                      <Typography level="title-lg" sx={{ fontWeight: 700, 
                        // color: "#000000ff"
                         }}>
                        Daily Cutting Trend
                      </Typography>
                    </Box>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={DAILY_CUTTING_TREND}>
                        <defs>
                          <linearGradient id="colorPlan" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="day"
                          tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                          stroke="rgba(255,255,255,0.2)"
                        />
                        <YAxis
                          tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                          stroke="rgba(255,255,255,0.2)"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                            border: "1px solid rgba(99, 102, 241, 0.5)",
                            borderRadius: "12px",
                            color: "#fff",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: 600
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="plan"
                          stroke="#6366f1"
                          strokeWidth={3}
                          fill="url(#colorPlan)"
                          name="Plan"
                        />
                        <Area
                          type="monotone"
                          dataKey="actual"
                          stroke="#22c55e"
                          strokeWidth={3}
                          fill="url(#colorActual)"
                          name="Actual"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>
                </Grid>

                <Grid xs={12} lg={12}>
                  <Card sx={{
                    p: 2.5,
                    borderRadius: 12,
                    // background: "linear-gradient(135deg, #4e928eff 0%, #14b8a6 50%, #5eead4 100%)",
                    background: "linear-gradient(135deg, #5eaec7ff 0%, #06b6d4 50%, #67e8f9 100%)",
                    //  background: "linear-gradient(135deg, #54a28dff 0%, #059669 50%, #10b981 100%)",
                    border: "1px solid rgba(254, 202, 202, 0.3)",
                    boxShadow: "0 4px 20px rgba(220, 38, 38, 0.4)",
                    position: "relative",
                  }}>
                    {/* Header with clean design */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                      <Box sx={{
                        width: 55,
                        height: 55,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.95)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                      }}>
                        <WarningIcon sx={{
                          fontSize: 39,
                          color: "#dc2626",
                          animation: "pulse 0.5s infinite"
                        }} />
                      </Box>
                      <Box>
                        <Typography level="h3" sx={{
                          fontWeight: 700,
                          color: "#ff0000ff",
                          mb: 0.5,
                          animation: "pulse 0.8s infinite",
                          textShadow: "0 2px 4px rgba(255, 255, 255, 0.3)"
                        }}>
                          Risk Alert - Late Starts || Production Risk Alert
                        </Typography>

                        <Typography level="body-xs" sx={{
                          color: "#fef2f2",
                          fontWeight: 500
                        }}>
                          Late starts detected across multiple processes
                        </Typography>
                      </Box>
                    </Box>
                    {/* Alert Items */}
                    <Box sx={{ mb: 1 }}>
                      {LATE_STARTS.map(({ day, delay, risk, sone }, index) => (
                        <Box
                          key={day}
                          sx={{
                            p: 1,
                            mb: 0.8,
                            background: "#ffffffca",
                            borderRadius: 8,
                            // border: risk === 'Critical'
                            //   ? "2px solid #dc2626"
                            //   : "2px solid #f59e0b",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              transform: "translateY(-1px)"
                            }
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <Typography level="title-sm" sx={{
                              color: "#111827",
                              fontWeight: 600
                            }}>
                              {day}
                            </Typography>
                            <Chip
                              size="sm"
                              variant="solid"
                              color={risk === 'Critical' ? 'danger' : 'warning'}
                              sx={{ fontWeight: 600 }}
                            >
                              {risk}
                            </Chip>
                          </Box>

                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{
                              p: 1.2,
                              bgcolor: risk === 'Critical' ? "#fef2f2" : "#fefbf3",
                              borderRadius: 6,
                              textAlign: "center",
                              border: risk === 'Critical' ? "1px solid #fecaca" : "1px solid #fed7aa"
                            }}>
                              <Typography level="body-xs" sx={{
                                color: risk === 'Critical' ? "#dc2626" : "#d97706",
                                fontWeight: 600,
                                mb: 0.5
                              }}>
                                Delay Hours
                              </Typography>
                              <Typography level="h4" sx={{
                                color: "#111827",
                                fontWeight: 700
                              }}>
                                {delay}h
                              </Typography>
                            </Box>

                            <Typography level="body-sm" sx={{
                              color: "#dc2626",
                              fontWeight: 600,
                              fontSize: 14,
                              textAlign: "center",
                              flex: 1
                            }}>
                              {sone}
                            </Typography>

                            <Box sx={{
                              width: 32,
                              height: 10,
                              borderRadius: "50%",
                              bgcolor: risk === 'Critical' ? "#fef2f2" : "#fefbf3",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              <TrendingDownIcon sx={{
                                fontSize: 16,
                                color: risk === 'Critical' ? "#dc2626" : "#d97706"
                              }} />
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    {/* Alert Banner */}
                    <Box sx={{
                      p: 1.5,
                      bgcolor: "linear-gradient(90deg,#f87171 45%,#fde68a 100%)",
                      borderRadius: 5,
                      textAlign: "center",
                      boxShadow: "0 1px 6px #ef444420",
                      fontWeight: 700,
                      color: "#fff",
                      animation: "fadeAlert 1.5s cubic-bezier(.13,.45,.23,.68)"
                    }}>
                      <Typography level="body-xs" sx={{ fontWeight: 700, fontSize:16,color:"#ffffffff" }}>
                        ⚠️ Immediate action required! Late starts are putting {UNITS_AT_RISK} units at risk of delayed delivery.
                      </Typography>
                    </Box>

                    {/* Impact Analysis */}
                    {/* <Box>

                      <Box>
                        <Typography level="title-sm" sx={{
                          color: "#ffffffff",
                          mb: 1,
                          fontWeight: 700
                        }}>
                          Impact Analysis
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid xs={6}>
                            <Box sx={{
                              p: 2,
                              bgcolor: "#ffffff",
                              border: "2px solid #fee2e2",
                              borderRadius: 8,
                              textAlign: "center"
                            }}>
                              <Typography level="h3" sx={{
                                color: "#dc2626",
                                fontWeight: 800,
                                mb: 0.5
                              }}>
                                {TOTAL_DELAY_HOURS}h
                              </Typography>
                              <Typography level="body-xs" sx={{
                                color: "#6b7280",
                                fontWeight: 600
                              }}>
                                Total Delay
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid xs={6}>
                            <Box sx={{
                              p: 2,
                              bgcolor: "#ffffff",
                              border: "2px solid #fed7aa",
                              borderRadius: 8,
                              textAlign: "center"
                            }}>
                              <Typography level="h3" sx={{
                                color: "#d97706",
                                fontWeight: 800,
                                mb: 0.5
                              }}>
                                {UNITS_AT_RISK}
                              </Typography>
                              <Typography level="body-xs" sx={{
                                color: "#6b7280",
                                fontWeight: 600
                              }}>
                                Units at Risk
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box> */}
                  </Card>

                </Grid>

              </Grid>

              {/* Performance Metrics Footer */}
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{
                    p: 3,
                    background: "rgba(14, 204, 237, 0.12)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "1px solid rgba(6, 182, 212, 0.6)",
                      transform: "translateY(-4px)"
                    }
                  }}>
                    <Typography level="body-xs" sx={{ color: "#02d9ffff", stroke: "#000", mb: 1, fontWeight: 600 }}>
                      EFFICIENCY RATE
                    </Typography>
                    <Typography level="h2" sx={{ color: "#fff", WebkitTextStroke: '0.8px black', fontWeight: 800 }}>
                      87%
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <TrendingUpIcon sx={{ fontSize: 16, color: "#22c55e" }} />
                      <Typography level="body-xs" sx={{ color: "#22c55e", fontWeight: 600 }}>
                        +5% from last week
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{
                    p: 3,
                    background: "rgba(245, 158, 11, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "1px solid rgba(245, 158, 11, 0.6)",
                      transform: "translateY(-4px)"
                    }
                  }}>
                    <Typography level="body-xs" sx={{ color: "#f59e0b", mb: 1, fontWeight: 600 }}>
                      DEFECT RATE
                    </Typography>
                    <Typography level="h2" sx={{ color: "#fff", WebkitTextStroke: '0.9px black', fontWeight: 800 }}>
                      2.3%
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <TrendingDownIcon sx={{ fontSize: 16, color: "#22c55e" }} />
                      <Typography level="body-xs" sx={{ color: "#22c55e", fontWeight: 600 }}>
                        -0.8% improvement
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{
                    p: 3,
                    background: "rgba(139, 92, 246, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "1px solid rgba(139, 92, 246, 0.6)",
                      transform: "translateY(-4px)"
                    }
                  }}>
                    <Typography level="body-xs" sx={{ color: "#8b5cf6", mb: 1, fontWeight: 600 }}>
                      AVG CUTTING TIME
                    </Typography>
                    <Typography level="h2" sx={{ color: "#fff", WebkitTextStroke: '0.9px black', fontWeight: 800 }}>
                      3.2h
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <FlashOnIcon sx={{ fontSize: 16, color: "#fbbf24" }} />
                      <Typography level="body-xs" sx={{ color: "#fbbf24", fontWeight: 600 }}>
                        Optimal performance
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{
                    p: 3,
                    background: "rgba(34, 197, 94, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "1px solid rgba(34, 197, 94, 0.6)",
                      transform: "translateY(-4px)"
                    }
                  }}>
                    <Typography level="body-xs" sx={{ color: "#22c55e", mb: 1, fontWeight: 600 }}>
                      ON-TIME DELIVERY
                    </Typography>
                    <Typography level="h2" sx={{ color: "#fff", WebkitTextStroke: '0.8px black', fontWeight: 800 }}>
                      94%
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <TrendingUpIcon sx={{ fontSize: 16, color: "#22c55e" }} />
                      <Typography level="body-xs" sx={{ color: "#22c55e", fontWeight: 600 }}>
                        Excellent status
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}