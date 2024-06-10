var Comments = require('../models/comment');

exports.add_comment = function(req, res){
    var comment = new Comments({
        comment: req.body.comment,
        user: req.user.username,
        picture_id: req.params.id
    });
    comment.save().then(() => {
        res.redirect('/pictures/'+req.params.id);
    }).catch((err) => {
        console.log(err);
    });
}