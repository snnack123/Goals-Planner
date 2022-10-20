import { useState } from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, ScrollView } from 'react-native';

import GoalItem from './components/GoalItem';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  };

  function addGoalHandler() {
    // setCourseGoals(currentGoals => [...currentGoals, {text: enteredGoalText, key: Math.random().toString()}]);    
    setCourseGoals(currentGoals => [...currentGoals, {text: enteredGoalText, id: Math.random().toString()}]);    
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Your course goal!' 
        style={styles.textInput}
        onChangeText={goalInputHandler}
        keyboardType='url'
        />
        <Button title='Add Goal' 
        onPress={addGoalHandler}
        />
      </View>
      {/* <View style={styles.goalsContainer}>
        <ScrollView>
          {courseGoals.map((goal) =>
          (<View style={styles.goalItem} key={goal}>
            <Text style={styles.goalText}>
              {goal}
            </Text>
          </View>
          ))}
        </ScrollView>
      </View> */}
      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals} renderItem={itemData => {
          return <GoalItem title={itemData.item.text} />
        }} 
        keyExtractor={(item, index) => {return item.id;}} //not necessary if you use key instead of id
        alwaysBounceVertical={false}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  inputContainer: { 
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 5
  },
});
