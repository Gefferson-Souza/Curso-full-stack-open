const SearchBar = ({ onChange, value }) => {
  return (
    <div>
      <label htmlFor="search">Search by Name </label>
      <input onChange={onChange} value={value} id="search" />
    </div>
  );
};

export default SearchBar;
