import styles from "./LastGames.module.css"
import { Tab, Tabs } from "./tabs/Tabs";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';



type Props = {
  id: string;
  userId: string;
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
      <div className={styles.container} id={props.id}>
        <div className={styles.title}>
          Последние игры
        </div>
        <div className={styles.subtitle}>
          Кликните на кнопку <span> <KeyboardArrowRightIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> </span> чтобы посмотреть состояние игры
        </div>
        <Tabs tabs={tabs} userId={props.userId}/>
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