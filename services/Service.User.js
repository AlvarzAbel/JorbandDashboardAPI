const UserModel = require('../models/Model.User');

const service = {
    getUserList: getUserList,
    createUser: createUser,
    getUsers: getUsers,
    getUserContribution: getUserContribution,
    getUsersFinancesControl: getUsersFinancesControl,
    getFinancesByUser: getFinancesByUser,
    getUserInformation: getUserInformation,
    getUserProfile: getUserProfile,
    updateUser:updateUser
}

async function getUsers() {
    const list = await UserModel.find({ status: 'Approved' }).select('-password');
    return list;
}

async function getUserList() {
    const list = await UserModel.find({ status: 'Approved' }).select('name lastName _id').lean();

    const formattedUser = list.map(user => ({
        id: user._id,
        name: `${user.name} ${user.lastName}`,

    }))

    return formattedUser;
}

async function getUserContribution() {
    const list = await UserModel.find({ status: 'Approved' })
        .select('name lastName _id contributions ')
        .populate('planContributions', 'date amount');

    const formattedUser = list.map(user => ({
        id: user._id,
        name: `${user.name} ${user.lastName}`,
        contributions: user.planContributions

    }))

    return formattedUser;
}

async function getUsersFinancesControl() {
    const list = await UserModel.find({ status: 'Approved' })
        .select('_id name lastName controlConstructionPromises controlTithes controlContributions ')
        .populate('controlConstructionPromises', 'month status')
        .populate('controlTithes', 'month status')
        .populate('controlContributions', 'date status')

    const formattedUser = list.map(user => ({
        id: user._id,
        name: `${user.name} ${user.lastName}`,
        promises: user.controlConstructionPromises,
        tithes: user.controlTithes,
        contributions: user.controlContributions,

    }))

    return formattedUser;
}

async function getFinancesByUser(email) {
    const user = await UserModel.findOne({ status: 'Approved', email: email })
        .select('_id name lastName planContributions controlTithes controlContributions ')
        .populate({
            path: 'controlConstructionPromises',
            select: 'month status',
            options: { sort: { month: -1 } }
        })
        .populate({
            path: 'controlTithes',
            select: 'month status',
            options: { sort: { month: -1 } }
        })
        .populate({
            path: 'planContributions',
            select: 'date amount',
            options: { sort: { date: -1 } }
        })

    const formattedUser = {
        id: user._id,
        name: `${user.name} ${user.lastName}`,
        promises: user.controlConstructionPromises,
        tithes: user.controlTithes,
        contributions: user.contributions,

    }

    return formattedUser;
}


async function getUserInformation(email) {
    const profile = await UserModel.findOne({ email: email })
        .select('-planContributions -controlConstructionPromises -controlTithes -controlContributions')
    return profile;
}

async function getUserProfile(userId){
    const profiles = await UserModel.findOne({ _id: userId }).select('profile');
    return profiles;
}

async function createUser(req) {
    const { body } = req;
    const user = new UserModel({
        name: body.name,
        lastName: body.lastName,
        email: body.email.toLowerCase(),
        birthDate: body.birthdate,
        profilePicture: 'default_profile_image.png',
        status: 'Approved',
        profile: ['MUSICIAN'],
    })
    const newUser = await user.save();
    return newUser;
}

async function updateUser(req){
    const {body} = req;

    const user = await UserModel.findOneAndUpdate(
        {email: req.user.email},
        {
            $set: {
                birthDate: body.birthdate,
                email: body.email.toLowerCase(),
                name: body.name,
                lastName: body.lastName
            }
        },{new: true}
    )
    return user;
}

module.exports = service;