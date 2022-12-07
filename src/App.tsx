import { useEffect, useState } from "react";
import "./App.scss";
import ItemComparer from "./components/ItemComparer/ItemComparer";
import Toolbar from "./components/Toolbar/Toolbar";
import { ImageInterface } from "./interfaces/ImageInterface";
import useImageSelectionStore from "./stores/ImageSelectionStore";

function App() {

  const leftOption = useImageSelectionStore(state => state.leftOption);
  const rightOption = useImageSelectionStore(state => state.rightOption);  
  const selectLeftOption = useImageSelectionStore(state => state.selectLeftOption);
  const selectRightOption = useImageSelectionStore(state => state.selectRightOption);

  const optionPool = useImageSelectionStore(state => state.optionPool);
  const initPool = useImageSelectionStore(state => state.initPool);
  const decreasePool = useImageSelectionStore(state => state.decreasePool);

  // Keeps track of when the user can interact with the options
  const isLoading = useImageSelectionStore(state => state.isLoading);
  const setIsLoading = useImageSelectionStore(state => state.setIsLoading);

  // Keeps track of when the pool is depleted and the app to stop
  const isFinished = useImageSelectionStore(state => state.isFinished);
  const setIsFinished = useImageSelectionStore(state => state.setIsFinished);

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    // Need logic to end the selection process when the pool hits 0
    // Actually, when the pool hits 1 means there will be no more future options as this represents one of the current options
    if (optionPool.length === 1) {
      console.log("no more options");
      setIsFinished();
    }
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
