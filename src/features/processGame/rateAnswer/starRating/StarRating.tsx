
import { IconButton } from "@mui/material";
import styles from "./StarRating.module.css"

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState } from "react";


type Props = {

}



export function StarRating(props: Props) {

  const [rating, setRating] = useState(0);


  return (
    <div className={styles.container}>
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#55C6F7" />
          <stop offset={1} stopColor="#2AF8BA" />
        </linearGradient>
      </svg>


      <div className={styles.stars}>

      <IconButton onClick={() => setRating(1)}>
          {rating < 1 ? (
            <StarBorderIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          ) : (
            <StarIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          )}
        </IconButton>

        <IconButton onClick={() => setRating(2)}>
          {rating < 2 ? (
            <StarBorderIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          ) : (
            <StarIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          )}
        </IconButton>


        <IconButton onClick={() => setRating(3)}>
          {rating < 3 ? (
            <StarBorderIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          ) : (
            <StarIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          )}
        </IconButton>
        <IconButton onClick={() => setRating(4)}>
          {rating < 4 ? (
            <StarBorderIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          ) : (
            <StarIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          )}
        </IconButton>
        <IconButton onClick={() => setRating(5)}>
          {rating < 5 ? (
            <StarBorderIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          ) : (
            <StarIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
          )}
        </IconButton>
      </div>


    </div>
  )

}



