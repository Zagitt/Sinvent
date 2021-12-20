import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let rutas

export default class RutaDAO {
    static async injectDB(conn) {
      if (rutas) {
        return
      }
      try {
        rutas = await conn.db(process.env.RESTREVIEWS_NS).collection("rutas")
      } catch (e) {
        console.error(`Unable to establish collection handles in userDAO: ${e}`)
      }
    }
  
    static async addRuta(inventarioId, user, rutas, date) {
      try {
        const rutaDoc = { name: user.name,
            user_id: user._id,
            date: date,
            text: review,
            inventario_id: ObjectId(inventarioId), }
  
        return await reviews.insertOne(rutaDoc)
      } catch (e) {
        console.error(`Unable to post ruta: ${e}`)
        return { error: e }
      }
    }
  
    static async updateRuta(rutaId, userId, text, date) {
      try {
        const updateResponse = await reviews.updateOne(
          { user_id: userId, _id: ObjectId(rutaId)},
          { $set: { text: text, date: date  } },
        )
  
        return updateResponse
      } catch (e) {
        console.error(`Unable to update review: ${e}`)
        return { error: e }
      }
    }
  
    static async deleteRuta(rutaId, userId) {
  
      try {
        const deleteResponse = await rutas.deleteOne({
          _id: ObjectId(rutaId),
          user_id: userId,
        })
  
        return deleteResponse
      } catch (e) {
        console.error(`Unable to delete ruta: ${e}`)
        return { error: e }
      }
    }
  
  }