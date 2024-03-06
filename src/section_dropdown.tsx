import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
  type TextStyle,
  Modal,
  TouchableWithoutFeedback,
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
  listPosition?: 'top' | 'bottom';
}

const MAX_HEIGHT = 250;

export const SectionDropdown = (props: Props) => {
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
    listPosition = 'bottom',
  } = props;

  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(
    defaultValue ?? null
  );

  useEffect(() => {
    if (typeof defaultValue !== 'undefined') {
      setSelectedItem(defaultValue);
    }
  }, [defaultValue]);

  const listRef = useRef<SectionList<DropdownItem, SectionItem>>(null);

  const viewRef = useRef<View>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleTriggerLayout = useCallback(() => {
    viewRef?.current?.measureInWindow((pageX, pageY, width, height) => {
      setPosition({
        x: Math.floor(pageX),
        y: Math.floor(pageY + height),
        width: Math.floor(width),
        height: Math.floor(height),
      });
    });
  }, []);

  const toggleDropdown = useCallback(() => {
    handleTriggerLayout();
    setShowDropdown(!showDropdown);
  }, [handleTriggerLayout, showDropdown]);

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
        <TouchableOpacity
          style={StyleSheet.flatten([styles.sectionHeader, itemHeaderStyle])}
        >
          <Text style={itemHeaderTextStyle}>{section.title}</Text>
        </TouchableOpacity>
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

  const renderModalContent = useCallback(() => {
    const isTop = listPosition === 'top';

    const pos: ViewStyle = {
      width: position.width,
      left: position.x,
      top: position.y,
    };

    let sections = data;

    if (isTop) {
      pos.top = position.y - MAX_HEIGHT - position.height;

      sections = data.slice().reverse();
    }

    return (
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View style={{ flex: 1 }}>
          <View style={StyleSheet.flatten([styles.modalView, pos])}>
            <SectionList
              ref={listRef}
              sections={sections}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              onScrollToIndexFailed={(index) => {
                console.log('scroll to index failed', index);
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [
    data,
    listPosition,
    position.height,
    position.width,
    position.x,
    position.y,
    renderItem,
    renderSectionHeader,
    toggleDropdown,
  ]);

  const keyExtractor = (item: DropdownItem, index: number) => {
    return index.toString() + item.label;
  };

  return (
    <View style={styles.container}>
      <View ref={viewRef} onLayout={handleTriggerLayout}>
        {renderTrigger()}
      </View>
      <Modal visible={showDropdown} transparent={true}>
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  modalView: {
    position: 'absolute',
    height: MAX_HEIGHT,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    borderColor: '#CCCCCC',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownItem: {
    padding: 10,
  },
  sectionHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
