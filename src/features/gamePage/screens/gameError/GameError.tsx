
import { useNavigate } from "react-router";
import { Button } from "../../../../components/button/Button";
import styles from "./GameError.module.css"

type Props = {
  error: string;
  clearData: () => void;
}

export function GameError(props: Props) {
  const navigate = useNavigate()
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          {props.error}
        </div>
        <Button text={"Назад"} onClick={() => { navigate("/user_page"); props.clearData() }} className={styles.backButton} />
      </div>

    </div>
  )
}