import RutaDAO from "../dao/rutaDAO.js"

export default class RutaController {
  static async apiPostRuta(req, res, next,) {
    try {
      const inventarioId = req.body.inventario_id
      const ruta = req.body.text
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      } 
      const date = new Date()

      const RutaResponse = await RutaDAO.addRuta(
        inventarioId,
        userInfo,
        ruta,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateRuta(req, res, next) {
    try {
      const rutaId = req.body.ruta_id
      const text = req.body.text
      const date = new Date()

      const reviewResponse = await RutaDAO.updateRuta(
        rutaId,
        req.body.user_id,
        text,
        date,
      )

      var { error } = rutaResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (rutaResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteRuta(req, res, next) {
    try {
      const reviewId = req.query.id
      const userId = req.body.user_id /* only for test*/
      console.log(reviewId)
      const rutaResponse = await RutaDAO.deleteRuta(
        rutaId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}