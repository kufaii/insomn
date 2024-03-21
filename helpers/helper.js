function toNumber(number){
    return new Intl.NumberFormat('de-DE').format(number)
}

module.exports = toNumber