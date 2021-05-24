/*
 * Copyright (c) 2021
 *
 * This file is part of Akira.
 *
 * Akira is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Akira is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Akira.  If not, see <https://www.gnu.org/licenses/>.
 *
 *
 */

const Card = require('./Card');
const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
const faces = ['Jack', 'Queen', 'King'];
const { shuffle } = require('../../functions');

module.exports = class Deck {
	constructor(options = {}) {
		this.deckCount = options.deckCount || 1;
		this.includeJokers = options.includeJokers || false;
		this.deck = [];
		this.makeCards(this.deckCount);
	}

	makeCards (deckCount) {
		for (let i = 0; i < deckCount; i++) {
			for (const suit of suits) {
				this.deck.push(new Card('Ace', suit));
				for (let j = 2; j <= 10; j++) this.deck.push(new Card(j, suit));
				for (const face of faces) this.deck.push(new Card(face, suit));
			}
			if (this.includeJokers) {
				this.deck.push(new Card('Joker', 'joker'));
				this.deck.push(new Card('Joker', 'joker'));
			}
		}
		this.deck = shuffle(this.deck);
		return this.deck;
	}

	draw (amount = 1) {
		const cards = [];
		for (let i = 0; i < amount; i++) {
			const card = this.deck[0];
			this.deck.shift();
			cards.push(card);
		}
		return amount === 1 ? cards[0] : cards;
	}

	reset() {
		this.deck = this.makeCards(this.deckCount);
		return this;
	}
};