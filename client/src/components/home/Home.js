import React from 'react'
import Header from './HeaderDepr'
import Footer from './Footer'
import Main from './Main'

class Home extends React.Component {
  render() {
    const post = {
      title: 'HowItEnds',
      description: 'Evolution simultor',
      linkText: 'Buy',
      image: 'https://source.unsplash.com/random',
      imgText: 'main image description',
    }
    return (
      <>
        <Main post={post} />
      </>
    )
  }
}

export default Home
