import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/GerenciarImovel.css';
import logo from '../img/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

function GerenciarImovel() {
  const navigate = useNavigate();
  const location = useLocation();
  const idImovel = new URLSearchParams(location.search).get('ID');

  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    cep: '',
    numero: '',
    complemento: '',
    numQuartos: '',
    numBanheiros: '',
    garagem: '',
    tipo: '',
    varanda: '',
    imobiliado: '',
    valorReserva: ''
  });

  useEffect(() => {
    const fetchImovelData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/imoveis/search?ID=${idImovel}`);
        const imovel = response.data[0];

        setFormData({
          cep: imovel.cep,
          numero: imovel.numero,
          complemento: imovel.complemento,
          numQuartos: imovel.numQuartos,
          numBanheiros: imovel.numBanheiros,
          garagem: imovel.garagem,
          tipo: imovel.tipo,
          varanda: imovel.varanda,
          imobiliado: imovel.imobiliado,
          valorReserva: imovel.valorReserva
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchImovelData();
  }, [idImovel]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar o imóvel?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/imoveis/?id=${idImovel}`);
        alert('Imóvel deletado com sucesso!');
        navigate('/component/MainLocador.js');
      } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao deletar o imóvel. Tente novamente mais tarde.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados atualizados para a API
  };

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
                  <form id="GerenciarImovel" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="cep">CEP</label>
                      <br />
                      <input
                        type="text"
                        id="cep"
                        className="rounded-input"
                        pattern="[0-9]{5}-?[0-9]{3}"
                        value={formData.cep}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numero">Número</label>
                      <br />
                      <input
                        type="number"
                        id="numero"
                        className="rounded-input"
                        value={formData.numero}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="complemento">Complemento</label>
                      <br />
                      <input
                        type="text"
                        id="complemento"
                        className="rounded-input"
                        value={formData.complemento}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numQuartos">Número de Quartos</label>
                      <br />
                      <input
                        type="number"
                        id="numQuartos"
                        className="rounded-input"
                        value={formData.numQuartos}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numBanheiros">Número de Banheiros</label>
                      <br />
                      <input
                        type="number"
                        id="numBanheiros"
                        className="rounded-input"
                        value={formData.numBanheiros}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="garagem">Garagem</label>
                      <br />
                      <select
                        id="garagem"
                        className="rounded-input"
                        value={formData.garagem}
                        onChange={handleChange}
                      >
                        <option>Sim</option>
                        <option>Não</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tipo">Tipo</label>
                      <br />
                      <select
                        id="tipo"
                        className="rounded-input"
                        value={formData.tipo}
                        onChange={handleChange}
                      >
                        <option>Casa</option>
                        <option>Apartamento</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="varanda">Varanda</label>
                      <br />
                      <select
                        id="varanda"
                        className="rounded-input"
                        value={formData.varanda}
                        onChange={handleChange}
                      >
                        <option>Sim</option>
                        <option>Não</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="imobiliado">Imobiliado</label>
                      <br />
                      <select
                        id="imobiliado"
                        className="rounded-input"
                        value={formData.imobiliado}
                        onChange={handleChange}
                      >
                        <option>Sim</option>
                        <option>Não</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="valorReserva">Valor Reserva</label>
                      <br />
                      <input
                        type="number"
                        id="valorReserva"
                        className="rounded-input"
                        value={formData.valorReserva}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btnAlterarImovel">
                      Alterar Imóvel
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btnDeletarAdmin" onClick={handleDelete}>
                      Deletar Imóvel
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

export default GerenciarImovel;
