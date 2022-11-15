window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.getElementById('name');
	const  newTodoForm = document.getElementById('new-todo-form');

	const username = localStorage.getItem('username') || '';
	nameInput.value = username;

	nameInput.addEventListener('change', (event) => {
		localStorage.setItem('username', event.target.value);
	})

	newTodoForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const todo = {
			content: event.target.elements.content.value,
			priority: event.target.elements.priority.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);
		sortArray();

		localStorage.setItem('todos', JSON.stringify(todos));

		event.target.reset();

		displayTodos();
	})

	displayTodos();
})

function displayTodos () {
	const todoList = document.getElementById('todo-list');

	todoList.innerHTML ='';

	todos.forEach(element => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = element.done; //boolean
		span.classList.add('bubble');

		if (element.category == 'personal') {
			span.classList.add('personal')
		} else {
			span.classList.add('business')
		}

		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${element.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (element.done) {
			todoItem.classList.add('done')
		}

		input.addEventListener('click', (event) => {
			element.done = event.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (element.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.add('remove');
			}

			displayTodos();
		})

		edit.addEventListener('click', (event) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (event) => {
				input.setAttribute('readonly', true);
				element.content = event.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				displayTodos();
			})
		})

		deleteButton.addEventListener('click', (event) => {
			todos = todos.filter(t => t != element);
			localStorage.setItem('todos', JSON.stringify(todos));
			displayTodos();

		})
	})

	if (todos.length == 0) {
		document.getElementById('finished').style.display = 'block';
	} else {
		document.getElementById('finished').style.display = 'none';
	};

}

function sortArray () {
	todos.sort((a, b) => a.priority - b.priority)
}


