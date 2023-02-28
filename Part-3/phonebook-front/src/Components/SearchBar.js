const SearchBar = (props) => {
  return (
    <div>
      <label htmlFor="search" name="search">
        Search Bar{" "}
      </label>
      <input
        id="search"
        name="search"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default SearchBar;
