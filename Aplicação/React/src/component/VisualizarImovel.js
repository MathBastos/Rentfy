import React, { useState } from 'react';
import '../css/VisualizarImovel.css';
import logo from '../img/logo.png';
import camera from '../img/camera.png';
import location from '../img/location.png'

function VisualizarImovel() {
  const [ufValue, setUfValue] = useState('');
  const [cityOptions, setCityOptions] = useState([]);

  const handleUfChange = (event) => {
    const selectedUf = event.target.value;
    setUfValue(selectedUf);
    setCityOptions(getCityOptions(selectedUf));
  };

  const getCityOptions = (selectedUf) => {
    // Replace this with your logic to fetch the city options based on the selected UF
    // For this example, we'll use some static data
    const cityOptionsMap = {
      PR: ['Curitiba', 'Londrina', 'Maringá', 'Foz do Iguaçu', 'Cascavel'],
      // Add more options for other UFs if needed
    };
    return cityOptionsMap[selectedUf] || [];
  };

  return (
    <div className="VisualizarImovel">
      <header className="VisualizarImovel-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="4">
                <img src={logo} className="rentfyLogoVisualizarImovel" alt="logo" />
              </td>
            </tr>
            <tr>
              <td colSpan="4">Informações do Imóvel</td>
            </tr>
            <tr>
              <td>
                <fieldset>
                  <legend>Dados do Imóvel</legend>
                  <label htmlFor="UF" className="labelCadImo">UF: </label>
                  <select name="UFs" id="UFs" value={ufValue} onChange={handleUfChange}>
                    <option value="" disabled>--</option>
                    <option value="PR">PR</option>
                  </select>
                  &nbsp;&nbsp;
                  <label htmlFor="Cidade" className="labelCadImo">Cidade: </label>
                  <select id="cidadeSelect" name="cidade" disabled={ufValue === ''}>
                    <option value="" disabled>Selecione um UF primeiro</option>
                    {cityOptions.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                  <br></br>
                  <label className="labelCadImo">CEP: </label>
                  <input id ="cepCadImo" type="text"></input>
                  <br></br>
                  <label className="labelCadImo">Endereço: </label>
                  <input id ="ruaCadImo" type="text"></input>
                  <br></br>
                  <label className="labelCadImo">Número: </label>
                  <input id ="numCadImo" type="text" class="numCadImo"></input>
                  &nbsp;&nbsp;
                  <label className="labelCadImo">Comp.: </label>
                  <input id ="compCadImo" type="text" class="compCadImo"></input>
                  <br></br>
                  <fieldset>
                    <legend class="cadImoLegendFieldInfo">Infos Adicionais</legend>
                    <textarea name="infosAdicionais" rows="5" cols="30" class="textAreaSize"></textarea>
                  </fieldset>
                </fieldset>
              </td>
              <td>&nbsp;&nbsp;</td>
              <td>
                <p>Localização do Imóvel</p>
                <br></br>
                <img src={location} class="locationImg"></img>
                <br></br>
                <button className="btnCadastrarImovel">Alugar Imóvel</button>
              </td>
              <td>
                <button className="round-button">
                <img src={camera} className="camera" alt="logo" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default VisualizarImovel;
