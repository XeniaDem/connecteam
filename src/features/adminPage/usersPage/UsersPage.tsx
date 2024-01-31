
import { Header } from "../../header/Header"
import styles from "./UsersPage.module.css"
import icon from "./icon.svg"
import users from "./users.svg"
import questions from "./questions.svg"
import { useEffect, useState } from "react"
import { User } from "./user/User"


type Props = {



}



export function UsersPage() {

  // useEffect(() => {

  //   readAccess()

  // }, []);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header adminHeader={true} />
      </div>
      <div className={styles.title}>
        Список пользователей
      </div>
      <div className={styles.users}>
        <User />
        <div className={styles.divider}/>


      </div>
    </div>
  )
}



