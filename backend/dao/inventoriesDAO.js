import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let inventories

export default class InventoriesDAO {
    static async injectDB(conn) {
        if (inventories) {
            return
        }
        try {
            inventories = await conn.db(process.env.INVENTORY_NS).collection("inventarios")
        } catch (e) {
            console.error('Unable to establish a collection handle in inventoriesDAO:' + e,)
        }
    }


static async getInventories({
    filters = null,
    page = 0,
    inventoriesPerPage = 10,
  } = {}) {
    let query
    if (filters) {
      if ("codigo" in filters) {
        query = { $text: { $search: filters["codigo"] } } //$text requires indexed set in MongoDB
      } else if ("status" in filters) {
        query = { "status": { $eq: filters["status"] } }
      }
    }

    let cursor
    
    try {
      cursor = await inventories.find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { inventoriesList: [], totalNumInventories: 0 }
    }

    const displayCursor = cursor.limit(inventoriesPerPage).skip(inventoriesPerPage * page)

    try {
      const inventoriesList = await displayCursor.toArray()
      const totalNuminventories = await inventories.countDocuments(query)

      return { inventoriesList, totalNuminventories }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { inventoriesList: [], totalNuminventories: 0 }
    }
  }
  static async getInventoryByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$Inventory_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await inventories.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getInventoryByID: ${e}`)
      throw e
    }
  }

  static async getStatus() {
    let status = []
    try {
      status = await inventories.distinct("cuisine")
      return status
    } catch (e) {
      console.error(`Unable to get status, ${e}`)
      return status
    }
  }
}