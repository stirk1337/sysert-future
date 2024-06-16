type RadioButtonProps = {
    id: string;
    value: string;
    name: string;
    selectedAnswer: string;
    onClick: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioButton({ id, value, name, selectedAnswer, onClick }: RadioButtonProps) {
    return (
        <div>
            <input onChange={onClick} type="radio" id={id} name={name} value={value} checked={value === selectedAnswer}></input>
            <label htmlFor={id}>
                <span className="radio-container"></span>
                {value}
            </label>
        </div>
    )
}

export default RadioButton