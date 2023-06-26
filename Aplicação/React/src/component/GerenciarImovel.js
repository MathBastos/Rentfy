import React, { useState } from 'react';
import axios from 'axios';
import '../css/GerenciarImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function GerenciarImovel() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    cep: '',
    numero: '',
    complemento: '',
    numQuartos: '',
    numBanheiros: '',
    garagem: 'nao',
    tipo: 'apartamento',
    varanda: 'nao',
    imobiliado: 'nao',
    valorReserva: ''
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
    axios.post('http://localhost:8080/api/editarimovel', formData)
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
    <div className="GerenciarImovel">
      <header className="GerenciarImovel-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoGerenciarImovel" alt="logo" />
              </td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Gerenciar de Imóvel</legend>
                  <form id="GerenciarImovel" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="cep">CEP</label>
                      <br />
                      <input
                        type="text"
                        id="cep"
                        className="rounded-input"
                        pattern="[0-9]{5}-?[0-9]{3}"
                        value={formData.cep}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numero">Número</label>
                      <br />
                      <input
                        type="number"
                        id="numero"
                        className="rounded-input"
                        value={formData.numero}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="complemento">Complemento</label>
                      <br />
                      <input
                        type="text"
                        id="complemento"
                        className="rounded-input"
                        value={formData.complemento}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numQuartos">Número de Quartos</label>
                      <br />
                      <input
                        type="number"
                        id="numQuartos"
                        className="rounded-input"
                        value={formData.numQuartos}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numBanheiros">Número de Banheiros</label>
                      <br />
                      <input
                        type="number"
                        id="numBanheiros"
                        className="rounded-input"
                        value={formData.numBanheiros}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="garagem">Garagem</label>
                      <br />
                      <select
                        id="garagem"
                        className="rounded-input"
                        value={formData.garagem}
                        onChange={handleChange}
                      >
                        {/* Options here */}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tipo">Tipo</label>
                      <br />
                      <select
                        id="tipo"
                        className="rounded-input"
                        value={formData.tipo}
                        onChange={handleChange}
                      >
                        {/* Options here */}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="varanda">Varanda</label>
                      <br />
                      <select
                        id="varanda"
                        className="rounded-input"
                        value={formData.varanda}
                        onChange={handleChange}
                      >
                        {/* Options here */}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="imobiliado">Imobiliado</label>
                      <br />
                      <select
                        id="imobiliado"
                        className="rounded-input"
                        value={formData.imobiliado}
                        onChange={handleChange}
                      >
                        {/* Options here */}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="valorReserva">Valor Reserva</label>
                      <br />
                      <input
                        type="number"
                        id="valorReserva"
                        className="rounded-input"
                        value={formData.valorReserva}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="btnAlterarImovel">Alterar Imóvel</button>
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

export default GerenciarImovel;
