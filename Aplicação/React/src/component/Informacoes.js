import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // Fetch data from the Spring Boot backend using Axios
    axios.get('http://localhost:8080/api/imoveis')
      .then(response => {
        // Update the rows state with the received data
        setRows(response.data);
      })
      .catch(error => {
        // Handle the error
        console.error('Error fetching data:', error);
      });
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
