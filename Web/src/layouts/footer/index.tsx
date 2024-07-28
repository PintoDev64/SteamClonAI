import { FacebookLogo, SteamLogo, TwitterXLogo } from './assets'
import { AboutLinks } from './constants'
import './index.css'

export default function Footer() {
  return (
    <footer id="SteamFooter">
      <div id="SteamFooter-CompanyDeclaration">
        <div id="SteamFooter-CompanyDeclarationLogos">
          <img src="/ValveLogo.png" alt="Valve Corporation" />
          <SteamLogo />
        </div>
        <div id="SteamFooter-CompanyDeclarationDescription">
          <span id='SteamFooter-CompanyDeclarationDescription-Text'>
            © 2024 Valve Corporation. Todos los derechos reservados. Todas las marcas registradas pertenecen a sus respectivos dueños en EE. UU. y otros países.<br />
            Todos los precios incluyen IVA (donde sea aplicable).
          </span>
        </div>
      </div>
      <div id="SteamFooter-AboutLinks">
        <div className="SteamFooter-AboutLinks-Element">
          {AboutLinks[0].map(({ Text, Url }) =>
            <a className='SteamFooter-AboutLinks-ElementAnchor' href={Url}>{Text}</a>
          )}
        </div>
        <div className="SteamFooter-AboutLinks-Element">
          {AboutLinks[0].map(({ Text, Url }) =>
            <a className='SteamFooter-AboutLinks-ElementAnchor' href={Url}>{Text}</a>
          )}
        </div>
      </div>
      <div id="SteamFooter-SocialLinks">
        <a target='_blank' href='https://www.facebook.com/Steam' className="SteamFooter-SocialLinks-Element">
          <FacebookLogo />
        </a>
        <a target='_blank' href='https://x.com/steam' className="SteamFooter-SocialLinks-Element">
          <TwitterXLogo />
        </a>
      </div>
    </footer>
  )
}