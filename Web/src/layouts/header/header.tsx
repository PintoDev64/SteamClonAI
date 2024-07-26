// Styles
import { SearchIcon } from './assets'
import { HeaderPersonal, HeaderTitles } from './constants'
import './index.css'
import { GetActualPath } from './utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type HeaderProps = { X: number }
export default function Header() {

  enum States {
    Active = "Active",
    Desactive = "Desactive"
  }

  return (
    <header id="SteamHeader">
      <div id="SteamHeader-Pages">
        {HeaderTitles.map(({ name, url }, _index) =>
          <div key={_index} className={`SteamHeader-PagesTitles ${GetActualPath(url) ? States.Active : States.Desactive}`}>
            <span className='SteamHeader-PagesTitlesText'>{name}</span>
          </div>
        )}
      </div>
      <div id="SteamHeader-Search">
        <input id='SteamHeader-SearchInput' placeholder='Buscar...' type="search" name="browse" />
        <div id="SteamHeader-SearchIcon">
          <SearchIcon />
        </div>
      </div>
      <div id="SteamHeader-Personal">
        {HeaderPersonal.map(({ name }, _index) =>
          <div key={_index} className="SteamHeader-PersonalTitles">
            <span className='SteamHeader-PersonalTitlesText'>{name}</span>
          </div>
        )}
      </div>
    </header>
  )
}
