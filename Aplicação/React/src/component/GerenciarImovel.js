import React, { useState } from 'react';
import '../css/GerenciarImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function GerenciarImovel() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

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
                  <form id="GerenciarImovel">
                    <div className="form-group">
                      <label htmlFor="cep">CEP</label>
                      <br />
                      <input type="text" id="cep" className="rounded-input" pattern="[0-9]{5}-?[0-9]{3}" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="estado">Estado</label>
                      <br />
                      <select id="estado" className="rounded-input">
                        <option value="">Selecione um estado</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
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

                    <button className="btnAlterarImovel">Alterar Imóvel</button>
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
