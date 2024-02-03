
import { Header } from "../header/Header"
import styles from "./AdminPage.module.css"
import icon from "./icon.svg"
import users from "./users.svg"
import questions from "./questions.svg"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


type Props = {



}



export function AdminPage() {
  const navigate = useNavigate()

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

      <div className={styles.section} onClick={() => navigate("/users_page")}>
        <div className={styles.subtitle}>
          Вопросы
        </div>
        <img src={questions} />
      </div>

      <div className={styles.section} onClick={() => navigate("/questions_page")}>
      <div className={styles.subtitle}>
          Пользователи
        </div>
        <img src={users} />

      </div>
      <div className={styles.section} onClick={() => navigate("/requests_page")}>
      <div className={styles.subtitle}>
          Запросы на пакет
        </div>
        <img src={users} />

      </div>


    </div>
  )
}



