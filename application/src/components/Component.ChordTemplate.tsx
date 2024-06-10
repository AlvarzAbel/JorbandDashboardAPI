export const ChordTemplate = ({ rowData }: any) => {
    return (
        <>
            {rowData.chord.map((chord: any, i: any) => {
                return <small key={i} style={{ display: 'block' }}>{chord}</small>
            })}
        </>
    )
}
