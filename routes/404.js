function pageNotFound(req, res){
 res.status(404).render('404')
}

module.exports = pageNotFound