

module.exports = {
	db : '',
	emailOptions : {
	    service: 'SendGrid',
	    auth: {
	        user: process.env.SGUSER,
	        pass: process.env.SGPASS
	    }
	}
}