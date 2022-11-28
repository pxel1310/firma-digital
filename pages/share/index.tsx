import { useContext } from "react";

import { AuthContext } from "../../context";
import { useSignatures, useUsers } from "../../hooks";

import { Layout } from "../../components/layouts";

import { FirmaBox } from "../../components/swr/FirmaBox";
import { FullScreenLoading } from "../../components/ui";
import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";

export const SharePage: NextPage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const { dataSigs, isLoading1 } = useSignatures({
    refreshInterval: 60 * 1000,
  });
  const { users, isLoading3 } = useUsers({
    refreshInterval: 60 * 1000,
  });

  if (isLoggedIn) {
    return (
      <Layout
        title={"AES - Share"}
        pageDescription={"Comparte tus mensajes cifrados"}
      >
        {isLoading1 && isLoading3 ? (
          <FullScreenLoading />
        ) : (
          <FirmaBox data={dataSigs} users={users} />
        )}
      </Layout>
    );
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <Typography sx={{ mb: 3 }} variant="h2" fontWeight={200} fontSize={20}>
        Inicia sesión para poder firmar tus documentos y archivos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/auth/login"
        sx={{ width: "50%" }}
      >
        Iniciar Sesión
      </Button>
    </Box>
  );
};

export default SharePage;
