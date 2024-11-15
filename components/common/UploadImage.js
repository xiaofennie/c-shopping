'use client'

import AWS from 'aws-sdk'
import { useLazyGetUploadTokenQuery } from '@/store/services'
import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { getFilenameExt } from '@/utils'

const UploadImage = props => {
  //? Props
  const { folder, handleAddUploadedImageUrl } = props

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const [getUploadToken] = useLazyGetUploadTokenQuery()

  const handleFileChange = event => {
    setFile(event.target.files?.[0] || null)
  }

  const handleUpload = async event => {
    setLoading(true)

    if (!file) {
      setError('请选择一个文件')
      setLoading(false)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('所选文件必须是图像')
      setLoading(false)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('图像的大小不应超过5 MB')
      setLoading(false)
      return
    }

    // const credentials = await getUploadToken().unwrap()

    // const { AccessKeyId, AccessKeySecret, SecurityToken } = credentials.data
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
      region: process.env.NEXT_PUBLIC_AWS_REGION,
    })

    const s3 = new AWS.S3()

    // const ossClient = new OSS({
    //   accessKeyId: process.env.NEXT_PUBLIC_ALI_ACCESS_KEY,
    //   accessKeySecret: process.env.NEXT_PUBLIC_ALI_SECRET_KEY,
    //   bucket: process.env.NEXT_PUBLIC_ALI_BUCKET_NAME,
    //   region: process.env.NEXT_PUBLIC_ALI_REGION,
    // })

    const filePath = `${process.env.NEXT_PUBLIC_ALI_FILES_PATH}${folder || '/others'}/`
    const fileName = `${nanoid()}.${getFilenameExt(file.name)}`
    console.log(`${filePath}${fileName}`, file)

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: `${filePath}${fileName}`,
      Body: file,
    }

    s3.upload(params, function (err, data) {
      if (err) {
        console.log('上传失败：', err)
        setError(err.message || '未上载图像')
        setLoading(false)
      } else {
        console.log('上传成功：', data.Location)
        handleAddUploadedImageUrl(data.Location)
        setMessage('上传成功')
        setLoading(false)
      }
    })

    // ossClient
    //   .put(`${filePath}${fileName}`, file)
    //   .then(result => {
    //     handleAddUploadedImageUrl(result.url)
    //     setMessage('上传成功')
    //   })
    //   .catch(err => {
    //     console.log(`Common upload failed`, err)
    //     setError(err.message || '未上载图像')
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
  }

  return (
    <>
      <div className="flex-1 space-y-3 my-4">
        <label htmlFor="file" className="text-field__label">
          图像插件
        </label>
        <div className="flex items-center gap-x-3">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="border border-gray-300 px-3 py-2 w-full"
          />
          <button
            type="button"
            disabled={loading || !file}
            onClick={handleUpload}
            className="text-green-600 bg-green-50 w-36 hover:text-green-700 hover:bg-green-100 py-2 rounded"
          >
            {loading ? '正在上传...' : '上传'}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 my-1">{error}</p>}
      {message && <p className="text-green-500 my-1">{message}</p>}
    </>
  )
}

export default UploadImage
