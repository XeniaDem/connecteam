import styles from "./Tag.module.css"
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



export type TagModel = {

  id: string;
  key: string;

}

type Props = {
  savedTag: TagModel;
  onChange: () => void;
  deleteTag: (id: string) => void;


}



export function Tag({ savedTag, onChange, deleteTag }: Props) {






  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {savedTag.key}
      </div>
      <IconButton onClick={()=>deleteTag(savedTag.id)}>

        <DeleteIcon fontSize="medium" htmlColor="#5C5C5C"/>
      </IconButton>


    </div>


  )
}



