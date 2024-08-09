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
  tags: string;
  onButonClicked: (rating: number, selected: string[]) => void;
}


export function RateAnswer(props: Props) {
  const token = useSelector(selectToken)

  if (!props.isAnswering) {

    const [newTagHidden, setNewTagHidden] = useState(true)

    const [rating, setRating] = useState(0)

    const set = (rating: number) => {
      setRating(rating)
    }

    const [tags, setTags] = useState<TagModel[] | null>()

    const readTags = () => {
      if (props.tags == "") {
        setTags(null);
        return;
      }
      const messageParsed = JSON.parse(props.tags);
      const tagsNum = messageParsed.length;
      const tagsModels = [];
      for (let j = 0; j < tagsNum; j++) {
        const tagModel = {
          id: messageParsed[j].id,
          key: messageParsed[j].name

        }
        tagsModels.push(tagModel)
      }
      setTags(tagsModels);
    }

    const [selectedTagsIds, setSelectedTagsIds] = useState<string[]>([]);

    const [allTags, setAllTags] = useState<TagModel[] | null>(null)

    const [currentTag, setCurrentTag] = useState<TagModel | null>(null)

    const addTag = () => {
      if (newTagHidden == true) {
        fetchAllTags()
        setNewTagHidden(false)
      }
      else {
        if (currentTag == null || tags && tags.find(tag => tag.id == currentTag.id)) {
          return;
        }

        if (tags) {
          setTags(tags.concat(currentTag))
        } else {
          const newTags = []
          newTags.push(currentTag)
          setTags(newTags)

        }
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


    const [formSubmitted, setFormSubmitted] = useState(false);
    const getRateError = () => {
      if (rating < 1)
        return "Пожалуйста, поставьте оценку";
    }

    const rateError = getRateError();

    const [ratingSet, setRatingSet] = useState(false);

    useEffect(() => {
      readTags()
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
                      {!ratingSet ?
                        <Tag savedTag={tag} selected={selectedTagsIds.includes(tag.id)} onTagClicked={onTagClicked} />
                        :
                        selectedTagsIds.includes(tag.id) && <Tag savedTag={tag} selected={selectedTagsIds.includes(tag.id)} onTagClicked={() => null} />
                      }
                    </div>
                  )

                }
                )
                }
                {!newTagHidden ? allTags && <SearchBar data={allTags} placeholder="Поиск тега..." onSelectedChange={setCurrentTag} /> : null}

                {!ratingSet && <div className={styles.addButton}>
                  <IconButton onClick={addTag}>
                    {newTagHidden ? (
                      <div className={styles.buttonContainer}>
                        <AddIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
                        Добавить теги
                      </div>
                    ) : (
                      <div className={styles.buttonContainer}>
                        <DoneIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
                        Готово
                      </div>
                    )}
                  </IconButton>
                </div>}
              </div>
              {rateError && formSubmitted && (<div className={styles.errorMessage}>
                {rateError}
              </div>)}

              {!ratingSet && <Button text={"Завершить оценивание"} onClick={() => {
                setFormSubmitted(true);
                if (rateError)
                  return;
                props.onButonClicked(rating, selectedTagsIds)
                setNewTagHidden(true)
                setRatingSet(true)
              }} className={styles.finishButton} />}
            </div>
          </div>
        </div>
      </div>
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
        </div>
      </div>
    )
  }
}