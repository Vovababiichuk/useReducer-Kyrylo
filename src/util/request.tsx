// універсальний Reducer

export const REQUEST_ACTION_TYPE = {
	PROGRESS: 'progress',
	SUCCESS: 'success',
	ERROR: 'error',
	RESET: 'reset',
}

// початковий стейт
export const requestInitialState = {
	status: null,
	message: null,
	data: null,
}

export const requestReducer = (state, action) => {
	switch (action.type) {
		case REQUEST_ACTION_TYPE.PROGRESS:
			return {
				...state,
				// в action.type знаходиться REQUEST_ACTION_TYPE.PROGRESS... так зручныше писати (action.type)
				status: action.type,
				message: null,
				data: null,
			}

			// payload тут відіграє роль місця куди в нас можуть прийти або data або message...

		case REQUEST_ACTION_TYPE.SUCCESS:
			return {
				...state,
				status: action.type,
				data: action.payload,
			}

		case REQUEST_ACTION_TYPE.ERROR:
			return {
				...state,
				status: action.type,
				message: action.payload,
			}

		case REQUEST_ACTION_TYPE.RESET:
		return {
			// повертає початковий обьект з початковими даними
			...requestInitialState,
		}

			default:
				return state;
	}
}