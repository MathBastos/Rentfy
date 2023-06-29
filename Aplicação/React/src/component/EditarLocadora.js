import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/EditarLocadora.css';
import logo from '../img/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

function EditarLocadora() {
  const navigate = useNavigate();
  const location = useLocation();
  const cnpjEdit = new URLSearchParams(location.search).get('CNPJ');

  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    nomeFantasia: '',
    cnpj: '',
    cep: '',
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
    // Lógica para enviar os dados atualizados
    e.preventDefault();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/locadoras/search?cnpj=${cnpjEdit}`);
        const locadoraData = response.data;

        setFormData({
          nomeFantasia: locadoraData.nomeFantasia,
          cnpj: locadoraData.cnpj,
          cep: locadoraData.cep,
          numero: locadoraData.numero,
          email: locadoraData.email,
          telefone: locadoraData.telefone,
          usuario: locadoraData.usuario,
          senha: locadoraData.senha
        });
      } catch (error) {
        console.log(error);
        // Tratar erros, exibir mensagem de erro, etc.
      }
    };

    fetchData();
  }, [cnpjEdit]);

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
