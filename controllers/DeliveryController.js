const createDelivery = async (req, res) => {
    res.send('create delivery')
}

const getAllDelivery = async (req, res) => {
    res.send('get all delivery')
}

const updateDelivery = async (req, res) => {
    res.send('update delivery')
}

const deleteDelivery = async (req, res) => {
    res.send('delete delivery')
}

const showStats = async (req, res) => {
    res.send('show stats')
}

export {createDelivery, getAllDelivery, updateDelivery, deleteDelivery, showStats}