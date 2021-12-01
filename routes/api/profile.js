const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/', auth,
    async (req, res) => {
        try {
            const profile = await Profile.findOne({
                user: req.user.id
            }).populate('user', 'name');

            if (!profile) {
                return res.status(400).json({msg: 'No profile for this user'});
            }

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

router.post(
    '/',
    auth,
    check('pet', 'pet name is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {
            job,
            location,
            pet,
            gender,
            bio,
            twitter,
            facebook,
            instagram
        } = req.body;

        const profileFields = {
            user: req.user.id,
            job,
            location,
            pet,
            gender,
            bio
        };

        const socialFields = {twitter, facebook, instagram};

        profileFields.social = socialFields;

        try {
            let profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true, upsert: true, setDefaultsOnInsert: true}
            );
            return res.json(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

router.get('/all', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get(
    '/user/:user_id',
    async ({params: {user_id}}, res) => {
        try {
            const profile = await Profile.findOne({
                user: user_id
            }).populate('user', ['name']);

            if (!profile) return res.status(400).json({msg: 'Profile not found'});

            return res.json(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({msg: 'Server error'});
        }
    }
);

router.delete('/', auth, async (req, res) => {
    try {

        await Promise.all([
            Profile.findOneAndRemove({user: req.user.id}),
            User.findOneAndRemove({_id: req.user.id})
        ]);

        res.json({msg: 'User deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
