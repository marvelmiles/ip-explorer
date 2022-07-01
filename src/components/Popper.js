import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";

function Popper({
  anchorEl = null,
  containerId,
  children,
  placement = "bottom",
  onClickAway,
}) {
  const [portal, setPortal] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(anchorEl, popperElement, {
    placement,
  });

  useEffect(() => {
    const fn = (e) =>
      popperElement &&
      typeof onClickAway === "function" &&
      !popperElement.contains(e.target) &&
      e.target !== anchorEl &&
      onClickAway(e);

    window.addEventListener("click", fn, false);
    return () => window.removeEventListener("click", fn, false);
  }, [onClickAway, popperElement, anchorEl]);

  useEffect(() => {
    const popper = (
      <div
        ref={setPopperElement}
        style={{
          ...styles.popper,
          //   display: anchorEl ? "flex" : "none",
        }}
        {...attributes.popper}
      >
        {children}
      </div>
    );
    setPortal(
      createPortal(
        popper,
        containerId
          ? document.getElementById(containerId)
          : document.getElementsByTagName("body")[0]
      )
    );
  }, [containerId, attributes.popper, styles.popper, children, anchorEl]);
  return anchorEl ? portal : null;
}

Popper.propTypes = {};

export default Popper;
