import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import DefaultPage from "./components/DefaultPage";
import Hotmart from "./Pages/Hotmart";
import Clickbank from "./Pages/Clickbank";

function AppRoutes() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={ <DefaultPage/> }>
            <Route index element={ <Hotmart/> } />
            <Route path='clickbank' element={ <Clickbank/> } />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default AppRoutes;
