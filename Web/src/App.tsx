import Install from './components/buttons/install'
import Pause from './components/buttons/pause'
import Play from './components/buttons/play'
import AddtoCart from './components/cart'
import SteamCheckbox from './components/checkbox'
import ReviewsCounter from './components/reviews/counter'
import SteamSwitch from './components/switch'
import SteamWishlist from './components/wishlist'
import Header from './layouts/header/header'
import Slider from './layouts/slider/huge'

export default function App() {

  console.log(<p>XD</p>);
  

  return (
    <>
      <Header />
      <SteamSwitch />
      <SteamWishlist />
      <ReviewsCounter good={400} bad={150} />
      <SteamCheckbox />
      <Play />
      <Install />
      <Pause />
      <AddtoCart price={35.5} discount={30} discountDate='19-09-2024' />
      <Slider>
        <p>XD</p>
        <p>XD</p>
        <p>XD</p>
      </Slider>
    </>
  )
}