import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionHeaderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    maxHeight: 200, 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f44336',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  undoButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  undoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function TodoList({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: true, timestamp: Date.now() - 3600000, pinned: false },
    { id: 2, text: 'Meeting at School', completed: false, timestamp: Date.now(), pinned: true },
  ]);
  const [text, setText] = useState('');
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [showPinnedTasks, setShowPinnedTasks] = useState(true);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

  function addTask() {
    if (text.trim() === '') return;
    const newTask = { id: Date.now(), text, completed: false, timestamp: Date.now(), pinned: false };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setText('');
  }

  function deleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed, pinned: false } 
          : task
      )
    );
  }

  function togglePinned(id) {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, pinned: !task.pinned } : task))
    );
  }

  function updateTask(id, newText) {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  function clearAllTasks() {
    setDeletedTasks(tasks);
    setTasks([]);
  }

  function undoClear() {
    if (deletedTasks.length > 0) {
      setTasks(deletedTasks);
      setDeletedTasks([]);
    } else {
      Alert.alert('No tasks to undo');
    }
  }

  const incompleteTasks = tasks.filter(task => !task.completed && !task.pinned);
  const completedTasks = tasks.filter(task => task.completed && !task.pinned);
  const pinnedTasks = tasks.filter(task => task.pinned);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Appointment Manager</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
      {/* Todo Tasks Section (Always Visible) */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionHeader}>Todo</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={incompleteTasks}
              renderItem={({ item }) => (
                <TodoItem
                  key={item.id}
                  task={item}
                  onDelete={deleteTask}
                  onToggleCompleted={toggleCompleted}
                  onTogglePinned={togglePinned}
                  onEdit={updateTask}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
        
        {/* Pinned Tasks Section with Dropdown */}
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={styles.sectionHeaderButton}
            onPress={() => setShowPinnedTasks(!showPinnedTasks)}
          >
            <Text style={styles.sectionHeader}>Pinned Tasks</Text>
            <Text>{showPinnedTasks ? '▼' : '▶'}</Text>
          </TouchableOpacity>
          {showPinnedTasks && (
            <View style={styles.listContainer}>
              <FlatList
                data={pinnedTasks}
                renderItem={({ item }) => (
                  <TodoItem
                    key={item.id}
                    task={item}
                    onDelete={deleteTask}
                    onToggleCompleted={toggleCompleted}
                    onTogglePinned={togglePinned}
                    onEdit={updateTask}
                  />
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>

        {/* Completed Tasks Section with Dropdown */}
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={styles.sectionHeaderButton}
            onPress={() => setShowCompletedTasks(!showCompletedTasks)}
          >
            <Text style={styles.sectionHeader}>Completed Tasks</Text>
            <Text>{showCompletedTasks ? '▼' : '▶'}</Text>
          </TouchableOpacity>
          {showCompletedTasks && (
            <View style={styles.listContainer}>
              <FlatList
                data={completedTasks}
                renderItem={({ item }) => (
                  <TodoItem
                    key={item.id}
                    task={item}
                    onDelete={deleteTask}
                    onToggleCompleted={toggleCompleted}
                  />
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearAllTasks}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.undoButton} onPress={undoClear}>
          <Text style={styles.undoButtonText}>Undo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
