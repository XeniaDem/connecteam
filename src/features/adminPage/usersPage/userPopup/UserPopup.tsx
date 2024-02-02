
import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./userPopup.module.css"
import LockIcon from '@mui/icons-material/Lock';
import { Field } from "../../../profile/field/Field";
import { User, UserModel } from "../user/User";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { patch } from "../../../../utils/api";



type Props = {
  closePopup: () => void;
  user: UserModel;
  token: string;
  onChange: () => void;

}

export function UserPopup(props: Props) {

  const [accessChanging, setAccessChanging] = useState(false)







  const readAccess = () => {
    if (props.user.access == "user")
      return ("Нет доступа")
    if (props.user.access == "basic")
      return ("Простой")
    if (props.user.access == "advanced")
      return ("Расширенный")
    if (props.user.access == "premium")
      return ("Широкий")
    if (props.user.access == "admin")
      return ("Администратор")
  }

  const getAccess = (value: string) => {
    if (value == "Нет доступа")
      return ("user")
    if (value == "Простой")
      return ("basic")
    if (value == "Расширенный")
      return ("advanced")
    if (value == "Широкий")
      return ("premium")
    if (value == "Администратор")
      return ("admin")
  }
  const [newAccess, setNewAccess] = useState <string | undefined> ("")

  const onDropDownValueChange = (value: { label: any; }) => {

    if (value.label == readAccess()) {
      setNewAccess("")
      setAccessChanging(false)
      return;
    }
    setNewAccess(getAccess(value.label))
    setAccessChanging(true)

  }

  const readChangeError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message


    alert(content);

  }

  const changeAccess = async () => {
    alert("id" + props.user.id + " new access " + newAccess)
  
    const data = {
      id: props.user.id.toString(),
      access: newAccess
    }
    try {

      const response = await patch('users/change-access', data, props.token)
      alert(response.text)
      setNewAccess("")
      setAccessChanging(false)
      props.onChange()
      props.closePopup()


    }
    catch (error: any) {
      readChangeError(error.response.text);
      // alert(error.text)
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
                <Field small={true} isInput={true} title={"Имя пользователя"} disabled={true} value={props.user.name + " " + props.user.surname} />
                <Field small={true} isInput={true} title={"Электронный адрес"} disabled={true} value={props.user.email} />
                <Field small={true} isDropDown={true} title={"Порог доступа"} dropDownValue={readAccess()} onDropDownValueChange={onDropDownValueChange} />


              </div>
            </div>






          </div>

          {accessChanging ? (
            <Button text={"Сохранить"} onClick={changeAccess} className={styles.saveButton} />

          ) : (
            null
          )}










        </div>

      </div>
    </div >
  )
}