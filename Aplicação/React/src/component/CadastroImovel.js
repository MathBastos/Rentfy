import React, { useState } from 'react';
import '../css/CadastroImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CadastroImovel() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [numQuartos, setNumQuartos] = useState('');
  const [numBanheiros, setNumBanheiros] = useState('');
  const [garagem, setGaragem] = useState('nao');
  const [tipo, setTipo] = useState('apartamento');
  const [varanda, setVaranda] = useState('nao');
  const [imobiliado, setImobiliado] = useState('nao');
  const [valorReserva, setValorReserva] = useState('');

  const handleCepBlur = () => {
    if (cep) {
      buscarEndereco();
    }
  };

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const buscarEndereco = () => {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        const { uf, localidade, logradouro } = response.data;
        setEstado(uf);
        setCidade(localidade);
        setRua(logradouro);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar o formulário
    // ...
  };

  return (
    <div className="CadastroImovel">
      <header className="CadastroImovel-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoCadastroImovel" alt="logo" />
              </td>
            </tr>
            <tr>
              <td className="center">
                <fieldset className="fieldset-custom">
                  <legend>Cadastro de Imóvel</legend>
                  <form id="CadastroImovel" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="cep">CEP</label>
                      <br />
                      <input type="text" id="cep" className="rounded-input" pattern="[0-9]{5}-?[0-9]{3}" value={cep} onChange={handleCepChange} onBlur={handleCepBlur} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="estado">Estado</label>
                      <br />
                      <select id="estado" className="rounded-input" value={estado} onChange={(e) => setEstado(e.target.value)}>
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
                      <label htmlFor="rua">Rua</label>
                      <br />
                      <input type="text" id="rua" className="rounded-input" value={rua} onChange={(e) => setRua(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numero">Número</label>
                      <br />
                      <input type="number" id="numero" className="rounded-input" value={numero} onChange={(e) => setNumero(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numQuartos">Número de Quartos</label>
                      <br />
                      <input type="number" id="numQuartos" className="rounded-input" value={numQuartos} onChange={(e) => setNumQuartos(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numBanheiros">Número de Banheiros</label>
                      <br />
                      <input type="number" id="numBanheiros" className="rounded-input" value={numBanheiros} onChange={(e) => setNumBanheiros(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="garagem">Garagem</label>
                      <br />
                      <select id="garagem" className="rounded-input" value={garagem} onChange={(e) => setGaragem(e.target.value)}>
                        <option value="nao">Não</option>
                        <option value="sim">Sim</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tipo">Tipo</label>
                      <br />
                      <select id="tipo" className="rounded-input" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
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

                    <button type="submit" className="btnCadastrarImovel">Cadastrar Imóvel</button>
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

export default CadastroImovel;
