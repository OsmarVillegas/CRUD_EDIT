import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useFetch } from "../useFetch";
import "../Style/style.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function Some() {
  const { data } = useFetch("/products");

  const [modal, setModal] = useState(false);

  const [idModificar, setIdModificar] = useState(null);

  const [modificar, setModificar] = useState(false);

  const [formValues, setFormValues] = useState({
    id: data.length,
    name: "",
    description: "",
    price: 0,
    images: "",
  });

  useEffect(() => {
    if (data) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        id: data.length + 1,
      }));
    }
  }, [data]);

  const handleSubmit = () => {
    data.push(formValues);
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

  const showModal = () => {
    setModal(!modal);
    console.log(formValues);
  };

  const componentDidMount = (id) => {
    console.log("Borrado");
    fetch("/products/" + id, { method: "DELETE" }).then(() =>
      this.setState({ status: "Delete successful" })
    );
    window.location.reload();
  };

  const seleccionarComponente = (producto) => {
    setFormValues({
      id: producto.id,
      name: producto.name,
      description: producto.description,
      price: producto.price,
      images: producto.images,
    });
  };

  const limpiar = () => {
    setFormValues({
      id: data.length+1,
      name: "",
      description: "",
      price: 0,
      images: "",
    });
  }

  const componentDidEdit = () => {
    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    };
    fetch("/products/" + formValues.id, requestOptions).then((response) =>
      response.json()
    );

    // Reinicia la pantalla para recargar los valores modificados
    window.location.reload();
  };

  return (
    <div className="container mt-5 position-relative">
      <h1 className="text-center">Formulario</h1>
      <Table
        className="form-table mt-2 text-center"
        striped
        bordered
        hover
        responsive
      >
        <thead>
          <tr>
            <th>id</th>
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
                <img src={row.images} alt={row.name} className="form-img" />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    seleccionarComponente(row);
                    showModal();
                    setModificar(true);
                  }}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => componentDidMount(row.id)}
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <button
        className="btn btn-success position-absolute end-0"
        onClick={() => {
          showModal();
          setModificar(false);
          limpiar();
        }}
      >
        Agregar
      </button>

      <Modal show={modal} centered>
        <Modal.Header>
          <button
            className="btn btn-danger rounded-circle font-weight-bold"
            onClick={() => showModal()}
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="id">ID</label>
          <input
            className="form-control"
            type="number"
            name="id"
            placeholder="Id"
            value={
              idModificar !== null
                ? data.find((row) => row.id === idModificar).id
                : data.length + 1
            }
            disabled={idModificar !== null}
            onChange={(e) => {
              setFormValues((prevState) => ({
                ...prevState,
                id: parseInt(e.target.value),
              }));
            }}
            readOnly
          />
          <br />
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="name"
            value={
              idModificar !== null
                ? data.find((row) => row.id === idModificar).name
                : formValues.name
            }
            onChange={(e) => {
              setFormValues((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
          />
          <br />
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="text"
            name="price"
            placeholder="Precio"
            value={
              idModificar !== null
                ? data.find((row) => row.id === idModificar).price
                : formValues.price
            }
            onChange={(e) => {
              setFormValues((prevState) => ({
                ...prevState,
                price: e.target.value,
              }));
            }}
          />
          <br />
          <label htmlFor="description">Description</label>
          <input
            className="form-control"
            type="text"
            name="description"
            placeholder="Description"
            value={
              idModificar !== null
                ? data.find((row) => row.id === idModificar).description
                : formValues.description
            }
            onChange={(e) => {
              setFormValues((prevState) => ({
                ...prevState,
                description: e.target.value,
              }));
            }}
          />
          <br />
          <label htmlFor="images">Images</label>
          <input
            className="form-control"
            type="text"
            name="images"
            placeholder="URL"
            value={
              idModificar !== null
                ? data.find((row) => row.id === idModificar).images
                : formValues.images
            }
            onChange={(e) => {
              setFormValues((prevState) => ({
                ...prevState,
                images: e.target.value,
              }));
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => showModal()}>
            Cancelar
          </Button>
          {modificar ? (
            <Button
              variant="primary"
              onClick={() => {
                componentDidEdit();
                showModal();
              }}
            >
              Editar
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={() => {
                handleSubmit();
                showModal();
              }}
            >
              Guardar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
