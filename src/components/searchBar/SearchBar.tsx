import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { get, readServerError } from "../../utils/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";
import { TagModel } from "../../features/adminPage/questionsPage/question/tagsPopup/tag/Tag";
import disableScroll from 'disable-scroll';


type Props = {
  data: any[]
  onSelectedChange: (selected: any) => void;
  placeholder: string;
  showData: boolean;

}

export function SearchBar(props: Props) {
  const [query, setQuery] = useState("");

  const [suggestions, setSuggestions] = useState<typeof props.data>([]); // This is where we'll store the retrieved suggestions
  const [hideSuggestions, setHideSuggestions] = useState(true);


  const getFilteredItems = (query: string, items: any[]) => {
    if (!query) {
      if (!props.showData) {
        setSuggestions([]);
        return;
      } else {
        setSuggestions(items)
      }
    }
    setSuggestions(items.filter((item: any) => item.key.toLowerCase().includes(query.toLowerCase())));
  };

  useEffect(() => {
    props.data && getFilteredItems(query, props.data);

  }, [query]);

  return (
    <div className={styles.container}>
      <input
        onFocus={() => setHideSuggestions(false)}
        onBlur={async () => {
          setTimeout(() => {
            setHideSuggestions(true);
          }, 200);
        }}
        type="text"
        className={styles.input}
        placeholder={props.placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          props.onSelectedChange(null)
        }}
      />
      <div className={`${styles.suggestions} ${hideSuggestions && styles.hidden}`}>
        {suggestions.length == 0 ? <div className={styles.suggestion}>
          Нет совпадений
        </div>
          :
          suggestions.map((suggestion) => (
            <div className={styles.suggestion} onClick={() => { setQuery(suggestion.key); setHideSuggestions(true); props.onSelectedChange(suggestion) }}>
              <div className={styles.divider} />
              {suggestion.key}
              

            </div>
          ))}
      </div>
    </div>
  );
};
