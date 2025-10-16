import React, { useRef, useState } from "react";
import { Box, Typography, Button, Divider, Sheet, Stack, Input } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import reportLogo from '../../assets/reportLogo.png';

const companyAddress = {
    title1: "APPOINTMENT ORDER / நியமன ஆணை / नियुक्ति आदेश",
};

const filleRs = {
    To: "To /  பெறுநர் / अभ्यर्थी :",
    daTe: "Date / தேதி / दिनांक :"
};


const notEd = {
    englIsh: "I Understand the terms conditions of this appointment order which is translated to me in Hindi by Mr / Ms / Mrs. (Translator)",
    tamIl: "இந்த நியமன உத்தரவின் விதிமுறைகளை நான் புரிந்துகொள்கிறேன், இது திரு. / திருமதி. / திருமதி (மொழிபெயர்ப்பாளர்) அவர்களால் இந்தியில் எனக்கு மொழிபெயர்க்கப்பட்டுள்ளது",
    hinDi: "मैं इस नियुक्ति आदेश की शर्तों को समझता/समझती हूँ, जिसका हिंदी अनुवाद श्रीमान/सुश्री/श्रीमती (अनुवादक) द्वारा किया गया है।"
};

const tableRows = [
    ["Basic / அடிப்படை ஊதியம் / मूल वेतन", "10500.00"],
    ["DA / பஞ்சப்படி / टेरेंस भत्ता", "2000.00"],
    ["HRA / வீட்டு வாடகை கொடுப்பனவு / मकान किराया भत्ता", "3000.00"],
    ["OA / மற்றவை / अन्य भत्त", "500.00"],
    ["Total / மொத்தம் / कुल", "15000.00"],
];


const checklist = [
    {
        label: [
            "You will be paid wages/salary as per the following structure per day/per month",
            "உங்களுக்கு பின்வரும் கட்டமைப்பின்படி ஒரு நாளைக்கு/மாதத்திற்கு ஊதியம்/சம்பளம் வழங்கப்படும்.",
            "आपको प्रतिदिन/प्रति माह निम्नलिखित संरचना के अनुसार मजदूरी/वेतन का भुगतान किया जाएगा "
        ],
        table: true
    },
    {
        label: [
            "Working Hours : 8 hours per day. Shift Timing: 08:30:00 - 17:30:00",
            "வேலை நேரம்: ஒரு நாளைக்கு 8 மணிநேரம். ஷிப்ட் நேரங்கள்: 08:30:00 முதல் 17:30:00 வரை",
            "कार्य समय: प्रतिदिन 8 घंटे। शिफ्ट समय: 08:30:00 से 17:30:00"
        ]
    },
    {
        label: [
            "Working days :per week 6 days",
            "வேலை நாட்கள்: வாரத்திற்கு 6 நாட்கள்",
            "कार्य दिवस: 2 सप्ताह"
        ]
    },
    {
        label: [
            "Working days : 6 Days per week",
            "வேலை நாட்கள்: வாரத்திற்கு 6 நாட்கள்",
            "कार्य दिवस: सप्ताह में 6 दिन"
        ]
    },
    {
        label: [
            "You have the right to have 1 day rest after 6 days of working. Overtime is voluntary. You will be paid double wages for overtime",
            "6 நாட்கள் வேலைக்குப் பிறகு 1 நாள் ஓய்வு பெற உங்களுக்கு உரிமை உண்டு.கூடுதல் நேரம் தன்னார்வமானது.கூடுதல் நேரத்திற்கு உங்களுக்கு இரட்டிப்பு ஊதியம் வழங்கப்படும்",
            "आपको पाँच दिन काम करने के बाद एक दिन आराम करने का अधिकार है। यह एक छुट्टी है। इसके लिए आपको दोगुना वेतन नहीं दिया जाएगा।"
        ]
    },
    {
        label: [
            "Your appointment will be on Probation / Temporary for Three / Six months from the Date of Joining. Probation period will be extended for another Three / Six months if your observed performance is not satisfactory.",
            "உங்கள் நியமனம் சேர்ந்த நாளிலிருந்து மூன்று/ஆறு மாதங்களுக்கு தகுதிகாண்/தற்காலிகமாக இருக்கும். உங்கள் கவனிக்கப்பட்ட செயல்திறன் திருப்திகரமாக இல்லாவிட்டால், தகுதிகாண் காலம் மேலும் மூன்று/ஆறு மாதங்களுக்கு நீட்டிக்கப்படும்.",
            "आपकी नियुक्ति कार्यभार ग्रहण करने की तिथि से तीन/छह माह के लिए परिवीक्षा/अस्थायी आधार पर होगी। यदि आपका कार्य-निष्पादन संतोषजनक नहीं रहा, तो परिवीक्षा अवधि को तीन/छह माह के लिए और बढ़ा दिया जाएगा।"
        ]
    },
    {
        label: [
            "You have the right to leave from the service during the Probation / Temporary period without giving any notice. The company also carries the right to remove you from the services without giving any notice during the Probation / Temporary period.",
            "தகுதிகாண் / தற்காலிக காலத்தின் போது எந்த அறிவிப்பும் கொடுக்காமல் சேவையிலிருந்து வெளியேற உங்களுக்கு உரிமை உண்டு. தத்தெடுப்பு / தற்காலிக காலத்தின் போது எந்த அறிவிப்பும் கொடுக்காமல் சேவைகளிலிருந்து உங்களை நீக்கும் உரிமையையும் நிறுவனம் கொண்டுள்ளது.",
            "आपको बिना कोई नोटिस दिए परिवीक्षा/अस्थायी अवधि के दौरान सेवा छोड़ने का अधिकार है। कंपनी को भी परिवीक्षा/अस्थायी अवधि के दौरान बिना कोई नोटिस दिए आपको सेवाओं से हटाने का अधिकार है।"
        ]
    },
    {
        label: [
            "Due to exigency of service the company has the right to ask you to work in another department.",
            "சேவையின் அவசரநிலை காரணமாக, நிறுவனம் உங்களை வேறு துறையில் பணிபுரியச் சொல்ல உரிமை உண்டு.",
            "सेवा की अनिवार्यता के कारण कंपनी को आपको किसी अन्य विभाग में काम करने के लिए कहने का अधिकार है।"
        ]
    },
    {
        label: [
            "You will retire from service on attaining the age of 58 years.",
            "நீங்கள் 58 வயதை எட்டும்போது பணியிலிருந்து ஓய்வு பெறுவீர்கள்.",
            "आप 58 वर्ष की आयु प्राप्त करने पर सेवा से सेवानिवृत्त हो जायेंगे।"
        ]
    },
    {
        label: [
            "If your performance is found to be satisfactory during the Probation / Temporary period, you will be made permanent. You will receive a letter to that effect from the company.",
            "தகுதிகாண் / தற்காலிக காலத்தில் உங்கள் செயல்திறன் திருப்திகரமாக இருந்தால், நீங்கள் பணி நிரந்தரம் செய்யப்படுவீர்கள். அதற்கான கடிதத்தை நிறுவனத்திடமிருந்து பெறுவீர்கள்.",
            "यदि परिवीक्षा/अस्थायी अवधि के दौरान आपका प्रदर्शन संतोषजनक पाया गया, तो आपको स्थायी कर दिया जाएगा। आपको कंपनी से इस आशय का एक पत्र प्राप्त होगा।"
        ]
    },
    {
        label: [
            "A) After confirmation, if you want to leave your job, you will have to give one (1) month notice to the company. You will have to work during the notice period or otherwise, you will have to pay one (1) month salary.",
            "அ) உறுதிப்படுத்தலுக்குப் பிறகு, நீங்கள் உங்கள் வேலையை விட்டு வெளியேற விரும்பினால், நீங்கள் நிறுவனத்திற்கு ஒரு (1) மாத அறிவிப்பை வழங்க வேண்டும். அறிவிப்பு காலத்தில் நீங்கள் வேலை செய்ய வேண்டும் அல்லது இல்லையெனில், நீங்கள் ஒரு (1) மாத சம்பளத்தை செலுத்த வேண்டும்.",
            "ए) पुष्टि के बाद, यदि आप अपनी नौकरी छोड़ना चाहते हैं, तो आपको कंपनी को एक (1) महीने का नोटिस देना होगा। आपको नोटिस अवधि के दौरान काम करना होगा अन्यथा, आपको एक (1) महीने का वेतन देना होगा।"
            ,
            "B) After confirmation, if you are removed / terminated from the service, you will be paid one month salary / wages as compensation.",
            "ஆ) உறுதிப்படுத்தப்பட்ட பிறகு, நீங்கள் சேவையிலிருந்து நீக்கப்பட்டால் / பணிநீக்கம் செய்யப்பட்டால், உங்களுக்கு ஒரு மாத சம்பளம் / ஊதியம் இழப்பீடாக வழங்கப்படும்.",
            "बी) पुष्टि के बाद, यदि आपको सेवा से हटा दिया जाता है / समाप्त कर दिया जाता है, तो आपको मुआवजे के रूप में एक महीने का वेतन / मजदूरी का भुगतान किया जाएगा।"
        ]
    },
    {
        label: [
            "You are not allowed to work in another company without permission from the company when you are working in this company.",
            "நீங்கள் இந்த நிறுவனத்தில் பணிபுரியும் போது, நிறுவனத்தின் அனுமதியின்றி வேறு நிறுவனத்தில் வேலை செய்ய உங்களுக்கு அனுமதி இல்லை.",
            "जब आप इस कंपनी में काम कर रहे हों तो आपको कंपनी की अनुमति के बिना किसी अन्य कंपनी में काम करने की अनुमति नहीं है।"
        ]
    },
    {
        label: [
            "As soon as you have worked more than 240 days in the company, you have the right to have 1 day of earned leave with pay for every 20 working days as per the Factories Act.",
            "நிறுவனத்தில் 240 நாட்களுக்கு மேல் நீங்கள் பணிபுரிந்தவுடன், தொழிற்சாலைகள் சட்டத்தின்படி ஒவ்வொரு 20 வேலை நாட்களுக்கும் 1 நாள் சம்பளத்துடன் கூடிய விடுப்பு பெற உங்களுக்கு உரிமை உண்டு.",
            "जैसे ही आपने कंपनी में 240 दिनों से अधिक काम किया है, आपको कारखाना अधिनियम के अनुसार प्रत्येक 20 कार्य दिवसों के लिए वेतन सहित 1 दिन का अर्जित अवकाश पाने का अधिकार है।"
        ]
    },
    {
        label: [
            "You should be covered under ESI scheme. ESIC provides you sick leave when you are sick.",
            "நீங்கள் ESI திட்டத்தின் கீழ் காப்பீடு செய்யப்பட வேண்டும். ESIC உங்களுக்கு நோய்வாய்ப்பட்டவர்களுக்கு மருத்துவ விடுப்பு வழங்குகிறது.",
            "आपको ईएसआई योजना के अंतर्गत कवर होना चाहिए। ईएसआईसी आपको बीमारी के लिए छुट्टी प्रदान करता है।"
        ]
    },
    {
        label: [
            "As you are covered under ESI scheme insurance, you are entitled to avail maternity benefit in case of pregnancy. You have the right to 12 weeks with full wages by the ESIC without working, if you have worked a minimum of 78 days.",
            "நீங்கள் ESI திட்டக் காப்பீட்டின் கீழ் வருவதால், கர்ப்பமாக இருந்தால், மகப்பேறு சலுகையைப் பெற உங்களுக்கு உரிமை உண்டு. வேலை செய்யாமல் ESIC ஆல் முழு ஊதியத்துடன் 12 வாரங்கள் வேலை செய்ய உங்களுக்கு உரிமை உண்டு. நீங்கள் குறைந்தபட்சம் 78 நாட்கள் வேலை செய்திருந்தால், இந்தப் பலன்களைப் பெறுவதற்கான தகுதி உண்டு.",
            "चूंकि आप ईएसआई योजना बीमा के अंतर्गत आते हैं, इसलिए गर्भावस्था की स्थिति में आप मातृत्व लाभ पाने के हकदार हैं। आपको बिना काम किए ईएसआईसी द्वारा पूर्ण वेतन के साथ 12 सप्ताह की छुट्टी पाने का अधिकार है। इस लाभ को पाने की पात्रता तभी है, जब आपने न्यूनतम 78 दिन काम किया हो।"
        ]
    },
    {
        label: [
            "You and your family could have the benefit of the ESI. 1.75% of Basic + DA + HRA of the wages will be cut from your earned wages towards employee contribution. The company will contribute 4.75% towards Employer's contribution. You will be given an ESI card. You and your family can avail Medical benefits, Sickness benefit, Maternity benefit, Disablement benefit, Funeral benefit, Superannuation benefit, Unemployment allowance etc. Proportionate deduction will be made as and when the ESI Act is amended.",
            "நீங்களும் உங்கள் குடும்பத்தினரும் ESI-யின் பலனைப் பெறலாம். ஊதியத்தில் 1.75% அடிப்படை + DA + HRA மற்றும் உங்கள் சம்பாதித்த ஊதியம் / ஊழியர் பங்களிப்புக்கான சம்பளத்திலிருந்து குறைக்கப்படும். நிறுவனம் முதலாளியின் பங்களிப்பிற்கு 4.75% பங்களிக்கும். உங்களுக்கு ESI அட்டை வழங்கப்படும், நீங்களும் உங்கள் குடும்பத்தினரும் மருத்துவ சலுகைகள், நோய்வாய்ப்பட்ட சலுகை, மகப்பேறு சலுகை, ஊனமுற்றோர் சலுகை, இறுதிச் சடங்கு சலுகை, சூப்பர் ஆண்டு உதவித்தொகை, வேலையின்மை உதவித்தொகை போன்றவற்றைப் பெறலாம். ESI சட்டம் திருத்தப்படும்போது விகிதாசார விலக்கு அளிக்கப்படும்.",
            "आप और आपका परिवार ईएसआई का लाभ प्राप्त कर सकते हैं। वेतन का 1.75% मूल + डीए + एचआरए आपके अर्जित वेतन से कर्मचारी के अंशदान के रूप में काटा जाएगा। कंपनी नियोक्ता के अंशदान के लिए 4.75% का योगदान देगी। आपको ईएसआई कार्ड दिया जाएगा। आप और आपका परिवार चिकित्सा लाभ, बीमारी लाभ, मातृत्व लाभ, विकलांगता लाभ, अंतिम संस्कार लाभ, सुपर एन्युएशन लाभ, बेरोजगारी भत्ता लाभ आदि का लाभ उठा सकते हैं। ईएसआई अधिनियम में संशोधन होने पर आनुपातिक कटौती की जाएगी।"
        ]
    },
    {
        label: [
            "You have PF benefit. 12% of the Basic + DA will be deducted from your earned wages. The company will remit 12% equal contribution to you. In addition, the company will pay 0.5% of the earned Basic + DA towards EDLI fund as insurance benefit to your dependent if death occurs during employment. Encashment will be given by the P.F Organization. Proportionate deduction will be made as and when the PF Act is amended.",
            "உங்களுக்கு PF சலுகை உள்ளது. அடிப்படை +DA-வில் 12% உங்கள் சம்பாதித்த ஊதியத்திலிருந்து கழிக்கப்படும். நிறுவனம் 12% அதாவது உங்களுக்கு சமமான பங்களிப்பை வழங்கும். அதோடு, வேலைவாய்ப்பின் போது மரணம் ஏற்பட்டால், நிறுவனம் உங்கள் சார்புடையவருக்கு காப்பீட்டு சலுகைகளாக EDLI நிதிக்கு சம்பாதித்த அடிப்படை +DA-வில் 0.5% செலுத்தும். P.F அமைப்பால் பணமாக்குதல் வழங்கப்படும். PF சட்டம் திருத்தப்படும்போது விகிதாசார விலக்கு வழங்கப்படும்.",
            "आपको पीएफ लाभ मिलेगा। आपके अर्जित वेतन से मूल वेतन + डीए का 12% काटा जाएगा। कंपनी आपको 12% यानी बराबर का योगदान देगी। इसके अतिरिक्त, यदि रोजगार के दौरान मृत्यु हो जाती है, तो कंपनी आपके आश्रित को बीमा लाभ के रूप में अर्जित मूल वेतन + डीए का 0.5% ईडीएलआई फंड में देगी। नकदीकरण पीएफ संगठन द्वारा किया जाएगा और पीएफ अधिनियम में संशोधन होने पर आनुपातिक कटौती की जाएगी।"
        ]
    },
    {
        label: [
            "You will be paid minimum 8.33% bonus for your earned wages during the wage period, i.e., October to September. The amount will be disbursed at the time of Deepavali. Minimum Eligibility: 30 worked shifts.",
            "அக்டோபர் முதல் செப்டம்பர் வரையிலான ஊதியக் காலத்தில், நீங்கள் சம்பாதித்த ஊதியத்திற்கு குறைந்தபட்சம் 8.33% போனஸ் வழங்கப்படும். இந்தத் தொகை தீபாவளி நேரத்தில் வழங்கப்படும். குறைந்தபட்ச தகுதி: 30 ஷிப்டுகளில் வேலை செய்யுங்கள்.",
            "आपको वेतन अवधि, यानी अक्टूबर से सितंबर तक, आपके अर्जित वेतन पर न्यूनतम 8.33% बोनस दिया जाएगा। यह राशि दीपावली के समय वितरित की जाएगी। न्यूनतम पात्रता: 30 शिफ्ट में काम करना होगा।"
        ]
    },
    {
        label: [
            "You will be entitled to get gratuity if you have worked continuously for 5 years. Continuous period means 240 days service per year.",
            "நீங்கள் தொடர்ந்து 5 ஆண்டுகள் பணியாற்றியிருந்தால், பணிக்கொடை பெற உங்களுக்கு உரிமை உண்டு. தொடர்ச்சியான காலம் என்பது வருடத்திற்கு 240 நாட்கள் சேவையைக் குறிக்கிறது.",
            "यदि आपने लगातार 5 वर्ष तक काम किया है तो आप ग्रेच्युटी पाने के हकदार होंगे। लगातार अवधि का अर्थ है प्रति वर्ष 240 दिन की सेवा।"
        ]
    },
    {
        label: [
            `You are requested to join duty on or before ${new Date().toLocaleDateString()}, i.e., your Joining date.`,
            `நீங்கள் ${new Date().toLocaleDateString()}   அதாவது உங்கள் Joining Date அன்று அல்லது அதற்கு முன் பணியில் சேருமாறு கேட்டுக் கொள்ளப்படுகிறீர்கள்.`,
            "आपसे अनुरोध है कि आप 04 Jul 2025 अर्थात आपकी ज्वाइनिंग तिथि को या उससे पहले ड्यूटी पर शामिल हो जाएं।"
        ]
    },
    {
        label: [
            "I joined in this company by my own wish. I am not forced by anybody or agent to do services in this company.",
            "நான் இந்த நிறுவனத்தில் என்னுடைய சொந்த விருப்பத்தின் பேரில் சேர்ந்தேன். இந்த நிறுவனத்திற்கு சேவை செய்ய யாரையும் அல்லது முகவரையும் நான் கட்டாயப்படுத்தவில்லை.",
            "मैं अपनी इच्छा से इस कंपनी में शामिल हुआ हूँ। मुझे किसी भी व्यक्ति या एजेंट को इस कंपनी की सेवाएं करने के लिए मजबूर नहीं किया गया है।"
        ]
    },
    {
        label: [
            "If the above terms and conditions are acceptable to you, please return the duplicate copy of this order after signing not later than 10 days. I have understood and accept the terms and conditions.",
            "மேற்கண்ட விதிமுறைகள் மற்றும் நிபந்தனைகள் உங்களுக்கு ஏற்றுக்கொள்ளத்தக்கதாக இருந்தால், 10 நாட்களுக்குள் கையொப்பமிட்ட பிறகு இந்த ஆர்டரின் நகலை திருப்பி அனுப்பவும். விதிமுறைகள் மற்றும் நிபந்தனைகளை நான் புரிந்துகொண்டு ஏற்றுக்கொண்டேன்.",
            "यदि उपरोक्त नियम व शर्तें आपको स्वीकार्य हैं तो कृपया हस्ताक्षर करने के बाद इस आदेश की दूसरी प्रति 10 दिन के भीतर वापस कर दें। मैंने नियम व शर्तें समझ ली हैं और मैं उन्हें स्वीकार करता हूँ।"
        ]
    }


];

export default function AppointmentOrder({ employee,isBooklet }) {
    const printRef = useRef();

    const handleDownloadPDF = () => {
        if (!printRef.current) return;
        html2pdf()
            .set({
                margin: 0.2,
                filename: "Appointment_Order.pdf",
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
                pagebreak: { mode: ["css", "legacy"] }
            })
            .from(printRef.current)
            .save();
    };

    const handleDownloadExcel = () => {
        // Example: export from JSON or from DOM Table
        // For JSON data:
        // const ws = XLSX.utils.json_to_sheet(yourDataArray);

        // For an HTML table (if you have tableRef like printRef):
        const table = printRef.current;
        const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "Appointment_Order.xlsx");
    };

    const handleDownloadPNG = async () => {
        const canvas = await html2canvas(printRef.current);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "Appoinment_Order.png";
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
                        <Button variant="solid" onClick={handleDownloadExcel}>Download Excel</Button>
                        <Button variant="solid" onClick={handleDownloadPNG}>Download as PNG</Button>
                    </Box>
</> )}
                    {/* Appointment Order Report */}
                    <Box
                        ref={printRef}
                        sx={{
                            borderRadius: 2, border: '2px solid #000000ff',
                            bgcolor: "#fff",
                            width: "780px",
                            minHeight: "1123px",
                            maxWidth: 1500,
                            margin: "auto",
                            boxShadow: 2, p: 0.3,
                            position: "relative",
                            boxSizing: "border-box",
                            overflowX: "hidden",
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
                                <Typography color="#000" my={1} fontSize={14} fontWeight="xl">{companyAddress.title1}</Typography>
                                <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
                            </Box>
                        </Box>

                        {/* <Box sx={{ height: 2, bgcolor: 'black', width: '100%', my: 1 }} /> */}

                        {/* Info Row */}
                        <Box display="flex" color="#000" justifyContent="space-between" mb={2}>
                            <Box>
                                <Typography color="#000" fontSize={13}><b>{filleRs.To}</b></Typography>
                                <Typography color="#000" fontSize={13} ml={7} my={1}>{employee?.EmpName || ""}</Typography>
                                <Typography color="#000" fontSize={13} ml={7} my={1}>{employee?.FathersName || ""}</Typography>
                                <Typography color="#000" fontSize={13} ml={7} my={1}>{employee?.PermanentAddress || ""}</Typography>
                            </Box>
                            <Box textAlign="right" mr={3}>
                                <Typography color="#000" fontSize={10}>
                                    <b>{filleRs.daTe}</b> {new Date().toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>

                        <Box color="#000" >
                            <Typography fontSize={9} color="#000">
                                With Reference to your Application for Employment Dated <b>  {new Date().toLocaleDateString("en-GB", {
                                    day: "2-digit", month: "short", year: "numeric"
                                })} </b> and subsequent Interview had with us, we are pleased to appoint you as <b> {employee.Desg} </b> கீழ் <b> {employee.Dept} </b>department under the following terms and conditions.
                            </Typography>

                            <Typography fontSize={9} my={2} color="#000">
                                <b>  {new Date().toLocaleDateString("en-GB", {
                                    day: "2-digit", month: "short", year: "numeric"
                                })} </b> தேதியிட்ட உங்கள் வேலைவாய்ப்பு விண்ணப்பம் மற்றும் அதைத் தொடர்ந்து எங்களுடன் நடத்தப்பட்ட நேர்காணல்
                                தொடர்பான குறிப்புடன், பின்வரும் விதிமுறைகள் மற்றும் நிபந்தனைகளின <b> {employee.Desg} </b> in <b> {employee.Dept} </b> உற்பத்தித் துறையில் உங்களை நியமிப்பதில் நாங்கள் மகிழ்ச்சியடைகிறோம்.

                            </Typography>

                            <Typography fontSize={9} color="#000">
                                आपके रोजगार हेतु आवेदन दिनांक <b>  {new Date().toLocaleDateString("en-GB", {
                                    day: "2-digit", month: "short", year: "numeric"
                                })} </b> और उसके बाद हमारे साथ हुए साक्षात्कार के संदर्भ में, हमें निम्नलिखित नियमों और शर्तों के तहत आपको  <b> {employee.Desg} </b> विभाग म <b> {employee.Dept} </b> के रूप में नियुक्त करने में प्रसन्नता हो रही है।

                            </Typography>
                        </Box>
                        <Box sx={{ height: 2, bgcolor: 'black', width: '100%', mt: 2 }} />
                        {/* Checklist Section */}
                        <Box color="#000" mt={2}>
                            {checklist.map((item, idx) => (

                                <Box key={idx} mb={1} pt={1}>
                                    <Box display="flex" alignItems="flex-start">
                                        <Typography fontSize={10} ml={2} fontWeight="bold" sx={{ color: "#000", mt: 2, minWidth: 22 }}>{idx + 1}</Typography>
                                        {/* {idx === 5 && <div className="page-break" style={{ height: 0, width: '100%' }} />} */}
                                        {/* <td
                                            style={{
                                                border: "none",
                                                borderBottom: "2px solid #eb1111ff"
                                            }}
                                        > */}
                                        {idx === 6 && (
                                            <Box my={4} textAlign="center">
                                                <span > <br /> <br />  <br />   </span>
                                            </Box>
                                        )}
                                        {idx === 16 && (
                                            <Box my={4} textAlign="center">
                                                <span > <br /> <br /> <br />   <br /> <br /> <br />   <br />   <br /> <br />    <br /></span>
                                            </Box>
                                        )}


                                        <Box>
                                            {item.label.map((text, i) => (
                                                <Typography mx={1} color="#000" key={i} fontSize={9}>{text}</Typography>
                                            ))}
                                            {item.table && (
                                                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10, fontSize: 10, marginLeft: 20 }}>
                                                    <tbody>
                                                        {tableRows.map(([type, amount], i) => (
                                                            <tr key={i}>
                                                                <td style={{ padding: 6, fontWeight: i === tableRows.length - 1 ? "bold" : "bold" }}>
                                                                    {type}
                                                                </td>
                                                                {/* border: "1px solid #222", */}
                                                                <td style={{ padding: 6, fontWeight: i === tableRows.length - 1 ? "bold" : "normal" }}>
                                                                    {amount}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </Box>
                                        {/* </td> */}
                                    </Box>
                                    {/* <Divider sx={{ borderBottom: " 1.2px solid #000000ff", borderBottomWidth: 2 }} /> */}
                                    <Divider sx={{ borderColor: "#000000ff", borderBottomWidth: 20 }} />
                                    <Box sx={{ height: 1, bgcolor: '#222', width: '100%', my: 1 }} />
                                </Box>
                            ))}
                        </Box>

                        {/* Notes */}
                        <Box sx={{ height: 2, bgcolor: 'black', width: '100%', my: 1 }} />
                        <Box display="flex" justifyContent="space-between" mb={2}>
                            <Box color="#000">
                                <Typography color="#000" fontSize={10}><b> Note / குறிப்பு / टिप्पणी : </b></Typography>
                                <Typography color="#000" fontSize={10} ml={2} my={1}>{notEd.englIsh}</Typography>
                                <Typography color="#000" fontSize={10} ml={2} my={1}>{notEd.tamIl}</Typography>
                                <Typography color="#000" fontSize={10} ml={2} my={1}>{notEd.hinDi}</Typography>
                            </Box>
                            <Box color="#000" textAlign="right">
                                <Typography color="#000" mr={10} fontSize={10}><b>Date / தேதி / दिनांक :</b> {new Date().toLocaleDateString()}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ height: 2, bgcolor: 'black', width: '100%', my: 1, mb: 8 }} />

                        {/* Signature Section */}
                        <Box display="flex" justifyContent="space-between" >
                            <Box display="flex" color="#000" flexDirection="column" alignItems="flex-start">
                                <Typography color="#000" fontSize={10}>Signature</Typography>
                                <Typography color="#000" fontSize={10}>கையொப்பம்</Typography>
                                <Typography color="#000" fontSize={10}>हस्ताक्षर</Typography>
                            </Box>

                            <Box display="flex" color="#000" flexDirection="column" alignItems="flex-start" mr={27}>
                                <Typography color="#000" fontSize={10}>Management</Typography>
                                <Typography color="#000" fontSize={10}>நிர்வாகம்</Typography>
                                <Typography color="#000" fontSize={10}>प्रबंध</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ height: 2, bgcolor: 'black', width: '100%', mt: 1 }} />
                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>

    );
}

