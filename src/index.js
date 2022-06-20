import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/main.css';
import './styles/utilities.css';

import Admin from './routes/admin/admin.tsx';
import AdminBetalinger from './routes/admin/sections/betalinger/betalinger.tsx';
import AdminUsers from './routes/admin/sections/brugere/users.tsx';
import AdminGruppespil from './routes/admin/sections/gruppespil/gruppespil.tsx';
import AdminAnalyser from './routes/admin/sections/analyser/analyser.tsx';
import AdminMarketing from './routes/admin/sections/marketing/marketing.tsx';
import AdminNotifikationer from './routes/admin/sections/notifikationer/notifikationer.tsx';
import AdminIndstillinger from './routes/admin/sections/indstillinger/indstillinger.tsx';
import AdminProfil from './routes/admin/sections/profil/profil.tsx';

import AdminSide from './components/reusables/adminside.tsx';

import Start from './routes/start/start.tsx';
import About from './routes/about/about.tsx';
import Signup from './routes/signup/signup.tsx';
import Forside from './routes/forside/forside.tsx';
import Gruppespil from './routes/gruppespil/gruppespil.tsx';
import Kontakt from "./routes/kontakt/kontakt.tsx";
import Gruppesession from './routes/gruppesession/gruppesession.tsx';
import Priser from './routes/priser/priser.tsx';
import Faq from './routes/faq/faq.tsx';
import Betingelser from './routes/betingelser/betingelser.tsx';
import Privat from './routes/privat/privat.tsx';

import ClearHeader from './components/reusables/clearheader.jsx';
import Header from './components/reusables/header.jsx';
import BlogHeader from './components/reusables/blogHeader.jsx';
import Footer from './components/reusables/footer.tsx';
import Headerfix from './components/fix/headerfix.tsx';
import Stagefix from './components/fix/stagefix.tsx';
import Message from './services/message/message.tsx';
import Login from './services/login/login.jsx';
import Reno from './components/reno.jsx';

import StageHeader from './components/reusables/stageHeader.jsx';
import StageForside from './routes/stage/forside/forside.tsx';
import StageFaq from './routes/stage/faq/faq.tsx';
import StageAktiveSpil from './routes/stage/aktivespil/aktivespil.tsx';
import StageOpret from './routes/stage/opret/opret.tsx';
import StageFind from './routes/stage/find/find.tsx';
import StageGruppespil from './routes/stage/gruppespil/gruppespil.tsx';
import StageGruppesession from './routes/stage/gruppesession/gruppesession.tsx';
import StageIndstillinger from './routes/stage/indstillinger/indstillinger.tsx';
import StageMatcharticle from './routes/stage/matcharticle/matcharticle.tsx';
import StageTeam from './routes/stage/team/team.tsx';
import StageLeague from './routes/stage/league/league.tsx';
import StagePlayer from './routes/stage/player/player.tsx';
import StageNotifikationer from './routes/stage/notifikationer/notifikationer.tsx';
import StageGameindstillinger from './routes/stage/gameindstillinger/gameindstillinger.tsx';

import './assets/fonts/Montserrat-Regular.ttf';

import RequireAuth from "./services/RequireAuth";
import AdminAuth from "./services/AdminAuth.tsx";
import N404 from './components/N404.tsx';


ReactDOM.render(
    <Router>
        <Message />
        <Login />
        <Routes>
          <Route exact path="/" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Forside key="forsideKey" />]} />

          <Route element={<RequireAuth />}>
            <Route element={<AdminAuth key="adminAuth"/>}>
              <Route exact path="/admin/hjem" element={[<AdminSide key="adminSideKey" />, <Admin key="adminKey" />]} />
              <Route exact path="/admin/betalinger" element={[<AdminSide key="adminSideKey" />, <AdminBetalinger key="adminBetalingerKey" />]} />
              <Route exact path="/admin/users" element={[<AdminSide key="adminSideKey" />, <AdminUsers key="adminUsersKey" />]} />
              <Route exact path="/admin/gruppespil" element={[<AdminSide key="adminSideKey" />, <AdminGruppespil key="adminGruppespilKey" />]} />
              <Route exact path="/admin/analyser" element={[<AdminSide key="adminSideKey" />, <AdminAnalyser key="adminAnalyserKey" />]} />
              <Route exact path="/admin/marketing" element={[<AdminSide key="adminSideKey" />, <AdminMarketing key="adminMarketingKey" />]} />
              <Route exact path="/admin/indstillinger" element={[<AdminSide key="adminSideKey" />, <AdminIndstillinger key="adminIndstillingerKey" />]} />
              <Route exact path="/admin/notifikationer" element={[<AdminSide key="adminSideKey" />, <AdminNotifikationer key="adminNotifikationerKey" />]} />
              <Route exact path="/admin/profil" element={[<AdminSide key="adminSideKey" />, <AdminProfil key="adminProfilKey" />]} />
            </Route>
          </Route>

          <Route exact path="/kontakt" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/kom-igang" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/dyster" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />

          <Route exact path="/start" element={[<ClearHeader key="clearheaderKey" />, <Start key="startKey" />]} />
          <Route exact path="/about" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <About key="aboutKey" />]} />
          <Route exact path="/signup" element={[<ClearHeader key="clearheaderKey" />, <Signup key="signupKey" />]} />
          <Route exact path="/gruppespil" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Gruppespil key="gruppespilKey" />]} />
          <Route exact path="/gruppesession" element={[<Header key="headerKey" />, <Gruppesession key="gruppesessionKey" />]} />
          <Route exact path="/priser" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Priser key="priserKey" />]} />
          <Route exact path="/faq" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Faq key="faqKey" />]} />
          <Route exact path="/betingelser" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Betingelser key="betingelserKey" />]} />
          <Route exact path="/privatliv" element={[<Header key="headerKey" />, <Headerfix key="headerFixKey" />, <Privat key="privatKey" />]} />

          <Route exact path="/blog" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/blog/nyeste" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/blog/emner" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/blog/tips" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <Reno key="renoKey" />]} />
          <Route exact path="/blog/*" element={[<BlogHeader key="headerKey" />, <Headerfix key="headerFixKey" />, <N404 key="404Key" />]} />
        
          <Route element={<RequireAuth />}>
            <Route exact path="/stage/" element={[<StageHeader key="stageHeaderKey" />, <Stagefix key="stageFixKey" />, <StageForside key="stageForsideKey" />]} />
            <Route exact path="/stage/aktive-spil" element={[<StageHeader key="stageHeaderKey" />, <StageAktiveSpil key="StageAktiveSpilKey" />]} />
            <Route exact path="/stage/faq" element={[<StageHeader key="stageHeaderKey" />, <Stagefix key="stageFixKey" />, <StageFaq key="StageFaqKey" />]} />
            <Route exact path="/stage/opret-spil" element={[<StageHeader key="stageHeaderKey" />, <StageOpret key="StageOpretKey" />]} />
            <Route exact path="/stage/find-spil" element={[<StageHeader key="stageHeaderKey" />, <StageFind key="StageFindKey" />]} />
            <Route exact path="/stage/gruppespil" element={[<StageHeader key="stageHeaderKey" />, <StageGruppespil key="StageGruppespil" />]} />
            <Route exact path="/stage/gruppesession" element={[<StageHeader key="stageHeaderKey" />, <StageGruppesession key="StageGruppesession" />]} />
            <Route exact path="/stage/indstillinger" element={[<StageHeader key="stageHeaderKey" />, <Headerfix key="headerFixKey" />, <StageIndstillinger key="StageIndstillinger" />]} />
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