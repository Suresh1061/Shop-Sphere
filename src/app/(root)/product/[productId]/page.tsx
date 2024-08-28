'use client'

import { useParams } from 'next/navigation'
import { ProductDetails } from '@/components/product/product-details'
import { useGetProductDetailsQuery } from '@/store/baseApi'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { ProductForm } from '@/components/product/product-form'
import { ProductDetailsSkeleton } from '@/components/product/product-details-skleton'


const Product = () => {
  const { productId } = useParams<{ productId: string }>()
  const { data, isLoading, isError, error, refetch } = useGetProductDetailsQuery({ id: productId })
  const [editable, setEditable] = useState<boolean>(false)

  useEffect(() => {
    refetch()
  }, [productId, editable])

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
