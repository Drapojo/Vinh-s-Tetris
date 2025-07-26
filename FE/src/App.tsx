import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PlayPage from "./pages/PlayPage.tsx";
import Layout from "./layouts/Layout.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import LoggedInLayout from "./layouts/LoggedInLayout.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import History from "./pages/History.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import HandleSSO from "./pages/HandleSSO.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import MusicPage from "./pages/MusicPage.tsx";
import UserPage from "./pages/UserPage.tsx";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/handle-sso" element={<HandleSSO />} />
              <Route element={<Layout />}>
                <Route path="/" element={<MenuPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/play" element={<PlayPage />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route element={<LoggedInLayout />}>
                  <Route path="/history" element={<History />} />
                </Route>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/musics" element={<MusicPage />} />
                  <Route path="/users" element={<UserPage />} />
                </Route>
              </Route>
              {/*<Route element={<Layout />}>*/}
              {/*  <Route path="/" element={<Dashboard />} />*/}
              {/*  <Route path="/settings" element={<UserSettings />} />*/}
              {/*  <Route path="/courses" element={<Courses />} />*/}
              {/*  <Route*/}
              {/*    path="/courses/:course_id"*/}
              {/*    element={<TrainingProgramDetail />}*/}
              {/*  />*/}
              {/*  <Route path="/interviews" element={<Interviews />} />*/}
              {/*  <Route path="/schedule" element={<Schedule />} />*/}
              {/*  <Route path="/pretests" element={<Pretests />} />*/}
              {/*  <Route path="/news-feed" element={<NewsFeed />} />*/}
              {/*  <Route path="/post/:post_id" element={<PostDetails />} />*/}
              {/*  <Route path="/my-posts" element={<AllMyPosts />} />*/}
              {/*  <Route*/}
              {/*    path="/pretests/:pretest_id/processing"*/}
              {/*    element={<PretestProcessing />}*/}
              {/*  />*/}
              {/*  <Route path="/forum" element={<Forum />} />*/}
              {/*</Route>*/}
              {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
          </Router>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
