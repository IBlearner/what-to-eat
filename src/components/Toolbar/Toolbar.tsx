import { useState } from "react";
import "./Toolbar.scss";
import { ModeInterface } from "../../interfaces/ModeInterface";
import useAppStore from "../../stores/AppStore";

export default function Toolbar() {
    const setMode = useAppStore(state => state.setMode);
    const setReset = useAppStore(state => state.setReset);

    // Initialise the toolbar to be closed so user picks a mode to begin with
    const [isContainerOpen, setIsContainerOpen] = useState(true);

    const modeOptions: ModeInterface[] = [
        {
            name: "food",
            available: true
        },
        {
            name: "cuisine",
            available: true
        },
        {
            name: "dessert",
            available: true
        }
    ];

    const toggleContainer = () => {
        setIsContainerOpen(!isContainerOpen);
    }

    const onResetClick = () => {
        setReset(true);
    }

    const getClassName = () => {
        return `toolbar-container ${isContainerOpen ? "expanded" : "closed"}`.trim();
    }

    const getModeOptions = () => {
        return modeOptions
        .filter((mode) => {
            return mode.available;
        })
        .map((mode: ModeInterface) => {
            return (
                <div className="mode-button" onClick={() => onModeClick(mode.name)}>
                    {mode.name}
                </div>
            );
        })
    }

    const onModeClick = (mode: string) => {
        setMode(mode);
        // After user selects a mode, close the toolbar
        setIsContainerOpen(false);
    }

    return (
        <div className={getClassName()}>
            <button className="toggle-toolbar-button" onClick={toggleContainer}>Toggle me</button>
            <button className="reset-app-button" onClick={onResetClick}>Reset</button>
            <div className="mode-options-container">
                {getModeOptions()}
            </div>
        </div>
    )
}