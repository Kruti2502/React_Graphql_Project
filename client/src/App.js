import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useState} from "react"
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddModal from './pages/AddModal';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoutes from "./pages/PrivateRoutes";
import Home from './pages/Home';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:3030/graphql',
  cache,
});

function App() {
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    isAuthenticated: false
  });

  const loginHandler = (data) => {
    setUserDetails((prev) => ({
      ...prev,
      id: data?.userAuthenticated?.id,
      firstName: data?.userAuthenticated?.firstName,
      lastName: data?.userAuthenticated?.lastName,
      email: data?.userAuthenticated?.Email,
      isAuthenticated: data?.userAuthenticated?.isAuthenticated,
  }))
  }
  const logoutHandler = ({isAuthenticated}) => {
    setUserDetails(prev => ({
      ...prev,
      isAuthenticated
    }))
  }
  console.log(userDetails.isAuthenticated)
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header userDetails={userDetails} onLogout={logoutHandler}/>
          <div>
            <Routes>
              <Route element={<PrivateRoutes isAuthenticated={userDetails.isAuthenticated}/>} >
                <Route exact path='/addModal' element={<AddModal />} />
              </Route>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login onLogin={loginHandler} />} />
              <Route path='/signup' element={<Signup />} />
              <Route exact path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
