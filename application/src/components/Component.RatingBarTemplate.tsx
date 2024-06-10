export const RatingBarTemplate = ({ rowData, amount, i }: any) => {
    const percentaje = parseFloat(((rowData.usage / amount) * 100).toFixed(0));
    return (
        <div className="container-bar" key={i}>
            <div style={{
                width: `${percentaje}%`,
                height: '10px',
                backgroundColor: percentaje > 50 ? 'red' : (percentaje > 40 && percentaje < 50) ? 'yellow' : '#1aff1a',
                borderRadius: '5px',

            }}>
            </div>
            {`${percentaje}%`}
        </div >
    )
};