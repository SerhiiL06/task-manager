module.exports = {
    user404(id, res) {
        return res.status(404).json({ 'error': `user with id ${id} doesnt exists` })
    }
}