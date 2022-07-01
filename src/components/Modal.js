import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Backdrop,
  Container,
  ModalContainer,
  ModalContent,
  Zoom,
} from "./styles";
import ReactDOM from "react-dom";

function Modal({ containerId, open, content, onBackdropClick }) {
  const [portal, setPortal] = useState(null);
  useEffect(() => {
    const modal = (
      <Backdrop open={open}>
        <Zoom animate={open}>
          <ModalContainer
            onClick={(e) => e.currentTarget === e.target && onBackdropClick()}
          >
            <ModalContent
              style={{
                borderRadius: "28px",
              }}
            >
              {content}
            </ModalContent>
          </ModalContainer>
        </Zoom>
      </Backdrop>
    );
    setPortal(
      ReactDOM.createPortal(
        modal,
        containerId
          ? document.getElementById(containerId)
          : document.getElementsByTagName("body")[0]
      )
    );
  }, [content, open, containerId, onBackdropClick]);

  return portal;
}

Modal.propTypes = {};

export default Modal;
