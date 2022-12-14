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
import { ChangeEvent, FC, useState } from "react";

interface UserAll {
  name: string;
  email: string;
  numOfSignatures: number;
}

interface Column {
  id: "name" | "email" | "numOfSignatures";
  label: string;
  minWidth?: number;
  align?: "center";
}

const columns: readonly Column[] = [
  {
    id: "email",
    label: "Email",
    align: "center",
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 255,
    align: "center",
  },
  {
    id: "numOfSignatures",
    label: "Archivos Compartidos",
    minWidth: 255,
    align: "center",
  },
];

function createData(
  name: string,
  email: string,
  numOfSignatures: number
): UserAll {
  return {
    name,
    email,
    numOfSignatures,
  };
}

interface Props {
  users: UserAll[];
}

export const UserAllTable: FC<Props> = ({ users }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows = users.map((index) => {
    return createData(index.name, index.email, index.numOfSignatures);
  });

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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row["email"]}
                  >
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
export default UserAllTable;
