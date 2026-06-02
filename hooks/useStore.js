import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import typicalZustandStoreExcludes from '@articles-media/articles-dev-box/typicalZustandStoreExcludes';
import typicalZustandStoreStateSlice from '@articles-media/articles-dev-box/typicalZustandStoreStateSlice';

import generateRandomNickname from '@/util/generateRandomNickname';
import { randomColorMaterial, randomSkinColorMaterial } from '@/components/Models/Man';

export const useStore = create()(
  persist(
    (set, get) => ({

      ...typicalZustandStoreStateSlice(set, get, generateRandomNickname),

      characterCustomizationModal: false,
      setCharacterCustomizationModal: (value) => set({ characterCustomizationModal: value }),

      characterCustomization: {
        skin: randomSkinColorMaterial(),
        hair: randomColorMaterial(),
        shirt: randomColorMaterial(),
        shorts: randomColorMaterial(),
        shoes: "#000000",
      },

      resetCharacterCustomization: () => set({
        characterCustomization: {
          skin: randomSkinColorMaterial(),
          hair: randomColorMaterial(),
          shirt: randomColorMaterial(),
          shorts: randomColorMaterial(),
          shoes: "#000000",
        }
      }),

    }),
    {
      name: `${process.env.NEXT_PUBLIC_GAME_KEY}-site-storage`,
      version: 3,
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      },
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ![
            ...typicalZustandStoreExcludes,
            "characterCustomizationModal",
          ].includes(key))
        ),
    },
  ),
)