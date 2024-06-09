import { useEffect, useState } from "react";

type SuccessCardProps = {
    successCardData: SuccessDetector;
    addRef: (ref: HTMLElement) => void;
    handleClick: (id: string) => void;
}

function SuccessCard({ successCardData, addRef, handleClick }: SuccessCardProps) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const storageProgress = localStorage.getItem(successCardData.id)
        if (storageProgress) {
            setProgress(Number(storageProgress))
        }
    })

    return (
        <li onClick={() => handleClick(successCardData.id)} ref={(el) => { addRef(el as HTMLElement) }} className="success-item">
            <h3>{successCardData.title}</h3>
            <div className="progress" style={{ '--progress': 100 - progress + '%' } as React.CSSProperties}>
                <p>{progress}%</p>
            </div>
            <p className="description">{successCardData.description}</p>
        </li>
    )
}

export default SuccessCard