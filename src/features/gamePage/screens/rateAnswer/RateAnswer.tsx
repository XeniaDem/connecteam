
import styles from "./RateAnswer.module.css"
import dots from "../dots.svg"
import { Button } from "../../../../components/button/Button"
import { StarRating } from "./starRating/StarRating"
import { useState } from "react"
import { Question } from "../../components/question/Question"


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
    return (
      <div>
        <div className={styles.container}>

          <div className={styles.content}>
            <div className={styles.question}>
              <Question nameAnswering={props.nameAnswering} text = {props.question}/>

              <div className={styles.stars}>
                <StarRating onRatingSet={set}/>
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