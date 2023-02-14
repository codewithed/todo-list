// Saves an Item to Local Storage
export function saveItem(itemName, itemObject) {
  localStorage.setItem(itemName, JSON.stringify(itemObject));
}

// Gets an Item from local storage
export function getItem(itemName) {
  return (localStorage.getItem(itemName));
}

// removes an Item from local storage
export function deleteItem(itemName) {
  localStorage.removeItem(itemName);
}
