"use client"
import { useEffect, useContext, useState } from 'react';

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import ArticlesButton from '@/components/UI/Button';
import IsDev from '@/components/UI/IsDev';
import { useSocketStore } from '@/hooks/useSocketStore';

import NicknameInput from '@articles-media/articles-dev-box/NicknameInput';
import GameMenuPrimaryButtonGroup from '@articles-media/articles-dev-box/GameMenuPrimaryButtonGroup';
import { useStore } from '@/hooks/useStore';

import SessionButton from '@articles-media/articles-dev-box/SessionButton';
const ReturnToLauncherButton = dynamic(() =>
    import('@articles-media/articles-dev-box/ReturnToLauncherButton'),
    { ssr: false }
);
const Ad = dynamic(() =>
    import('@articles-media/articles-dev-box/Ad'),
    { ssr: false }
);

import useUserDetails from '@articles-media/articles-dev-box/useUserDetails';
import useUserToken from '@articles-media/articles-dev-box/useUserToken';

export default function MoveMatchGameLobbyPage() {

    const {
        socket,
    } = useSocketStore(state => ({
        socket: state.socket,
    }));

    const lobbyDetails = useStore((state) => state.lobbyDetails)
    const darkMode = useStore((state) => state.darkMode)

    const {
        data: userToken,
        error: userTokenError,
        isLoading: userTokenLoading,
        mutate: userTokenMutate
    } = useUserToken(
        process.env.NEXT_PUBLIC_GAME_PORT
    );

    const {
        data: userDetails,
        error: userDetailsError,
        isLoading: userDetailsLoading,
        mutate: userDetailsMutate
    } = useUserDetails({
        token: userToken
    });

    useEffect(() => {

        socket.on('game:move-match-landing-details', function (msg) {
            console.log('game:move-match-landing-details', msg)

            if (JSON.stringify(msg) !== JSON.stringify(lobbyDetails)) {
                setLobbyDetails(msg)
            }
        });

        socket.on('game:move-match:test', function (msg) {
            console.log('game:move-match:test', msg)
        });

        return () => {
            socket.off('game:move-match-landing-details');
            socket.off('game:move-match:test');
        };

    }, [])

    useEffect(() => {

        if (socket.connected) {
            socket.emit('join-room', 'game:move-match-landing');
        }

        return function cleanup() {
            socket.emit('leave-room', 'game:move-match-landing')
        };

    }, [socket.connected]);

    return (

        <div className="move-match-lobby-page">

            <div className='background-wrap'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_CDN}games/Move Match/background.jpg`}
                    alt=""
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                />
            </div>

            <div className="container d-flex flex-column-reverse flex-lg-row justify-content-center align-items-center py-3">

                <div
                    className=''
                    style={{ "width": "20rem" }}
                >

                    <div className='logo-wrap'>

                        <IconCycle />

                        <h1 className='caveat-brush-regular mb-0'>
                            {process.env.NEXT_PUBLIC_GAME_NAME}
                        </h1>

                    </div>

                    <div className="card card-articles mb-3">

                        {/* <div style={{ position: 'relative', height: '200px' }}>
                            <Image
                                src={Logo}
                                alt=""
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div> */}

                        <div className="card-header">

                            <NicknameInput
                                useStore={useStore}
                            />

                        </div>

                        <div className="card-body">

                            <div className="fw-bold mb-1 small text-center">
                                {lobbyDetails?.players?.length || 0} player{lobbyDetails?.players?.length > 1 && 's'} in the lobby.
                            </div>

                            {/* <div className='small fw-bold'>Public Servers</div> */}

                            <div className="servers">

                                {[1, 2, 3, 4].map(id => {

                                    let lobbyLookup = lobbyDetails?.fourFrogsGlobalState?.games?.find(lobby =>
                                        parseInt(lobby.server_id) == id
                                    )

                                    return (
                                        <div key={id} className="server">

                                            <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
                                                <div className="mb-0" style={{ fontSize: '0.9rem' }}><b>Server {id}</b></div>
                                                <div className='mb-0'>{lobbyLookup?.players?.length || 0}/4</div>
                                            </div>

                                            <div className='d-flex justify-content-around w-100 mb-1'>
                                                {[1, 2, 3, 4].map(player_count => {

                                                    let playerLookup = false

                                                    if (lobbyLookup?.players?.length >= player_count) playerLookup = true

                                                    return (
                                                        <div key={player_count} className="icon" style={{
                                                            width: '20px',
                                                            height: '20px',
                                                            ...(playerLookup ? {
                                                                backgroundColor: 'black',
                                                            } : {
                                                                backgroundColor: 'gray',
                                                            }),
                                                            border: '1px solid black'
                                                        }}>

                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <Link
                                                className={``}
                                                href={{
                                                    pathname: `/play`,
                                                    query: {
                                                        server: id
                                                    }
                                                }}
                                            >
                                                <ArticlesButton
                                                    small
                                                    className="px-5"
                                                >
                                                    Join
                                                </ArticlesButton>
                                            </Link>

                                        </div>
                                    )
                                })}

                            </div>

                            {/* <div className='small fw-bold  mt-3 mb-1'>Or</div> */}

                            {/* <div className='d-flex'>
    
                                <ArticlesButton
                                    className={`w-50`}
                                    onClick={() => {
                                        // TODO
                                        alert("Coming Soon!")
                                    }}
                                >
                                    <i className="fad fa-robot"></i>
                                    Practice
                                </ArticlesButton>
    
                                <ArticlesButton
                                    className={`w-50`}
                                    onClick={() => {
                                        setShowPrivateGameModal(prev => !prev)
                                    }}
                                >
                                    <i className="fad fa-lock"></i>
                                    Private Game
                                </ArticlesButton>
    
                            </div> */}

                            <IsDev className={'mt-3'}>
                                <div>
                                    <ArticlesButton
                                        className="w-50 border"
                                        variant='warning'
                                        onClick={() => {
                                            socket.emit('game:move-match:reset', '');
                                        }}
                                    >
                                        Reset Server
                                    </ArticlesButton>
                                    <ArticlesButton
                                        className="w-50 border"
                                        variant='warning'
                                        onClick={() => {
                                            socket.emit('game:move-match:test', 3);
                                        }}
                                    >
                                        Move Gen
                                    </ArticlesButton>
                                </div>
                            </IsDev>

                        </div>

                        <div className="card-footer d-flex flex-wrap justify-content-center">

                            <GameMenuPrimaryButtonGroup
                                useStore={useStore}
                                type="Landing"
                            />

                        </div>

                    </div>

                    <SessionButton
                        port={process.env.NEXT_PUBLIC_GAME_PORT}
                        friendsButton={true}
                    />

                    <ReturnToLauncherButton />

                </div>

                <Ad
                    style="Default"
                    section={"Games"}
                    section_id={process.env.NEXT_PUBLIC_GAME_NAME}
                    darkMode={darkMode ? true : false}
                    user_ad_token={userToken}
                    userDetails={userDetails}
                    userDetailsLoading={userDetailsLoading}
                />

            </div>
        </div>
    );
}

function IconCycle() {
    const [currentIcon, setCurrentIcon] = useState(0)

    const icons = [
        <i className="fas fa-hand-point-up"></i>,
        <i className="fas fa-hand-point-right"></i>,
        <i className="fas fa-hand-point-down"></i>,
        <i className="fas fa-hand-point-left"></i>,
        <i className="fas fa-hand-peace"></i>,
        <i className="fas fa-hand-middle-finger"></i>,
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIcon(prev => (prev + 1) % icons.length)
        }, 250)
        return () => clearInterval(interval);
    }, [icons.length]);

    return (
        <div className='icon-cycle'>
            {icons[currentIcon]}
        </div>
    );
}