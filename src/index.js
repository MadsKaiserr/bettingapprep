import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/main.css';
import './styles/utilities.css';
import './styles/responsive.css';
import './styles/transitions.css';

import Start from './routes/start/start';
import About from './routes/about/about';
import Signup from './routes/signup/signup';
import Forside from './routes/forside/forside';
import Gruppespil from './routes/gruppespil/gruppespil';
import Kontakt from "./routes/kontakt/kontakt";
import Gruppesession from './routes/gruppesession/gruppesession';
import Priser from './routes/priser/priser';
import Done from './routes/priser/done';
import Faq from './routes/faq/faq';
import Betingelser from './routes/betingelser/betingelser';
import Privat from './routes/privat/privat';

import ClearHeader from './components/reusables/clearheader';
import Header from './components/reusables/header';
import BlogHeader from './components/reusables/blogHeader';
import Footer from './components/reusables/footer';
import Headerfix from './components/fix/headerfix';
import Stagefix from './components/fix/stagefix';
import Message from './services/message/message';
import Login from './services/login/login';
import Reno from './components/reusables/reno';

import StageHeader from './components/reusables/stageHeader';
import StageForside from './routes/stage/forside/forside';
import StageFaq from './routes/stage/faq/faq';
import StageAktiveSpil from './routes/stage/aktivespil/aktivespil';
import StageOpret from './routes/stage/opret/opret';
import StageFind from './routes/stage/find/find';
import StageGruppespil from './routes/stage/gruppespil/gruppespil';
import StageGruppesession from './routes/stage/gruppesession/gruppesession';
import StageIndstillinger from './routes/stage/indstillinger/indstillinger';
import StageMatcharticle from './routes/stage/matcharticle/matcharticle';
import StageTeam from './routes/stage/team/team';
import StageLeague from './routes/stage/league/league';
import StagePlayer from './routes/stage/player/player';
import StageNotifikationer from './routes/stage/notifikationer/notifikationer';
import StageGameindstillinger from './routes/stage/gameindstillinger/gameindstillinger';

import './assets/fonts/Montserrat-Regular.ttf';

import RequireAuth from "./services/RequireAuth";
import N404 from './components/reusables/N404';

import Experience from './components/experience/experience';
import Name from './components/name/name';


ReactDOM.render(
    <Router>
        <Message />
        <Login />
        <Routes>
          <Route exact path="/" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Forside key="forsideKey" />]} />

          <Route exact path="/kontakt" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Kontakt key="renoKey" />]} />
          <Route exact path="/kom-igang" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/dyster" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />

          <Route exact path="/start" element={[<ClearHeader key="clearheaderKey" />, <Start key="startKey" />]} />
          <Route exact path="/about" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <About key="aboutKey" />]} />
          <Route exact path="/signup" element={[<ClearHeader key="clearheaderKey" />, <Signup key="signupKey" />]} />
          <Route exact path="/gruppespil" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Gruppespil key="gruppespilKey" />]} />
          <Route exact path="/gruppesession" element={[<Header key="headerKey" />, <Gruppesession key="gruppesessionKey" />]} />
          <Route exact path="/priser" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Priser key="priserKey" />]} />
          <Route exact path="/priser/done" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Done key="doneKey" />]} />
          <Route exact path="/faq" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Faq key="faqKey" />]} />
          <Route exact path="/betingelser" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Betingelser key="betingelserKey" />]} />
          <Route exact path="/privatliv" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Privat key="privatKey" />]} />

          <Route exact path="/blog" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/blog/nyeste" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/blog/emner" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/blog/tips" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/blog/*" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <N404 key="404Key" />]} />
        
          <Route element={<RequireAuth />}>
            <Route exact path="/stage/" element={[<StageHeader key="stageHeaderKey" />, <Stagefix key="stageFixKey" />, <StageForside key="stageForsideKey" />, <Experience key="stageExp" />, <Name key="stageBane" />]} />
            <Route exact path="/stage/aktive-spil" element={[<StageHeader key="stageHeaderKey" />, <StageAktiveSpil key="StageAktiveSpilKey" />]} />
            <Route exact path="/stage/faq" element={[<StageHeader key="stageHeaderKey" />, <Stagefix key="stageFixKey" />, <StageFaq key="StageFaqKey" />]} />
            <Route exact path="/stage/opret-spil" element={[<StageHeader key="stageHeaderKey" />, <StageOpret key="StageOpretKey" />]} />
            <Route exact path="/stage/find-spil" element={[<StageHeader key="stageHeaderKey" />, <StageFind key="StageFindKey" />]} />
            <Route exact path="/stage/gruppespil" element={[<StageHeader key="stageHeaderKey" />, <StageGruppespil key="StageGruppespil" />]} />
            <Route exact path="/stage/gruppesession" element={[<StageHeader key="stageHeaderKey" />, <StageGruppesession key="StageGruppesession" />]} />
            <Route exact path="/stage/indstillinger" element={[<StageHeader key="stageHeaderKey" />, <Stagefix key="headerFixKey" />, <StageIndstillinger key="StageIndstillinger" />]} />
            <Route exact path="/stage/match" element={[<StageHeader key="stageHeaderKey" />, <StageMatcharticle key="StageMatcharticle" />]} />
            <Route exact path="/stage/team" element={[<StageHeader key="stageHeaderKey" />, <StageTeam key="StageTeam" />]} />
            <Route exact path="/stage/league" element={[<StageHeader key="stageHeaderKey" />, <StageLeague key="StageLeague" />]} />
            <Route exact path="/stage/spiller" element={[<StageHeader key="stageHeaderKey" />, <StagePlayer key="StagePlayer" />]} />
            <Route exact path="/stage/notifikationer" element={[<StageHeader key="stageHeaderKey" />, <StageNotifikationer key="StageNotifikationer" />]} />
            <Route exact path="/stage/gameindstillinger" element={[<StageHeader key="stageHeaderKey" />, <StageGameindstillinger key="StageGameindstillinger" />]} />
          </Route>
          <Route exact path="/*" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <N404 key="404Key" />]} />
        </Routes>
        <Footer />
    </Router>,
  document.getElementById('root')
);