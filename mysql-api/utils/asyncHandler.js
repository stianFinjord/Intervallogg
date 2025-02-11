export default function asyncHandler(fn) { //Idk how this works but it's a wrapper for error handling
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}