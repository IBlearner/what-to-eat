import "./ItemComparer.scss";
import Image from "../Image/Image";
import useImageSelectionStore from "../../stores/ImageSelectionStore";

export default function ItemComparer({ onComparerClick }: { onComparerClick: Function }) {

    const leftOption = useImageSelectionStore(state => state.leftOption);
    const rightOption = useImageSelectionStore(state => state.rightOption);

    return (
        <div className="item-comparer-container">
            <Image id="left" optionDetails={leftOption} onImageClick={onComparerClick}/>
            <Image id="right" optionDetails={rightOption} onImageClick={onComparerClick}/>
        </div>
    )
}