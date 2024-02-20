
import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./userPopup.module.css"
import { Field } from "../../../profile/field/Field";
import { User, UserModel } from "../user/User";
import { Delete, patch, post, readServerError } from "../../../../utils/api";
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import defaultPhoto from "./photo.svg"



type Props = {
  closePopup: () => void;
  user: UserModel;
  token: string;
  onChange: () => void;
  myAccess: string;

}

export function UserPopup(props: Props) {

  const [planChanging, setPlanChanging] = useState(false)


  var today = new Date();
  var tomorrow = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0]

  const [expiryDate, setExpiryDate] = useState(tomorrow);







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


  const changePlan = async () => {

    const data = {
      expiry_date: new Date(expiryDate),
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
      readServerError(error.response.text);
      console.log("error:", error)
    }
  }


  const planOptions = [
    'Нет доступа', 'Простой', 'Расширенный', 'Широкий'
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
      props.closePopup()


    }
    catch (error: any) {
      readServerError(error.response.text);
      console.log("error:", error)
    }
  }




  // const getDuration = () => {
  //   // const today = new Date().toISOString().split('T')[0]
  //   let today = new Date()
  //   let expiry = new Date(expiryDate)

  //   let timeDuration =
  //     expiry.getTime() - today.getTime();

  //   // Calculating the no. of days between
  //   // two dates
  //   let daysDuration =
  //     Math.round
  //       (timeDuration / (1000 * 3600 * 24));

  //   return (daysDuration)

  // }





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
                // <Field small={true} isDropDown={true} options={periodOptions} title={"Период доступа"}
                //   dropDownValue={periodOptions[0]} onDropDownValueChange={onPeriodChange} />
                <div className={styles.expiry}>
                  <div className={styles.text}>
                    Дата истечения
                  </div>
                  <input type="date" min={tomorrow}
                    className={styles.input} placeholder="Дата игры" value={expiryDate} onChange={(event) => { setExpiryDate(event.target.value) }} />
                </div>

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