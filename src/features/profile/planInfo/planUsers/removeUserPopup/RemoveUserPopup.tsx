import { Button } from "../../../../../components/button/Button"
import styles from "./RemoveUserPopup.module.css"
import { PlanUserModel } from "../planUser/PlanUser";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../../store/authSlice";
import { Delete, readServerError } from "../../../../../utils/api";



type Props = {
  closePopup: () => void;
  planUser: PlanUserModel;
  planId: string;
  onChange: () => void;

}

export function RemoveUserPopup(props: Props) {
  const token = useSelector(selectToken)
  const removePlanUser = async () => {
    try {
      const response = await Delete ('plans/' + props.planId + '/members/'+ props.planUser.id, token)
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

            <div className={styles.text}>
              Вы точно хотите удалить пользователя <br /> <span className={styles.name}> {props.planUser.name} </span> из участников плана?
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