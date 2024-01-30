
import { Field } from "../field/Field"
import styles from "./CompanyInfo.module.css"
import defaultPhoto from "../photo.svg"
import ellipse2 from "../ellipse2.svg"
import { Button } from "../../../components/button/Button"
import React, { useEffect, useState } from "react"
import disableScroll from 'disable-scroll';
import { patch } from "../../../utils/api"

export type Company = {
  name: string;
  website: string;
  about: string;
  photo: string;

}

type Props = {
  token: string;
  savedCompany: Company;

}


export function CompanyInfo({ savedCompany, token }: Props) {



  const [name, setName] = useState<undefined | string>('');
  const [website, setWebsite] = useState<undefined | string>('');
  const [about, setAbout] = useState<undefined | string>('');
  const [photo, setPhoto] = useState("");

  const [isDataChanging, setIsDataChanging] = React.useState(false);

  const handleDataChange = () => {
    if (!isDataChanging) {
      setIsDataChanging(!isDataChanging);
    }

    if (isDataChanging) {

      if ((savedCompany.name != name) || (savedCompany.website != website) || (savedCompany.about != about)) {
        alert("datachange")
        changeCompanyInfo()
      }
      else {
        setIsDataChanging(!isDataChanging);
        alert("Ничего не сохраняем")
      }
    }
  };


  const readInfoChangeError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message
    alert(content)
    // if (content.includes("Wrong verification code")) {
    //   return ("Введенный код неверен. Пожалуйста, попробуйте еще раз.")

    // }

    return content;

  }

  const changeCompanyInfo = async () => { //меняет данные компании

    const data = {
      "company_name": name,
      "company_info": about,
      "company_url": website
    }
    try {

      const response = await patch('users/company', data, token)

      alert(response.text)
      setIsDataChanging(!isDataChanging);

    }
    catch (error: any) {
      readInfoChangeError(error.response.text);
      console.log("error:", error)
    }


  }









  useEffect(() => {

    disableScroll.off();
    setName(savedCompany.name)
    setWebsite(savedCompany.website)
    setAbout(savedCompany.about)
    setPhoto(savedCompany.photo)

  }, [savedCompany]);



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
            <img src={photo == "" ? defaultPhoto : photo} />
          </div>
          <Button text={"Сменить логотип компании"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.footerButton} />

        </div>


        <div className={styles.right}>

          <Field  isInput = {true} title={"Название компании"} disabled={!isDataChanging} value = {name} onValueChange={setName}/>
          <Field  isInput = {true} title={"Веб-сайт компании"} disabled={!isDataChanging} value = {website} onValueChange={setWebsite}/>
          <Field  isInput = {false} title={"О компании"} placeholder="Напишите что-нибудь..." disabled={!isDataChanging} value = {about} onValueChange={setAbout}/>

          <div className={styles.footerButtons}>

          <Button text = {!isDataChanging ? "Редактировать данные" : "Сохранить"} onClick={handleDataChange} className={styles.footerButton} />

          </div>

        </div>
      </div>
    </div>
  )
}