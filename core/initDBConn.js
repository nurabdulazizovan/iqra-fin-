module.exports = async connection => {
	await connection.connect(err => {
		if (err)
			throw err;
		console.log("Database Connected Succesfully;")
	})

	return async (req, res, next) => {
		const tables = await new Promise(res => {
			try {
				connection.query("SHOW TABLES", (err, result) => {
					if (err)
						throw err;
					res(result)
				})
			} catch (e) {
				console.error(e.message)
			}
		})

		req.customData = {
			postInstallation: tables.length === 0,
			dbConnection: connection
		}

		next()
	}
}