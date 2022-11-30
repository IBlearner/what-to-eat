import "./Image.scss";
import { ImageInterface } from "../../interfaces/ImageInterface"
import { useState } from "react";

export default function Image({ id, isLoading, imgDetails, onImgClick }: { id: string, isLoading: boolean, imgDetails: ImageInterface, onImgClick: Function }) {
    const [isVisible, setIsVisible] = useState(true);
    
    const childOnImgClick = (e: any) => {
        onImgClick(id, 2);

        // Make image fade out
        setIsVisible(false);

        setTimeout(() => {
            setIsVisible(true)
        }, 1000)
    }

    return (
        <img className={`image-container ${isVisible ? "" : "fade"}`} src={imgDetails.path} alt={imgDetails.alt} onClick={(e) => { !isLoading ? childOnImgClick(e) : null}}/>
    )
}