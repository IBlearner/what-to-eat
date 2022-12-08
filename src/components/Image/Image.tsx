import "./Image.scss";
import { FoodInterface } from "../../interfaces/FoodInterface";
import useFoodSelectionStore from "../../stores/FoodSelectionStore";
import useAppStore from "../..//stores/AppStore";
import { useEffect, useState } from "react";

export default function Image({ id, optionDetails, onImageClick }: { id: string, optionDetails: FoodInterface, onImageClick: Function }) {

    // Keeps track of when the entire comparer is loading to prevent either buttons from clicking
    // Variable selected is used to track internally which image should be showing the loading transition
    const isLoading = useAppStore(state => state.isLoading);
    const [selected, setSelected] = useState(false);
    // Set it as true on the assumption it can be found, and turn off if it can't be
    const [imageIsFound, setImageIsFound] = useState(true);
    const winningOption = useFoodSelectionStore(state => state.winningOption);

    // Ensures that after isLoading is reset, this internal selected variable is also reset
    useEffect(() => {
        if (isLoading === false) setSelected(false);
    }, [isLoading])

    // Ensure the component will always be given the chance to find the image
    useEffect(() => {
        setImageIsFound(true);
    }, [optionDetails])

    // Listens to winningOption to know if this option should have it's image expanded
    const getClassName = (): string => {
        return `image-container ${ isLoading && !selected ? "fade" : "" } ${winningOption?.name === optionDetails.name ? "expanded" : ""}`.trim();
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