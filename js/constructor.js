document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    const container = document.getElementById('container');

    loadSavedData();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const text = event.target.taskText.value;

        addToArray(text)
    });

    function generateTable(array) {
        container.innerHTML = '';

        const table = document.createElement('table');

        const headerRow = document.createElement('tr');
        headerRow.classList.add('header-row');
        const rowStart = document.createElement('th');
        rowStart.textContent = 'Номер';
        headerRow.appendChild(rowStart);

        const taskHeader = document.createElement('th');
        taskHeader.textContent = `Задания` + ` (${array.length})`;
        headerRow.appendChild(taskHeader);

        table.appendChild(headerRow);

        for (let i = array.length - 1; i > 0; i--) {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = (i).toString();
            row.appendChild(dayCell);

            const taskCell = document.createElement('td');
            taskCell.textContent = array[i];
            row.appendChild(taskCell);

            const formText = `<form class="deleteForm">
                <input type="hidden" id="deleteTask"  name="deleteTask" value="${i}">
                <button type="submit">Удалить</button>
            </form>`

            const deleteCell = document.createElement('td');
            deleteCell.innerHTML = formText;
            row.appendChild(deleteCell);
            table.appendChild(row);

        }

        container.appendChild(table);
        setDeleteListeners();
    }

    function saveData(array) {
        const data = JSON.stringify(array);
        localStorage.setItem('data', data);
    }

    function loadSavedData() {
        let array = []
        const savedData = localStorage.getItem('data');
        if (savedData) {
            array = JSON.parse(savedData);
            generateTable(array);
        }
        generateTable(array);
    }

    function addToArray(value){
        const savedData = localStorage.getItem('data');
        if (savedData) {
            let array = JSON.parse(savedData);
            array.push(value);
            generateTable(array);
            saveData(array)
        } else {
            const array = [value];
            generateTable(array);
            saveData(array)
        }
    }

    function deleteFromArray(index){
        const savedData = localStorage.getItem('data');
        if (savedData) {
            let array = JSON.parse(savedData);
            array.splice(index, 1);
            generateTable(array);
            saveData(array);
        }
    }

    function setDeleteListeners() {
        const deleteForms = document.getElementsByClassName('deleteForm');
        for (let i = 0; i < deleteForms.length; i++) {
            deleteForms[i].addEventListener('submit', function (event) {
                event.preventDefault();
                const index = parseInt(this.deleteTask.value);
                deleteFromArray(index);
            });
        }
    }
});