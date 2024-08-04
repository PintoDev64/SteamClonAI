import { useLoaderData } from 'react-router-dom'

// Style
import './index.css'

import { Suspense, useContext, useEffect } from 'react'
import HomeContent from './components/content'
import { CompleteTransition } from 'hooks'
import { PageTransitionContext } from 'context'


type HomePageProps = { bannerEvent?: string }
export default function HomePage({ bannerEvent }: HomePageProps) {

    const RequestData = useLoaderData() as RequestAPI.Home_APIStore

    console.log(RequestData);
    

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    useEffect(() => {
        CompleteTransition(ModifyPageTransition)
    }, [])

    useEffect(() => {
        document.title = `Tienda - Steam AI`
    }, [])

    return (
        <div id="HomePage">
            <Suspense fallback={<>Cargando</>}>
                <HomeContent bannerEvent={bannerEvent} {...RequestData} />
            </Suspense>
        </div>
    )
}