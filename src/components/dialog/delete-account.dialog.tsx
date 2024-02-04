import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import React from 'react';
import { DeleteAccountProps, DialogProps } from '../../interfaces/common.interface';
import { deleteAccount } from '../../services/api.service';
import { showSuccess } from '../../actions/success.actions';
import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../actions/error.actions';
import { COMMON_ERROR_MSG } from '../../constants';
import { SavingsFilterParamsMap } from '../../interfaces/saving.interface';
import { changeFilter } from '../../actions/savings-filter.actions';
import CommonTitleDialog from './common-title.dialog';

const DeleteAccountDialog: React.FC<DialogProps & DeleteAccountProps> = ({
                                                                           open,
                                                                           handleClose,
                                                                           onDelete,
                                                                           account
                                                                         }) => {
  const dispatch = useDispatch();
  const savingsFilterMap: SavingsFilterParamsMap = useSelector(({savingsFilterMap}: any) => savingsFilterMap);

  const handleYes = async () => {
    try {
      await deleteAccount(account.id);
      const newFilterMap = {...savingsFilterMap};
      delete newFilterMap[account.id];
      await onDelete();
      handleClose();
      dispatch(changeFilter(newFilterMap))
      dispatch(showSuccess('Account has been successfully deleted'));
    } catch (err) {
      handleClose();
      console.log(`Deleting account error: ${err}`)
      dispatch((showError(COMMON_ERROR_MSG)))
    }
  }

  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose}>

      <CommonTitleDialog title="Delete account" handleClose={handleClose}/>

      <DialogContent>
        <DialogContentText>
          After deleting an account named '{account.name}', all its operations and categories will be deleted.
          Are you sure?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          No
        </Button>
        <Button onClick={handleYes} color="inherit">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAccountDialog;
