import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IconButton, Input, SearchBar } from "./styles";
import { isIP } from "../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
const InputAddon = React.forwardRef(
  (
    {
      leftAddorment,
      rightAddorment,
      type = "text",
      onChange,
      handleSearch,
      value = "",
      ...rest
    },
    ref
  ) => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParam.get("q") || "");
    const [_error, _setError] = useState(null);
    useEffect(() => {
      const fn = (e) => {
        if (e.key === "Enter") {
          if (type.toLowerCase() === "ip")
            _error === false || isIP(searchValue)
              ? handleSearch(searchValue, isIP, e)
              : _setError(true);
        }
      };

      window.addEventListener("keydown", fn, false);
      return () => window.removeEventListener("keydown", fn, false);
    }, [type, _error, handleSearch, searchValue]);

    return (
      <>
        <SearchBar direction="row" error={_error}>
          {leftAddorment}
          <Input
            ref={ref}
            {...rest}
            value={searchValue}
            type={type.replace(/ip/gi, "text")}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setSearchParam({
                q: e.target.value,
              });
              if (type === "ip") {
                !e.target.value || isIP(e.target.value)
                  ? _setError(false)
                  : _setError(true);
              }
              typeof onChange === "function" && onChange(searchValue, e);
            }}
          />
          <IconButton
            onClick={(e) => {
              if (type.toLowerCase() === "ip")
                _error === false || isIP(searchValue)
                  ? handleSearch(searchValue, isIP, e)
                  : _setError(true);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </IconButton>
        </SearchBar>
      </>
    );
  }
);

InputAddon.propTypes = {};

export default InputAddon;
