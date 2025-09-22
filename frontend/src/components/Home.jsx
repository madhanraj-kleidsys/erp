// components/Home.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/joy";
import Header from './Header';
import Sidebar from './Sidebar';
 
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


export default function Home({ user, onLogout }) {
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

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:  " #93e3f1ff",
        color: "white",
        p: 3,
      }}
    >
      <Typography level="h1" sx={{ mb: 2 }}>
        Welcome to KleidSys Technologies
      </Typography>
      <Typography level="h4" sx={{ mb: 4 }}>
        Hello, {user?.name || "User"}! 👋
      </Typography>
      <Typography level="h2" sx={{ mb: 4, textAlign: "center", maxWidth: 600 ,
         color:  " #ffffffff",}}>
        FashionONE | SHAKTHI KNITTING PRIVATE LIMITED (GARMENT DIVISION)
      </Typography>
      <Button 
        variant="solid" 
        size="lg" 
        onClick={onLogout}
        sx={{
          background: "linear-gradient(45deg, #ff6b6b 30%, #ee5a52 90%)",
          '&:hover': {
            background: "linear-gradient(45deg, #ee5a52 30%, #ff6b6b 90%)",
          }
        }}
      >
        Logout
      </Button>
    </Box>
    </Box>
    </Box>
         </CssVarsProvider>
    
  );
}