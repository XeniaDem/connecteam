import { Button } from "../../../components/button/Button"
import styles from "./RemoveUserPopup.module.css"
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../app/assets/ellipse2.svg"
import { PlanUserModel } from "../planUser/PlanUser";
import {isMobile} from 'react-device-detect';
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/authSlice";
import { Delete, readServerError } from "../../../utils/api";



type Props = {
  closePopup: () => void;
  planUser: PlanUserModel;
  token: string;
  onChange: () => void;

}

export function RemoveUserPopup(props: Props) {
  const token = useSelector(selectToken)


  const removePlanUser = async () => {
    try {
      const response = await Delete ('plans/' + props.planUser.id, token)
      props.closePopup()

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


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
              <Button text={"Да"} onClick={removePlanUser} className={styles.okButton} />
              <Button text={"Отмена"} onClick={props.closePopup} className={styles.cancelButton} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}