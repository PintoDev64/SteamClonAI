import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom'

// Components
import GameCover from './components/cover';
import GameDetails from './components/details';
import GameMain from './components/main';

// Hooks
import { CompleteTransition } from 'hooks';

// Context
import { PageTransitionContext } from 'context';

// Styles
import './index.css'

export default function GamePage() {

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    useEffect(() => CompleteTransition(ModifyPageTransition), [])

    const { images, name, about, categories, features, ...rest } = useLoaderData() as RequestAPI.GameAllData;

    useEffect(() => {
        document.title = `${name} - Steam AI`
    }, [name])


    return (
        <div id="GamePage" style={{ backgroundImage: `url(${images[1].url})` }}>
            <div id="GamePageContent">
                <GameCover Title={name} />
                <GameDetails categories={categories} images={images} name={name} {...rest} />
                <GameMain categories={categories} features={features} products={rest.products} name={name} platforms={rest.platforms} about={about} />
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
