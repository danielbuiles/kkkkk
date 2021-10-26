import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,TextInput,Button,Picker,CheckBox } from 'react-native';

export default function App() {
  const [identificacion,setIdentificacion] = useState('');
  const [nombre,setNombre] = useState('');
  const [destino, setDestino] = useState("");
  const [nroPersonas,setNroPersonas] = useState("");
  const [nroDias,setNroDias] = useState('');
  const [barco, setBarco] = useState(false);
  const [discoteca,setDiscoteca] = useState(false);
  const [totalPago,setTotalPagar] = useState("");
  const [error,setError]= useState();

  let personasViaje = parseInt(nroPersonas);
  let diasViaje = parseInt(nroDias);
  let costoAdicional=0;
  let total;
  let descuento = false;
  
  const viaje = () =>{
    if (identificacion == '') {
      setError('campo identificacion esta vacio')
    }else if(nombre == ''){
      setError('campo Nombre esta vacio')
    }else if(destino == ''){
      setError('debe seleccionar un destino')
    }else if(nroPersonas==''){
      setError('el numero de personas debe de ser mayor a 0')
    }else if(nroDias==''){
      setError('el numero de Dias debe de ser mayor a 0')
    }else{

      if (barco) {
        costoAdicional += 100000;
      }

      if(discoteca){
        costoAdicional += 120000;
      }

      if(personasViaje>=10){
        descuento=true;
      }

        switch (destino) {
          case 'ca':
            total=((300000*personasViaje)*diasViaje)+(costoAdicional*personasViaje);
            setTotalPagar((descuento)?total-(total*0.10):total);
            setError('')
            costoAdicional =0;
            break;
  
          case 'sm':
            total=((250000*personasViaje)*diasViaje)+(costoAdicional*personasViaje);
            setTotalPagar((descuento)?total-(total*0.10):total);
            setError('')
            costoAdicional =0;
            break;
  
          case 'sa':
            total=((200000*personasViaje)*diasViaje)+(costoAdicional*personasViaje);
            setTotalPagar((descuento)?total-(total*0.10):total);
            setError('')
            costoAdicional =0;
            break;
        }
    }
  };

  const limpiar= ()=>{
    setIdentificacion("");
    setBarco("");
    setDestino("");
    setDiscoteca('');
    setError('');
    setTotalPagar('');
    setNombre('');
    setNroDias('');
    setNroPersonas('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Agencia de Viajes</Text>
      </View> 
      <View style={styles.form}>

        <View style={styles.conts}>
          <Text>Identificación: </Text>
          <TextInput style={styles.inputs} onChangeText={setIdentificacion} value={identificacion}></TextInput>
        </View>

        <View style={styles.conts}>
          <Text>Nombre: </Text>
          <TextInput style={styles.inputs} onChangeText={setNombre} value={nombre}></TextInput>
        </View>

        <View style={styles.conts}>
          <Text>Destino</Text>
          <Picker
            selectedValue={destino}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setDestino(itemValue)}
          >
            <Picker.Item label="Selecciona viaje" value="" />
            <Picker.Item label="Cartagena" value="ca" />
            <Picker.Item label="Santa Marta" value="sm" />
            <Picker.Item label="San Andres" value="sa" />
          </Picker>
        </View>

        <View style={styles.conts}>
          <Text>personas: </Text>
          <TextInput style={styles.inputs} onChangeText={setNroPersonas} value={nroPersonas}></TextInput>
        </View>

        <View style={styles.conts}>
          <Text>dias: </Text>
          <TextInput style={styles.inputs} onChangeText={setNroDias} value={nroDias}></TextInput>
        </View>

        <View style={styles.conts}>
          <Text>Adicionales: </Text>
          <View>
            <Text>Barco </Text>
            <CheckBox
              value={barco}
              onValueChange={setBarco}
            />

            <Text>Discoteca </Text>
            <CheckBox
              value={discoteca}
              onValueChange={setDiscoteca}
            />
          </View>
        </View>

        <View style={styles.conts}>
          <Text>Tota a pagar: </Text>
          <TextInput style={styles.inputs} value={totalPago}></TextInput>
        </View>

      </View>
      <Text style={{color:'red'}}>{error}</Text>
      <View style={styles.footer}>
        <Button style={styles.button} title="Calcular" onPress={viaje}></Button>
        <Button style={styles.button} title="Limpiar" onPress={limpiar}>Limpiar</Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DADEEB',
    alignItems: 'center',
    zIndex:0,
    justifyContent: 'center',
  },

  title: {
    fontSize:50,
    fontWeight:10,
    fontFamily: 'Helvetica Neue',
  },

  inputs:{
    border:"1px solid #000",
    marginBottom:10
  },

  button:{
    height:20,
    width:20,
    marginTop:20,
    marginLeft:10
  },

  footer:{
    marginTop:40,
    flexDirection:'row',
  },

  error:{
    color:"red",
  },

  checkboxContainer:{
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',
  },

  conts:{
    flexDirection:'row',
    marginTop:20,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
  },

  form:{
    border:'1px solid #000',
    width:'25%',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    display:'center',
    borderRadius:10,
    padding:40,
    backgroundColor: '#DFDEDE',
  },

  titleContainer:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    display:'flex',
    top:0,
    height:'20%',
  }
});
