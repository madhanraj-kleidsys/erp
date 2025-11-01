import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Table,
    Chip,
    Avatar,
    Sheet,
    Button,
    IconButton,
} from "@mui/joy";

import DangerousOutlined from "@mui/icons-material/DangerousOutlined";

import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import TrendingUp from "@mui/icons-material/TrendingUp";
import FilterList from "@mui/icons-material/FilterList";
import Refresh from "@mui/icons-material/Refresh";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import PriorityHigh from "@mui/icons-material/PriorityHigh";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Print from "@mui/icons-material/Print";
import Inventory from "@mui/icons-material/Inventory";
import AccessTime from "@mui/icons-material/AccessTime";
import BuildCircle from "@mui/icons-material/BuildCircle";
import ContentCut from "@mui/icons-material/ContentCut";
import Download from "@mui/icons-material/Download";
import Header from "../Header";
import Sidebar from "../Sidebar";
import ReplyIcon from '@mui/icons-material/Reply';
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import ScrollToTop from "../ScrollToTop";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line,
    Area,
    AreaChart,
} from "recharts";


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

// Mock Data
const RISK_SUMMARY = {
    highRisk: 24,
    mediumRisk: 18,
    lowRisk: 12,
    totalOrders: 156,
};

const HIGH_RISK_ORDERS = [
    {
        orderId: "ORD-2025-1001",
        customer: "MAX HOLDINGS.",
        orderValue: "$125,000",
        riskLevel: "Critical",
        daysDelayed: 8,
        department: "Sourcing",
        issue: "Late PO Submission",
        assignee: "John Smith",
    },
    {
        orderId: "ORD-2025-1002",
        customer: "GROUPE AUCHAN",
        orderValue: "$98,500",
        riskLevel: "High",
        daysDelayed: 5,
        department: "Fabric",
        issue: "Fabric Delay",
        assignee: "Sarah Johnson",
    },
    {
        orderId: "ORD-2025-1003",
        customer: "H&M",
        orderValue: "$87,200",
        riskLevel: "Critical",
        daysDelayed: 12,
        department: "Cutting",
        issue: "Cut Plan Delay",
        assignee: "Mike Wilson",
    },
    {
        orderId: "ORD-2025-1004",
        customer: "WALMART",
        orderValue: "$76,800",
        riskLevel: "High",
        daysDelayed: 6,
        department: "Printing",
        issue: "Print Queue Backlog",
        assignee: "Lisa Chen",
    },
];

const EXCEPTION_GRID = [
    { department: "Sourcing", critical: 8, high: 12, medium: 6, low: 3, total: 29 },
    { department: "Fabric Store", critical: 5, high: 9, medium: 8, low: 4, total: 26 },
    { department: "Cutting", critical: 6, high: 7, medium: 5, low: 2, total: 20 },
    { department: "VAP ( Printing )", critical: 4, high: 8, medium: 7, low: 3, total: 22 },
    { department: "Finishing", critical: 2, high: 4, medium: 6, low: 5, total: 17 },
];

const DELAY_ESCALATION = [
    {
        id: 1,
        orderId: "ORD-2025-1001",
        customer: "MAX HOLDINGS.",
        process: "PO Creation",
        delayDays: 8,
        severity: "Critical",
        escalatedTo: "VP Operations",
        escalationDate: "2025-10-14",
        status: "Open",
    },
    {
        id: 2,
        orderId: "ORD-2025-1002",
        customer: "KMART AUSTRALIA",
        process: "Fabric Sourcing",
        delayDays: 5,
        severity: "High",
        escalatedTo: "Department Head",
        escalationDate: "2025-10-13",
        status: "In Progress",
    },
    {
        id: 3,
        orderId: "ORD-2025-1003",
        customer: "H&M",
        process: "Cutting Schedule",
        delayDays: 12,
        severity: "Critical",
        escalatedTo: "CEO",
        escalationDate: "2025-10-12",
        status: "Escalated",
    },
];

const RISK_TREND_DATA = [
    { week: "W40", critical: 3, high: 8, medium: 12 },
    { week: "W41", critical: 5, high: 10, medium: 15 },
    { week: "W42", critical: 8, high: 12, medium: 18 },
    { week: "W43", critical: 6, high: 9, medium: 14 },
    { week: "W44", critical: 4, high: 7, medium: 11 },
];

const DEPARTMENT_RISK_DATA = [
    { name: "Sourcing", value: 29, color: "#EF4444" },
    { name: "Fabric", value: 26, color: "#F59E0B" },
    { name: "Cutting", value: 20, color: "#3B82F6" },
    { name: "Printing", value: 22, color: "#8B5CF6" },
    { name: "Finishing", value: 17, color: "#10B981" },
];

const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
        case "critical":
            return "#DC2626";
        case "high":
            return "#EA580C";
        case "medium":
            return "#CA8A04";
        case "low":
            return "#16A34A";
        default:
            return "#6B7280";
    }
};

const getDepartmentIcon = (department) => {
    switch (department.toLowerCase()) {
        case "sourcing":
            return <Inventory />;
        case "fabric":
            return <BuildCircle />;
        case "cutting":
            return <ContentCut />;
        case "printing":
            return <Print />;
        case "finishing":
            return <LocalShipping />;
        default:
            return <ErrorOutlineOutlined />;
    }
};

export default function RiskExceptionDashboard({ selectedWeek = "W44" }) {
    const [animatedNumbers, setAnimatedNumbers] = useState({
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedNumbers({
                highRisk: RISK_SUMMARY.highRisk,
                mediumRisk: RISK_SUMMARY.mediumRisk,
                lowRisk: RISK_SUMMARY.lowRisk,
            });
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <CssVarsProvider>
            <ScrollToTop />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
                <Sidebar />
                <Box sx={{ flexGrow: 1, p: 1 }}>
                    <Header />
                    <Box sx={{ pb: 1, flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>

                        {/* Dramatic Header */}
                        <Sheet sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "linear-gradient(135deg, #DC2626 0%)",
                            borderRadius: 16,
                            // p: 2,
                            px: { xs: 2, md: 4 },
                            p: { xs: 3, md: 2 },
                            color: "white",
                            position: "relative",
                            overflow: "hidden",
                            boxShadow: "0 25px 50px -12px rgba(220, 38, 38, 0.4)",
                            // "&::before": {
                            //     content: '""',
                            //     position: "absolute",
                            //     top: 0,
                            //     left: 0,
                            //     right: 0,
                            //     bottom: 0,
                            // }
                        }}>
                            {/* <Box sx={{ position: "relative", zIndex: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}> */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <button onClick={() => window.history.back()} style={{ border: 'none', display: 'flex', alignItems: 'center', background: "none" }} >
                                    <ReplyIcon sx={{ fontSize: 50, color: "#fff", marginRight: 0.5, cursor: "pointer" }} />
                                </button>
                                <DangerousOutlined sx={{ fontSize: 40, mr: 1, color: "#fff", animation: "float 4s ease-in-out infinite" }} />
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                    width: "100%"
                                }}>
                                    <Typography level="h1" sx={{ fontWeight: 900, fontSize: "1.8rem", color: "#ffffff" }}>
                                        Risk & Exception Summary
                                    </Typography>
                                    {/* </Box> */}
                                    <Typography level="body-xs" sx={{ opacity: 2, color: "#ffffffff" }}>
                                        Critical alerts and process exceptions requiring immediate attention
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{
                                display: "flex",
                                gap: { xs: 2, sm: 4 },
                                flexWrap: "wrap"
                            }}>
                                <IconButton sx={{ bgcolor: "rgba(255, 255, 255, 1)", color: "#000" }}>
                                    <Refresh />
                                </IconButton>
                                <IconButton sx={{ bgcolor: "rgba(255, 255, 255, 1)" }}>
                                    <FilterList />
                                </IconButton>
                                <IconButton sx={{ bgcolor: "rgba(255, 255, 255, 1)" }}>
                                    <Download />
                                </IconButton>
                            </Box>
                            {/* </Box>
                            </Box> */}
                        </Sheet>
                        <style>{keyframes}</style>

                        {/* Animated Risk Summary Cards */}
                        <Box sx={{ minHeight: "100vh", p: { xs: 2, sm: 3, md: 2 } }} >

                            <Grid container spacing={3} sx={{ mb: 1 }}>
                                <Grid xs={12} md={3}>
                                    <Card sx={{
                                        background: "linear-gradient(135deg, #FEE2E2 0%, #DC2626 100%)",
                                        border: "none",
                                        borderRadius: 4,
                                        boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.1)",
                                        transform: "scale(1)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            transform: "scale(1.05) rotate(1deg)",
                                            boxShadow: "0 25px 50px -12px rgba(220, 38, 38, 0.25)",
                                        },
                                    }}>
                                        <CardContent sx={{ p: 4, textAlign: "center" }}>
                                            <DangerousOutlined sx={{ fontSize: 48, color: "#7F1D1D", mb: 2 }} />
                                            <Typography level="h1" sx={{
                                                fontWeight: 900,
                                                color: "#ffffffff",
                                                // 7F1D1D
                                                fontSize: "3rem",
                                                transition: "all 0.5s ease",
                                            }}>
                                                {animatedNumbers.highRisk}
                                            </Typography>
                                            <Typography level="body-md" sx={{ color: "#991B1B", fontWeight: 600 }}>
                                                Critical Risk Orders
                                            </Typography>
                                            <Box sx={{ mt: 2, p: 1, bgcolor: "rgba(127, 29, 29, 0.1)", borderRadius: 2 }}>
                                                <Typography level="body-sm" sx={{ color: "#7F1D1D" }}>
                                                    Requires immediate action
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid xs={12} md={3}>
                                    <Card sx={{
                                        background: "linear-gradient(135deg, #FEF3C7 0%, #F59E0B 100%)",
                                        border: "none",
                                        borderRadius: 4,
                                        boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.1)",
                                        transform: "scale(1)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            transform: "scale(1.05) rotate(-1deg)",
                                            boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)",
                                        },
                                    }}>
                                        <CardContent sx={{ p: 4, textAlign: "center" }}>
                                            <WarningAmberOutlined sx={{ fontSize: 48, color: "#92400E", mb: 2 }} />
                                            <Typography level="h1" sx={{
                                                fontWeight: 900,
                                                color: "#92400E",
                                                fontSize: "3rem",
                                                transition: "all 0.5s ease",
                                            }}>
                                                {animatedNumbers.mediumRisk}
                                            </Typography>
                                            <Typography level="body-md" sx={{ color: "#B45309", fontWeight: 600 }}>
                                                High Risk Orders
                                            </Typography>
                                            <Box sx={{ mt: 2, p: 1, bgcolor: "rgba(146, 64, 14, 0.1)", borderRadius: 2 }}>
                                                <Typography level="body-sm" sx={{ color: "#92400E" }}>
                                                    Monitor closely
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid xs={12} md={3}>
                                    <Card sx={{
                                        background: "linear-gradient(135deg, #DBEAFE 0%, #3B82F6 100%)",
                                        border: "none",
                                        borderRadius: 4,
                                        boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1)",
                                        transform: "scale(1)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            transform: "scale(1.05) rotate(1deg)",
                                            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                                        },
                                    }}>
                                        <CardContent sx={{ p: 4, textAlign: "center" }}>
                                            <ErrorOutlineOutlined sx={{ fontSize: 48, color: "#1E40AF", mb: 2 }} />
                                            <Typography level="h1" sx={{
                                                fontWeight: 900,
                                                color: "#1E40AF",
                                                fontSize: "3rem",
                                                transition: "all 0.5s ease",
                                            }}>
                                                {animatedNumbers.lowRisk}
                                            </Typography>
                                            <Typography level="body-md" sx={{ color: "#1D4ED8", fontWeight: 600 }}>
                                                Medium Risk Orders
                                            </Typography>
                                            <Box sx={{ mt: 2, p: 1, bgcolor: "rgba(30, 64, 175, 0.1)", borderRadius: 2 }}>
                                                <Typography level="body-sm" sx={{ color: "#1E40AF" }}>
                                                    Routine monitoring
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid xs={12} md={3}>
                                    <Card sx={{
                                        background: "linear-gradient(135deg, #1F2937 0%, #374151 100%)",
                                        border: "1px solid #4B5563",
                                        borderRadius: 4,
                                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                                    }}>
                                        <CardContent sx={{ p: 4, textAlign: "center" }}>
                                            <NotificationsActive sx={{ fontSize: 48, color: "#F59E0B", mb: 2 }} />
                                            <Typography level="h1" sx={{ fontWeight: 900, color: "#F9FAFB", fontSize: "3rem" }}>
                                                {RISK_SUMMARY.totalOrders}
                                            </Typography>
                                            <Typography level="body-md" sx={{ color: "#D1D5DB", fontWeight: 600 }}>
                                                Total Active Orders
                                            </Typography>
                                            <Box sx={{ mt: 2, p: 1, bgcolor: "rgba(245, 158, 11, 0.1)", borderRadius: 2 }}>
                                                <Typography level="body-sm" sx={{ color: "#F59E0B" }}>
                                                    Under monitoring
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* High-Risk Orders Table */}
                            <Card sx={{
                                bgcolor: "#ffffffff",
                                borderRadius: 4,
                                border: "1px solid #334155",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", mb: 3
                            }}>
                                <CardContent sx={{ pt: 2, p: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2, animation: "pulse 0.5s infinite" }}>
                                        <PriorityHigh sx={{ fontSize: 32, color: "#EF4444", mr: 2 }} />
                                        <Typography level="h3" sx={{
                                            fontWeight: 800, color: "#2a89e9ff",
                                        }}>
                                            High-Risk Orders Requiring Immediate Action
                                        </Typography>
                                    </Box>
                                    <Table sx={{
                                        "--Table-headerUnderlineThickness": "2px",
                                        "& thead th": {
                                            bgcolor: "#72757aff",
                                            color: "#F9FAFB",
                                            fontWeight: 700,
                                            fontSize: "14px",
                                            p: 2,
                                        },
                                        "& tbody td": {
                                            color: "#E2E8F0",
                                            fontSize: "13px",
                                            p: 2,
                                        }
                                    }}>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Value</th>
                                                <th>Risk Level</th>
                                                <th>Days Delayed</th>
                                                <th>Department</th>
                                                <th>Issue</th>
                                                <th>Assignee</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {HIGH_RISK_ORDERS.map((order, index) => (
                                                <tr key={order.orderId} style={{
                                                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                                                    borderLeft: `4px solid ${getSeverityColor(order.riskLevel)}`,
                                                }}>
                                                    <td>
                                                        <Typography sx={{ fontWeight: 600, color: "#0869caff" }}>
                                                            {order.orderId}
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Typography sx={{ fontWeight: 600, color: "#000000ff" }}>
                                                            {order.customer}
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Typography sx={{ fontWeight: 600, color: "#34D399" }}>
                                                            {order.orderValue}
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Chip
                                                            size="sm"
                                                            sx={{
                                                                bgcolor: getSeverityColor(order.riskLevel),
                                                                color: "white",
                                                                fontWeight: 600,
                                                                animation: order.riskLevel === "Critical" ? "pulse 2s infinite" : "none",
                                                            }}
                                                        >
                                                            {order.riskLevel}
                                                        </Chip>
                                                    </td>
                                                    <td>
                                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                                            <AccessTime sx={{ fontSize: 16, mr: 1, color: "#F59E0B" }} />
                                                            <Typography sx={{ fontWeight: 600, color: "#000000ff" }}>
                                                                {order.daysDelayed} days </Typography>
                                                        </Box>
                                                    </td>
                                                    <td>
                                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                                            {getDepartmentIcon(order.department)}
                                                            <Typography sx={{ ml: 1, fontWeight: 600, color: "#000000ff" }}>{order.department}</Typography>
                                                        </Box>
                                                    </td>
                                                    <td> <Typography sx={{ ml: 1, fontWeight: 600, color: "#e20d0dff" }}>{order.issue} </Typography></td>
                                                    <td><Typography sx={{ ml: 1, fontWeight: 600, color: "#000000ff" }}>{order.assignee} </Typography></td>
                                                    <td>
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            sx={{ fontWeight: 600 }}
                                                        >
                                                            Escalate
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardContent>
                            </Card>

                            {/* Exception Grid and Charts */}
                            <Grid container spacing={3} sx={{ mb: 2 }}>
                                {/* Exception Grid by Department */}
                                <Grid xs={12} lg={8}>
                                    <Card sx={{
                                        // bgcolor: "#1E293B",
                                        borderRadius: 4,
                                        border: "1px solid #334155",
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                    }}>
                                        <CardContent sx={{ p: 4 }}>
                                            <Typography level="h4" sx={{ fontWeight: 800, color: "#334155", mb: 4 }}>
                                                Exception Grid by Department
                                            </Typography>
                                            <Table sx={{
                                                "--Table-headerUnderlineThickness": "2px",
                                                "& thead th": {
                                                    bgcolor: "#72757aff",
                                                    color: "#F9FAFB",
                                                    fontWeight: 700,
                                                    p: 2,
                                                },
                                                "& tbody td": {
                                                    color: "#E2E8F0",
                                                    p: 2,
                                                }
                                            }}>
                                                <thead>
                                                    <tr>
                                                        <th>Department</th>
                                                        <th>Critical</th>
                                                        <th>High</th>
                                                        <th>Medium</th>
                                                        <th>Low</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {EXCEPTION_GRID.map((dept, index) => (
                                                        <tr key={dept.department} style={{
                                                            animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                                                        }}>
                                                            <td>
                                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                    {getDepartmentIcon(dept.department)}
                                                                    <Typography sx={{ ml: 1, fontWeight: 600, color: "#000" }}>
                                                                        {dept.department}
                                                                    </Typography>
                                                                </Box>
                                                            </td>
                                                            <td>
                                                                <Chip size="sm" sx={{ bgcolor: "#DC2626", color: "white", fontWeight: 600 }}>
                                                                    {dept.critical}
                                                                </Chip>
                                                            </td>
                                                            <td>
                                                                <Chip size="sm" sx={{ bgcolor: "#EA580C", color: "white", fontWeight: 600 }}>
                                                                    {dept.high}
                                                                </Chip>
                                                            </td>
                                                            <td>
                                                                <Chip size="sm" sx={{ bgcolor: "#CA8A04", color: "white", fontWeight: 600 }}>
                                                                    {dept.medium}
                                                                </Chip>
                                                            </td>
                                                            <td>
                                                                <Chip size="sm" sx={{ bgcolor: "#16A34A", color: "white", fontWeight: 600 }}>
                                                                    {dept.low}
                                                                </Chip>
                                                            </td>
                                                            <td>
                                                                <Typography sx={{ fontWeight: 800, color: "#60A5FA", fontSize: "16px" }}>
                                                                    {dept.total}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Department Risk Distribution */}
                                <Grid xs={12} lg={4}>
                                    <Card sx={{

                                        borderRadius: 4,
                                        border: "1px solid #334155",
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    }}>
                                        <CardContent sx={{ p: 4 }}>
                                            <Typography level="h4" sx={{ fontWeight: 800, color: "#2663a0ff", mb: 11 }}>
                                                Risk Distribution by Department
                                            </Typography>
                                            <ResponsiveContainer width="100%" height={280}>
                                                <PieChart>
                                                    <Pie
                                                        data={DEPARTMENT_RISK_DATA}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={100}
                                                        paddingAngle={2}
                                                        dataKey="value"
                                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {DEPARTMENT_RISK_DATA.map((entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill={entry.color}
                                                                stroke="#1E293B"
                                                                strokeWidth={2}
                                                            />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: '#c6d7f1ff',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            color: '#F9FAFB'
                                                        }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Risk Trend Analysis */}
                            <Card sx={{
                                mb: 1,
                                borderRadius: 4,
                                border: "1px solid #334155",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            }}>
                                <CardContent sx={{ p: 1 }}>
                                    <Typography level="h4" sx={{ fontWeight: 800, color: "#0878e9ff", mb: 1 }}>
                                        Risk Trend Analysis (Last 5 Weeks)
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={RISK_TREND_DATA}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                            <XAxis dataKey="week" stroke="#9CA3AF" />
                                            <YAxis stroke="#9CA3AF" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#ffffffff',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: '#043668ff'
                                                }}
                                            />
                                            <Legend />
                                            <Area
                                                type="monotone"
                                                dataKey="critical"
                                                stackId="1"
                                                stroke="#DC2626"
                                                fill="#DC2626"
                                                fillOpacity={0.8}
                                                name="Critical"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="high"
                                                stackId="1"
                                                stroke="#EA580C"
                                                fill="#EA580C"
                                                fillOpacity={0.8}
                                                name="High"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="medium"
                                                stackId="1"
                                                stroke="#CA8A04"
                                                fill="#CA8A04"
                                                fillOpacity={0.8}
                                                name="Medium"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Delay Escalation Table */}
                            <Card sx={{

                                borderRadius: 4,
                                border: "1px solid #334155",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            }}>
                                <CardContent sx={{ p: 1, pt: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, animation: "pulse 0.5s infinite" }}>
                                        <ErrorOutlineOutlined sx={{ fontSize: 32, color: "#1E40AF", mr: 2 }} />

                                        <Typography level="h3" sx={{
                                            fontWeight: 800, color: "#2a89e9ff",
                                        }}>
                                            Delay Escalation Table
                                        </Typography>
                                    </Box>

                                    <Table sx={{
                                        "--Table-headerUnderlineThickness": "2px",
                                        "& thead th": {
                                            bgcolor: "#374151",
                                            color: "#F9FAFB",
                                            fontWeight: 700,
                                            p: 2,
                                        },
                                        "& tbody td": {
                                            color: "#E2E8F0",
                                            p: 2,
                                        }
                                    }}>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Process</th>
                                                <th>Delay Days</th>
                                                <th>Severity</th>
                                                <th>Escalated To</th>
                                                <th>Escalation Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DELAY_ESCALATION.map((escalation, index) => (
                                                <tr key={escalation.id} style={{
                                                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                                                    borderLeft: `4px solid ${getSeverityColor(escalation.severity)}`,
                                                }}>
                                                    <td>
                                                        <Typography sx={{ fontWeight: 600, color: "#046be9ff" }}>
                                                            {escalation.orderId}
                                                        </Typography>
                                                    </td>
                                                    <td> <Typography sx={{ fontWeight: 600, color: "#000000ff" }}>  {escalation.customer} </Typography> </td>
                                                    <td> <Typography sx={{ fontWeight: 600, color: "#028b59ff" }}>
                                                        {escalation.process}
                                                    </Typography>
                                                    </td>
                                                    <td>
                                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                                            <AccessTime sx={{ fontSize: 16, mr: 1, color: "#F59E0B" }} />
                                                            <Typography sx={{ fontWeight: 600, color: "#000000ff" }}>   {escalation.delayDays} days
                                                            </Typography>      </Box>
                                                    </td>
                                                    <td>
                                                        <Chip
                                                            size="sm"
                                                            sx={{
                                                                bgcolor: getSeverityColor(escalation.severity),
                                                                color: "white",
                                                                fontWeight: 600,
                                                                animation: escalation.severity === "Critical" ? "pulse 2s infinite" : "none",
                                                            }}
                                                        >
                                                            {escalation.severity}
                                                        </Chip>
                                                    </td>
                                                    <td> <Typography sx={{ fontWeight: 600, color: "#e60d0dff" }}>  {escalation.escalatedTo} </Typography > </td>
                                                    <td> <Typography sx={{ fontWeight: 600, color: "#000000ff" }}>
                                                        {escalation.escalationDate}
                                                    </Typography> </td>
                                                    <td>
                                                        <Chip
                                                            size="sm"
                                                            color={escalation.status === "Open" ? "danger" :
                                                                escalation.status === "In Progress" ? "warning" : "success"}
                                                            sx={{ fontWeight: 600 }}
                                                        >
                                                            {escalation.status}
                                                        </Chip>
                                                    </td>
                                                    <td>
                                                        <Button size="sm" color="warning" sx={{ fontWeight: 600 }}>
                                                            Follow Up
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardContent>
                            </Card>

                        </Box>

                    </Box>
                </Box >
            </Box >

            {/* CSS Animations */}
            < style jsx > {`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style >
        </CssVarsProvider >
    );
}
