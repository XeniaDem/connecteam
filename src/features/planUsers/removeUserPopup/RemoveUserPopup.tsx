
import { useState } from "react";
import { Button } from "../../../components/button/Button"
import styles from "./RemoveUserPopup.module.css"
import LockIcon from '@mui/icons-material/Lock';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import defaultPhoto from "./photo.svg"
import { PlanUserModel } from "../planUser/PlanUser";



type Props = {
  closePopup: () => void;
  planUser: PlanUserModel;
  token: string;
  onChange: () => void;

}

export function RemoveUserPopup(props: Props) {









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

            <div className={styles.text}>
              Вы точно хотите удалить пользователя <br /> {props.planUser.name} из участников плана?
            </div>



            <div className={styles.buttons}>
              <Button text={"Да"} onClick={() => null} className={styles.okButton} />
              <Button text={"Отмена"} onClick={props.closePopup} className={styles.cancelButton} />
            </div>









          </div>

        </div>

      </div>
    </div >
  )
}