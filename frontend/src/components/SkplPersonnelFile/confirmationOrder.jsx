import React, { useRef, useState } from "react";
import { Box, Typography, Button, Stack, Input, Sheet } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import reportLogo from '../../assets/reportLogo.png';

const companyAddress = {
    title2: "CONFIRMATION ORDER / உறுதிப்படுத்தல் ஆணை / कोण का क्रम"
};

const filleRs = {
    To: "To /  பெறுநர் / अभ्यर्थी :",
    daTe: "Date / தேதி / दिनांक :"
};

export default function ConfirmationOrder({ employee, isBooklet }) {
    const printRef = useRef();

    const handleDownloadPDF = () => {
        if (!printRef.current) return;
        html2pdf()
            .set({
                margin: 0.2,
                filename: "Confirmation_Order.pdf",
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
                                {/* <Button variant="outlined" onClick={() => setShowReport(!showReport)}>
                            {showReport ? "Hide Report" : "Show Report"}
                        </Button> */}
                            </Box>

                        </>
                    )}

                    {/* Confirmation Report */}

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
                            my: 3,
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
                                <Typography color="#000" fontSize={14} fontWeight="xl">{companyAddress.title2}</Typography>
                                <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
                            </Box>
                        </Box>


                        <Box color="rgba(0, 0, 0, 1)">

                            {/* Recipient Info */}
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Box color="#000" ml={2}>
                                    <Typography fontSize={13} color="#000"><b>{filleRs.To}</b></Typography>
                                    <Typography fontSize={13} ml={2} my={1} color="#000">{employee?.EmpName || ""}</Typography>
                                    <Typography fontSize={13} ml={2} my={1} color="#000">{employee?.FathersName || ""}</Typography>
                                    <Typography fontSize={13} ml={2} my={1} color="#000">{employee?.PermanentAddress || ""}</Typography>
                                </Box>
                                <Box color="#000" textAlign="right" mr={2}>
                                    <Typography fontSize={13} color="#000"><b>{filleRs.daTe}</b> {new Date().toLocaleDateString()}</Typography>
                                </Box>
                            </Box>

                            {/* Multi-language Intro */}
                            <Typography fontSize={13} color="#000" sx={{ whiteSpace: "pre-line", mt: 2 ,ml:2}}><strong> Sir / Madam, </strong></Typography>
                            <Typography fontSize={13} color="#000" sx={{ whiteSpace: "pre-line", mt: 1 ,ml:2}}><strong> அய்யா / அம்மா, </strong></Typography>
                            <Typography fontSize={13} color="#000" sx={{ whiteSpace: "pre-line", mt: 1 ,ml:2 }}><strong> सर / मैडम, </strong></Typography>

                            {/* Subject */}
                            <Typography fontSize={13} color="#000" ml={6} mt={2}><strong> Sub: Confirmation of your Service- Reg. </strong></Typography>
                            <Typography fontSize={13} color="#000" ml={6} mt={0.2}><strong> பொருள்: உங்கள் சேவையின் உறுதிப்படுத்தல்- பதிவு.</strong></Typography>
                            <Typography fontSize={13} color="#000" ml={6} mt={0.2}><strong> विषय: आपकी सेवा की पुष्टि- रेग</strong></Typography>

                            {/* Reference */}
                            <Typography fontSize={13} color="#000" ml={7} mt={2}><strong> Ref : Your appointment letter Date : {new Date().toLocaleDateString() || "04 Jul 2025"}</strong></Typography>
                            <Typography fontSize={13} color="#000" ml={7} mt={0.2}><strong> குறிப்பு: உங்கள் சந்திப்பு கடிதம் தேதி: {new Date().toLocaleDateString() || "04 Jul 2025"}</strong></Typography>
                            <Typography fontSize={13} color="#000" ml={7} mt={0.2}><strong> संदर्भ: आपका नियुक्ति पत्र दिनांक: {new Date().toLocaleDateString() || "04 Jul 2025"}</strong></Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={2} mt={3} color="rgba(0, 0, 0, 1)" >
                            <Box color="#000" ml={2}>
                                <Typography color="#000" fontSize={13} ml={7} my={1}>
                                    With reference to the above subject matter, We are pleased to inform that your employment is confirmed with effect from {new Date().toLocaleDateString() || "04 Jul 2025"} Kindly acknowledge the receipt of this letter.
                                </Typography>
                                <Typography color="#000" fontSize={13} my={1} ml={7}>
                                    மேற்கண்ட விஷயத்தைப் பொறுத்தவரை, உங்கள் வேலைவாய்ப்பு {new Date().toLocaleDateString() || "04 Jul 2025"} இலிருந்து உறுதி செய்யப்பட்டுள்ளது என்பதை மகிழ்ச்சியுடன் தெரிவித்துக் கொள்கிறோம். இந்தக் கடிதம் கிடைத்ததற்கு தயவுசெய்து ஒப்புதல் அளிக்கவும்.
                                </Typography>
                                <Typography color="#000" fontSize={13} my={1} ml={7}>
                                    उपर्युक्त विषय-वस्तु के संदर्भ में, हमें यह सूचित करते हुए प्रसन्नता हो रही है कि आपकी नियुक्ति दिनांक {new Date().toLocaleDateString() || "04 Jul 2025"} से प्रभावी हो गई है। कृपया इस पत्र की प्राप्ति की सूचना दें।
                                </Typography>
                            </Box>
                        </Box>


                        {/* Closing */}
                        <Box ml={10} color="#000" >
                            <Typography color="#000">Thanking You,</Typography>
                            <Typography color="#000">நன்றி,</Typography>
                            <Typography color="#000"> धन्यवाद,</Typography>
                        </Box>

                        <Box color="#000" ml={45} mt={2}>
                            <Typography color="#000">Yours faithfully,</Typography>
                            <Typography color="#000">இப்படிக்கு</Typography>
                            <Typography color="#000">आपका विश्वासी</Typography>
                        </Box>

                        <Box color="#000" ml={45} mt={10}>
                            <Typography color="#000">Signature of the Employer [Authorized]</Typography>
                            <Typography color="#000">நிர்வாகம்</Typography>
                            <Typography color="#000">प्रशासन</Typography>
                        </Box>



                    </Box>



                    {/* )} */}
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
