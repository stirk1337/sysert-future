type PreviewSuccessDotProps = {
    isBig: boolean;
}

function PreviewSuccessDot({ isBig }: PreviewSuccessDotProps) {
    const dotType = isBig ? 'big' : 'small';
    return (
        <div className={`success-dot ${dotType}`}></div>
    )
}

export default PreviewSuccessDot