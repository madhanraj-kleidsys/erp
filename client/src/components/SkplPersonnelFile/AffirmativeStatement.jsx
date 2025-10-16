import React, { useRef, useState } from "react";
import { Box, Typography, Button, Divider, Sheet, Stack, Input } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import reportLogo from '../../assets/reportLogo.png'

const companyAddress = {
    title1: "  Affirmative Statement",
    title2: "உறுதிமொழி",
    title3: "समान"
};

const notEd = {
    englIsh: "I Understand the terms conditions of this appointment order which is translated to me in Hindi by Mr / Ms / Mrs. (Translator)",
    tamIl: "இந்த நியமன உத்தரவின் விதிமுறைகளை நான் புரிந்துகொள்கிறேன், இது திரு. / திருமதி. / திருமதி (மொழிபெயர்ப்பாளர்) அவர்களால் இந்தியில் எனக்கு மொழிபெயர்க்கப்பட்டுள்ளது",
    hinDi: "मैं इस नियुक्ति आदेश की शर्तों को समझता/समझती हूँ, जिसका हिंदी अनुवाद श्रीमान/सुश्री/श्रीमती (अनुवादक) द्वारा किया गया है।"
};




const checklist = [
    {
        label: [
            "I Am Willingly Working In This Company",
            "நான் இந்நிறுவனத்தில் எனது விருப்பத்துடன் பனி புரிகிறேன்",
            "मैं इस कंपनी में स्वेच्छा से काम कर रहा हूँ "
        ],
        table: true
    },
    {
        label: [
            "I will not compel or pressure my colleagues or subordinates to work",
            "நான் என் சக தொழிலாளர்களையோ அல்லது கீழ் பணிபுரிபவர்களையோ பலவந்தமாக மிரட்டுதல், துன்புறுத்துதல், தவறான மன உளைச்சலை ஏற்படுத்தக்கூடிய சொற்களை பயன்படுத்துதல் போன்ற நடவடிக்கைகளில் ஈடுபடமாட்டேன",
            "मैं बलपूर्वक धमकी देने, परेशान करने या ऐसे शब्दों का प्रयोग करने जैसे कार्यों में शामिल नहीं होऊंगा, जिससे मेरे साथी कर्मचारियों या अधीनस्थों को अनावश्यकमानसिक तनाव हो।"
        ]
    },
    {
        label: [
            "I will not engage in actions such as forcibly threatening, harassing, or using words that may cause undue mental stress to my fellow workers or subordinates",
            "வேலை நாட்கள்: வாரத்திற்கு 6 நாட்கள்",
            "कार्य दिवस: 2 सप्ताह"
        ]
    },
    {
        label: [
            "I will not show discrimination based on race, religion, language, or gender towards my fellow workers or subordinates",
            "நான் என் சக தொழிலாளர்களிடமோ எனக்கு கீழ் பணிபுரிபவர்களிடமோ இனம்/மதம்/மொழி/பால் போன்ற வேறுபாடுகளை காட்டமாட்டேன்",
            "मैं अपने साथी कर्मचारियों या अधीनस्थों के प्रति जाति, धर्म, भाषा या लिंग के आधार पर भेदभाव नहीं करूंगा।"
        ]
    },
    {
        label: ["I will not engage in illegal activities such as drug and explosives trafficking for any reason.",
            "நான் எக்காரணத்தை கொண்டும் போதை மற்றும் வெடிக்கும் தன்மை கொண்ட பொருட்களை கடத்துதல் போன்ற சட்ட விரோத செயல்களில் ஈடு படமாட்டேன",
            "मैं किसी भी कारण से नशीली दवाओं और विस्फोटकों की तस्करी जैसी अवैध गतिविधियों में शामिल नहीं होऊंगा।"
        ]
    },
    {
        label: [
            "Before joining this organization, I have not been involved in any illegal activities, either voluntarily or under compulsion. There are no criminal cases pending against me in any police station or court"
            , "நான் இந்நிறுவனத்தில் பணிக்கு சேரும் முன்னர் எவ்வித சட்ட விரோத செயல்களில், என் விருப்பத்தின் பேரிலோ அல்லாது கட்டாயத்தின் பேரிலோ ஈடுபட்டதில்லை. என் மீது காவல் நிலையத்திலோ அல்லது நீதிமன்றத்திலோ எவ்வித குற்ற வழக்குகளும் நிலுவையில் இல்லை"
            , "इस संगठन में शामिल होने से पहले, मैं स्वेच्छा से या मजबूरी में किसी भी अवैध गतिविधि में शामिल नहीं रहा हूँ। मेरे खिलाफ किसी भी पुलिस स्टेशन या अदालत में कोई आपराधिक मामला लंबित नहीं है।"
        ]
    }
];

export default function AppointmentOrder({ employee, isBooklet }) {
    const printRef = useRef();

    const handleDownloadPDF = () => {
        if (!printRef.current) return;
        html2pdf()
            .set({
                margin: 0.2,
                filename: "Affirmative_statement.pdf",
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
        link.download = "Personal_File_Checklist.png";
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
                    {/* Appointment Order Report */}
                    <Box
                        ref={printRef}
                        sx={{
                            // borderRadius: 2, border: '2px solid #000000ff',
                            // bgcolor: "#fff",
                            // width: "780px",
                            // minHeight: "1123px",
                            // margin: "auto",
                            // boxShadow: 2, p: 0.3,
                            // position: "relative",
                            // boxSizing: "border-box",
                            // overflowX: "hidden"

                            width: "780px",
                            border: "2px solid #000000ff",
                            borderRadius: 2,
                            mx: "auto",
                            my: 3,mt:3,mb:15,
                           
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



                        {/* Checklist Section */}
                        <Box color="#000" ml={2}>
                            {checklist.map((item, idx) => (
                                <Box key={idx} mb={1} pt={1}>
                                    <Box display="flex" alignItems="flex-start">
                                        <Typography color="#000" sx={{ minWidth: 22, mt: 1 }}>{idx + 1}.</Typography>
                                        <Box>
                                            {item.label.map((text, i) => (
                                                <Typography color="#000" key={i} fontSize={10}>{text}</Typography>
                                            ))}

                                        </Box>
                                    </Box>
                                    <Box sx={{ height: 1, bgcolor: '#222', width: '100%', mb: 1 }} />
                                </Box>
                            ))}
                        </Box>

                        {/* Notes */}
                        <Box display="flex" color="#000" justifyContent="space-between" mb={2} ml={5}>
                            <Box>
                                <Typography color="#000" fontSize={10} ml={2} ><b> Note / குறிப்பு / टिप्पणी : </b></Typography>
                                <Typography color="#000" fontSize={10} ml={2} my={1}>{notEd.englIsh}</Typography>
                                <Typography color="#000" fontSize={10} ml={2} my={1}>{notEd.tamIl}</Typography>
                                <Typography color="#000" fontSize={10} ml={2} my={1}>{notEd.hinDi}</Typography>
                            </Box>

                        </Box>

                        <Box sx={{ height: 1, bgcolor: '#222', width: '100%', mb: 12 }} />

                        {/* Signature Section */}
                        <Box display="flex" justifyContent="space-between" mt={2} ml={8}>
                            <Box color="#000" display="flex" flexDirection="column" alignItems="flex-start">
                                <Typography color="#000"><b>Signature of the Employee</b></Typography>
                            </Box>

                            <Box color="#000" display="flex" flexDirection="column" alignItems="flex-end" mr={20}>
                                <Typography color="#000" ><b>Authroised Signatory</b></Typography>
                            </Box>
                        </Box>

                        {/* <Box sx={{ height: 2, bgcolor: 'black', width: '100%', mb: 1 }} /> */}

                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>

    );
}

