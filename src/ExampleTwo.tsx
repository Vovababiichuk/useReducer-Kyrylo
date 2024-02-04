import { useReducer } from 'react'
import { Link } from 'react-router-dom'

interface ListItem {
	value: string
	id: number
}

interface ListAction {
	type: string
	payload: string | number
}

// константа LISTACTION_TYP буде мати типи дій
const LIST_ACTION_TYPE = {
	ADD: 'add',
	DELETE: 'delete',
	SELECT: 'select',
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

		default:
			return { ...state }
	}
}

export const ExampleTwo = () => {
	console.log('render')
	const [state, dispatch] = useReducer(listReducer, {
		items: [],
		selectedId: null,
	})

	const handleAddItem = (e: React.FocusEvent<HTMLInputElement>) => {
		const { value } = e.target

		if (value.trim() === '') return null

		dispatch({ type: LIST_ACTION_TYPE.ADD, payload: value })

		e.target.value = ''
	}

	const handleRemoveItem = (id: number, e: React.MouseEvent<HTMLButtonElement> ) => {
		e.stopPropagation()
		dispatch({ type: LIST_ACTION_TYPE.DELETE, payload: id })
	}

	const handleSelectItem = (id: number) => {
		dispatch({ type: LIST_ACTION_TYPE.SELECT, payload: id })
	}

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
								onClick={(e) => handleRemoveItem(id, e)}
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
		</div>
	)
}
