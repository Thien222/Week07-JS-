import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const API_Screen_02 = ({ route, navigation }) => {
    const { name } = route.params;

    const [searchText, setSearchText] = useState(''); // State for search input
    const [tasks, setTasks] = useState([
        { id: '1', title: 'To check email', completed: false },
        { id: '2', title: 'UI task web page', completed: false },
        { id: '3', title: 'Learn JavaScript basic', completed: false },
        { id: '4', title: 'Learn HTML Advance', completed: false },
        { id: '5', title: 'Medical App UI', completed: false },
        { id: '6', title: 'Learn Java', completed: false },
    ]);

  
    const toggleTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.checkbox}>
                {item.completed && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <Text style={[styles.taskTitle, item.completed && styles.completedTask]}>
                {item.title}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('API_Screen_03')}>
                <Text style={styles.editText}>✎</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hi {name}, Have a great day ahead</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search tasks..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <FlatList
                data={filteredTasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('API_Screen_03')}>
                <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkmark: {
        color: 'green',
        fontSize: 16,
    },
    taskTitle: {
        flex: 1,
        fontSize: 16,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    editText: {
        color: 'red',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#00bfff',
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    addText: {
        color: '#fff',
        fontSize: 30,
    },
});

export default API_Screen_02;
