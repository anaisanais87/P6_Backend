const Sauce = require('../models/Sauces');

exports.manageLike = (req, res, next) => {

    if (req.body.like === 1) {

        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
            .then(() => res.status(201).json({ message: 'Like enregistré !' }))
            .catch(error => res.status(400).json({ error }))

    } else if (req.body.like === -1) {

        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
            .then(() => res.status(201).json({ message: 'Dislike enregistré !' }))
            .catch(error => res.status(400).json({ error }));

    } else {

        Sauce.findOne({ _id: req.params.id })

            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) {

                    Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                        .then(() => res.status(200).json({ message: 'Votre Like a été retiré !' }))
                        .catch(error => res.status(400).json({ error }))

                } else if (sauce.usersDisliked.includes(req.body.userId)) {

                    Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                        .then(() => res.status(200).json({ message: 'Votre Dislike a été retiré !' }))
                        .catch(error => res.status(400).json({ error }))
                }
            })

            .catch(error => res.status(400).json({ error }))
    }
};
