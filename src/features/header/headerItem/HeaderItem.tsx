
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button"
import styles from "./HeaderItem.module.css"
import logo from "./logo.svg"
import person from "./person.svg"
import {Ref, useRef} from 'react';


type Props = {
  text: string;
  onClick?: () => void;


}
export function HeaderItem(props: Props) {

  const navigate = useNavigate()

  // const handleClick = () => {
  //   props.ref.current?.scrollIntoView({behavior: 'smooth'});
  // };


  return (
    <div className={styles.headerItem} onClick={props.onClick}>

      {props.text}



    </div>
  )
}
