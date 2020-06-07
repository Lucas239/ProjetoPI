import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Keyboard, Platform, Image} from 'react-native';
import { Cartao } from './Cartao';
import Medidas from '../Medidas/Medidas';
import { withNavigation } from 'react-navigation';
import Cores from '../Cores/Cores';
import * as EstoqueAction from '../Store/EstoqueAction';

const ProdutoItem = (props) => {
    const dispatch = useDispatch();

    const confirmaExclusao = () => {
        Alert.alert(
            'Deletar produto',
            'Tem certeza que deseja excluir esse item?', //mensagem
            //coleção de botões, cada botão é um JSON
            [
                {text: 'Deletar', style: 'default', onPress: () => deletar(props.id)},
                {text: 'Cancelar', style: 'default', onPress:  Keyboard.dismiss()},
            ]
        );
       
    }

    const deletar = (id) => {
        dispatch(EstoqueAction.deletarProduto(id));
    }

    return(
        <TouchableOpacity onPress={() => props.onClick(props.id)} onLongPress={confirmaExclusao}>
            <View style={styles.item}>
                <Cartao estilos={styles.cartao}>
                    <Image style={styles.imagem} source={{ uri: props.imagem }} />
                    <Text>{props.nome}</Text>
                    <Text>{props.preco}</Text>
                    <Text>{props.unidade}</Text>
                    <Text>{props.codigo}</Text>

                </Cartao>
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create ({
    item: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-around',
        marginBottom: Medidas.margin10,
        marginTop: 10
    },
    cartao: {
        //300 pontos de largura
        width: Medidas.width300,
        maxWidth: Medidas.width100,
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-around',
        textAlignVertical: 'center'
    },
    imagem: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
        borderColor: Cores.primary,
        borderWidth: 1
    }
});

export default withNavigation(ProdutoItem);