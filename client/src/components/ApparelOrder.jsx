import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Sheet,
  Grid,
  Button,
  Modal,
  ModalDialog,
  ModalClose,
  IconButton,
} from "@mui/joy";
import { ArrowBack } from "@mui/icons-material";

import Header from './Header';
import Sidebar from './Sidebar';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

const apiUrl = import.meta.VITE_API_URL || 'http://localhost:3000/api'

const cardSx = {
  p: 2,
  borderRadius: "sm",
  border: "1px solid",
  borderColor: "neutral.300",
  cursor: "pointer",
  transition: "all 0.2s ease",
  bgcolor: "white",
  "&:hover": {
    boxShadow: "md",
    transform: "translateY(-4px)",
  },
};

export default function AdmDocumentNumberList({ onBack }) {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/approval/getdata`)
      .then((response) => {
        if (response.data.success) {
          setRecords(response.data.data);
        } else {
          console.error("Failed to fetch data");
        }
      })
      .catch((err) => {
        console.error("API fetch error:", err);
      });
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{
            px: { xs: 2, md: 6 },
            pt: 'calc(12px + var(--Header-height))',
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            background: "linear-gradient(1, #6cf7e9ff 100%)",
            color: "white",
            p: 2,
          }}>
            {/* Header */}
            <Box sx={{
              py: 2,
              px: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "space-between",
              background: "#48c6e9",
              borderRadius: "md",
              boxShadow: "0 0 10px rgba(149, 241, 243, 0.7)",
            }}>
              <IconButton variant="plain" color="neutral" onClick={onBack} sx={{ color: "white" }}>
                <ArrowBack />
              </IconButton>
              <Typography level="h6" fontWeight="lg" sx={{ flexGrow: 1, textAlign: "center" }}>
                AdmDocumentNumberConstructs Records
              </Typography>
              <Box sx={{ width: 40 }} />
            </Box>

            {/* Records Grid */}
            <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 2 }}>
              <Grid container spacing={2}>
                {records.map(record => (
                  <Grid xs={12} sm={6} md={4} lg={3} key={record.ID}>
                    <Sheet
                      variant="outlined"
                      sx={cardSx}
                      onClick={() => setSelectedRecord(record)}
                    >
                      <Typography level="h6" sx={{ mb: 1 }}>{record.Name}</Typography>
                      <Typography>Code: {record.Code}</Typography>
                      <Typography>Status: {record.IsActive === 1 ? "Active" : "Inactive"}</Typography>
                    </Sheet>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Details Modal */}
            <Modal open={Boolean(selectedRecord)} onClose={() => setSelectedRecord(null)}>
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
                {selectedRecord && (
                  <Box sx={{ color: "#101010", fontSize: "0.9rem" }}>
                    <Typography component="h2" level="h4" fontWeight="xl" mb={2} sx={{ color: "#48c6e9" }}>
                      Record Details
                    </Typography>
                    <Typography mb={1}><strong>ID:</strong> {selectedRecord.ID}</Typography>
                    <Typography mb={1}><strong>Code:</strong> {selectedRecord.Code}</Typography>
                    <Typography mb={1}><strong>Name:</strong> {selectedRecord.Name}</Typography>
                    <Typography mb={1}><strong>Is Active:</strong> {selectedRecord.IsActive === 1 ? "Yes" : "No"}</Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                      <Button
                        variant="outlined"
                        sx={{ ml: "auto", textTransform: "none" }}
                        onClick={() => setSelectedRecord(null)}
                      >
                        Close
                      </Button>
                    </Box>
                  </Box>
                )}
              </ModalDialog>
            </Modal>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
