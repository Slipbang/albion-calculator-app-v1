import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import TransportationPage from "./pages/TransportationPage";
import ArtefactsPage from "./pages/ArtefactsPage";
import Theme from "./components/Theme/Theme";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import FAQ from "./components/FAQ/FAQ";

function App() {

    return (
        <>
            <Theme />
            <Routes>
                <Route path='/' element={<HomePage />}/>

                {/*<Route path='/:language' element={<Header />}>*/}
                {/*    <Route path='calculator/:mode/:type' element={<CalculatorPage />}/>*/}
                {/*    <Route path='artefacts/:artefactClass/:artefactType/:artefactTier' element={<ArtefactsPage />}/>*/}
                {/*    <Route path='transportation' element={<TransportationPage />}/>*/}
                {/*    <Route path='FAQ' element={< FAQ/>} />*/}
                {/*    <Route path="*" element={<NotFoundPage />}/>*/}
                {/*</Route>*/}

                <Route path='/' element={<Header />}>
                    <Route path='calculator' element={<CalculatorPage />}/>
                    <Route path='artefacts' element={<ArtefactsPage />}/>
                    <Route path='transportation' element={<TransportationPage />}/>
                    <Route path='FAQ' element={< FAQ/>} />
                    <Route path="*" element={<NotFoundPage />}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
