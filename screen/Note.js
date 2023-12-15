import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Ionicons } from '@expo/vector-icons'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../data/firebase'
import {useAuth} from '../auth/AuthContext'
  const Note = () => {
  const {user} = useAuth()
  const navigation = useNavigation()
  const [noteTitle, setNoteTile] = useState('')
  const [noteSection, setNoteSection] = useState('')
  const [loading, setLoading] = useState(null)
   const handleNote = async()=>{
   try{
    const noteRef = addDoc(collection(db, 'note'),{
        uid: user.uid,
        noteTitle: noteTitle,
        noteSection: noteSection
    })
    setLoading(false)
    navigation.navigate('Home')
    console.log('Note created with ID:...',  noteRef)
   }catch(error){
    console.log('Error creating note', error)
   }
  }
 
  return (
    <View>
      <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{marginLeft:10}}>
                    <Ionicons name='arrow-back' color={"#000"} size={24}/>
                </TouchableOpacity>
                <Text style={styles.texth1}>Create New Note</Text>
            </View>
       <View>
        <TextInput
        placeholder='Note tile'
        value={noteTitle}
        onChangeText={(text)=>setNoteTile(text)}
        style={styles.notesInputes}     
        maxLength={30}   
         />

        <TextInput
        placeholder='Write note'
        value={noteSection}
        onChangeText={(text)=>setNoteSection(text)}
        style={styles.noteSection}        
         multiline={true}
        editable
         />
      </View>
      {loading ? (
        <View>
          <ActivityIndicator/>
        </View>
      ): (
        <View>
        <TouchableOpacity style={styles.createButton} onPress={handleNote}>
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  )
}

export default Note

const styles = StyleSheet.create({
  header: {
    flexDirection:'row',
    alignItems: 'center',
     height:50,
    },
    texth1: {
      fontWeight: 'normal',
     textAlign: 'center',
     marginLeft:10,
     color:'#000',
     fontSize:20
    },
    notesInputes: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      height:50,
      margin:10,
      fontSize:20
    },
    noteSection: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      height:450,
      textAlignVertical: 'top', 
      margin:10,
      fontSize:20
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