module.exports = gameObj => {

	let res = "", u = 0

	gameObj.forEach(e => {

		res += `
<div class="allgamesdata">
	<div class="showData">
		<div class="image"><img style="max-width: 15%;" src="/img/game/${e.image}" alt="${e.gameid}" /></div>
		<div class="about">${e.about}</div>
		<div class="gamecurrency">${e.ingamecurrency}</div>
		<table>
			<thead>
				<th>Type</th>
				<th>Count</th>
				<th>Cost</th>
			</thead>
			<body>
			<tr>
				${
					JSON.parse(e.gameCoster).map(e => {
						return `<td>Game</td><td>${e.count}</td><td>${e.cost}</td>`
					}).join("</tr><tr>")
				}
			</tr>
			</tbody>
		</table>
		<div class="editFile" data-id="${u}">
			Edit
		</div>
	</div>
	<div class="editData hidden">
		<form action="/admin/submit" method="POST" data-table>

			<input type="hidden" name="code" value="gamedit#${e.gameid}" />

			<label for="edit_image">
				<img style="max-width: 15%;" src="/img/game/${e.image}" alt="${e.gameid}" />
			</label>
			<input class="nonSetup hidden" id="edit_image" type="file" />
			<input id="edit_image_content" type="hidden" name="image" value="${e.image}" />
			<br />

			<label for="edit_about">About</label>
			<input id="edit_about" type="text" name="about" value="${e.about}" />
			<br />

			<label for="ingamecurrency">InGame Currency</label>
			<input id="ingamecurrency" type="text" name="ingamecurrency" value="${e.ingamecurrency}" />
			<br />

			<table class="editTable_sells">
				<thead>
					<tr>
						<th>Count</th>
						<th>Cost</th>
						<th>Remove Line</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="addNewCost" colspan="3">Add</td>
					</tr>
				</tbody>
			</table>
			<br />

			<input type="hidden" name="type" value="#" />
			<button type="submit" name="editAction" value="delete" onclick="setAttr(this, 'delete')">Delete</button>
			<br />
			<button type="submit" name="deleteAction" value="done" onclick="setAttr(this, 'done')">Done</button>

		</form>
	</div>
</div>
`
		u++;
	})

	return res

}