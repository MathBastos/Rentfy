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
                <fieldset>
                  <legend>Filtros</legend>
                  <label htmlFor="UF" className="labelCadImo">
                    UF:{' '}
                  </label>
                  <select name="UFs" id="UFs" value={ufValue} onChange={handleUfChange}>
                    <option value="" disabled>
                      --
                    </option>
                    <option value="PR">PR</option>
                  </select>
                  <br />
                  <label htmlFor="Cidade" className="labelCadImo">
                    Cidade:{' '}
                  </label>
                  <select id="cidadeSelect" name="cidade" disabled={ufValue === ''} value={selectedCity} onChange={handleCityChange}>
                    <option value="" disabled>
                      Selecione um UF primeiro
                    </option>
                    {cityOptions.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <br />
                  <label htmlFor="Bairro" className="labelCadImo">
                    Bairro:{' '}
                  </label>
                  <select id="bairroSelect" name="bairro" disabled={selectedCity === ''} value={bairroValue} onChange={handleBairroChange}>
                    <option value="" disabled>
                      Selecione um bairro
                    </option>
                    {Object.entries(bairroOptionsMap).map(([key, value]) => (
                      <option key={key} value={value}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <br />
                  <label htmlFor="Tipo" className="labelCadImo">
                    Tipo:{' '}
                  </label>
                  <select id="tipoSelect" name="tipo" value={tipoValue} onChange={handleTipoChange}>
                    <option value="" disabled>Selecione um tipo</option>
                    {tipoOptions.map((tipo, index) => (
                      <option key={index} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
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
                    <button className="btnCadastrarImovel" onClick={verImoClick}>Atualizar Imóvel</button>
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
