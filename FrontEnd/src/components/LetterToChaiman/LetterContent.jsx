// LetterContent.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: 20,
  },
  body: {
    marginBottom: 20,
  },
});

const LetterContent = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>To</Text>
        <Text>The Chairman</Text>
        <Text>University of Chittagong</Text>
        <Text>Chittagong, Bangladesh</Text>
      </View>
      <View style={styles.body}>
        {/* Insert your letter body content here */}
      </View>
    </Page>
  </Document>
);

export default LetterContent;
