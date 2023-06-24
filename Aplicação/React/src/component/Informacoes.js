import React, { useState } from 'react';
import '../css/Informacoes.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Informacoes() {
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
    { 
      ufCidade: 'PR - Curitiba', 
      bairro: 'Uberaba', 
      tipo: 'Casa', 
      quartos: 3, 
      banheiros: 2, 
      valor: 'R$800.00',
      locadora: 'ImoveisCWB',
      telefoneLocadora: '41 3266-6661',
      alugado: 'Sim',
      nomeLocatario: 'Matheus',
      telefoneLocatario: '41 99988-7766'
    },
    { 
      ufCidade: 'PR - Curitiba', 
      bairro: 'Prado Velho', 
      tipo: 'Apto.', 
      quartos: 2, 
      banheiros: 1, 
      valor: 'R$1200.00',
      locadora: 'ImovelFacil',
      telefoneLocadora: '41 3322-1100',
      alugado: 'Não',
      nomeLocatario: '',
      telefoneLocatario: ''
    },
    { 
      ufCidade: '', 
      bairro: '', 
      tipo: '', 
      quartos: null, 
      banheiros: null, 
      valor: '',
      locadora: '',
      telefoneLocadora: '',
      alugado: '',
      nomeLocatario: '',
      telefoneLocatario: ''
    },
    { 
      ufCidade: '', 
      bairro: '', 
      tipo: '', 
      quartos: null, 
      banheiros: null, 
      valor: '',
      locadora: '',
      telefoneLocadora: '',
      alugado: '',
      nomeLocatario: '',
      telefoneLocatario: ''
    },
  ];

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleInformacoes = () => {
    // Inserir a lógica para buscar os imóveis com base nos filtros selecionados
    setMostrarResultados(true);
  };

  const verImoClick = () => {
    navigate('/component/VisualizarImovel.js');
  };

  return (
    <div className="Informacoes">
      <header className="Informacoes-header">
        <img src={logo} className="rentfyLogoInformacoes" alt="logo" />
        <h2>Lista de Imóveis</h2>
        <table id="imoveis-localizados" className="table-bordered" style={{ fontSize: '16px' }}>
          <thead>
            <tr>
              <th>UF - Cidade</th>
              <th>Bairro</th>
              <th>Tipo</th>
              <th>Qtde.<br/>Quartos</th>
              <th>Qtde.<br/>Banheiros</th>
              <th>Valor</th>
              <th>Locadora</th>
              <th>Telefone Locadora</th>
              <th>Alugado</th>
              <th>Nome Locatário</th>
              <th>Telefone Locatário</th>
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
                <td>{row.quartos}</td>
                <td>{row.banheiros}</td>
                <td>{row.valor}</td>
                <td>{row.locadora}</td>
                <td>{row.telefoneLocadora}</td>
                <td>{row.alugado}</td>
                <td>{row.nomeLocatario}</td>
                <td>{row.telefoneLocatario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Informacoes;
