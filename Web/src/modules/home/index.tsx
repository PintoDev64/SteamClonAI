// Style
import { SeparatorContainer } from '@components/separator'
import './index.css'
import SliderHuge from '@layouts/slider/huge'
import { GameExamples } from '@examples/game'
import GameCard from '@layouts/components/cards'
import SliderSmall, { SliderContainer } from '@layouts/slider/small'

type HomePageProps = { bannerEvent?: string, TextEvent?: string }
export default function HomePage({ bannerEvent, TextEvent }: HomePageProps) {
    const SpecialOffers = [GameExamples.filter(({ products }) => products[0].price.discount !== undefined), GameExamples.filter(({ products }) => products[0].price.discount !== undefined)]
    console.log(SpecialOffers);

    return (
        <div id="HomePage">
            {bannerEvent && TextEvent && <div id="HomePageEventBanner" style={{ backgroundImage: `url(${bannerEvent})` }}>
            </div>}
            <div id="HomePageContent">
                <SeparatorContainer Text='Destacados'>
                    <SliderHuge>
                        {GameExamples.map(data =>
                            <GameCard data={data} />
                        )}
                    </SliderHuge>
                </SeparatorContainer>
                <SeparatorContainer Text='Ofertas Especiales'>
                    <SliderSmall>
                        {SpecialOffers.map(Element => 
                            <SliderContainer>
                                {Element.map(data =>
                                    <GameCard preset='Small' data={data} />
                                )}
                            </SliderContainer>
                        )}
                    </SliderSmall>
                </SeparatorContainer>
            </div>
        </div>
    )
}