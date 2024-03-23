
import { useEffect, useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./userPopup.module.css"
import { Field } from "../../../profile/field/Field";
import { UserModel } from "../user/User";
import { Delete, patch, post, readServerError } from "../../../../utils/api";
import ellipse1 from "../../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../../app/assets/ellipse2.svg"
import defaultPhoto from "../../../../app/assets/defaultphoto.svg"
import { useSelector } from "react-redux";
import { selectAccess, selectToken } from "../../../../store/authSlice";



type Props = {
  closePopup: () => void;
  savedUser: UserModel;
  onChange: () => void;

}

export function UserPopup({ savedUser, closePopup }: Props) {
  var today = new Date()
  var tomorrow = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0]

  const token = useSelector(selectToken)
  const myAccess = useSelector(selectAccess)


  const [access, setAccess] = useState("")
  const [planType, setPlanType] = useState<string | undefined>("")
  const [expiryDate, setExpiryDate] = useState<string | undefined>("")


  const [planChanging, setPlanChanging] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)



  const readPlan = () => {

    if (planType == undefined)
      return ("Нет доступа")
    if (planType == "basic")
      return ("Простой")
    if (planType == "advanced")
      return ("Расширенный")
    if (planType == "premium")
      return ("Широкий")

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

  const onPlanValueChange = (value: { label: any; }) => {

    if (value.label == readPlan()) {
      // setNewPlan("")
      setPlanChanging(false)
      return;
    }
    setPlanType(getPlan(value.label))
    setPlanChanging(true)

  }


  const getErrorMessage = () => {

    if (expiryDate == undefined) {
      return ("Выберите дату истечения плана")
    }
    return null
  }
  var errorMessage = getErrorMessage()
  const changePlan = async () => {
    alert (expiryDate && new Date(expiryDate).toISOString())
    setFormSubmitted(true)
    if (errorMessage != null) {
      return;

    }
    const data = {
      expiry_date: expiryDate && new Date(expiryDate),
      plan_type: planType
    }
    try {
      var response;
      if (planType == undefined) {
        response = await Delete('plans/' + savedUser.id.toString(), token)

      } else {
        response = await post('plans/' + savedUser.id.toString(), data, token)

      }
      // setNewPlan("")
      setPlanChanging(false)
      closePopup()


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
    if (access == "user")
      newAccess = "admin"
    else
      newAccess = "user"
    const data = {
      id: savedUser.id.toString(),
      access: newAccess
    }
    try {

      const response = await patch('users/access', data, token)
      // setNewPlan("")
      setPlanChanging(false)
      closePopup()


    }
    catch (error: any) {
      readServerError(error.response.text);
      console.log("error:", error)
    }
  }


  useEffect(() => {

    setAccess(savedUser.access)
    setPlanType(savedUser.plan?.planType)
    setExpiryDate(savedUser.plan?.status == "active" ? savedUser.plan?.expiryDate : undefined)

  }, [savedUser]);




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
          <Button text={""} onClick={closePopup} className={styles.closeButton} />
        </div>
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.ellipse1}>
              <img src={ellipse1} />
            </div>
            <div className={styles.title}>
              Личные данные

            </div>
            <div className={styles.photo}>
              {(savedUser.photo == "") ? <img src={defaultPhoto} /> : <img src={savedUser.photo} />}

            </div>


          </div>
          <div className={styles.right}>
            <div className={styles.ellipse2}>
              <img src={ellipse2} />
            </div>
            <div className={styles.fields}>
              <Field small={true} isInput={true} title={"Имя пользователя"} disabled={true} value={savedUser.name + " " + savedUser.surname} />
              <Field small={true} isInput={true} title={"Электронный адрес"} disabled={true} value={savedUser.email} />
              {access != "user" ? (
                <Field small={true} isInput={true} title={"Порог доступа"} disabled={true}
                  value={access == "admin" ? "Администратор" : "Гл. Администратор"} />
              ) : (
                <Field small={true} isDropDown={true} options={planOptions} title={"Порог доступа"}
                  dropDownValue={readPlan()} onDropDownValueChange={onPlanValueChange} />
              )}


              {planType ? (

                <div className={styles.expiry}>
                  <div className={styles.text}>
                    Дата истечения
                  </div>
                  <input type="date" min={tomorrow}
                    className={styles.input} placeholder="Дата истечения" value={expiryDate}
                    onChange={(event) => { setExpiryDate(event.target.value); setPlanChanging(true) }} />
                </div>

              ) : (
                null
              )}

              {myAccess == "superadmin" ? (
                <div className={styles.makeAdmin}>

                  <Button text={access == "admin" ? "Убрать доступ администратора" : "Назначить администратором"}
                    onClick={changeAccess} className={styles.footerButton} />

                </div>

              ) : (
                null
              )}



            </div>
          </div>
        </div>

        {formSubmitted && (errorMessage) ? (
          <div className={styles.errorMessage}>
            {errorMessage}

          </div>

        ) : (
          null
        )}
        {planChanging ? (
          <Button text={"Сохранить"} onClick={changePlan} className={styles.saveButton} />

        ) : (
          null
        )}
      </div>

    </div>
  )
}