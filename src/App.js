import GradeProdutos from "./componentes/GradeProdutos";
import TelaCarrinho from "./componentes/TelaCarrinho";
import BarraBusca from "./templates/BarraBusca";
import Cabecalho from "./templates/Cabecalho";
import { useEffect, useState } from "react";


function App() {

  const [exibirCarrinho, setExibirCarrinho] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [listaCarrinho, setListaCarrinho] = useState([]);
  const [listaQtd, setListaQtd] = useState([]);

  useEffect(()=>{
    if(listaCarrinho.length>0){
      localStorage.setItem('carrinho', JSON.stringify(listaCarrinho));
      localStorage.setItem('quantidade', JSON.stringify(listaQtd));
    }
  }, [listaCarrinho])

  useEffect(() => {
    const carrinhoLocalStorage = localStorage.getItem('carrinho');
    if (carrinhoLocalStorage) {
      const carrinhoSalvo = JSON.parse(carrinhoLocalStorage);
      setListaCarrinho(carrinhoSalvo);
    }
    const qtdLocalStorage = localStorage.getItem('quantidade');
    if(qtdLocalStorage){
      const qtdSalva = JSON.parse(qtdLocalStorage);
      setListaQtd(qtdSalva);
    }
  }, []);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((resposta) => resposta.json())
      .then((produtos) => {
        setProdutos(produtos);
      });
  }, []);

  return (
    <div className="App">
      <Cabecalho />
      <BarraBusca
        exibirCarrinho={setExibirCarrinho}
        listaCarrinho={listaCarrinho}
      />
      {
        exibirCarrinho ?
          <GradeProdutos
            listaProdutos={produtos}
            exibirCarrinho={setExibirCarrinho}
            listaCarrinho={listaCarrinho}
            setListaCarrinho={setListaCarrinho}
            listaQtd={listaQtd}
            setListaQtd={setListaQtd}
          />
          :
          <TelaCarrinho
            exibirCarrinho={setExibirCarrinho}
            listaCarrinho={listaCarrinho}
            setListaCarrinho={setListaCarrinho}
            listaQtd={listaQtd}
            setListaQtd={setListaQtd}
          />
      }     
      {/* {console.log(listaCarrinho[0])}
      {console.log("\n"+listaQtd[0])} */}
    </div>
  );
}

export default App;
