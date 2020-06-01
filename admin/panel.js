const MSXParser = require('../core/MSXParser/parser.js')
const {readFileSync: rfs} = require('fs')
const {join} = require('path')
const {Router} = require('express')
const router = Router()
const loggedUser = require('./loggedUser')
const submit = require('./submit')
const users = require('./users')
const parseAllGames = require('./parseAllGames')


router
	.post("/submit", loggedUser, submit)
	.get("/submit", (req, res) => {res.redirect("/admin")})

	.get("/css/:cssfilename.css", (req, res) => {
		let pageData = ""

		/*
main.css faylina olan url /admin/css/main.css-dir
Mutleq styles papkasinin icinde yaradin isteniles css fayli
		*/

		try {
			pageData += rfs(join(__dirname, "static", "styles", `${req.params.cssfilename}.css`)).parse({})
		} catch (e) {
			pageData = "404 File Not Found"
		}

		res.end(pageData)		
	})

	.post("/", loggedUser)
	.get("/", loggedUser, (req, res) => {

		let pageData = "";
		let sitedata = req.customData.dbData

		try {
			pageData += new MSXParser(rfs(join(__dirname, "static", "index.msx"), "utf8")).parse({
				navbar_mainpage: sitedata.navbar_mainpage,
				navbar_games: sitedata.navbar_games,
				navbar_aboutus: sitedata.navbar_aboutus,
				navbar_contactus: sitedata.navbar_contactus,
				header_contact_num: sitedata.header_contact_num,
				header_email: sitedata.header_email,
				off_FB: sitedata.off_FB,
				off_IG: sitedata.off_IG,
				off_TW: sitedata.off_TW,
				whywe_guarantie: sitedata.whywe_guarantie,
				whywe_quality: sitedata.whywe_quality,
				whywe_help: sitedata.whywe_help,
				aboutus_block1_mtext: sitedata.aboutus_block1_mtext,
				aboutus_block1_header: sitedata.aboutus_block1_header,
				aboutus_block1_int: sitedata.aboutus_block1_int,
				aboutus_block1_text: sitedata.aboutus_block1_text,
				aboutus_block2_int: sitedata.aboutus_block2_int,
				aboutus_block2_text: sitedata.aboutus_block2_text,
				aboutus_block3_int: sitedata.aboutus_block3_int,
				aboutus_block3_text: sitedata.aboutus_block3_text,
				aboutus_block4_int: sitedata.aboutus_block4_int,
				aboutus_block4_text: sitedata.aboutus_block4_text,
				aboutus_rightimage: sitedata.aboutus_rightimage,
				aboutus_block1_header2: sitedata.aboutus_block1_header2,
				aboutus_bottomblock1_header: sitedata.aboutus_bottomblock1_header,
				aboutus_bottomblock1_text: sitedata.aboutus_bottomblock1_text,
				aboutus_bottomblock2_header: sitedata.aboutus_bottomblock2_header,
				aboutus_bottomblock2_text: sitedata.aboutus_bottomblock2_text,
				aboutus_bottomblock3_header: sitedata.aboutus_bottomblock3_header,
				aboutus_bottomblock3_text: sitedata.aboutus_bottomblock3_text,
				aboutus_bottomblock4_header: sitedata.aboutus_bottomblock4_header,
				aboutus_bottomblock4_text: sitedata.aboutus_bottomblock4_text,
				aboutus_leftimage: sitedata.aboutus_leftimage,
				all_games: parseAllGames(req.customData.games),
				users: users(["UserName"])
			})
		} catch (e) {}

		res.status(200).end(pageData)
	})


module.exports = router