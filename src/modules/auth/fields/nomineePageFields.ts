import { styles } from "./styles";

export const nomineePageFields = [
	// {
	// 	id: '83022d78-251a-4e69-b410-3cd60355cc61',
	// 	label: 'strings:please_click_your_selfie',
	// 	type: 'text',
	// 	properties: {
	// 		color: 'black', 
	// 		marginLeft: 20
	// 	}
	// },
	{
		id: 'b7b2f51c-b036-4c10-9aa4-25d08386b01b',
		label: "strings:enter_password",
		type: "floatingLabelInput",
		data: "bankAccNo",
		properties: {
			keyboardType: "default",
			staticLabel: true,
			containerStyles: styles.input,
			labelStyles: styles.labelStyles,
			inputStyles: {
				color: "black",
				paddingHorizontal: 10,
			},
		}
	},
	{
		id: '9d242f22-8e19-4dcd-b1df-bf0b7c804d5e',
		label: "strings:confirm_password",
		type: "floatingLabelInput",
		data: "bankAccNo",
		properties: {
			keyboardType: "default",
			staticLabel: true,
			containerStyles: styles.input,
			labelStyles: styles.labelStyles,
			inputStyles: {
				color: "black",
				paddingHorizontal: 10,
			},
		}
	},
];
