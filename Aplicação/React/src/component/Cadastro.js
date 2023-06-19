import React from 'react';
import '../css/Cadastro.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();

    const cadImoClick = () => {
      navigate('/component/CadastroLocatario.js');
    };

    const buscarImoClick = () => {
        navigate('/component/CadastroLocadora.js');
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
                        <h3>Bem-vindo Usuário!</h3>
                        <h3>Escolha o tipo de cadastro:</h3>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="btnBuscarImovel" onClick={buscarImoClick}>Locadora</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="btnCadastrarImovel" onClick={cadImoClick}>Locatário</button>
                    </td>
                </tr>
            </table>
            
        </header>
      </div>
    );
}

export default Main;