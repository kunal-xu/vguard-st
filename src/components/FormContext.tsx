import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { VguardRishtaUser } from "../utils/types/VguardRishtaUser";

type Action = { type: "UPDATE_FIELD"; payload: { field: string; value: string | number } };

const vru = new VguardRishtaUser();

interface FormContextProps {
	state: VguardRishtaUser;
	dispatch: React.Dispatch<Action>;
}

const FormContext = createContext<FormContextProps | undefined>({
	state: vru,
	dispatch: () => { }
});

const formReducer = (state: VguardRishtaUser, action: Action): VguardRishtaUser => {
	switch (action.type) {
		case 'UPDATE_FIELD':
			return {
				...state,
				[action.payload.field]: action.payload.value
			}
		default:
			return state;
	}
}

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(formReducer, vru);
	return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>;
}

export const useForm = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useForm must be used within a FormProvider");
	}
	return context;
};

