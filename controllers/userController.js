

exports.loginForm = (req, res) => {
	res.render('login', { title: 'Login' });
};

exports.registrationFrom = (req, res) => {
    res.render('register', { title: 'Register' });
};
