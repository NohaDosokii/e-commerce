import { BrandType } from "../_types/product.type";



export async function getAllBrands(): Promise<BrandType[] | null> {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
      cache: 'force-cache' 
    });
    const resData = await res.json();
   
    return resData.data;
  } catch (error) {
    console.log("Error fetching brands:", error);
    return null;
  }
}

export async function getBrandById(brandId: string): Promise<BrandType | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.log(`Error fetching brand ${brandId}:`, error);
    return null;
  }
}