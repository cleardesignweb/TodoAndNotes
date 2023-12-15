import { StyleSheet, Text, View,TouchableOpacity,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../data/firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
  const Profile = () => {
  const [profile, setProfile] = useState([])
  const {user} = useAuth()
  const navigation = useNavigation()
  const fetchProfile = async()=>{
     try{
      const uid =  user.uid;
      const profRef = collection(db, 'users')
    const querySnapshot = query(profRef, where("userId", '==', uid));
    const snapshot = await getDocs(querySnapshot)
    const document = snapshot.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
    }))
    setProfile(document)
     }catch(error){
      console.log('Error fetching profile', error)
     }
  }

  useEffect(()=>{
    fetchProfile();
  },[])


  const loggOff = ()=>{
   signOut(auth).then(() => {
    console.log("User logged out successful")
    navigation.navigate('Login') 
  }).catch((error) => {
    console.log(error, "User logged out unsuccessful")
  });
    }


  return (
    <View>
      <View>
       {profile.map((prof, index)=>(
        <View key={index} style={styles.profileContainer}>
          <Text style={styles.profName}>{prof.displayName} {prof.lastName}</Text>
          <Text style={styles.emial}>{prof.email}</Text>
        </View>        
       ))} 
       </View>
       <TouchableOpacity onPress={loggOff} 
  style={styles.button}>
   <Text style={styles.text}>Log off</Text>
  </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  profileContainer: {
    margin: 10,
  },
  profName:{
    fontSize:20,
    fontWeight: 'bold'
  },
  
  button:{
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
 },
 text: {
    // backgroundColor: isValid ? '#ff6347' : '#FFA07A',
    
    padding: 10,
    width: Dimensions.get('window').width * .85,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'center' ,
    color: "#fff", 
    borderRadius: 30,
    backgroundColor: 'red'
 },
})