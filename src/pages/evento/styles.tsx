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
  }
  .div__bg_color {
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

  .div__content_left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    max-width: 500px;
    img {
      max-width: 500px;
      width: 100%;
      height: auto;
    }
    .div__description_event {
      color: rgba(16, 16, 16, 0.8);
      font-family: 'Poppins', sans-serif;
      h2 {
        text-align: center;
        color: ${secondaryColor};
        font-family: 'Poppins', sans-serif;
      }
      p {
        padding: 0rem;
        margin: 0rem;
        font-size: 1rem;
      }
      b {
        font-size: 1rem;
        font-weight: bolder !important;
      }
      .div__counter {
        .div__field_count {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;

          .div__oneColumn_timer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background-color: rgba(255, 255, 255, 0.8);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            height: 4rem;
            width: 4rem;
            border-radius: 8px;
            color: ${secondaryColor};
            .div__value_timer {
              font-weight: 600;
            }
            .div__label_timer {
              font-size: 0.9rem;
            }
          }
        }
      }
    }
    .div__content_suporter {
      h3 {
        text-align: center;
        color: rgb(16, 16, 16, 0.8);
        font-family: 'Poppins', sans-serif;
      }
      .div__content_suporters_list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img {
          max-width: 80%;
        }
      }
    }
  }
  .div__content_right {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 500px;

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.5rem;
      h1 {
        text-align: center;
        margin: 0rem;
        padding: 0rem;
        color: ${primaryColor};
      }
      p {
        text-align: center;
        margin: 0rem auto;
        margin-bottom: 1rem;
        padding: 0rem;
        max-width: 360px;
        font-weight: 600;
        color: rgba(16, 16, 16, 0.8);
      }
      input {
        padding: 1rem 1.5rem;
        border-radius: 5rem;
        border: 0rem;
        font-size: 1rem;
        min-width: 15rem;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

        :focus,
        :active {
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
        }
      }
      button {
        padding: 1rem 2.5rem;
        border-radius: 5rem;
        border: 0rem;
        font-size: 1.3rem;
        cursor: pointer;
        transition: 0.3s;
        background-color: ${primaryColor};
        color: white;
        font-weight: 200;

        :hover {
          opacity: 0.9;
          transform: scale(1.01);
        }
      }

      .div__credits {
        margin-top: 0.5rem;
        p {
          font-size: 0.8rem;
          color: rgba(16, 16, 16, 0.45);
          b {
            color: red;
          }
        }
      }
    }
  }

  .div__oneRow {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    width: 100%;
    flex: 1;
    input {
      width: 100%;
    }
  }

  @media screen and (max-width: 675px) {
    .div__oneRow {
      flex-direction: column;
    }
  }
`;

export const DialogoContent = styled.div`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  .icon__check {
    margin: auto;
    color: rgba(0, 0, 0, 0.5);
    font-size: 5rem;
  }
  h1 {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    color: ${secondaryColor};
  }
  button {
    padding: 1rem 1.5rem;
    border-radius: 5rem;
    border: 0rem;
    font-size: 1.3rem;
    cursor: pointer;
    transition: background-color 0.1s;
    background-color: white;
    border: 2px solid ${primaryColor};
    font-weight: 200;
    color: ${primaryColor};
    margin-top: 3rem !important;
    :hover {
      color: white;
      background-color: ${primaryColor};
    }
  }
`;

export default Container;
