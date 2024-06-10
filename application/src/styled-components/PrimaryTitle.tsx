
interface Props {
    title: string;
}

export const PrimaryTitle = ({ title }: Props) => {
    return (
        <h2>{title}</h2>
    )
}
