import ability from '@/ability';
import abilityRules from '@/../../storage/ability-rules.json';
import ApiAuthStore from '@/stores/api/AuthStore';
import PrivateApp from '@/components/private/App';
import PublicApp from '@/components/public/App';
import React, { Component } from 'react';
import Session from '@/Session';

class Meerkat extends Component {
  constructor(props) {
    super(props);
    this.state = Session.get();
  }

  componentDidMount() {
    ApiAuthStore
    .on("login.204", () => {
      this.setState(Session.get());
    })
    .on("logout.204", () => {
      this.setState(Session.get());
    });

    if (Session.get()) {
      ability.update(abilityRules[Session.get().role]);
    }
  }

  render() {
    return (
      <div className="Meerkat">
        { this.state.role !== null ? <PrivateApp /> : <PublicApp /> }
      </div>
    );
  }
}

export default Meerkat;
