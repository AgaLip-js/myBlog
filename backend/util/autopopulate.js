module.exports = field => {
    return function() {
        this.populate(field);
    }
}