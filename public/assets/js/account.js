const addSearchForm = document.getElementById('addSavedSearch');
const saveBtn = document.getElementById('saveBtn');
const savedSearches = document.getElementById('savedSearches');

const getNewItemHtml = (newItem) => {

  const { make, model, year, id } = newItem;

  const itemDiv = document.createElement('div');
  itemDiv.classList.add('saved-search');
  itemDiv.setAttribute('data-id', id);

  const inputsDiv = document.createElement('div');
  inputsDiv.classList.add('inputs');

  const inputMake = document.createElement('input');
  inputMake.setAttribute('disabled', true);
  inputMake.value = make;

  const inputModel = document.createElement('input');
  inputModel.setAttribute('disabled', true);
  inputModel.value = model;

  const inputYear = document.createElement('input');
  inputYear.setAttribute('disabled', true);
  inputYear.value = year;


  const btnDiv = document.createElement('div');
  btnDiv.classList.add('buttons');

  const btnDel = document.createElement('button');
  btnDel.innerText = 'Delete';

  btnDiv.appendChild(btnDel);

  inputsDiv.appendChild(inputMake);
  inputsDiv.appendChild(inputModel);
  inputsDiv.appendChild(inputYear);

  itemDiv.appendChild(inputsDiv);
  itemDiv.appendChild(btnDiv);

  return itemDiv;
}


const save = (event) => {
  event.preventDefault();

  const newSaveSearch = {
    model: addSearchForm.model.value,
    make: addSearchForm.make.value,
    year: addSearchForm.year.value,
  };

  const headers = {};
  headers['content-type'] = 'application/json';

  const ajaxParam = {
    body: JSON.stringify(newSaveSearch),
    method: 'POSt',
    headers,
    credentials: 'include',
  };

  fetch('/api/account/saveSearch', ajaxParam)
    .then(resp => resp.json())
    .then(resp => {
      const itemHtml = getNewItemHtml(resp);
      savedSearches.appendChild(itemHtml);
      addSearchForm.reset();
    })
    .catch(err => {
      console.log(err);
    });

};

saveBtn.addEventListener('click', save);
