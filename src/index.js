import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Header, UserPosts, UserTodos } from "./components";

import { getUsers, getPostsByUser, getTodosByUser } from "./api";

import { getCurrentUser } from "./auth";

//version 1, updated below
// const App = () => {
//   const [userList, setUserList] = useState([]);
//   useEffect(() => {
//     getUsers()
//       .then((users) => {
//         setUserList(users);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div id="App">
//       <Header userList={userList} />
//     </div>
//   );
// };

//version 2, updated (again) below
// const App = () => {
//   const [userList, setUserList] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null); // NEW

//   useEffect(() => {
//     getUsers()
//       .then(users => {
//         setUserList(users)
//       })
//       .catch(error => {
//         // something something errors
//         console.error(error)
//       });
//   }, []);

//   return (
//     <div id="App">
//       <Header
//         userList={ userList }
//         currentUser={ currentUser }
//         setCurrentUser={ setCurrentUser } />
//     </div>
//   );
// }

//version 3, updated (again) below
// const App = () => {
//   const [userList, setUserList] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     getUsers()
//       .then(users => {
//         setUserList(users)
//       })
//       .catch(error => {
//         // something something errors
//       });
//   }, []);

//   useEffect(() => {
//     if (!currentUser) {
//       setUserPosts([]);
//       return;
//     }

//     getPostsByUser(currentUser.id)
//       .then(posts => {
//         setUserPosts(posts);
//       })
//       .catch(error => {
//         // something something errors
//       });
//   }, [currentUser]);

//   return (
//     <div id="App">
//       <Header
//         userList={ userList }
//         currentUser={ currentUser }
//         setCurrentUser={ setCurrentUser } />
//       {
//         currentUser
//         ? <UserPosts
//             userPosts={ userPosts }
//             currentUser={ currentUser } />
//         : null
//       }

//     </div>
//   );
// }

//version 4
// const App = () => {
//   const [userList, setUserList] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userPosts, setUserPosts] = useState([]);
//   const [userTodos, setUserTodos] = useState([]); // NEW

//   useEffect(() => {
//     getUsers()
//       .then(users => {
//         setUserList(users)
//       })
//       .catch(error => {
//         // something something errors
//       });
//   }, []);

//   useEffect(() => {
//     if (!currentUser) {
//       setUserPosts([]);
//       setUserTodos([]); // NEW
//       return;
//     }

//     getPostsByUser(currentUser.id)
//       .then(posts => {
//         setUserPosts(posts);
//       })
//       .catch(error => {
//         // something something errors
//       });

//     // NEW
//     getTodosByUser(currentUser.id)
//       .then(todos => {
//         setUserTodos(todos);
//       })
//       .catch(error => {
//         // something something errors
//       });
//   }, [currentUser]);

//   return (
//     <Router>
//       <div id="App">
//         <Header
//           userList={ userList }
//           currentUser={ currentUser }
//           setCurrentUser={ setCurrentUser } />
//         {
//           currentUser
//           ? <>
//               <Switch>
//                 <Route path="/posts">
//                   <UserPosts
//                     userPosts={ userPosts }
//                     currentUser={ currentUser } />
//                 </Route>
//                 <Route path="/todos">
//                   <UserTodos
//                     userTodos={ userTodos }
//                     currentUser={ currentUser } />
//                 </Route>
//                 <Route exact path="/">
//                   <h2 style={{
//                     padding: ".5em"
//                   }}>Welcome, { currentUser.username }!</h2>
//                 </Route>
//                 <Redirect to="/" />
//               </Switch>
//             </>
//           : <>
//               <Switch>
//                 <Route exact path="/">
//                   <h2 style={{
//                     padding: ".5em"
//                   }}>Please log in, above.</h2>
//                 </Route>
//                 <Redirect to="/" />
//               </Switch>
//             </>
//         }
//       </div>
//     </Router>
//   );
// }

//version 5
const App = () => {
  const [userList, setUserList] = useState([]);
  //const [currentUser, setCurrentUser] = useState(null); modified below
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUserList(users);
      })
      .catch((error) => {
        // something something errors
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setUserPosts([]);
      setUserTodos([]);
      return;
    }

    getPostsByUser(currentUser.id)
      .then((posts) => {
        setUserPosts(posts);
      })
      .catch((error) => {
        // something something errors
      });

    getTodosByUser(currentUser.id)
      .then((todos) => {
        setUserTodos(todos);
      })
      .catch((error) => {
        // something something errors
      });
  }, [currentUser]);

  return (
    <Router>
      <div id="App">
        <Header
          userList={userList}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        {currentUser ? (
          <>
            <Switch>
              <Route path="/posts">
                <UserPosts userPosts={userPosts} currentUser={currentUser} />
              </Route>
              <Route path="/todos">
                <UserTodos userTodos={userTodos} currentUser={currentUser} />
              </Route>
              <Route exact path="/">
                <h2
                  style={{
                    padding: ".5em",
                  }}
                >
                  Welcome, {currentUser.username}!
                </h2>
              </Route>
              <Redirect to="/" />
            </Switch>
          </>
        ) : (
          <>
            <Switch>
              <Route exact path="/">
                <h2
                  style={{
                    padding: ".5em",
                  }}
                >
                  Please log in, above.
                </h2>
              </Route>
              <Redirect to="/" />
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
