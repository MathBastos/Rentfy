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
        <img src={logo} className="rentfyLogoVisualizarImovel" alt="logo" />
        <div className="form-container">
          <table>
            <tbody>
              <tr>
                <td rowspan="2">
                  <fieldset className="fieldset-custom">
                    <legend>Dados do Imóvel</legend>
                    <form id="GerenciarImovel">
                      <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <br />
                        <input type="text" id="cep" className="rounded-input" pattern="[0-9]{5}-?[0-9]{3}" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <br />
                        <input type="text" id="estado" className="rounded-input"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <br />
                        <input type="text" id="cidade" className="rounded-input"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <br />
                        <input type="text" id="bairro" className="rounded-input"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="tipo">Tipo</label>
                        <br />
                        <input type="text" id="tipo" className="rounded-input"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="varanda">Varanda</label>
                        <br />
                        <input type="text" id="varanda" className="rounded-input"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="imobiliado">Imobiliado</label>
                        <br />
                        <input type="text" id="imobiliado" className="rounded-input"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="valorReserva">Valor Reserva</label>
                        <br />
                        <input type="number" id="valorReserva" className="rounded-input" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="quantidadeQuartos">Quantidade de Quartos</label>
                        <br />
                        <input type="number" id="quantidadeQuartos" className="rounded-input" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="quantidadeBanheiros">Quantidade de Banheiros</label>
                        <br />
                        <input type="number" id="quantidadeBanheiros" className="rounded-input" />
                      </div>
                    </form>
                  </fieldset>
                </td>
                <td className="cell-spacing"></td>
                <td rowspan="1">
                  <fieldset className="fieldset-custom">
                    <legend>Dados da Locadora</legend>
                    <div className="form-group">
                      <label htmlFor="nomeFantasia">Nome Fantasia</label>
                      <br />
                      <input type="text" id="nomeFantasia" className="rounded-input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <br />
                      <input type="email" id="email" className="rounded-input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefone">Telefone</label>
                      <br />
                      <input type="tel" id="telefone" className="rounded-input" />
                    </div>
                  </fieldset>
                </td>
              </tr>
              <tr>
                <td className="cell-spacing"></td>
                <td rowspan="1">
                  <fieldset className="fieldset-custom">
                    <legend>Data da Reserva</legend>
                    <form id="ReservarImovel">
                      <div className="form-group">
                        <label htmlFor="dataInicio">Data de Início</label>
                        <br />
                        <input type="date" id="dataInicio" className="rounded-input" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="dataFim">Data de Fim</label>
                        <br />
                        <input type="date" id="dataFim" className="rounded-input" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="totalReserva">Total da Reserva</label>
                        <br />
                        <input type="number" id="totalReserva" className="rounded-input" />
                      </div>

                      <div className="form-group">
                        <button className="btnReservarImovel">Reservar Imóvel</button>
                      </div>
                    </form>
                  </fieldset>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default VisualizarImovel;
