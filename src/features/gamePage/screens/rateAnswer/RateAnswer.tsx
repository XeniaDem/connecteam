
import styles from "./RateAnswer.module.css"
import dots from "../dots.svg"
import { Button } from "../../../../components/button/Button"
import { StarRating } from "../../components/starRating/StarRating"
import { useEffect, useState } from "react"
import { Question } from "../../components/question/Question"
import { TagModel } from "../../../adminPage/questionsPage/question/tagsPopup/tag/Tag"
import { Tag } from "../../components/tag/Tag"
import { SearchBar } from "../../../../components/searchBar/SearchBar"


type Props = {
  isAnswering: boolean;
  isCreator: boolean;
  nameAnswering: string;
  question: string;
  onButonClicked: (rating: number) => void;

}


export function RateAnswer(props: Props) {



  if (!props.isAnswering) {

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
          key: "Коммуникабельность" //messageParsed.data[j].content
  
        }
        tagsModels.push(tagModel)
      }
      setTags(tagsModels);
  
  
    }
  
    const [selectedTagsIds, setSelectedTagsIds] = useState<string[]>([]);
  
  
  
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
                <SearchBar data = {[]} onSelectedChange={()=> null}/>  {/*//////////////////////////////////////*/}



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