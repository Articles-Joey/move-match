"use client"
import { useEffect, useContext, useState } from 'react';

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { useSocketStore } from '@/hooks/useSocketStore';

import { useStore } from '@/hooks/useStore';

import IconCycle from './IconCycle';

import PageTemplateLandingPage from '@articles-media/articles-dev-box/PageTemplateLandingPage';
import RotatingMascot from '@/components/UI/RotatingMascot';
import ArticlesButton from '@/components/UI/Button';
import { useGameStore } from '@/hooks/useGameStore';

const backgroundImage = `img/preview.webp`;
const LandingBackgroundAnimation = dynamic(() =>
    import('@/components/Game/LandingBackgroundAnimation'),
    {
        ssr: false,
        loading: () => <img
            src={backgroundImage.src}
            alt=""
            // fill
            style={{ objectFit: 'cover', objectPosition: 'center', filter: 'blur(10px)' }}
        />
    }
);

export default function MoveMatchGameLobbyPage() {

    const characterImagePreview = useStore((state) => state.characterImagePreview)
    const darkMode = useStore((state) => state.darkMode)

    const setGameState = useGameStore(state => state.setGameState)

    useEffect(() => {
        setGameState({
            status: 'In Lobby',
        })
    }, [])

    return (
        <>
            <PageTemplateLandingPage
                useSocketStore={useSocketStore}
                useStore={useStore}
                RotatingMascot={
                    <RotatingMascot
                        forceCharacterSettings={true}
                    />
                }
                Link={Link}
                // logoImage={logo.src}
                LandingBackgroundAnimation={
                    <LandingBackgroundAnimation />
                }
                // CardBodyOverride={<>
                // </>}
                heroOverride={<>
                    <div className='logo-wrap'>

                        <IconCycle />

                        <h1 className='caveat-brush-regular mb-0'>
                            {process.env.NEXT_PUBLIC_GAME_NAME}
                        </h1>

                    </div>
                </>}
                // disableHero                
                backgroundImage={backgroundImage.src}
                CardBodyPrependContent={<>
                    {/* <div className='mb-2 border-bottom pb-2'>
                        <Link href={"/play?local_play=true"} className="w-100">
                            <ArticlesButton
                                className="w-100"
                            >
                                <i className='fas fa-gamepad-alt fa-lg me-2'></i>
                                Local Play
                                <span className='ms-2 badge bg-dark' style={{ scale: '1.1' }}>Works offline!</span>
                            </ArticlesButton>
                        </Link>
                        <div className='small text-center'>Play with 2 to 4 gamepads locally.</div>
                        <ConnectedControllersPreview />
                    </div> */}
                </>}
                singlePlayerConfig={{

                }}
                NicknameInputConfig={{
                    PreComponent: <div className='d-flex flex-column align-items-center justify-content-center me-2'>

                        {characterImagePreview ?
                            <img
                                src={characterImagePreview}
                                alt="Character Preview"
                                style={{
                                    width: '30px',
                                    height: '50px',
                                    objectFit: 'cover',
                                }}
                            />
                            :
                            <i className="fas fa-user fa-lg me-0 fa-3x"></i>
                        }

                        <ArticlesButton
                            small
                            onClick={() => {
                                useStore.getState().setCharacterCustomizationModal(true)
                            }}
                        >
                            Edit
                        </ArticlesButton>
                    </div>
                }}
                multiplayerConfig={{
                    type: "WebSocket",
                    // comingSoon: true,
                    defaultServers: 2,
                    // privateServerSupport: false,
                    onlinePlayersTemplate: "2.0"
                }}
                gameScoreboardConfig={{
                    append_score_text: "m",
                    metrics: [
                        // {
                        //     label: 'Players Killed',
                        //     key: "score",
                        //     format: (value) => `${value} m`
                        // },
                        {
                            label: 'Games Won',
                            key: "games_won",
                            format: (value) => `${value} m`
                        }
                    ]
                }}
                // brandingTextClass="jaro-primary"
                disableGameScoreboard={process.env.NEXT_PUBLIC_ENABLE_ARTICLES !== 'true'}
                disableAd={process.env.NEXT_PUBLIC_ENABLE_ARTICLES !== 'true'}
            />
        </>
    );
}