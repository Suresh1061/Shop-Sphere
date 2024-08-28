'use client'

import toast from 'react-hot-toast'
import { useParams } from 'next/navigation'
import ProductDetails from '@/components/product/product-details'
import { useEffect, useState } from 'react'
import { useGetProductDetailsQuery } from '@/store/features/productFeature'
import dynamic from 'next/dynamic'
const ProductForm = dynamic(() => import('@/components/product/product-form'), { ssr: false })
const ProductDetailsSkeleton = dynamic(() => import('@/components/product/product-details-skleton'), { ssr: false })



const Product = () => {
  const { productId } = useParams<{ productId: string }>()
  const { data, isLoading, isError, error, refetch } = useGetProductDetailsQuery({ id: productId })
  const [editable, setEditable] = useState<boolean>(false)

  useEffect(() => {
    if (isError) {
      const errorMessage = error as { data: { message: string } }
      toast.error(errorMessage.data.message)
    }
    else refetch()
  }, [productId, editable, isError])

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    console.error(error);
    toast.error('Error while fetching product details')
  }

  const product = data?.data
  return (
    <div>
      {editable ? (
        <ProductForm
          product={product}
          setEditable={(value) => setEditable(value)}
        />
      ) : (
        <ProductDetails
          {...product}
          setEditable={(value) => setEditable(value)}
        />
      )}
    </div>
  )
}

export default Product
