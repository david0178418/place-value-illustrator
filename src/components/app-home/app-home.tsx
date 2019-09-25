import { Component, h, State } from '@stencil/core';

interface NumberIllustrationProps {
	number: number;
}

function NumberIllustration({number}: NumberIllustrationProps) {
	const splitNumber = number.toString().split('');

	return (
		<div class="number-illustration">
			<div class="number-window"></div>
			{splitNumber.map((n, i) => (
				<app-number-box
					key={splitNumber.length - i}
					selectedDigit={+n}
				/>
			))}
		</div>
	);
}

@Component({
	tag: 'app-home',
	styleUrl: 'app-home.css',
	shadow: true
})
export class AppHome {
	@State() number: number = 0;
	render() {
		return (
			<div class='app-home'>
				<p class="controls">
					<input
						min="0"
						type="number"
						value={this.number}
						onKeyUp={({target}) => this.number = +(target as any).value || 0}
					/>
				</p>
				<p>
					<button onClick={() => this.addNumber(-100)}>
						-100
					</button>
					<button onClick={() => this.addNumber(-10)}>
						-10
					</button>
					<button onClick={() => this.addNumber(-1)}>
						-1
					</button>
					<button onClick={() => this.addNumber(1)}>
						+1
					</button>
					<button onClick={() => this.addNumber(10)}>
						+10
					</button>
					<button onClick={() => this.addNumber(100)}>
						+100
					</button>
				</p>
				<div>
					<NumberIllustration number={this.number} />
				</div>
			</div>
		);
	}

	addNumber(adder: number) {
		const newVal = this.number + adder;

		if(newVal < 0) {
			this.number = 0;
		} else {
			this.number = newVal;
		}
	}
}
