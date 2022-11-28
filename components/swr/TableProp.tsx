import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FC } from "react";

function createData(
  name: string,
  llavePrivada: string,
  llavePublica: string,
  firma: string,
  vistaPrevia: string
) {
  return { name, llavePrivada, llavePublica, firma, vistaPrevia };
}

const rows = [createData("Ine", "123", "123", "123", "123")];

export const TableProp: FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Llave Privada</TableCell>
            <TableCell align="right">Llave Pública</TableCell>
            <TableCell align="right">Firma</TableCell>
            <TableCell align="right">Vista Previa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.llavePrivada}</TableCell>
              <TableCell align="right">{row.llavePublica}</TableCell>
              <TableCell align="right">{row.firma}</TableCell>
              <TableCell align="right">{row.vistaPrevia}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
