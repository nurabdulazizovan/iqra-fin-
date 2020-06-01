const fs = require('fs');
const {join} = require('path')

const proms = async (c, q) => {
	return new Promise(res => {
		c.query(q, (err, result) => {
			if (err)
				throw err;
			res(result)
		})
	})
}

const UpdateTable = (conn, dbName, object) => {
	let update = ""
	Object.keys(object).forEach(e => {
		let val = object[e]
		update += `, \`${e}\` = "${val}"`
	})
	update = `UPDATE \`${dbName}\` SET ${update.substring(2)} WHERE \`id\` = '${object.id || 1}';`
	proms(conn, update)
}

const InsertTable = (conn, dbName, object) => {

	let
		insert = "",
		keys = "",
		values = ""
	Object.keys(object).forEach(e => {
		keys += `, \`${e}\``
		values += `, '${object[e]}'`
	})
	insert = `INSERT INTO \`${dbName}\` (${keys.substring(2)}) VALUES (${values.substring(2)});`
	proms(conn, insert)
}

const deleteTable = (conn, object) => {
	let cond = ""
	Object.keys(object).forEach(e => {
		cond += `, \`${e}\` = '${object[e]}'`
	})
	proms(conn, "DELETE FROM `AllGames` WHERE " + cond.substring(2) + ";")
}

const GetTable = (conn, object) => {
	let params = ""
	Object.keys(object).forEach(e => {
		params += `, \`${e}\` = '${object[e]}'`
	})
	return proms(conn, `SELECT * FROM \`AllGames\` WHERE ${params.substring(2)}`)
}

const parseAndModify = body => {
	let toDB = {}
	Object.keys(body).forEach(e => {
		let val = body[e]
		if (e === "code")
			return;
		else if (val.substring(0, 1) === "{") {
			val = JSON.parse(val)
			let filename = val['name'].replace(/\s+/g, "_")
			let image = val['b64image'].replace(/^data:image\/png;base64,/, "")
			let imPath = join(process.cwd(), "core", "static", "assets", "images", "about", filename)
			fs.writeFile(imPath, image, 'base64', function(err){
				if (err)
					throw err
			})
			toDB[e] = filename
		} else {
			toDB[e] = val
		}
	})
	return toDB
}

const getRandomInt = max => {
	return Math.floor(Math.random() * Math.floor(max));
}

const generateGameID = async conn => {
	let x = 8, instr = "qwertyuiopasdfghjklzxcvbnm1234567890_-", fStr = ""
	for (let i = 0; i < x; i++)
		fStr += instr[getRandomInt(instr.length)]
	let res = await proms(conn, "SELECT * FROM `AllGames` WHERE `gameid` = '" + fStr + "'")
	if (JSON.stringify(res) === "[]")
		return fStr
	return await generateGameID(conn)
}

const EditGame = async (body, conn) => {
	let gameid = body.code.split("#")['1']
	if (body.type === "delete")
		return deleteTable(conn, {gameid})
	let filename = body.image
	if (body.image.substring(0, 1) === "{") {
		body.image = JSON.parse(body.image)
		filename = body.image.name.replace(/\s+/g, "_")
		let image = body.image.b64image.replace(/^data:image\/png;base64,/, "")
		let imPath = join(process.cwd(), "core", "static", "assets", "images", "game", filename)
		fs.writeFile(imPath, image, 'base64', function(err){
			if (err)
				throw err
		})
	}
	let dbData = await GetTable(conn, {gameid})
	let obj = {...dbData['0'], ...{
		about: body.about,
		gameCoster: body.gameCoster,
		image: filename,
		ingamecurrency: body.ingamecurrency
	}}
	UpdateTable(conn, "AllGames", obj)
}

const parseGames = async (body, conn) => {
	toDB = {}
	Object.keys(body).forEach(e => {
		let
			val = body[e]
		if (e === "code")
			return
		else if (e === "image") {
			val = JSON.parse(val)
			let filename = val['name'].replace(/\s+/g, "_")
			let image = val['b64image'].replace(/^data:image\/png;base64,/, "")
			let imPath = join(process.cwd(), "core", "static", "assets", "images", "game", filename)
			fs.writeFile(imPath, image, 'base64', function(err){
				if (err)
					throw err
			})
			toDB[e] = filename
		} else {
			toDB[e] = val
		}
	})
	toDB.gameid = await generateGameID(conn)
	return toDB
}

module.exports = async (req, res, next) => {
	switch(req.body.code.split("#")['0']) {
		case "settings":
			UpdateTable(req.customData.dbConnection, "SiteSettings", parseAndModify(req.body))
			break;
		case "games":
			InsertTable(req.customData.dbConnection, "AllGames", await parseGames(req.body, req.customData.dbConnection))
			break;
		case "gamedit":
			EditGame(req.body, req.customData.dbConnection)
			break;
	}
	res.redirect("/admin")
}