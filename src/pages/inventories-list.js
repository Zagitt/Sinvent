import React, { useState, useEffect } from "react";
import InventoryDataService from "../services/inventory";
import { Link } from "react-router-dom";
import { div } from "@tensorflow/tfjs-core";

const InventoriesList = props => {
  const [inventories, setInventories] = useState([]);
/*  const [searchStatus, setSearchStatus ] = useState("");
/*  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState(""); */
 /* const [rutas, setRutas] = useState(["All Rutas"]);*/

  useEffect(() => {
    retrieveInventories();
 /*   retrieveRutas();*/
  }, []);

 /* const onChangeSearchStatus = e => {
    const searchStatus = e.target.value;
    setSearchStatus(searchStatus);
  };*/

/*  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  }; 

  const onChangeSearchRuta = e => {
    const searchRuta = e.target.value;
    setSearchRuta(searchRuta);
    
  }; */

  const retrieveInventories = () => {
    InventoryDataService.getAll()
      .then(response => {
        console.log(response.data);
        setInventories(response.data.inventories);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

 /* const retrieveRutas = () => {
    InventoryDataService.getRutas()
      .then(response => {
        console.log(response.data);
        setRutas(["All Rutas"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };*/

  const refreshList = () => {
    retrieveInventories();
  };

  const find = (query, by) => {
    InventoryDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setInventories(response.data.inventories);
      })
      .catch(e => {
        console.log(e);
      });
  };

 /* const findByStatus = () => {
    find(searchStatus, "status")
  };*/

/*  const findByZip = () => {
    find(searchZip, "zipcode")
  }; */
/*
  const findByRuta = () => {
    if (searchRuta == "All Rutas") {
      refreshList();
    } else {
      find(searchRuta, "rutas")
    }
  };*/

  return(
  <div className="row">
        {inventories.map((inventory) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{inventory.codigo}</h5>
                  <p className="card-text">
                    <strong>Status: </strong>{inventory.status}<br/>
                    <strong>Proyecto: </strong>{inventory.proyecto}
                  </p>
                  <div className="row">
                  <Link to={"/inventarios/"+inventory._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    Ver Rutas
                  </Link>
                  <a target="_blank" href={"https://www.google.com/maps/place/15z"} className="btn btn-primary col-lg-5 mx-1 mb-1">Ver Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>

  );
};

export default InventoriesList;