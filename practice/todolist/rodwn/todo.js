const ToDo = {
	toDoWrapper: document.querySelector('.todo-wrap'),
	resetButton: document.querySelector('.btn-reset'),
	addButton: document.querySelector('.todo-wrap .todo-add'),
	input: document.querySelector('.todo-wrap .todo-input'),
	list: document.querySelector('.todo-wrap .todo-list'),

	init () {
		const bindAddListItem = this.addListItem.bind(ToDo),
			bindResetList = this.resetList.bind(ToDo);

		this.resetButton.addEventListener('click', bindResetList);
		this.addButton.addEventListener('click', bindAddListItem);
		this.list.addEventListener('click', this.addCheckboxToggle);
		this.list.addEventListener('click', this.removeListItem);
	},

	addListItem () {
		const elementLI = document.createElement('li');
		
		if (this.input.value.trim().length <= 0) {
			return alert('입력해주세요.');
		}

		elementLI.setAttribute('id', (this.list.childElementCount) ? Number(this.list.lastElementChild.id) + 1 : 1);
		elementLI.innerHTML = `<input type="checkbox" class="todo-checkbox"> <span>${this.input.value}</span> <button type="button" class="todo-delete">삭제</button>`;

		this.input.value = '';
		this.input.focus();
		this.list.appendChild(elementLI);

	},
	
	addCheckboxToggle: (e) => {
		const target = e.target;

		if (target.classList.contains('todo-checkbox')) {
			if (target.classList.contains('done') && target.getAttribute('checked') === 'checked') {
				target.classList.remove('done');
				target.removeAttribute('checked');
			} else {
				target.classList.add('done');
				target.setAttribute('checked', 'checked')
			}
		}
	},

	removeListItem: (e) => {
		const target = e.target; 

		if (target.classList.contains('todo-delete')) {
			ToDo.list.removeChild(target.parentElement);
		}
	},

	resetList () {
		localStorage.clear();
		this.list.innerHTML = '';
	}
}

ToDo.init();