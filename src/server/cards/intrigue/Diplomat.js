import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Moat extends Card {
  name = 'Moat';
  cost = 2;
  types = new Set(['Action', 'Reaction']);
  async onPlay(player) {
    await player.draw(2);
    if (player.hand.size <= 5) {
      player.actions += 2;
    }
  }

  shouldReactTo(event) {
    return event === 'attack';
  }

  async reactTo(event, player) {
    if (player.hand.size >= 5) {
      await player.draw(2);
      const cards = await player.selectCards({
        min: 3,
        max: 3,
        message: 'Choose 3 cards to discard',
      });
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        await player.discard(card);
      }
    }
  }
}