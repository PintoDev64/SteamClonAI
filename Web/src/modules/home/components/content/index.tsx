// Components
import { SeparatorContainer } from '@components/separator'

// Layouts
import SliderHuge from '@layouts/slider/huge'
import GameCard from '@layouts/components/cards'
import SliderSmall from '@layouts/slider/small'
import SliderCategories from '@layouts/slider/categories'
import CategoriesCard from '@layouts/components/categories'

// Examples
import { GameCategories } from '@layouts/slider/constants'

type HomePageProps = { bannerEvent?: string } & RequestAPI.Home_APIStore
export default function HomeContent({ bannerEvent, Featured, Offers, SteamAI }: HomePageProps) {

    return (
        <>
            {bannerEvent && <div id="HomePageEventBanner" style={{ backgroundImage: `url(${bannerEvent})` }}>
            </div>}
            <div id="HomePageContent">
                <SeparatorContainer Text='Destacados'>
                    <SliderHuge>
                        {Featured.map((data, _index) =>
                            <GameCard key={_index} data={data} />
                        )}
                    </SliderHuge>
                </SeparatorContainer>
                <SeparatorContainer Text='Ofertas Especiales'>
                    <SliderSmall>
                        {Offers.map((data, _index) =>
                            <GameCard key={_index} preset='Small' data={data} />
                        )}
                    </SliderSmall>
                </SeparatorContainer>
                <SeparatorContainer Text='SteamAI'>
                    <SliderSmall>
                        {SteamAI.map((data, _index) =>
                            <GameCard key={_index} preset='Small' data={data} />
                        )}
                    </SliderSmall>
                </SeparatorContainer>
                <SeparatorContainer Text='Categorias'>
                    <SliderCategories>
                        {GameCategories.map(({ Text, imageUrl }, _index) =>
                            <CategoriesCard key={_index} Text={Text} imageUrl={imageUrl} />
                        )}
                    </SliderCategories>
                </SeparatorContainer>
            </div>
        </>
    )
}