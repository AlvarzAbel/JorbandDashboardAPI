export const onChangeFunc = (e: any, data: any, setData: any, ) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
}