import { useContext } from "react";
import NextLink from "next/link";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { UiContext } from "../../context";

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link
            display="flex"
            alignItems="center"
            sx={{ color: "white", textDecoration: "none" }}
          >
            <Typography variant="h4">
              Firma Digital | <span style={{ fontSize: ".75em" }}>Examen</span>
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        &nbsp;
        <Button
          className="buttonWarning"
          onClick={toggleSideMenu}
          style={{ color: "white" }}
        >
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
};
