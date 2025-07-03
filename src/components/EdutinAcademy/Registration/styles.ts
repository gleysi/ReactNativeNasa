import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f8f8',
  },
  textInput:{
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  formContainer: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
  box3: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'grey',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: 'grey',
  },
});
export default styles;
