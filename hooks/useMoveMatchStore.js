// import { create } from 'zustand'
import { createWithEqualityFn as create } from 'zustand/traditional'

export const useMoveMatchStore = create((set) => ({

    moves: [],
    setMoves: (newValue) => {
        set((prev) => ({
            moves: newValue
        }))
    },
    addMove: (newValue) => {
        set((prev) => ({
            moves: [
                ...prev,
                newValue
            ]
        }))
    },

}))

// export const useControlsStore = create((set) => ({
//     touchControls: {
//         jump: false,
//         left: false,
//         right: false
//     },
//     setTouchControls: (newValue) => {
//         set((prev) => ({
//             touchControls: newValue
//         }))
//     }
// }))