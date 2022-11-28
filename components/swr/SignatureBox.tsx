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
  TextField,
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
  publicKey?: string;
  signature?: string;
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
  const [llaveprivadaH, setLlaveprivadaH] = useState("");
  const [llavepublicaH, setLlavepublicaH] = useState("");

  let input;
  let inputF;

  if (type === "firma") {
    input = (
      <FormControl component="fieldset" fullWidth>
        <input
          {...register("files", { required: true })}
          type="file"
          id="file"
          style={{ display: "none" }}
        />
        <label htmlFor="file">
          <Button
            variant="contained"
            component="span"
            sx={{ mt: 2, mb: 2 }}
            className="buttonSuccess"
            fullWidth
            id="fileInput"
          >
            Seleccionar archivo
          </Button>
        </label>
        {errors.files && (
          <FormHelperText error={true}>
            Debes seleccionar al menos un archivo
          </FormHelperText>
        )}

        <TextField
          value={llaveprivadaH}
          disabled
          sx={{ mt: 2 }}
          label="Llave Privada"
          variant="outlined"
          fullWidth
        />
      </FormControl>
    );
    inputF = (
      <FormControl component="fieldset" fullWidth>
        <TextField
          label="LLave publica"
          variant="outlined"
          value={llaveprivadaH}
          disabled
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label="LLave privada"
          variant="outlined"
          value={llavepublicaH}
          disabled
          fullWidth
          sx={{ mt: 2 }}
        />
        <Divider sx={{ my: 2 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            await firmaApi.get("/keys").then((res) => {
              setLlavepublicaH(res.data.publicKey);
              setLlaveprivadaH(res.data.privateKey);
            });
          }}
        >
          Generar
        </Button>
      </FormControl>
    );
  } else if (type === "verificar") {
    input = (
      <FormControl component="fieldset" fullWidth>
        <input
          {...register("files", { required: true })}
          type="file"
          id="file"
          style={{ display: "none" }}
        />
        <label htmlFor="file">
          <Button
            variant="contained"
            component="span"
            sx={{ mt: 2, mb: 2 }}
            className="buttonSuccess"
            fullWidth
            id="fileInput"
          >
            Seleccionar archivo
          </Button>
        </label>
        {errors.files && (
          <FormHelperText error={true}>
            Debes seleccionar al menos un archivo
          </FormHelperText>
        )}
        <Divider sx={{ my: 2 }} />
        <TextField
          label="LLave publica"
          variant="outlined"
          value={llavepublicaH || undefined}
          disabled={llavepublicaH !== ""}
          fullWidth
          {...register("publicKey", {
            required: true,
          })}
        />
        <Divider sx={{ my: 2 }} />
        <TextField
          sx={{ mt: 2 }}
          label="Firma"
          id={"firma"}
          name={"firma"}
          variant="outlined"
          fullWidth
          {...register("signature", {
            required: true,
          })}
        />
      </FormControl>
    );
    inputF = <> </>;
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
          privateKey: llaveprivadaH,
          publicKey: llavepublicaH,
        };
      newFiles.push(formData);
    }

    await firmaApi
      .post("/signature", newFiles)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Firma realizada con éxito",
          text:
            "Se ha firmado correctamente el archivo, firma: " +
            res.data.signature,
          icon: "success",
          confirmButtonText: "Copiar firma",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cerrar",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigator.clipboard.writeText(res.data.signature);
            Swal.fire("Copiado!", "Firma Copiada", "success");
          }
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

  const onVerify = async ({ files, publicKey, signature }: Props) => {
    const base64Files = await Promise.all(
      Array.from(files).map(async (file) => {
        return await changeToBase64(file);
      })
    );

    await firmaApi
      .post("/signature/verify", {
        base64File: base64Files[0] as string,
        publicKey,
        signature,
      })
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
          text: "El archivo no es válido, ha sido modificado o no está firmado",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  };

  return (
    <Box
      className={"container fadeIn"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography variant="h3" sx={{ color: "primary.main" }}>
        Firma digital
      </Typography>
      <Divider sx={{ my: 0.75 }} />
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="outlined" severity="info">
          <AlertTitle>Informativo</AlertTitle>
          Recuerda que todos los archivos que firmes se guardan en la Base de
          Datos de la aplicación, por Base64, por lo que no se guardan en el
          servidor. Pero puedes borrarlos y descargarlos cuando quieras. Son
          publicos, por lo que cualquiera puede verlos y descargarlos.
        </Alert>
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          display: "flex",
        }}
        style={{ marginTop: "1rem" }}
      >
        <Grid item xs={7}>
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
              {type === "firma" ? "Firmar" : "Verificar"}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form
              onSubmit={handleSubmit(
                type === "firma" ? onSubmitCifrar : onVerify
              )}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Selecciona lo que desea hacer
                </FormLabel>
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

              {input}

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
        <Grid item xs={5}>
          {type === "firma" && (
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
                Generar llaves
              </Typography>

              <Divider sx={{ my: 2 }} />
              {inputF}
            </Box>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ mb: 2 }} />

      <Grid item xs={12} display="flex" justifyContent="end">
        <NextLink href="/" passHref>
          <Link underline="always">Regresar al Inicio</Link>
        </NextLink>
      </Grid>
    </Box>
  );
};
