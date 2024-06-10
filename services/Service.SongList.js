const ListModel = require('../models/Model.ListSong');
const UserModel = require('../models/Model.User');

const service = {
    createSongList: createSongList,
    getCurrentSongList: getCurrentSongList,
    getSongListCount: getSongListCount,
    getAllList: getAllList,
    getUserLists: getUserLists
}
async function createSongList(req) {
    const data = req.body;

    const user = await UserModel.findOne({ email: req.user.email });
    if (!user) throw 'Error: User is not valid';


    const songList = new ListModel({
        date: data.date,
        songs: data.songs,
        status: "Active",
        created_by: user._id,
    })

    const newList = await songList.save();
    return newList;
}

async function getCurrentSongList() {
    const currentDate = new Date();
    const list = await ListModel.findOne({ date: { $gte: new Date(currentDate.setHours(0, 0, 0, 0)) } })
        .sort({ date: 1 })
        .limit(1);;
    return list;
}

async function getAllList() {
    const listCount = await ListModel.find().sort({ date: -1 });
    return listCount;
}

async function getUserLists(email) {
    const user = await UserModel.findOne({ email: email });
    if (!user) throw 'Error: User is not valid';

    const list = await ListModel.find({ created_by: user._id });

    return list;
}

async function getSongListCount() {
    const listCount = await ListModel.countDocuments({});
    return listCount;
}
module.exports = service;