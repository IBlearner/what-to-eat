import "./ItemComparer.scss";
import Image from "../Image/Image";
import { useState } from "react";
import { ImageInterface } from "../../interfaces/ImageInterface"

export default function ItemComparer() {
    const pizzaDetails: ImageInterface = {
        name: "pizza",
        path: "./src/assets/pizza.jpg",
        alt: "pizza"
    };
    const burgerDetails: ImageInterface = {
        name: "burger",
        path: "./src/assets/burger.jpg",
        alt: "burger"
    };
    const nasiLemakDetails: ImageInterface = {
        name: "nasi-lemak",
        path: "./src/assets/nasi-lemak.jpg",
        alt: "nasi-lemak"
    };

    const [selected, setSelected] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [curSelectedLeft, setCurSelectedLeft] = useState(burgerDetails);
    const [curSelectedRight, setCurSelectedRight] = useState(nasiLemakDetails);

    const onImgClick = (id: "left" | "right", name: string) => {
        console.log(id)
        let totalFoodsArr: ImageInterface[] = [pizzaDetails, burgerDetails, nasiLemakDetails];
        let nextFood = Math.floor(Math.random() * totalFoodsArr.length);
        if (isLoading) return
        setIsLoading(true);

        setTimeout(() => {
            switch (id) {
                case "left":
                    setCurSelectedLeft(totalFoodsArr[nextFood])
                    break;
                case "right":
                    setCurSelectedRight(totalFoodsArr[nextFood])
                    break;
                default:
                    break;
            }

            setIsLoading(false);
        }, 1000)
    }

    return (
        <div className="item-comparer-container">
            <Image id="left" isLoading={isLoading} imgDetails={curSelectedLeft} onImgClick={onImgClick}/>
            <Image id="right" isLoading={isLoading} imgDetails={curSelectedRight} onImgClick={onImgClick}/>
        </div>
    )
}