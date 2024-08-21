import React, { useMemo, useRef } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReactToPrint from "react-to-print";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";

const Table = ({ value, column }) => {
  const columns = useMemo(() => column, [column]);
  const data = useMemo(() => value, [value]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  const tableRef = useRef();

  const handleExport = () => {
    const table = tableRef.current;
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(workbook, "TableData.xlsx");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: "60px",
          top: "10px",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "black",
          }}
          onClick={handleExport}
        >
          <DownloadIcon fontSize="large" />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "black",
          }}
        >
          <ReactToPrint
            trigger={() => <LocalPrintshopIcon fontSize="large" />}
            content={() => tableRef.current}
          />
        </Box>
      </Box>
      <table
        ref={tableRef}
        style={{
          width: "80vw",
          marginTop: "20px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              style={{ height: "50px" }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          style={{ backgroundColor: "#D1E7DD", textAlign: "center" }}
          {...getTableBodyProps()}
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr style={{ height: "50px" }} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      <Stack sx={{ marginTop: "20px", display: "flex", flexDirection: "row" }}>
        <Stack sx={{ marginTop: "5px", marginRight: "10px" }}>
          Page {pageIndex + 1} of {pageOptions.length} Go to page :{" "}
        </Stack>
        <TextField
          id="outlined-basic"
          defaultValue={pageIndex + 1}
          variant="standard"
          size="small"
          type="number"
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
        />
      </Stack>

      <Stack sx={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
        <Button
          variant="contained"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          sx={{ marginRight: "5px" }}
        >
          {"<<"}
        </Button>
        <Button
          variant="contained"
          onClick={previousPage}
          disabled={!canPreviousPage}
          sx={{ marginRight: "5px" }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={nextPage}
          disabled={!canNextPage}
          sx={{ marginLeft: "5px" }}
        >
          Next
        </Button>
        <Button
          variant="contained"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          sx={{ marginLeft: "5px" }}
        >
          {">>"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Table;
