import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { get, readServerError } from "../../utils/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";

export type Tag = {
  id: string;
  name: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const token = useSelector(selectToken)

  const [suggestions, setSuggestions] = useState<Tag[]>([]); // This is where we'll store the retrieved suggestions
  const [hideSuggestions, setHideSuggestions] = useState(true);


  const getFilteredItems = (query: string, items: Tag[]) => {
    if (!query) {
      setSuggestions(items);
    }
    setSuggestions(items.filter((tag: Tag) => tag.name.toLowerCase().includes(query.toLowerCase())));
  };



  const countries = ["Belgium", "India", "Bolivia", "New Zealand", "Australia", "Bangladesh", "Belgium", "India", "Bolivia", "New Zealand", "Australia", "Bangladesh", "Belgium", "India", "Bolivia", "New Zealand", "Australia", "Bangladesh"]




  const [tags, setTags] = useState<Tag[] | null>(null)

  // const items = tags;

  

  const readTags = (message: any) => {
    console.log(message)
    const messageParsed = JSON.parse(message);

    if (messageParsed.data == null) {
      setTags(null)
      return;
    }

    const tagsNum = messageParsed.data.length;


    const tagsModels = [];
    for (let i = 0; i < tagsNum; i++) {

      const tagModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].name,
      }
      tagsModels.push(tagModel)

    }
    setTags(tagsModels)

  }



  const fetchTags = async () => {


    try {
      const response = await get('tags/', token)
      readTags(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


  useEffect(() => {
    tags && getFilteredItems(query, tags);

  }, [query]);

  useEffect(() => {
    fetchTags()

  }, []);





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
              <div className={styles.suggestion} onClick={() => { setQuery(suggestion.name); setHideSuggestions(true) }}>
                {suggestion.name}
              </div>
            ))}
        </div>
      </div>
  );
};
