import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import type { DropdownItem, SectionItem } from './section_item';

interface Props {
  data: SectionItem[];
  defaultValue?: DropdownItem;
  onSelected?: (item: DropdownItem) => void;
  accessoryRight?: () => JSX.Element;
  style?: StyleProp<ViewStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  itemHeaderStyle?: StyleProp<ViewStyle>;
  itemHeaderTextStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  selectedItemBackgroundColor?: string;
}

const SectionDropdown = (props: Props) => {
  const {
    data,
    onSelected,
    defaultValue,
    accessoryRight,
    style,
    selectedTextStyle,
    selectedItemBackgroundColor = '#CCCCCC',
    itemHeaderStyle,
    itemHeaderTextStyle,
    itemStyle,
    itemTextStyle,
    placeholder = 'Select item',
  } = props;

  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(
    defaultValue ?? null
  );

  const listRef = useRef<SectionList<DropdownItem, SectionItem>>(null);

  const toggleDropdown = useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [showDropdown]);

  const selectItem = useCallback(
    (item: DropdownItem) => {
      onSelected?.(item);
      setSelectedItem(item);
      setShowDropdown(false);
    },
    [onSelected, setSelectedItem, setShowDropdown]
  );

  const scrollToItem = useCallback(
    (item: DropdownItem, itemIndex: number) => {
      const sectionIndex = data.findIndex(
        (section) => section.groupId === item.groupId
      );

      if (sectionIndex !== -1) {
        listRef.current?.scrollToLocation({
          sectionIndex,
          itemIndex,
          animated: false,
        });
      }
    },
    [data, listRef]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: DropdownItem; index: number }) => {
      const isSelected =
        selectedItem?.groupId === item.groupId &&
        selectedItem?.value === item.value;

      if (isSelected) {
        setTimeout(() => {
          scrollToItem(item, index);
        }, 400);
      }

      return (
        <TouchableOpacity
          onPress={() => {
            selectItem(item);
          }}
          style={StyleSheet.flatten([
            styles.dropdownItem,
            isSelected ? { backgroundColor: selectedItemBackgroundColor } : {},
            itemStyle,
          ])}
        >
          <Text style={itemTextStyle}>{item.label}</Text>
        </TouchableOpacity>
      );
    },
    [
      selectedItem?.groupId,
      selectedItem?.value,
      selectedItemBackgroundColor,
      itemStyle,
      itemTextStyle,
      scrollToItem,
      selectItem,
    ]
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionItem }) => {
      return (
        <View
          style={StyleSheet.flatten([styles.sectionHeader, itemHeaderStyle])}
        >
          <Text style={itemHeaderTextStyle}>{section.title}</Text>
        </View>
      );
    },
    [itemHeaderStyle, itemHeaderTextStyle]
  );

  const renderTrigger = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={toggleDropdown}
        style={StyleSheet.flatten([styles.triggerContainer, style])}
      >
        <Text style={selectedTextStyle}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        {accessoryRight?.()}
      </TouchableOpacity>
    );
  }, [
    toggleDropdown,
    style,
    selectedTextStyle,
    selectedItem,
    placeholder,
    accessoryRight,
  ]);

  const keyExtractor = (item: DropdownItem, index: number) => {
    return index.toString() + item.label;
  };

  return (
    <View style={styles.container}>
      {renderTrigger()}
      {showDropdown && (
        <SectionList
          ref={listRef}
          sections={data}
          style={styles.dropdownList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          onScrollToIndexFailed={(index) => {
            console.log('scroll to index failed', index);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
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
