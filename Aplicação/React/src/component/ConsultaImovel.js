import React, { useState } from 'react';
import '../css/ConsultaImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function ConsultaImovel() {
  const navigate = useNavigate();

  const [mostrarResultados, setMostrarResultados] = useState(true);
  const [selectedRow, setSelectedRow] = useState(-1);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const verImoClick = () => {
    navigate('/component/VisualizarImovel.js');
  };

  const rows = [
    { ufCidade: 'PR - Curitiba', bairro: 'Uberaba', tipo: 'Casa', valor: 'R$800.00' },
    { ufCidade: 'PR - Curitiba', bairro: 'Prado Velho', tipo: 'Apto.', valor: 'R$1200.00' },
    { ufCidade: '', bairro: '', tipo: '', valor: '' },
    { ufCidade: '', bairro: '', tipo: '', valor: '' },
  ];

  return (
    <div className="ConsultaImovel">
      <header className="ConsultaImovel-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="0">
                <img src={logo} className="rentfyLogoConsultaImovel" alt="logo" />
              </td>
            </tr>
            <tr>
              <td colSpan="0">Consulte suas Reservas</td>
            </tr>
            <tr>
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

export default ConsultaImovel;
