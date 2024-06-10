const UserModel = require('../models/Model.User');
const AuthModel = require('../models/Model.Authentication');
const { format } = require('date-fns');
const bcrypt = require('bcrypt');

const service = {
    updatePassword: updatePassword
}

async function updatePassword(req) {

    const password = req.body.password;

    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) throw 'User not found';

    const userFormatedBirthDate = format(new Date(user.birthDate), 'yyyy-MM-dd');
    const reqFormatedBirthDate = format(new Date(req.body.birthdate), 'yyyy-MM-dd');

    if (userFormatedBirthDate !== reqFormatedBirthDate)
        throw 'BirthDate not match'

    const newAuthData = await AuthModel.findOneAndUpdate(
        { username: req.body.email },
        {
            $set: {
                password: bcrypt.hashSync(password, 10)
            }
        }, { new: true });

    return newAuthData;
}

module.exports = service