import { useEffect, useState } from "react";
import "./App.scss";
import ItemComparer from "./components/ItemComparer/ItemComparer";
import Toolbar from "./components/Toolbar/Toolbar";
import { ImageInterface } from "./interfaces/ImageInterface";
import useImageSelectionStore from "./stores/ImageSelectionStore";

function App() {

  // Keeps track of when the user can interact with the options
  const isLoading = useImageSelectionStore(state => state.isLoading);
  const setIsLoading = useImageSelectionStore(state => state.setIsLoading);

  const leftOption = useImageSelectionStore(state => state.leftOption);
  const rightOption = useImageSelectionStore(state => state.rightOption);  
  const selectLeftOption = useImageSelectionStore(state => state.selectLeftOption);
  const selectRightOption = useImageSelectionStore(state => state.selectRightOption);

  const optionPool = useImageSelectionStore(state => state.optionPool);
  const initPool = useImageSelectionStore(state => state.initPool);
  const decreasePool = useImageSelectionStore(state => state.decreasePool);

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    console.log(optionPool);
  }, [optionPool])

  const fetchData = async () => {
    const response = await fetch("./foodData.json");
    const res = await response.json();
    initPool(res);
  }


  const onComparerClick = (id: "left" | "right", selected: ImageInterface) => {
    setIsLoading(true)

    setTimeout(() => {
      decreasePool(selected);

      switch (id) {
        case "left":
          selectLeftOption();
          break;
        case "right":
          selectRightOption();
          break;
        default:
          break;
      }

      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="App">
      <h1 className="item-comparer-title">{leftOption.name + " vs " + rightOption.name}</h1>
      <ItemComparer onComparerClick={!isLoading ? onComparerClick : () => {}}/>
      <Toolbar />
      <ul>
      {
        optionPool.map(img => {
          return (
            <li>{img.name}</li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default App;
