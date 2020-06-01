const {Router} = require('express')
const {join} = require('path')
const fs = require('fs')
const error404 = require('./error404')
const router = Router()

router
	.get("/:jsfile.js", (req, res) => {
		let jsFile;

		try {
			jsFile = fs.readFileSync(join(__dirname, `static`, `assets`, `js`, `${req.params.jsfile}.js`), 'utf8')
		} catch(e) {
			res.status(404).end(error404)
		}

		res.end(jsFile)
	})

module.exports = router