import React from "react";
import {
  Box, Grid, Card, CardContent, Typography, LinearProgress, Chip, Table, TableHead, TableRow, TableCell, TableBody,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WarningIcon from "@mui/icons-material/Warning";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, LineChart, Line, ResponsiveContainer,
} from "recharts";

// Example data (replace with your data source as needed)
const orderMatrix = [
  { color: "Black", XS: 21, S: 40, M: 50, L: 40, XL: 30, XXL: 18 },
  { color: "White", XS: 15, S: 35, M: 42, L: 50, XL: 24, XXL: 10 },
  { color: "Navy", XS: 12, S: 31, M: 29, L: 35, XL: 16, XXL: 13 },
  { color: "Grey", XS: 10, S: 23, M: 30, L: 28, XL: 15, XXL: 11 },
];
const agingData = [
  { week: "W42", pending: 1 },
  { week: "W43", pending: 0 },
  { week: "W44", pending: 3 },
  { week: "W45", pending: 0 },
];
const statusChart = [
  { status: "Approved", count: 98 },
  { status: "In Review", count: 39 },
  { status: "Draft", count: 17 },
  { status: "Rejected", count: 4 },
];
const customerPie = [
  { name: "Nike Inc.", value: 245000 },
  { name: "Adidas", value: 175000 },
  { name: "Puma", value: 95000 },
  { name: "Others", value: 45000 },
];
const weeklyTrend = [
  { week: "W40", created: 48, approved: 45, delivered: 41 },
  { week: "W41", created: 54, approved: 48, delivered: 42 },
  { week: "W42", created: 63, approved: 49, delivered: 45 },
  { week: "W43", created: 55, approved: 54, delivered: 47 },
  { week: "W44", created: 58, approved: 51, delivered: 48 },
];
const alerts = [
  { customer: "Nike Inc.", delivery: "W44", action: "Urgent Escalation" },
  { customer: "Puma", delivery: "W43", action: "Delay Follow-up" },
];

// --- Card style helpers
const cardStyle = {
  background: "white",
  boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10)",
  borderRadius: 3,
  transition: "box-shadow .3s",
  ':hover': { boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)" },
};

// --- Main Sourcing Dashboard Component
export default function SourcingDashboard({ selectedWeek = "W40" }) {
  // For top right, assume "W40" and next delivery "W44"
  const deliveryWeek = "W44";
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F6F8F9" }}>
      {/* Title Row */}
      <Box sx={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        px: { xs: 1, md: 3 }, py: 2, bgcolor: "primary.main", borderRadius: 3, boxShadow: 2, mb: 2,
        background: "linear-gradient(90deg, #2196F3 40%, #BA68C8 100%)", color: "#fff",
      }}>
        <Typography variant="h5" fontWeight={700}>4-W Planning Dashboard - Sourcing</Typography>
        <Box sx={{ textAlign: "right", minWidth: 148 }}>
          <Typography fontSize={15}>Planning Window</Typography>
          <Typography fontWeight={600}>Current Week = {selectedWeek}</Typography>
          <Typography fontWeight={600}>Delivery Week = {deliveryWeek}</Typography>
        </Box>
      </Box>

      {/* Top Cards Row */}
      <Grid container spacing={2} mb={2}>
        {/* PO Raised Status */}
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent sx={{ textAlign: "center" }}>
              <TrendingUpIcon fontSize="large" sx={{ color: "#2196F3", mb: 1 }} />
              <Typography variant="body2" color="text.secondary" fontWeight={600}>PO Raised Status</Typography>
              <Typography variant="h4" mt={1} color="primary.main">89</Typography>
              <Typography variant="subtitle2" color="success.main">Raised</Typography>
              <Box sx={{ mt: 1, mb: 1 }}>
                <LinearProgress value={80} variant="determinate" sx={{
                  height: 8, borderRadius: 2, bgcolor: "grey.200", "& .MuiLinearProgress-bar": { bgcolor: "success.main" },
                }} />
              </Box>
              <Typography variant="caption" color="grey.700">To be Raised: 12</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* PO Drill Down */}
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent sx={{ textAlign: "center" }}>
              <AssessmentIcon fontSize="large" sx={{ color: "#00B795", mb: 1 }} />
              <Typography variant="body2" color="text.secondary" fontWeight={600}>PO: Drill Down</Typography>
              <Chip label="Customer: Nike Inc." color="primary" size="small" sx={{ my: 1, fontWeight: 600 }} />
              <Chip label="Style: Hoodie" color="secondary" size="small" sx={{ my: 1, fontWeight: 600 }} />
              <Box>
                <Chip label="Open PO in new tab" color="info" size="small" clickable sx={{ mt: 1, fontWeight: 600 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Order Matrix */}
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <CategoryIcon fontSize="large" sx={{ color: "#AB47BC", mb: 1, mx: "auto", display: "block" }} />
              <Typography variant="body2" color="text.secondary" fontWeight={600} align="center">Colorwise / Sizewise Order Matrix</Typography>
              <Table size="small" sx={{ mt: 1, minWidth: 224, bgcolor: "background.paper" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Color</TableCell>
                    {["XS","S","M","L","XL","XXL"].map(s => (
                      <TableCell key={s} align="center" sx={{ fontWeight: 700 }}>{s}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderMatrix.map((row) => (
                    <TableRow key={row.color}>
                      <TableCell align="center" sx={{ fontWeight: 500 }}>{row.color}</TableCell>
                      {["XS","S","M","L","XL","XXL"].map(s => (
                        <TableCell key={s} align="center">
                          <Chip size="small" label={row[s]} sx={{
                            bgcolor: "#f5f5f5",
                            fontWeight: 600,
                            color: "#333"
                          }} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        {/* Aging Summary */}
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent sx={{ textAlign: "center" }}>
              <WarningIcon fontSize="large" sx={{ color: "#F44336", mb: 1 }} />
              <Typography variant="body2" color="text.secondary" fontWeight={600}>Aging Summary - Pending PO<br />(Next 4 Weeks)</Typography>
              <Grid container spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                {agingData.map(({ week, pending }) => (
                  <Grid item xs={3} key={week}>
                    <Box sx={{
                      bgcolor: pending ? "#ffebee" : "#e8f5e9",
                      color: pending ? "#e53935" : "#43a047",
                      px: 1.5, py: 0.5, borderRadius: 1, fontWeight: 700,
                      textAlign: "center", fontSize: "1rem"
                    }}>
                      {week}<br /><span style={{ fontSize: "1.1rem" }}>{pending}</span>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography mb={1} fontWeight={600} color="text.secondary">PO Status Distribution</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={statusChart}>
                  <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#42A5F5" radius={5} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography mb={1} fontWeight={600} color="text.secondary">Customer-Wise Contribution</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={customerPie}
                    dataKey="value"
                    nameKey="name"
                    cx="50%" cy="50%" outerRadius={65}
                    label
                  >
                    {customerPie.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={["#1976D2","#81C784","#F06292","#FFD54F"][i % 4]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography mb={1} fontWeight={600} color="text.secondary">Weekly PO Trend</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={weeklyTrend}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="created" stroke="#3949AB" strokeWidth={2} />
                  <Line type="monotone" dataKey="approved" stroke="#43A047" strokeWidth={2} />
                  <Line type="monotone" dataKey="delivered" stroke="#00897B" strokeWidth={2} />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Escalation Alerts */}
      <Card sx={{
        mt: 3, px: 3, py: 2, maxWidth: 960, mx: "auto", borderLeft: "6px solid #F44336",
        bgcolor: "#fff", boxShadow: "0 4px 14px 0 rgba(244,67,54,0.07)", borderRadius: 2,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <WarningIcon sx={{ color: "#F44336", mr: 1, fontSize: 34 }} />
          <Typography variant="h6" fontWeight={700} color="#F44336">Escalation Alerts for Delayed PO Submission</Typography>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Delivery</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((a, i) => (
              <TableRow key={i} sx={{ bgcolor: i % 2 === 1 ? "#f5f5f5" : "#fff" }}>
                <TableCell>{a.customer}</TableCell>
                <TableCell>
                  <Chip label={a.delivery} sx={{ bgcolor: "#F44336", color: "#fff", fontWeight: 600 }} size="small" />
                </TableCell>
                <TableCell sx={{ color: "#D32F2F", fontWeight: 700 }}>{a.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}
