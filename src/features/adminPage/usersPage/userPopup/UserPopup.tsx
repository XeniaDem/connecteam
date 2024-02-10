
import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./userPopup.module.css"
import LockIcon from '@mui/icons-material/Lock';
import { Field } from "../../../profile/field/Field";
import { User, UserModel } from "../user/User";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Delete, patch, post } from "../../../../utils/api";
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import defaultPhoto from "./photo.svg"
import { duration } from "@mui/material";



type Props = {
  closePopup: () => void;
  user: UserModel;
  token: string;
  onChange: () => void;
  myAccess: string;

}

export function UserPopup(props: Props) {

  const [planChanging, setPlanChanging] = useState(false)







  const readAccess = () => {
    if (props.user.access == "user") {
      if (props.user.plan == undefined)
        return ("Нет доступа")
      if (props.user.plan?.planType == "basic")
        return ("Простой")
      if (props.user.plan?.planType == "advanced")
        return ("Расширенный")
      if (props.user.plan?.planType == "premium")
        return ("Широкий")
    }
    // } else if (props.user.access == "admin")
    //   return ("Администратор")
  }

  const getPlan = (value: string) => {
    if (value == "Нет доступа")
      return (undefined)
    if (value == "Простой")
      return ("basic")
    if (value == "Расширенный")
      return ("advanced")
    if (value == "Широкий")
      return ("premium")
  }
  const [newPlan, setNewPlan] = useState<string | undefined>("")

  const onPlanValueChange = (value: { label: any; }) => {

    if (value.label == readAccess()) {
      setNewPlan("")
      setPlanChanging(false)
      return;
    }
    setNewPlan(getPlan(value.label))
    setPlanChanging(true)

  }

  const onPeriodChange = (value: { label: any; }) => {

    if (value.label == "14 дней") {
      setPeriod(14)
    }
    if (value.label == "30 дней") {
      setPeriod(30)
    }


  }

  const [period, setPeriod] = useState(14)

  const readChangeError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message


    alert(content);

  }

  const changePlan = async () => {
    const data = {
      duration: period,
      plan_type: newPlan
    }
    try {
      var response;
      if (newPlan == undefined) {
        response = await Delete('plans/' + props.user.id.toString(), props.token)

      } else {
        response = await post('plans/' + props.user.id.toString(), data, props.token)

      }
      setNewPlan("")
      setPlanChanging(false)
      props.closePopup()


    }
    catch (error: any) {
      readChangeError(error.response.text);
      console.log("error:", error)
    }
  }


  const planOptions = [
    'Нет доступа', 'Простой', 'Расширенный', 'Широкий'
  ];

  const periodOptions = [
    '14 дней', '30 дней'
  ];

  const changeAccess = async () => {
    var newAccess;
    if (props.user.access == "user")
      newAccess = "admin"
    else 
      newAccess = "user"
    const data = {
      id: props.user.id.toString(),
      access: newAccess
    }
    try {

      const response = await patch('users/access', data, props.token)
      setNewPlan("")
      setPlanChanging(false)
      // props.onChange()
      props.closePopup()


    }
    catch (error: any) {
      readChangeError(error.response.text);
      // alert(error.text)
      console.log("error:", error)
    }
  }






  return (



    <div className={styles.background}>
      <div className={styles.container}>


        <div className={styles.close}>
          <Button text={""} onClick={props.closePopup} className={styles.closeButton} />
        </div>



        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.ellipse2}>
              <img src={ellipse2} />
            </div>
            <div className={styles.title}>
              Личные данные

            </div>
            <div className={styles.photo}>
              {(props.user.photo == "") ? <img src={defaultPhoto} /> : <img src={props.user.photo} />}

            </div>


          </div>
          <div className={styles.right}>
            <div className={styles.ellipse1}>
              <img src={ellipse1} />
            </div>
            <div className={styles.fields}>
              <Field small={true} isInput={true} title={"Имя пользователя"} disabled={true} value={props.user.name + " " + props.user.surname} />
              <Field small={true} isInput={true} title={"Электронный адрес"} disabled={true} value={props.user.email} />
              {props.user.access == "admin" ? (
                <Field small={true} isInput={true} title={"Порог доступа"} disabled={true} value="Администратор" />
              ) : (
                <Field small={true} isDropDown={true} options={planOptions} title={"Порог доступа"}
                  dropDownValue={readAccess()} onDropDownValueChange={onPlanValueChange} />
              )}


              {planChanging && newPlan != undefined ? (
                <Field small={true} isDropDown={true} options={periodOptions} title={"Период доступа"}
                  dropDownValue={periodOptions[0]} onDropDownValueChange={onPeriodChange} />

              ) : (
                null
              )}
              {props.myAccess == "superadmin" ? (
                <div className={styles.makeAdmin}>

                  <Button text={props.user.access == "admin" ? "Убрать доступ администратора" : "Назначить администратором"}
                    onClick={changeAccess} className={styles.footerButton} />

                </div>

              ) : (
                null
              )}




            </div>
          </div>






        </div>

        {planChanging ? (
          <Button text={"Сохранить"} onClick={changePlan} className={styles.saveButton} />

        ) : (
          null
        )}










      </div>

    </div>
  )
}