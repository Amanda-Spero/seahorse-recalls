const addSearchForm = document.getElementById('addSavedSearch');
const saveBtn = document.getElementById('saveBtn');

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
  };

  console.log(JSON.stringify(newSaveSearch));
  fetch('/api/account/saveSearch', ajaxParam)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });

};

saveBtn.addEventListener('click', save);
