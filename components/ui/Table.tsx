import { ChangeEvent, FC, useState } from "react";

import { ISignature } from "../../interfaces";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { VisualizarArchivo } from "./DescargarArchivo";

import { parce } from "../../utils";

interface Column {
  id: "id" | "user" | "file" | "size" | "type" | "lastModified" | "view";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "center";
}

const columns: readonly Column[] = [
  {
    id: "id",
    label: "ID",
    maxWidth: 10,
    align: "center",
  },
  { id: "user", label: "Usuario", minWidth: 100, align: "center" },
  {
    id: "file",
    label: "Archivo",
    maxWidth: 50,
    align: "center",
  },
  {
    id: "lastModified",
    label: "Última modificación",
    minWidth: 100,
    align: "center",
  },
  {
    id: "size",
    label: "Tamaño",
    minWidth: 100,
    align: "center",
  },
  {
    id: "type",
    label: "Tipo",
    minWidth: 100,
    align: "center",
  },

  {
    id: "view",
    label: "Ver",
    minWidth: 100,
    align: "center",
  },
];

interface Data {
  id: string;
  user: string;
  file: string;
  lastModified: string;
  size: string;
  type: string;
  view: JSX.Element;
}

function createData(
  id: string,
  user: string,
  file: string,
  lastModified: string,
  size: string,
  type: string,
  view: JSX.Element
): Data {
  return {
    id,
    user,
    file,
    lastModified,
    size,
    type,
    view,
  };
}

interface Props {
  dataSig: ISignature[];
}

export const StickyHeadTable: FC<Props> = ({ dataSig }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows = dataSig
    .map((index) => {
      let date = String(parce.getFormatDistanceToNow(index.lastModified));

      return createData(
        index._id.substring(0, 5) + index._id.substring(20, 24),
        index.user,
        index.title.substring(0, 40) + "...",
        date[0].toUpperCase() + date.substring(1),
        index.size < 1000
          ? `${index.size} bytes`
          : `${parce.getKb(index.size)} kb`,
        index.type,
        <VisualizarArchivo
          base64File={index.base64File}
          title={index.title}
          type={index.type}
          author={index.user}
          llavePublica={index.publicKey}
          signature={index.signature}
        />
      );
    })
    .filter((index) => index !== undefined);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default StickyHeadTable;
