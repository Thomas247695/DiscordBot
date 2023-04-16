//https://api.mojang.com/users/profiles/minecraft/${playername}
const axios = require('axios')

module.exports = async function getUUID(username) {
    let response = await axios.get('https://api.mojang.com/users/profiles/minecraft/' + username).catch(function (error) {
        return false
    });
    if (response.data == undefined) return false
    return response.data
}
