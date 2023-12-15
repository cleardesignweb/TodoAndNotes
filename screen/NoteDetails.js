import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import FetchTasksCollection from '../components/FetchTasksCollection'
import { Ionicons } from '@expo/vector-icons'
  const NoteDetails = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const {id}  = route.params;
    const {document, loading} = FetchTasksCollection('note', id)
    const [noteDetails, setNoteDetails] = useState(null)

    useEffect(()=>{
        setNoteDetails(document)
    },[document])
  return (
    <View>
        <View >
            <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <Ionicons name='arrow-back' size={24} color={'#000000'} />
            </TouchableOpacity>
            {/* <Text tyle={styles.texth1}>{fetchTask?.taskName}</Text> */}
            <Text style={styles.texth1}>Note</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Notes')}>
            <Ionicons name='add-circle-outline' size={24} color={'#000000'}/>
            </TouchableOpacity>

            </View>
        </View>
      <View>
      <Text style={styles.noteTitle}>{noteDetails?.noteTitle}</Text>
      </View>

      <View>
      <Text style={styles.noteSection}>{noteDetails?.noteSection}</Text>
      </View>
    </View>
  )
}

export default NoteDetails

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
        fontWeight: 'normal',
        textAlign: 'center',
        marginLeft:10,
        color:'#000',
        fontSize:20
   },
    noteTitle: {
         borderBottomWidth:1,
        borderColor:'#ccc',
        marginBottom:10,
        padding:10,
        fontSize:20,
        fontWeight: 'bold'
    },
    noteSection: {
        padding:10,
        fontSize:17
    }
})