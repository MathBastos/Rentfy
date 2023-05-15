import React, { useState } from 'react';
import '../css/CadastroImovel.css';
import logo from '../img/logo.png';
import location from '../img/location.png'

function CadastroImovel() {
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
    <div className="CadastroImovel">
      <header className="CadastroImovel-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="3">
                <img src={logo} className="rentfyLogoCadastroImovel" alt="logo" />
              </td>
            </tr>
            <tr>
              <td colSpan="3">Cadastre seu Imóvel</td>
            </tr>
            <tr>
              <td>
                <fieldset>
                  <legend>Informações do Imóvel</legend>
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
                  <div className="file-input-container">
                    <label htmlFor="arquivo" className="labelEnvioCadImo">Enviar Fotos</label>
                    <input type="file" name="arquivo" id="arquivo" className="inputCadImo" accept=".jpg, .png" multiple/>
                  </div>
                </fieldset>
              </td>
              <td>&nbsp;&nbsp;</td>
              <td>
                <p>Localização do Imóvel</p>
                <br></br>
                <img src={location} class="locationImg"></img>
                <br></br>
                <button className="btnCadastrarImovel">Cadastrar Imóvel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default CadastroImovel;
