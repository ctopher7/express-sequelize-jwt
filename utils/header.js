const headerApi = function(req,res,next){
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': -1,
        'X-Permitted-Cross-Domain-Policies': 'master-only',
        'Content-Security-Policy': `default-src 'self',report-uri /csp_report_parser`
    })
    next()
}

module.exports = {headerApi}