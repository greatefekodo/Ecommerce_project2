import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useError } from '../common/ErrorDisplay';
import ApiService from '../../services/ApiService';

export const CategoriesPage = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { ErrorDisplay, showError } = useError();

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await ApiService.getAllCategories();
          if (response.statusCode === 200) {
            setCategories(response.data)
          } else {
            showError(response.message);
          }
        } catch(error) {
          showError(error.response?.data?.message || error.message);
        }
      };
  
      fetchCategories();
  
    }, [showError])

    const handleCategoryClick = (categoryId) => {
      navigate(`/menu?category=${categoryId}`);
  }


  return (
    <div className='categories-page'>
      <ErrorDisplay/>
      <h1 className='categories-title'>Categories</h1>
      <div className='categories-grid'>
        {categories.map((category) => (
              <div key={category.id} className='home-category-card' onClick={() => handleCategoryClick(category.id)}>

                  <h2 className='category-name'>{category.name}</h2>
                  <p className='category-descriptio'>{category.description}</p>
              </div>
            ))}
      </div>
    </div>
  )
}


export default CategoriesPage;