// Components
import ReviewsCounter from "@components/reviews/counter"

// Styles
import './index.css'
import { decodeDate } from "@utils"
import { useEffect, useRef, useState } from "react";

export default function GameDetails({ images, name, shortDescription, releaseDate, reviews, developer, publishers, categories }: ComponentsRequestProps.GameDetails) {

    console.log(reviews);
    

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ImageSelect, setImageSelect] = useState(0)

    const VideoElement = useRef<HTMLVideoElement>(null!)

    function filterReviews(reviews: RequestAPI.GameReviewsData) {
        const Good = [...reviews].filter(({ type }) => type === "recommended").length
        const Bad = [...reviews].filter(({ type }) => type === "non-recomended").length
        return {
            Good,
            Bad
        }
    }

    useEffect(() => {
        VideoElement.current.volume = 0.4
        VideoElement.current.addEventListener("load", () => VideoElement.current.play())
        setImageSelect(0)
        return () => {}
    }, [])


    return (
        <div id="GameDetails">
            <div id="GameDetails-Images">
                <div id="GameDetails-Images-Element">
                    {
                        images[ImageSelect].type === "video"
                            ? <video id="GameDetails-Images-ElementVideo" controls src={images[ImageSelect].url} ref={VideoElement}></video>
                            : <img id="GameDetails-Images-ElementImage" src={images[ImageSelect].url} alt={name} />
                    }
                </div>
                <div id="GameDetails-Images-Slider">

                </div>
            </div>
            <div id="GameDetails-Content">
                <img className="GameDetails-ContentClass" src={images[1].url} alt={name} id="GameDetails-ContentCover" />
                <div className="GameDetails-ContentClass" id="GameDetails-ContentDescription">
                    <p id="GameDetails-ContentDescriptionText">{shortDescription.slice(0, 170)}{shortDescription.length > 170 && "..."}</p>
                </div>
                <div className="GameDetails-ContentSeparator GameDetails-ContentClass">
                    <span className="GameDetails-Content-Span">Reseñas</span>
                    <div className="GameDetails-Content-Expose">
                        {
                            reviews[0] !== undefined
                                ? <ReviewsCounter good={filterReviews(reviews).Good} bad={filterReviews(reviews).Bad} />
                                : "No hay Reseñas"
                        }
                    </div>
                </div>
                <div className="GameDetails-ContentSeparator GameDetails-ContentClass">
                    <span className="GameDetails-Content-Span">Fecha de lanzamiento</span>
                    <div className="GameDetails-Content-Expose">{decodeDate(releaseDate)}</div>
                </div>
                <div className="GameDetails-ContentSeparator GameDetails-ContentClass">
                    <span className="GameDetails-Content-Span">Desarrollador</span>
                    <div className="GameDetails-Content-Expose">
                        <a href={developer.url} target="_blank" rel="noopener noreferrer">{developer.name}</a>
                    </div>
                </div>
                <div className="GameDetails-ContentSeparator GameDetails-ContentClass">
                    <span className="GameDetails-Content-Span">Distribuidor</span>
                    <div className="GameDetails-Content-Expose">
                        {publishers.map(({ name, url }, _index) =>
                            <a key={_index} href={url} target="_blank" rel="noopener noreferrer">{name}</a>
                        )}
                    </div>
                </div>
                <div className="GameDetails-ContentSeparator GameDetails-ContentClass">
                    <span className="GameDetails-Content-Span">Categorias</span>
                    <div className="GameDetails-Content-Expose">
                        {categories.slice(1, 3).map((value, _index) =>
                            <div key={_index} className="GameDetails-Content-ExposeTags">
                                {value}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}