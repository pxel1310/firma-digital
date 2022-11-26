import type { NextPage } from "next";
import { Box, Divider, Typography } from "@mui/material";

import { Layout } from "../components/layouts";

import { CardInfo } from "../components/ui";
import { useContext } from "react";
import { AuthContext } from "../context";

const HomePage: NextPage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <Layout
      title={"Firma Digital | Home"}
      pageDescription={"Lo mejor de lo mejor para firmar digitalmente"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          className="fadeIn"
          sx={{ color: "primary.main" }}
        >
          Bienvenido a Firma Digital
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" component="h2" className="fadeIn">
          Ofrecemos la mejor practicidad y seguridad en la firma digital de
          documentos y archivos.
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 2,
          "@media (min-width: 500px)": {
            gridTemplateColumns: "1fr 1fr 1fr",
          },
        }}
      >
        {!isLoggedIn && (
          <CardInfo
            title={"Inicio De Sesión"}
            description={
              "Inicia sesión para poder firmar tus documentos y archivos"
            }
            type={0}
          />
        )}

        <CardInfo
          title={"Cifrador"}
          description={
            "Puedes firmar tus documentos y archivos para que nadie más pueda modificarlos sin" +
            "tu permiso"
          }
          type={1}
        />
        <CardInfo
          title={"Compartir Archivos"}
          description={
            "Comparte tus archivos firmados con tus amigos y familiares para que puedan" +
            "verlos y descargarlos"
          }
          type={2}
        />
        {isLoggedIn && (
          <CardInfo
            title={"Cerrar Sesión"}
            description={"Cierra tu sesión actual"}
            type={3}
          />
        )}
      </Box>

      <Divider sx={{ my: 2, marginTop: "50px" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Realizado por: <strong>Ayala González Ian, </strong>
          <strong>Edwin Uriel Astudillo Perez </strong>
          <strong>y Fernando</strong>
        </Typography>
      </Box>
    </Layout>
  );
};

export default HomePage;
