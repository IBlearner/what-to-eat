import "./Image.scss";
import { ImageInterface } from "../../interfaces/ImageInterface";
import useImageSelectionStore from "../../stores/ImageSelectionStore";
import { useEffect, useState } from "react";

export default function Image({ id, optionDetails, onImageClick }: { id: string, optionDetails: ImageInterface, onImageClick: Function }) {

    // Keeps track of when the entire comparer is loading to prevent either buttons from clicking
    // Variable selected is used to track internally which image should be showing the loading transition
    const isLoading = useImageSelectionStore(state => state.isLoading);
    const [selected, setSelected] = useState(false);
    // Set it as true on the assumption it can be found, and turn off if it can't be
    const [imageIsFound, setImageIsFound] = useState(true);  

    useEffect(() => {
        if (isLoading === false) setSelected(false);
    }, [isLoading])

    // Ensure the component will always be given the chance to find the image
    useEffect(() => {
        setImageIsFound(true);
    }, [optionDetails])

    const getClassName = (): string => {
        return `image-container ${ selected ? "fade" : "" }`;
    }

    const onImageClickChild = () => {
        // Requires an additional check here as main app is unaware of the setselected
        if (!isLoading) {
            onImageClick(id, optionDetails);
            setSelected(true);
        }
    }

    const onImageNotFound = () => {
        setImageIsFound(false);
    }

    return (
        <div className={getClassName()} onClick={onImageClickChild}>
            { imageIsFound ? 
                <img src={optionDetails.path} alt={optionDetails.alt} onError={() => onImageNotFound()} /> :
                <div>Can't find img</div>
            }       
        </div>
    )
}