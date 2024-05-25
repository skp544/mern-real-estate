import { HiLocationMarker } from "react-icons/hi";
import "./searchBar.css";

const SearchBar = ({ locationQuery, setLocationQuery, onClickHandler }) => {
  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        type="text"
        className="text-black pl-2"
        placeholder="Search by location"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
      />
      <button
        className="button"
        type="button"
        onClick={() => {
          onClickHandler();
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
