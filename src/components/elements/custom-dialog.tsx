import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ICustomDialogProps extends DialogProps {
  open: boolean;
  onClose?: () => void;
  onAgree?: () => void;
  title?: string;
  text?: string;
  agreeButtontext?: string;
  disagreeButtontext?: string;
}

export const CustomDialog = (props: ICustomDialogProps) => {
  const {
    fullWidth = true,
    maxWidth = 'sm',
    title = 'Atenção',
    agreeButtontext = 'Confirmar',
    disagreeButtontext = 'Cancelar',
    ...rest
  } = props;

  const handleClose = (_event: React.SyntheticEvent, reason: string) => {
    if (reason && reason === 'backdropClick') return;

    if (props.onClose) props.onClose();
  };
  return (
    <>
      <Dialog
        {...rest}
        open={props.open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        disableEscapeKeyDown
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={props.onClose}>
            {disagreeButtontext}
          </Button>
          <Button variant='contained' onClick={props.onAgree} autoFocus>
            {agreeButtontext}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
