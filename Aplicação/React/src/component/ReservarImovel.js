import React, { useState } from 'react';
import '../css/ReservarImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function ReservarImovel() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="ReservarImovel">
      <header className="ReservarImovel-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoReservarImovel" alt="logo" />
              </td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Reservar Imóvel</legend>
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
      </header>
    </div>
  );
}

export default ReservarImovel;
