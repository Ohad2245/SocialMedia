import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import Navbar from "components/navbar/Navbar";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary" fontFamily="Brush Script MT"
>
          <span style={{ color: "#2996ff" }}>S</span>
          <span style={{ color: "#40a1ff" }}>t</span>
          <span style={{ color: "#62b1ff" }}>a</span>
          <span style={{ color: "#83c2ff" }}>t</span>
          <span style={{ color: "#9acdff" }}>u</span>
          <span style={{ color: "#c7e3ff" }}>s</span>
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor="#D8D8D8		"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Social Media!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
