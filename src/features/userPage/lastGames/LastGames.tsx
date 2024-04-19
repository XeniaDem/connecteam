
import { useSelector } from "react-redux";
import { Button } from "../../../components/button/Button"
import styles from "./LastGames.module.css"
import { selectToken } from "../../../store/authSlice";
import { Tab, Tabs } from "./tabs/Tabs";
import { Game, GameModel } from "./game/Game";
import { get, readServerError } from "../../../utils/api";
import { useEffect, useState } from "react";



type Props = {
  id: string;
}


export function LastGames(props: Props) {



  const tabs: Tab[] = [
    {
      tabName: "Мои",

    },
    {
      tabName: "Участвую",

    }
  ];
  return (
    <div>
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#55C6F7" />
          <stop offset={1} stopColor="#2AF8BA" />
        </linearGradient>
      </svg>
      <div className={styles.container} id={props.id} >
        <div className={styles.title}>
          Последние игры
        </div>
        <div className={styles.subtitle}>
          Кликните на игру, чтобы посмотреть ее состояние
        </div>
        <Tabs tabs={tabs} />
        {/* <div className={styles.filtration}>
          <Button text={""} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.filterButton} />


          <div className={styles.filterText}>
            Фильтрация по играм
          </div>




        </div> */}


      </div>
    </div>
  )
}