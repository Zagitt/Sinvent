import express from "express"
import InventoriesCtrl from "./inventories.controller.js"
import RutaCtrl from "./ruta.controller.js"

const router = express.Router()

router.route("/").get(InventoriesCtrl.apiGetInventories)

router
  .route("/ruta")
  .post(RutaCtrl.apiPostRuta)
  .put(RutaCtrl.apiUpdateRuta)
  .delete(RutaCtrl.apiDeleteRuta) 

export default router