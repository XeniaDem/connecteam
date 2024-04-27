
import styles from "./RateAnswer.module.css"
import dots from "../dots.svg"
import { Button } from "../../../../components/button/Button"
import { StarRating } from "../../components/starRating/StarRating"
import { useEffect, useState } from "react"
import { Question } from "../../components/question/Question"
import { TagModel } from "../../../adminPage/questionsPage/question/tagsPopup/tag/Tag"
import { Tag } from "../../components/tag/Tag"
import { SearchBar } from "../../../../components/searchBar/SearchBar"
import { get, readServerError } from "../../../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../../../../store/authSlice"
import { IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';


type Props = {
  isAnswering: boolean;
  isCreator: boolean;
  nameAnswering: string;
  question: string;
  onButonClicked: (rating: number) => void;

}


export function RateAnswer(props: Props) {
  const token = useSelector(selectToken)



  if (!props.isAnswering) {

    const [newTagHidden, setNewTagHidden] = useState(true)

    const [rating, setRating] = useState(0)

    const set = (rating: number) => {
      setRating(rating)
    }

    const [tags, setTags] = useState<TagModel[] | null>(null)

    const readTags = (message: any) => {
      // const messageParsed = JSON.parse(message);

      // if (messageParsed.data == null) {
      //   setTags(null);
      //   return;
      // }
      const tagsNum = 10 //messageParsed.data.length;
      const tagsModels = [];
      for (let j = 0; j < tagsNum; j++) {
        const tagModel = {
          id: j.toString(), //messageParsed.data[j].id,
          key: "Тег" //messageParsed.data[j].content

        }
        tagsModels.push(tagModel)
      }
      setTags(tagsModels);


    }

    const [selectedTagsIds, setSelectedTagsIds] = useState<string[]>([]);



    const [allTags, setAllTags] = useState<TagModel[] | null>(null)

    // const [newTags, setNewTags] = useState<TagModel[]>([])


    const [currentTag, setCurrentTag] = useState<TagModel | null>(null)

    const addTag = () => {
      if (newTagHidden == true) {
        fetchAllTags()
  
        setNewTagHidden(false)
  
  
      }
      else {
        // console.log(currentTag)
        if (currentTag == null || tags && tags.find(tag => tag.id == currentTag.id)) {
          return;
        }
       
        tags && setTags(tags.concat(currentTag))
  
        ///tbd add tags
        setNewTagHidden(true)
  
      }
    }

    const readAllTags = (message: any) => {

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

    useEffect(() => {
      readTags("")



    }, []);
    return (
      <div>
        <div className={styles.container}>

          <div className={styles.content}>
            <div className={styles.question}>
              <Question nameAnswering={props.nameAnswering} text={props.question} />

              <div className={styles.stars}>
                <StarRating onRatingSet={set} />
              </div>

              <div className={styles.tags}>



                {tags?.map(tag => {
                  const onTagClicked = (newValue: boolean) => {
                    if (newValue) {
                      const newSelectedTagsIds = [...selectedTagsIds, tag.id]
                      setSelectedTagsIds(newSelectedTagsIds)
                    } else {
                      const newSelectedTagsIds = [...selectedTagsIds].filter(tagId => tagId != tag.id)
                      setSelectedTagsIds(newSelectedTagsIds)
                    }
                  }
                  return (
                    <div>
                      <Tag savedTag={tag} selected={selectedTagsIds.includes(tag.id)} onTagClicked={onTagClicked} />

                    </div>
                  )

                }
                )
                }
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
                {/* <SearchBar data={[]} onSelectedChange={() => null} />  ////////////////////////////////////// */}



              </div>




              <Button text={"Завершить оценивание"} onClick={() => props.onButonClicked(rating)} className={styles.finishButton} />


            </div>

          </div>

        </div>

      </div >
    )
  }
  else {
    return (
      <div>
        <div className={styles.container}>

          <div className={styles.middle}>
            <div className={styles.title}>
              Игроки оценивают ваш ответ
            </div>

            <div className={styles.dots}>
              <img src={dots} />
            </div>
          </div>


          {/* {props.isCreator ? (
            <Button text={"Завершить оценивание"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.finishButton} />


          ) : (
            <div />
          )} */}



        </div>

      </div>
    )
  }

}