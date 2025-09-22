import React, { useRef, useState } from "react";
import { Box, Typography, Button, Stack, Input, Sheet } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import reportLogo from '../../assets/reportLogo.png'

const companyAddress = {
    title1: "Letter of acceptance to receive wages through Bank",
    title2: "வங்கி மூலம் ஊதியம் பெறுவதற்கான ஒப்புதல் கடிதம்",
    title3: "बैंक के माध्यम से मजदूरी प्राप्त करने के लिए स्वीकृति पत्र"
};


export default function letterOfAcceptance({ employee, isBooklet }) {


    const printRef = useRef();

    const handleDownloadPDF = () => {
        if (!printRef.current) return;
        html2pdf()
            .set({
                margin: 0.2,
                filename: "AcceptanceLetter.pdf",
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
            <Box sx={{ fontFamily: "'Noto Sans Tamil', 'Noto Sans Devanagari', 'Noto Sans', sans-serif", display: 'flex', minHeight: '100vh' }}>
                <Box sx={{ flexGrow: 1, p: 1, bgcolor: 'white', overflowY: 'auto' }}>
                    <Header />
                    {!isBooklet && (
                        <>                    {/* Controls for Download */}
                            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
                                <Button variant="solid" onClick={handleDownloadPDF}>Download PDF</Button>
                                <Button variant="solid" onClick={handleDownloadPNG}>Download as PNG</Button>
                            </Box>
                        </>)}
                    {/* Acceptance Letter */}

                    <Box
                        ref={printRef}
                        sx={{
                            // borderRadius: 2, border: '2px solid #000000ff',
                            // bgcolor: "#fff",
                            // width: "780px",
                            // height: "1123px",
                            // margin: "auto",
                            // boxShadow: 2,
                            // p: { xs: 1, sm: 1, md: 1 },
                            // position: "relative",
                            // boxSizing: "border-box",
                            // overflowX: "hidden",

                            width: "780px",
                            border: "2px solid #000000ff",
                            borderRadius: 2,
                            mx: "auto",
                            my: 3,mt:10,mb:2,
                            boxSizing: "border-box",
                            fontFamily: "'Noto Sans', Arial, sans-serif",
                            bgcolor: "#fff", overFlowX: "hidden"
                        }}
                    >

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

                                <Typography color="#000" fontSize={14} fontWeight="xl">{companyAddress.title1}</Typography>
                                <Typography color="#000" fontSize={14} fontWeight="xl">{companyAddress.title2}</Typography>
                                <Typography color="#000" fontSize={14} fontWeight="xl">{companyAddress.title3}</Typography>


                                <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
                            </Box>
                        </Box>


                        <Box color="rgba(0, 0, 0, 1)">

                            {/* Recipient Info */}
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Box color="#000" >
                                    <Typography color="#000" ml={2} fontSize={12}><b> From / அனுப்புநர் / प्रेषक, </b></Typography>
                                    <Typography color="#000" fontSize={12} ml={5} my={2}> <b>Name / பெயர் / नाम :</b>  {employee?.EmpName || ""}</Typography>
                                    <Typography color="#000" fontSize={12} ml={5} my={2}> <b>Emp No / பணியாளர்
                                        எண் / कर्मचारी संख्या :</b> {employee?.FathersName || ""}</Typography>
                                    <Typography color="#000" fontSize={12} ml={5} my={2}> <b>Address / முகவரி /पता : </b> {employee?.PermanentAddress || ""}</Typography>
                                </Box>

                                <Box textAlign="right" mr={15}>
                                    {/* <Typography fontSize={13} my={2}> {employee?.EmpName || ""}</Typography> */}
                                </Box>
                            </Box>

                            <Typography color="#000" ml={2} fontSize={12}><b> To / பெறுநர் / प्राप्तकर्ता, </b></Typography>

                            <Box display="flex" justifyContent="space-between" mb={2}>

                                <Box color="#000" ml={3}>
                                    <Typography color="#000" fontSize={13} ml={2} my={2}> {employee?.BUName || ""}</Typography>
                                    <Typography color="#000" fontSize={13} ml={2} my={2}>{employee?.CmpName || ""}</Typography>
                                    <Typography color="#000" fontSize={13} ml={2} my={2}>{employee?.Addr || ""}</Typography>
                                </Box>
                                <Box textAlign="right" mr={15}>

                                </Box>
                            </Box>


                            {/* Multi-language Intro */}
                            <Typography fontSize={13} ml={2} color="#000" sx={{ whiteSpace: "pre-line", mt: 2 }}><strong> Sir / Madam, </strong></Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={2} mt={1} color="rgba(0, 0, 0, 1)" >
                            <Box color="#000" ml={2}>
                                <Typography color="#000" fontSize={13} ml={2} my={1}> I, <b> {employee.EmpName} </b> , from <b> {employee.BUName} </b>,  <b>{employee.Addr}</b> Emp.No : <b>{employee.EmpCode} </b> hereby agree to receive my wages
                                    from our Company in my Saving / Salary A/C No. <b> {employee.PFNo}</b> held with
                                </Typography>
                                <Typography color="#000" fontSize={13} my={1} ml={2}>
                                    நான், <b> {employee.EmpName} </b> , <b> {employee.BUName} </b>, <b>{employee.Addr}</b> Emp.No :  <b>{employee.EmpCode} </b> இதன் மூலம் எங்கள்
                                    நிறுவனத்திடமிருந்து எனது சேமிப்பு / சம்பள கணக்கு எண். <b> {employee.PFNo}</b>  உடன் எனது ஊதியத்தைப் பெற ஒப்புக்கொள்கிறேன                                </Typography>

                                <Typography color="#000" fontSize={13} my={1} ml={2}>
                                    मैं , <b> {employee.EmpName} </b>, <b> {employee.BUName} </b>,  <b>{employee.Addr}</b> कर्मचारी संख्या का एक प्रभाग: 101277 इसके द्वारा मेरी कंपनी से मेरे
                                    बचत / वेतन खाता संख्या <b> {employee.PFNo}</b>  में मेरा वेतन प्राप्त करने के लिए सहमत ह
                                </Typography>
                            </Box>
                        </Box>

                        <Box color="#000" ml={68} mt={2}>
                            <Typography my={1} color="#000">Yours Faithfully</Typography>
                            <Typography my={1} color="#000">உண்மையுள்ள</Typography>
                            <Typography my={1} color="#000"> आपका आशीर्वाद ह</Typography>
                        </Box>

                        <Box display="flex" justifyContent={"space-between"} mt={6} >
                            <Box ml={2} color="#000" >
                                <Typography color="#000" fontSize={13}><b>Date : </b>  {new Date().toLocaleDateString()}  </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={2} mt={3}>
                            <Box ml={2} color="#000" >
                                <Typography color="#000" fontSize={13}>
                                    <b>Place :</b>  {
                                        employee.Addr
                                            ? employee.Addr.split(" - ")[0].split(",").pop().trim()
                                            : ""}
                                </Typography>
                            </Box>

                            <Box mr={10} textAlign="right" color="#000" >
                                <Typography color="#000" fontSize={13}><b> {employee.EmpName}</b> </Typography>
                            </Box>

                        </Box>

                        <Box color="#000" ml={68} mt={10}>
                            <Typography color="#000"><b>Authorised Signatory</b></Typography>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
