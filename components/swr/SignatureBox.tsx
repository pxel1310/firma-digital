import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import Swal from "sweetalert2";

import { FC, useContext, useState } from "react";
import NextLink from "next/link";
import { AuthContext } from "../../context";
import { useForm } from "react-hook-form";
import firmaApi from "../../api/firmaApi";
import { ISignature } from "../../interfaces";

interface Props {
  files: FileList;
}

const changeToBase64 = function (file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const SignatureBox: FC = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>();

  const { user } = useContext(AuthContext);
  const [type, setType] = useState("firma");

  let input;

  if (type === "firma") {
    input = (
      <>
        <FormHelperText sx={{ color: "white" }}>
          Cargue un archivo para firmar
        </FormHelperText>
        <Divider />
        <input
          {...register("files", { required: true })}
          multiple
          type="file"
        />
      </>
    );
  } else if (type === "verificar") {
    input = <input {...register("files", { required: true })} type="file" />;
  }

  const onSubmitCifrar = async ({ files }: Props) => {
    const newFiles: ISignature[] = [];

    const base64Files = await Promise.all(
      Array.from(files).map(async (file) => {
        return await changeToBase64(file);
      })
    );

    for (let i = 0; i < files.length; i++) {
      const { name, size, type, lastModified } = files[i],
        formData = {
          title: name,
          size,
          type,
          lastModified,
          base64File: base64Files[i] as string,
          user: user?.name,
          email: user?.email,
        };
      newFiles.push(formData);
    }

    await firmaApi
      .post("/signature", newFiles)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Firma realizada con éxito",
          text: "Se ha firmado correctamente el archivo",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error al firmar",
          text: "Ha ocurrido un error al firmar el archivo",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  };

  const onVerify = async ({ files }: Props) => {
    const newFiles: ISignature[] = [];

    const base64Files = await Promise.all(
      Array.from(files).map(async (file) => {
        return await changeToBase64(file);
      })
    );

    await firmaApi
      .post("/signature/verify", { base64File: base64Files[0] as string })
      .then((res) => {
        if (res.data.verify) {
          Swal.fire({
            title: "Verificación exitosa",
            text: "El archivo es válido, no ha sido modificado",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else if (res.data.verify === false) {
          Swal.fire({
            title: "Verificación exitosa",
            text: "El archivo no es válido, ha sido modificado o no está firmado",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error al verificar",
          text:  "El archivo no es válido, ha sido modificado o no está firmado",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  };

  return (
    <Box
      className={"container fadeIn"}
      sx={{
        marginBottom: 2,
        paddingX: 5,
        marginTop: 12,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ color: "primary.main" }}>
        Firma digital
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="info">
          <AlertTitle>Informativo</AlertTitle>
          Recuerda que todos los archivos que firmes se guardan en la Base de
          Datos de la aplicación, por Base64, por lo que no se guardan en el
          servidor. Pero puedes borrarlos y descargarlos cuando quieras. Son
          publicos, por lo que cualquiera puede verlos y descargarlos.
        </Alert>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 1,
              padding: 2,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ color: "primary.main" }}
            >
              Firma
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form
              onSubmit={handleSubmit(
                type === "firma" ? onSubmitCifrar : onVerify
              )}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de firma</FormLabel>
                <RadioGroup
                  row
                  aria-label="tipo"
                  name="row-radio-buttons-group"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <FormControlLabel
                    value="firma"
                    control={<Radio />}
                    label="Firma"
                  />
                  <FormControlLabel
                    value="verificar"
                    control={<Radio />}
                    label="Verificar"
                  />
                </RadioGroup>
              </FormControl>
              <Divider sx={{ my: 2 }} />
              <FormControl fullWidth>
                {input}
                {errors.files && (
                  <Typography variant="body2" color="error">
                    Debes seleccionar al menos un archivo
                  </Typography>
                )}
              </FormControl>
              <Divider sx={{ my: 2 }} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                {type === "firma" ? "Firmar" : "Verificar"}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Grid item xs={12} display="flex" justifyContent="end">
        <NextLink href="/" passHref>
          <Link underline="always">Regresar al Inicio</Link>
        </NextLink>
      </Grid>
    </Box>
  );
};
