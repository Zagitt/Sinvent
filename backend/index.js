import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import InventoriesDAO from "./dao/inventoriesDAO.js"
import RutaDAO from "./dao/rutaDAO.js"
//import RestaurantsDAO from "./dao/restaurantsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000


MongoClient.connect(
    process.env.INVENTORY_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true }
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
//        await RestaurantsDAO.injectDB(client)
        await InventoriesDAO.injectDB(client)
        await RutaDAO.injectDB(client)
        app.listen(port, () => {
            console.log('listening on port ' + port)

        })
    })

