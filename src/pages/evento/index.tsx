import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Container, DialogoContent } from './styles';
// @ts-ignore
import { mask } from 'remask'; // This component has no typing
import Head from 'next/head';
import { isAfter } from 'date-fns';
// dialog
import Dialog from '@material-ui/core/Dialog';
// icons
import DoneAllIcon from '@material-ui/icons/DoneAll';
// api
import axios from 'axios';
// toast
import { toast } from 'react-toastify';
// backdrop
import Backdrop from '../../components/Backdrop';

export function Evento() {
  // Checking if event date variables exist
  const auxStartDateEvent = process.env.NEXT_PUBLIC_EVENT_START_DATE || '';
  const auxEndDateEvent = process.env.NEXT_PUBLIC_EVENT_END_DATE || '';

  // Applying the dates in the application
  const startDateEvent = new Date(auxStartDateEvent);
  const endDateEvent = new Date(auxEndDateEvent);

  // Checks if the event will have a supporter
  const hasSupporter: boolean =
    process.env.NEXT_PUBLIC_EVENT_HAS_SUPPORTER === 'true';

  // Backdrop control variable
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  // Dialog control variable
  const [dialogData, setDialogData] = useState({
    open: false,
  });

  // Subscriber data
  const [dataForm, setDataForm] = useState<any>({
    full_name: '',
    cpf: '',
    phone_number: '',
    email: '',
    credential_name: '',
    company_name: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case 'cpf':
        setDataForm({
          ...dataForm,
          cpf: mask(event.target.value, '999.999.999-99'),
        });
        break;
      case 'phone_number':
        setDataForm({
          ...dataForm,
          phone_number: mask(event.target.value, ['(99) 999999999']),
        });
        break;
      case 'credential_name':
        setDataForm({
          ...dataForm,
          credential_name: event.target.value.slice(0, 18),
        });
        break;
      default:
        setDataForm({
          ...dataForm,
          [event.target.name]: event.target.value,
        });
    }
  }

  // Validating CPF
  function TestaCPF(strCPF: string) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == '00000000000') return false;

    for (var i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  // Sending registration
  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event?.preventDefault();
    setShowBackdrop(true);
    let auxCPF = dataForm.cpf.replaceAll('.', '').replaceAll('-', '');
    if (!TestaCPF(auxCPF)) toast.error('Digite um CPF válido.');
    if (!TestaCPF(auxCPF)) return setShowBackdrop(false);

    axios
      .post(`${process?.env?.NEXT_PUBLIC_API}/subscribers`, dataForm)
      .then((res) => {
        setShowBackdrop(false);
        console.log('[success]=> ', res);
        setDialogData({ ...dialogData, open: true });
        setDataForm({
          full_name: '',
          cpf: '',
          phone_number: '',
          email: '',
          credential_name: '',
          company_name: '',
        });
      })
      .catch((error) => {
        setShowBackdrop(false);
        console.log('[error]=> ', error.response.data);
        toast.error(`Erro na inscrição. ${error.response.data.message}`);
      });
  }

  // Regressive counter
  useEffect(() => {
    if (startDateEvent) {
      var target_date = new Date(startDateEvent).getTime();
      var dias, horas, minutos, segundos;
      var regressiva = document.getElementById('regressiva');
      let intervalo = setInterval(function () {
        let current_date = new Date().getTime();
        let segundos_f = (target_date - current_date) / 1000;
        dias = Math.floor(segundos_f / 86400);
        segundos_f = segundos_f % 86400;
        horas = Math.floor(segundos_f / 3600);
        segundos_f = segundos_f % 3600;
        minutos = Math.floor(segundos_f / 60);
        segundos = Math.floor(segundos_f % 60);
        if (document.getElementById('dia_2'))
          document.getElementById('dia_2')!.innerHTML = dias.toString();
        if (document.getElementById('hora_2'))
          document.getElementById('hora_2')!.innerHTML = horas.toString();
        if (document.getElementById('minuto_2'))
          document.getElementById('minuto_2')!.innerHTML = minutos.toString();
        if (document.getElementById('segundo_2'))
          document.getElementById('segundo_2')!.innerHTML = segundos.toString();
      }, 1000);
    }
    console.log('[hasSupporter]=> ', hasSupporter);
    console.log(
      '[hasSupporter .env]=> ',
      process.env.NEXT_PUBLIC_EVENT_HAS_SUPPORTER,
    );
  }, []);

  // dialog
  const handleClose = () => {
    setDialogData({ ...dialogData, open: false });
  };

  return (
    <Container>
      <Head>
        <title>{process.env.NEXT_PUBLIC_EVENT_NAME}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_EVENT_DESCRIPTION}
        />
        <link rel="icon" href={'/favicon.ico'} />
        <link rel="manifest" href={'/manifest.json'} />
        <link rel="apple-touch-icon" href={'/logo192.png'} />
      </Head>

      <div className="div__content_out">
        <div className="div__content_left">
          <img
            src="assets/images/event-logo.png"
            alt={`Logo ${process.env.NEXT_PUBLIC_EVENT_NAME}`}
          />
          <div className="div__description_event">
            <h2>{process.env.NEXT_PUBLIC_EVENT_DESCRIPTION}</h2>
            <div className="div__counter">
              {startDateEvent ? (
                isAfter(new Date(startDateEvent), new Date()) ? (
                  <div className="div__field_count">
                    {/* dias  */}
                    <div className="div__oneColumn_timer">
                      <div className="div__value_timer" id="dia_2">
                        -
                      </div>
                      <div className="div__label_timer">dias</div>
                    </div>
                    {/* horas  */}
                    <div className="div__oneColumn_timer">
                      <div className="div__value_timer" id="hora_2">
                        -
                      </div>
                      <div className="div__label_timer">horas</div>
                    </div>
                    {/* minutos  */}
                    <div className="div__oneColumn_timer">
                      <div className="div__value_timer" id="minuto_2">
                        -
                      </div>
                      <div className="div__label_timer">min</div>
                    </div>
                    {/* segundos */}
                    <div className="div__oneColumn_timer">
                      <div className="div__value_timer" id="segundo_2">
                        20
                      </div>
                      <div className="div__label_timer">seg</div>
                    </div>
                  </div>
                ) : isAfter(new Date(), new Date(startDateEvent)) &&
                  isAfter(new Date(endDateEvent), new Date()) ? (
                  <div className="div__field_count">
                    <div className="div__oneColumn_timer_message">
                      Evento acontecendo
                    </div>
                  </div>
                ) : (
                  <div className="div__field_count">
                    <div className="div__oneColumn_timer_message">
                      Evento encerrado
                    </div>
                  </div>
                )
              ) : (
                <div className="div__field_count">
                  <div className="div__oneColumn_timer_message">
                    Data disponível em breve
                  </div>
                </div>
              )}
            </div>
            <p>
              <br />
              <b>Data:</b> {process.env.NEXT_PUBLIC_EVENT_DATE}
              <br />
              <b>Local:</b> {process.env.NEXT_PUBLIC_EVENT_PLACE}
              <br />
              <b>CEP:</b> {process.env.NEXT_PUBLIC_EVENT_ZIP_CODE}
              <br />
              <b>Horário:</b> {process.env.NEXT_PUBLIC_EVENT_HOUR}
            </p>
          </div>
          {hasSupporter && (
            <div className="div__content_suporter">
              <h3>Apoio</h3>
              <div className="div__content_suporters_list">
                <img src="assets/images/list-logos.png" />
              </div>
            </div>
          )}
        </div>
        <div className="div__content_right">
          <form onSubmit={handleSubmit}>
            <h1>Cadastro</h1>
            <p>
              Realize sua inscrição preenchendo corretamente os campos abaixo
            </p>
            <input
              name="full_name"
              type="text"
              placeholder="Nome completo*"
              value={dataForm.full_name}
              onChange={handleChange}
              required
            />
            <div className="div__oneRow">
              <input
                name="cpf"
                type="text"
                placeholder="CPF*"
                value={dataForm.cpf}
                onChange={handleChange}
                required
              />
              <input
                name="phone_number"
                type="text"
                placeholder="Telefone/Whatsapp*"
                value={dataForm.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="E-mail*"
              value={dataForm.email}
              onChange={handleChange}
              required
            />
            <input
              name="credential_name"
              type="text"
              placeholder="Nome para credencial*"
              value={dataForm.credential_name}
              required
              onChange={handleChange}
            />
            <input
              name="company_name"
              type="text"
              placeholder="Empresa*"
              value={dataForm.company_name}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit" disabled={showBackdrop}>
              Realizar inscrição
            </button>
            <div className="div__credits">
              <p>
                Desenvolvido com <b>❤</b> por <u>Werlley Gonçalves</u>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="div__bg_color"></div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={dialogData.open}
        maxWidth={'sm'}
        fullWidth
      >
        <DialogoContent>
          <DoneAllIcon className="icon__check" />
          <h1>Inscrição realizada com sucesso!</h1>
          <button onClick={handleClose}>Voltar</button>
        </DialogoContent>
      </Dialog>
      {showBackdrop && <Backdrop />}
    </Container>
  );
}
export default Evento;
