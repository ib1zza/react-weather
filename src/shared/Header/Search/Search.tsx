import React, { useState } from "react";
import s from "../Header.module.scss";
import GlobalSvgSelector from "../../../assets/icons/global/GlobalSvgSelector";

interface Props {
  onChange: (x: any) => void;
  value?: string;
  placeholder?: string;
}

const Search: React.FC<Props> = ({ onChange, value, placeholder }) => {
  const [query, setQuery] = useState<string>(value || "");
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
