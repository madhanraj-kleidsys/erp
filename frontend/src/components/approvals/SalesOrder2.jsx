import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Modal,
  ModalDialog,
  ModalClose,
  Sheet,
  Grid, Chip,
  Button
} from "@mui/joy";


import Header from '../Header';
import Sidebar from '../Sidebar';


import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:3000/api`;

function ApprovalList({ apiEndpoint, title }) {

  const [currentPage, setCurrentPage] = useState(0);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [data, setData] = useState([]);


  const handleCardClick = (page) => {
    setCurrentPage(page);
  };


  React.useEffect(() => {
    axios.get(apiEndpoint)
      .then(res => {
        if (res.data?.success && Array.isArray(res.data.data)) {
          setData(res.data.data[0]);
        }
      })
      .catch(console.error);
  }, [apiEndpoint]);

  // Small card style
  const smallCardSx = {
    p: 1.5,
    borderRadius: "sm",
    border: "1px solid",
    borderColor: "neutral.300",
    minHeight: 120,
    bgcolor: "white",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: "md",
      transform: "translateY(-2px)",
    },
  };

  const getPriorityColor = priority => {
    if (priority === "HIGH") return "danger";
    if (priority === "MEDIUM") return "warning";
    if (priority === "LOW") return "success";
    return "neutral";
  };

  // const commonProps = {
  //   onBack: () => setCurrentPage(0),
  //   onNavChange: setCurrentPage,

  // };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />

        <Box component="main"
          className="MainContent"

          sx={{
            p: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height ))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}>

          <Sheet
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              background: "linear-gradient(1  #6cf7e9ff 100%)",
              color: "white",
            }}
          >

            <Box sx={{ p: 2, borderRadius: 'md', bgcolor: '#77d7fa', color: '#032a40', mb: 2 }}>
              <Typography level="h3" fontWeight="lg" textAlign="center">
                SKPL —  {title}
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                background: "rgba(255 255 255 / 0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              {currentPage === 0 && (
                <>

                  <Typography level="h3" sx={{ textAlign: 'center', mb: 3, color: "#000000ff" }}>
                    {title}
                  </Typography>

                  <Grid container spacing={1} mb={3}>
                    {data.map((card, index) => (
                      <Grid xs={12} sm={6} md={4} lg={3} key={card.ID || index}>
                        <Sheet variant="outlined" sx={smallCardSx} onClick={() => setSelectedCard(card)}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Avatar sx={{ width: 30, height: 30, mr: 1, fontSize: "1rem", bgcolor: "neutral" }}>
                              🧑🏻
                            </Avatar>
                            <Typography level="body2" sx={{ color: "#11d7ffff", fontWeight: "bold", fontSize: "0.8rem" }}>
                              {card.RespondentUserName?.toUpperCase()}
                            </Typography>
                            <Chip
                              size="sm"
                              color={getPriorityColor(card.Priority)}
                              variant="solid"
                              sx={{ ml: 1 }}
                            >
                              {card.Priority}
                            </Chip>
                          </Box>
                          <Typography level="body2" sx={{ mb: 1, fontSize: "0.75rem", lineHeight: 1.2, color: 'neutral.650', py: 2 }}>
                            {card.ParsedMessageText}
                          </Typography>
                          <Typography level="body3" sx={{ fontSize: "0.65rem", color: "neutral.600", mt: 1 }}>
                            {new Date(card.TargetOn).toLocaleString()}
                          </Typography>
                        </Sheet>
                      </Grid>
                    ))}
                  </Grid>

                </>
              )}

            </Box>

            <Modal open={Boolean(selectedCard)} onClose={() => setSelectedCard(null)}>
              <ModalDialog variant="outlined" color="primary"
                sx={{
                  background: "rgba(255, 255, 255, 1)",
                  border: "1px solid rgba(134, 214, 238, 0.7)",
                  backdropFilter: "blur(1px)",
                  mx: 2,
                }}>
                <ModalClose />
                {selectedCard && (
                  <Grid container spacing={2} color="#101010ff">
                    <Grid xs={12}>
                      <Typography component="h2" level="h4" fontWeight="xl" mb={2} sx={{ color: "#48c6e9" }}>
                        {selectedCard.AdmTransactionsCode}
                      </Typography>
                    </Grid>
                    <Grid xs={12}>
                      <Typography level="h4" mb={2}>
                        Transaction ID : {selectedCard.TransactionID}
                      </Typography>
                    </Grid>
                    <Grid xs={6}>
                      <Typography mb={1} sx={{ textTransform: 'uppercase' }}>
                        <strong>Supplier:</strong> {selectedCard.RespondentUserName || ""}
                      </Typography>
                      <Typography mb={1}>
                        <strong>Item:</strong> item
                      </Typography>
                      <Typography mb={1}>
                        <strong>Level:</strong> level
                      </Typography>
                    </Grid>
                    <Grid xs={6}>
                      <Typography mb={1} color="#06dd1fff">
                        <strong>Amount:</strong> $ 55846
                      </Typography>
                      <Typography mb={1}>
                        <strong>category :</strong> Raw Material
                      </Typography>
                      <Typography mb={1}>
                        <strong>Date:</strong> {new Date(selectedCard.TargetOn).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid xs={12}>
                      <Typography color="#12f52dff"
                        sx={{
                          p: 2,
                          background: "rgba(143, 245, 139, 0.43)",
                          borderRadius: 10,
                          fontSize: "0.9rem",
                        }}>
                        <strong>Description:</strong> {selectedCard.ParsedMessageText}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: 'wrap' }}>
                  <Button variant="solid" color="primary" sx={{ textTransform: "none" }}>
                    View Details
                  </Button>
                  <Button variant="outlined" color="neutral" sx={{ ml: "auto" }} onClick={() => setSelectedCard(null)}>
                    Close
                  </Button>
                </Box>
              </ModalDialog>
            </Modal>

          </Sheet>

        </Box>

      </Box>

    </CssVarsProvider>
  );
}



export function SalesOrder2() {
  return <ApprovalList apiEndpoint={`${apiUrl}/salesOrder2`} title="Sales Order 2" />;
}


export function ServInvoice() {
  return <ApprovalList apiEndpoint={`${apiUrl}/servInvoice`} title="Service Invoice" />;
}


export function VendorBill() {
  return <ApprovalList apiEndpoint={` ${apiUrl}/vendorBill`} title="Vendor Bill" />;
}


export function StkRecpNote() {
  return <ApprovalList apiEndpoint={`${apiUrl}/stkRecpNote`} title="Stock Receipt Note" />;
}


export function StyleJobWork() {
  return <ApprovalList apiEndpoint={`${apiUrl}/styleJobWork`} title="Style Job Work" />;
}


export function ProcureOrder() {
  return <ApprovalList apiEndpoint={` ${apiUrl}/procureOrder`} title="Procure Order" />;
}


export function StkRequestNote() {
  return <ApprovalList apiEndpoint={`${apiUrl}/stkRequestNote`} title="Stock Request Note" />;
}