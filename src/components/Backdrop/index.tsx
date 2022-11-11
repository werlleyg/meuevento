//@ts-nocheck
import React, { useState } from 'react';
import SimpleBackdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9999991,
    color: '#fff',
  },
}));

export default function Backdrop() {
  const classes = useStyles();
  const [msgerro] = useState(false);
  const [open] = useState(true);
  const handleClose = () => {};

  return (
    <div>
      <SimpleBackdrop
        className={classes.backdrop}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
        <br />
        {msgerro && (
          <label style={{ maxWidth: '600px' }}>
            O tempo de processo está demorando mais que o esperado,
            provavelmente houve algum erro. Por favor reinicie a página e tente
            novamente.
          </label>
        )}
      </SimpleBackdrop>
    </div>
  );
}
