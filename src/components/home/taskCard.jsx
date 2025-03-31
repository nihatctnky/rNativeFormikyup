import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppColors from '../../theme/color'
import moment from 'moment'
import { taskValues } from '../../utils/constant'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../../utils/routes'
import { setCategory } from '../../utils/functions'

const TaskCard = ({ item }) => {

    const navigation = useNavigation()
    return (
        <Pressable style={styles.container}

        onPress={() => navigation.navigate(SCREENS.TASKDETAIL, {item:item})}
        >

        

            <View style={{backgroundColor: taskValues.find(task => 
            task.status === item.status )?.color, padding:3, borderRadius: 5,
    
            }} >
            {taskValues.find(task => task.status === item?.status)?.icon}</View>





            <View style={{ flex: 1, marginLeft: 10, padding: 4, gap: 4 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: 'black' }}>{item.title}</Text>
                <Text style={{ fontSize: 14, fontWeight: "300", color: "gray" }} >{item.description}</Text>
                <Text style={{ fontSize: 14, fontWeight: "300", color: "gray" }}>
                    {moment(item.startDate).format("DD.MM.YYYY")}-
                    {moment(item.endDate).format("DD.MM.YYYY")}
                </Text>

            </View>
            <View style={{marginLeft: 10}}>
          <Text syle={{fontSize: 14, fontWeight: "300", color: "gray"}}>
           {setCategory(item.category)}
          </Text>
        </View>


        </Pressable>
    )
}

export default TaskCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    }
})