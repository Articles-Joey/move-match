import { memo, useEffect, useState } from "react";
import { useAddMove } from "@/hooks/useAddMove";

function TouchControls() {

    const addMove = useAddMove();

    return (
        <div className="touch-controls">
            <div className="orb" onClick={() => addMove('Up')}>
                <i className="fas fa-hand-point-up"></i>
            </div>
            <div className="orb" onClick={() => addMove('Right')}>
                <i className="fas fa-hand-point-right"></i>
            </div>
            <div className="orb" onClick={() => addMove('Down')}>
                <i className="fas fa-hand-point-down"></i>
            </div>
            <div className="orb" onClick={() => addMove('Left')}>
                <i className="fas fa-hand-point-left"></i>
            </div>
        </div>
    )
}

export default TouchControls