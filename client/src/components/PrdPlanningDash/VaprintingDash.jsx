import React from "react";
// VAP Load Activity
import { useLocation } from "react-router-dom";
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Select,
    Option,
    Button,
    Chip, Sheet,
    LinearProgress,
    Table
} from "@mui/joy";
import PrintIcon from "@mui/icons-material/Print";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PieChartIcon from "@mui/icons-material/PieChart";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import FilterListIcon from "@mui/icons-material/FilterList";
import HeatMap from "@uiw/react-heat-map";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import ReplyIcon from '@mui/icons-material/Reply';
import ScrollToTop from "../ScrollToTop";

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                background: {
                    body: "#f1f5f9",
                    surface: "#ffffff",
                },
            },
        },
    },
});

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid, AreaChart, Area
} from "recharts";

// Mock Data
const PRINTING_STATUS = {
    completed: 1250,
    inProgress: 180,
    pending: 95,
    delayed: 32,
};


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

const BALANCE_TO_PRINT = 275;
const DELAYED_PANELS = 32;

const CUSTOMERS = ["WALMART", "GROUP AUCHAN", "H&M", "KMART AUSTRALIA"];
const STYLES = ["Graphic Tee", "Logo Print", "All-Over Print"];
const PROCESS_DATES = ["2025-10-15", "2025-10-16", "2025-10-17"];

const PRINTING_PIE_DATA = [
    { name: "Completed", value: 1250, color: "#22C55E" },
    { name: "In Progress", value: 180, color: "#3B82F6" },
    { name: "Pending", value: 95, color: "#F59E0B" },
    { name: "Delayed", value: 32, color: "#EF4444" },
];

const HEATMAP_DATA = [
    { date: "Oct 15", load: 85, status: "high" },
    { date: "Oct 16", load: 92, status: "critical" },
    { date: "Oct 17", load: 67, status: "medium" },
    { date: "Oct 18", load: 45, status: "low" },
    { date: "Oct 19", load: 73, status: "medium" },
    { date: "Oct 20", load: 88, status: "high" },
];

const dates = ["2025-10-01", "2025-10-02", "2025-10-03"]; // date labels
const lines = ["VAP Load"];
const data = [
    [85, 92, 67], // Each number is the VAP load for that corresponding date
];

const DELAY_TRACKER = [
    { customer: "MAX H0OLDINGS", style: "Graphic Tee", delay: "2 days", risk: "Medium" },
    { customer: "H&M", style: "Logo Print", delay: "4 days", risk: "High" },
    { customer: "WALMART", style: "All-Over Print", delay: "1 day", risk: "Low" },
];
// { selectedWeek = "W40" }
export default function VAPDashboard() {
    const location = useLocation();
    const { selectedWeek } = location.state || { selectedWeek: "default val eror" };
    const weekNumber = parseInt(selectedWeek.replace(/\D/g, ""), 10);
    const deliveryWeekNumber = weekNumber + 2;
    const deliveryWeek = `W${deliveryWeekNumber}`;

    const [customer, setCustomer] = React.useState(CUSTOMERS[0]);
    const [style, setStyle] = React.useState(STYLES[0]);
    const [processDate, setProcessDate] = React.useState(PROCESS_DATES[0]);

    // const deliveryWeek = "W42";
    const completionRate = (PRINTING_STATUS.completed / (PRINTING_STATUS.completed + PRINTING_STATUS.inProgress + PRINTING_STATUS.pending + PRINTING_STATUS.delayed)) * 100;


    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <ScrollToTop />
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
                                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                                color: "#ffffff"
                            }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <button onClick={() => window.history.back()} style={{ border: 'none', display: 'flex', alignItems: 'center', background: "none" }} >
                                    <ReplyIcon sx={{ fontSize: 50, color: "#fff", marginRight: 0.5, cursor: "pointer" }} />
                                </button>
                                <PrintIcon sx={{ fontSize: 32, color: "#ffffffff", mr: 1, animation: "float 4s ease-in-out infinite" }} />
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                    width: "100%"
                                }}>
                                    <Typography level="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                                        VAP Printing Dashboard
                                    </Typography>
                                    <Typography level="body-sm" sx={{ opacity: 0.8, color: "#fff" }}>
                                        Monitor printing operations and track delivery commitments
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

                            {/* Key Metrics Cards */}
                            <Grid container spacing={3}>
                                {/* Panel Printing Completion */}
                                <Grid xs={12} md={6} lg={3}>
                                    <Card sx={{
                                        height: "100%",
                                        background: "linear-gradient(135deg, #E8F5E8 0%, #4CAF50 100%)",
                                        border: "none",
                                        boxShadow: "0 8px 24px rgba(76, 175, 80, 0.12)"
                                    }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                <CheckCircleIcon sx={{ fontSize: 32, color: "#2E7D32", mr: 1 }} />
                                                <Typography level="title-md" sx={{ fontWeight: 700, color: "#1B5E20" }}>
                                                    Printing Completion
                                                </Typography>
                                            </Box>
                                            <Typography level="h1" sx={{ fontWeight: 800, color: "#1B5E20", mb: 1 }}>
                                                {PRINTING_STATUS.completed}
                                            </Typography>
                                            {/* <LinearProgress
                                            determinate
                                            value={completionRate}
                                            sx={{ mb: 1, height: 8, borderRadius: 4 }}
                                            color="success"
                                        /> */}

                                            <Box sx={{ width: "100%", height: 8, bgcolor: "rgba(255, 255, 255, 1)", borderRadius: 5, overflow: "hidden" }}>
                                                <Box
                                                    sx={{
                                                        width: `80.3%`,
                                                        height: "100%",
                                                        bgcolor: "#156118ff",
                                                        transition: "width 0.5s ease"
                                                    }}
                                                />
                                            </Box>
                                            <Typography level="body-sm" sx={{ color: "#2E7D32", fontWeight: 600 }}>
                                                {completionRate.toFixed(1)}% Complete
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Balance to Print */}
                                <Grid xs={12} md={6} lg={3}>
                                    <Card sx={{
                                        height: "100%",
                                        background: "linear-gradient(135deg, #FFF3CD 0%, #FF9800 100%)",
                                        border: "none",
                                        boxShadow: "0 8px 24px rgba(255, 152, 0, 0.12)"
                                    }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                                <PrintIcon sx={{ fontSize: 32, color: "#E65100", mr: 1 }} />
                                                <Typography level="title-md" sx={{ fontWeight: 700, color: "#BF360C" }}>
                                                    Balance to Print
                                                </Typography>
                                            </Box>
                                            <Typography level="h1" sx={{ fontWeight: 800, color: "#BF360C", mb: 2 }}>
                                                {BALANCE_TO_PRINT}
                                            </Typography>
                                            <Chip size="sm" color="warning" sx={{ fontWeight: 600 }}>
                                                Panels Remaining
                                            </Chip>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Delay Tracker */}
                                <Grid xs={12} md={6} lg={3}>
                                    <Card sx={{
                                        height: "100%",
                                        background: "linear-gradient(135deg, #FFEBEE 0%, #F44336 100%)",
                                        border: "none",
                                        boxShadow: "0 8px 24px rgba(244, 67, 54, 0.12)"
                                    }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                                <WarningIcon sx={{ fontSize: 32, color: "#C62828", mr: 1 }} />
                                                <Typography level="title-md" sx={{ fontWeight: 700, color: "#B71C1C" }}>
                                                    Late Starts
                                                </Typography>
                                            </Box>
                                            <Typography level="h1" sx={{ fontWeight: 800, color: "#B71C1C", mb: 2 }}>
                                                {DELAYED_PANELS}
                                            </Typography>
                                            <Chip size="sm" color="danger" sx={{ fontWeight: 600 }}>
                                                Panels Delayed
                                            </Chip>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Drill-down Filters */}
                                <Grid xs={12} md={6} lg={3}>
                                    <Card sx={{
                                        height: "100%",
                                        background: "linear-gradient(135deg, #E3F2FD 0%, #2196F3 100%)",
                                        border: "none",
                                        boxShadow: "0 8px 24px rgba(33, 150, 243, 0.12)"
                                    }}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                                <FilterListIcon sx={{ fontSize: 32, color: "#0D47A1", mr: 1 }} />
                                                <Typography level="title-md" sx={{ fontWeight: 700, color: "#0D47A1" }}>
                                                    Filter & Drill Down
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                                <Select
                                                    placeholder="Select Customer"
                                                    value={customer}
                                                    onChange={(e, val) => setCustomer(val)}
                                                    // sx={{ bgcolor: "rgba(255,255,255,0.9)", color: "#000" }}
                                                >
                                                    {CUSTOMERS.map(c => <Option key={c} value={c}>{c}</Option>)}
                                                </Select>
                                                <Select
                                                    placeholder="Select Style"
                                                    value={style}
                                                    onChange={(e, val) => setStyle(val)}
                                                    // sx={{ bgcolor: "rgba(255,255,255,0.9)", color: "#000" }}

                                                >
                                                    {STYLES.map(s => <Option key={s} value={s}>{s}</Option>)}
                                                </Select>
                                                <Select
                                                    placeholder="Process Date"
                                                    value={processDate}
                                                    onChange={(e, val) => setProcessDate(val)}
                                                    // sx={{ bgcolor: "rgba(255,255,255,0.9)",color:"#000" }}

                                                >
                                                    {PROCESS_DATES.map(d => <Option key={d} value={d}>{d}</Option>)}
                                                </Select>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Visual Analytics */}
                            <Grid container spacing={3} sx={{ mb: 2 }}>
                                {/* Printing Status Pie Chart */}
                                <Grid xs={12} lg={6}>
                                    <Card sx={{
                                        // background: "white",
                                        border: "1px solid #E2E8F0",
                                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        borderRadius: 3
                                    }}>
                                        <CardContent sx={{ p: 1, pt: 1 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                <PieChartIcon sx={{ fontSize: 28, color: "#3B82F6", mr: 2 }} />
                                                <Typography level="title-lg" sx={{ fontWeight: 700 }}>
                                                    Printing Status Distribution
                                                </Typography>
                                            </Box>
                                            <ResponsiveContainer width="100%" height={280}>
                                                <PieChart>
                                                    <Pie
                                                        data={PRINTING_PIE_DATA}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={100}
                                                        paddingAngle={3}
                                                        dataKey="value"
                                                    >
                                                        {PRINTING_PIE_DATA.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* VAP Load Heatmap */}
                                <Grid xs={12} lg={6}>
                                    <Card sx={{
                                        // background: "white",
                                        border: "1px solid #E2E8F0",
                                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        borderRadius: 3
                                    }}>
                                        <CardContent sx={{ p: 1, pt: 1 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                <CalendarViewWeekIcon sx={{ fontSize: 28, color: "#10B981", mr: 2 }} />
                                                <Typography level="title-lg" sx={{ fontWeight: 700 }}>
                                                    VAP Load by Date
                                                </Typography>
                                            </Box>
                                            <ResponsiveContainer width="100%" height={280}>
                                                <BarChart data={HEATMAP_DATA}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                                    <YAxis tick={{ fontSize: 12 }} />
                                                    <Tooltip />
                                                    <Bar dataKey="load" radius={[4, 4, 0, 0]}>
                                                        {HEATMAP_DATA.map((entry, index) => {
                                                            let color = "#22C55E";
                                                            if (entry.status === "high") color = "#F59E0B";
                                                            if (entry.status === "critical") color = "#EF4444";
                                                            if (entry.status === "medium") color = "#3B82F6";
                                                            return <Cell key={`cell-${index}`} fill={color} />;
                                                        })}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>

                                    {/* <HeatMap
                                        xLabels={dates}
                                        yLabels={lines}
                                        data={data}
                                        height={50}
                                        squares
                                        cellStyle={(_background, value) => ({
                                            background: `rgba(59,130,246,${value / 100})`,
                                            color: "#fff",
                                            fontWeight: 600
                                        })}
                                        cellRender={value => value && `${value}%`}
                                    /> */}

                                </Grid>
                            </Grid>

                            {/* Delay Tracker Table */}
                            <Card sx={{
                                // background: "white",
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                borderRadius: 3
                            }}>
                                <CardContent sx={{ p: 1, pt: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, }}>
                                        <ScheduleIcon sx={{ fontSize: 28, color: "#ff0000ff", mr: 2 }} />
                                        <Typography level="title-lg" sx={{
                                            fontWeight: 700,
                                            animation: "pulse 0.5s infinite"
                                        }}>
                                            Delay Tracker - Panels Started Late
                                        </Typography>
                                    </Box>
                                    <Table sx={{ minWidth: 650 }} aria-label="delay tracker table">
                                        <thead>
                                            <tr>
                                                <th style={{ fontWeight: 700, fontSize: 14 }}>Customer</th>
                                                <th style={{ fontWeight: 700, fontSize: 14 }}>Style</th>
                                                <th style={{ fontWeight: 700, fontSize: 14 }}>Delay</th>
                                                <th style={{ fontWeight: 700, fontSize: 14 }}>Risk Level</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DELAY_TRACKER.map((row, index) => (
                                                <tr key={index}>
                                                    <td style={{ padding: 16, fontSize: 14, fontWeight: 500 }}>
                                                        {row.customer}
                                                    </td>
                                                    <td style={{ padding: 16, fontSize: 14 }}>{row.style}</td>
                                                    <td style={{ padding: 16, fontSize: 14, fontWeight: 600, color: "#EF4444" }}>
                                                        {row.delay}
                                                    </td>
                                                    <td style={{ padding: 16 }}>
                                                        <Chip
                                                            size="sm"
                                                            color={
                                                                row.risk === "High" ? "danger" :
                                                                    row.risk === "Medium" ? "warning" : "success"
                                                            }
                                                            sx={{ fontWeight: 600 }}
                                                        >
                                                            {row.risk}
                                                        </Chip>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardContent>
                            </Card>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
