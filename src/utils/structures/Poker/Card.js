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

const { firstUpperCase } = require('../../functions');
const displaySuits = {
	spades: '♠',
	diamonds: '♦',
	hearts: '♥',
	clubs: '♣',
	joker: '⭐'
};

module.exports = class Card {
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
	}

	get blackjackValue() {
		if (this.value === 'Joker') return 0;
		if (this.value === 'King' || this.value === 'Queen' || this.value === 'Jack') return 10;
		if (this.value === 'Ace') return 11;
		return this.value;
	}

	get display() {
		return `${displaySuits[this.suit]} ${this.value}`;
	}

	get textDisplay() {
		return `${this.value} of ${firstUpperCase(this.suit)}`;
	}

	get pokersolverKey() {
		if (this.value === 'Joker') return null;
		let suitLetter;
		switch (this.suit) {
			case 'clubs': suitLetter = 'c'; break;
			case 'hearts': suitLetter = 'h'; break;
			case 'diamonds': suitLetter = 'd'; break;
			case 'spades': suitLetter = 's'; break;
		}
		let value;
		switch (this.value) {
			case 'King': value = 'K'; break;
			case 'Queen': value = 'Q'; break;
			case 'Jack': value = 'J'; break;
			case 'Ace': value = 'A'; break;
			case 10: value = 'T'; break;
			default: value = this.value; break;
		}
		return `${value}${suitLetter}`;
	}
};