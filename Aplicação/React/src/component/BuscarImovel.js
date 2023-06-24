import React, { useState, useEffect } from 'react';
import '../css/BuscarImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BuscarImovel() {
  const [ufValue, setUfValue] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [bairroValue, setBairroValue] = useState('');
  const [tipoValue, setTipoValue] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [numQuartos, setNumQuartos] = useState('');
  const [numBanheiros, setNumBanheiros] = useState('');
  const [garagem, setGaragem] = useState('nao');
  const [varanda, setVaranda] = useState('nao');
  const [imobiliado, setImobiliado] = useState('nao');
  const [valorReserva, setValorReserva] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [imoveis, setImoveis] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    buscarImoveis();
  }, []);

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

  const handleCepBlur = () => {
    if (cep) {
      buscarEndereco();
    }
  };

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const buscarEndereco = () => {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        const { uf, localidade, logradouro } = response.data;
        setEstado(uf);
        setCidade(localidade);
        setRua(logradouro);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleBuscarImovel = () => {
    setMostrarResultados(true);
    buscarImoveis();
  };

  const verImoClick = () => {
    navigate('/component/VisualizarImovel.js');
  };

  const buscarImoveis = () => {
    // Inserir a lógica para buscar os imóveis no Spring Boot
    axios
      .get('http://localhost:8080/api/')
      .then((response) => {
        setImoveis(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="BuscarImovel">
      <header className="BuscarImovel-header">
        <img src={logo} className="rentfyLogoBuscarImovel" alt="logo" />
        <h2>Busque um Imóvel</h2>
        <div className="form-container">
          <fieldset className="fieldset-custom-buscar">
            <legend>Filtros</legend>
            <form id="GerenciarImovel">
              <div className="form-group">
                <label htmlFor="cep">CEP</label>
                <br />
                <input
                  type="text"
                  id="cep"
                  className="rounded-input"
                  pattern="[0-9]{5}-?[0-9]{3}"
                  value={cep}
                  onChange={handleCepChange}
                  onBlur={handleCepBlur}
                />
              </div>
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <br />
                <select id="estado" className="rounded-input" value={estado} onChange={handleUfChange}>
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
                <input type="text" id="cidade" className="rounded-input" value={cidade} onChange={(e) => setCidade(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="bairro">Bairro</label>
                <br />
                <input type="text" id="bairro" className="rounded-input" value={bairroValue} onChange={handleBairroChange} />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo</label>
                <br />
                <select id="tipo" className="rounded-input" value={tipoValue} onChange={handleTipoChange}>
                  <option value="">Selecione um tipo</option>
                  {tipoOptions.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="varanda">Varanda</label>
                <br />
                <select id="varanda" className="rounded-input" value={varanda} onChange={(e) => setVaranda(e.target.value)}>
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="imobiliado">Imobiliado</label>
                <br />
                <select id="imobiliado" className="rounded-input" value={imobiliado} onChange={(e) => setImobiliado(e.target.value)}>
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="valorReserva">Valor Reserva</label>
                <br />
                <input type="number" id="valorReserva" className="rounded-input" value={valorReserva} onChange={(e) => setValorReserva(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="quantidadeQuartos">Quantidade de Quartos</label>
                <br />
                <input
                  type="number"
                  id="quantidadeQuartos"
                  className="rounded-input"
                  value={numQuartos}
                  onChange={(e) => setNumQuartos(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantidadeBanheiros">Quantidade de Banheiros</label>
                <br />
                <input
                  type="number"
                  id="quantidadeBanheiros"
                  className="rounded-input"
                  value={numBanheiros}
                  onChange={(e) => setNumBanheiros(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="slider" className="labelCadImo">
                  Valor Mínimo: {sliderValue}
                </label>{' '}
                <br />
                <input type="range" min="0" max="10000" value={sliderValue} step="1" id="sliderMin" onChange={handleSliderChange} />
                <input type="number" min="0" max="10000" value={numericValue} onChange={handleNumericInputChange} />
                <br />
              </div>
              <div>
                <label htmlFor="sliderMax" className="labelCadImo">
                  Valor Máximo: {maxSliderValue}
                </label>{' '}
                <br />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={maxSliderValue}
                  step="1"
                  id="sliderMax"
                  onChange={handleMaxSliderChange}
                />
                <input type="number" min="0" max="10000" value={maxNumericValue} onChange={handleMaxNumericInputChange} />
                <br />
              </div>
            </form>
            <button className="btnFiltrarImovel" onClick={handleBuscarImovel}>
              Buscar Imóvel
            </button>
          </fieldset>
        </div>
        {mostrarResultados && (
          <div className="resultados-container">
            <h2>Imóveis Localizados</h2>
            <table id="imoveis-localizados" className="table-bordered" style={{ fontSize: '16px' }}>
              <thead>
                <tr>
                  <th>UF - Cidade</th>
                  <th>Bairro</th>
                  <th>Tipo</th>
                  <th>Qtde.<br />Quartos</th>
                  <th>Qtde.<br />Banheiros</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {imoveis.map((imovel, index) => (
                  <tr key={index} className={selectedRow === index ? 'selected-row' : ''} onClick={() => handleRowClick(index)}>
                    <td>{`${imovel.uf} - ${imovel.cidade}`}</td>
                    <td>{imovel.bairro}</td>
                    <td>{imovel.tipo}</td>
                    <td>{imovel.numQuartos}</td>
                    <td>{imovel.numBanheiros}</td>
                    <td>{imovel.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btnCadastrarImovel" onClick={verImoClick}>
              Visualizar Imóvel
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default BuscarImovel;
