import { FC, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  Modal,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

interface Props {
  idFile: string;
  title: string;
}

interface VerProps {
  base64File: string;
  title: string;
  type: string;
  author: string;
}

export const VisualizarArchivo: FC<VerProps> = ({
  base64File,
  title,
  type,
  author,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const convertBase64ToFile = (base64: string, filename: string) => {
    const arr = base64.split(","),
      mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1] as string);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={handleOpen}>Visualizar</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h2"
              component="h2"
              sx={{ mb: 2, textAlign: "center" }}
            >
              {title.length > 40 ? title.slice(0, 40) + "..." : title}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ textAlign: "center" }}
            >
              Firmado por: {author}
              &nbsp; &nbsp;
              <CheckIcon sx={{ color: "success.main" }} />
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <object
                data={URL.createObjectURL(
                  convertBase64ToFile(base64File, title)
                )}
                type={type}
                style={{ width: "100%", height: "100%" }}
              >
                <embed
                  src={URL.createObjectURL(
                    convertBase64ToFile(base64File, title)
                  )}
                  type={type}
                />
              </object>
            </Typography>
            <Divider sx={{ my: 2 }} />
            <DescargarArchivo idFile={base64File} title={title} />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export const DescargarArchivo: FC<Props> = ({ idFile, title }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          const link = document.createElement("a");
          link.href = idFile;
          link.setAttribute("download", title);
          document.body.appendChild(link);
          link.click();
        }}
      >
        Descargar
      </Button>
    </Box>
  );
};
