import Header from './Header'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="font-content flex min-h-screen flex-col justify-between antialiased">
      <Header />
      <main className="isolate mb-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
