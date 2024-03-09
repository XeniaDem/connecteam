import styles from "./Question.module.css"

type Props = {
  text: string;
  nameAnswering: string;


}

Question.defaultProps = { text: "Что вас больше всего вдохновляет в жизни?", nameAnswering: "Ирина" }

export function Question(props: Props) {
  return (
    <div>
      <div className={styles.container}>

        <div className={styles.text}>
          {props.text}
        </div>

        <div className={styles.answering}>
          Отвечает: {" "}
          <span>
            {props.nameAnswering}
          </span>

        </div>
      </div>
    </div>
  )
}