
import { Header } from "../header/Header"
import styles from "./AdminPage.module.css"
import icon from "./icon.svg"
import users from "./users.svg"
import questions from "./questions.svg"
import { useEffect, useState } from "react"


type Props = {



}



export function AdminPage() {

  // useEffect(() => {

  //   readAccess()

  // }, []);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header adminHeader={true} />
      </div>
      <div className={styles.icon}>
        <img src={icon} />
      </div>
      <div className={styles.title}>
        Приветствуем Вас на <br /> странице администратора!
      </div>

      <div className={styles.section}>
        <div className={styles.subtitle}>
          Вопросы
        </div>
        <img src={questions} />
      </div>

      <div className={styles.section}>
      <div className={styles.subtitle}>
          Пользователи
        </div>
        <img src={users} />

      </div>


    </div>
  )
}



