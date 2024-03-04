import { useEffect, useState } from "react";


export function useIsSmall(border: number) {
    const getIsSmall = () => window.innerWidth <= border;


    const [isSmall, setIsSmall] = useState(getIsSmall());

    useEffect(() => {
        const onResize = () => {
            setIsSmall(getIsSmall());
        }

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    
    return isSmall;
}