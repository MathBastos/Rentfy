import React from 'react';
import '../css/MainLocatario.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();

    const consultaImoClick = () => {
      navigate('/component/ConsultaImovel.js');
    };

    const visuImoClick = () => {
        navigate('/component/GerenciarImovel.js');
      };

    const buscarImoClick = () => {
        navigate('/component/BuscarImovel.js');
    };
    
    return (
        
      <div className="Main">
        <header className="Main-header">
            <table>
                <tr>
                    <td>
                        <img src={logo} className="rentfyLogoMain" alt="logo" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <h3>Bem-vindo Locador!</h3>
                        <h3>Escolha o que deseja fazer:</h3>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="btnBuscarImovel" onClick={buscarImoClick}>Buscar Imóvel</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="btnCadastrarImovel" onClick={consultaImoClick}>Consultar Reservas</button>
                    </td>
                </tr>
            </table>
            
        </header>
      </div>
    );
}

export default Main;