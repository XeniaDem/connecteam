import styles from "./Tag.module.css"
import { TagModel } from "../../../adminPage/questionsPage/question/tagsPopup/tag/Tag";

type Props = {
  savedTag: TagModel;
  selected: boolean;
  onTagClicked: (selected: boolean) => void;
}



export function Tag({ savedTag, selected, onTagClicked }: Props) {

  const handleChange = () => {
    onTagClicked(!selected);
  };

  return (
    <div className={selected ? styles.selected : styles.container} onClick={handleChange}>
      <div className={styles.text}>
        {savedTag.key}
      </div>
    </div>
  )
}



