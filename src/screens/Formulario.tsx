import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  position: number,
  score: number,
  name: string
}

interface PropsInput {
  position: string,
  score: string,
  name: string
}

const Formulario = () => {

  const [formulario, setFormulario] = useState<Props[]>([{ position: 1, score: 1000, name: 'Oscar' }])

  const [state, setState] = useState<PropsInput>({ position: '', score: '', name: '' })

  const [alerts, setAlerts] = useState({ name: false, score: false })

  const ordering = (a: Props, b: Props) => {
    if (a.score > b.score) {
      return 1;
    }
    else if (a.score < b.score) {
      return -1;
    }
    return 0;
  }

  const onSubmit = () => {
    const name = state.name.trim().length <= 2

    const score = parseInt(state.score.trim()) < 0 || state.score.trim().length === 0

    if (!name && !score) {
      setFormulario([...formulario, { position: 2, score: parseInt(state.score), name: state.name }]);
      setState({ position: '', score: '', name: '' })
    }

    setAlerts({ name, score })
  }

  const InputComponent = ({item:{name, score}}: any) => {
    return (
      <View style={styles.flatListContainerItem}>
        <Text style={styles.flatListText}>{ name }</Text>
        <Text style={styles.flatListText}>{ score }</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form</Text>
      <Text style={styles.subtitle}>Data Entry</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Name</Text>
        <TextInput style={styles.input} placeholder='Into your name' maxLength={10} onChangeText={(e) => setState({ ...state, name: e })} value={state.name} />
      </View>
      {(alerts.name) && <Text style={styles.textAlert}>Min 3 letters</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Score</Text>
        <TextInput style={styles.input} placeholder='Into your score' keyboardType="numeric" onChangeText={(e) => setState({ ...state, score: e })} value={state.score} />
      </View>
      {(alerts.score) && <Text style={styles.textAlert}>Min value 0 </Text>}
      <TouchableOpacity onPress={onSubmit} disabled={false}>
        <View style={styles.containerButton}>
          <Text style={styles.textButton}>Add Data</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.flatListContainer}>
        <FlatList
          data={formulario.sort(ordering)}
          bounces={false}
          renderItem={({ item }) => {
            return (
                <InputComponent item={item} />
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  flatListContainer: {
    height: 300,
    marginVertical: 15,
    borderWidth: 1
  },
  flatListContainerItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  flatListText: {
    fontSize: 30,
    marginHorizontal: 20
  },
  textAlert: {
    color: 'red',
    top: -10
  },
  title: {
    fontSize: 50
  },
  subtitle: {
    fontSize: 40
  },
  textButton: {
    fontSize: 40,
    color: 'white'
  },
  containerButton: {
    backgroundColor: 'black',
    borderRadius: 50,
    paddingHorizontal: 15
  }
});

export default Formulario;