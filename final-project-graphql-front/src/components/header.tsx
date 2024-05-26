import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';



const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  console.log("TOKEN in header")
  console.log(authToken)
  return (
    <div>
        <h2>Header</h2>
      <nav>     
               <div>
                    <Link to="/login">SignIn</Link>
                    <span>|</span>
                    <Link to="/logout">SignOut</Link>
                    <span>|</span>
                    <Link to="/articles">GO TO ARTICLES</Link>
                    <span>|</span>
                    <Link to="/createArticle">Create Article</Link>
               </div>
      </nav>
    </div>
  );
};

export default Header;