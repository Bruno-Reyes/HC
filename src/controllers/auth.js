const passport = require('./auth');
const controller = {};
const pool = require('../../database');

controller.signuprender = (req, res) => {
    req.app.locals.layout = 'main';
    res.render('auth/signup');
}

controller.loginrender = (req, res) => {
    req.app.locals.layout = 'main';
    res.render('auth/login');
}

controller.profile = async (req, res) => {

    if (req.user.id_tdu == 2) {
        const datosusuario = await pool.query('select * from Usuario natural join Persona natural join Genero natural join Enfermedades natural join Seguimiento natural join FrecuenciaEjercicio where id_usu=?', [req.user.id_usu]);
        req.app.locals.layout = 'user';
        res.render('profile', { datosusuario });
    } else {
        req.app.locals.layout = 'admin';
        res.render('admin/index');
    } 

}

controller.logout = (req, res) => {
    req.logOut();
    res.redirect('/login');
}

module.exports = controller;