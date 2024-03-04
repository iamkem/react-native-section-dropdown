import * as React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { SectionDropdown } from 'react-native-section-dropdown';
import { StatusBar } from 'expo-status-bar';

import _ from 'lodash';

const data = _.times(2, (i) => ({
  groupId: `section-${i}`,
  title: `Section ${i + 1}`,
  data: _.times(5, (j) => ({
    label: `Item ${j + 1}`,
    value: j + 1,
    groupId: `section-${i}`,
  })),
}));

const IconDown = () => (
  <Image
    source={require('../assets/down.png')}
    style={{
      width: 20,
      height: 20,
    }}
  />
);

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ width: '30%', alignItems: 'center' }}>
        <Text>Bottom</Text>
        <SectionDropdown
          data={data}
          accessoryRight={IconDown}
          itemHeaderTextStyle={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
          onSelected={console.log}
        />
      </View>
      <View style={{ width: '30%', alignItems: 'center' }}>
        <Text>Top</Text>
        <SectionDropdown
          data={data}
          accessoryRight={IconDown}
          itemHeaderTextStyle={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
          onSelected={console.log}
          listPosition="top"
        />
      </View>
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
