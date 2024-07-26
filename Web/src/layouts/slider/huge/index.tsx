import { ComponentProps, ReactNode, useState } from "react"

// Styles
import './index.css'
import { LeftArrow, RightArrow } from "./assets"

type SliderProps = { children: ReactNode[] } & ComponentProps<"div">
export default function Slider({ children }: SliderProps) {

    const [ElementSelected, setElementSelected] = useState(1)

    enum States {
        Select = "Select",
        NonSelect = "NonSelect"
    }

    function Execute(goTo: "back" | "next") {
        const childrenCount = children.length;
        
        if (goTo === "back") {
            if (ElementSelected - 1 < 1) return
            setElementSelected(ElementSelected - 1)
            return
        }
        if (ElementSelected + 1 > childrenCount) return
        setElementSelected(ElementSelected + 1)
        return
    }

    return (
        <div className="SteamSlider">
            <div className="SteamSlider-Content">
                <button className="SteamSlider-ContentControls" onClick={() => Execute("back")}>
                    <div className="SteamSlider-ContentControls-Icon Left" >
                        <LeftArrow />
                    </div>
                </button>
                <div className="SteamSlider-ContentElement">
                    {children}
                </div>
                <button className="SteamSlider-ContentControls" onClick={() => Execute("next")}>
                    <div className="SteamSlider-ContentControls-Icon Right">
                        <RightArrow />
                    </div>
                </button>
            </div>
            <div className="SteamSlider-ElementsCounter">
                {children.map((_value, _index) => <div key={_index + 1} className={`SteamSlider-ElementsCounter-Element ${ElementSelected === (_index + 1) ? States.Select : States.NonSelect}`} />)}
            </div>
        </div>
    )
}
