import React from "react";
import PropTypes from "prop-types";
import { IconButton, Paper, Stack, Typography } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ColorPicker = ({
  activeColor = {},
  colors,
  title,
  onSelect,
  blackListColor = {},
}) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="title1" as="h1" color="#333">
        {title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="normal"
        style={{
          textAlign: "center",
        }}
      >
        {colors.map((c, i) => {
          return (
            <div
              key={i}
              style={{
                margin: "5px 0",
                marginRight: "15px",
              }}
            >
              <IconButton
                hoverColor={
                  c.main === blackListColor.main ? c.main : c.text || "#fff"
                }
                elevation={12}
                disabled={c.main === blackListColor.main}
                style={{
                  backgroundColor: c.main,
                  margin: "0px",
                  cursor:
                    c.main === blackListColor.main ? "not-allowed" : "pointer",
                }}
                onClick={() => onSelect(c)}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{
                    color:
                      c.main === activeColor.main ? c.text || "#fff" : c.main,
                  }}
                />
              </IconButton>
              <Typography
                variant="caption"
                style={{
                  color: c.main === blackListColor.main ? "red" : "initial",
                }}
              >
                {c.label}
              </Typography>
            </div>
          );
        })}
      </Stack>
    </div>
  );
};

function ThemePicker({ onSelect, primary = {}, secondary = {}, children }) {
  const primaries = [
    {
      main: "#fff",
      light: "#f5f5f5",
      dark: "#f0f0f0",
      text: "#333",
      label: "Light Mode",
      mode: "light",
    },
    {
      main: "#131313",
      light: "#515151",
      dark: "#333",
      text: "#fff",
      label: "Dark Mode",
      mode: "dark",
    },
    {
      main: "#33ab9f",
      light: "#009688",
      dark: "#00695f",
      label: "Teal",
      mode: "teal",
    },
    {
      main: "#2c387e",
      light: "#6573c3",
      dark: "#3f51b5",
      label: "Indigo",
      mode: "indigo",
    },
  ];
  const secondaries = [
    {
      main: "#00FF00",
      light: "#A3FF90",
      dark: "#009900",
      label: "Green",
      mode: "green",
    },
    {
      main: "#ff0000",
      light: "#ff5436",
      dark: "#da0000",
      label: "Red",
      mode: "red",
    },
    {
      main: "#f06292",
      light: "#f8bbd0",
      dark: "#e91e63",
      label: "Pink",
      mode: "pink",
    },
    {
      main: "#B047F4",
      light: "#BF6BF",
      dark: "#A020Fo",
      label: "Purple",
      mode: "purple",
    },
    {
      main: "#0000FF",
      light: "#3B0EFF",
      dark: "#0200F7",
      label: "Blue",
      mode: "blue",
    },
    {
      main: "#fff",
      light: "#f5f5f5",
      dark: "#f0f0f0",
      text: "#333",
      label: "white",
      mode: "white",
    },
    {
      main: "#131313",
      light: "#515151",
      dark: "#333",
      text: "#fff",
      label: "Black",
      mode: "black",
    },
  ];
  return (
    <Paper
      style={{
        padding: "20px",
      }}
    >
      <Typography variant="title1" as="h3" color="#333">
        Customize Page
      </Typography>
      <Typography variant="title2" as="h4" color="#333">
        Choose your theme and favourite matcing color
      </Typography>
      <ColorPicker
        blackListColor={secondary}
        activeColor={primary}
        colors={primaries}
        title="Theme"
        onSelect={(c) => onSelect(c, "primaryColor")}
      />
      <ColorPicker
        blackListColor={primary}
        activeColor={secondary}
        colors={secondaries}
        title="Colors"
        onSelect={(c) => onSelect(c, "secondaryColor")}
      />
      {children}
    </Paper>
  );
}

ThemePicker.propTypes = {};

export default ThemePicker;
