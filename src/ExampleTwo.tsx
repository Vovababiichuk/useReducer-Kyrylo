import { useReducer } from 'react'
import { Link } from 'react-router-dom'

interface ListActionWithPayload {
	type: 'add' | 'delete' | 'select'
	payload: string | number
}

interface ListActionWithoutPayload {
	type: 'reverse'
}

type ListAction = ListActionWithPayload | ListActionWithoutPayload

interface ListItem {
	value: string
	id: number
}

// константа LISTACTION_TYP буде мати типи дій
const LIST_ACTION_TYPE = {
	ADD: 'add',
	DELETE: 'delete',
	SELECT: 'select',
	REVERSE: 'reverse',
} as const

// listReducer - повертає новий обьект стану
const listReducer = (
	state: { items: ListItem[]; selectedId: number | null },
	action: ListAction
) => {
	switch (action.type) {
		case LIST_ACTION_TYPE.ADD: {
			const id = new Date().getTime()
			// ми передаэмо type та payload - значення самої дії
			const newItem: ListItem = { value: action.payload as string, id }

			return {
				...state,
				items: [...state.items, newItem],
			}
		}

		case LIST_ACTION_TYPE.DELETE: {
			// фільтруєм по ідентифікатору
			const newItems = state.items.filter(item => item.id !== action.payload)

			return {
				...state,
				items: newItems,
			}
		}

		case LIST_ACTION_TYPE.SELECT: {
			return {
				...state,
				selectedId:
					action.payload === state.selectedId
						? null
						: (action.payload as number),
			}
		}

		case LIST_ACTION_TYPE.REVERSE: {
			const newItems = [...state.items].reverse()
			return {
				...state,
				items: newItems,
			}
		}

		default:
			return { ...state }
	}
}

const initState = { items: [], selectedId: null }

export const ExampleTwo = () => {
	// init - наповнює якимись стартовими даними, може з сервера.... Через init ми можемо задати стартові дані без переписання (в функцію) в нашому випадку initState. Це буде локально привязано до відповідного компонента.
	const init = (state: typeof initState) => {
		if (state.items && state.items.length === 0) {
			return {
				...state,
				items: [{ id: 432312, value: 'first item' }],
			}
		} else {
			return state
		}
	}

	console.log('render')
	const [state, dispatch] = useReducer(listReducer, initState, init)

	const handleAddItem = (e: React.FocusEvent<HTMLInputElement>) => {
		const { value } = e.target

		if (value.trim() === '') return null

		dispatch({ type: LIST_ACTION_TYPE.ADD, payload: value })

		e.target.value = ''
	}

	const handleRemoveItem = (
		id: number,
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.stopPropagation()
		dispatch({ type: LIST_ACTION_TYPE.DELETE, payload: id })
	}

	const handleSelectItem = (id: number) => {
		dispatch({ type: LIST_ACTION_TYPE.SELECT, payload: id })
	}

	const handleReverseItems = () => {
		dispatch({ type: LIST_ACTION_TYPE.REVERSE })
	}

	console.log(state)

	return (
		<div>
			<div className='uppercase text-blue-600 font-bold mb-6'>
				<Link to={'/'}>&larr; Back</Link>
			</div>
			<div>
				<h1 className='font-bold mb-4'>List:</h1>
				<ul>
					{state.items.map(({ value, id }) => (
						<li onClick={() => handleSelectItem(id)} key={id}>
							<div
								className={`border ${
									state.selectedId === id ? 'border-red-600' : 'border-none'
								} max-w-max px-2 rounded-sm`}
							>
								<span className='mr-2'>{value}</span>
							</div>
							<button
								onClick={e => handleRemoveItem(id, e)}
								className='text-red-500'
							>
								Remove
							</button>
						</li>
					))}
				</ul>
			</div>
			<div>
				<input
					onBlur={handleAddItem}
					type='text'
					placeholder='Add new element...'
					className='px-2 py-1'
				/>
			</div>
			<div>
				<button onClick={handleReverseItems}>Reverse</button>
			</div>
		</div>
	)
}
