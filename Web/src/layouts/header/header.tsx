// Styles
import { Link } from 'react-router-dom'
import { SearchIcon } from './assets'
import { HeaderPersonal, HeaderTitles } from './constants'
import './index.css'
import { GetActualPath } from './utils'

export default function Header() {

  enum States {
    Active = "Active",
    Desactive = "Desactive"
  }

  return (
    <header id="SteamHeader">
      <div id="SteamHeader-Pages">
        {HeaderTitles.map(({ name, url }, _index) =>
          <Link to={url} key={_index} className={`SteamHeader-PagesTitles ${GetActualPath() ? States.Active : States.Desactive}`}>
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
          <Link to={url} key={_index} className="SteamHeader-PersonalTitles">
            <span className='SteamHeader-PersonalTitlesText'>{name}</span>
          </Link>
        )}
      </div>
    </header>
  )
}
