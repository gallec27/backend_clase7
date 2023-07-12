const renderProfile = (req, res) => {
    console.log(req.session.usuario);
    const user = req.session.usuario;
    res.render("profile", { user });
};

module.exports = { renderProfile };
