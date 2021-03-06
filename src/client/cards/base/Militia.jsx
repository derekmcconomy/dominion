import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Militia extends Card {
  static description = <div>
  <p>+<Coin>2</Coin></p>
  <p>Each other player discards down to 3 cards in hand.</p>
  </div>
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Militia', Militia);
