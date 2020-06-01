const getGame = (req, res) => {
	if (!req.params.gameid)
		res.redirect("/gamelist")
	for (let game of req.customData.games) {
		if (game.gameid === req.params.gameid) {
			let gameCoster = ""
			if (JSON.parse(game.gameCoster).length > 0) {
				JSON.parse(game.gameCoster).forEach(e => {
					gameCoster += `
<tr id="buy_${e.count}">
	<td data-column="PUBG">Oyun</td>
	<td data-column="%ingamecurrency%">${e.count}</td>
	<td data-column="QIYMƏT">${e.cost} AZN</td>
	<td data-column="ALMAQ"><a class="almaq" href="https://api.whatsapp.com/send?&phone=${req.customData.dbData.header_contact_num}&message=Almaq+Isteyirem:+${e.count},+url:+${req.protocol}://${req.hostname}${req.url}#buy_${e.count}">Indi almaq</a></td>
</tr>
`
				})
			}	else
				return `<tr><td colspan="4" style="text-align: center;">Your requested game not found</td></tr>`
			return gameCoster
		}
	}
	res.redirect("/gamelist")
}
module.exports = getGame