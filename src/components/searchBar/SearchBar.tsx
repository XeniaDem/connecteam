import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { get, readServerError } from "../../utils/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";
import { TagModel } from "../../features/adminPage/questionsPage/question/tagsPopup/tag/Tag";


type Props = {
  data: any[]
  onSelectedChange: (selected: any) => void;

}

export function SearchBar(props: Props) {
  const [query, setQuery] = useState("");
  const token = useSelector(selectToken)

  const [suggestions, setSuggestions] = useState<typeof props.data>([]); // This is where we'll store the retrieved suggestions
  const [hideSuggestions, setHideSuggestions] = useState(true);


  const getFilteredItems = (query: string, items: any[]) => {
    if (!query) {
      setSuggestions(items);
    }
    setSuggestions(items.filter((item: any) => item.key.toLowerCase().includes(query.toLowerCase())));
  };



  const countries = ["Belgium", "India", "Bolivia", "New Zealand", "Australia", "Bangladesh", "Belgium", "India", "Bolivia", "New Zealand", "Australia", "Bangladesh", "Belgium", "India", "Bolivia", "New Zealand", "Australia", "Bangladesh"]




  // const [tags, setTags] = useState<typeof props.data | null>(null)

  // // const items = tags;

  

  // const readTags = (message: any) => {
  //   console.log(message)
  //   const messageParsed = JSON.parse(message);

  //   if (messageParsed.data == null) {
  //     setTags(null)
  //     return;
  //   }

  //   const tagsNum = messageParsed.data.length;


  //   const tagsModels = [];
  //   for (let i = 0; i < tagsNum; i++) {

  //     const tagModel = {
  //       id: messageParsed.data[i].id,
  //       name: messageParsed.data[i].name,
  //     }
  //     tagsModels.push(tagModel)

  //   }
  //   setTags(tagsModels)

  // }



  // const fetchTags = async () => {


  //   try {
  //     const response = await get('tags/', token)
  //     readTags(response.text)

  //   }
  //   catch (error: any) {
  //     readServerError(error.response.text)
  //     console.log("error:", error)
  //   }


  // }


  useEffect(() => {
    props.data && getFilteredItems(query, props.data);

  }, [query]);

  useEffect(() => {
    console.log(props.data)

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
              <div className={styles.suggestion} onClick={() => { setQuery(suggestion.key); setHideSuggestions(true); props.onSelectedChange(suggestion) }}>
                {suggestion.key}
              </div>
            ))}
        </div>
      </div>
  );
};
