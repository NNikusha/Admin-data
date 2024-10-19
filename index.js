const getTodos = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

const getUsers = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        const tbody = document.querySelector('tbody');
        const rowToDelete = Array.from(tbody.querySelectorAll('tr')).find(row => row.dataset.id == id);

        if (rowToDelete) {
            rowToDelete.remove(); 
            console.log("Row successfully deleted.");
        } else {
            console.error("Row not found for ID:", id);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

const renderTodos = async () => {
    const todos = await getTodos();
    const users = await getUsers();
    const tbody = document.querySelector('tbody');
    let rows = '';

    for (let i = 0; i < 10; i++) {
        const status = todos[i].completed 
            ? `<span class="status active">True</span>` 
            : `<span class="status non-active">False</span>`;

        rows += `
            <tr data-id="${users[i].id}">
                <td class="checkbox">
                    <input type="checkbox" class="custom-checkbox" />
                </td>
                <td class="image">
                <img src="data:image/jpeg;base64,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" alt="Thumbnail" width="50" />
            </td>
            <td class="col-432">${todos[i].title}</td>
            <td class="col-236">${users[i].email}</td>
            <td class="col-203">${users[i].address.street} ${users[i].address.suite}</td>
            <td class="col-306">${users[i].address.zipcode}</td>
            <td class="col-235">${status}</td>
            <td class="delete col-115">
                <img class="delete-icon" src="data:image/png;base64,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" alt="Delete" onclick="deleteUser(${users[i].id})"/>
            </td>
            </tr>
        `;
    }

    tbody.innerHTML = rows;
};

renderTodos();
