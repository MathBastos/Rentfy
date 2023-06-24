import React, { useState } from 'react';
import axios from 'axios';
import '../css/EditarLocadora.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function EditarLocadora() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    nomeFantasia: '',
    cnpj: '',
    cep: '',
    cidade: '',
    estado: '',
    rua: '',
    numero: '',
    email: '',
    telefone: '',
    usuario: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data to the Spring Boot backend
    axios.post('http://localhost:8080/api/editarlocadora', formData)
      .then((response) => {
        // Handle the response here (e.g., show success message)
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here (e.g., show error message)
        console.error(error);
      });
  };

  return (
    <div className="EditarLocadora">
      <header className="EditarLocadora-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoEditarLocadora" alt="logo" />
              </td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Editar Locadora</legend>
                  <form id="EditarLocadora" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="nomeFantasia">Nome Fantasia</label>
                      <br />
                      <input
                        type="text"
                        id="nomeFantasia"
                        className="rounded-input"
                        value={formData.nomeFantasia}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cnpj">CNPJ</label>
                      <br />
                      <input
                        type="text"
                        id="cnpj"
                        className="rounded-input"
                        value={formData.cnpj}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cep">CEP</label>
                      <br />
                      <input
                        type="text"
                        id="cep"
                        className="rounded-input"
                        value={formData.cep}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cidade">Cidade</label>
                      <br />
                      <input
                        type="text"
                        id="cidade"
                        className="rounded-input"
                        value={formData.cidade}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="estado">Estado</label>
                      <br />
                      <input
                        type="text"
                        id="estado"
                        className="rounded-input"
                        value={formData.estado}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rua">Rua</label>
                      <br />
                      <input
                        type="text"
                        id="rua"
                        className="rounded-input"
                        value={formData.rua}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numero">Número</label>
                      <br />
                      <input
                        type="text"
                        id="numero"
                        className="rounded-input"
                        value={formData.numero}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <br />
                      <input
                        type="email"
                        id="email"
                        className="rounded-input"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="telefone">Telefone</label>
                      <br />
                      <input
                        type="tel"
                        id="telefone"
                        className="rounded-input"
                        value={formData.telefone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="usuario">Usuário</label>
                      <br />
                      <input
                        type="text"
                        id="usuario"
                        className="rounded-input"
                        value={formData.usuario}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="senha">Senha</label>
                      <br />
                      <input
                        type="password"
                        id="senha"
                        className="rounded-input"
                        value={formData.senha}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="btnCadastrarLocadora">Editar Locadora</button>
                  </form>
                </fieldset>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default EditarLocadora;
