import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import TransportationPage from "./pages/TransportationPage";
import ArtefactsPage from "./pages/ArtefactsPage";
import Theme from "./components/Theme/Theme";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import FAQPage from "./pages/FAQPage";
import {useAppDispatch} from "./store";
import {useEffect} from "react";
import {initSSE} from "./store/interface/initSSE";

function App() {
    const dispatchAction = useAppDispatch();

    useEffect(() => {
        const serverConnection = initSSE(dispatchAction);

        return () => {
            serverConnection.close();
        }
    }, [])

    return (
        <>
            <Theme />
            <Routes>
                <Route path='/' element={<HomePage />}/>

                <Route path='/' element={<Header />}>
                    <Route path='calculator' element={<CalculatorPage />}/>
                    <Route path='artefacts' element={<ArtefactsPage />}/>
                    <Route path='transportation' element={<TransportationPage />}/>
                    <Route path='FAQ' element={<FAQPage />} />
                    <Route path="*" element={<NotFoundPage />}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
