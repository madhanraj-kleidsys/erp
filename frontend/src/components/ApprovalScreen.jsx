

import React, { useState,useEffect } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Avatar,
  Sheet,
  Grid,
  Button,
  Modal,
  ModalDialog,
  ModalClose,
 
  IconButton,
} from "@mui/joy";
import {
  Schedule,
  CheckCircle,
  ArrowBack,
} from "@mui/icons-material";

import Header from './Header';
import Sidebar from './Sidebar';
 
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


const floatingCardSx = {
  p: 2,
  borderRadius: "md",
  bgcolor: "rgba(255 255 255 / 0.15)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow:
      "0 12px 40px 0 rgba(70, 130, 180, 0.6), 0 0 20px rgba(70, 130, 180, 0.4)",
    borderColor: "rgba(70, 130, 180, 0.3)",
  },
};


const approvalCardSx = {
  p: 2,
  borderRadius: "sm",
  border: "1px solid",
  borderColor: "neutral.300",
  minHeight: 160,
  bgcolor: "white",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "md",
    transform: "translateY(-4px)",
  },
};


const filters = [
  { id: "all", label: "All Approvals" },
  { id: "pending", label: "Pending Review" },
  { id: "approved", label: "Approved" },
];


export default function ApprovalScreen({ onBack }) {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedApproval, setSelectedApproval] = useState(null);


  // Sample data generator for approvals
  const generateApprovalData = () => {
    const suppliers = [
      "MUNESWARAN TEXTILES",
      "COIMBATORE SPINNING MILLS",
      "FASHION ACCESSORIES LTD",
      "TIRUPUR COTTON CORP",
      "CHENNAI FABRICS",
      "SALEM TEXTILES",
      "KARUR YARNS",
      "ERODE MILLS",
      "DINDIGUL COTTONS",
      "MADURAI SPINNERS",
    ];
    const items = [
      "Cotton Fabric Purchase",
      "Yarn Supply Request",
      "Garment Accessories Order",
      "Thread Purchase Order",
      "Button Supply Request",
      "Zipper Order",
      "Label Printing",
      "Packaging Material",
      "Quality Testing Services",
      "Transportation Services",
    ];


    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i + 1,
        title: `${items[i % items.length]} #SKPL-${Math.random()
          .toString(36)
          .substr(2, 6)
          .toUpperCase()}`,
        supplier: suppliers[i % suppliers.length],
        level: i % 2 === 0 ? "Second Level" : "First Level",
        status: i % 3 === 0 ? "Approved" : "Pending",
        date: `2025-08-${String(10 + (i % 20)).padStart(2, "0")}`,
        amount: `$${(Math.random() * 15000 + 3000).toFixed(0)}`,
        category:
          i % 4 === 0
            ? "Raw Material"
            : i % 4 === 1
            ? "Accessories"
            : i % 4 === 2
            ? "Services"
            : "Packaging",
        description: `${items[i % items.length]} for garment production operations.`,
      });
    }
    return data;
  };


  const allData = generateApprovalData();


  const filteredData = allData.filter((item) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "pending") return item.status === "Pending";
    if (currentFilter === "approved") return item.status === "Approved";
    return true;
  });


  return (
    <CssVarsProvider>
      <CssBaseline />


 <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Header />
            <Sidebar />
            <Box
              component="main"
              className="MainContent"
              sx={{
                px: { xs: 2, md: 6 },
                pt: {
                  xs: 'calc(12px + var(--Header-height))',
                  sm: 'calc(12px + var(--Header-height))',
                  md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
                gap: 1,
              }}
            >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          background:
            "linear-gradient(1, #6cf7e9ff 100%)",
          color: "white",
          p: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            py: 2,
            px: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "space-between",
            background: "#48c6e9",
            borderRadius: "md",
            boxShadow: "0 0 10px rgba(149, 241, 243, 0.7)",
          }}
        >
          <IconButton
            variant="plain"
            color="neutral"
            onClick={onBack}
            sx={{ color: "white" }}
          >
            {/* <ArrowBack /> */}
          </IconButton>
          <Typography level="h6" fontWeight="lg" sx={{ flexGrow: 1, textAlign: "center" }}>
            SKPL - Approval Management System
          </Typography>
          <Box sx={{ width: 40 }} /> {/* space for symmetry */}
        </Box>


        {/* Navigation / Filters */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            overflowX: "auto",
            bgcolor: "rgba(72, 198, 233, 0.15)",
            color: "#073763",
            borderRadius: "sm",
            border: "1px solid rgba(72,198,233,0.4)",
            fontWeight: "600",
            p: 2,
            userSelect: "none",
            whiteSpace: "nowrap",
            '&::-webkit-scrollbar': { display: "none" },
          }}
        >
          {filters.map((filter) => (
            <Sheet
              key={filter.id}
              variant={currentFilter === filter.id ? "solid" : "soft"}
              onClick={() => setCurrentFilter(filter.id)}
              sx={{
                cursor: "pointer",
                px: 2,
                py: 1,
                borderRadius: "sm",
                flexShrink: 0,
                textTransform: "uppercase",
                fontSize: "0.75rem",
                color: currentFilter === filter.id ? "white" : "#0a213f",
                userSelect: "none",
              }}
            >
              {filter.label}
            </Sheet>
          ))}
        </Box>


        {/* Summary Cards */}
        <Grid container spacing={2}>
          <Grid xs={12} sm={4} md={3}>
            <Sheet variant="soft" sx={floatingCardSx}>
              <Typography level="body1" fontWeight="lg" sx={{ color: "#073763" }}>
                Total Approvals
              </Typography>
              <Typography level="h4" fontWeight="xl" sx={{ color: "#48c6e9" }}>
                {allData.length}
              </Typography>
            </Sheet>
          </Grid>
          <Grid xs={12} sm={4} md={3}>
            <Sheet variant="soft" sx={floatingCardSx}>
              <Typography level="body1" fontWeight="lg" sx={{ color: "#073763" }}>
                Pending Review
              </Typography>
              <Typography level="h4" fontWeight="xl" sx={{ color: "#de7a1f" }}>
                {allData.filter((item) => item.status === "Pending").length}
              </Typography>
            </Sheet>
          </Grid>
          <Grid xs={12} sm={4} md={3}>
            <Sheet variant="soft" sx={floatingCardSx}>
              <Typography level="body1" fontWeight="lg" sx={{ color: "#073763" }}>
                Approved
              </Typography>
              <Typography level="h4" fontWeight="xl" sx={{ color: "#3a9a3a" }}>
                {allData.filter((item) => item.status === "Approved").length}
              </Typography>
            </Sheet>
          </Grid>
        </Grid>


        {/* Approval Cards Grid */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 2 }}>
          <Grid container spacing={2}>
            {filteredData.map((item) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Sheet
                  variant="outlined"
                  sx={approvalCardSx}
                  onClick={() => setSelectedApproval(item)}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        mr: 1,
                        bgcolor: item.status === "Pending" ? "#ffa726" : "#66bb6a",
                        color: "white",
                      }}
                    >
                      {item.status === "Pending" ? (
                        <Schedule fontSize="small" />
                      ) : (
                        <CheckCircle fontSize="small" />
                      )}
                    </Avatar>
                    <Typography
                      level="body2"
                      sx={{ fontWeight: "bold", fontSize: "0.85rem", color: "#073763" }}
                      title={item.supplier}
                    >
                      {item.supplier.length > 20
                        ? `${item.supplier.substring(0, 20)}...`
                        : item.supplier}
                    </Typography>
                  </Box>


                  <Typography
                    level="body3"
                    sx={{
                      bgcolor: "#e3f2fd",
                      px: 1,
                      py: 0.3,
                      borderRadius: "xs",
                      display: "inline-block",
                      mb: 1,
                      fontSize: "0.7rem",
                      color: "#1a5ea8",
                    }}
                  >
                    {item.category}
                  </Typography>


                  <Typography
                    level="body2"
                    sx={{ mb: 1, fontSize: "0.8rem", lineHeight: 1.3, color: "#24426a" }}
                    title={item.title}
                  >
                    {item.level}:{" "}
                    {item.title.length > 40 ? item.title.substring(0, 40) + "..." : item.title}
                  </Typography>


                  <Typography
                    level="h6"
                    sx={{ fontWeight: "bold", color: "#48c6e9", mb: 1 }}
                    title={item.amount}
                  >
                    {item.amount}
                  </Typography>


                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Sheet
                      sx={{
                        px: 1,
                        py: 0.2,
                        bgcolor: item.status === "Pending" ? "#fff3e0" : "#e8f5e8",
                        color: item.status === "Pending" ? "#f57c00" : "#2e7d32",
                        borderRadius: "sm",
                        fontSize: "0.65rem",
                        fontWeight: "bold",
                      }}
                    >
                      {item.status}
                    </Sheet>
                    <Typography
                      level="body3"
                      sx={{ fontSize: "0.65rem", color: "neutral.600" }}
                      title={item.date}
                    >
                      {item.date}
                    </Typography>
                  </Box>
                </Sheet>
              </Grid>
            ))}
          </Grid>
        </Box>


        {/* Approval Details Modal */}
        <Modal open={Boolean(selectedApproval)} onClose={() => setSelectedApproval(null)}>
          <ModalDialog
            variant="outlined"
            color="primary"
            sx={{
              background: "rgba(255, 255, 255, 1)",
              border: "1px solid rgba(134, 214, 238, 0.7)",
              backdropFilter: "blur(1px)",
              mx: 2,
              maxWidth: 600,
            }}
          >
            <ModalClose />
            <Typography
              component="h2"
              level="h4"
              fontWeight="xl"
              mb={2}
              sx={{ color: "#48c6e9" }}
            >
              Approval Details
            </Typography>
            {selectedApproval && (
              <Box sx={{ color: "#101010", fontSize: "0.9rem" }}>
                <Typography mb={1}>
                  <strong>Title:</strong> {selectedApproval.title}
                </Typography>
                <Typography mb={1}>
                  <strong>Supplier:</strong> {selectedApproval.supplier}
                </Typography>
                <Typography mb={1}>
                  <strong>Level:</strong> {selectedApproval.level}
                </Typography>
                <Typography mb={1}>
                  <strong>Category:</strong> {selectedApproval.category}
                </Typography>
                <Typography mb={1} color="#06dd1f">
                  <strong>Amount:</strong> {selectedApproval.amount}
                </Typography>
                <Typography mb={1}>
                  <strong>Date:</strong> {selectedApproval.date}
                </Typography>
                <Typography mb={1}>
                  <strong>Status:</strong> {selectedApproval.status}
                </Typography>
                <Typography
                  mb={1}
                  sx={{
                    p: 2,
                    background: "rgba(143, 245, 139, 0.43)",
                    borderRadius: 1,
                    fontSize: "0.85rem",
                  }}
                >
                  <strong>Description:</strong> {selectedApproval.description}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button variant="solid" color="success" sx={{ textTransform: "none" }}>
                Approve
              </Button>
              <Button variant="solid" color="danger" sx={{ textTransform: "none" }}>
                Reject
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: "auto", textTransform: "none" }}
                onClick={() => setSelectedApproval(null)}
              >
                Close
              </Button>
            </Box>
          </ModalDialog>
        </Modal>


      </Box>
      </Box>
      </Box> 


    </CssVarsProvider>
  );
}