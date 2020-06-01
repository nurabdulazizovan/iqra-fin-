const proms = async (c, q) => {
	return new Promise(res => {
		c.query(q, (err, result) => {
			if (err)
				throw err;
			res(result)
		})
	})
}

const loadDBData = async (req, res, next) => {

	const dbConn = req.customData.dbConnection
	const datas = await proms(dbConn, "SELECT * FROM `SiteSettings`")
	req.customData.dbData = datas['0'];

	const games = await proms(dbConn, "SELECT * FROM `AllGames`")
	req.customData.games = games;

	next()
}

module.exports = loadDBData