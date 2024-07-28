import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react"

// Styles
import './index.css'
import { LeftArrow, RightArrow } from "../assets"

type SliderProps = { children: ReactNode[] } & ComponentProps<"div">
export default function SliderCategories({ children }: SliderProps) {

    const Wrapper = useRef<HTMLDivElement>(null!)
    const [ElementSelected, setElementSelected] = useState(1)

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
            if (ElementSelected - 1 < 1) {
                SlideFunction(SlideEventVariables.MovePoints * childrenCount); return
            }
            SlideFunction(parseInt(`${Wrapper.current.scrollLeft}`) - SlideEventVariables.MovePoints)
            setElementSelected(ElementSelected - 1)
            return
        }
        if (ElementSelected + 1 > childrenCount) {
            SlideFunction(0); return
        }
        SlideFunction(parseInt(`${Wrapper.current.scrollLeft}`) + SlideEventVariables.MovePoints)
        setElementSelected(ElementSelected + 1)
        return
    }

    useEffect(() => {
        const ScrollElement = Wrapper.current
        const EventScroll = () => {
            const ValueResolve = parseInt(`${ScrollElement.scrollLeft}`) / SlideEventVariables.MovePoints
            setElementSelected(parseInt(`${ValueResolve + 1}`))
        }

        ScrollElement.addEventListener("scrollend", EventScroll)

        return () => {
            ScrollElement.removeEventListener("scrollend", EventScroll)
        }
    }, [SlideEventVariables.MovePoints])

    return (
        <div className="SteamSliderCategories">
            <div className="SteamSliderCategories-Content">
                <button className="SteamSliderCategories-ContentControls" onClick={() => SlideEvent("back")}>
                    <div className="SteamSliderCategories-ContentControls-Icon Left" >
                        <LeftArrow />
                    </div>
                </button>
                <div className="SteamSliderCategories-ContentElement" ref={Wrapper}>
                    {children}
                </div>
                <button className="SteamSliderCategories-ContentControls" onClick={() => SlideEvent("next")}>
                    <div className="SteamSliderCategories-ContentControls-Icon Right">
                        <RightArrow />
                    </div>
                </button>
            </div>
            <div className="SteamSliderCategories-ElementsCounter">
                {children.map((_value, _index) => <div key={_index + 1} className={`SteamSliderCategories-ElementsCounter-Element ${ElementSelected === (_index + 1) ? States.Select : States.NonSelect}`} />)}
            </div>
        </div>
    )
}

type SliderCategoryContainerProps = { children: ReactNode[] }
export function SliderCategoryContainer({ children }: SliderCategoryContainerProps) {
    return (
        <div className="SteamSliderCategories-Container">
            {children}
        </div>
    )
}