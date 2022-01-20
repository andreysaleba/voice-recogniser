import React from 'react';
import {Text, View} from 'react-native';
import styles from './QuestionModal.styles';

const QuestionModal: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hola, ¿cómo están tú y tu familia estos días?
      </Text>
      <Text style={styles.description}>
        Hi, how are you and your family these days?
      </Text>
    </View>
  );
};

export default QuestionModal;
