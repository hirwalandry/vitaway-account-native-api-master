// handling async await with try and catch error handling
//try will handle req and res of data in all route
//catch handles error of route to be thrown 
// this handles recode try and catch in your routers
const asyncMiddleware = (handling) => {
    return async(req, res, next) => {
        try {
            await handling(req, res)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncMiddleware