import { useState, Children, isValidElement, cloneElement } from 'react';
import { View, Modal, StyleSheet, ScrollView, Text } from "react-native";
import { useEffect } from 'react';
import MyButton from '../../UI/Button';

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  modal: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#727272',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 50
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ModalForm = ({ title, visible, closeModal, submitForm, submitTitle, children, defaultForm, previewForm, previewTitle }) => {

  const [form, setForm] = useState({});

  useEffect(() => {
    if(defaultForm) {
      setForm(defaultForm)
    }
  }, [defaultForm]);

  const onChangeText = (name, input) => {
    setForm(state => {
      return {
        ...state,
        [name]: input,
      }
    });
  };

  const handleSubmit = () => {
    submitForm(form);
    setForm({})
  };

  const handlePreview = () => {
    previewForm(form);
  }

  const childrenWithForm = Children.map(children, child => {
    if(isValidElement(child)) {
      const { name } = child.props;
      const value = form[name] || '';
      return cloneElement(child, { onChangeText, value });
    }
    return child;
  });

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {childrenWithForm}
          {previewTitle ? <MyButton title={previewTitle} onPress={handlePreview}/> : null}
          <MyButton title={submitTitle} onPress={handleSubmit}/>
          <MyButton title="Regresar" onPress={closeModal}/>
        </ScrollView>
      </View>
    </Modal>
  );

};

export default ModalForm;