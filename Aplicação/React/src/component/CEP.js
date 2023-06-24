import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CEPForm = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const buscarEndereco = () => {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        const { logradouro, bairro, localidade, uf } = response.data;
        const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
        setEndereco(enderecoCompleto);
      })
      .catch(error => {
        console.log(error);
        setEndereco('Endereço não encontrado');
      });
  };

  return (
    <div>
      <input type="text" value={cep} onChange={handleCepChange} />
      <button onClick={buscarEndereco}>Buscar</button>
      <p>{endereco}</p>
    </div>
  );
};

export default CEPForm;
