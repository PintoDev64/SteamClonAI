// Styles
import { useLoaderData } from 'react-router-dom'
import './index.css'
import GameCover from './components/cover';
import GameDetails from './components/details';
import { CompleteTransition } from 'hooks';
import { useContext, useEffect } from 'react';
import { PageTransitionContext } from 'context';

export default function GamePage() {

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    useEffect(() => CompleteTransition(ModifyPageTransition), [])

    const { images, name, ...rest } = useLoaderData() as RequestAPI.GameAllData;

    return (
        <div id="GamePage" style={{ backgroundImage: `url(${images[1].url})` }}>
            <div id="GamePageContent">
                <GameCover Title={name} />
                <GameDetails images={images} name={name} {...rest} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}
