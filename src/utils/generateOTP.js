const generateOTP = ()=>{
    return Math.floor(100000+Math.random()*10000).toString()
}

module.exports = generateOTP ;