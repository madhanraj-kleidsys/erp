// import React from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Card,
//   Select,
//   Option,
//   Sheet,Table,
//   Button,
// } from "@mui/joy";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import ContentCutIcon from "@mui/icons-material/ContentCut";
// import LayersIcon from "@mui/icons-material/Layers";
// import LinearScaleIcon from "@mui/icons-material/LinearScale";
// import WarningIcon from "@mui/icons-material/Warning";
// import TimelineIcon from "@mui/icons-material/Timeline";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   CartesianGrid,
//   Line,
//   Cell,
// } from "recharts";
// import Header from "../Header";
// import Sidebar from "../Sidebar";

// const CUT_PLAN_ACTUAL = [
//   { label: "Plan", value: 1000, color: "#60A5FA" },
//   { label: "Actual", value: 870, color: "#22C55E" },
// ];

// const READY_PANELS = 800;
// const REQUIREMENT_PANELS = 1000;
// const BALANCE_TO_CUT = 200;

// const LINES = ["Line 1", "Line 2", "Line 3"];
// const BLOCKS = ["Block A", "Block B"];
// const STYLES = ["Athletic", "Casual"];
// const COLORS = ["Red", "Blue", "Grey"];

// const DAILY_CUTTING_TREND = [
//   { day: "Mon", plan: 200, actual: 180 },
//   { day: "Tue", plan: 220, actual: 210 },
//   { day: "Wed", plan: 190, actual: 185 },
//   { day: "Thu", plan: 210, actual: 200 },
//   { day: "Fri", plan: 180, actual: 125 }, // Risk (late start)
//   { day: "Sat", plan: 150, actual: 70 },  // Risk (late start)
// ];

// const LATE_STARTS = [
//   { day: "Fri", delay: 2.5, risk: "High" },
//   { day: "Sat", delay: 4, risk: "Critical" },
// ];

// export default function CuttingDashboard({ selectedWeek = "W32" }) {
//   const [line, setLine] = React.useState(LINES[0]);
//   const [block, setBlock] = React.useState(BLOCKS[0]);
//   const [style, setStyle] = React.useState(STYLES[0]);
//   const [color, setColor] = React.useState(COLORS[0]);
//   const deliveryWeek = "W34";

//   return (
//     <Box sx={{ display: "flex", minHeight: "100dvh"  }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Header />
//         <Box sx={{ pt: 3, pb: 2, flex: 1, display: "flex", flexDirection: "column", minWidth: 0, gap: 2 }}>
//           {/* Title Bar */}
//            <Sheet
//                                    sx={{
//                                        display: "flex",
//                                        justifyContent: "space-between",
//                                        alignItems: "center",
//                                        px: { xs: 2, md: 4 },
//                                        p: { xs: 3, md: 4 },
//                                        borderRadius: 12,
//                                        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
//                                        color: "#ffffff"
//                                    }}>
//                                    <Typography level="h3" sx={{ fontWeight: 700, color: "#fff" }}>
//                                        4-Week Planning Dashboard - Cutting Dashboard
//                                    </Typography>
//                                    <Box sx={{
//                                        display: "flex",
//                                        gap: { xs: 2, sm: 4 },
//                                        flexWrap: "wrap"
//                                    }}>
//                                        <Box>
//                                            <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.8)", mb: 0.5 }}>
//                                                Current Week
//                                            </Typography>
//                                            <Typography level="title-lg" sx={{ fontWeight: 700, color: "#fff" }}>
//                                                {selectedWeek}
//                                            </Typography>
//                                        </Box>
//                                        <Box>
//                                            <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.8)", mb: 0.5 }}>
//                                                Delivery Week
//                                            </Typography>
//                                            <Typography level="title-lg" sx={{ fontWeight: 700, color: "#fff" }}>
//                                                {deliveryWeek}
//                                            </Typography>
//                                        </Box>
//                                    </Box>
//                                </Sheet>

//           {/* Cards Row */}
//           <Grid container spacing={2} sx={{ mb: 3 }}>
//             {/* Cut Plan vs Actual */}
//             <Grid xs={12} sm={6} md={3}>
//               <Card sx={{
//                 p: 3, boxShadow: "0 10px 25px rgba(96,165,250,0.08)", background: "linear-gradient(135deg, #DBEAFE 0%, #60A5FA 100%)", borderRadius: 3,
//               }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                   <ContentCutIcon sx={{ color: "#3B82F6", fontSize: 26, mr: 1 }} />
//                   <Typography level="title-lg">Cut Plan vs Actual</Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Box textAlign="center">
//                     <Typography level="h4" sx={{ color: "#2563EB", fontWeight: 700 }}>{CUT_PLAN_ACTUAL[0].value}</Typography>
//                     <Typography level="body-sm">Plan</Typography>
//                   </Box>
//                   <Box textAlign="center">
//                     <Typography level="h4" sx={{ color: "#22C55E", fontWeight: 700 }}>{CUT_PLAN_ACTUAL[1].value}</Typography>
//                     <Typography level="body-sm">Actual</Typography>
//                   </Box>
//                 </Box>
//               </Card>
//             </Grid>
//             {/* Ready Panels vs Requirement */}
//             <Grid xs={12} sm={6} md={3}>
//               <Card sx={{
//                 p: 3, background: "linear-gradient(135deg, #F1F5F9 0%, #F59E42 100%)", borderRadius: 3, boxShadow: "0 10px 25px rgba(245,158,66,0.08)",
//               }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                   <LayersIcon sx={{ color: "#F59E42", fontSize: 26, mr: 1 }} />
//                   <Typography level="title-lg">Ready Panels</Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Box textAlign="center">
//                     <Typography level="h4" sx={{ color: "#F59E42", fontWeight: 700 }}>{READY_PANELS}</Typography>
//                     <Typography level="body-sm">Ready</Typography>
//                   </Box>
//                   <Box textAlign="center">
//                     <Typography level="h4" sx={{ color: "#EF4444", fontWeight: 700 }}>{REQUIREMENT_PANELS}</Typography>
//                     <Typography level="body-sm">Required</Typography>
//                   </Box>
//                 </Box>
//               </Card>
//             </Grid>
//             {/* Balance to Cut */}
//             <Grid xs={12} sm={6} md={3}>
//               <Card sx={{
//                 p: 3, background: "linear-gradient(135deg, #D1FAE5 0%, #34D399 100%)", borderRadius: 3, boxShadow: "0 10px 25px rgba(34,211,99,0.08)",
//               }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                   <LinearScaleIcon sx={{ color: "#10B981", fontSize: 26, mr: 1 }} />
//                   <Typography level="title-lg">Balance to Cut</Typography>
//                 </Box>
//                 <Typography level="h3" sx={{ color: "#059669", fontWeight: 700 }}>{BALANCE_TO_CUT}</Typography>
//               </Card>
//             </Grid>
//             {/* Drill-down */}
//             <Grid xs={12} sm={6} md={3}>
//               <Card sx={{
//                 p: 3, background: "linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)", minHeight: 150, borderRadius: 3,
//               }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                   <AssessmentIcon sx={{ color: "#0EA5E9", fontSize: 26, mr: 1 }} />
//                   <Typography level="title-lg">Drill Down</Typography>
//                 </Box>
//                 <Box sx={{ mb: 1 }}>
//                   <Select value={line} onChange={(e, val) => setLine(val)} sx={{ width: "100%", mb: 1 }}>
//                     {LINES.map(l => <Option key={l} value={l}>{l}</Option>)}
//                   </Select>
//                   <Select value={block} onChange={(e, val) => setBlock(val)} sx={{ width: "100%", mb: 1 }}>
//                     {BLOCKS.map(b => <Option key={b} value={b}>{b}</Option>)}
//                   </Select>
//                   <Select value={style} onChange={(e, val) => setStyle(val)} sx={{ width: "100%", mb: 1 }}>
//                     {STYLES.map(s => <Option key={s} value={s}>{s}</Option>)}
//                   </Select>
//                   <Select value={color} onChange={(e, val) => setColor(val)} sx={{ width: "100%" }}>
//                     {COLORS.map(c => <Option key={c} value={c}>{c}</Option>)}
//                   </Select>
//                 </Box>
//                 <Button variant="solid" sx={{ bgcolor: "#2563EB" }}>Drilldown Details</Button>
//               </Card>
//             </Grid>
//           </Grid>

//           {/* Charts Row */}
//           <Grid  >
//             {/* Daily Cutting Trend */}
//             <Grid xs={12} md={6}>
//               <Card sx={{ p: 3,   borderRadius: 3 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                   <TimelineIcon sx={{ mr: 1, color: "#2881ecff" }} />
//                   <Typography level="title-lg" sx={{ color: "#7864ecff" }}>Daily Cutting Trend</Typography>
//                 </Box>
//                 <ResponsiveContainer width="100%" height={170}>
//                   <LineChart data={DAILY_CUTTING_TREND}>
//                     <CartesianGrid stroke="#525569" strokeDasharray="8 8" />
//                     <XAxis dataKey="day" tick={{ fill: "#000000ff" }} />
//                     <YAxis tick={{ fill: "#000000ff" }} />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="plan"
//                       stroke="#2563EB"
//                       strokeWidth={4}
//                       dot={{ r: 5, fill: "#fff", stroke: "#2563EB", strokeWidth: 2 }}
//                       name="Plan"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="actual"
//                       stroke="#22C55E"
//                       strokeWidth={4}
//                       dot={{ r: 5, fill: "#fff", stroke: "#22C55E", strokeWidth: 2 }}
//                       name="Actual"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </Card>
//             </Grid>

//           </Grid>
//               {/* Risk Highlight for Late Starts */}
//             <Grid xs={12} md={6}>
//               <Card sx={{ p: 3, background:'#9987873a', borderRadius: 3, color: "#fff" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                   <WarningIcon sx={{ mr: 1, color: "#ef4444" }} />
//                   <Typography level="title-lg" sx={{ color: "#ef4444" }}>Risk Highlight - Late Starts</Typography>
//                 </Box>
//                 <Table size="sm" sx={{ mb: 2 }}>
//                   <thead>
//                     <tr>
//                       <th style={{ color: "#ef4444", fontWeight: 600 }}>Day</th>
//                       <th style={{ color: "#ef4444", fontWeight: 600 }}>Delay Hours</th>
//                       <th style={{ color: "#ef4444", fontWeight: 600 }}>Risk Level</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {LATE_STARTS.map(({ day, delay, risk }) => (
//                       <tr key={day}>
//                         <td style={{ color: "#000000ff", fontWeight: 500 }}>{day}</td>
//                         <td style={{ color: "#fde68a", fontWeight: 500 }}>{delay}</td>
//                         <td style={{
//                           color: risk === 'Critical' ? "#ef4444" : "#eb9500ff",
//                           fontWeight: 700
//                         }}>{risk}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//                 <Typography level="body-sm" sx={{ color: "#ef4444", fontWeight: 600 }}>
//                   Late starts on these days may cause delivery risks.
//                 </Typography>
//               </Card>
//             </Grid>
//         </Box>
//       </Box>
//     </Box>
//   );
// }






import React from "react";
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

const LINES = ["Line 1", "Line 2", "Line 3"];
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

const LATE_STARTS = [
  { day: "Fri", delay: 2.5, risk: "High" },
  { day: "Sat", delay: 4, risk: "Critical" },
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

export default function CuttingDashboard({ selectedWeek = "W40" }) {
  const [line, setLine] = React.useState(LINES[0]);
  const [block, setBlock] = React.useState(BLOCKS[0]);
  const [style, setStyle] = React.useState(STYLES[0]);
  const [color, setColor] = React.useState(COLORS[0]);
  const deliveryWeek = "W42";

  const actualPercent = ((CUT_PLAN_ACTUAL[1].value / CUT_PLAN_ACTUAL[0].value) * 100).toFixed(1);
  const readyPercent = ((READY_PANELS / REQUIREMENT_PANELS) * 100).toFixed(1);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Header />
          <Box sx={{ pt: 3, pb: 2, flex: 1, display: "flex", flexDirection: "column", minWidth: 0, gap: 2 }}>
            {/* Title Bar */}
            <Sheet
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, md: 4 },
                p: { xs: 3, md: 4 },
                borderRadius: 12,
                // background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                color: "#ffffff",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 8s ease infinite",
              }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ContentCutIcon sx={{ fontSize: 48, color: "#fff", animation: "float 4s ease-in-out infinite" }} />
                <Box>
                  <Typography level="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                    Cutting Dashboard
                  </Typography>
                  <Typography level="body-md" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                    Real-Time Production Monitoring
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
            <Box sx={{ minHeight: "100vh", p: { xs: 2, sm: 3, md: 4 } }}>

              {/* KPI Cards - Animated */}
     {/* KPI Cards - Professional & Compact */}
<Grid container spacing={2.5} sx={{ mb: 3 }}>
  {/* Cut Plan vs Actual */}
  <Grid xs={12} sm={6} lg={3}>
    <Card
      sx={{
        p: 2.5,
        height: "100%",
        background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #312e81 100%)", // Professional navy blue
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
              borderRadius: 1,
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
    <Card sx={{
      p: 2.5,
      height: "100%",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", // Professional light gray
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(71, 85, 105, 0.2)",
      boxShadow: "0 4px 16px rgba(71, 85, 105, 0.1)",
      transition: "all 0.4s ease",
      "&:hover": {
        border: "1px solid rgba(71, 85, 105, 0.3)",
        boxShadow: "0 8px 24px rgba(71, 85, 105, 0.15)",
      }
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
        <AssessmentIcon sx={{ color: "#475569", fontSize: 24 }} />
        <Typography level="title-md" sx={{ fontWeight: 600, color: "#1e293b" }}>
          Filter & Search
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box>
          <Typography level="body-xs" sx={{ mb: 0.5, fontWeight: 600, color: "#475569" }}>
            Line
          </Typography>
          <Select
            value={line}
            onChange={(e, val) => setLine(val)}
            sx={{
              width: "100%",
              bgcolor: "#ffffff",
              fontSize: "0.8rem",
              minHeight: "32px"
            }}
          >
            {LINES.map(l => <Option key={l} value={l}>{l}</Option>)}
          </Select>
        </Box>
        <Box>
          <Typography level="body-xs" sx={{ mb: 0.5, fontWeight: 600, color: "#475569" }}>
            Block
          </Typography>
          <Select
            value={block}
            onChange={(e, val) => setBlock(val)}
            sx={{
              width: "100%",
              bgcolor: "#ffffff",
              fontSize: "0.8rem",
              minHeight: "32px"
            }}
          >
            {BLOCKS.map(b => <Option key={b} value={b}>{b}</Option>)}
          </Select>
        </Box>
        <Box>
          <Typography level="body-xs" sx={{ mb: 0.5, fontWeight: 600, color: "#475569" }}>
            Style
          </Typography>
          <Select
            value={style}
            onChange={(e, val) => setStyle(val)}
            sx={{
              width: "100%",
              bgcolor: "#ffffff",
              fontSize: "0.8rem",
              minHeight: "32px"
            }}
          >
            {STYLES.map(s => <Option key={s} value={s}>{s}</Option>)}
          </Select>
        </Box>
        <Box>
          <Typography level="body-xs" sx={{ mb: 0.5, fontWeight: 600, color: "#475569" }}>
            Color
          </Typography>
          <Select
            value={color}
            onChange={(e, val) => setColor(val)}
            sx={{
              width: "100%",
              bgcolor: "#ffffff",
              fontSize: "0.8rem",
              minHeight: "32px"
            }}
          >
            {COLORS.map(c => <Option key={c} value={c}>{c}</Option>)}
          </Select>
        </Box>
        <Button
          variant="solid"
          sx={{
            mt: 1,
            background: "linear-gradient(135deg, #475569 0%, #334155 100%)",
            fontWeight: 600,
            fontSize: "0.8rem",
            minHeight: "36px",
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
                <Grid xs={12} lg={7}>
                  <Card sx={{
                    p: 4,
                    background: "rgba(30, 41, 59, 0.6)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    boxShadow: "0 8px 32px rgba(99, 102, 241, 0.2)",
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                      <TimelineIcon sx={{ fontSize: 28, color: "#6366f1" }} />
                      <Typography level="title-lg" sx={{ fontWeight: 700, color: "#fff" }}>
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

                {/* Risk Highlight */}
                <Grid xs={12} lg={5}>
                  <Card sx={{
                    p: 4,
                    height: "100%",
                    background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "2px solid rgba(239, 68, 68, 0.5)",
                    boxShadow: "0 8px 32px rgba(239, 68, 68, 0.3)",
                    animation: "glow 3s ease-in-out infinite",
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                      <WarningIcon sx={{ fontSize: 32, color: "#ef4444", animation: "pulse 2s ease-in-out infinite" }} />
                      <Typography level="title-lg" sx={{ fontWeight: 700, color: "#ef4444" }}>
                        Risk Alert - Late Starts
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      {LATE_STARTS.map(({ day, delay, risk }, index) => (
                        <Box
                          key={day}
                          sx={{
                            p: 3,
                            mb: 2,
                            background: risk === 'Critical'
                              ? "linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.2) 100%)"
                              : "linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.2) 100%)",
                            borderRadius: 3,
                            border: risk === 'Critical'
                              ? "2px solid rgba(239, 68, 68, 0.6)"
                              : "2px solid rgba(251, 191, 36, 0.6)",
                            backdropFilter: "blur(10px)",
                            animation: `slideIn 0.5s ease-out ${index * 0.2}s both`,
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography level="title-md" sx={{ color: "#fff", fontWeight: 700 }}>
                              {day}
                            </Typography>
                            <Chip
                              size="lg"
                              sx={{
                                bgcolor: risk === 'Critical' ? "#dc2626" : "#f59e0b",
                                color: "#fff",
                                fontWeight: 800,
                                animation: "pulse 2s ease-in-out infinite"
                              }}
                            >
                              {risk}
                            </Chip>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{
                              p: 2,
                              bgcolor: "rgba(255,255,255,0.1)",
                              borderRadius: 2,
                              backdropFilter: "blur(5px)"
                            }}>
                              <Typography level="body-xs" sx={{ color: "#94a3b8", mb: 0.5 }}>
                                Delay Hours
                              </Typography>
                              <Typography level="h3" sx={{ color: "#fff", fontWeight: 800 }}>
                                {delay}h
                              </Typography>
                            </Box>
                            <TrendingDownIcon sx={{ fontSize: 32, color: risk === 'Critical' ? "#ef4444" : "#f59e0b" }} />
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    <Box sx={{
                      p: 3,
                      bgcolor: "rgba(239, 68, 68, 0.2)",
                      borderRadius: 3,
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      backdropFilter: "blur(10px)"
                    }}>
                      <Typography level="body-sm" sx={{ color: "#fca5a5", fontWeight: 700, textAlign: "center" }}>
                        ⚠️ Late starts may cause delivery risks - Immediate action required!
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                      <Typography level="body-xs" sx={{ color: "#94a3b8", mb: 2, fontWeight: 600 }}>
                        Impact Analysis
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid xs={6}>
                          <Box sx={{
                            p: 2,
                            bgcolor: "rgba(239, 68, 68, 0.15)",
                            borderRadius: 2,
                            textAlign: "center"
                          }}>
                            <Typography level="h4" sx={{ color: "#ef4444", fontWeight: 800 }}>
                              6.5h
                            </Typography>
                            <Typography level="body-xs" sx={{ color: "#fca5a5" }}>
                              Total Delay
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid xs={6}>
                          <Box sx={{
                            p: 2,
                            bgcolor: "rgba(239, 68, 68, 0.15)",
                            borderRadius: 2,
                            textAlign: "center"
                          }}>
                            <Typography level="h4" sx={{ color: "#ef4444", fontWeight: 800 }}>
                              130
                            </Typography>
                            <Typography level="body-xs" sx={{ color: "#fca5a5" }}>
                              Units at Risk
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              </Grid>

              {/* Performance Metrics Footer */}
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{
                    p: 3,
                    background: "rgba(6, 182, 212, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "1px solid rgba(6, 182, 212, 0.6)",
                      transform: "translateY(-4px)"
                    }
                  }}>
                    <Typography level="body-xs" sx={{ color: "#06b6d4", mb: 1, fontWeight: 600 }}>
                      EFFICIENCY RATE
                    </Typography>
                    <Typography level="h2" sx={{ color: "#fff", fontWeight: 800 }}>
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
                    <Typography level="h2" sx={{ color: "#fff", fontWeight: 800 }}>
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
                    <Typography level="h2" sx={{ color: "#fff", fontWeight: 800 }}>
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
                    <Typography level="h2" sx={{ color: "#fff", fontWeight: 800 }}>
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