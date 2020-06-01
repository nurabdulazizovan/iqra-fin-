module.exports = users => {

	let userForm = ""

	users.forEach(e => {

		userForm += `
<div class="users">
	<div class="show">
		<div class="user">UserName</div>
		<div class="add">+</div>
		<div class="remove">-</div>
	</div>
	<div class="edit hidden">
		<form action="/admin/submit">
			<input type="hidden" name="code" value="adduser" />
			<label for="username">User Name</label>
			<input id="username" type="text" name="name" />
			<br />

			<label for="userpassword">User Name</label>
			<input id="userpassword" type="password" name="password" />
			<br />

			<button type="submit">Submit</button>
		</form>
	</div>
</div>
`

	})

	return userForm

}