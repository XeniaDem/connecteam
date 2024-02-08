
import { useEffect, useState } from "react";
import { Button } from "../../../components/button/Button"
import styles from "./ChoosePackagePopup.module.css"
import LockIcon from '@mui/icons-material/Lock';


import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { patch, post } from "../../../utils/api";
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import defaultPhoto from "./photo.svg"
import { Field } from "../../profile/field/Field";
import { useSelector } from "react-redux";
import { selectToken } from "../../auth/authSlice";



type Props = {
  closePopup: () => void;
  onChange: () => void;
  planType: string | undefined;

}

export function ChoosePackagePopup(props: Props) {




  const token = useSelector(selectToken)


  const onDropDownValueChange = (value: { label: any; }) => {

    // if (value.label == readAccess()) {
    //   setNewAccess("")
    //   setAccessChanging(false)
    //   return;
    // }
    // setNewAccess(getAccess(value.label))
    // setAccessChanging(true)

  }

  const readAccess = () => {
    if (props.planType == "user")
      return ("Нет доступа")
    if (props.planType == "basic")
      return ("Простой")
    if (props.planType == "advanced")
      return ("Расширенный")
    if (props.planType == "premium")
      return ("Широкий")
    if (props.planType == "admin")
      return ("Администратор")
  }


  const readSendError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message


    alert(content);

  }

  const sendRequest = async () => {

    const data = {
      duration: 30,
      plan_type: props.planType

    }
    try {

      const response = await post('plans/purchase', data, token)

      props.onChange()
      props.closePopup()


    }
    catch (error: any) {
      readSendError(error.response.text);
      // alert(error.text)
      console.log("error:", error)
    }
  }


  const periodOptions = [
    '14 дней', '1 месяц', '2 месяца'
  ];


  
  useEffect(() => {


  }, []);



  return (



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
            Вы выбрали пакет

          </div>
          <div className={styles.name}>
            {readAccess()}

          </div>
          <div className={styles.subtitle}>
            Выберите период доступа

          </div>


          <div className={styles.fields}>




            <Field small={true} isDropDown={true} options={periodOptions} title={""} dropDownValue={periodOptions[0]} onDropDownValueChange={(() => null)} />






          </div>






        </div>


        <Button text={"Отправить запрос"} onClick={sendRequest} className={styles.saveButton} />










      </div>

    </div>
  )
}