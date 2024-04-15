import { useEffect, useState } from "react";
import { Button } from "../../../../../components/button/Button"
import styles from "./TagsPopup.module.css"
import ellipse1 from "../../../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../../../app/assets/ellipse2.svg"
import { post, readServerError } from "../../../../../utils/api";
import { Tag, TagModel } from "./tag/Tag";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { SearchBar } from "../../../../../components/searchBar/SearchBar";



type Props = {
  closePopup: () => void;
  token: string;
  question: string;


}

export function TagsPopup(props: Props) {

  const [topicName, setTopicName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);


  const getErrorMessage = () => {
    if (topicName.trim().length < 3) {
      return ("Название темы должно содержать хотя бы 3 символа")

    }
  }
  var errorMessage = getErrorMessage()


  const [tags, setTags] = useState<TagModel[] | null>(null)

  const readTags = (message: any) => {
    // const messageParsed = JSON.parse(message);

    // if (messageParsed.data == null) {
    //   setTags(null);
    //   return;
    // }
    const tagsNum = 5 //messageParsed.data.length;
    const tagsModels = [];
    for (let j = 0; j < tagsNum; j++) {
      const tagModel = {
        id: j.toString(), //messageParsed.data[j].id,
        text: "Коммуникабельность" //messageParsed.data[j].content

      }
      tagsModels.push(tagModel)
    }
    setTags(tagsModels);


  }

  const [newTagHidden, setNewTagHidden] = useState(true)

  const addTag = () => {
    if (newTagHidden == true) {
      setNewTagHidden(false)

     
    }
    else {
       ///tbd
      setNewTagHidden(true)

    }
  }


  const addTopic = async () => {
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;
    }
    const data = {
      title: topicName
    }

    try {
      const response = await post('topics/', data, props.token)
      props.closePopup()

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


  useEffect(() => {
    // readTags("")



  }, []);


  return (

    <div>

      <div className={styles.background}>
        <div className={styles.container}>

          <div className={styles.close}>
            <Button text={""} onClick={props.closePopup} className={styles.closeButton} />
          </div>

          <div className={styles.body}>
            <div className={styles.ellipse1}>
              <img src={ellipse1} />
            </div>
            <div className={styles.ellipse2}>
              <img src={ellipse2} />
            </div>
            
            <div className={styles.title}>
              Теги
            </div>
            <div className={styles.subtitle}>
              {props.question}
            </div>

            <div className={styles.tags}>

              {tags == null ? (
                <div className={styles.empty}>
                  Пока не было добавлено ни одного тега
                </div>

              ) : (

                (tags?.map(tag =>
                  <div>
                    <Tag savedTag={tag} onChange={() => null} />

                  </div>

                ))
              )}
              {!newTagHidden ? <SearchBar/> : null}

 

              <div className={styles.addButton}>
                <IconButton onClick={addTag}>



                  {newTagHidden ? (
                    <AddIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
                  ) : (
                    <DoneIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />


                  )}
                </IconButton>
              </div>




            </div>





            {errorMessage && formSubmitted && (<div className={styles.errorMessage}>
              {errorMessage}

            </div>)}
          </div>

          <Button text={"Сохранить"} onClick={addTopic} className={styles.saveButton} />

        </div>
      </div>
    </div>
  )
}