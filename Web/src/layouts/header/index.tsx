// Styles
import { Link, useLocation } from 'react-router-dom'
import { SearchIcon } from './assets'
import Constans from './constants'
import './index.css'
import { GetActualPath } from '@utils'
import { ChangeEvent, useContext, useState } from 'react'
import { PageTransitionContext } from 'context'
import { ModifyTransition } from 'hooks'
import AccountHeader from '@components/account'
import { URL_API } from '@constants'

export default function Header() {

  const { HeaderPersonal, HeaderTitles } = Constans()

  const { pathname } = useLocation()

  const { loader, ModifyPageTransition } = useContext(PageTransitionContext)

  const [SearchElements, setSearchElements] = useState([])

  enum States {
    Active = "Active",
    Desactive = "Desactive"
  }

  function ClickLink(url: string) {
    url !== pathname && ModifyTransition(ModifyPageTransition)
  }

  async function CreateSearch(event: ChangeEvent<HTMLInputElement>) {
    const SearchQuery = event.target.value
    if (SearchQuery.length === 0) return
    const ResponseSearch = await fetch(`${URL_API}/api/v1/search?QuerySearch=${SearchQuery}`, {
      credentials: "include"
    })
    const { data } = await ResponseSearch.json()
    setSearchElements(data);
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
        <input id='SteamHeader-SearchInput' aria-autocomplete='none' onChange={CreateSearch} placeholder='Buscar...' type="search" name="browse" />
        <div id="SteamHeader-SearchIcon">
          <SearchIcon />
        </div>
        <div id="SteamHeader-SearchElements">
          {SearchElements.map(({ name, idGame, icon }) => {
            return (
              <Link to={`/game/${idGame}`} onClick={() => ClickLink(`/game/${idGame}`)} className="SteamHeader-SearchElements-Result">
                <img className='SteamHeader-SearchElements-ResultImage' src={icon} alt={name} width={35} height={35}/>
                <span className="SteamHeader-SearchElements-ResultTitle">
                  {name}
                </span>
              </Link>
            )
          })}
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
