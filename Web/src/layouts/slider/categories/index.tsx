import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react"

// Styles
import './index.css'

// Assets
import { LeftArrow, RightArrow } from "../assets"

// Utils
import { splitArrayComponentsToSubarrays } from "@utils"

type SliderProps = { children: ReactNode[] } & ComponentProps<"div">
export default function SliderCategories({ children }: SliderProps) {

    const ArrayComponents = splitArrayComponentsToSubarrays(children, 5)

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

        const childrenCount = ArrayComponents.length;
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

        ScrollElement.addEventListener("scroll", EventScroll)

        return () => {
            ScrollElement.removeEventListener("scroll", EventScroll)
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
                    {ArrayComponents.map((ReactElement, _index) =>
                        <SliderCategoryContainer key={_index}>
                            {ReactElement.map((element, _index) =>
                                <div key={_index}>{element}</div>
                            )}
                        </SliderCategoryContainer>
                    )}
                </div>
                <button className="SteamSliderCategories-ContentControls" onClick={() => SlideEvent("next")}>
                    <div className="SteamSliderCategories-ContentControls-Icon Right">
                        <RightArrow />
                    </div>
                </button>
            </div>
            <div className="SteamSliderCategories-ElementsCounter">
                {ArrayComponents.map((_value, _index) => <div key={_index + 1} className={`SteamSliderCategories-ElementsCounter-Element ${ElementSelected === (_index + 1) ? States.Select : States.NonSelect}`} />)}
            </div>
        </div>
    )
}

type SliderCategoryContainerProps = { children: ReactNode[] }
function SliderCategoryContainer({ children }: SliderCategoryContainerProps) {
    return (
        <div className="SteamSliderCategories-Container">
            {children}
        </div>
    )
}