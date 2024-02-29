export interface DropdownItem {
  label: string;
  value: any;
  groupId: string;
}

export interface SectionItem {
  groupId: string;
  title: string;
  data: DropdownItem[];
}
