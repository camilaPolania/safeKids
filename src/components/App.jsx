import React from 'react';
//import './App.css';

import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import STORE from '../stores/Store';
import firebaseInit from '../utils/firebaseInit';
import StoreFirebase from '../utils/StoreFirebase';

const App = observer(class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      startTime: 0,
      finalhour: 0,
      step: 0,
      childrenAmount: 1,
      parentsAmount: 1,
      years: ['Selecciona', 'Entre 0 y 6 Meses', 'Entre 7 y 12 Meses', '1 año', '2 años', '3 años', '4 años', '5 años', '6 años', '7 años', '8 años'],
      relationship: ['Selecciona', 'Padre', 'Madre', 'Abuel@', 'Ti@', 'Amig@'],
      documentType: ['Selecciona', 'Cédula ciudania','Cédula extranjera','Otros'],
      response: [{name: '', reg: '', age: ''}],
      responseParents: [{celphone: '', name: '', documentT: '', docNum: '', kinship: ''}]
    };

    firebaseInit.init();
    this.handleChange = this.handleChange.bind(this);

  }



  handleChange(prop, val, index) {

    let temp = this.state.response;
    temp[index][prop] = val;

    this.setState({ response: temp });

  }

  handleChange2(prop, val, index) {

    let temp = this.state.responseParents;
    temp[index][prop] = val;

    this.setState({ responseParents: temp });

  }

  render() {
    return (this.state.step === 0? 

      <div className="Start">
        <button onClick={() => {
          this.setState({step: 1, startTime: Date.now()})

        }}>Empezar registro</button>
      </div>

      :  

      <div className="App">

        <h2>Niños</h2>
        <p>Elije la cantidad de menores de edad que desea registrar</p>

        {[...Array(this.state.childrenAmount)].map(
          (child, index) =>
            <div className='child' key={index}>
              <h3>Niño {index + 1}</h3>

              <input type="text" className="inpt" placeholder="Nombres"
                onChange={e => this.handleChange('name', e.target.value, index)} value={this.state.response[index].name} />

              <input type="number" className="inpt" placeholder="No. Registro Civil de Nacimiento"
                onChange={e => this.handleChange('reg', e.target.value, index)} value={this.state.response[index].reg} />
              <select id="years" name="Edades" onChange={e => this.handleChange('age', e.target.value, index)} value={this.state.response[index].age} >
                {this.state.years.map((option, i) =>
                  <option key={i} value={option}>{option}</option>)}
              </select>

            </div>
        )
        }

        <button onClick={() => {
          this.setState((prev) => { return { childrenAmount: prev.childrenAmount + 1, response: [...prev.response, {}] } })
        }}>Agregar Niño</button>

        {(this.state.childrenAmount - 1) > 0 && <button onClick={() => {
          this.setState((prev) => { return { childrenAmount: prev.childrenAmount - 1 } })
        }}>Eliminar Niño</button>}

        {[...Array(this.state.parentsAmount)].map(
          (parent, i) => <div className='parent' key={i}>

            <h2> Acompañante {i+1}</h2>

            <input type="text" className="inpt" placeholder="Nombres"
              onChange={e => this.handleChange2('name', e.target.value, i)} value={this.state.responseParents[i].name} />

            <select id="docType" name="document" onChange={e => this.handleChange2('documentT', e.target.value, i)} value={this.state.responseParents[i].documentT}>
              {this.state.documentType.map((option, i) =>
                <option key={i} value={option}>{option}</option>)}
            </select>

            <input type="text" className="inpt" placeholder="Número de documento"
              onChange={e => this.handleChange2('docNum', e.target.value, i)} value={this.state.responseParents[i].docNum} />

            <input type="number" className="inpt" placeholder="Celular"
              onChange={e => this.handleChange2('celphone', e.target.value, i)} value={this.state.responseParents[i].celphone} />

            <select id="family" name="Parentesco" onChange={e => this.handleChange2('kinship', e.target.value, i)} value={this.state.responseParents[i].kinship}  >
              {this.state.relationship.map((option, i) =>
                <option key={i} value={option}>{option}</option>)}
            </select>

          </div>
        )
        }

        <button onClick={() => {
          this.setState((prev) => { return { parentsAmount: prev.parentsAmount + 1 } })
        }}>Agregar Padre</button>

        {(this.state.parentsAmount - 1) > 0 && <button onClick={() => {
          this.setState((prev) => { return { parentsAmount: prev.parentsAmount - 1 } })
        }}>Eliminar Padre</button>}



        <button className="btn" onClick={() => {
          setTimeout(() => this.state.response.map(resp => StoreFirebase.add(resp), 500))
          setTimeout(() => this.state.responseParents.map(resp => StoreFirebase.add(resp), 500))
          this.setState(
            {
              finalhour: Date.now(),
              step: 0,
              response: [{name: '', reg: '', age: ''}],
              responseParents:[{celphone: '', name: '', documentT: '', docNum: '', kinship: ''}]
            })
          setTimeout(()=>console.log(this.state), 500);
        }}>Guardar</button>

        {/*
        {STORE.text}
         decomentar el router al probar que funciona 
        <Router basename="">
          <header>
            {//maybe you need a logo or nav right here to be always present
            }
          </header>
  
          <Switch>
            <Route exact path="/" component={} />
          </Switch>
  
          <footer>
            {//maybe your footer should be always present
            }
          </footer>
        </Router>
          */}
      </div>
    );
  }
});

export default App;