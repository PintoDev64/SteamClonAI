import Install from './components/buttons/install'
import Pause from './components/buttons/pause'
import Play from './components/buttons/play'
import AddtoCart from './components/cart'
import SteamCheckbox from './components/checkbox'
import ReviewsCounter from './components/reviews/counter'
import SteamSwitch from './components/switch'
import SteamWishlist from './components/wishlist'
import { BeyondTwoSouls, CounterStrikeShortDetails, Left4DeadShortDetails } from './examples/game'
import GameCard from './layouts/components/cards'
import Header from './layouts/header/header'
import SliderHuge from './layouts/slider/huge'
import SliderSmall, { SliderContainer } from './layouts/slider/small'

export default function App() {

  console.log(<p>XD</p>);

  const ArrayExample = [CounterStrikeShortDetails, Left4DeadShortDetails, BeyondTwoSouls]

  return (
    <>
      <Header />
      <SteamSwitch />
      <SteamWishlist mode='Square' />
      <ReviewsCounter good={400} bad={150} />
      <SteamCheckbox />
      <SliderHuge>
        {ArrayExample.map(data => <GameCard data={data} />)}
      </SliderHuge>
      <hr color='transparent' style={{ margin: "50px 0" }}/>
      <SliderSmall>
        <SliderContainer>
          {ArrayExample.map(data => <GameCard preset='Small' data={data} />)}
        </SliderContainer>
        <SliderContainer>
          {ArrayExample.map(data => <GameCard preset='Small' data={data} />)}
        </SliderContainer>
      </SliderSmall>
      <Play />
      <Install />
      <Pause />
      <AddtoCart mode='Small' price={{
        value: 35.5
      }}/>
    </>
  )
}