
import { useState } from "react";
import { Button } from "../../../../../components/button/Button"
import styles from "./NewTopicPopup.module.css"
import LockIcon from '@mui/icons-material/Lock';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import defaultPhoto from "./photo.svg"
import { TopicModel } from "../../topic/Topic";



type Props = {
  closePopup: () => void;
  token: string;
  onChange: () => void;

  topic: TopicModel;

}

export function NewTopicPopup(props: Props) {






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
              Добавить тему

            </div>
            <div className={styles.subtitle}>
              Задайте тему

            </div>






          </div>

          <Button text={"Сохранить"} onClick={() => null} className={styles.saveButton} />







        </div>

      </div>
    </div >
  )
}