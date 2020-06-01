const fs = require('fs')
const {join} = require('path')
let u = 0;
const proms = async (c, q) => {
	return new Promise(res => {
		c.query(q, (err, result) => {
			if (err)
				throw err;
			res(result)
		})
	})
}

const postInstallation = (req, res, next) => {
	if (req.customData.postInstallation) {
		const sql = fs.readFileSync(join(__dirname, "../GameShop.az.sql"), "utf8");
		const matches = sql.match(/CREATE TABLE[\s\S]+?ENGINE=InnoDB;/g)
		matches.forEach(e => {
			try {
				proms(req.customData.dbConnection, e).then(x => {
					u++;
					if (u >= matches.length) {
						proms(req.customData.dbConnection, "INSERT INTO `SiteSettings` () VALUES ();")
						console.log("Post Installation Finished");
						next()
					}
				})
			} catch (e) {
			}
		})
	} else {
		next()
	}
}

module.exports = postInstallation