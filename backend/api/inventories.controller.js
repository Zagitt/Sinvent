import InventoriesDAO from "../dao/inventoriesDAO.js"

export default class InventoriesController {

  static async apiGetInventories(req, res, next) {
    const inventoriesPerPage = req.query.inventoriesPerPage ? parseInt(req.query.inventoriesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.status) {
      filters.status = req.query.status
    } else if (req.query.codigo) {
      filters.codigo = req.query.codigo
    }

    const { inventoriesList, totalNumInventories } = await InventoriesDAO.getInventories({
      filters,
      page,
      inventoriesPerPage,
    })

    let response = {
      inventories: inventoriesList,
      page: page,
      filters: filters,
      entries_per_page: inventoriesPerPage,
      total_results: totalNumInventories,
    }
    res.json(response)
  }
  static async apiGetinventoryById(req, res, next) {
    try {
      let id = req.params.id || {}
      let inventory = await InventoriesDAO.getinventoryByID(id)
      if (!inventory) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(inventory)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

 /* static async apiGetinventoryCuisines(req, res, next) {
    try {
      let cuisines = await InventoriesDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  } */
}