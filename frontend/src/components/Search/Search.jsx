import React, { useContext } from "react";
import "./search.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Search = ({ searchItem, onChangeHandler }) => {
  const { setCLick } = useContext(StoreContext);
  return (
    <>
      <div className="search-container" id="search-filter">
        <input
          className="search"
          type="text"
          placeholder="Search your fav..."
          value={searchItem}
          onChange={onChangeHandler}
        />

        <div
          className="search_icon"
          onClick={() => {
            setCLick((prev) => !prev);
            // setSearchItem("");
          }}
        >
          <img src={assets.search_icon} alt="search-icon" className="filter" />
        </div>
      </div>
    </>
  );
};

export default Search;
