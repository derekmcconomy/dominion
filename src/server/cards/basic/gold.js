import Card from 'cards/Card';

export default class Gold extends Card {
  static value = 3;
  static cost = 6;
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  static getNumberInSupply(game) {
    return 30;
  }
  onPlay(player) {
    player.money += 3;
  }
}
