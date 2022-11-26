import { Layout } from "../../components/layouts";
import { NextPage } from "next";

import { SignatureBox } from "../../components/swr/SignatureBox";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { Box, Typography } from "@mui/material";

export const CipherPage: NextPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Layout title="Signature - Form" pageDescription="">
      {isLoggedIn ? (
        <SignatureBox />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          <Typography
            sx={{ mb: 3 }}
            variant="h2"
            fontWeight={200}
            fontSize={20}
          >
            Inicia sesión para poder firmar tus documentos y archivos
          </Typography>
        </Box>
      )}
    </Layout>
  );
};

export default CipherPage;
