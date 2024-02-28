export interface DropdownItem {
  label: string;
  value: any;
}

export interface SectionItem {
  key: string;
  title: string;
  data: DropdownItem[];
}
