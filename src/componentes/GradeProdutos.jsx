import Produto from "../templates/Produto";

export default function GradeProdutos(props) {

    if (props.listaProdutos) {
        return (
            <div style={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                margin: '10px',
                padding: '10px',
                gap: '20px'
            }}>
                {props.listaProdutos.map((produto) => (
                    <Produto
                        key={produto.id}
                        produto={produto}
                        listaCarrinho={props.listaCarrinho}
                        setListaCarrinho={props.setListaCarrinho}
                        listaQtd={props.listaQtd}
                        setListaQtd={props.setListaQtd}
                    />
                ))}
            </div>
        )
    }
    else {
        return (<h1>Carregando...</h1>)
    }
}