define(['backbone'], (Backbone) ->
	class User extends Backbone.Model
		default:
			{
				first: 'First'
				last: 'Last'
				username: 'Username'
				joined: '1/1/2013'
				img: 'path/to/image'
			}
)
