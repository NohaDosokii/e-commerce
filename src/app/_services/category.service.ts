import { CategoryType } from "../_types/product.type";


  export async function getAllCategories()  :Promise <CategoryType[] |null>{
    try {
      let res = await fetch('https://ecommerce.routemisr.com/api/v1/categories',{
         cache: 'force-cache'
      });
      let resData = await res.json();
    
      return resData.data


    } catch (error) {
     console.log("error" ,error);
      return null;
  
    }


  }



  export async function getSubcategoriesByCategoryId(categoryId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
