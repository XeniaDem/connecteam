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

export function FilePicker() {


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
                    <img src={photo == "" ? defaultPhoto : photo} />
                    

                </div>



                <Button text={"Сменить логотип компании"} onClick={() => openFilePicker()} className={styles.footerButton} />






            </div>
        </div>
    );
}