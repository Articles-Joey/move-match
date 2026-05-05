"use client"
import { useEffect, useContext, useState, useRef, useMemo } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic'

import useFullscreen from '@/hooks/useFullScreen';

import LeftPanelContent from '@/components/UI/LeftPanel';
import { useSocketStore } from '@/hooks/useSocketStore';

import GameMenu from '@articles-media/articles-dev-box/GameMenu';
import { useStore } from '@/hooks/useStore';
import classNames from 'classnames';
import SinglePlayerHandler from '@/components/Handlers/SinglePlayerHandler';
import UiOverlay from '@/components/UI/UiOverlay';
import GameOverModal from '@/components/UI/GameOverModal';

const GameCanvas = dynamic(() => import('@/components/Game/GameCanvas'), {
    ssr: false,
});

export default function MoveMatchGamePage() {

    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries());
    const { server } = params

    const {
        socket
    } = useSocketStore(state => ({
        socket: state.socket
    }));

    const sidebar = useStore((state) => state.sidebar)
    const nickname = useStore((state) => state.nickname)
    const sceneKey = useStore((state) => state.sceneKey)
    const menuOpen = useStore((state) => state.menuOpen)

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

            <GameOverModal />

            <SinglePlayerHandler />

            <div className='canvas-wrap'>

                <UiOverlay />

                <GameCanvas
                    key={sceneKey}
                />

            </div>

        </div>
    );
}