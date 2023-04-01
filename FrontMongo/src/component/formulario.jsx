import React from "react";
import "../Style/form.css";

export function Formulario() {
    return(
    <div class="Formulario contenido">
    <div class="form">
      <h1 class="form-titulo">Formulario</h1>
      <div class="formulario">
        <form action="">
          <div class="formulario-nombre">
            <label for="">Nombre</label>
            <input type="text" placeholder="Nombre proyecto" />
          </div>
          <div class="formulario-price">
            <label for="">Price</label>
            <input type="number" placeholder="Price" />
          </div>
          <div class="formulario-description">
            <label for="">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Descripción"
            ></textarea>
          </div>
          <div class="formulario-imagenes">
            <label for="">images</label>
            <input type="text" placeholder="URL" />
          </div>
        </form>
      </div>
      <div class="link-box">
        <h2>
          <a class="link" href="./CRUD.htm">VER BASE DE DATOS</a>
        </h2>
      </div>
    </div>
  </div>
    );
}
