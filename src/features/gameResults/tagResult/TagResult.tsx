import styles from "./TagResult.module.css"
import { ResultModel } from "../result/Result";


type Props = {
  savedResult: ResultModel;


}



export function TagResult({ savedResult }: Props) {

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {savedResult.isYou ? (
          <div className={styles.container}>
            <div className={styles.nameYou}>
              Вы
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.name}>
              {savedResult.name}
            </div>
          </div>
        )
        }


      </div>

      {savedResult.tags.map(tag =>
        <div className={styles.tag}>
          <div className={styles.text}>
            {tag.key}
          </div>
        </div>
      )}
    </div>





  )
}



