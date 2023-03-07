import React from 'react'
import Head from 'next/head'
import Header from './components/Header'
import AddEdit from './components/AddEdit'
import Footer from './components/Footer'

const index = () => {
  return (
    <>
    <Head >
      <title>Add/Edit Form for Products</title>
    </Head>
    <Header/>
    <AddEdit/>
    <Footer/>
    </>
  )
}

export default index
