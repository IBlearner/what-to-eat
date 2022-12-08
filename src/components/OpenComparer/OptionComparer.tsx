import "./OptionComparer.scss";
import Image from "../Image/Image";
import useFoodSelectionStore from "../../stores/FoodSelectionStore";

export default function OptionComparer({ onComparerClick }: { onComparerClick: Function }) {

    const leftOption = useFoodSelectionStore(state => state.leftOption);
    const rightOption = useFoodSelectionStore(state => state.rightOption);

    return (
        <div className="option-comparer-container">
            <Image id="left" optionDetails={leftOption} onImageClick={onComparerClick}/>
            <Image id="right" optionDetails={rightOption} onImageClick={onComparerClick}/>
        </div>
    )
}