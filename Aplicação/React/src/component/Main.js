import React from 'react';
import '../css/Main.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();

    const cadImoClick = () => {
      navigate('/component/CadastroImovel.js');
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
                        <h3>Escolha o que deseja fazer:</h3>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="btnBuscarImovel">Buscar Imóvel</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="btnCadastrarImovel" onClick={cadImoClick}>Cadastrar Imóvel</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="btnGerenciarImovel">Gerenciar Imóvel</button>
                    </td>
                </tr>
            </table>
            
        </header>
      </div>
    );
}

export default Main;