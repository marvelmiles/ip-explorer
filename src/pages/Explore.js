import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { LoadingBox } from "../components/Animations";
import { Button, Stack, Typography } from "../components/styles";
import SearchBar from "../components/SearchBar";
import http, { handleCancelRequest } from "../api/http";
import { useSearchParams } from "react-router-dom";
import { isIP } from "../helpers";
import { useContext } from "../provider";

const ErrorMsg = ({ message, clear }) => {
  const { theme } = useContext();
  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="title1"
        style={{
          color: theme.palette.secondary.main,
        }}
      >
        {message}
      </Typography>
      <Button
        variant="radius"
        elevation={12}
        style={{
          margin: "10px auto",
        }}
        onClick={() => clear()}
      >
        <Typography
          as="span"
          variant="title2"
          style={{
            lineHeight: "normal",
            color: "#fff",
          }}
        >
          Clear
        </Typography>
      </Button>
    </div>
  );
};

function Explore() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [searchParam, setSearchParam] = useSearchParams();
  let stateRef = useRef({
    setSearchParam,
    q: searchParam.get("q"),
  });
  stateRef = stateRef.current;
  const query =
    "fields=country_flag,country_code2,country_name,time_zone,state_prov,country_name,zipcode,district,calling_code,longitude,latitude,country_capital";
  useEffect(() => {
    http
      .get(
        isIP(stateRef.q)
          ? `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IP_API_KEY}&ip=${stateRef.q}&${query}`
          : `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IP_API_KEY}&${query}`
      )
      .then((d) => {
        stateRef.setSearchParam({ q: d.ip });
        setData(d);
      })
      .catch((err) => setError(err.message || err))
      .finally(() => setLoading(false));

    return () => handleCancelRequest();
  }, []);
  return (
    <Stack
      elevation={loading ? 0 : 12}
      bgColor="light"
      style={{
        borderRadius: 24,
        minHeight: "50vh",
        width: "90%",
        maxWidth: "700px",
        padding: "20px",
        margin: "20px 0",
        textAlign: "center",
      }}
    >
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorMsg
          message={error}
          clear={() => {
            setSearchParam({
              q: "",
            });
            setError("");
          }}
        />
      ) : (
        <>
          <img alt={data.country_name} src={data.country_flag} />
          <div
            style={{
              margin: "25px 0",
            }}
          >
            <Typography variant="title1" as="h3">
              IP Address:
            </Typography>
            <Typography variant="lead" as="h1">
              {data.ip || "----"}
            </Typography>

            <Typography variant="title1" as="h3">
              Location:
            </Typography>
            <Typography variant="lead" as="h1">
              {data.state_prov || "----"} /
              {data.country_name
                ? `${data.country_name}(${data.country_code2})`
                : "----"}
            </Typography>

            <Typography variant="title1" as="h3">
              District / Country Capital:
            </Typography>
            <Typography variant="lead" as="h1">
              {data.district || "----"} / {data.country_capital || "----"}
            </Typography>

            <Typography variant="title1" as="h3">
              Zipcode / Calling code:
            </Typography>
            <Typography variant="lead" as="h1">
              {data.zipcode || "----"} / {data.calling_code || "----"}
            </Typography>

            <Typography variant="title1" as="h3">
              Longitude - Latitude:
            </Typography>
            <Typography variant="lead" as="h1">
              {data.longitude || "----"} - {data.latitude || "----"}
            </Typography>
            <Typography variant="title1" as="h3">
              Timezone:
            </Typography>
            <Typography variant="lead" as="h1">
              {data.time_zone?.name || "----"}
            </Typography>
          </div>

          <SearchBar
            type="ip"
            placeholder="Enter ipv4/ipv6 address"
            handleSearch={(searchValue) => {
              setLoading(true);
              http
                .get(
                  `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IP_API_KEY}&ip=${searchValue}&${query}`
                )
                .then((data) => setData(data))
                .catch((err) => setError(err.message || err))
                .finally(() => {
                  setSearchParam({
                    q: "",
                  });
                  setLoading(false);
                });
            }}
          />
        </>
      )}
    </Stack>
  );
}

Explore.propTypes = {};

export default Explore;
