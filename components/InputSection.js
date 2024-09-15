import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        width: '100%',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        padding: 10,
        color: '#333',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f4f4f4',
    },
    addButton: {
        marginLeft: 10,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default function InputSection({ text, setText, addTask }) {
    function handleAddTask() {
        if (text.trim()) {
            try {
                addTask();
            } catch (error) {
                console.error("Failed to add task:", error);
                // Optionally show user feedback here
            }
        } else {
            // Show user feedback that the task text cannot be empty
        }
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                value={text}
                onChangeText={setText}
                placeholder="New Task"
                placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

