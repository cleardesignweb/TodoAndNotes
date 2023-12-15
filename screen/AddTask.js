import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../data/firebase'
import DatePicker from 'react-native-modern-datepicker'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { useAuth } from '../auth/AuthContext'
 const AddTask = () => {
  const [open, setOpen] = useState(null)
  const [date, setDate] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState('');
  const [taskName, setTakName] = useState('')
  const [discription, setDiscription] = useState('')
  const [loading, setLoading] = useState(null)
  const navigation = useNavigation()
  const {user} = useAuth()
  const handleSubmit = async ()=>{
    try {
        const docRef = await addDoc(collection(db, 'task'), {
            taskName: taskName,
            discription:discription,
            date:date,
            selectedCategory:selectedCategory,
            uid: user.uid
        })
        navigation.navigate('Home')
        console.log('Todo added with ID:...', docRef)
        setLoading(false)
    }catch(error){
        console.log("Error, adding list", error)
    }
  }
  function handleOnPress(){
    setOpen(open)
  }
  function handleChange(propDate){
    setDate(propDate)
  }
  function handleCategoryPress(category){
    setSelectedCategory(category)
  }
  return (
    <ScrollView>
        <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{marginLeft:10}}>
                    <Ionicons name='arrow-back' color={"#000"} size={24}/>
                </TouchableOpacity>
                <Text style={styles.texth1}>Create New Task</Text>
            </View>
        <View style={styles.container}>
             
        {/* <Text style={styles.texth1}>Create New Task</Text> */}
        <View style={styles.taskInputes}>
        <Text style={styles.texth2}>Name</Text>
        <TextInput
        style={styles.input}
        placeholder='Team meeting, read a book, etc...'
        onChangeText={(text)=>setTakName(text)}
        value={taskName}
        autoCapitalize='sentences'
        />
        </View>

        <View style={styles.taskInputes}>
        <Text style={styles.texth2}>Discription</Text>
        <TextInput
        
        placeholder='Task discription'
        onChangeText={(text)=>setDiscription(text)}
        value={discription}
         autoCapitalize='sentences'
        multiline={true}
        editable
        maxLength={250}
        style={styles.input}
        />
        </View>
        <View style={styles.categoryConatiner}>
            <Text style={styles.categoryh1}>Category</Text>
            <ScrollView style={[styles.categories, ]} horizontal showsHorizontalScrollIndicator={false}>
          {['Project', 'Meeting', 'Event', 'Personal', 'Other'].map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={[styles.categoriesName, { backgroundColor: selectedCategory === category ? 'teal' : '#ccc' }]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>


{/* Date  */}
    <View style={styles.dateContainer}> 
        <TouchableOpacity onPress={handleOnPress}>
            <Text style={{margin:10}}>Pick a date</Text>
        </TouchableOpacity>
        <Modal
        animationType='slide'
        transparent={true}
        visible={open}
        />
        
    </View>
     
    </View>
    <DatePicker
    modal='calender'
    selected={date.toString()}
    onDateChange={handleChange}
    style={styles.calender}
    />

   {loading ? (
    <View>
      <ActivityIndicator/>
    </View>
   ) : (
    <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
    <Text style={styles.createText}>Create</Text>
    </TouchableOpacity>
   )}
    </ScrollView>
  )
}

export default AddTask

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#514D4D',
    width:'100%',
    margin:10
   },
   header: {
    flexDirection:'row',
    alignItems: 'center',
     height:50,
     borderBottomWidth: 1,
     borderColor: '#ccc'
    },
   texth1: {
     fontWeight: 'normal',
    textAlign: 'center',
    marginLeft:10,
    color:'#000',
    fontSize:20
   },
   texth2: {
    fontSize:13,
     },
  input: {
     borderBottomWidth:1,
    borderColor: 'teal',
    width: '90%',
    fontSize:20,
    marginTop:10,
    marginBottom:10
  },
  taskInputes: {
    marginTop:20
  },
  categoryConatiner: {
   },
  categoryh1: {
    fontSize:25,
    fontWeight: 'bold',
   },
   categories:{
    marginTop:10,
     },
   categoriesName: {
    borderWidth: 1,
    borderColor:'#fff',
    padding:10,
    width: 80,
    borderRadius:20,
    marginLeft:10,
    textAlign:'center',
    color:'#fff',
    },
   
   calender: {
     width: '90%',
    justifyContent:'center',     
    alignSelf:'center',
    borderRadius:10
     },
     createButton: {
        backgroundColor: 'teal',
        width: '90%',
        alignSelf: 'center',
        marginTop:20,
        marginBottom:10,
        borderRadius:10
     },
     createText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        padding:10,
        fontSize:20
     }
})