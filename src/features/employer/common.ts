export const selectStyle = {
  container: (provided: any) => ({
    ...provided,
  }),

  control: (provided: any) => ({
    ...provided,
    borderRadius: '4px 4px 4px 4px',
    cursor: 'pointer',
  }),

  menu: (provided: any) => ({
    ...provided,
    'z-index': '1000',
  }),

  option: () => ({
    cursor: 'pointer',
    padding: '15px',
    ':hover': {
      background: '#F4C757',
    },
  }),

  singleValue: (provided: any, state: { isDisabled: any }) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  },
};

export interface OptionType {
  readonly value: string | number;
  readonly label: string | number;
}

export const createOption = (label: string) => ({
  label,
  value: label,
});
