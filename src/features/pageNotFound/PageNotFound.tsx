
import styles from "./PageNotFound.module.css"
import padlock from "../../../../app/assets/padlock.svg"
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"

import { useLocation, useNavigate } from "react-router-dom"
import {isMobile} from 'react-device-detect';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectToken } from "../../store/authSlice"
import { Button } from "../../components/button/Button"


export function PageNotFound() {
  const token = useSelector(selectToken)
  const navigate = useNavigate()


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>
        <div className={styles.notFound}>
          404

        </div>
        
        <div className={styles.title}>
          Вы попали на несуществующую страницу

        </div>
        <div className={styles.text}>
          
        </div>

        <Button text={"На главную"} onClick={() => {
          navigate(token == "" ? "/" : "/user_page") 
        }} className={styles.button} />
      </div>
    </div>
  )
}