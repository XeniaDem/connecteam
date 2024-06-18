import { useEffect, useState } from "react";


export function useGetDimensions() {
    const getWidth = () => window.innerWidth;
    const getHeight = () => window.innerHeight;


    const [width, setWidth] = useState(getWidth());
    const [height, setHeight] = useState(getHeight());


    useEffect(() => {
        const onResize = () => {
            setWidth(getWidth())
            setHeight(getHeight())
        }

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    
    return [width, height];
}