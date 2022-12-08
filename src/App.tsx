import { useEffect, useState } from "react";
import "./App.scss";
import OptionComparer from "./components/OpenComparer/OptionComparer";
import Toolbar from "./components/Toolbar/Toolbar";
import { getRandomFromRange, selectRandomFromArr } from "./helpers/genericHelpers";
import { FoodInterface } from "./interfaces/FoodInterface";
import useFoodSelectionStore from "./stores/FoodSelectionStore";
import useAppStore from "./stores/AppStore";

function App() {

  const leftOption = useFoodSelectionStore(state => state.leftOption);
  const rightOption = useFoodSelectionStore(state => state.rightOption);  
  const setLeftOption = useFoodSelectionStore(state => state.setLeftOption);
  const setRightOption = useFoodSelectionStore(state => state.setRightOption);

  const optionPool = useFoodSelectionStore(state => state.optionPool);
  const initPool = useFoodSelectionStore(state => state.initPool);
  const decreasePool = useFoodSelectionStore(state => state.decreasePool);

  // Keeps track of when the user can interact with the options
  const isLoading = useAppStore(state => state.isLoading);
  const setIsLoading = useAppStore(state => state.setIsLoading);

  const winningOption = useFoodSelectionStore(state => state.winningOption);
  const setWinningOption = useFoodSelectionStore(state => state.setWinningOption);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const response = await fetch("./foodData.json");
    let res: FoodInterface[] = await response.json();

    // Set the left and right options
    const randomLeftOption = getRandomOptionFromPool(res);
    const randomRightOption = getRandomOptionFromPool(res);
    setLeftOption(randomLeftOption);
    setRightOption(randomRightOption);

    // Initialise the option pool with the remaining options
    initPool(res);
  }

  const getRandomOptionFromPool = (options: FoodInterface[]) => {
    return options.splice(getRandomFromRange(options.length), 1)[0]
  }

  const onComparerClick = (id: "left" | "right", selected: FoodInterface) => {
    // When the optionPool is empty, we will disable all interactive functionality and lock in the winning option
    if (optionPool.length > 0) {

      setIsLoading(true)

      const nextOption: FoodInterface = getRandomOptionFromPool(optionPool);
  
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
      <OptionComparer onComparerClick={!isLoading && !winningOption ? onComparerClick : () => {}}/>
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
