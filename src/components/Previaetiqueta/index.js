import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PrintIcon from '@material-ui/icons/Print';

import { Container } from './styles';

import JsBarcode from 'jsbarcode';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [dados, setDados] = React.useState(props.dados);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function keyPressed(evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key);
  }

  document.onkeypress = function (evt) {
    var str = keyPressed(evt);
    if (str === '2' && props.dados) {
      props.cancelar();
    }
    if ((str === '1' || evt.key === 'Enter') && props.dados) {
      props.confirmar();
    }
  };

  const validarComTouch = (e) => {
    setOpen(false);
    setTimeout(() => props.confirmar(), 40);
  };
  const verificarNome = (e) => {
    let name;
    let aux;

    if (e.length > 17) {
      aux = e.split(' ');
      name = aux[0] + ' ' + aux[aux.length - 1];
      if (name.length > 17) {
        name = name.slice(0, 17) + '.';
      }
    } else {
      name = e;
    }
    return name;
  };

  React.useEffect(() => {
    setTimeout(() => {
      JsBarcode('#barcode1', props.dados.id_code, {
        fontSize: 13,
        height: 15,
        width: '1cm',
        lineColor: '#000000',
        margin: 0,
        marginTop: 7,
      });
    }, 100);
  }, []);

  const verificarCompany = (e) => {
    if (typeof e !== 'string') return '';
    let name;
    let aux;
    if (e.length > 23) {
      name = e.slice(0, 23) + '.';
    } else {
      name = e;
    }
    return name;
  };

  return (
    <div>
      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ padding: 0, margin: 0 }}
        PaperProps={{
          style: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            boxShadow: 'none',
          },
        }}
      >
        {/* <DialogTitle id="alert-dialog-title">{""}</DialogTitle> */}
        <DialogContent style={{ padding: 0, margin: 0 }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ padding: 0, margin: 0 }}
          >
            <Container>
              <div className="cardParaImpressao">
                {dados ? (
                  <div className="comDados">
                    <div className="div__cabecalho">
                      Confirma suas informações <br /> para impressão?
                      <div className="div__opcoes">
                        <span onClick={() => validarComTouch()}>
                          <div className="button__image">1</div> - SIM
                        </span>
                        <span onClick={() => props.cancelar()}>
                          <div className="button__image">2</div> - NÃO
                        </span>
                      </div>
                    </div>
                    <div className="etiqueta">
                      <div className="informacoes" id="sua_div">
                        <p>{verificarNome(dados.credential_name)}</p>

                        <p className="infor2">{dados.credential_role}</p>
                        <p className="infor2">
                          {verificarCompany(dados.credential_company)}
                        </p>
                        <div className="div__cod_barra">
                          <svg id="barcode1"></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Container>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
