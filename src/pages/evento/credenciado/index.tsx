import Head from 'next/head';
import { ReactNode, useState, useEffect, FormEvent, ChangeEvent } from 'react';

import { Container, Contentout } from './styles';

// mask
//@ts-ignore
import { mask, unMask } from 'remask';
import { StringDecoder } from 'string_decoder';

// alertas
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// ticket preview
import Previaetiqueta from '../../../components/Previaetiqueta';
import api from '../../api';
import Backdrop from '../../../components/Backdrop';

interface ISubscriberData {
  show?: boolean;
  id_code?: string;
  credential_company?: string;
  credential_role?: string;
  company_name?: string;
  credential_name?: string;
}

interface IApiSubscriberData {
  code: string;
  company?: string;
  name?: string;
  note?: string;
  credential_role?: string;
  company_name?: string;
  credential_name?: string;
}

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function Credenciado() {
  // Checks if the event will have a supporter
  const hasSupporter: boolean =
    process.env.NEXT_PUBLIC_EVENT_HAS_SUPPORTER === 'true';
  const [dadoInscrito, setDadoInscrito] = useState('');

  const [dados, setDados] = useState<ISubscriberData>();
  const [dadosImpre, setDadosImpre] = useState<ISubscriberData>();
  const [showinput, setShowinput] = useState(true);
  const [alertas, setAlertas] = useState({
    status: false,
    type: '',
    message: '',
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDadoInscrito(
      mask(unMask(e.target.value), [
        '999-99999',
        '999-999999',
        '999.999.999-99',
      ]),
    );
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowinput(false);

    if (dadoInscrito.length === 9 || dadoInscrito.length === 10) {
      //@ts-ignore
      let response: IApiSubscriberData = await getApi(dadoInscrito, 'code');
      if (response) {
        setDadosImpre({
          show: true,
          id_code: response?.code,
          credential_name: response?.credential_name,
          credential_company: response?.company_name,
          credential_role: response?.note,
        });
        setDados({
          show: true,
          id_code: response?.code,
          credential_name: response?.credential_name,
          credential_company: response?.company_name,
          credential_role: response?.note,
        });
      }
    } else if (dadoInscrito.length === 14) {
      //@ts-ignore
      let response: IApiSubscriberData = await getApi(dadoInscrito, 'cpf');
      console.log('[response]=> ', response);
      if (response) {
        setDadosImpre({
          show: true,
          id_code: response?.code,
          credential_name: response?.credential_name,
          credential_company: response?.company_name,
          credential_role: response?.note,
        });
        setDados({
          show: true,
          id_code: response?.code,
          credential_name: response?.credential_name,
          credential_company: response?.company_name,
          credential_role: response?.note,
        });
      }
    } else {
      setAlertas({
        ...alertas,
        status: true,
        type: 'warning',
        message: 'Preencha a inscrição corretamente',
      });
      setShowinput(true);
    }
  }

  const novaImpressao = () => {
    window.print();
    setDadoInscrito('');
    setTimeout(() => {
      setShowinput(true);
      //@ts-ignore
      document.querySelector('#input_cpf').focus();
    }, 500);
  };

  const verificarNome = (e: string | undefined) => {
    if (typeof e !== 'string') return '';
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

  const verificarCompany = (e: string | undefined) => {
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

  // clear button actions
  function keyPressed(evt: KeyboardEvent) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key);
  }

  async function getApi(code: string, type: string) {
    let auxURL =
      type === 'cpf'
        ? `/subscribers/list-by?cpf=${code}`
        : `/subscribers/list-by?code=${code}`;

    let auxResponse = false;
    await api
      .get(auxURL)
      .then((response: any) => {
        auxResponse = response.data[0];
        setShowinput(true);
        console.log('[Response]=> ', response);
      })
      .catch((error: any) => {
        console.log('[ERROR]=> ', error.response);
        setAlertas({
          ...alertas,
          status: true,
          type: 'error',
          message: error.response.data.message,
        });
        setShowinput(true);
        auxResponse = false;
      });
    return auxResponse;
  }

  useEffect(() => {
    document.onkeypress = function (evt) {
      var str = keyPressed(evt);
      if (str === '2' || str === '1') {
        return;
      }
    };
  }, []);

  return (
    <Contentout>
      <Container>
        <Head>
          <title>CREDENCIADO - {process.env.NEXT_PUBLIC_EVENT_NAME}</title>
          <meta
            name="description"
            content={`CREDENCIADO - ${process.env.NEXT_PUBLIC_EVENT_NAME}`}
          />
          <link rel="icon" href={'/favicon.ico'} />
          <link rel="manifest" href={'/manifest.json'} />
          <link rel="apple-touch-icon" href={'/logo192.png'} />
        </Head>
        <div className="div__content_out">
          <h1>Área do Credenciado</h1>
          <div className="div__content">
            <div className="div__content_image">
              <img
                src="../assets/images/event-logo.png"
                alt={`Logo ${process.env.NEXT_PUBLIC_EVENT_NAME}`}
              />
              {hasSupporter && (
                <div className="div__content_suporter">
                  <h3>Apoio</h3>
                  <div className="div__content_suporters_list">
                    <img src="../assets/images/list-logos.png" />
                  </div>
                </div>
              )}
            </div>

            <form
              className="etiqueta"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <label htmlFor="input_cpf" className="label__background"></label>
              <h2>Nº de Inscrição ou CPF</h2>
              {showinput && (
                <input
                  type="text"
                  placeholder=""
                  id="input_cpf"
                  name="input_cpf"
                  value={dadoInscrito}
                  onChange={handleChange}
                  autoFocus
                />
              )}
              <div className="containerButton">
                <button type="submit">Buscar</button>
              </div>
            </form>

            {alertas.status && (
              <Snackbar
                open={true}
                autoHideDuration={6000}
                onClose={() =>
                  setAlertas({
                    ...alertas,
                    status: false,
                    type: '',
                    message: '',
                  })
                }
              >
                <Alert
                  onClose={() =>
                    setAlertas({
                      ...alertas,
                      status: false,
                      type: '',
                      message: '',
                    })
                  }
                  severity={alertas.type}
                >
                  {alertas.message}
                </Alert>
              </Snackbar>
            )}
            {dados?.show && (
              <Previaetiqueta
                dados={dados}
                confirmar={() => {
                  setDados({ ...dados, show: false });
                  setTimeout(() => {
                    document.onkeypress = function (evt) {
                      var str = keyPressed(evt);
                      if (str === '2' || str === '1') {
                        return;
                      }
                    };
                    novaImpressao();
                  }, 25);

                  setTimeout(() => {
                    document.onkeypress = function (evt) {
                      var str = keyPressed(evt);
                      if (str === '2' || str === '1') {
                        return;
                      }
                    };
                    setDados(undefined);
                    setDadoInscrito('');
                  }, 50);
                }}
                cancelar={() => {
                  setShowinput(true);
                  setDados(undefined);
                  setTimeout(() => {
                    //@ts-ignore
                    document.querySelector('#input_cpf').focus();
                  }, 500);

                  document.onkeypress = function (evt) {
                    var str = keyPressed(evt);
                    if (str === '2' || str === '1') {
                      return;
                    }
                  };
                }}
              />
            )}
          </div>
        </div>
        <div className="div__bg_color"></div>
        {!showinput && <Backdrop />}
      </Container>
      {dados && (
        <div
          className="etiqueta etiqueta2"
          id="printable"
          style={{
            width: '9.8cm',
            height: '2.9cm',
          }}
        >
          <div className="informacoes" id="sua_div">
            <span className="nomeCredencial">
              {verificarNome(dados?.credential_name)}
            </span>
            <span className="demaisCredencial">{dados.credential_role}</span>
            <span className="demaisCredencial2">
              {verificarCompany(dados.credential_company)}
            </span>
            <div className="div__cod_barra">
              <svg id="barcode1"></svg>
            </div>
          </div>
        </div>
      )}
    </Contentout>
  );
}

export default Credenciado;
