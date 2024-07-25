// Styles
import { BadReview, GoodReview } from '../assets'
import '../index.css'
// Utils
import { calculateReviewPercentage } from '../utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ReviewsProps = { good: number, bad: number }
export default function ReviewsCounter({ good, bad }: ReviewsProps) {

  const { GoodPercentage, BadPercentage } = calculateReviewPercentage(good, bad)

  return (
    <div className="SteamReviews-Counter">
      <div className="SteamReviews-CounterPercentage">
        <div className="SteamReviews-CounterPercentage-Container">
          <span className='SteamReviews-CounterPercentage-GoodText'>
            {GoodPercentage}%
          </span>
          <div className="SteamReviews-CounterPercentage-GoodIcon">
            <GoodReview />
          </div>
        </div>
        <div className="SteamReviews-CounterPercentage-Container">
          <span className='SteamReviews-CounterPercentage-BadText'>
            {BadPercentage}%
          </span>
          <div className="SteamReviews-CounterPercentage-BadIcon">
            <BadReview />
          </div>
        </div>
      </div>
      <div className="SteamReviews-CounterBar">
        <div className="SteamReviews-CounterBar-Good" style={{
          width: `${GoodPercentage}%`
        }} />
        <div className="SteamReviews-CounterBar-Bad" style={{
          width: `${BadPercentage}%`
        }} />
      </div>
    </div>
  )
}