import styles from "./Question.module.css"

type Props = {
  text: string;
  nameAnswering: string;


}

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