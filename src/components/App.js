import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  changeType = (type) => {
    this.setState({ filters: { type: type } });
  };

  findPets = () => {
    const type = this.state.filters.type;
    const fetchURL = type === "all" ? "/api/pets" : `/api/pets?type=${type}`;
    return fetch(fetchURL, (response) => {
      response.json();
    }).then((petsJson) => {
      this.setState({ pets: petsJson });
    });
  };

  adopt = (id) => {
    const pets = this.state.pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.changeType}
                onFindPetsClick={this.findPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adopt} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
