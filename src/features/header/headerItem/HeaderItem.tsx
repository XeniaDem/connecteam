
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button"
import styles from "./HeaderItem.module.css"
import logo from "./logo.svg"
import person from "./person.svg"
import {Ref, useRef} from 'react';


type Props = {
  text: string;
  link?: string;
  


}
export function HeaderItem(props: Props) {

  const navigate = useNavigate()

  // const handleClick = () => {
  //   props.ref.current?.scrollIntoView({behavior: 'smooth'});
  // };


  return (
    <a className={styles.headerItem} href={props.link}>

      {props.text}



    </a>
  )
}
