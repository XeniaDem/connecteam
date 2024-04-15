import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";



export function SearchBar() {
  const [query, setQuery] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]); // This is where we'll store the retrieved suggestions
  const [hideSuggestions, setHideSuggestions] = useState(true);


  const getFilteredItems = (query: string, items: any) => {
    if (!query) {
      setSuggestions(items);
    }
    setSuggestions(items.filter((country: string) => country.toLowerCase().includes(query.toLowerCase())));
  };



  const countries = ["Belgium", "India", "Bolivia", "New Zealand", "Australia", "Bangladesh", "Belgium", "India", "Bolivia", "New Zealand", "Australia", "Bangladesh", "Belgium", "India", "Bolivia", "New Zealand", "Australia", "Bangladesh"]

  const items = countries;








  useEffect(() => {
    getFilteredItems(query, items);

  }, [query]);



  return (
      <div className={styles.container}>
        <input
          onFocus={() => setHideSuggestions(false)}
          // onBlur={async () => {
          //   setTimeout(() => {
          //     setHideSuggestions(true);
          //   }, 200);
          // }}
          type="text"
          className={styles.input}
          placeholder="Поиск тега..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div className={`${styles.suggestions} ${hideSuggestions && styles.hidden}`}>
          {suggestions.length == 0 ? <div className={styles.suggestion}>
            Нет совпадений
          </div>
            :
            suggestions.map((suggestion) => (
              <div className={styles.suggestion} onClick={() => { setQuery(suggestion); setHideSuggestions(true) }}>
                {suggestion}
              </div>
            ))}
        </div>
      </div>
  );
};
