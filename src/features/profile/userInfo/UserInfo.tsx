
import { Field } from "../field/Field"
import styles from "./UserInfo.module.css"
import photo from "../photo.svg"
import ellipse1 from "../ellipse1.svg"
import { Button } from "../../../components/button/Button"
import React, { useState } from "react"
import { ChangePasswordPopup } from "./changePasswordPopup/ChangePasswordPopup"




export function UserInfo() {


  const [disabled, setDisabled] = React.useState(true);

  const handleChange = () => {
    if (!disabled) {
      alert("Сохранение на сервере, email: " + email)
    }
    setDisabled(!disabled);



  };


  const [name, setName] = useState<undefined | string>('');
  const [surname, setSurname] = useState<undefined | string>('');
  const [email, setEmail] = useState<undefined | string>('');
  const [about, setAbout] = useState<undefined | string>('');


  const [open, setOpen] = useState(false);


  return (
    <div>

      <div className={!open? styles.container : styles.containerDisabled}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>

        <div className={styles.left}>
          <div className={styles.title}>
            Личные данные
          </div>
          <div className={styles.photo}>
            <img src={photo} />
          </div>
          <Button text={"Сменить фотографию профиля"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.footerButton} />



        </div>


        <div className={styles.right}>
          <div className={styles.settingsContainer}>
            <Button text={"Расширенные настройки  <"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.settingsButton} />
          </div>
          <Field isInput={true} title={"Имя"} disabled={disabled} value={name} onValueChange={setName} />
          <Field isInput={true} title={"Фамилия"} disabled={disabled} value={surname} onValueChange={setSurname} />
          <Field isInput={true} title={"Электронный адрес"} disabled={disabled} value={email} onValueChange={setEmail} />
          <Field isInput={false} title={"О себе"} placeholder="Напишите что-нибудь..." disabled={disabled} value={about} onValueChange={setAbout} />






          <div className={styles.footerButtons}>

            <Button text={disabled ? "Редактировать данные" : "Сохранить"} onClick={handleChange} className={styles.footerButton} />




            <Button text={"Сменить пароль"} onClick={() => setOpen(true)
            } className={styles.footerButton} />

            
          </div>

        </div>
      </div>
      {open ? <ChangePasswordPopup closePopup={() => setOpen(false)} /> : null}
    </div>
  )
}