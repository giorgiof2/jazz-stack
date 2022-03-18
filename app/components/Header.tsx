import { Link } from 'remix'

const Header: React.FC = () => (
  <header className="top-0 z-10 border-b bg-white py-5 sm:sticky sm:h-20">
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex w-full flex-col items-center justify-center sm:flex-row sm:justify-between">
        <div className="mb-4 flex flex-col items-center sm:mb-0 sm:flex-row">
          <a href="/">
            <img src="/react-bricks-logo.svg" className="w-48" alt="React Bricks" />
          </a>
          <div className="flex space-x-5 text-center sm:ml-8">
            <Link to="/" className="text-gray-500 hover:text-pink-700">
              Home
            </Link>
            <Link to="/about-us" className="text-gray-500 hover:text-pink-700">
              About us
            </Link>
          </div>
        </div>
        <Link
          to="/admin"
          className="rounded bg-cyan-500 py-2 px-5 font-medium text-white transition duration-200 hover:bg-cyan-600 hover:shadow-lg"
        >
          Edit content
        </Link>
      </div>
    </div>
  </header>
)

export default Header
