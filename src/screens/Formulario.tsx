import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

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

  const [state, setState] = useState<PropsInput>({ position: '', score: '', name: '' })

  const [alerts, setAlerts] = useState({ name: false, score: false })

  const [data, setData] = useState<any>()

  const loadData = async () => {
    try {
      const highscores = await firestore().collection('highscores').orderBy('score', 'desc').get();
      setData(highscores.docs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const onSubmit = () => {
    const name = state.name.trim().length <= 2

    const score = parseInt(state.score.trim()) < 0 || state.score.trim().length === 0

    if (!name && !score) {
      firestore()
        .collection('highscores')
        .add({
          name: state.name ,
          score: parseInt(state.score),
        })
        .then(() => {
          console.log('Score added!');
        });
      loadData()
      setState({ position: '', score: '', name: '' })
    }

    setAlerts({ name, score })
  }

  const InputComponent = ({ item }: any) => {
    return (
      <View style={styles.flatListContainerItem}>
        <Text style={styles.flatListText}>{item.data().name}</Text>
        <Text style={styles.flatListText}>{item.data().score}</Text>
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
          data={data}
          bounces={false}
          renderItem={({ item }) => {
            return (
              <InputComponent item={item} />
            )
          }}
          keyExtractor={item => item.id}
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