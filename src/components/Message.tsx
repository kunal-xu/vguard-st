import { showMessage } from 'react-native-flash-message';



const Message = (title, message, icon) => {


	showMessage({
		message: title,
		description: message,
		icon: icon,
		type: icon,
		duration: 3000,
		floating: true,

	})

};

export default Message;