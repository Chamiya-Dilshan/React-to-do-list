//TodoItem.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 16,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});

export default function TodoItem({ task, onDelete, onToggleCompleted, onTogglePinned, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  function handleSave() {
    if (editedText.trim() === '') {
      Alert.alert('Error', 'Task text cannot be empty');
      return;
    }
    onEdit(task.id, editedText);
    setIsEditing(false);
  }

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedText}
          onChangeText={setEditedText}
          onSubmitEditing={handleSave}
          autoFocus
        />
      ) : (
        <Text
          style={[
            styles.taskText,
            task.completed ? styles.completedTaskText : null,
          ]}
        >
          {task.text}
        </Text>
      )}

      <TouchableOpacity onPress={() => onToggleCompleted(task.id)} style={styles.iconButton}>
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
          size={24}
          color={task.completed ? '#4CAF50' : '#999'}
        />
      </TouchableOpacity>

      {!task.completed && (
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.iconButton}>
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      )}

      {!task.completed && (
        <TouchableOpacity onPress={() => onTogglePinned(task.id)} style={styles.iconButton}>
          <Ionicons
            name={task.pinned ? 'star' : 'star-outline'}
            size={24}
            color={task.pinned ? '#FFD700' : '#999'}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconButton}>
        <Ionicons name="trash-outline" size={24} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
}