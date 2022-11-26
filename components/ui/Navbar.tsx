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
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Firma Digital |</Typography>
            <Typography sx={{ ml: 0.5 }}>Examen</Typography>
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
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
