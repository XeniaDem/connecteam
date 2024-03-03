import { useFilePicker } from 'use-file-picker';
import styles from "./FilePicker.module.css"
import defaultPhoto from "../photo.svg"

import {
    FileAmountLimitValidator,
    FileTypeValidator,
    FileSizeValidator,
    ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { useState } from 'react';
import { Button } from '../../../../../components/button/Button';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { PropaneSharp } from '@mui/icons-material';


type Props = {
    onFilesSelected?: (files: File[]) => void;

}


export function FilePicker(props: Props) {



    const { openFilePicker, filesContent, loading, errors, } = useFilePicker({

        readAs: 'DataURL',
        accept: ['.txt'],
        multiple: false,
        onFilesSelected: ({ plainFiles, filesContent, errors }) => {
            // this callback is always called, even if there are errors
            const files : File[] = plainFiles
            props.onFilesSelected?.(files)
            // console.log('onFilesSelected', plainFiles, filesContent, errors);
          },
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
    const content = filesContent.length < 1 ? "" : filesContent[0].content;
  



    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors.length) {
        return <div>Error...</div>;
    }

    return (
        

        <div>


            <IconButton onClick={() => openFilePicker()}>
                <DownloadIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>



        </div>
    );
}