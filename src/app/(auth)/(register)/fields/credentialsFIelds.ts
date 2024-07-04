import { styles } from "./styles";

export const credentialsFields = [
  {
    id: "b7b2f51c-b036-4c10-9aa4-25d08386b01b",
    label: "strings:enter_password",
    type: "floatingLabelInput",
    data: "pwd",
    properties: {
      keyboardType: "default",
      staticLabel: true,
      maxLength: 8,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles,
    },
  },
  {
    id: "9d242f22-8e19-4dcd-b1df-bf0b7c804d5e",
    label: "strings:confirm_password",
    type: "floatingLabelInput",
    data: "confirmPwd",
    properties: {
      keyboardType: "default",
      secureTextEntry: true,
      staticLabel: true,
      maxLength: 8,
      containerStyles: styles.container,
      labelStyles: styles.labelStyles,
      customLabelStyles: styles.customLabelStyles,
      inputStyles: styles.inputStyles,
    },
  },
];
