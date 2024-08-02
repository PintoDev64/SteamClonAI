// Styles
import './index.css'

// Assets
import { DownArrow } from './assets'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from 'context'
import { URL_API } from '@constants'
import { Link } from 'react-router-dom'

export default function AccountHeader() {

    const { User, EditUser } = useContext(UserContext)

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Token = localStorage.getItem("Token")
                const response = await fetch(`${URL_API}/api/v1/profile/verify`, {
                    method: "post",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ Token })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

                console.log(result);

                EditUser({
                    Name: result.PROFILE_NAME,
                    Picture: result.PROFILE_PICTURE,
                    Currency: result.CURRENCY,
                    PublicId: result.PUBLIC_ID
                });
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const Images = ["https://avatars.githubusercontent.com/u/84690368?v=4", "https://i.scdn.co/image/ab6775700000ee8515075c507ea1f95ece85a305", "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"]

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (navigator.userAgent === "SteamClient_xyz") return

    if (User.PublicId) return (
        <div id="AccountHeader">
            <img id='AccountHeaderImage' fetchPriority="high" src={Images[User.Picture]} />
            {User.PublicId
                ? <>
                    <span id='AccountHeaderName'>{User.Name}</span>
                    <span id='AccountHeaderCurrency'>${User.Currency}</span>
                </>
                : <span id='AccountHeaderName'>LOGIN</span>
            }
            <div id="AccountHeaderArrow">
                <DownArrow />
            </div>
        </div>
    )

    return (
        <Link to="/login">
            <div id="AccountHeader">
                <img id='AccountHeaderImage' fetchPriority="high" src={Images[User.Picture]} />
                {User.PublicId
                    ? <>
                        <span id='AccountHeaderName'>{User.Name}</span>
                        <span id='AccountHeaderCurrency'>${User.Currency}</span>
                    </>
                    : <span id='AccountHeaderName'>LOGIN</span>
                }
                <div id="AccountHeaderArrow">
                    <DownArrow />
                </div>
            </div>
        </Link>
    )
}