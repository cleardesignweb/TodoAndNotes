import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Systrace, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../data/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons,Entypo,FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../auth/AuthContext';
   const HomeScreen = () => {
   const [userName, setUserName] = useState([])
   const [tasks, setTasks] = useState([])
   const [isLoading,setIsLoading] = useState(null)
   const [noteLoading, setNoteLoading] = useState(null)
   const [notes, setNotes] = useState([])
   const navigation = useNavigation()
   const {user } = useAuth()
useEffect(() => {
  onAuthStateChanged(auth, (user)=>{
    if (user){
      const uid =  user.uid;
        const fetchData = async () => {
           const citiesRef = collection(db, 'users');
        const querySnapshot = query(citiesRef, 
          where("userId", "==", uid));             
         const snapshot = await getDocs(querySnapshot);
         const documents = snapshot.docs.map((doc) => ({
         id: doc.id,
            ...doc.data(),
           }));
           setUserName(documents);
       };            
      fetchData();
    }      
  })    
},[])  

const fetchTasks = async()=>{
  const uid =  user.uid;
  const tasksRef = collection(db, 'task');
  const querySnapshot = query(tasksRef, where("uid", '==', uid));
  const snapshot = await getDocs(querySnapshot)
  const tasksDocuments = snapshot.docs.map((doc)=>({
    id:doc.id,
    ...doc.data(),
  }))
  setTasks(tasksDocuments);
  setIsLoading(false)
  
}

useEffect(()=>{
  fetchTasks();
},[])



const fetchNotes = async()=>{
  const uid = user.uid;
  const noteRef = collection(db, 'note');
  const querySnapshot = query(noteRef, where("uid", '==', uid));
  const snapshot = await getDocs(querySnapshot)
  const notesDocuments = snapshot.docs.map((doc)=>({
    id:doc.id,
    ...doc.data()
  }))
  setNotes(notesDocuments)
  setNoteLoading(false)
}


useEffect(()=>{
  fetchNotes()
},[])

  return (
    <View>
      <StatusBar
      backgroundColor={'#ccc'}
      animated={true}
      />
  <ScrollView>
      {userName.map((currentUser, index)=>(
          <View key={index}>
              
             <View style={styles.container}>
      <LinearGradient
         colors={['#009090', 'transparent']}
        style={styles.background}
      />


      <LinearGradient
         colors={['#008080', '#008080']}
        style={styles.headerContainer}>

          <View 
          // style={styles.headerContainer}
          >
              <View style={styles.nameConatiner}>
                <Text style={styles.texth1}>Hello!</Text>
                <Text style={styles.displayNametext}>{currentUser.displayName} {currentUser.lastName}</Text>
              </View>              
             </View>
       </LinearGradient>
    </View>
          </View>
      )           
      )}    


       
       <View style={styles.weeklyTaskContainer}>
      <Text style={styles.texth2}>Tasks</Text>

      {isLoading ? (
        <View>
          <ActivityIndicator/>
        </View>
      ): (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {tasks.map((TodoTask, index)=> {
        const {id} = TodoTask
        return( 
          <TouchableOpacity key={index}  onPress={()=>navigation.navigate('TaskDetails', {id})}>
          <View style={styles.weeklutasks}>      
           <View   style={styles.WeeklyContentInfo}>
           <FontAwesome5 name="tasks" size={24} color="teal" style={styles.taskIcon1} />
               <Text style={styles.text1}>{TodoTask.taskName}</Text> 
               <View style={styles.dotContainer}>
               <Entypo name="dot-single" size={24} color="black" style={styles.dot} />
               <Text style={styles.text2}>{TodoTask.task?.length || 0} Tasks</Text>
               </View>
               <Ionicons name='add' size={24} color={'teal'} style={styles.taskIcon1}/>
           </View>
          </View>
          </TouchableOpacity>
        )
      })}
      </ScrollView>
      )}
      </View>

 <ScrollView>
 <View>
 <Text style={styles.texth2}>Notes</Text>
    {notes.map((note, index)=>{
      const {id} = note;
      return (
    <TouchableOpacity key={index}  style={styles.noteContainer} onPress={()=>navigation.navigate('NoteDetails', {id})}>
    <View>
    <Ionicons name='book' size={40} color={"#008080"} style={styles.bookICon}/>
    </View>
        <TouchableOpacity onPress={()=>navigation.navigate('NoteDetails', {id})}>
          <Text style={styles.text1}>{note.noteTitle}</Text>
        </TouchableOpacity>
      <Ionicons name='add' size={24} color={'teal'} style={styles.taskIcon2}/>          
      </TouchableOpacity>
      )
    })}
 </View>
 </ScrollView>
       </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#008080',
    height: 100,
     borderBottomLeftRadius:30,
    borderBottomRightRadius:30 
  },
  nameConatiner: {
    marginTop: 20,
    marginLeft:20
  },
  texth1: {
    fontSize:20,
    fontWeight: 'bold',
    color: '#fff'
  },
  displayNametext: {
    fontSize:30,
    fontWeight: 'bold',
    color: '#fff'
  },
 
  
  texth2: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop:20,
    marginLeft:20,
    marginBottom:20,
    color:'#008080'
   },
    
  WeeklyContentInfo: {
    width: 120,
    height: 170,
    backgroundColor: '#fff',
    borderRadius:20
   },
   text1: {
     fontWeight: 'bold',
    fontSize:20,
    color:'#000',
    marginLeft:10
   },
   taskIcon1: {
    margin:10
   },
   text2: {
    color: '#ccc',
     marginTop:10,
     marginLeft:10
   },
   weeklutasks: {
    marginLeft: 20
   },
   pendingText: {

   },
   dotContainer: {
    flexDirection:'row',
    alignItems:'center',

   },
   dot: {
    marginTop:10
   },
   noteContainer: {
    backgroundColor: '#fff',
    height: 70,
    margin:10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:20,
    justifyContent: 'space-between'
   },
   bookICon: {
    marginLeft:10
   },
   dotContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:50
   },
   taskIcon2: {
    marginTop: 10,
    marginLeft:5
   }
  
})