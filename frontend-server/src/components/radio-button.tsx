type RadioButtonProps = {
    id: string;
    value: string;
    name: string;
    onClick: () => void;
}

function RadioButton({ id, value, name, onClick }: RadioButtonProps) {
    return (
        <div>
            <input onChange={onClick} type="radio" id={id} name={name} value={value}></input>
            <label htmlFor={id}>
                <span className="radio-container"></span>
                {value}
            </label>
        </div>
    )
}

export default RadioButton