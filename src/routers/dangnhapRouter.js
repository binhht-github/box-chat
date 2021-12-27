dangnhapRouter = (app) => {

    app.get('/', function (req, res) {
        res.render('chatbox');
    })

    app.get('/chatbox', function (req, res) {
        res.render('chatbox');
    })

}