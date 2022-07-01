import React from "react";
import PropTypes from "prop-types";
import { useContext } from "../provider";
import { Stack, Typography } from "../components/styles";
import SearchBar from "../components/SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Home() {
  const { theme } = useContext();
  const { search } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Stack
        bgColor="light"
        elevation={12}
        style={{
          borderRadius: 24,
          minHeight: "50vh",
          width: "90%",
          maxWidth: "700px",
          padding: "20px",
          margin: "20px 0",
        }}
      >
        <Typography
          as="h1"
          variant="title1"
          color="main"
          style={{ margin: "15px 0" }}
        >
          Welcome to IP-Explorer...
        </Typography>
        <SearchBar
          type="ip"
          placeholder="Enter ipv4/ipv6 address"
          handleSearch={() => navigate("/explore" + search)}
        />
        <Link
          to="/explore"
          style={{
            fontWeight: 600,
            fontSize: "1.8rem",
            color: theme.palette.primary.main,
            "&:hover": {
              color: theme.palette.secondary.main,
            },
          }}
        >
          Find my address!
        </Link>
      </Stack>
    </>
  );
}

Home.propTypes = {};

export default Home;
