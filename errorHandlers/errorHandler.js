module.exports = (err, request, response, next) => {
    if(err.status_code){
        response.status(err.status_code).json(err)
    }else{
        response.status(500).json({
            status_code: 500,
            type: 'System Error',
            err
        })
    }
}