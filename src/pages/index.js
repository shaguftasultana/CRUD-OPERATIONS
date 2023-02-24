import React from 'react'
import AddEdit from './components/AddEdit'
import Head from 'next/head'

const index = () => {
  return (
    <>
    <Head>
      <title>Add/Edit Form for Products</title>
    </Head>
      <AddEdit/>
    </>
  )
}

export default index
