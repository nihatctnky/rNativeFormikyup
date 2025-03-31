import {Button, Input, Radio, RadioGroup} from '@ui-kitten/components';
import {Formik} from 'formik';
import {StyleSheet, View} from 'react-native';
import uuid from 'react-native-uuid';
import CustomDatePicker from '../../components/uı/customDatePicker';
import {taskSchema} from '../../utils/validations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { status } from '../../utils/constant';

const AddTask = () => {
  const saveTask = async values => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      let myTask = savedTasks ? JSON.parse(savedTasks) : [];
      myTask.push(values);
      await AsyncStorage.setItem('tasks', JSON.stringify(myTask));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          id: uuid.v4(),
          title: 'Yazılım',
          description: 'React native dersi çalışılacak',
          startDate: null,
          endDate: null,
          category: null,
          status: status.ONGOING,
        }}
        validationSchema={taskSchema}
        onSubmit={values => saveTask(values)}>
        {({values, errors, handleChange, handleSubmit, setFieldValue}) => (
          <View>
            <Input
              size="large"
              style={{marginVertical: 10}}
              label={'Title'}
              value={values.title}
              onChangeText={handleChange('title')}
              status={errors.title ? 'danger' : 'basic'}
              caption={errors.title}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              label={'Description'}
              value={values.description}
              onChangeText={handleChange('description')}
              status={errors.description ? 'danger' : 'basic'}
              caption={errors.description}
            />
            <CustomDatePicker
              size="large"
              style={{marginVertical: 10}}
              date={values.startDate}
              onSelectDate={date => setFieldValue('startDate', date)}
              label={'Start Date'}
              status={errors.startDate ? 'danger' : 'basic'}
              caption={errors.startDate}
            />
            <CustomDatePicker
              size="large"
              style={{marginVertical: 10}}
              date={values.endDate}
              onSelectDate={date => setFieldValue('endDate', date)}
              label={'End Date'}
              status={errors.endDate ? 'danger' : 'basic'}
              caption={errors.endDate}
            />

            <RadioGroup
              selectedIndex={values.category}
              onChange={index => setFieldValue('category', index)}>
              <Radio status="success">Software</Radio>
              <Radio status="success">Design</Radio>
              <Radio status="success">Operation</Radio>
            </RadioGroup>

            <Button
              status="success"
              style={{marginTop: 30}}
              onPress={handleSubmit}>
              CREATE
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});