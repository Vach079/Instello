import React from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import './dialog.scss'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(5),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(5),
  },
}));

export default function Dialogs({ children, formaAddPost, open, setOpen,updatePost }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {children}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ textAlign: 'center', fontSize: '17px', p: 1, color: 'white', width: '100%', background: '#1E293BFF' }} id="customized-dialog-title">
          Create Status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 2,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ background: '#1E293BFF' }}>
          <Typography gutterBottom sx={{ color: 'white' }}>
            What do you have in mind?
          </Typography>
          {formaAddPost}
          {updatePost}
        </DialogContent>
        <DialogActions sx={{ background: '#1E293BFF' }}>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}