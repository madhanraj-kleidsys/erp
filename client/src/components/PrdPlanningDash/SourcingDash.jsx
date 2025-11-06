import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Card,
  Select,
  Option,
  CardContent,
  Button,
  Table,
  Sheet,
  Avatar,
  Chip,
} from "@mui/joy";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import Category from "@mui/icons-material/Category";
import TrendingUp from "@mui/icons-material/TrendingUp";
import Assessment from "@mui/icons-material/Assessment";
import Warning from "@mui/icons-material/Warning";
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import LinearProgress from '@mui/joy/LinearProgress';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import poPdf from '../../assets/po.pdf';

import Header from "../Header";
import Sidebar from "../Sidebar";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import ReplyIcon from '@mui/icons-material/Reply';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import ScrollToTop from "../ScrollToTop";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: "#f8fafc",
          surface: "#ffffff",
        },
      },
    },
  },
});

const STATUS = [
  { label: "Raised", value: 287, color: "#4CAF50" },
  { label: "To Be Raised", value: 56, color: "#FFB300" },
];

const CUSTOMERS = [
  "H&M", "WALMART", "GROUPE AUCHAN", "MAX HOLDINGS", "KMART AUSTRALIA"
];
const STYLES = [
  "Kids T-Shirt",
  "School Uniform",
  "Baby Onesie",
  "Sports Wear",
  "Silk Scarf",
  "Leather Jacket"
];

const ORDER_MATRIX = [
  { color: "Black", XS: 45, S: 120, M: 180, L: 200, XL: 95, XXL: 35 },
  { color: "White", XS: 38, S: 105, M: 165, L: 185, XL: 88, XXL: 28 },
  { color: "Navy", XS: 32, S: 95, M: 145, L: 165, XL: 75, XXL: 25 },
  { color: "Grey", XS: 28, S: 85, M: 125, L: 145, XL: 68, XXL: 22 },
  { color: "Blue", XS: 28, S: 85, M: 125, L: 145, XL: 68, XXL: 22 },
  { color: "Green", XS: 28, S: 85, M: 125, L: 145, XL: 68, XXL: 22 },
];

const agingData = [
  { week: "W42", pending: 1 },
  { week: "W43", pending: 0 },
  { week: "W44", pending: 3 },
  { week: "W45", pending: 0 },
];

const PO_STATUS_DIST = [
  { status: "Approved", count: 160, color: "#10B981" },
  { status: "Pending", count: 85, color: "#F59E0B" },
  { status: "Draft", count: 45, color: "#3B82F6" },
  { status: "Cancelled", count: 28, color: "#EF4444" },
];

const CUSTOMER_CONTRIB = [
  { name: "H&M", value: 35, color: "#8B5CF6" },
  { name: "WALMART", value: 28, color: "#06B6D4" },
  { name: "GROUPE AUCHAN", value: 18, color: "#F59E0B" },
  { name: "MAX HOLDINGS", value: 12, color: "#EF4444" },
  { name: "Others", value: 7, color: "#6B7280" },
];

const WEEKLY_TREND = [
  { week: "W28", created: 44, approved: 41, deliveries: 38 },
  { week: "W29", created: 51, approved: 47, deliveries: 44 },
  { week: "W30", created: 48, approved: 44, deliveries: 41 },
  { week: "W31", created: 55, approved: 52, deliveries: 47 },
  { week: "W32", created: 58, approved: 55, deliveries: 50 },
];

const ALERTS = [
  {
    id: 1,
    message: "5 POs pending approval for over 10 days",
    timestamp: "2025-10-13 08:30",
    type: "warning",
  },
  {
    id: 2,
    message: "Nike delivery schedule at risk for W36",
    timestamp: "2025-10-13 07:15",
    type: "critical",
  },
  {
    id: 3,
    message: "New supplier onboarding completed",
    timestamp: "2025-10-13 06:45",
    type: "info",
  },
];

const ESCALATIONS = [
  {
    id: 1,
    po: "PO-2025-1234",
    customer: "Nike",
    assignee: "John Smith",
    days: "12 days",
  },
  {
    id: 2,
    po: "PO-2025-1256",
    customer: "Adidas",
    assignee: "Sarah Johnson",
    days: "8 days",
  },
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

export default function App() {

  const location = useLocation();
  const { selectedWeek } = location.state || { selectedWeek: "default val eror" };
  const weekNumber = parseInt(selectedWeek.replace(/\D/g, ""), 10);
  const deliveryWeekNumber = weekNumber + 4;
  const deliveryWeek = `W${deliveryWeekNumber}`;

  // const weekNumber = parseInt(selectedWeek.replace(/\D/g, ""), 10);
  // const deliveryWeekNumber = weekNumber + 4;
  // const deliveryWeek = `W${deliveryWeekNumber}`;

  const [customer, setCustomer] = React.useState(CUSTOMERS[0]);
  const [style, setStyle] = React.useState(STYLES[0]);
  // const deliveryWeek = {selectedWeek} + 4;  

  return (
    <CssVarsProvider theme={theme}>
      <ScrollToTop />
      <CssBaseline />
      {/* <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "#f1f5f9" }}> */}
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Header />
          <Box sx={{ pt: 1, pb: 1, flex: 1, display: "flex", flexDirection: "column", minWidth: 0, gap: 2 }}>

            {/* Enhanced Title Bar */}
            <Sheet sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: { xs: 2, md: 4 },
              p: { xs: 3, md: 2 },
              borderRadius: 12,
              background: "#10b4f0ff",
              color: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}>
              <Box sx={{ display: "flex", aligntems: "center", gap: 2 }} >
                <button onClick={() => window.history.back()} style={{ border: 'none', display: 'flex', alignItems: 'center', background: "none" }} >
                  <ReplyIcon sx={{ fontSize: 50, color: "#fff", marginRight: 0.5, cursor: "pointer" }} />
                </button>
                <TrendingUp sx={{ fontSize: 35, color: "#ffffffff", mt: 1, animation: "float 4s ease-in-out infinite" }} />
                {/* <button onClick={() => window.history.back()} style={{ border: 'none', display: 'flex', alignItems: 'center', background: "#10b4f0ff" }}>
                  <ArrowBackIcon sx={{ fontSize: 44, color: "#fff", marginRight: 0.5 }} />
                </button> */}
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  width: "100%"
                }}>
                  <Typography level="h3" sx={{ fontWeight: 700, color: "#fff", }}>
                    Sourcing Dashboard
                  </Typography>
                  <Typography level="body-sm" sx={{ opacity: 0.9, color: "#fff" }}>
                    Comprehensive view of sourcing operations and delivery tracking
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

            <Box sx={{
              minHeight: "50vh",
              // bgcolor: "#f1f5f9",
              p: { xs: 2, sm: 3, md: 2 }
            }}>

              {/* Enhanced Cards Row */}
              <Grid container spacing={3}  >
                {/* PO Raised Status - Enhanced */}
                <Grid xs={12} md={3}>
                  <Card sx={{
                    height: "90%",
                    background: "linear-gradient(135deg, #D1FAE5 0%, #10B981 100%)",
                    border: "none",
                    borderRadius: 16,
                    boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)",
                    },
                  }}>
                    <CardContent sx={{ pl: 2, pr: 2, pb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <TrendingUp sx={{ fontSize: 32, mr: 2, color: "#065F46" }} />
                        <Typography level="title-lg" sx={{ fontWeight: 700, color: "#065F46" }}>
                          PO Raised Status
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                        <Box textAlign="center">
                          <Typography level="h2" sx={{ color: "#065F46", fontWeight: 800, mb: 1 }}>287</Typography>
                          <Typography level="body-sm" sx={{ color: "#047857", fontWeight: 600 }}>Raised</Typography>
                        </Box>
                        <Box textAlign="center">
                          <Typography level="h2" sx={{ color: "#DC2626", fontWeight: 800, mb: 1 }}>56</Typography>
                          <Typography level="body-sm" sx={{ color: "#B91C1C", fontWeight: 600 }}>To be Raised</Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
                        <Warning sx={{ color: "#F59E0B", mr: 2, fontSize: 44 }} />
                        <Typography level="body-sm" sx={{ color: "#b91c1cbc", fontSize: 25, fontWeight: 700 }}>
                          56 orders pending PO
                        </Typography>
                      </Box>

                      {/* <LinearProgress determinate value={287 / (287 + 56) * 100} color="success" sx={{ mt: 19, ml: 1, mr: 1 }} />   */}

                      <Box sx={{ width: "100%", height: 8, bgcolor: "rgba(255, 255, 255, 1)", borderRadius: 5, overflow: "hidden" }}>
                        <Box
                          sx={{
                            width: `65%`,
                            height: "100%",
                            bgcolor: "#156118ff",
                            transition: "width 0.5s ease"
                          }}
                        />
                      </Box>
                      <Typography level="body-sm" sx={{ color: "#2E7D32", fontWeight: 600 }}>
                        65% Complete
                      </Typography>
                    </CardContent>
                  </Card>



                </Grid>

                {/* PO Drill Down - Enhanced */}
                <Grid xs={12} md={3}>
                  <Card sx={{
                    height: "90%",
                    background: "linear-gradient(135deg, #DBEAFE 0%, #3B82F6 100%)",
                    border: "none",
                    borderRadius: 16,
                    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                    },
                  }}>
                    {/* pt: 2, pl: 4, pr: 4 */}
                    <CardContent sx={{ pb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Assessment sx={{ fontSize: 32, mr: 2, color: "#1E40AF" }} />
                        <Typography level="title-lg" sx={{ fontWeight: 700, color: "#1E40AF" }}>
                          PO: Drill Down
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box>
                          <Typography level="body-sm" sx={{ mb: 1, fontWeight: 600, color: "#1E40AF" }}>
                            Customer Name
                          </Typography>
                          <Select value={customer} onChange={(e, val) => setCustomer(val)}
                          // sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
                          >
                            {CUSTOMERS.map(c => <Option key={c} value={c}>{c}</Option>)}
                          </Select>
                        </Box>
                        <Box>
                          <Typography level="body-sm" sx={{ mb: 1, fontWeight: 600, color: "#1E40AF" }}>
                            Style
                          </Typography>
                          <Select value={style} onChange={(e, val) => setStyle(val)}
                          // sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
                          >
                            {STYLES.map(s => <Option key={s} value={s}>{s}</Option>)}
                          </Select>
                        </Box>
                        <Button
                          startDecorator={<ExitToAppIcon />}
                          sx={{
                            mt: 1,
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "#1E40AF",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "rgba(255,255,255,0.3)" }
                          }}
                          onClick={() => window.open(poPdf, '_blank')}
                        >
                          Open PO in new tab
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>


                </Grid>

                {/* Order Matrix - Enhanced */}
                <Grid xs={12} md={3}>
                  <Card sx={{
                    height: "90%",
                    background: "linear-gradient(135deg, #e3dff6ff 0%, #8B5CF6 100%)",
                    border: "none",
                    borderRadius: 16,
                    boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
                    },
                  }}>
                    <CardContent sx={{ pb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Category sx={{ fontSize: 32, mr: 2, color: "#5B21B6" }} />
                        <Typography level="title-lg" sx={{ fontWeight: 700, color: "#5B21B6" }}>
                          Order Matrix
                        </Typography>
                      </Box>
                      <Card sx={{
                        // bgcolor: "#fb0000ff",
                        borderRadius: 8, boxShadow: 2
                      }}>
                        <Table size="sm">
                          <thead>
                            {/* color: "#000000ff",
color: "#000000ff",
color: "#000000ff",
color: "#000000ff",
color: "#000000ff",
color: "#000000ff",
color: "#000000ff", */}
                            <tr style={{ background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>
                              <th style={{ fontSize: "12px", fontWeight: 700, padding: "12px 8px" }}>Color</th>
                              <th style={{ fontSize: "12px", fontWeight: 700, textAlign: "center", padding: "12px 4px" }}>XS</th>
                              <th style={{ fontSize: "12px", fontWeight: 700, textAlign: "center", padding: "12px 4px" }}>S</th>
                              <th style={{ fontSize: "12px", fontWeight: 700, textAlign: "center", padding: "12px 4px" }}>M</th>
                              <th style={{ fontSize: "12px", fontWeight: 700, textAlign: "center", padding: "12px 4px" }}>L</th>
                              <th style={{ fontSize: "12px", fontWeight: 700, textAlign: "center", padding: "12px 4px" }}>XL</th>
                              <th style={{ fontSize: "12px", fontWeight: 700, textAlign: "center", padding: "12px 4px" }}>XXL</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ORDER_MATRIX.map(({ color, ...sizes }) => (
                              <tr key={color}>
                                <td style={{ fontSize: "12px", fontWeight: 600, padding: "4px" }}>{color}</td>
                                {Object.values(sizes).map((num, i) => (
                                  <td key={i} style={{
                                    fontSize: "12px",
                                    textAlign: "center",
                                    padding: "2px 4px",
                                    // color: "#6B7280",
                                    fontWeight: 500
                                  }}>{num}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card>
                    </CardContent>
                  </Card>


                </Grid>

                {/* Aging Summary - Enhanced */}
                <Grid xs={12} md={3}>
                  <Card sx={{
                    height: "90%",
                    background: "linear-gradient(135deg, #fdefb6ff 0%, #F59E0B 100%)",
                    border: "none",
                    borderRadius: 16,
                    boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.1), 0 10px 10px -5px rgba(245, 158, 11, 0.04)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)",
                    },
                  }}>
                    {/* pt: 2, pl: 4, pr: 4, */}
                    <CardContent sx={{ pb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Warning sx={{ fontSize: 32, mr: 2, color: "#92400E" }} />
                        <Typography level="title-lg" sx={{ fontWeight: 700, color: "#92400E" }}>
                          Aging Summary
                        </Typography>
                      </Box>
                      <Typography level="body-sm" sx={{ fontWeight: 600, mb: 3, color: "#78350F" }}>
                        Pending PO (Next 4 Weeks)
                      </Typography>
                      <Grid container spacing={2}>
                        {agingData.map(({ week, pending }) => (
                          <Grid xs={6} key={week}>
                            <Box sx={{ textAlign: "center" }}>
                              <Typography level="body-sm" sx={{ fontWeight: 600, fontSize: 16, mb: 1, color: "#92400E" }}>
                                {week}
                              </Typography>
                              <Avatar
                                sx={{
                                  width: 48,
                                  height: 48,
                                  bgcolor: pending === 0 ? "#10B981" : pending <= 2 ? "#F59E0B" : "#EF4444",
                                  color: "white",
                                  fontWeight: 800,
                                  fontSize: "18px",
                                  mx: "auto",
                                  boxShadow: "0 4px 14px 0 rgba(0,0,0,0.1)"
                                }}
                              >
                                {pending}
                              </Avatar>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>


                </Grid>

              </Grid>

              {/* Enhanced Charts Row */}
              <Grid container spacing={3} sx={{ mb:1,mt:-6}}>
                {/* Enhanced Bar Chart */}
                <Grid xs={12} md={6}>
                  <Card sx={{
                    // bgcolor: "#fff",
                    borderRadius: 4,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #E5E7EB"
                  }}>
                    <CardContent sx={{ pt: 2, pl: 4, pr: 4, pb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <BarChartIcon sx={{ mr: 2, color: "#3B82F6", fontSize: 28 }} />
                        <Typography level="title-lg" sx={{
                          fontWeight: 700,
                          // color: "#111827"
                        }}>
                          PO Status Distribution
                        </Typography>
                      </Box>
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={PO_STATUS_DIST}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                          <XAxis
                            dataKey="status"
                            tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#fff',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                              color: '#111827'
                            }}
                          />
                          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {PO_STATUS_DIST.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Enhanced Pie Chart */}
                <Grid xs={12} md={6}>
                  <Card sx={{
                    // bgcolor: "#fff",
                    borderRadius: 4,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #E5E7EB"
                  }}>
                    <CardContent sx={{ pt: 2, pl: 4, pr: 4, pb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <PieChartIcon sx={{ mr: 2, color: "#8B5CF6", fontSize: 28 }} />
                        <Typography level="title-lg" sx={{
                          fontWeight: 700,
                          // color: "#111827"
                        }}>
                          Customer-Wise Contribution
                        </Typography>
                      </Box>
                      <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                          <Pie
                            data={CUSTOMER_CONTRIB}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {CUSTOMER_CONTRIB.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#fff',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                              color: '#111827'
                            }}
                          />
                          <Legend
                            wrapperStyle={{ fontSize: '12px', color: '#6B7280' }}
                            iconType="circle"
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Enhanced Area Chart */}

              </Grid>

              <Grid xs={12} md={4}>
                <Card sx={{
                  // bgcolor: "#fff",
                  borderRadius: 4,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #E5E7EB", mb: 2
                }}>
                  <CardContent sx={{ p: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <TimelineIcon sx={{ mr: 2, color: "#10B981", fontSize: 28 }} />
                      <Typography level="title-lg" sx={{
                        fontWeight: 700,
                        // color: "#111827"
                      }}>
                        Weekly PO Trend
                      </Typography>
                    </Box>
                    <ResponsiveContainer width="100%" height={240}>
                      <AreaChart data={WEEKLY_TREND}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                        <XAxis
                          dataKey="week"
                          tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            color: '#111827'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="created"
                          stackId="1"
                          stroke="#3B82F6"
                          fill="url(#colorCreated)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="approved"
                          stackId="1"
                          stroke="#10B981"
                          fill="url(#colorApproved)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="deliveries"
                          stackId="1"
                          stroke="#F59E0B"
                          fill="url(#colorDeliveries)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                          </linearGradient>
                          <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                          </linearGradient>
                          <linearGradient id="colorDeliveries" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <Legend
                          wrapperStyle={{ fontSize: '12px', color: '#6B7280' }}
                          iconType="circle"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Enhanced Alerts & Escalations */}
              <Grid container spacing={3}>
                {/* Enhanced Alerts */}
                <Grid xs={12} md={6}>
                  <Card sx={{
                    // bgcolor: "#fff",
                    borderRadius: 4,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #E5E7EB"
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                        <NotificationsIcon sx={{ mr: 2, color: "#F59E0B", fontSize: 28 }} />
                        <Typography level="title-lg" sx={{
                          fontWeight: 700,
                          // color: "#111827" 
                        }}>
                          Alerts & Notifications
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {ALERTS.map((alert) => (
                          <Box
                            key={alert.id}
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              bgcolor: alert.type === 'critical' ? "#FEF2F2" :
                                alert.type === 'warning' ? "#FFFBEB" : "#EFF6FF",
                              borderLeft: `4px solid ${alert.type === 'critical' ? "#EF4444" :
                                alert.type === 'warning' ? "#F59E0B" : "#3B82F6"}`,
                              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
                            }}
                          >
                            <Typography level="body-md" sx={{ fontWeight: 600, color: "#111827", mb: 1 }}>
                              {alert.message}
                            </Typography>
                            <Typography level="body-sm" sx={{ color: "#6B7280" }}>
                              {alert.timestamp}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Enhanced Escalations */}
                <Grid xs={12} md={6}>
                  <Card sx={{
                    // bgcolor: "#fff",
                    borderRadius: 4,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #E5E7EB"
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                        <WarningAmberRounded sx={{ mr: 2, color: "#EF4444", fontSize: 28 }} />
                        <Typography level="title-lg" sx={{
                          fontWeight: 700,
                          // color: "#111827"
                        }}>
                          Escalations
                        </Typography>
                      </Box>
                      <Typography level="body-sm" sx={{ color: "#6B7280", mb: 3, fontWeight: 500 }}>
                        Delayed PO Submissions
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {ESCALATIONS.map((escalation) => (
                          <Box
                            key={escalation.id}
                            sx={{
                              p: 3,
                              borderRadius: 3,
                              bgcolor: "#FEF2F2",
                              borderLeft: "4px solid #EF4444",
                              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
                            }}
                          >
                            <Typography level="body-md" sx={{ fontWeight: 700, color: "#EF4444", mb: 1 }}>
                              {escalation.po}
                            </Typography>
                            <Typography level="body-sm" sx={{ color: "#6B7280", mb: 2 }}>
                              {escalation.customer} • Assigned to {escalation.assignee}
                            </Typography>
                            <Chip
                              size="sm"
                              color="danger"
                              sx={{ fontWeight: 600 }}
                            >
                              {escalation.days}
                            </Chip>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
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
