import React, { useState } from 'react';
import '../css/BuscarImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function BuscarImovel() {
  const [ufValue, setUfValue] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [bairroValue, setBairroValue] = useState('');
  const [tipoValue, setTipoValue] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false); // Estado para controlar a exibição dos resultados
  const navigate = useNavigate();

  const handleUfChange = (event) => {
    const selectedUf = event.target.value;
    setUfValue(selectedUf);
    setCityOptions(getCityOptions(selectedUf));
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const handleBairroChange = (event) => {
    const selectedBairro = event.target.value;
    setBairroValue(selectedBairro);
  };

  const handleTipoChange = (event) => {
    const selectedTipo = event.target.value;
    setTipoValue(selectedTipo);
  };

  const getCityOptions = (selectedUf) => {
    const cityOptionsMap = {
      PR: ['Curitiba', 'Londrina', 'Maringá', 'Foz do Iguaçu', 'Cascavel'],
    };
    return cityOptionsMap[selectedUf] || [];
  };

  const bairroOptionsMap = {
    Uberaba: 'Uberaba',
    'Prado Velho': 'Prado Velho',
    'Água Verde': 'Água Verde',
  };

  const tipoOptions = ['Casa', 'Apartamento'];

  const [sliderValue, setSliderValue] = useState(50);
  const [numericValue, setNumericValue] = useState(50);
  const [maxSliderValue, setMaxSliderValue] = useState(10000);
  const [maxNumericValue, setMaxNumericValue] = useState(10000);

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    setNumericValue(value);
  };

  const handleNumericInputChange = (event) => {
    const value = event.target.value;
    setNumericValue(value);
    setSliderValue(value);
  };

  const handleMaxSliderChange = (event) => {
    const value = event.target.value;
    setMaxSliderValue(value);
    setMaxNumericValue(value);
  };

  const handleMaxNumericInputChange = (event) => {
    const value = event.target.value;
    setMaxNumericValue(value);
    setMaxSliderValue(value);
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const rows = [
    { ufCidade: 'PR - Curitiba', bairro: 'Uberaba', tipo: 'Casa', valor: 'R$800.00' },
    { ufCidade: 'PR - Curitiba', bairro: 'Prado Velho', tipo: 'Apto.', valor: 'R$1200.00' },
    { ufCidade: '', bairro: '', tipo: '', valor: '' },
    { ufCidade: '', bairro: '', tipo: '', valor: '' },
  ];

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleBuscarImovel = () => {
    // Inserir a lógica para buscar os imóveis com base nos filtros selecionados
    setMostrarResultados(true);
  };

  const verImoClick = () => {
    navigate('/component/VisualizarImovel.js');
  };

  return (
    <div className="BuscarImovel">
      <header className="BuscarImovel-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="3">
                <img src={logo} className="rentfyLogoBuscarImovel" alt="logo" />
              </td>
            </tr>
            <tr>
              <td colSpan="3">Busque um Imóvel</td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Filtros</legend>
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
                    <div>
                      <label htmlFor="slider" className="labelCadImo">Valor Mínimo: {sliderValue}</label> <br/>
                      <input type="range" min="0" max="10000" value={sliderValue} step="1" id="sliderMin" onChange={handleSliderChange}/>
                      <input type="number" min="0" max="10000" value={numericValue} onChange={handleNumericInputChange}/>
                      <br/>
                    </div>
                    <div>
                      <label htmlFor="sliderMax" className="labelCadImo">Valor Máximo: {maxSliderValue}</label> <br/>
                      <input type="range" min="0" max="10000" value={maxSliderValue} step="1" id="sliderMax" onChange={handleMaxSliderChange}/>
                      <input type="number" min="0" max="10000" value={maxNumericValue} onChange={handleMaxNumericInputChange}/>
                      <br/>
                    </div>
                    
                  </form>
                  <button className="btnFiltrarImovel" onClick={handleBuscarImovel}>Buscar Imóvel</button>
                </fieldset>
              </td>
              <td>&nbsp;&nbsp;</td>
              <td>
                {mostrarResultados && (
                  <>
                    <p>Imóveis Localizados</p>
                    <br />
                    <table id="imoveis-localizados" className="table-bordered" style={{ fontSize: '16px' }}>
                      <thead>
                        <tr>
                          <th>UF - Cidade</th>
                          <th>Bairro</th>
                          <th>Tipo</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr
                            key={index}
                            onClick={() => handleRowClick(index)}
                            style={{ backgroundColor: selectedRow === index ? 'lightblue' : '' }}
                          >
                            <td>{row.ufCidade}</td>
                            <td>{row.bairro}</td>
                            <td>{row.tipo}</td>
                            <td>{row.valor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <br />
                    <button className="btnCadastrarImovel" onClick={verImoClick}>Visualizar Imóvel</button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default BuscarImovel;