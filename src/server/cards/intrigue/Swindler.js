import Card from 'cards/Card';

export default class Swindler extends Card {
  static cost = 3;
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.money += 2;
    await player.forEachOtherPlayer(async other => {
      if (await other.handleOwnReactions('attack', player, this)) {
        return;
      }
      const [card] = await other.lookAtTopOfDeck(1);
      if (!card) {
        return;
      }
      await other.trash(card, other.deck);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => s.cards.size > 0 && s.cards.last().cost === card.cost,
        message: `Choose a card to replace ${other.name}'s ${card.title}`,
      });
      if (!supply) {
        return;
      }
      await other.gain(supply.title);
    });
  }
}
