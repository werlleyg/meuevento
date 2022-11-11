import styled from 'styled-components';

// Colors
const primaryColor = process.env.NEXT_PUBLIC_EVENT_COLOR_PRIMARY || 'orange';
const secondaryColor =
  process.env.NEXT_PUBLIC_EVENT_COLOR_SECONDARY || 'rgb(0, 155, 58)';

export const Container = styled.div`
  display: flex;
  background-size: cover;
  background-position: center;
  min-height: 100%;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;

  * {
    outline-color: ${primaryColor};
    font-family: 'Roboto', sans-serif;
  }

  .div__content_out {
    max-width: 1920px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-around;
    z-index: 20;
    min-height: 100%;

    h1 {
      color: ${secondaryColor};
      font-weight: 900;
      font-size: 3rem;
    }
    .div__content {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 2rem;
      align-items: center;
      justify-content: space-around;
    }
  }

  .div__bg_color {
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 1);
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 1),
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 0) 80%,
        rgba(255, 255, 255, 1)
      ),
      linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.05) 25%,
        transparent 25%,
        transparent 75%,
        rgba(0, 0, 0, 0.05) 75%,
        rgba(0, 0, 0, 0.05)
      ),
      linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.05) 25%,
        transparent 25%,
        transparent 75%,
        rgba(0, 0, 0, 0.05) 75%,
        rgba(0, 0, 0, 0.1)
      ),
      linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 1)
      );
    background-size: 100% 100%, 5px 5px, 5px 5px, 5px 5px;
    background-position: 0px 0px, 0px 0px, 2.5px 2.5px, 0px 0px;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .div__content_image {
    display: flex;
    flex-direction: column;
    img {
      max-width: 500px;
      width: 100%;
      height: auto;
    }
    .div__content_suporter {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3 {
        color: rgba(0, 0, 0, 0.4);
        font-weight: 900;
      }
      .div__content_suporters_list {
        margin: auto;
        display: flex;

        img {
          width: 60%;
          margin: auto;
        }
      }
    }
  }
  .div__oneRow {
    display: flex;
  }
  form {
    display: flex;
    flex-direction: column;
    h2 {
      text-align: center;
      color: ${secondaryColor};
      font-family: 'Poppins', sans-serif;
    }
    input {
      padding: 1rem 1.5rem;
      border-radius: 5rem;
      border: 0rem;
      font-size: 1rem;
      min-width: 19rem;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      z-index: 50;

      :focus,
      :active {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
      }
    }
    button {
      margin-top: 1rem;
      padding: 1rem 2.5rem;
      border-radius: 5rem;
      border: 0rem;
      font-size: 1.3rem;
      cursor: pointer;
      transition: 0.3s;
      background-color: ${primaryColor};
      color: white;
      font-weight: 200;
      flex: 1;
      z-index: 50;

      :hover {
        opacity: 0.9;
        transform: scale(1.01);
      }
    }
    .containerButton {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  @media print {
    * {
      display: none;
    }
  }
`;

export const Contentout = styled.div`
  min-height: 100%;
  .etiqueta2 {
    display: none;
  }
  @media print {
    @page {
      margin: 0px !important;
      padding: 0px !important;
      width: 100mm !important;
      height: 40mm !important;
    }
    .etiqueta2 {
      display: block;
    }

    .App {
      visibility: none;
      display: none;
    }

    #printable,
    #printable * {
      visibility: visible;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    #printable {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0;
    }
    #sua_div {
      width: 98mm;
      height: 29mm;
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-family: 'Arial' !important;
      padding: 0;
      margin-top: -20mm;
    }
    .nomeCredencial {
      font-size: 0.62cm;
      margin: 0;
      padding: 0;
      font-weight: 800;
      font-family: 'Arial' !important;
    }
    .demaisCredencial {
      margin: 0;
      padding: 0;
      font-size: 0.5cm;
      font-weight: 600;
      font-family: 'Arial' !important;
    }
    .demaisCredencial2 {
      margin: 0;
      padding: 0;
      font-size: 0.5cm;
      font-weight: 600;
      font-family: 'Arial' !important;
    }
    .div__cod_barra {
      font-size: 0.4cm;
      font-family: 'Arial' !important;
    }
  }
  .etiqueta2 {
    display: none;
  }
  .label__background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    min-height: 100vh;
  }
`;

export default Container;
