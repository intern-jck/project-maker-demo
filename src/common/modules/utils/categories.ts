import axios from 'axios';

export async function addCategory(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();

  console.log('add cat', category)
  // return;
  try {
    const response = await axios.post('/api/categories', { category: category });
    const categories = await getCategories();
    setCategories(categories);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Could probably be merged with updateTextInput?
export function updateCategory(event: React.ChangeEvent<HTMLInputElement>) {
  event.preventDefault();
  const { value } = event.currentTarget;
  setCategory(value);
};

export async function getCategories() {
  try {
    const response = axios.get('api/categories');
    const categories = await response;
    return categories.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteCategory(event: React.SyntheticEvent) {
  // const { name, value } = event.currentTarget;
  const id = event.currentTarget.getAttribute('data-project-id');
  console.log('deleteing', name, id)
  try {
    const response = axios.delete(`api/categories?id=${id}`);
    // const categories = await response;
    const categories = await getCategories();
    setCategories(categories);
    setCategory('')
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}