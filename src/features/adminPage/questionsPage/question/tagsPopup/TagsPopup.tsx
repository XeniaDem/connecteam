import { useEffect, useState } from "react";
import { Button } from "../../../../../components/button/Button"
import styles from "./TagsPopup.module.css"
import ellipse1 from "../../../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../../../app/assets/ellipse2.svg"
import { get, post, put, readServerError } from "../../../../../utils/api";
import { Tag, TagModel } from "./tag/Tag";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { SearchBar } from "../../../../../components/searchBar/SearchBar";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../../store/authSlice";
import { QuestionModel } from "../Question";



type Props = {
  closePopup: () => void;
  savedQuestion: QuestionModel;



}

export function TagsPopup(props: Props) {
  const token = useSelector(selectToken)




  const [newTagHidden, setNewTagHidden] = useState(true)

  const addTag = () => {
    if (newTagHidden == true) {
      fetchAllTags()

      setNewTagHidden(false)


    }
    else {
      console.log(currentTag)
      if (currentTag == null || newTags.find(tag => tag.id == currentTag.id)) {
        return;
      }
      const tags = newTags.concat(currentTag)
      setNewTags(tags)

      ///tbd add tags
      setNewTagHidden(true)

    }
  }
  const [allTags, setAllTags] = useState<TagModel[] | null>(null)

  const [newTags, setNewTags] = useState<TagModel[]>(props.savedQuestion.tags)

  const [currentTag, setCurrentTag] = useState<TagModel | null>(null)

  const readAllTags = (message: any) => {

    console.log(message)
    const messageParsed = JSON.parse(message);

    if (messageParsed.data == null) {
      setAllTags(null)
      return;
    }

    const tagsNum = messageParsed.data.length;


    const tagsModels = [];
    for (let i = 0; i < tagsNum; i++) {

      const tagModel = {
        id: messageParsed.data[i].id,
        key: messageParsed.data[i].name,
      }
      tagsModels.push(tagModel)

    }
    setAllTags(tagsModels)

  }



  const fetchAllTags = async () => {
    try {
      const response = await get('tags/', token)
      readAllTags(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


  const addTags = async () => {

    const tags = []

    if (newTags) {
      for (let j = 0; j < newTags.length; j++) {
        tags.push({
          id: newTags[j].id
        })
      }
    }

    const data = JSON.stringify({
      tags: tags
    })


    try {
      const response = await put('questions/' + props.savedQuestion.id + '/tags', data, token)
      props.closePopup()

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }

  const deleteTag = (id: string) => {
    const tag = newTags.find(tag => tag.id == id)

    const tags = newTags.filter(item => item != tag)
    setNewTags(tags)



  }

  useEffect(() => {
    // readTags("")
    console.log(newTags)



  }, [newTags]);


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
              {props.savedQuestion.text}
            </div>

            <div className={styles.tags}>

              {newTags.length == 0 ? (
                <div className={styles.empty}>
                  Пока не было добавлено ни одного тега
                </div>

              ) : (

                <div className={styles.tags}>
                  {newTags?.map(tag =>
                    <div>
                      <Tag savedTag={tag} deleteTag={deleteTag} />

                    </div>

                  )}
                </div>
              )}
              {!newTagHidden ? allTags && <SearchBar data={allTags} onSelectedChange={setCurrentTag} /> : null}



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


          </div>

          <Button text={"Сохранить"} onClick={addTags} className={styles.saveButton} />

        </div>
      </div>
    </div>
  )
}