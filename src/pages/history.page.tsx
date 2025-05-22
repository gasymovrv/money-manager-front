import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import {getHistory} from '../services/api.service';
import {HistoryActionDto} from '../interfaces/history-action.interface';
import {formatByPeriod, formatDateTime} from '../helpers/date.helper';
import Header from '../components/header/header';
import {Operation} from "../interfaces/operation.interface";
import {Period} from "../interfaces/common.interface";

export default function HistoryPage() {
  const history = useHistory();
  const [actions, setActions] = useState<HistoryActionDto[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = async (pageNum: number, pageSize: number) => {
    try {
      setIsLoading(true);
      const response = await getHistory(pageNum, pageSize);
      setActions(response.content);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getActionText = (operation: Operation | undefined) => {
    let result = '-';
    if (operation) {
      result = `Value: ${operation.value}; Date: ${formatByPeriod(operation.date, Period.DAY)}; Category: ${operation.category.name}; Is planned: ${operation.isPlanned ? 'Yes' : 'No'}`;
      const descr = operation.description;
      if (descr) {
        result += `; Description: ${descr}`;
      }
    }
    return result
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header hasActions={false} />
      <Container maxWidth="lg" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Operation History
        </Typography>

        <Paper style={{ marginTop: '20px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Before</TableCell>
                  <TableCell>After</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : actions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No history records found
                    </TableCell>
                  </TableRow>
                ) : (
                  actions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell>{formatDateTime(action.modifiedAt)}</TableCell>
                      <TableCell>
                        {action.actionType} {action.operationType}
                      </TableCell>
                      <TableCell>{getActionText(action.oldOperation)}</TableCell>
                      <TableCell>{getActionText(action.newOperation)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Box>
  );
}
