import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  NavLink as Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  Button,
  Header,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintBrush,
  faHouse,
  faMagnifyingGlass,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";
import ThemePicker from "./ThemePicker";
import Modal from "./Modal";
import { useContext } from "../provider";
import useMediaQuery from "../hooks/useMediaQuery";
import Popper from "./Popper";
function AppBar(props) {
  const [openModal, setOpenModal] = useState(false);
  const [popperAnchor, setPopperAnchor] = useState(null);

  const { theme, setTheme } = useContext();
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dialogParam = (searchParams.get("dialog") || "").toLowerCase();
  const isXS = useMediaQuery("(max-width: 320px)");
  useEffect(() => {
    if (dialogParam === "theme_picker") setOpenModal(true);
    else setOpenModal(false);
    if (!isXS) setPopperAnchor(null);
  }, [dialogParam, isXS]);
  const links = [
    {
      icon: faHouse,
      pathname: "/",
      styles: {
        link: {
          display: isXS ? "none" : "inline",
        },
        button: {
          backgroundColor: pathname === "/" ? theme.palette.primary.light : "",
        },
      },
      text: "Home",
      onClick: () => setPopperAnchor(null),
    },
    {
      icon: faMagnifyingGlass,
      pathname: "/explore",
      styles: {
        link: {
          display: isXS ? "none" : "inline",
        },
        button: {
          backgroundColor:
            pathname === "/explore" ? theme.palette.primary.light : "",
        },
      },
      text: "Explore",
      onClick: () => setPopperAnchor(null),
    },
    {
      icon: faPaintBrush,
      styles: {
        button: {
          display: isXS ? "none" : "inline",
          backgroundColor:
            dialogParam === "theme_picker" ? theme.palette.primary.light : "",
        },
      },
      text: "Paint",
      onClick: () => {
        setSearchParams({
          dialog: "theme_picker",
        });
        setPopperAnchor(null);
      },
    },
  ];

  return (
    <>
      <Header>
        <Typography as="h1" variant="lead">
          IP-Explorer
        </Typography>
        <Stack
          direction="row"
          as="nav"
          style={{
            flexWrap: "nowrap",
          }}
        >
          <ul>
            {links.map((l, i) =>
              l.pathname ? (
                <Link to={l.pathname + search} key={i} style={l.styles.link}>
                  <IconButton onClick={l.onClick} style={l.styles.button}>
                    <FontAwesomeIcon icon={l.icon} />
                  </IconButton>
                </Link>
              ) : (
                <IconButton key={i} style={l.styles.button} onClick={l.onClick}>
                  <FontAwesomeIcon icon={l.icon} />
                </IconButton>
              )
            )}
            <IconButton
              style={{
                display: isXS ? "inline-flex" : "none",
              }}
              onClick={(e) => setPopperAnchor(popperAnchor ? null : e.target)}
            >
              <FontAwesomeIcon icon={faHamburger} />
            </IconButton>
          </ul>
        </Stack>
      </Header>
      <Modal
        open={openModal}
        content={
          <ThemePicker
            primary={theme.palette.primary}
            secondary={theme.palette.secondary}
            onSelect={(c, key) => setTheme({ [key]: c })}
          >
            <Button
              variant="radius"
              elevation={12}
              style={{
                backgroundColor: "#fff",
                margin: "0 auto",
              }}
              onClick={() =>
                setSearchParams(
                  {
                    dialog: "",
                  },
                  { replace: true }
                )
              }
            >
              <Typography
                as="span"
                style={{
                  color: "#333",
                }}
              >
                Dismiss
              </Typography>
            </Button>
          </ThemePicker>
        }
        onBackdropClick={() =>
          setSearchParams(
            {
              dialog: "",
            },
            { replace: true }
          )
        }
      />
      <Popper anchorEl={popperAnchor} onClickAway={() => setPopperAnchor(null)}>
        <Stack
          as="nav"
          bgColor="light"
          elevation={12}
          style={{
            marginTop: "15px",
            // padding: "10px",
          }}
        >
          <ul>
            {links.map((l, i) =>
              l.pathname ? (
                <Link key={i} to={l.pathname + search}>
                  <ListItem onClick={l.onClick}>
                    <IconButton>
                      <FontAwesomeIcon icon={l.icon} />
                    </IconButton>
                    <ListItemText>{l.text}</ListItemText>
                  </ListItem>
                </Link>
              ) : (
                <ListItem onClick={l.onClick} key={i}>
                  <IconButton>
                    <FontAwesomeIcon icon={l.icon} />
                  </IconButton>
                  <ListItemText>{l.text}</ListItemText>
                </ListItem>
              )
            )}
          </ul>
        </Stack>
      </Popper>
    </>
  );
}

AppBar.propTypes = {};

export default AppBar;
