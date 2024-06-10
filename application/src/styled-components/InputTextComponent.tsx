interface Props {
    name: string;
    placeholder?: string;
    type: string;
    className: string;
    onChange: (value: any) => void;
}
export const InputTextComponent = ({ name, placeholder, type, onChange, className }: Props) => {
    return (

        <input
            className={className ? className : 'form-input'}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}
