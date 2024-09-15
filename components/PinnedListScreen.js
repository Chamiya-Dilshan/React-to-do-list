import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
    },
    editInput: {
        fontSize: 16,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    smallButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    smallButtonText: {
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
});

export default function PinnedListScreen({ route, navigation }) {
    const { pinnedTasks: initialPinnedTasks, togglePinned, updateTask, toggleCompleted, deleteTask } = route.params;
    const [pinnedTasks, setPinnedTasks] = useState(initialPinnedTasks);
    const [isEditing, setIsEditing] = useState(null);
    const [editedText, setEditedText] = useState('');

    function handleUnpin(task) {
        togglePinned(task.id);
        setPinnedTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
    }

    function handleEdit(task) {
        setIsEditing(task.id);
        setEditedText(task.text);
    }

    function handleSave() {
        if (editedText.trim() === '') return; // Prevent saving empty text
        updateTask(isEditing, editedText);
        setPinnedTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === isEditing ? { ...task, text: editedText } : task
            )
        );
        setIsEditing(null);
        setEditedText('');
    }

    function handleComplete(task) {
        toggleCompleted(task.id); // Mark task as completed
        handleUnpin(task); // Remove task from pinned list
    }

    function handleDelete(task) {
        deleteTask(task.id); // Remove task from the entire system
        setPinnedTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.sectionHeader}>Pinned Tasks</Text>
            {pinnedTasks.length > 0 ? (
                <FlatList
                    data={pinnedTasks}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 10 }}>
                            {isEditing === item.id ? (
                                <>
                                    <TextInput
                                        style={styles.editInput}
                                        value={editedText}
                                        onChangeText={setEditedText}
                                        onSubmitEditing={handleSave}
                                        returnKeyType="done"
                                    />
                                    <TouchableOpacity
                                        style={[styles.button, styles.smallButton, styles.saveButton]}
                                        onPress={handleSave}
                                    >
                                        <Text style={[styles.buttonText, styles.smallButtonText]}>Save</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <TodoItem
                                    task={item}
                                    deleteTask={() => handleDelete(item)} // Handle delete
                                    toggleCompleted={() => handleComplete(item)}
                                    togglePinned={() => handleUnpin(item)}
                                    updateTask={() => handleEdit(item)}
                                    drag={() => {}}
                                />
                            )}
                        </View>
                    )}
                />
            ) : (
                <Text>No pinned tasks available.</Text>
            )}
        </SafeAreaView>
    );
}
