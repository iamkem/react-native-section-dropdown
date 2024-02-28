import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { SectionDropdown } from 'react-native-section-dropdown';
import { StatusBar } from 'expo-status-bar';

import _ from 'lodash';

const data = _.times(2, (i) => ({
  key: `section-${i}`,
  title: `Section ${i + 1}`,
  data: _.times(5, (j) => ({
    label: `Item ${j + 1}`,
    value: j + 1,
  })),
}));

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SectionDropdown data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
