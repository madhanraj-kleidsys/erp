import React from "react";
import { useLocation } from "react-router-dom";
import {
    Box, Grid, Typography, Card, Select, Option, Button, Sheet
} from "@mui/joy";
import TimelineIcon from "@mui/icons-material/Timeline";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, CartesianGrid, PieChart, Pie, Cell
} from "recharts";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import ReplyIcon from '@mui/icons-material/Reply';
import ScrollToTop from "../ScrollToTop";

import poPdf from '../../assets/po.pdf';

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

const FABRIC_STATUS = [
    { label: "Received", value: 580, color: "#10b981" },
    { label: "Not Received", value: 120, color: "#ef4444" },
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

const INSPECTION_COMPLETED = 640;
const BALANCE_TO_RECEIVE = 90;

const CUSTOMERS = ["H&M", "WALMART", "AUCHAN"];
const ARTICLES = ["Cotton Poplin", "Denim", "Linen"];
const FABRIC_PO = ["PO-1001", "PO-1002", "PO-1003"];

const FABRIC_INWARD_PROGRESS = [
    { week: "W33", received: 100 },
    { week: "W34", received: 110 },
    { week: "W35", received: 90 },
    { week: "W40", received: 90 },
    { week: "W41", received: 110 },
    { week: "W42", received: 120 },
    { week: "W43", received: 135 },
];

const AGEING_NOT_RECEIVED = [
    { days: "<7", count: 30, color: "#10b981" },
    { days: "7-14", count: 20, color: "#f59e0b" },
    { days: "15-21", count: 15, color: "#f97316" },
    { days: ">21", count: 8, color: "#ef4444" },
];

const SUPPLIER_PENDING = [
    { supplier: "ANDAVAR KAJA BUTTON", value: 30, color: "#3b82f6" },
    { supplier: "ASAD POWER TABLE CONTRACTOR", value: 18, color: "#f59e0b" },
    { supplier: "R.M.LAY & MANUAL CUTTING", value: 22, color: "#10b981" },
    { supplier: "KIRTHEEKA STITCHING", value: 22, color: "#86b910ff" },
    { supplier: "B.KANNAN GARMENTS", value: 22, color: "#e4771eff" },
    { supplier: "G.DEIVANAI STICKERING", value: 22, color: "#104bb9ff" },
    { supplier: "BHIMARAJ SUNANI DRIMMING & CHECKING CONTRACT", value: 22, color: "#b910a2ff" },
    { supplier: "Other", value: 12, color: "#64748b" },
];
// { selectedWeek = "W40" }
export default function FabricStoreDashboard() {
    const location = useLocation();
    const { selectedWeek } = location.state || { selectedWeek: "default err" };
    const weekNumber = parseInt(selectedWeek.replace(/\D/g, ""), 10);
    const deliveryWeekNumber = weekNumber + 3;
    const deliveryWeek = `W${deliveryWeekNumber}`;

    const [customer, setCustomer] = React.useState(CUSTOMERS[0]);
    const [article, setArticle] = React.useState(ARTICLES[0]);
    const [fabricPO, setFabricPO] = React.useState(FABRIC_PO[0]);
    // const deliveryWeek = "W43";

    const totalFabric = FABRIC_STATUS[0].value + FABRIC_STATUS[1].value;
    const receivedPercent = ((FABRIC_STATUS[0].value / totalFabric) * 100).toFixed(1);

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <ScrollToTop />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
                <Sidebar />
                <Box sx={{ flexGrow: 1, p: 1 }}>
                    <Header />
                    <Box sx={{ pt: 1, pb: 1, flex: 1, display: "flex", flexDirection: "column", minWidth: 0, gap: 2 }}>

                        {/* Title Bar */}
                        <Sheet
                            sx={{display: "flex",justifyContent: "space-between",alignItems: "center",px: { xs: 2, md: 4 },p: { xs: 3, md: 2 },borderRadius: 12,background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",color: "#ffffff" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }} >
                                <button onClick={() => window.history.back()} style={{ border: 'none', display: 'flex', alignItems: 'center', background: "none" }} >
                                    <ReplyIcon sx={{ fontSize: 50, color: "#fff", marginRight: 0.5, cursor: "pointer" }} />
                                </button>

                                <InventoryIcon sx={{ color: "#fff", fontSize: 35, animation: "float 4s ease-in-out infinite" }} />

                                <Box sx={{display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",gap: 1, width: "100%"}}>
                                    <Typography level="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                                        Fabric Store Dashboard
                                    </Typography>
                                    <Typography level="body-sm" sx={{ opacity: 0.8, color: "#fff" }}>
                                        Monitor Fabric Store and Inspection Status
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

                        <Box sx={{mt: -3, minHeight: "100vh",
                            // bgcolor: "#f1f5f9", 
                            p: { xs: 2, sm: 3, md: 3 }}}>

                            {/* KPI Cards */}
                            <Grid container spacing={1} sx={{ mb: 1 }}>
                                {/* Fabric Received Status */}
                                <Grid xs={12} sm={6} lg={3}>
                                    <Card
                                        sx={{
                                            p: 1.5,
                                            height: "100%",
                                            borderRadius: 8,
                                            background: "linear-gradient(135deg,#10b981 0%,#059669 100%)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 8px 16px rgba(16,185,129,0.24)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, p: 0.5 }}>
                                            <InventoryIcon sx={{ color: "#fff", fontSize: 30 }} />
                                            <Typography level="body-sm" sx={{ fontWeight: 500, color: "#fff", fontSize: 25 }}>
                                                Fabric Status
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-around", mb: 1 }}>
                                            <Box textAlign="center">
                                                <Typography level="h4" sx={{ fontWeight: 600, color: "#fff", mb: 0.3, fontSize: 25 }}>
                                                    {FABRIC_STATUS[0].value}
                                                </Typography>
                                                <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.8)", fontSize: 20 }}>
                                                    Fabric Received
                                                </Typography>
                                            </Box>
                                            <Box sx={{ width: '1px', bgcolor: 'rgba(255,255,255,0.3)', mx: 1 }} />
                                            <Box textAlign="center">
                                                <Typography level="h4" sx={{ fontWeight: 600, color: "#fff", mb: 0.3, fontSize: 25 }}>
                                                    {FABRIC_STATUS[1].value}
                                                </Typography>
                                                <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.8)", fontSize: 20 }}>
                                                    Pending Receipt
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ width: "80%", height: 6, bgcolor: "rgba(255,255,255,0.33)", borderRadius: 3,alignItems:"center",justifyContent:"center",ml:4 }}>
                                            <Box sx={{ width: `${receivedPercent}%`, height: "100%", bgcolor: "#fff", borderRadius: 3, transition: "width 0.5s" }} />
                                        </Box>
                                        <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.87)", mt: 1, fontSize: 20, textAlign: "center" }}>
                                            {receivedPercent}% Received
                                        </Typography>
                                    </Card>
                                </Grid>

                                {/* Inspection Completed */}
                                <Grid xs={12} sm={6} lg={3}>
                                    <Card
                                        sx={{
                                            p: 1.5,
                                            height: "100%",
                                            borderRadius: 8,
                                            background: "linear-gradient(135deg,#f59e0b 0%,#d97706 100%)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 8px 16px rgba(245,158,11,0.2)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 0.5 }}>
                                            <CheckCircleIcon sx={{ color: "#fff", fontSize: 30 }} />
                                            <Typography level="body-sm" sx={{ fontWeight: 500, color: "#fff", fontSize: 25 }}>
                                                Inspection Status
                                            </Typography>
                                        </Box>
                                        <Typography level="h4" sx={{ color: "#fff", fontWeight: 700, mb: 0.5, fontSize: 35, textAlign: "center" }}>
                                            {INSPECTION_COMPLETED}
                                        </Typography>
                                        <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.9)", mb: 1, fontSize: 19, textAlign: "center" }}>
                                            Total Inspections Completed
                                        </Typography>
                                        <Box textAlign="center" sx={{ display: "flex", alignItems: "center", gap: 0.8, p: 1, bgcolor: "rgba(255,255,255,0.15)", borderRadius: 1 }}>
                                            <TrendingUpIcon sx={{ color: "#fff", fontSize: 25 ,ml:9}} />
                                            <Typography level="body-xs" sx={{ color: "#fff", fontWeight: 600, fontSize: 20, }}>
                                                12% increase this week
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Grid>

                                {/* Balance to Receive */}
                                <Grid xs={12} sm={6} lg={3}>
                                    <Card
                                        sx={{
                                            p: 1.5,
                                            height: "100%",
                                            borderRadius: 8,
                                            background: "linear-gradient(135deg,#3b82f6 0%,#2563eb 100%)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 8px 16px rgba(59,130,246,0.2)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2,p:0.5 }}>
                                            <CategoryIcon sx={{ color: "#fff", fontSize: 30 }} />
                                            <Typography level="body-sm" sx={{ fontWeight: 600, color: "#fff", fontSize: 25 }}>
                                                Balance to Receive
                                            </Typography>
                                        </Box>
                                        <Typography level="h4" sx={{ color: "#fff", fontWeight: 700, mb: 0.5, fontSize: 35,textAlign:"center" }}>
                                            {BALANCE_TO_RECEIVE}
                                        </Typography>
                                        <Typography level="body-xs" sx={{ color: "rgba(255,255,255,0.9)", mb: 1, fontSize: 19,textAlign:"center" }}>
                                            Units Pending Receipt
                                        </Typography>
                                        <Box textAlign="center" sx={{
                                            display: "flex", alignItems: "center", gap: 0.8, p: 1, bgcolor: "rgba(255,255,255,0.15)", borderRadius: 1
                                        }}>
                                            <CalendarTodayIcon sx={{ color: "#fff", fontSize: 25,ml:13 }} />
                                            <Typography level="body-xs" sx={{ color: "#fff", fontWeight: 600, fontSize: 20, }}>
                                                Expected by W45
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Grid>

                                {/* Drill Down */}
                                <Grid xs={12} sm={6} lg={3}>
                                    <Card sx={{ p: 1.5, height: "100%", borderRadius: 8 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                            <AssessmentIcon sx={{ color: "#8b5cf6", fontSize: 30 }} />
                                            <Typography level="body-sm" sx={{ fontWeight: 600, fontSize: 20 }}>
                                                Drill Down
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                            <Box>
                                                <Typography level="body-xs" sx={{ mb: 0.4, fontWeight: 600, color: "neutral.700", fontSize: 12 }}>
                                                    Customer
                                                </Typography>
                                                <Select
                                                    value={customer}
                                                    size="sm"
                                                    onChange={(e, val) => setCustomer(val)}
                                                    sx={{ width: "100%", fontSize: 11 }}
                                                >
                                                    {CUSTOMERS.map(c => <Option key={c} value={c}>{c}</Option>)}
                                                </Select>
                                            </Box>
                                            <Box>
                                                <Typography level="body-xs" sx={{ mb: 0.4, fontWeight: 600, color: "neutral.700", fontSize: 12 }}>
                                                    Article
                                                </Typography>
                                                <Select
                                                    value={article}
                                                    size="sm"
                                                    onChange={(e, val) => setArticle(val)}
                                                    sx={{ width: "100%", fontSize: 11 }}
                                                >
                                                    {ARTICLES.map(a => <Option key={a} value={a}>{a}</Option>)}
                                                </Select>
                                            </Box>
                                            <Box>
                                                <Typography level="body-xs" sx={{ mb: 0.4, fontWeight: 600, color: "neutral.700", fontSize: 12 }}>
                                                    Fabric PO
                                                </Typography>
                                                <Select
                                                    value={fabricPO}
                                                    size="sm"
                                                    onChange={(e, val) => setFabricPO(val)}
                                                    sx={{ width: "100%", fontSize: 11 }}
                                                >
                                                    {FABRIC_PO.map(f => <Option key={f} value={f}>{f}</Option>)}
                                                </Select>
                                            </Box>
                                            <Button
                                                variant="solid"
                                                size="sm"
                                                sx={{
                                                    bgcolor: "#8b5cf6",
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    "&:hover": { bgcolor: "#7c3aed" }
                                                }}
                                                onClick={() => window.open(poPdf, '_blank')}
                                            >
                                                Open Fabric PO
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Charts Section */}
                            <Grid container spacing={1}>
                                {/* Fabric Inward Progress lg={4} */}
                                <Grid xs={12} lg={6} >
                                    <Card sx={{ p: 3, height: "100%" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                                            <TimelineIcon sx={{ fontSize: 24, color: "#3b82f6" }} />
                                            <Typography level="title-md" sx={{ fontWeight: 600 }}>
                                                Fabric Inward Progress
                                            </Typography>
                                        </Box>
                                        <ResponsiveContainer width="100%" height={280}>
                                            <LineChart data={FABRIC_INWARD_PROGRESS}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                                <XAxis
                                                    dataKey="week"
                                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                                    stroke="#cbd5e1"
                                                />
                                                <YAxis
                                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                                    stroke="#cbd5e1"
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: "#fff",
                                                        border: "1px solid #e2e8f0",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                                    }}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="received"
                                                    stroke="#3b82f6"
                                                    strokeWidth={3}
                                                    dot={{ r: 5, fill: "#fff", stroke: "#3b82f6", strokeWidth: 2 }}
                                                    activeDot={{ r: 7 }}
                                                    name="Fabric Received"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Card>
                                </Grid>

                                {/* Ageing for Not-Received Fabric */}
                                <Grid xs={12} lg={6} >
                                    <Card sx={{ p: 3, height: "100%" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 24, color: "#f59e0b" }} />
                                            <Typography level="title-md" sx={{ fontWeight: 600 }}>
                                                Ageing - Not Received
                                            </Typography>
                                        </Box>
                                        <ResponsiveContainer width="100%" height={280}>
                                            <BarChart data={AGEING_NOT_RECEIVED}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                                <XAxis
                                                    dataKey="days"
                                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                                    stroke="#cbd5e1"
                                                />
                                                <YAxis
                                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                                    stroke="#cbd5e1"
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: "#fff",
                                                        border: "1px solid #e2e8f0",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                                    }}
                                                />
                                                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                                                    {AGEING_NOT_RECEIVED.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Card>
                                </Grid>

                                {/* Supplier-Wise Pending */}
                                <Grid xs={12} >
                                    <Card sx={{ p: 3, height: "100%" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                                            <GroupWorkIcon sx={{ fontSize: 24, color: "#10b981" }} />
                                            <Typography level="title-md" sx={{ fontWeight: 600 }}>
                                                Supplier-Wise Pending
                                            </Typography>
                                        </Box>
                                        <ResponsiveContainer width="100%" height={280}>
                                            <PieChart>
                                                <Pie
                                                    data={SUPPLIER_PENDING}
                                                    dataKey="value"
                                                    nameKey="supplier"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={90}
                                                    innerRadius={50}
                                                    paddingAngle={3}
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {SUPPLIER_PENDING.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: "#fff",
                                                        border: "1px solid #e2e8f0",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                                    }}
                                                />
                                                <Legend
                                                    wrapperStyle={{ fontSize: "12px" }}
                                                    iconType="circle"
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Card>
                                </Grid>
                            </Grid>

                        </Box>

                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}