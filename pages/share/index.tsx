import { useContext } from "react";

import { AuthContext } from "../../context";
import { useSignatures, useUsers } from "../../hooks";

import { Layout } from "../../components/layouts";

import { FirmaBox } from "../../components/swr/FirmaBox";
import { FullScreenLoading } from "../../components/ui";
import { Box, Typography } from "@mui/material";

export const SharePage = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  const { dataSigs, isLoading1 } = useSignatures({
    refreshInterval: 60 * 1000,
  });
  const { users, isLoading3 } = useUsers({
    refreshInterval: 60 * 1000,
  });

  if (!isLoggedIn) {
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
      </Box>
    );
  }

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
};

export default SharePage;
