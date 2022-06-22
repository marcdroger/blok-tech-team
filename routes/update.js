const updateStudent = require("../controller/modules/updateStudent");

async function updateUser(req, res) {
  updateStudent({_id: req.body.id}, req.body) ? res.redirect('/account') : res.redirect('/404')
}

module.exports = updateUser