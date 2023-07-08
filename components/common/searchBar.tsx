import React, { FC } from "react";

interface Props {}

const SearchBar: FC<Props> = (): JSX.Element => {
  return (
    <input
      type="text"
      className="border-2 bg-transparent border-secondary-dark p-2 text-primary-dark dark:text-primary rounded focus:border-primary-dark dark:focus:border-primary outline-none transition"
      placeholder="Search..."
    />
  );
};

export default SearchBar;
