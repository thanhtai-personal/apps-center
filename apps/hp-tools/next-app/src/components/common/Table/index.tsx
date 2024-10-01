import React, { useEffect } from "react";
import {
  withStyles,
  Theme,
  useTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Flex from "../Flex";
import Text from "../Text";
import {
  Button,
  IconButton,
  Input,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { useRouter } from "next/router";
import useLocalize from "src/hooks/useLocalize";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import LoadingFallback from "src/components/LoadingFallback";
import { isEmpty } from "lodash";

interface TableProps {
  rows: Array<any>;
  columns: Array<any>;
  paging?: any;
  checkboxSelection?: boolean;
  onClickDetail?: Function;
  onClickDelete?: Function;
  updatePaging?: Function;
  updateSelected?: Function;
  searchData?: Function;
  rowsPerPageOptions?: Array<any>;
  selectedIds?: Array<string>;
  loading?: boolean;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props: TableProps) {
  const classes = useStyles();
  const {
    rows,
    columns,
    onClickDelete,
    onClickDetail,
    paging = {},
    updatePaging,
    searchData,
    loading = false,
    updateSelected,
    selectedIds,
    rowsPerPageOptions = [10, 20, 50],
  } = props;
  const { t } = useLocalize();
  const router = useRouter();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    updatePaging &&
      updatePaging({
        page: newPage,
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updatePaging &&
      updatePaging({
        page: 0,
        rowsPerPage: parseInt(event.target.value, 20),
      });
  };

  useEffect(() => {
    searchData && searchData();
  }, [paging.page, paging.rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell key={"header-check-all"}>
              <Input
                type="checkbox"
                onChange={(e: any) => {
                  const value = e.target?.checked;
                  if (value) {
                    updateSelected((rows || []).map((r) => r._id));
                  } else {
                    updateSelected([]);
                  }
                }}
              />
            </StyledTableCell>
            {columns.map((col: any) => (
              <StyledTableCell key={col.field}>
                {t(col.headerName)}
              </StyledTableCell>
            ))}
            <StyledTableCell key={"header-actions"}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} rowSpan={20}>
                <LoadingFallback />
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell key={"checked-box"}>
                  <input
                    type="checkbox"
                    checked={(selectedIds || []).includes(row._id)}
                    onChange={(e: any) => {
                      const value = e.target?.checked;
                      if (value) {
                        updateSelected([...(selectedIds || []), row._id]);
                      } else {
                        updateSelected(
                          (selectedIds || []).filter((id) => id !== row._id)
                        );
                      }
                    }}
                  />
                </StyledTableCell>
                {columns.map((col: any) => (
                  <StyledTableCell key={col.field}>
                    {col.render ? col.render(row) : row[col.field]}
                  </StyledTableCell>
                ))}
                <StyledTableCell key={`${row._id}-actions`}>
                  <Flex>
                    <Button>
                      <Text
                        color={"steelblue"}
                        onClick={() =>
                          onClickDetail && onClickDetail(router, row)
                        }
                      >
                        Detail
                      </Text>
                    </Button>
                    <Button>
                      <Text
                        color={"red"}
                        onClick={() => onClickDelete && onClickDelete(row)}
                      >
                        Delete
                      </Text>
                    </Button>
                  </Flex>
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          {paging && !isEmpty(paging) && (
            <TableRow>
              <TableCell colSpan={columns.length + 2} rowSpan={1}>
                <Flex width={"100%"} justifyContent={"flex-end"}>
                  <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    colSpan={3}
                    count={paging.total}
                    rowsPerPage={paging.rowsPerPage}
                    page={paging.page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </Flex>
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
