
import React, { useRef, useState } from "react";
import { Box, Typography, Button, Table } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import reportLogo from '../../assets/reportLogo.png';

const companyAddress = {
    title3: "सेवा रिकॉर्ड",
    title2: "சேவை பதிவு",
    title1: "SERVICE RECORD"
};


export default function NominaTion({ employee, isBooklet }) {
    const printRef = useRef();

    const handleDownloadPDF = () => {
        if (!printRef.current) return;
        html2pdf()
            .set({
                margin: 1,
                filename: "serviceRecords.pdf",
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
        link.download = "serviceRecords.png";
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
                            // p: { xs: 1, sm: 1, md: 1 },
                            // position: "relative",
                            // boxSizing: "border-box",
                            // overflow: "hidden", color: "#000"
                            width: "780px",
                            border: "2px solid #000000ff",
                            borderRadius: 2,
                            mx: "auto", 
                            my: 3,mt:10,mb:44,
                        
                            boxSizing: "border-box",
                            fontFamily: "'Noto Sans', Arial, sans-serif",
                            bgcolor: "#fff", overFlowX: "hidden"
                        }}
                    >

                        <Box sx={{ border: '1 px solid #000000ff' }} >
                            <Box mb={2} color="rgba(0, 0, 0, 1)">
                                <Box display="flex" alignItems="center" justifyContent="space-between"  >
                                    {/* Logo on the left */}
                                    <Box mt={2} ml={5} >
                                        <img
                                            src={reportLogo || employee?.ComLogo}
                                            alt="Company Logo"
                                            style={{ maxHeight: 44 }}
                                        />
                                    </Box>

                                    {/* Company details centered */}
                                    <Box mr={19} textAlign="center" color="rgba(0, 0, 0, 1)">
                                        <Typography mt={1} fontWeight="bold" color="#000" fontSize={16}>
                                            {employee.BUName}
                                        </Typography>
                                        <Typography fontWeight="xl" color="#000" fontSize={14} mb={1}>
                                            {employee.CmpName}
                                        </Typography>
                                        <Typography fontSize={12} color="#000">
                                            {employee.Addr}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box textAlign="center" color="rgba(0, 0, 0, 1)">

                                    <Box sx={{ height: 2, bgcolor: 'black', width: '100%', mt: 1 }} />
                                    <Typography color="#000" fontSize={10} fontWeight="xl">{companyAddress.title1}</Typography>
                                    <Typography color="#000" fontSize={10} fontWeight="xl">{companyAddress.title2}</Typography>
                                    <Typography color="#000" fontSize={10} fontWeight="xl">{companyAddress.title3}</Typography>
                                    <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex",color: "#000", gap: 2 }}>
                                <Box sx={{ flex: 1, color: "#000", ml: 5 }}>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>Name :</Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>பெயர் : <span style={{ fontWeight: "normal" }}>{employee.EmpName}</span></Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>नाम :</Typography>
                                    <br />
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>Emp No :</Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>பணியாளர் எண் : <span style={{ fontWeight: "normal" }}>{employee.EmpCode}</span></Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>कर्मचारी संख्या :</Typography>
                                    <br />
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>D.O.J :</Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>சேர்ந்த தேதி : <span style={{ fontWeight: "normal" }}>{employee.JoiningDate}</span></Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>शामिल होने की तारीख : :</Typography>
                                </Box>
                                {/* Right column */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>Designation :</Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>பதவி : <span style={{ fontWeight: "normal" }}>{employee.Desg}</span></Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>पद का नाम : <span style={{ fontWeight: "normal" }}></span></Typography>
                                    <br />
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>Department :</Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>துறை : <span style={{ fontWeight: "normal" }}>{employee.Dept}</span></Typography>
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>विभाग :</Typography>
                                    <br />
                                    <Typography color="#000" fontWeight="bold" fontSize={10}>Wage Rate :</Typography>
                                    <Typography fontWeight="bold" color="#000" fontSize={10}>ஊதிய விகிதம் : <span style={{ fontWeight: "normal" }}>15000</span></Typography>
                                    <Typography fontWeight="bold" color="#000" fontSize={10}>मजदूरी दर : </Typography>
                                </Box>
                            </Box>


                            <Box sx={{ height: 2, bgcolor: 'black', width: '100%', mt: 3 }} />
                            <Box sx={{ color: "#000" }}>
                                <Box sx={{ fontWeight: "bold", p: 1, borderBottom: "1px solid #000", fontSize: 12, background: "#fafafa" }}>
                                    Service Details :
                                </Box>
                                <Table
                                    sx={{
                                        fontSize: 10,
                                        border: "1px solid #000",
                                        borderCollapse: "collapse",
                                        color: "#000000ff",
                                        "& th, & td": { border: "1px solid #000 !important", padding: "4px 8px", textAlign: "center" },
                                        "& th": { fontWeight: "bold", background: "#fff" }
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{color: "#000"}} >S No</th>
                                            <th style={{color: "#000"}}>Date</th>
                                            <th style={{color: "#000"}}>Designation</th>
                                            <th style={{color: "#000"}}>Basic</th>
                                            <th style={{color: "#000"}}>DA</th>
                                            <th style={{color: "#000"}}>HRA</th>
                                            <th style={{color: "#000"}}>OA</th>
                                            <th style={{color: "#000"}}>Wages</th>
                                            <th style={{color: "#000"}}>Approved By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>1</td>
                                            <td>{employee.JoiningDate}</td>
                                            <td>{employee.Desg}</td>
                                            <td>10050.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>3000.00</td>
                                            <td>15000.00</td>
                                            <td> </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Box>
                            {/* Closing */}
                            <Box display="flex" justifyContent="space-between" mb={2} mt={10}>
                                <Box ml={2} color="#000" >
                                </Box>

                                <Box mr={15} textAlign="right" color="#000" >
                                    <Typography color="#000" fontSize={15}><b>Employee Signature  </b> </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb={2} mt={3}>
                                <Box ml={2} color="#000" >

                                </Box>

                                <Box mr={18} textAlign="right" color="#000" mt={5}>
                                    <Typography color="#000" fontSize={13}><b>{employee.EmpName}</b> </Typography>
                                </Box>

                            </Box>

                        </Box>

                    </Box>

                </Box>
            </Box>
        </CssVarsProvider>
    );
}
