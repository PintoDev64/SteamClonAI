// Styles
import { Link, useLocation } from 'react-router-dom'
import { SearchIcon } from './assets'
import Constans from './constants'
import './index.css'
import { GetActualPath } from '@utils'
import { useContext } from 'react'
import { PageTransitionContext } from 'context'
import { ModifyTransition } from 'hooks'
import AccountHeader from '@components/account'

export default function Header() {

  const { HeaderPersonal, HeaderTitles } = Constans()

  const { pathname } = useLocation()

  const { loader, ModifyPageTransition } = useContext(PageTransitionContext)

  enum States {
    Active = "Active",
    Desactive = "Desactive"
  }

  function ClickLink(url: string) {
    url !== pathname && ModifyTransition(ModifyPageTransition)
  }

  return (
    <header id="SteamHeader">
      <div id="SteamHeader-Pages">
        {HeaderTitles.map(({ name, url }, _index) =>
          <Link to={url ?? "/login"} key={_index} className={`SteamHeader-PagesTitles ${GetActualPath(url) ? States.Active : States.Desactive}`} onClick={() => ClickLink(url)}>
            <span className='SteamHeader-PagesTitlesText'>{name}</span>
          </Link>
        )}
      </div>
      <div id="SteamHeader-Search">
        <input id='SteamHeader-SearchInput' placeholder='Buscar...' type="search" name="browse" />
        <div id="SteamHeader-SearchIcon">
          <SearchIcon />
        </div>
      </div>
      <div id="SteamHeader-Personal">
        {HeaderPersonal.map(({ name, url }, _index) =>
          <Link to={url} key={_index} className="SteamHeader-PersonalTitles" onClick={() => ClickLink(url)}>
            <span className='SteamHeader-PersonalTitlesText'>{name}</span>
          </Link>
        )}
        <AccountHeader />
      </div>
      <div id="SteamHeaderLoader" aria-checked={loader === 100 || loader === 0} style={{ width: `${loader}%` }} />
    </header>
  )
}
