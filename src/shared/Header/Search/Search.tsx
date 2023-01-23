import React, { useState } from "react";
import s from "../Header.module.scss";
import GlobalSvgSelector from "../../../assets/icons/global/GlobalSvgSelector";
import { useAppDispatch } from "../../../hooks/store";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  return (
    <form
      className={s.search}
      onSubmit={(event) => {
        event.preventDefault();
        navigate(query, { replace: true });
      }}
    >
      <GlobalSvgSelector id={"search"} />
      <input
        type="text"
        placeholder={"Поиск"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;
