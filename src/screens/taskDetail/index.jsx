import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppColors from '../../theme/color';
import {status, taskValues} from '../../utils/constant';
import moment from 'moment';
import {setCategory} from '../../utils/functions';
import {Button} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetail = ({route}) => {
  const {item} = route?.params;
  console.log(item);

  const deleteTask = async () => {
    try {
      // mevcut görevleri al
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return; //kayıtlı görev yoksa fonkisyonu sonlandırıyor
      }

      const tasks = JSON.parse(savedTasks);

      //silinecek görevi filtrele
      const filteredTasks = tasks.filter(task => task.id !== item.id);

      //filtrelenmiş ghörevleri depola
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
      console.log('Görev silindi');
    } catch (error) {
      console.error('Görev silinirken hata oluştu', error);
    }
  };

  const updateTask = async newStatus => {
    try {
      // mevcut görevleri al
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return; //kayıtlı görev yoksa fonkisyonu sonlandırıyor
      }

      const tasks = JSON.parse(savedTasks);

      //güncellenecek görevi bul
      const uptatedTasks = tasks.map(task => {
        if (task.id === item.id) {
          return {
            ...task,
            status: newStatus,
          };
        }
        return task;
      });

      //güncellenecek görevi depola
      await AsyncStorage.setItem('tasks', JSON.stringify(uptatedTasks));
      console.log('Görev silindi');
    } catch (error) {
      console.error('Görev güncellenirken hata oluştu', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Title:</Text>
          <Text>{item.title}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Description:</Text>
          <Text>{item.description}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>StartDate:</Text>
          <Text> {moment(item.startDate).format('DD.MM.YYYY')}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>EndDate:</Text>
          <Text> {moment(item.endDate).format('DD.MM.YYYY')}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Status:</Text>
          <Text>
            {taskValues.find(task => task.status === item?.status).title}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Category:</Text>
          <Text>{setCategory(item.category)}</Text>
        </View>
      </ScrollView>

      <View style={{bottom: 20}}>
        <Button
          onPress={() => updateTask(status.PENDING)}
          style={styles.button}
          status="primary">
          START
        </Button>
        <Button
          onPress={() => updateTask(status.COMPLATED)}
          style={styles.button}
          status="success">
          COMPLATED
        </Button>
        <Button
          onPress={() => updateTask(status.CANCEL)}
          style={styles.button}
          status="danger">
          CANCEL
        </Button>
        <Button onPress={deleteTask} style={styles.button} status="warning">
          DELETE
        </Button>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
    padding: 10,
  },
  button: {
    marginVertical: 5,
  },
});