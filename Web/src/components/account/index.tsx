// Styles
import './index.css'

// Assets
import { DownArrow } from './assets'

export default function AccountHeader() {
    if ( navigator.userAgent === "SteamClient_xyz" ) return
    return (
        <div id="AccountHeader">
            <img id='AccountHeaderImage' src="https://avatars.githubusercontent.com/u/84690368?v=4" />
            <span id='AccountHeaderName'>PintoGamer</span>
            <span id='AccountHeaderCurrency'>$5.25</span>
            <div id="AccountHeaderArrow">
                <DownArrow />
            </div>
        </div>
    )
}