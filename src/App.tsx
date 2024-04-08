import {useEffect} from "react";

import Header from "./components/Header/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import TransportationPage from "./pages/TransportationPage";
import ArtefactsPage from "./pages/ArtefactsPage";
import Theme from "./components/Theme/Theme";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     navigate('/calculator')
    // },[])

    return (
        <div>
            <Theme />
            <Routes>
                <Route path="/" element={<HomePage />}/>

                <Route path="/" element={<Header />}>
                    <Route path='calculator' element={<CalculatorPage />}/>
                    <Route path='artefacts' element={<ArtefactsPage />}/>
                    <Route path='transportation' element={<TransportationPage />}/>
                    <Route path="*" element={<NotFoundPage />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
