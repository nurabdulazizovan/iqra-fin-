const {Router} = require('express')
const {join} = require('path')
const {readFileSync: rfs} = require('fs')
const error404 = require('./error404')
const router = Router()
const MSXParser = require('./MSXParser/parser')
const fr = fn => {try{return rfs(join(__dirname, "static", `${fn}.msx`), "utf8")}catch(e){}}

router
	.get("/:filename?", gameController = (req, res) => {
		const filename = req.params.filename || "index"
		const sitedata = req.customData.dbData
		let fileData = "";
		try {
			fileData += new MSXParser(fr("header")).parse({
				phone_num: sitedata.header_contact_num,
				email: sitedata.header_email,
				mainpage: sitedata.navbar_mainpage,
				games: sitedata.navbar_games,
				aboutus: sitedata.navbar_aboutus,
				contactus: sitedata.navbar_contactus,
				fb: sitedata.off_FB,
				tw: sitedata.off_TW,
				ig: sitedata.off_IG
			});

			fileData += new MSXParser(fr(filename)).parse(filename, {
				index: {
					quarantie: sitedata.whywe_guarantie,
					quality: sitedata.whywe_quality,
					help: sitedata.whywe_help
				},
				game: {
					gamesells: req.params.filename === "game" && require("./gamesells")(req, res),
					ingamecurrency: req.params.filename === "game" && req.customData.games.filter(e => e.gameid === req.params.gameid)['0'].ingamecurrency.toUpperCase(),
					gamename: "Oyun"
				},
				gamelist: {
					gameList: require('./getGameList')(req.customData)
				},
				about: {
					leftimage: sitedata.aboutus_leftimage,
					rightimage: sitedata.aboutus_rightimage,
					header: sitedata.aboutus_block1_header,
					headertext: sitedata.aboutus_block1_mtext,
					uc1: sitedata.aboutus_block1_int,
					ut1: sitedata.aboutus_block1_text,
					uc2: sitedata.aboutus_block2_int,
					ut2: sitedata.aboutus_block2_text,
					uc3: sitedata.aboutus_block3_int,
					ut3: sitedata.aboutus_block3_text,
					uc4: sitedata.aboutus_block4_int,
					ut4: sitedata.aboutus_block4_text,

					header2: sitedata.aboutus_block1_header2,
					dht1: sitedata.aboutus_bottomblock1_header,
					dtt1: sitedata.aboutus_bottomblock1_text,
					dht2: sitedata.aboutus_bottomblock2_header,
					dtt2: sitedata.aboutus_bottomblock2_text,
					dht3: sitedata.aboutus_bottomblock3_header,
					dtt3: sitedata.aboutus_bottomblock3_text,
					dht4: sitedata.aboutus_bottomblock4_header,
					dtt4: sitedata.aboutus_bottomblock4_text,
				}
			})

			fileData += new MSXParser(fr("footer")).parse({
				phone_num: sitedata.header_contact_num,
				email: sitedata.header_email,
				games: sitedata.navbar_games,
				aboutus: sitedata.navbar_aboutus,
				contactus: sitedata.navbar_contactus,
				fb: sitedata.off_FB,
				tw: sitedata.off_TW,
				ig: sitedata.off_IG
			})
		} catch (e) {
			console.log(e);
			res.status(404).end(error404)
		}

		res.end(fileData)
	})
	.get("/:filename\/:gameid([a-z0-9-_]{8})", (req, res) => {
		req.params.filename = "game"
		gameController(req, res)
	})
	.post("/contact", (req, res) => {
		res.status(200).json(req.body)
	})

module.exports = router