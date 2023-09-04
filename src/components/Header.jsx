import { Link } from 'react-router-dom'

function Header() {

    return (
        <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/topics">Topics</Link>
            <Link to="/articles">Articles</Link>
        </nav>
        </>
    )
}

export default Header