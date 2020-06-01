const MSXParser = require('../core/MSXParser/parser.js')
const {readFileSync: rfs} = require('fs')
const {join} = require('path')

module.exports = (req, res, next) => {

	if (!req.session.user) {
		if (req.url !== "/") {
			res.redirect("/admin")
		} else if (req.url === "/" && req.method === "GET") {
			message = req.session.message || ""
			req.session.message = null
			res.end(
				new MSXParser(rfs(join(__dirname, "static", "auth.msx"), "utf8")).parse({
					errormess: message
				})
			)
		} else if (req.url === "/" && req.method === "POST") {
			const {login, password} = req.body

			if (login === "MDReal" && password === "123123123") {
				req.session.user = {
					username: login,
					password
				}
			} else {
				req.session.message = "Login or PassWord is not correct"
			}
			res.redirect("/admin")
		}
	} else {
		next()
	}
}