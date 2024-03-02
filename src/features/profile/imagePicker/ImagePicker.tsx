import { useFilePicker } from 'use-file-picker';
import styles from "./ImagePicker.module.css"
import defaultPhoto from "../photo.svg"
import { Button } from "../../../components/button/Button"
import {
    FileAmountLimitValidator,
    FileTypeValidator,
    FileSizeValidator,
    ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { useState } from 'react';
import { useIsMobile } from '../../../app/hooks/useIsMobile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';



type Props = {
    isUser: boolean;
}

export function ImagePicker(props: Props) {
    const isMobile = useIsMobile()


    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
   
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: false,
        // validators: [
        //   new FileAmountLimitValidator({ max: 1 }),
        //   new FileTypeValidator(['jpg', 'png']),
        //   new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
        //   new ImageDimensionsValidator({
        //     maxHeight: 900, // in pixels
        //     maxWidth: 1600,
        //     // minHeight: 600,
        //     // minWidth: 768,
        //   }),
        // ],
    });
    const photo =  filesContent.length < 1 ? "" : filesContent[0].content;


    const [isPhotoChanging, setIsPhotoChanging] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors.length) {
        return <div>Error...</div>;
    }

    return (

        <div>

            <div className={styles.container}>

                <div className={styles.photo}>
                    {!isMobile && <img src={photo == "" ? defaultPhoto : photo} />}
                    {isMobile &&  (photo == "") ? <PhotoCameraIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> : <img src={photo} />}
                    

                </div>



                <Button text={props.isUser ? "Сменить фотографию профиля" : "Сменить логотип компании"} 
                
                onClick={() => openFilePicker() } className={styles.footerButton} />



            </div>
        </div>
    );
}