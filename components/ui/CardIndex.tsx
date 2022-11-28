import React, { FC, useContext } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  CoPresentOutlined,
  LoginOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { AuthContext } from "../../context";

interface Props {
  title: string;
  description: string;
  type: number;
}

export const CardInfo: FC<Props> = ({ title, description, type }) => {
  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(`/${url}`);
  };

  const action: string[] = [
    "Iniciar Sesión",
    "Cifrar",
    "Compartir",
    "Cerrar Sesión",
  ];
  const routes: string[] = ["auth/login", "signature", "share"];

  const iconReq = (type: number): JSX.Element => {
    if (type === 0) return <LoginOutlined />;

    if (type === 1) return <VpnKeyOutlined />;

    if (type === 2) return <CoPresentOutlined />;

    if (type === 3) return <LoginOutlined />;
  };

  const { logout } = useContext(AuthContext);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h4">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {description}
          <br />
        </Typography>
      </CardContent>
      <Divider />

      {type <= 2 && (
        <ListItem
          style={{ cursor: "pointer" }}
          onClick={() => navigateTo(`${routes[type]}`)}
        >
          <ListItemIcon>{iconReq(type)}</ListItemIcon>
          <ListItemText primary={action[type]} />
        </ListItem>
      )}

      {type === 3 && (
        <ListItem onClick={logout} style={{ cursor: "pointer" }}>
          <ListItemIcon>{iconReq(type)}</ListItemIcon>
          <ListItemText primary={action[type]} />
        </ListItem>
      )}
    </Card>
  );
};
