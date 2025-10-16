
import React, { useRef, useState } from "react";
import { Box, Typography, Button, Stack, Input, Sheet } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

const companyAddress = {
    line1: "THE FACTORIES ACT 1948 & THE TAMILNADU FACTORIES RULES 1950",
    line2: "FORM No. 34",
    line3: "(Prescribed under Rule 93)",
    title2: "NOMINATION"
};


export default function NominaTion({ employee, isBooklet }) {
    const printRef = useRef();

    const handleDownloadPDF = () => {
        if (!printRef.current) return;

        html2pdf()
            .set({
                margin: 1,
                filename: "Nomination.pdf",
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
                pagebreak: { mode: ["css", "legacy"] }
            })
            .from(printRef.current)
            .save();
    };

    const handleDownloadPNG = async () => {
        const canvas = await html2canvas(printRef.current);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "Confirmation_Order.png";
        link.click();
    };

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                {/* <Sidebar sx={{ flexShrink: 0, width: { xs: 60, sm: 220 } }} /> */}
                <Box sx={{ flexGrow: 1, p: 1, bgcolor: 'white', overflowY: 'auto' }}>
                    <Header />
                    {!isBooklet && (
                        <>
                            {/* Controls for Download */}
                            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
                                <Button variant="solid" onClick={handleDownloadPDF}>Download PDF</Button>
                                <Button variant="solid" onClick={handleDownloadPNG}>Download as PNG</Button>
                            </Box>
                        </>)}
                    {/* Nomination */}

                    <Box
                        ref={printRef}
                        sx={{
                            // borderRadius: 2,
                            // bgcolor: "#fff",
                            // width: "780px",
                            // height: "1123px",
                            // margin: "auto",
                            // boxShadow: 2, p: 0.3,

                            // position: "relative",
                            // boxSizing: "border-box",
                            // overflow: "hidden",

                            width: "780px",
                            border: "2px solid #000000ff",
                            borderRadius: 2,
                            mx: "auto",
                            my: 3,mt:5,mb:30,
                            boxSizing: "border-box",
                            fontFamily: "'Noto Sans', Arial, sans-serif",
                            bgcolor: "#fff", overFlowX: "hidden"
                        }}
                    >

                        <Box mt={2} sx={{ border: '0.5 px solid #000000ff' }} >
                            <Box mb={2} color="rgba(0, 0, 0, 1)">

                                {/* Company details centered */}
                                <Box textAlign="center" color="rgba(0, 0, 0, 1)">
                                    <Typography fontWeight="bold" color="#000" fontSize={14}>
                                        {companyAddress.line1}
                                    </Typography>
                                    <Typography fontWeight="xl" color="#000" fontSize={14} >
                                        {companyAddress.line2}
                                    </Typography>
                                    <Typography fontSize={14} fontWeight="xl" color="#000">
                                        {companyAddress.line3}
                                    </Typography>

                                    <Typography color="#000" fontSize={14} fontWeight="xl">
                                        {companyAddress.title2}
                                    </Typography>

                                    <Box sx={{ height: 2, bgcolor: 'black', width: '100%', my: 1 }} />
                                </Box>

                            </Box>


                            <Box color="rgba(0, 0, 0, 1)">

                                {/* Recipient Info */}
                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Box color="#000" ml={2}>
                                        <Typography color="#000" fontSize={13}><b>Employee Name : {employee?.EmpName || ""}</b></Typography>
                                        <Typography color="#000" mt={2} fontSize={13}><b>Designation : {employee?.Desg || ""}</b></Typography>
                                    </Box>
                                    <Box color="#000" textAlign="right" mr={21}>
                                        <Typography color="#000" fontSize={13}><b> ID No : {employee.EmpCode}</b></Typography>
                                    </Box>
                                </Box>

                                <Typography color="#000" fontSize={12} ml={5} mt={5}>I hereby request that in the event of my death during my service period in this company, my balance of Pay, Earned leave / Leave with wages,
                                    Bonus and other pending payments if any shall be paid to <strong> {employee.FathersName || "null"}  </strong>  who is my father and residing at <strong> {employee.PermanentAddress} </strong>
                                </Typography>
                            </Box>




                            {/* Closing */}
                            <Box display="flex" justifyContent="space-between" mb={2} mt={6}>
                                <Box ml={3} color="#000" >
                                    <Typography color="#000" fontSize={15}> <b> Witness :  </b> </Typography>
                                </Box>

                                <Box mr={21} textAlign="right" color="#000" >
                                    <Typography color="#000" fontSize={15}><b>Signature of Witness : </b> </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb={2} mt={3}>
                                <Box ml={5} color="#000" >
                                    <Typography color="#000" fontSize={15} > <b> 1 ) </b> </Typography>
                                    <Typography color="#000" fontSize={15} mt={4}> <b> 2 )  </b> </Typography>
                                </Box>

                                <Box mr={32} color="#000" >
                                    <Typography color="#000" fontSize={15}><b> 1 ) </b> </Typography>
                                    <Typography color="#000" fontSize={15} mt={4} ><b> 2 ) </b> </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent={"space-between"} mt={12}  >
                                <Box ml={3} color="#000" >
                                    <Typography color="#000" fontSize={13}><b>Date : </b>  {new Date().toLocaleDateString()}  </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb={12} mt={3}>
                                <Box ml={3} color="#000" >
                                    <Typography color="#000" fontSize={13}>
                                        <b>Place :</b>  {
                                            employee.Addr
                                                ? employee.Addr.split(" - ")[0].split(",").pop().trim()
                                                : ""}
                                    </Typography>
                                </Box>

                                <Box mr={18} textAlign="right" color="#000"   mt={8}>
                                    <Typography color="#000" fontSize={13}><b>Signature of Worker </b> </Typography>
                                </Box>

                            </Box>

                        </Box>

                    </Box>

                </Box>
            </Box>
        </CssVarsProvider>
    );
}
