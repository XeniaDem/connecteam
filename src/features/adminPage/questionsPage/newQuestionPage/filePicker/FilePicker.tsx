import { useFilePicker } from 'use-file-picker';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';


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
            const files: File[] = plainFiles
            props.onFilesSelected?.(files)
        },
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