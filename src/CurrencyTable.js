import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";




const CurrencyTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function getApi() {
      await axios
        .get("https://api.buyucoin.com/ticker/v1.0/allCurrencies")
        .then((response) => {
          const apiData = response.data.data;

          setData(apiData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    getApi();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.code.toLowerCase().includes(searchText.toLowerCase()) ||
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        placeholder="Search By Name or Code"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Max Deposit</TableCell>
              <TableCell>Min Deposit</TableCell>
              <TableCell>Max Withdraw</TableCell>
              <TableCell>Min Withdraw</TableCell>
              <TableCell>With Fee</TableCell>
              <TableCell>Node Status </TableCell>
              <TableCell>Curr. Block</TableCell>
              <TableCell>Crawled Block</TableCell>
              <TableCell>Coin Type</TableCell>
              {/* Add more table headers here */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.maxDeposit}</TableCell>
                <TableCell>{row.minDeposit}</TableCell>
                <TableCell>{row.maxWithdraw}</TableCell>
                <TableCell>{row.minWithdraw}</TableCell>
                <TableCell>{row.withFee}</TableCell>
                <TableCell>{row.network}</TableCell>
                <TableCell>{row.nodeStatus}</TableCell>
                <TableCell>{row.currBlock}</TableCell>
                <TableCell>{row.crawledBlock}</TableCell>

                {/* Add more table cells here */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CurrencyTable;
