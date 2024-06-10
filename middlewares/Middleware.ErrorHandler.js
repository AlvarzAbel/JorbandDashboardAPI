const errorHandler = (res, error) => {
    return res.status(500)
        .json({
            result: error.message,
            Error: 'OK'
        })
}

module.exports = errorHandler;