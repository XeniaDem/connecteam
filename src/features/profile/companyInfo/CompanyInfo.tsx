
import { Field } from "../field/Field"
import styles from "./CompanyInfo.module.css"
import photo from "../photo.svg"
import ellipse2 from "../ellipse2.svg"
import { Button } from "../../../components/button/Button"
import React, { useState } from "react"



export function CompanyInfo() {


  const [disabled, setDisabled] = React.useState(true);

  const handleChange = () => {
    setDisabled(!disabled);
  };

  const [name, setName] = useState<undefined | string>('');
  const [website, setWebsite] = useState<undefined | string>('');
  const [about, setAbout] = useState<undefined | string>('');


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

          <Field  isInput = {true} title={"Название компании"} disabled = {disabled} value = {name} onValueChange={setName}/>
          <Field  isInput = {true} title={"Веб-сайт компании"} disabled = {disabled} value = {website} onValueChange={setWebsite}/>
          <Field  isInput = {false} title={"О компании"} placeholder="Напишите что-нибудь..." disabled = {disabled} value = {about} onValueChange={setAbout}/>

          <div className={styles.footerButtons}>

          <Button text = {disabled ? "Редактировать данные" : "Сохранить"} onClick={handleChange} className={styles.footerButton} />

          </div>

        </div>
      </div>
    </div>
  )
}