# react-native-section-dropdown

A simple react native component

## Installation

```sh
npm install react-native-section-dropdown
```
###### Or

```sh
yarn add react-native-section-dropdown
```

## Usage

```js
import { SectionDropdown } from 'react-native-section-dropdown';

// ...

const DATA = [
  {
    groupId: 1,
    title: 'Group 1',
    data: [
      { groupId: 1, label: 'Item 1', value: 'item1' },
      { groupId: 1, label: 'Item 2', value: 'item2' },
      { groupId: 1, label: 'Item 3', value: 'item3' },
    ],
  },
  {
    groupId: 2,
    title: 'Group 2',
    data: [
      { groupId: 2, label: 'Item 1', value: 'item1' },
      { groupId: 2, label: 'Item 2', value: 'item2' },
      { groupId: 2, label: 'Item 3', value: 'item3' },
    ],
  },
];

<SectionDropdown
  data={DATA}
  itemHeaderTextStyle={{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  }}
/>;
```
### Demo

https://github.com/iamkem/react-native-section-dropdown/assets/43561663/41a74176-dbb7-49bc-b1e7-6e4e8281bbc9

### Dropdown Item props

| Props   | Params | isRequire | Description               |
|---------|--------|-----------|---------------------------|
| groupId | string | Yes       | Uniq key for section item |
| label   | string | Yes       | Label                     |
| value   | any    | Yes       | Value                     |

### Section Item props

| Props   | Params | isRequire | Description                             |
|---------|--------|-----------|-----------------------------------------|
| groupId | string | Yes       | Uniq key                                |
| title   | string | Yes       | Title for section item                  |
| data    | Array  | Yes       | Data is required with DropdownItem type |

### Section Dropdown Props

| Props                       | Params                       | isRequire | Description                                                        |
|-----------------------------|------------------------------|-----------|--------------------------------------------------------------------|
| data                        | Array                        | Yes       | Data is required with SectionItem type                             |
| accessoryRight              | () => JSX.Element            | No        | Render of right element                                            |
| defaultValue                | Item                         | No        | Set default value                                                  |
| onSelected                  | (item: DropdownItem) => void | No        | Callback for selected item                                         |
| placeholder                 | String                       | No        | The string that will be rendered before dropdown has been selected |
| selectedTextStyle           | TextStyle                    | No        | Styling for selected text                                          |
| itemHeaderStyle             | ViewStyle                    | No        | Styling for each section header                                    |
| itemHeaderTextStyle         | TextStyle                    | No        | Styling for each section header text title                         |
| itemStyle                   | ViewStyle                    | No        | Styling for each item                                              |
| itemTextStyle               | TextStyle                    | No        | Styling for each item text                                         |
| selectedItemBackgroundColor | String                       | No        | Background color for selected item                                 |
| listPosition                | Top, Bottom                  | No        | Position of dropdown list                                          |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
