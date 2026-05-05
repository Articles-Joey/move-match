"use client"
import { useEffect, useContext, useState, useRef, useMemo } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic'

import useFullscreen from '@/hooks/useFullScreen';

import LeftPanelContent from '@/components/Game/LeftPanel';
import { useSocketStore } from '@/hooks/useSocketStore';

import GameMenu from '@articles-media/articles-dev-box/GameMenu';
import { useStore } from '@/hooks/useStore';
import classNames from 'classnames';

const GameCanvas = dynamic(() => import('@/components/Game/GameCanvas'), {
    ssr: false,
});

export default function MoveMatchGamePage() {

    const {
        socket
    } = useSocketStore(state => ({
        socket: state.socket
    }));

    const sidebar = useStore((state) => state.sidebar)
    const nickname = useStore((state) => state.nickname)
    const sceneKey = useStore((state) => state.sceneKey)
    const menuOpen = useStore((state) => state.menuOpen)

    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries());
    const { server } = params

    useEffect(() => {

        if (server && socket.connected) {
            socket.emit('join-room', `game:move-match-room-${server}`, {
                game_id: server,
                nickname: nickname,
                client_version: '1',

            });
        }

        return function cleanup() {
            socket.emit('leave-room', `game:move-match-room-${server}`)
        };

    }, [server, socket.connected, nickname]);

    return (

        <div
            className={classNames(
                `${process.env.NEXT_PUBLIC_GAME_KEY}-game-page`,
                {
                    'menu-open': menuOpen,
                    'fullscreen': useFullscreen().isFullscreen,
                    'show-sidebar': sidebar,
                }
            )}
            id={`${process.env.NEXT_PUBLIC_GAME_KEY}-game-page`}
        >

            <GameMenu
                useStore={useStore}
                LeftPanelContent={LeftPanelContent}
                menuBarConfig={{
                    style: "Corner Button",
                    menuBarButtonPosition: "Left"
                }}
                sidebarConfig={{
                    style: "Static Panel",
                }}
            />

            {/* <div className="menu-bar card card-articles p-1 justify-content-center">

                <div className='flex-header align-items-center'>

                    <ArticlesButton
                        small
                        active={showMenu}
                        onClick={() => {
                            setShowMenu(prev => !prev)
                        }}
                    >
                        <i className="fad fa-bars"></i>
                        <span>Menu</span>
                    </ArticlesButton>

                    <div>

                    </div>

                </div>

            </div> */}

            {/* <div className={`mobile-menu ${showMenu && 'show'}`}>
                <LeftPanelContent
                    {...panelProps}
                />
            </div> */}

            {/* <TouchControls
                touchControlsEnabled={touchControlsEnabled}
            /> */}

            {/* <div className='panel-left card rounded-0 d-none d-lg-flex'>

                <LeftPanelContent
                    {...panelProps}
                />

            </div> */}

            {/* <div className='game-info'>
                <div className="card card-articles card-sm">
                    <div className="card-body">
                        <pre> 
                            {JSON.stringify(playerData, undefined, 2)}
                        </pre>
                    </div>
                </div>
            </div> */}

            <div className='canvas-wrap'>

                <GameCanvas
                    key={sceneKey}
                    // gameState={gameState}
                    // playerData={playerData}
                    // setPlayerData={setPlayerData}
                    // players={players}
                />

            </div>

        </div>
    );
}