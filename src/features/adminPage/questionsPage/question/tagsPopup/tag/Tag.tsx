import styles from "./Tag.module.css"
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



export type TagModel = {
  text: string;
  id: string;

}

type Props = {
  savedTag: TagModel;
  onChange: () => void;

}



export function Tag({ savedTag, onChange }: Props) {






  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {savedTag.text}
      </div>
      <IconButton onClick={()=> null}>

        <DeleteIcon fontSize="medium" htmlColor="#5C5C5C"/>
      </IconButton>


    </div>


  )
}



