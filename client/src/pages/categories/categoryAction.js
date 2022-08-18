import React from 'react'
import { fetchCategory } from '../../helpers/axiosHelper'

export const getCategoriesAction = async () => dispatch =>{
    const {status,categories} = await fetchCategory()
    console.log(categories)
  
}
