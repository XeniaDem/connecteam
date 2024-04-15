import styles from "./Tag.module.css"
import { useEffect, useState } from "react"
import { Button } from "../../../../components/button/Button";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Delete, patch, readServerError } from "../../../../utils/api";
import { useSelector } from "react-redux";

import disableScroll from 'disable-scroll';
import { TagModel } from "../../../adminPage/questionsPage/question/tagsPopup/tag/Tag";



// export type TagModel = {
//   text: string;
//   id: number;

// }

type Props = {
  savedTag: TagModel;
  selected: boolean;
  onTagClicked: (selected: boolean) => void;


}



export function Tag({ savedTag, selected, onTagClicked }: Props) {



  const handleChange = () => {
    onTagClicked(!selected);
    
  };

  return (
    <div className={selected ? styles.selected : styles.container} onClick={handleChange}>
      <div className={styles.text}>
        {savedTag.text}
      </div>
    </div>


  )
}



