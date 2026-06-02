import { createWithEqualityFn as create } from 'zustand/traditional'

export const useGameStore = create((set) => ({

    gameState: {},
    setGameState: (updater) => {
        set((prev) => ({
            gameState: updater
        }))
    },

}))