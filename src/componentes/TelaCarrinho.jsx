import Produto from "../templates/Produto";
import { useEffect, useState } from "react";

export default function TelaCarrinho(props) {
  const mudarQuantidade = (index, event) => {
    const novaListaQtd = [...props.listaQtd];
    novaListaQtd[index] = parseInt(event.target.value);
    props.setListaQtd(novaListaQtd);

    const listaQtdLocalStore = localStorage.getItem('quantidade');
  
    if (listaQtdLocalStore) {
      const quantidadeListaLS = JSON.parse(listaQtdLocalStore);
      const novoValor = parseInt(event.target.value);
      quantidadeListaLS[index] = novoValor;
        if(novoValor>0)
        localStorage.setItem('quantidade', JSON.stringify(quantidadeListaLS));
    }
  };
  
  const excluirProduto = (index) => {
    const listaProds = [...props.listaCarrinho];
    const listaQtd = [...props.listaQtd];
    listaProds.splice(index, 1);
    listaQtd.splice(index, 1);
    props.setListaCarrinho(listaProds);
    props.setListaQtd(listaQtd);
    localStorage.setItem('carrinho', JSON.stringify(listaProds));
    localStorage.setItem('quantidade', JSON.stringify(listaQtd));
  };
  

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {props.listaCarrinho.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>R$ {item.price}</td>

              <td>
                <input
                  type="number"
                  value={props.listaQtd[index]}
                  min={0}
                  onChange={(event) => mudarQuantidade(index, event)}
                />
              </td>
              <td><button onClick={(event)=>excluirProduto(index, event)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => props.exibirCarrinho(true)}>Voltar</button>
    </div>
  );
}
