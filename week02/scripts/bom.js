const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', addItem);
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que la tecla Enter se procese de otra manera
        addItem();
    }
});
//Add items to the list, delete them, space between inputs
function addItem() {
    if (input.value != '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        li.innerHTML = '&nbsp;' + input.value;
        deleteButton.textContent = '❌';
        li.appendChild(deleteButton);
        list.appendChild(li);
        deleteButton.addEventListener('click', function() {
            list.removeChild(li);
        });
        input.value = '';
        input.focus();
    } else {
        input.focus();
    }
}
