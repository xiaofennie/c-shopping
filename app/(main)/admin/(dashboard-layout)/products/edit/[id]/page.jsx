'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  BigLoading,
  ConfirmUpdateModal,
  HandleResponse,
  PageContainer,
  ProductsForm,
} from 'components'

import { useDisclosure } from 'hooks'

import { useDispatch } from 'react-redux'
import { showAlert } from 'store'

import { SubmitHandler } from 'react-hook-form'

import { useGetSingleProductQuery, useUpdateProductMutation } from '@/store/services'
import { useTitle } from '@/hooks'

const EditProductPage = ({ params: { id } }) => {
  const dispatch = useDispatch()
  useTitle('编辑商品')
  //? Assets
  const { back } = useRouter()

  const initialUpdataInfo = {}

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] = useState(initialUpdataInfo)

  //? Queries
  //*    Get Product
  const { data: selectedProduct, isLoading: isLoadingGetSelectedProduct } =
    useGetSingleProductQuery({ id })

  //*   Update Product
  const [
    updateProduct,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateProductMutation()

  //? Handlers
  const updateHandler = data => {
    console.log(data)
    if (data.images.length) {
      setUpdateInfo(prev => ({ ...prev, ...selectedProduct.data, ...data }))
      confirmUpdateModalHandlers.open()
    } else {
      dispatch(
        showAlert({
          status: 'warning',
          title: '请上传图片',
        })
      )
    }
  }

  const onConfirmUpdate = () => {
    updateProduct({
      id,
      body: updateInfo,
    })
  }

  const onCancelUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  const onSuccessUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
    back()
  }

  const onErrorUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  return (
    <>
      <ConfirmUpdateModal
        title="商品"
        isLoading={isLoadingUpdate}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        onCancel={onCancelUpdate}
        onConfirm={onConfirmUpdate}
      />

      {(isSuccessUpdate || isErrorUpdate) && (
        <HandleResponse
          isError={isErrorUpdate}
          isSuccess={isSuccessUpdate}
          error={errorUpdate?.data?.message}
          message={dataUpdate?.message}
          onSuccess={onSuccessUpdate}
          onError={onErrorUpdate}
        />
      )}

      <main>
        <PageContainer title="编辑商品">
          {isLoadingGetSelectedProduct ? (
            <div className="px-3 py-20">
              <BigLoading />
            </div>
          ) : selectedProduct.data ? (
            <ProductsForm
              mode="edit"
              isLoadingUpdate={isLoadingUpdate}
              updateHandler={updateHandler}
              selectedProduct={selectedProduct.data}
            />
          ) : null}
        </PageContainer>
      </main>
    </>
  )
}

export default EditProductPage
