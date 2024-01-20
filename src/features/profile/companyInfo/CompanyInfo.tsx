
import { Field } from "../field/Field"
import styles from "./CompanyInfo.module.css"
import photo from "../photo.svg"
import ellipse2 from "../ellipse2.svg"
import { Button } from "../../../components/button/Button"



export function CompanyInfo() {


  return (
    <div>

      <div className={styles.container}>
      <div className={styles.ellipse2}>
            <img src={ellipse2} />
          </div>

        <div className={styles.left}>
          <div className={styles.title}>
            Компания
          </div>
          <div className={styles.photo}>
            <img src={photo} />
          </div>
          <Button text={"Сменить логотип компании"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.footerButton} />



        </div>


        <div className={styles.right}>

          <Field text={"Название компании"} />
          <Field text={"Веб-сайт компании"} />
          <Field text={"О компании"} />

          <div className={styles.footerButtons}>

            <Button text={"Редактировать данные"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.footerButton} />

          </div>

        </div>
      </div>
    </div>
  )
}