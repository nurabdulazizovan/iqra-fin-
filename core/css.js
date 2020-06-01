const {Router} = require('express')
const {join} = require('path')
const fs = require('fs')
const router = Router()
const error404 = require('./error404')

router
	.get("/:cssfile.css", (req, res) => {
		let cssFile;

		try {
			cssFile = fs.readFileSync(join(__dirname, `static`, `assets`, `css`, `${req.params.cssfile}.css`), 'utf8')
		} catch(e) {
			res.status(404).end(error404)
		}

		res.end(cssFile)
	})

module.exports = router