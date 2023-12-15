import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FetchTasksCollection from '../components/FetchTasksCollection'
import { useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../data/firebase';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../auth/AuthContext';
    const TaskDetails = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const [addTask, setAddTask] = useState('')
    const { id } = route.params;
    const {user} = useAuth()
    const {document, loaidng} = FetchTasksCollection('task', id)
    const [fetchTask, setFetchTask] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        setFetchTask(document)
    }, [document])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
    
    const handleAddTask = async ()=>{
        const tasksRef =  doc(db, 'task', id)
        try{
            await updateDoc(tasksRef, {
                task: arrayUnion({
                    addTask: addTask,
                    uid:user.uid,
                })
            })
             navigation.navigate('TaskDetails', {id})
 
            console.log('Task added with ID:...', tasksRef)
         }catch(error){
            console.log('Error adding task', error)
        }
    }


  return (
    <View>
    <ScrollView>
        <View >
            <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <Ionicons name='arrow-back' size={24} color={'#000000'} />
            </TouchableOpacity>
            {/* <Text tyle={styles.texth1}>{fetchTask?.taskName}</Text> */}
            <Text tyle={styles.texth1}>Task</Text>
            <TouchableOpacity onPress={toggleModal}>
            <Ionicons name='add-circle-outline' size={24} color={'#000000'}/>
            </TouchableOpacity>

            </View>
        </View>
    <View>
        <Text style={styles.label}>Task name</Text>
        <Text style={styles.texth1}>{fetchTask?.taskName}</Text>
        <Text style={styles.label}>Disiscription</Text>
        <Text style={styles.texth1}>{fetchTask?.discription}</Text>
        <Text style={styles.label}>Tasks</Text>
         {fetchTask?.task?.map((task, index) => (
        <Text key={index} style={styles.texth1}>
          {task.addTask}
        </Text>
      ))}
      </View>
       

        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={{marginBottom:10}}>Hide Modal</Text>
            </TouchableOpacity>

            <Text>Add a new task</Text>
            <TextInput
            placeholder='Add task'
            value={addTask}
            onChangeText={(text)=>setAddTask(text)}
            onSubmitEditing={handleAddTask}
            style={styles.taskInput}
            />
          </View>
        </View>
      </Modal>

    </ScrollView>


    </View>
  )
}

export default TaskDetails

const styles = StyleSheet.create({
    header:{
        height:50,
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        borderBottomWidth:1,
        borderColor: '#E4E4E4',
        justifyContent: 'space-between'
    },
    texth1: {
         margin:10,
        backgroundColor: '#F1EFEF',
        padding:20,
        color: '#000',
        borderRadius:10,
        borderWidth:1,
        fontSize:20
    },
    taskInput: {
        width: '100%',
        margin:10,
        borderWidth: 1,
        borderColor: '#008080',
        backgroundColor: '#fff'
    },
    label: {
        marginLeft:10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
})