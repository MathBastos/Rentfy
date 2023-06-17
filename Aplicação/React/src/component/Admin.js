import React, { useState } from 'react';
import '../css/Admin.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };
  
  const rows = [
    { id: '1', tipo: 'Locadora', nome: 'Lucas A.', usuario: 'lucao', email: 'lucao@gmail.com' },
    { id: '2', tipo: 'Locatário', nome: 'Matheus', usuario: 'theuzin', email: 'theuzin@gmail.com' },
    { id: '3', tipo: 'Locadora', nome: 'Lucas S.', usuario: 'luquinhas', email: 'luquinhas@gmail.com' },
    { id: '4', tipo: 'Locatário', nome: 'Leandro', usuario: 'leandrex', email: 'leandrex@gmail.com' },
  ];

  const handleEditarUsuario = () => {
    if (selectedRow !== null) {
      const tipoUsuario = rows[selectedRow].tipo;
      if (tipoUsuario === 'Locadora') {
        navigate('/component/EditarLocadora.js');
      } else if (tipoUsuario === 'Locatário') {
        navigate('/component/EditarLocatario.js');
      }
    }
  };

  return (
    <div className="Admin">
      <header className="Admin-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoAdmin" alt="logo" />
              </td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Painel de Administração</legend>
                    <div className="form-group">
                      <label htmlFor="dataInicio">Lista de Usuários</label>
                      <br />
                      <table id="imoveis-localizados" className="table-bordered" style={{ fontSize: '16px' }}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tipo</th>
                          <th>Nome</th>
                          <th>Usuário</th>
                          <th>E-mail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr
                            key={index}
                            onClick={() => handleRowClick(index)}
                            style={{ backgroundColor: selectedRow === index ? 'lightblue' : '' }}
                          >
                            <td>{row.id}</td>
                            <td>{row.tipo}</td>
                            <td>{row.nome}</td>
                            <td>{row.usuario}</td>
                            <td>{row.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                    <div className="form-group">
                      <button className="btnEditarAdmin" onClick={handleEditarUsuario}>Editar Usuário</button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button className="btnDeletarAdmin">Deletar Usuário</button>
                    </div>
                </fieldset>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Admin;
