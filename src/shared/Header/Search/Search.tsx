import React, { useState } from "react";
import s from "../Header.module.scss";
import GlobalSvgSelector from "../../../assets/icons/global/GlobalSvgSelector";
import { useNavigate } from "react-router-dom";

interface Props {
  value?: string;
  placeholder?: string;
}

const Search: React.FC<Props> = ({ value, placeholder }) => {
  const [query, setQuery] = useState<string>(value || "");
  const navigate = useNavigate();

  function onChange(query: string) {
    navigate(query, { replace: true });
  }

  return (
    <form
      className={s.search}
      onSubmit={(e) => {
        e.preventDefault();
        onChange(query);
      }}
    >
      <GlobalSvgSelector id={"search"} />
      <input
        type="text"
        placeholder={placeholder || "Поиск"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;
