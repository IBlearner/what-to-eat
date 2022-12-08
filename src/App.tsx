import { useEffect, useState } from "react";
import "./App.scss";
import ItemComparer from "./components/ItemComparer/ItemComparer";
import Toolbar from "./components/Toolbar/Toolbar";
import { getRandomFromRange, selectRandomFromArr } from "./helpers/genericHelpers";
import { ImageInterface } from "./interfaces/ImageInterface";
import useImageSelectionStore from "./stores/ImageSelectionStore";

function App() {

  const leftOption = useImageSelectionStore(state => state.leftOption);
  const rightOption = useImageSelectionStore(state => state.rightOption);  
  const setLeftOption = useImageSelectionStore(state => state.setLeftOption);
  const setRightOption = useImageSelectionStore(state => state.setRightOption);

  const optionPool = useImageSelectionStore(state => state.optionPool);
  const initPool = useImageSelectionStore(state => state.initPool);
  const decreasePool = useImageSelectionStore(state => state.decreasePool);

  // Keeps track of when the user can interact with the options
  const isLoading = useImageSelectionStore(state => state.isLoading);
  const setIsLoading = useImageSelectionStore(state => state.setIsLoading);

  const winningOption = useImageSelectionStore(state => state.winningOption);
  const setWinningOption = useImageSelectionStore(state => state.setWinningOption);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const response = await fetch("./foodData.json");
    let res: ImageInterface[] = await response.json();

    // Set the left and right options
    const randomLeftOption = getRandomOptionFromPool(res);
    const randomRightOption = getRandomOptionFromPool(res);
    setLeftOption(randomLeftOption);
    setRightOption(randomRightOption);

    // Initialise the option pool with the remaining options
    initPool(res);
  }

  const getRandomOptionFromPool = (options: ImageInterface[]) => {
    return options.splice(getRandomFromRange(options.length), 1)[0]
  }


  const onComparerClick = (id: "left" | "right", selected: ImageInterface) => {
    // When the optionPool is empty, we will disable all interactive functionality and lock in the winning option
    if (optionPool.length > 0) {

      setIsLoading(true)

      const nextOption: ImageInterface = getRandomOptionFromPool(optionPool);
  
      setTimeout(() => {
        decreasePool(nextOption);
  
        switch (id) {
          case "left":
            setRightOption(nextOption);
            break;
          case "right":
            setLeftOption(nextOption);
            break;
          default:
            break;
        }
  
        setIsLoading(false);
      }, 1000);

    } else {
      // Leaving loading as true now to 1. make the non-winner disappear for good and 2. make the itemcomparer component un-interactable
      setIsLoading(true)
      setWinningOption(selected);
    }
  }

  return (
    <div className="App">
      <h1 className="item-comparer-title">{!winningOption ? (leftOption.name + " vs " + rightOption.name) : `Woooo it looks like you're having ${winningOption.name}!`}</h1>

      {/* Disable the interactiveness when it is either loading or the user has not reached a conclusion */}
      <ItemComparer onComparerClick={!isLoading && !winningOption ? onComparerClick : () => {}}/>
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
