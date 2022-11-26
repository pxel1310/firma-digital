import { FC } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import StickyHeadTable from "../ui/Table";
import UserAllTable from "../ui/TableMap";
import NextLink from "next/link";
import { ISignature, UserAll } from "../../interfaces";

interface Props {
  data: ISignature[];
  users: UserAll[];
}

export const FirmaBox: FC<Props> = ({ data, users }) => {
  return (
    <Box className="fadeIn">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mb: 2,
        }}
        style={{
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h2" sx={{ color: "primary.main" }}>
          Comparte tus Archivos firmados con tus amigos
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">
            <AlertTitle>Informativo</AlertTitle>
            Tus amigos podrán ver tus archivos firmados y descargarlos. Los
            archivos se guardan en la Base de Datos de la aplicación, por
            Base64, por lo que no se guardan en el servidor. Pero puedes
            borrarlos y descargarlos cuando quieras.
          </Alert>
        </Stack>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mb: 2,
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "92rem",
          }}
        >
          <StickyHeadTable dataSig={data} />
          <Divider sx={{ my: 2, borderRadius: "10px" }} />
          <UserAllTable users={users} />
          <br />
          <Divider sx={{ my: 2 }} />

          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/" passHref>
              <Link underline="always">Regresar al Inicio</Link>
            </NextLink>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
