import { Ability } from '@casl/ability';
import abilityRules from '../../../storage/ability-rules.json';

let ability = new Ability();

ability.update(abilityRules['ROLE_BASIC']);

export default ability;
