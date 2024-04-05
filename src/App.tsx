import {useEffect} from "react";

import Header from "./components/Header/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import TransportationPage from "./pages/TransportationPage";
import ArtefactsPage from "./pages/ArtefactsPage";
import Theme from "./components/Theme/Theme";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/calculator')
    },[])

    return (
        <div>
            <Header/>
            <Theme />
            <Routes>
                <Route path='/calculator' element={<CalculatorPage />}/>
                <Route path='/artefacts' element={<ArtefactsPage />}/>
                <Route path='/transportation' element={<TransportationPage />}/>
            </Routes>
        </div>
    );
}

export default App;
