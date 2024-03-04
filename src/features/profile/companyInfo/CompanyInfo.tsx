
import { Field } from "../field/Field"
import styles from "./CompanyInfo.module.css"
import defaultPhoto from "../photo.svg"
import ellipse2 from "../ellipse2.svg"
import { Button } from "../../../components/button/Button"
import React, { useEffect, useRef, useState } from "react"
import disableScroll from 'disable-scroll';
import { patch, readServerError } from "../../../utils/api"
import { ImagePicker } from "../imagePicker/ImagePicker"
import {isMobile} from 'react-device-detect';
import { useIsSmall } from "../../../app/hooks/useIsSmall"

export type Company = {
  name: string;
  website: string;
  about: string;
  photo: string;

}

type Props = {
  token: string;
  savedCompany: Company;
  onChange: () => void;

}


export function CompanyInfo({ savedCompany, token, onChange }: Props) {

  const isSmall = useIsSmall(821)

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



  const changeCompanyInfo = async () => { //меняет данные компании

    const data = {
      "company_name": name,
      "company_info": about,
      "company_url": website
    }
    try {

      const response = await patch('users/company', data, token)
      setIsDataChanging(!isDataChanging);
      onChange()

    }
    catch (error: any) {
      readServerError(error.response.text);
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
        {!isMobile && !isSmall && <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>}

        {!isMobile && <div className={styles.left}>
          <div className={styles.title}>
            Компания
          </div>
          <ImagePicker isUser={false} />

        </div>}


        <div className={styles.right}>
          {isMobile && <div>
            <div className={styles.title}>
              Компания
            </div>
            <ImagePicker isUser={false} />

          </div>}

          <Field isInput={true} title={"Название компании"} placeholder="Название" disabled={!isDataChanging} value={name} onValueChange={setName} />
          <Field isInput={true} title={"Веб-сайт компании"} placeholder="Веб-сайт" disabled={!isDataChanging} value={website} onValueChange={setWebsite} />
          <Field isTextArea={true} title={"О компании"} placeholder="Напишите что-нибудь..." disabled={!isDataChanging} value={about} onValueChange={setAbout} />

          <div className={styles.footerButtons}>

            <Button text={!isDataChanging ? "Редактировать данные" : "Сохранить"} onClick={handleDataChange} className={styles.footerButton} />

          </div>

        </div>
      </div>
    </div>
  )
}