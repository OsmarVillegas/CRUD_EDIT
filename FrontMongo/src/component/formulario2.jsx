import React, { useState } from "react";
import "../Style/form2.css";
import Table from "react-bootstrap/Table";
import { useFetch } from "../useFetch";

export function Formulario() {
  const [rows, setRows] = React.useState([]);

  const { data } = useFetch("/products");
  

  const [idModificar, setIdModificar] = useState(null);

  const [formValues, setFormValues] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    images: "",
  });

  const handleSubmit = () => {

    fetch("/products", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

  };


  const componentDidMount = (id) => {
    fetch('/products/' + id, { method: 'DELETE' })
        .then(() => this.setState({ status: 'Delete successful' }));
    window.location.reload()
  }

  return (
    <div class="Formulario contenido">
      <div class="form">
        <h1 class="form-titulo">Formulario</h1>
        <div class="formulario">
          <Table className="form-table" striped bordered hover responsive>
            <thead>
              <tr>
                <th>_id</th>
                <th>Nombre</th>
                <th>Price</th>
                <th>Description</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.price}</td>
                  <td>{row.description}</td>
                  <td>
                    <img src={row.images} alt={row.name} className="form-img"/>
                  </td>
                  <td>
                    <button
                      className="icon-pen"
                      onClick={() => setIdModificar(row.id)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="icon-trash"
                      onClick={() => componentDidMount(row.id)}
                    >
                      <i className="fa-regular fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="id"
              placeholder="Id"
              value={idModificar !== null ? idModificar : data.length+1}
              disabled={idModificar !== null}
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  id: parseInt(e.target.value),
                }));
              }}
            />
            <input
              type="text"
              name="name"
              placeholder="name"
              value={
                idModificar !== null
                  ? rows.find((row) => row.id === idModificar).name
                  : formValues.name
              }
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="price"
              placeholder="Precio"
              value={
                idModificar !== null
                  ? rows.find((row) => row.id === idModificar).price
                  : formValues.price
              }
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  price: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={
                idModificar !== null
                  ? rows.find((row) => row.id === idModificar).description
                  : formValues.description
              }
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="images"
              placeholder="URL"
              value={
                idModificar !== null
                  ? rows.find((row) => row.id === idModificar).images
                  : formValues.images
              }
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  images: e.target.value,
                }));
              }}
            />
            <button type="submit">
              {idModificar !== null ? "Modificar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
