// Styles
import './index.css'

// Assets
import { DownArrow } from './assets'
import { useContext, useEffect, useRef, useState } from 'react'
import { PageTransitionContext, UserContext } from 'context'
import { URL_API } from '@constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ModifyTransition } from 'hooks'

export default function AccountHeader() {

    const { pathname } = useLocation()

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const navigate = useNavigate()

    const CheckBox = useRef<HTMLInputElement>(null!)

    const { User, EditUser } = useContext(UserContext)

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function CloseSession() {
        CheckBox.current.click()
        fetch(`${URL_API}/api/v1/profile/close`, { credentials: "include" })
            .then(() => window.location.reload())
            .catch(err => console.log(err.message))
    }

    async function MoreCurrency() {
        CheckBox.current.click()
        ModifyTransition(ModifyPageTransition)
        fetch(`${URL_API}/api/v1/profile/currency`, {
            credentials: "include",
            method: "put",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(() => { navigate("/") })
            .catch(err => console.log(err.message))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${URL_API}/api/v1/profile/verify`, {
                    method: "post",
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

                EditUser({
                    Name: result.PROFILE_NAME,
                    Picture: result.PROFILE_PICTURE,
                    Currency: result.CURRENCY,
                    PublicId: result.PUBLIC_ID,
                    Library: result.LIBRARY,
                    Wishlist: result.WISHLIST
                });
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pathname])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (navigator.userAgent === "SteamClient_xyz") return

    if (User.PublicId) return (
        <div id="AccountHeader">
            <div id='AccountHeaderGroup' onClick={() => CheckBox.current.click()}>
                <input type="checkbox" id="AccountHeaderDropdown" aria-hidden hidden ref={CheckBox} />
                <img id='AccountHeaderImage' fetchPriority="high" src={User.Picture} />
                <span id='AccountHeaderName'>{User.Name}</span>
                <span id='AccountHeaderCurrency'>${User.Currency}</span>
                <div id="AccountHeaderArrow">
                    <DownArrow />
                </div>
            </div>
            <div id="AccountHeaderOptions">
                <Link to={`/profile/${User.PublicId}`} className='AccountHeaderOptions-Element' onClick={() => CheckBox.current.click()}>
                    Ir a tu perfil
                </Link>
                <button className="AccountHeaderOptions-Element" onClick={MoreCurrency}>
                    añadir 10 usd
                </button>
                <button className="AccountHeaderOptions-Element" onClick={CloseSession}>
                    Cerrar sesion
                </button>
            </div>
        </div>
    )

    return (
        <Link to="/login">
            <div id="AccountHeader">
                <span id='AccountHeaderName'>LOGIN</span>
            </div>
        </Link>
    )
}