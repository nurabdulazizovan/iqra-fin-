const {join} = require('path')
const mysql = require('mysql')
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const connection = mysql.createConnection(config.get("db"));
const postInstallation = require('./core/postInstallation')
const loadDBData = require('./core/loadDBData')
const checkConn = require('./core/initDBConn')
const error404 = require('./core/error404')
const app = express()
const main = async () => {
	const middleware = await checkConn(connection)

	app.use(express.static(join(__dirname, "core/static/assets/images/")))
	app.use(bodyParser.json())
	app.use(bodyParser({limit: '50mb'}));
	app.use(session({
		secret: 'GameSettingsAppGameshop123_&*&*&@@#!_+=x1',
		resave: false,
		saveUninitialized: true
	}));
	app.use(bodyParser.urlencoded({extended: false}))
	app.use("/css", require("./core/css"))
	app.use("/js", require("./core/js"))
	app.use("/img", express.static(join(__dirname, "core/static/assets/images/")))
	app.use("/fonts", express.static(join(__dirname, "core/static/assets/fonts/")))
	app.use("/admin", middleware, postInstallation, loadDBData, require("./admin/panel"))
	app.use("/", middleware, postInstallation, loadDBData, require("./core/router"))

	app.get("*", (req, res) => {
		res.status(404).end(error404)
	})

	app.listen(3500, () => console.log("Server on http://localhost:3500"))
}

main()