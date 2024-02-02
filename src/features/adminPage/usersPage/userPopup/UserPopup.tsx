
import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./userPopup.module.css"
import LockIcon from '@mui/icons-material/Lock';
import { Field } from "../../../profile/field/Field";
import { User, UserModel } from "../user/User";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';



type Props = {
  closePopup: () => void;
  user: UserModel;

}

export function UserPopup(props: Props) {




  const [showPassword, setShowPassword] = useState(false);




  const getAccess = () => {
    if (props.user.access == "user")
      return ("Нет доступа")
    if (props.user.access == "bacis")
      return ("Простой")
    if (props.user.access == "advanced")
      return ("Расширенный")
    if (props.user.access == "premium")
      return ("Широкий")
  }



  return (

    <div>

      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.close}>
            <Button text={""} onClick={props.closePopup} className={styles.closeButton} />
          </div>



          <div className={styles.left}>
            <div className={styles.title}>
              Личные данные

            </div>
            <div className={styles.photo}>
              {(props.user.photo == "") ? <PhotoCameraIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> : <img src={props.user.photo} />}

            </div>


          </div>
          <div className={styles.right}>
            <div className={styles.fields}>
              <Field small={true} isInput={true} title={"Имя пользователя"} disabled={true} value={props.user.name} />
              <Field small={true} isInput={true} title={"Электронный адрес"} disabled={true} value={props.user.email} />
              <Field small={true} isInput={true} title={"Порог доступа"} disabled={true} value={getAccess()} />
              <Button text={true ? "Сменить порог доступа" : "Сохранить"} onClick={() => null} className={styles.footerButton} />
            </div>






          </div>








        </div>
      </div>
    </div>
  )
}