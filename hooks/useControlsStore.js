// import { create } from 'zustand'
import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist, createJSONStorage } from 'zustand/middleware'

const defaultMappings = {
    "Up": ['KeyW', 'ArrowUp'],
    "Down": ['KeyS', 'ArrowDown'],
    "Left": ['KeyA', 'ArrowLeft'],
    "Right": ['KeyD', 'ArrowRight'],
    'Start Game': ['Space', 'Enter'],
}

export const useControlsStore = create()(
    persist(
        (set, get) => ({

            hasHydrated: false,
            setHasHydrated: (val) => set({ hasHydrated: val }),



            mappings: defaultMappings,
            setMapping: (action, key) => {
                set((prev) => ({
                    mappings: {
                        ...prev.mappings,
                        [action]: key
                    }
                }))
            },
            clearMapping: (action) => {
                set((prev) => ({
                    mappings: {
                        ...prev.mappings,
                        [action]: null
                    }
                }))
            },
            resetControls: () => {
                set({
                    mappings: defaultMappings
                })
            },

        }),
        {
            name: 'controls-store', // name of the item in the storage (must be unique)
            version: 3,
            onRehydrateStorage: (state) => {
                return () => state.setHasHydrated(true)
            },
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => ![
                        'hasHydrated'
                    ].includes(key))
                ),
        },
    ),
)