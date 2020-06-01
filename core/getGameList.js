const loader = customData => {
	let gamelist = ''
	customData.games.forEach(e => {
		gamelist += `
<div class="Uni-block col-md-4 col-sm-12 col-12" id="uni-1">
		<div class="uni-main">
				<div class="uni-card uni-card1">
						<div class="uni-content"><img src="/img/game/${e.image}"></div>
				</div>
				<div class="uni-card uni-card2">
						<div class="uni-content">
								<p>${e.about}</p><a href="/game/${e.gameid}">Ətraflı</a>
						</div>
				</div>
		</div>
</div>
`
	})
	return gamelist;	
}
module.exports = loader