import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react"

// Styles
import './index.css'
import { LeftArrow, RightArrow } from "../assets"

type SliderProps = { children: ReactNode[] } & ComponentProps<"div">
export default function SliderHuge({ children }: SliderProps) {

    const Wrapper = useRef<HTMLDivElement>(null!)

    const [ElementSelected, setElementSelected] = useState(0)

    enum States {
        Select = "Select",
        NonSelect = "NonSelect"
    }

    enum SlideEventVariables {
        MoveSmooth = "smooth",
        MovePoints = 1281
    }

    function SlideEvent(goTo: "back" | "next") {
        const childrenCount = children.length;
        const SlideFunction = (value: number) => Wrapper.current.scrollTo({
            behavior: SlideEventVariables.MoveSmooth,
            left: value
        })

        if (goTo === "back") {
            if (ElementSelected - 1 < 0) {
                SlideFunction(SlideEventVariables.MovePoints * childrenCount);
                setElementSelected(childrenCount - 1)
                return
            }
            SlideFunction(Math.round(
                parseInt(`${Wrapper.current.scrollLeft}`) - SlideEventVariables.MovePoints
            ))
            return
        }
        
        if (ElementSelected + 1 > childrenCount - 1) {
            SlideFunction(0);
            setElementSelected(0)
            return
        }
        SlideFunction(parseInt(`${Wrapper.current.scrollLeft}`) + SlideEventVariables.MovePoints)
        return
    }

    useEffect(() => {
        const ScrollElement = Wrapper.current
        const EventScroll = () => {
            const ValueResolve = Math.round(
                parseInt(`${ScrollElement.scrollLeft}`) / SlideEventVariables.MovePoints
            )
            setElementSelected(ValueResolve)
        }

        ScrollElement.addEventListener("scroll", EventScroll)

        return () => {
            ScrollElement.removeEventListener("scroll", EventScroll)
        }
    })

    return (
        <div className="SteamSliderHuge">
            <div className="SteamSliderHuge-Content">
                <button className="SteamSliderHuge-ContentControls" onClick={() => SlideEvent("back")}>
                    <div className="SteamSliderHuge-ContentControls-Icon Left" >
                        <LeftArrow />
                    </div>
                </button>
                <div className="SteamSliderHuge-ContentElement" ref={Wrapper}>
                    {children}
                </div>
                <button className="SteamSliderHuge-ContentControls" onClick={() => SlideEvent("next")}>
                    <div className="SteamSliderHuge-ContentControls-Icon Right">
                        <RightArrow />
                    </div>
                </button>
            </div>
            <div className="SteamSliderHuge-ElementsCounter">
                {children.map((_value, _index) => <div key={_index} className={`SteamSliderHuge-ElementsCounter-Element ${ElementSelected === (_index) ? States.Select : States.NonSelect}`} />)}
            </div>
        </div>
    )
}
