import { useContext } from "react";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CoPresentOutlined,
  LoginOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";

import { UiContext, AuthContext } from "../../context";
import { useRouter } from "next/router";

export const SideMenu = () => {
  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url).then();
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          {isLoggedIn && (
            <>
              <ListItem onClick={() => navigateTo("/signature")}>
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>
                <ListItemText primary={"Cifrador"} />
              </ListItem>

              <ListItem onClick={() => navigateTo("/share")}>
                <ListItemIcon>
                  <CoPresentOutlined />
                </ListItemIcon>
                <ListItemText primary={"Compartir mensaje"} />
              </ListItem>
            </>
          )}
          {isLoggedIn ? (
            <ListItem onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          ) : (
            <ListItem
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Iniciar Sesión"} />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
