import React, { useState, useEffect } from "react";
import InventoryDataService from "../services/inventory";
import { Link } from "react-router-dom";

const Inventory = props => {
  const initialInventoryState = {
    id: null,
    codigo: "",
    proyecto: "",
    status: "",
    ruta: []
  };
  const [inventory, setInventory] = useState(initialInventoryState);

  const getInventory = id => {
    InventoryDataService.get(id)
      .then(response => {
        setInventory(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getInventory(props.match.params.id);
  }, [props.match.params.id]);

  const deleteRuta = (rutaId, index) => {
    InventoryDataService.deleteRuta(rutaId, props.user.id)
      .then(response => {
        setInventory((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {inventory ? (
        <div>
          <h5>{inventory.codigo}</h5>
          <p>
            <strong>Proyecto: </strong>{inventory.proyecto}<br/>
            <strong>status: </strong>{inventory.status}
          </p>
          <Link to={"/inventarios/" + props.match.params.id + "/ruta"} className="btn btn-primary">
            Add Ruta
          </Link>
          <h4> Ruta </h4>
          <div className="row">
            {inventory.ruta.length > 0 ? (
             inventory.ruta.map((ruta, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {ruta.text}<br/>
                         <strong>tiempo: </strong>{ruta.tiempo}<br/>
                         <strong>Zona: </strong>{ruta.zona}
                       </p>
                       {props.user && props.user.id === ruta.user_id &&
                          <div className="row">
                            <a onClick={() => deleteRuta(ruta._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/inventarios/" + props.match.params.id + "/ruta",
                              state: {
                                currentRuta: ruta
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No hay ruta aún.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No hay inventario seleccionado.</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;