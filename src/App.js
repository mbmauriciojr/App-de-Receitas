import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProviderBebidas from './provider/ProviderBebida';
import ProviderComidas from './provider/ProviderComidas';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Login,
  Perfil,
  Comidas,
  Bebidas,
  ReceitasFavoritas,
  ReceitasFeitas,
  ExplorarComidasArea,
  ExplorarComidasING,
  ExplorarBebidasING,
  ExplorarBebidas,
  ExplorarComidas,
  Explorar,
  BebidasAtiva,
  ComidasAtiva,
  DetalhesComida,
  DetalhesBebida,
} from './pages';

function App() {
  const renderDetalheReceitaComida = (match) => (<DetalhesComida match={ match } />);

  const renderDetalheReceitaBebida = (match) => (<DetalhesBebida match={ match } />);

  return (
    <ProviderBebidas>
      <ProviderComidas>
        <Switch>
          <Route
            exact
            path="/comidas/:id/in-progress"
            render={ (props) => <ComidasAtiva { ...props } /> }
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            render={ (props) => <BebidasAtiva { ...props } /> }
          />
          <Route
            exact
            path="/comidas/:id"
            render={ ({ match }) => renderDetalheReceitaComida(match) }
          />
          <Route
            exact
            path="/bebidas/:id"
            render={ ({ match }) => renderDetalheReceitaBebida(match) }
          />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route path="/explorar/bebidas/ingredientes" component={ ExplorarBebidasING } />
          <Route path="/explorar/comidas/ingredientes" component={ ExplorarComidasING } />
          <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
          <Route
            exact
            path="/explorar/bebidas/area"
            render={ () => <span>Not Found</span> }
          />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route path="/perfil" component={ Perfil } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </ProviderComidas>
    </ProviderBebidas>
  );
}

export default App;
