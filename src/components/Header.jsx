import { Link } from 'react-router-dom'

function Header() {

    return (
        <>
        <nav>
            <Link to="/"><button>Home</button></Link>
            <Link to="/topics"><button>Topics</button></Link>
            <Link to="/articles"><button>Articles</button></Link>
        </nav>
        </>
    )
}

export default Header