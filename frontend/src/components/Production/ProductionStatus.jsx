import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Sheet,
    Grid,
} from "@mui/joy";

import Header from '../Header';
import Sidebar from '../Sidebar';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

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

export default function ProductionStatus() {
    const [productionStatus, setProductionStatus] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/productionStatus")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    setProductionStatus(data.data[0]);
                }
            })
            .catch(console.error);
    }, []);


    return ( 
        <CssVarsProvider disableTransitionOnChange>
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

                    <Sheet
                        sx={{
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            background: "linear-gradient(1  #6cf7e9ff 100%)",
                            color: "white",
                        }}
                    >
                        {/* Header */}
                        <Box
                            sx={{
                                position: 'sticky',
                                top: 0,
                                zIndex: 110,
                                p: { xs: 1, sm: 2, md: 3 },
                                borderRadius: 'md',
                                bgcolor: '#77d7fa',
                                color: '#000000ff',
                                mx: { xs: 2, sm: 4, md: 8, lg: 10 },
                                mt: { xs: 1, sm: 2, md: 3 },
                            }}
                        >
                            <Typography
                                level={{ xs: "h5", sm: "h4", md: "h3" }}
                                fontWeight="lg"
                                textAlign="center"
                            >
                                KleidSys Technologies — Production Status System
                            </Typography>
                        </Box>


                        {/* Main Content */}
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                p: 2,
                                background: "rgba(255 255 255 / 0.05)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <>
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{
                                        width: "100%",
                                        // maxWidth: 600,
                                        maxWidth: { xs: '100%', md: 1200 },
                                        mx: "auto",
                                        px: 1,
                                    }}
                                >
                                    {[
                                        { label: "DyingCount", value: productionStatus?.DyingCount },
                                        { label: "SewingCount", value: productionStatus?.SewingCount },
                                        { label: "TestingCount", value: productionStatus?.TestingCount },
                                        { label: "RejectedCount", value: productionStatus?.RejectedCount },
                                    ].map(({ label, value }) => (
                                        <Grid xs={12} sm={6} key={label}>
                                            <Box
                                                sx={{
                                                    ...smallCardSx,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    // justifyContent: "center",
                                                    alignItems: "center",
                                                    height: 140,
                                                    textAlign: "center",
                                                    px: 2,
                                                }}
                                            >
                                                <Typography
                                                    level="body2"
                                                    fontWeight="lg"
                                                    sx={{ mb: 1, color: "#111b1aff" }}
                                                >
                                                    {label}
                                                </Typography>
                                                <Typography
                                                    level="h3"
                                                    fontWeight="xl"
                                                    sx={{ fontSize: '2.8rem', lineHeight: 1, mt: 2, color: "#00e1ffff" }}
                                                >
                                                    {value ?? "-"}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>


                            </>

                        </Box>

                    </Sheet>
                </Box >

            </Box >
        </CssVarsProvider>
    );
}
