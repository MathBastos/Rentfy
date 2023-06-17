import React, { useState } from 'react';
import '../css/VisualizarImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function VisualizarImovel() {
  const navigate = useNavigate();

  const reservarClick = () => {
    navigate('/component/ReservarImovel.js');
  };

  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="VisualizarImovel">
      <header className="VisualizarImovel-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoVisualizarImovel" alt="logo" />
              </td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Visualizar Imóvel</legend>
                  <form id="VisualizarImovel">
                    <div className="form-group">
                      <label htmlFor="cep">CEP</label>
                      <br />
                      <input type="text" id="cep" className="rounded-input" pattern="[0-9]{5}-?[0-9]{3}" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="estado">Estado</label>
                      <br />
                      <select id="estado" className="rounded-input">
                        <option value="PR">Paraná</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cidade">Cidade</label>
                      <br />
                      <input type="text" id="cidade" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="rua">Rua</label>
                      <br />
                      <input type="text" id="rua" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numero">Número</label>
                      <br />
                      <input type="number" id="numero" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="complemento">Complemento</label>
                      <br />
                      <input type="text" id="complemento" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numQuartos">Número de Quartos</label>
                      <br />
                      <input type="number" id="numQuartos" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numBanheiros">Número de Banheiros</label>
                      <br />
                      <input type="number" id="numBanheiros" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="garagem">Garagem</label>
                      <br />
                      <select id="garagem" className="rounded-input">
                        <option value="nao">Não</option>
                        <option value="sim">Sim</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tipo">Tipo</label>
                      <br />
                      <select id="tipo" className="rounded-input">
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="varanda">Varanda</label>
                      <br />
                      <select id="varanda" className="rounded-input">
                        <option value="nao">Não</option>
                        <option value="sim">Sim</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="imobiliado">Imobiliado</label>
                      <br />
                      <select id="imobiliado" className="rounded-input">
                        <option value="nao">Não</option>
                        <option value="sim">Sim</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="valorReserva">Valor Reserva</label>
                      <br />
                      <input type="number" id="valorReserva" className="rounded-input" />
                    </div>

                    <button className="btnReservarImovel" onClick={reservarClick}>Reservar Imóvel</button>
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

export default VisualizarImovel;
