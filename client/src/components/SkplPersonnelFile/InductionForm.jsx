import React, { useRef, useState } from "react";
import { Box, Typography, Button, Table, Checkbox } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import reportLogo from '../../assets/reportLogo.png'

const companyAddress = {
    title1: "EMPLOYEE INDUCTION FORM"
}
const checklistItems = [
    {
        label: [
            "INTRODUCTION ABOUT THE FACTORY",
            "தொழிற்சாலை பற்றிய அறிமுகம்",
            "कारखाने के बारे में परिचय"
        ]
    },
    {
        label: [
            "WORKING HOURS",
            "வேலை நேரம்",
            "कार्य के घंटे"
        ]
    },
    {
        label: [
            "WAGE SYSTEM AND WAGE RATE",
            "ஊதிய முறை மற்றும் ஊதிய விகிதம்",
            "मजदूरी प्रणाली और मजदूरी दर"
        ]
    },
    {
        label: [
            "DEDUCTION (ESI / PF)",
            "தொழிற்சாலை பற்றிய அறிமுகம்",
            "कारखाने के बारे में परिचय"
        ]
    },
    {
        label: [
            "DISCIPLINE SYSTEM AND RECORDING",
            "ஒழுங்குமுறை அமைப்பு மற்றும் பதிவு செய்தல்",
            "अनुशासन प्रणाली और रिकॉर्डिंग"
        ]
    },
    {
        label: [
            "COMPANY RULES",
            "நிறுவன விதிகள்",
            "कंपनी के नियम"
        ]
    }, {
        label: [
            "QUALITY MANAGEMENT SYSTEM / QUALITY POLICY / OBJECTIVES / PROCEDURES",
            "தர மேலாண்மை அமைப்பு / தரக் கொள்கை / நோக்கங்கள் / நடைமுறைகள்",
            "गुणवत्ता प्रबंधन प्रणाली / गुणवत्ता नीति / उद्देश्य / प्रक्रियाएँ"
        ]
    }, {
        label: [
            "FACTORY MANAGEMENT AND REPORTING",
            "தொழிற்சாலை மேலாண்மை மற்றும் அறிக்கையிடல்",
            "कारखाना प्रबंधन और रिपोर्टिंग"
        ]
    }, {
        label: [
            "OVERTIME POLICY AND PAYMENT",
            "கூடுதல் நேரக் கொள்கை மற்றும் கட்டணம்",
            "ओवरटाइम नीति और भुगतान"
        ]
    }, {
        label: [
            "LEAVES AND HOLIDAYS",
            "விடுமுறை நாட்கள் மற்றும் விடுமுறை நாட்கள்",
            "छुट्टियाँ और छुट्टियाँ"
        ]
    }, {
        label: [
            "HEALTH AND SAFETY",
            "ஆரோக்கியம் மற்றும் பாதுகாப்ப",
            "स्वास्थ्य और सुरक्षा"
        ]
    }, {
        label: [
            "FIRST AID", "முதலுதவி", "प्राथमिक चिकित्सा"
        ]
    }, {
        label: [
            "FIRE PRECAUTIONS ( EVACUATION )",
            "தீ முன்னெச்சரிக்கைகள் (வெளியேற்றம்)",
            "अग्नि सुरक्षा (निकासी)"
        ]
    }, {
        label: [
            "TRAINING",
            "பயிற்சி",
            "प्रशिक्षण"
        ]
    },
];

export default function InductionForm({ employee, isBooklet }) {

    const printRef = useRef();

    const handleDownloadPDF = () => {
        if (!printRef.current) return;
        html2pdf()
            .set({
                margin: 0.2,
                filename: "InductionForm.pdf",
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
        link.download = "InductionForm.png";
        link.click();
    };

    // const [selectedChecklistItems, setSelectedChecklistItems] = useState(checklistItems.map(f => f));

    const [selectedChecklistItems, setSelectedChecklistItems] = useState(checklistItems.map(item => item.label[0]));

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                {/* <Sidebar sx={{ flexShrink: 0, width: { xs: 60, sm: 220 } }} /> */}
                <Box sx={{ flexGrow: 1, p: 1, bgcolor: 'white', overflowY: 'auto' }}>
                    <Header />

                    {!isBooklet && (
                        <>
                            {/* <Checkbox
                                label="Select All"
                                checked={selectedChecklistItems.length === checklistItems.length}
                                indeterminate={selectedChecklistItems.length > 0 && selectedChecklistItems.length < checklistItems.length}
                                onChange={e =>
                                    setSelectedChecklistItems(e.target.checked ? checklistItems.map(item => item.label[0]) : [])
                                }
                            />

                            <br /> <br />

                            {checklistItems.map((field) => (
                                <Checkbox

                                    label={field.label[0]}
                                    // checked={selectedChecklistItems.includes(field.label)}
                                    checked={selectedChecklistItems.includes(field.label[0])}
                                    // onChange={e => {
                                    //     if (e.target.checked) {
                                    //         // Add key only if not already there (prevent duplicates)
                                    //         if (!selectedChecklistItems.includes(field.label)) {
                                    //             setSelectedChecklistItems([...selectedChecklistItems, field.label]);
                                    //         }
                                    //     } else {
                                    //         setSelectedChecklistItems(selectedChecklistItems.filter(f => f !== field.label));
                                    //     }
                                    // }}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            if (!selectedChecklistItems.includes(field.label[0])) {
                                                setSelectedChecklistItems([...selectedChecklistItems, field.label[0]]);
                                            }
                                        } else {
                                            setSelectedChecklistItems(selectedChecklistItems.filter(label => label !== field.label[0]));
                                        }
                                    }}

                                    sx={{ mr: 2, mb: 3 }}
                                />
                            ))} */}

                            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }} >
                                <Button variant="solid" onClick={handleDownloadPDF}>Download PDF</Button>
                                <Button variant="solid" onClick={handleDownloadPNG}>Download as PNG</Button>
                            </Box>
                        </>)}

                    <Box ref={printRef}
                        sx={{
                            width: "780px",
                            border: "2px solid #000000ff",
                            borderRadius: 2,
                            mx: "auto",
                            boxSizing: "border-box",
                            fontFamily: "'Noto Sans', Arial, sans-serif",
                            bgcolor: "#fff", overFlowX: "hidden"
                        }}
                    >

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
                            <Box mr={23} textAlign="center" color="rgba(0, 0, 0, 1)">
                                <Typography mt={1} fontWeight="bold" color="#000" fontSize={16}>
                                    {employee.BUName}
                                </Typography>
                                <Typography fontWeight="xl" color="#000" fontSize={14} mb={1}>
                                    {employee.CmpName}
                                </Typography>
                                <Typography fontSize={10} color="#000">
                                    {employee.Addr}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ height: 2, bgcolor: 'black', width: '100%', mt: 1 }} />

                        {/* Employee Info grid */}
                        <Box sx={{ display: "flex", my: 1, }}>
                            <Box sx={{ flex: 1, color: "#000", ml: 5 }}>
                                <Typography color="#000" fontWeight="bold" fontSize={8}>Emp No : {employee.EmpCode}</Typography>
                                <Typography color="#000" fontWeight="bold" fontSize={8}>Emp Name : {employee.EmpName}</Typography>
                            </Box>
                            {/* Right column */}
                            <Box sx={{ flex: 1, color: "#000" }}>
                                <Typography color="#000" fontWeight="bold" fontSize={8}>Designation : <span style={{ fontWeight: "normal" }}>{employee.Desg}</span></Typography>
                                <Typography color="#000" fontWeight="bold" fontSize={8}>Department : <span style={{ fontWeight: "normal" }}>{employee.Dept}</span></Typography>
                            </Box>

                        </Box>
                        <Box textAlign="center" color="rgba(0, 0, 0, 1)">
                            <Box sx={{ height: 2, bgcolor: 'black', width: '100%', mt: 1 }} />
                            <Typography color="#000" my={1} fontSize={10} fontWeight="xl">{companyAddress.title1}</Typography>
                            <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
                        </Box>

                        {/* Checklist Table */}
                        <Table
                            borderAxis="x"
                            sx={{
                                fontSize: 10,
                                border: "none",
                                "& th, & td": { borderColor: "#000000ff" }
                            }}
                        >
                            <thead color="#000">
                                <tr color="#000">
                                    <th style={{ width: 40, textAlign: "center", color: "#000" }}>S No</th>
                                    <th style={{ width: 320, textAlign: "left", color: "#000" }}>Description</th>
                                    <th style={{ width: 60, textAlign: "center", color: "#000" }}>TICK (√)</th>
                                    <th style={{ textAlign: "left", color: "#000" }}>REMARKS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checklistItems
                                    .filter(field => selectedChecklistItems.includes(field.label[0]))
                                    .map((item, i) => (
                                        <tr color="#000" key={i}>
                                            <td style={{ color: "#000", textAlign: "center" }}>{i + 1}</td>
                                            <td style={{ paddingLeft: 10, color: "#000" }}>{item.label.map((text, i) => (
                                                <Typography mx={1} color="#000" key={i} fontSize={8}>{text}</Typography>

                                            ))}</td>
                                            <td style={{ textAlign: "center", color: "#000" }}>
                                                <Box
                                                    sx={{
                                                        width: 22,
                                                        height: 22,
                                                        border: "1.6px solid #444",
                                                        borderRadius: "2px",
                                                        mx: "auto",
                                                    }}
                                                />
                                            </td>
                                            <td />
                                        </tr>
                                    ))}

                            </tbody>
                        </Table>

                        {/* Signature Footer */}
                        <Box
                            sx={{
                                minHeight: 60,
                                py: 2,
                                px: 2,
                                mt: 8,
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-between", color: "#000"
                            }}
                        >
                            <Typography color="#000" fontWeight="bold" fontSize={8}>Employee Signature</Typography>
                            <Typography color="#000" fontWeight="bold" fontSize={8}>Management</Typography>
                        </Box>

                    </Box>

                </Box>
            </Box>
        </CssVarsProvider>
    );
}
