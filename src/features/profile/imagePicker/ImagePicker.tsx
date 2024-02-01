
import { Field } from "../field/Field"
import styles from "./ImagePicker.module.css"
import defaultPhoto from "../photo.svg"
import ellipse2 from "../ellipse2.svg"
import { Button } from "../../../components/button/Button"
import React, { useEffect, useState } from "react"

import { useFilePicker } from 'use-file-picker';
import { FilePicker } from "./FilePicker"


type Props = {

}


export function ImagePicker() {

  const [photo, setPhoto] = useState("")




  useEffect(() => {




  }, []);

  return (
    <div>

      <div className={styles.container}>

        <div className={styles.photo}>
          <img src={photo == "" ? defaultPhoto : photo} />

        </div>



        <Button text={"Сменить логотип компании"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.footerButton} />

        <FilePicker/>





      </div>
    </div>
  )
}