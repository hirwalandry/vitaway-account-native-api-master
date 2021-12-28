// not found error
const error_404 = (req, res, next) => {
    const error = new Error('not found')
    error.status = 404
    next(error)
}
// all error catched in here
const errors = (error, req, res, next) => {
    res.status(error.status || 500)
    res.send({
        error: {
            message: error.message
        }
    })
}
module.exports = {
    error_404,
    errors
}