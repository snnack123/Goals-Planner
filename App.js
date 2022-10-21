import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentGoals => [...currentGoals, {text: enteredGoalText, id: Math.random().toString()}]);    
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color="#a065ec" onPress={startAddGoalHandler} />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onClose={endAddGoalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList data={courseGoals} renderItem={itemData => {
            return <GoalItem
              id={itemData.item.id}
              text={itemData.item.text}
              onDeleteItem={deleteGoalHandler}
            />
          }}
            keyExtractor={(item) => { return item.id; }} //not necessary if you use key instead of id
            alwaysBounceVertical={false} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5
  },
});
