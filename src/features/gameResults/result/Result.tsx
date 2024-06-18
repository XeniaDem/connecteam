import { TagModel } from "../../adminPage/questionsPage/question/tagsPopup/tag/Tag";
import styles from "./Result.module.css"
import { isMobile } from "react-device-detect";

export type ResultModel = {
  id: string;
  isCreator: boolean;
  isYou: boolean;
  name: string;
  photoUrl: string;
  result: number;
  tags: TagModel[];
}

type Props = {
  savedResult: ResultModel;
}


export function Result({ savedResult }: Props) {

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.rectangle} style={{ height: (!isMobile ? savedResult.result * 4 : savedResult.result * 2) }}>
          {savedResult.result}
        </div>
        {savedResult.isYou ? (
          <div className={styles.nameYou}>
            Вы
          </div>
        ) : (
          <div className={styles.name}>
            {savedResult.name}
          </div>
        )
        }
      </div>
    </div>
  )
}