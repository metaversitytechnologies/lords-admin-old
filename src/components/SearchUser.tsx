import { useState, useEffect, useRef } from "react";
import { getDownlineUserlistLord } from "../api/auth";

const SearchUser = ({
  value,
  onChange,
  placeholder = "Enter Atleast 3 character"
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [justSelected, setJustSelected] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchTerm.length >= 3 && !justSelected) {
        setLoading(true);
        setShowResults(true);
        try {
          const response = await getDownlineUserlistLord({
            userId: searchTerm
          });
          if (response.status) {
            setResults(response.data);
          } else {
            setResults([]);
          }
        } catch (error) {
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, justSelected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (user) => {
    onChange(user);
    setSearchTerm(user);
    setShowResults(false);
    setJustSelected(true);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setJustSelected(false);
  };

  return (
    <div
      className="search-box-container d-inline-block p-l-0"
      ref={searchContainerRef}
    >
      <input
        type="text"
        name="uname"
        placeholder={placeholder}
        autoComplete="off"
        className="event-search"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowResults(true)}
      />
      {loading && (
        <span className="load text-dark">
          <i className="fas fa-spinner fa-spin"></i>
        </span>
      )}
      {showResults && results.length > 0 && (
        <div className="search-box">
          {results.map((user, index) => (
            <p key={index} className="m-b-0" onClick={() => handleSelect(user)}>
              {user}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
