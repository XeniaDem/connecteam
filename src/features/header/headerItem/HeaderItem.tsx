import styles from "./HeaderItem.module.css"

type Props = {
  text: string;
  link?: string;
  onClick?: () => void;
  selected?: boolean;
}
export function HeaderItem(props: Props) {

  return (
    <a className={!props.selected ? styles.headerItem : styles.headerItemSelected}
      href={props.link} onClick={props.onClick } >

      {props.text}

    </a>
  )
}
