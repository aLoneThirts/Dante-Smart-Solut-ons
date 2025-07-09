// components/Layout.js
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {/* main ile içerik alanını sarmaladık */}
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}