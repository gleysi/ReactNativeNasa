import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, Button } from 'react-native';

const contacts = [
  {name: 'John Doe'},
  {name: 'Sonia'},
  {name: 'Dudu'},
  {name: 'Bubu'},
];

const Contacts = () => {
  const [contactsList, setContacts] = useState(contacts);

  const searchContact = (text: String) => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(text.toLowerCase())
    );
    setContacts(filteredContacts);
  };

  const deleteContact = (name: string) => {
    setContacts(prevContacts => prevContacts.filter(c => c.name !== name));
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search Contacts" onChangeText={searchContact} style={styles.textInput} />
      <FlatList
        data={contactsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactsItem}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Button title="Delete Contact" onPress={() => deleteContact(item.name)} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 70,
    backgroundColor: '#fff',
  },
  contactsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 100,
  },
  itemText: {
    fontSize: 16,
  },
});

export default Contacts;
