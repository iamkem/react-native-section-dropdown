import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  StyleSheet,
  Image,
} from 'react-native';
import type { DropdownItem, SectionItem } from './section_item';

interface Props {
  data: SectionItem[];
}

const SectionDropdown = (props: Props) => {
  const { data } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectItem = (item: DropdownItem) => {
    setSelectedItem(item);
    setShowDropdown(false);
  };

  const renderItem = ({ item }: { item: DropdownItem }) => {
    return (
      <TouchableOpacity
        onPress={() => selectItem(item)}
        style={styles.dropdownItem}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: { section: SectionItem }) => {
    return <Text style={styles.sectionHeader}>{section.title}</Text>;
  };

  const keyExtractor = (item: DropdownItem, index: number) =>
    index.toString() + item.label;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={styles.triggerContainer}
      >
        <Text>{selectedItem ? selectedItem.label : 'Select Item'}</Text>
        <Image source={require('./assets/down.png')} style={styles.icon} />
      </TouchableOpacity>
      {showDropdown && (
        <SectionList
          sections={data}
          style={styles.dropdownList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 120,
  },
  triggerContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    maxHeight: 150,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  sectionHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SectionDropdown;
