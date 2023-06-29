import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Admin.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const locatariosResponse = await axios.get('http://localhost:8080/api/locatarios/');
      const locadorasResponse = await axios.get('http://localhost:8080/api/locadoras/');
      const locatariosData = locatariosResponse.data;
      const locadorasData = locadorasResponse.data;
      const mergedData = mergeUsersData(locatariosData, locadorasData);
      setUsers(mergedData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const mergeUsersData = (locatariosData, locadorasData) => {
    const mergedData = [];

    locatariosData.forEach((locatario) => {
      const mergedUser = {
        id: locatario.usuario.id,
        tipo: 'Locatário',
        usuario: locatario.usuario.usuario,
        email: locatario.usuario.email,
        cpf: locatario.cpf,
        outraId: locatario.id,
      };
      mergedData.push(mergedUser);
    });

    locadorasData.forEach((locadora) => {
      const mergedUser = {
        id: locadora.usuario.id,
        tipo: 'Locadora',
        usuario: locadora.usuario.usuario,
        email: locadora.usuario.email,
        cnpj: locadora.cnpj,
        outraId: locadora.id,
      };
      mergedData.push(mergedUser);
    });

    return mergedData;
  };

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleEditarUsuario = () => {
    if (selectedRow !== null) {
      const tipoUsuario = users[selectedRow].tipo;
      if (tipoUsuario === 'Locadora') {
        navigate('/component/EditarLocadora.js');
      } else if (tipoUsuario === 'Locatário') {
        navigate('/component/EditarLocatario.js');
      }
    }
  };

  const handleDeletarUsuario = () => {
    if (selectedRow !== null) {
      const tipoUsuario = users[selectedRow].tipo;
      const outraId = users[selectedRow].outraId;
      alert(`ID do Usuário: ${users[selectedRow].id}\nID do ${tipoUsuario}: ${outraId}`);
      if (tipoUsuario === 'Locatário') {
        axios.delete(`http://localhost:8080/api/locadoras/${outraId}`)
          .then(response => {
            if (response.status === 200) {
              console.log('Locadora excluída com sucesso!');
              removeUserFromTable(selectedRow);
            } else {
              console.log('Ocorreu um erro ao excluir a locadora.');
            }
          })
          .catch(error => {
            console.error('Ocorreu um erro ao excluir a locadora:', error);
          });

        axios.delete(`http://localhost:8080/api/usuarios/${users[selectedRow].id}`)
          .then(response => {
            if (response.status === 200) {
              console.log('Usuário da Locadora excluído com sucesso!');
            } else {
              console.log('Ocorreu um erro ao excluir o usuário da Locadora.');
            }
          })
          .catch(error => {
            console.error('Ocorreu um erro ao excluir o usuário da Locadora:', error);
          });
      }
      if (tipoUsuario === 'Locadora') {
        axios.delete(`http://localhost:8080/api/locatarios/${outraId}`)
          .then(response => {
            if (response.status === 200) {
              console.log('Locatário excluído com sucesso!');
              removeUserFromTable(selectedRow);
            } else {
              console.log('Ocorreu um erro ao excluir o locatário.');
            }
          })
          .catch(error => {
            console.error('Ocorreu um erro ao excluir o locatário:', error);
          });

        axios.delete(`http://localhost:8080/api/usuarios/${users[selectedRow].id}`)
          .then(response => {
            if (response.status === 200) {
              console.log('Usuário do Locatário excluído com sucesso!');
            } else {
              console.log('Ocorreu um erro ao excluir o usuário do locatário.');
            }
          })
          .catch(error => {
            console.error('Ocorreu um erro ao excluir o usuário do locatário:', error);
          });
      }
    }
  };

  const removeUserFromTable = (index) => {
    setUsers(prevUsers => prevUsers.filter((user, idx) => idx !== index));
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
                <fieldset className="fieldset-custom-admin">
                  <legend>Painel de Administração</legend>
                  <div className="form-group">
                    <label htmlFor="dataInicio">Lista de Usuários</label>
                    <br />
                    <table
                      id="imoveis-localizados"
                      className="table-bordered"
                      style={{ fontSize: '16px' }}
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tipo</th>
                          <th>Usuário</th>
                          <th>E-mail</th>
                          <th>CPF/CNPJ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr
                            key={index}
                            onClick={() => handleRowClick(index)}
                            style={{ backgroundColor: selectedRow === index ? 'lightblue' : '' }}
                          >
                            <td>{user.id}</td>
                            <td>{user.tipo}</td>
                            <td>{user.usuario}</td>
                            <td>{user.email}</td>
                            <td>{user.tipo === 'Locatário' ? user.cpf : user.cnpj}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="form-group">
                    <button className="btnEditarAdmin" onClick={handleEditarUsuario}>
                      Editar Usuário
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btnDeletarAdmin" onClick={handleDeletarUsuario}>
                      Deletar Usuário
                    </button>
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
