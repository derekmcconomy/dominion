import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Platinum extends Card {
  name = 'Platinum';
  value = 10;
  cost = 5;
  types = new Set(['Treasure']);
}