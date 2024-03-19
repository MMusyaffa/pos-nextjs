import { shortName } from "./helpers";

export async function fetchItems({ name = '', category = '' }) {
  const response = await fetch(`/api/items?name=${name}&category=${category}`);
  const responseData = await response.json();

  if (responseData.error) {
    return null;
  }

  const items = responseData.data.map((item) => {
    return {
      ...item,
      Devise: 'Rp.',
      ImageUrl: {
        Valid: item.ImageUrl.Valid,
        String: `${responseData.endpoint}/public/${item.ImageUrl.String}`,
      },
      ShortName: shortName(item.Name),
    }
  });

  return items;
}

export async function fetchCategories() {
  const response = await fetch('/api/categories');
  const responseData = await response.json();

  if (responseData.error) {
    return null;
  }

  const categories = responseData.data.map((category) => {
    return {
      ...category,
      ImageUrl: {
        Valid: category.ImageUrl.Valid,
        String: `${responseData.endpoint}/public/${category.ImageUrl.String}`,
      },
    }
  });
  return categories;
}

export default {
  fetchItems,
  fetchCategories,
}