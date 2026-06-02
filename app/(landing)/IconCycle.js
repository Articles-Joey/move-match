import { useEffect, useState } from "react";

export default function IconCycle() {
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