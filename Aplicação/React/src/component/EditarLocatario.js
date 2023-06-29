import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../css/EditarLocatario.css';
import logo from '../img/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import InputMask from 'react-input-mask';

function EditarLocatario() {
  const navigate = useNavigate();
  const location = useLocation();
  const cpfEdit = new URLSearchParams(location.search).get('CPF');
  const idUser = new URLSearchParams(location.search).get('ID');

  const [selectedRow, setSelectedRow] = useState(null);
  const [locatarioData, setLocatarioData] = useState({
    cpf: '',
    celular: '',
    data_nascimento: '',
    cep: '',
    numero: '',
    complemento: '',    
  });

  useEffect(() => {
    const fetchLocatarioData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/locatarios/search?cpf=${cpfEdit}`);
        const locatario = response.data[0];

        const dataNascimento = moment(locatario.data_nascimento, 'YYYY-MM-DD').format('YYYY-MM-DD');

        setLocatarioData({ ...locatario, dataNascimento });
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocatarioData();
  }, [cpfEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedLocatarioData = {};
  
    for (let [key, value] of formData.entries()) {
      if (key === "dataNascimento") {
        value = moment(value).format('YYYY-MM-DD');
      }
      updatedLocatarioData[key] = value;
    }
    
    const locatarioId = locatarioData.id;
    updatedLocatarioData.usuario_id = idUser;
  
    axios
      .put(`http://localhost:8080/api/locatarios/?id=${locatarioId}`, updatedLocatarioData)
      .then((response) => {
        console.log(response.data);
        alert('Locatário atualizado com sucesso!');
        navigate('/component/Admin.js');
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLocatarioData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="EditarLocatario">
      <header className="EditarLocatario-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoEditarLocatario" alt="logo" />
              </td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Editar Locatário</legend>
                  <form id="cadastroLocatario" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="dataNascimento">Data de Nascimento</label>
                      <br />
                      <input
                        type="date"
                        id="dataNascimento"
                        name="data_nascimento" // Adicione o atributo 'name'
                        className="rounded-input"
                        value={locatarioData.dataNascimento}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cep">CEP</label>
                      <br />
                      <InputMask
                        mask="99999-999"
                        type="text"
                        id="cep"
                        name="cep" // Adicione o atributo 'name'
                        className="rounded-input"
                        value={locatarioData.cep}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numero">Número</label>
                      <br />
                      <input
                        type="text"
                        id="numero"
                        name="numero" // Adicione o atributo 'name'
                        className="rounded-input"
                        value={locatarioData.numero}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="complemento">Complemento</label>
                      <br />
                      <input
                        type="text"
                        id="complemento"
                        name="complemento" // Adicione o atributo 'name'
                        className="rounded-input"
                        value={locatarioData.complemento}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="celular">Celular</label>
                      <br />
                      <InputMask
                        mask="(99) 9 9999-9999"
                        type="tel"
                        id="celular"
                        name="celular" // Adicione o atributo 'name'
                        className="rounded-input"
                        value={locatarioData.celular}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cpf">CPF</label>
                      <br />
                      <InputMask
                        mask="999.999.999-99"
                        type="text"
                        id="cpf"
                        name="cpf" // Adicione o atributo 'name'
                        className="rounded-input"
                        value={locatarioData.cpf}
                        onChange={handleInputChange}
                      />
                    </div>

                    <button type="submit" className="btnCadastrarLocatario">
                      Cadastrar Locatário
                    </button>
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

export default EditarLocatario;
