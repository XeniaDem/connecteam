
import { Field } from "../field/Field"
import styles from "./UserInfo.module.css"
import photo from "../photo.svg"
import ellipse1 from "../ellipse1.svg"
import { Button } from "../../../components/button/Button"




export function UserInfo() {


  return (
    <div>

      <div className={styles.container}>
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
          <Field text={"Имя и Фамилия"} />
          <Field text={"Электронный адрес"} />
          <Field text={"О себе"} />

          <div className={styles.footerButtons}>

            <Button text={"Редактировать данные"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.footerButton} />
            <Button text={"Сменить пароль"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.footerButton} />
          </div>

        </div>
      </div>
    </div>
  )
}