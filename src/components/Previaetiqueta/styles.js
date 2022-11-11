import styled from 'styled-components';

// Colors
const primaryColor = process.env.NEXT_PUBLIC_EVENT_COLOR_PRIMARY || 'orange';
const secondaryColor =
  process.env.NEXT_PUBLIC_EVENT_COLOR_SECONDARY || 'rgb(0, 155, 58)';

const credencialfundo = '../assets/images/bg_credencial.jpg';
const buttonImage = '../files/images/button-image.png';
const Fundo = '';
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: transparent;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

  .cardParaImpressao {
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-items: center;
    align-items: center;
    text-align: center;
    width: 100%;
    background: linear-gradient(
      to bottom right,
      rgba(var(--blue-rgb), 1),
      rgba(var(--cyan-rgb), 0.7)
    );
    min-height: 100vh;

    .buttonImprimir {
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 1rem 1.75rem;
      border-radius: 5px;
      display: flex;
      margin: auto;
      flex-direction: row;
      justify-content: center;
      justify-items: center;
      align-items: center;
      text-align: center;
      margin-top: 3rem;

      button {
        margin: auto;
      }

      svg {
        margin-top: -0.1rem;
        margin-right: 0.3rem;
      }
    }

    .comDados {
      display: flex;
      flex-direction: row !important;
      justify-content: center;
      justify-items: center;
      align-items: center;
      align-self: center;
      text-align: center;

      .div__cabecalho {
        padding: 2rem;
        font-size: 30px;
        color: #ffffff;
        font-weight: 600;

        .div__opcoes {
          display: flex;
          flex-direction: row;
          margin-top: 2rem;
          span {
            margin: auto;
            display: flex;
            flex-direction: row;
            padding: 1rem;
            color: #fff;
            /* background-color:rgb(255,182,0); */
            background-color: ${secondaryColor};
            border-radius: 10px;
            cursor: pointer;
            .button__image {
              background-image: url(${buttonImage});

              background-size: 100%;
              width: 47px;
              height: 47px;
              margin-right: 0.5rem;
              color: #fff;
            }
          }
        }
      }
    }

    .etiqueta {
      height: 525px !important;
      width: 375px !important;
      text-align: center;
      font-size: 0.5cm;
      border: 1px solid rgba(0, 0, 0, 0.2);
      font-family: 'Arial' !important;
      margin: 4rem 0rem;
      background-image: url(${credencialfundo}) !important;
      background-position: center;
      background-size: cover;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);

      .informacoes {
        text-transform: uppercase;
        margin: auto;
        position: relative;
        top: 37%;
        left: 0;
        right: 0;
        max-width: 100mm;
        height: 50mm;
        background-color: rgba(255, 255, 255, 1);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        color: #000000;
        padding: 0.5rem;
        align-items: center;
        justify-content: center;

        p {
          font-size: 0.59cm;
          margin: 0;
          font-weight: 800;
          font-family: 'Arial' !important;
        }
        .infor2 {
          margin: 0;
          font-size: 0.4cm;
          font-weight: 600;
        }

        .div__cod_barra {
          font-size: 0.3cm;
        }
      }

      p {
        display: flex;
        flex-direction: row;
        justify-content: center;
        justify-items: center;
        align-items: center;
        font-weight: 800;

        svg {
          font-size: 14px;
          margin-top: -0.1rem;
          margin-right: 0.3rem;
        }
      }

      h4 {
        padding: 0.5rem;
        margin-bottom: -1rem;
      }
    }
  }
`;
