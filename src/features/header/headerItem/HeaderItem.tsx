
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button"
import styles from "./HeaderItem.module.css"
import logo from "./logo.svg"
import person from "./person.svg"
import { Ref, useRef, useState } from 'react';


type Props = {
  text: string;
  link?: string;
  onClick?: () => void;
  onSelectedChange?: (newValue: boolean) => void;

  selected?: boolean;



}
export function HeaderItem(props: Props) {

  const navigate = useNavigate()

  // const handleClick = () => {
  //   props.ref.current?.scrollIntoView({behavior: 'smooth'});
  // };


  return (
    <a className={!props.selected ? styles.headerItem : styles.headerItemSelected}
      href={props.link} onClick={props.onClick} >

      {props.text}



    </a>
  )
}
