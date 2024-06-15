import { useEffect, useRef } from "react";

type ResultBlockProps = {
    progress: number;
    onClose: () => void;
}

function ResultBlock({ progress, onClose }: ResultBlockProps) {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const setProgress = (element: HTMLDivElement, value: number) => {
            element.style.setProperty('--progress', value.toString());
        };

        const progressElement = progressRef.current;

        if (progressElement) {
            let start: number | null = null;
            const duration = 1000;

            const animateProgress = (timestamp: number) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;

                const currentProgress = Math.min((elapsed / duration) * progress, progress);
                setProgress(progressElement, currentProgress);

                if (elapsed < duration) {
                    requestAnimationFrame(animateProgress);
                }
            };

            requestAnimationFrame(animateProgress);
        }
    }, []);

    return (
        <div className="progress-block">
            <div className="questions-menu"></div>
            <h2>Результат</h2>
            <div className="circular-progress" id="progress" ref={progressRef}>
                <svg width="250" height="250">
                    <circle className="bg" />
                    <circle className="fg" />
                </svg>
                <p>{progress}%</p>
            </div>
            <button onClick={onClose}>Закрыть</button>
        </div>
    )
}

export default ResultBlock;