import { Component, h, State } from '@stencil/core';

interface NumberBoxProps {
	value: number;
	selected?: boolean;
}

function NumberBox(props: NumberBoxProps) {
	const {
		value,
		selected,
	} = props;
	return (
		<div class={`number-block ${selected ? 'number-block-selected' : ''}`}>
			{value}
		</div>
	);
}

interface NumberStripProps {
	selectedDigit?: number;
}

function NumberStrip({selectedDigit}: NumberStripProps) {
	const range = [...Array(10).keys()];
	return (
		<div
			class="number-strip"
			style={{
				top: selectedDigit ?  `-${selectedDigit * 50}px` : '',
			}}
		>
			{range.map(n => (
				<NumberBox
					value={n}
					selected={selectedDigit === n}
				/>
			))}
		</div>
	);
}

interface NumberIllustrationProps {
	number: number;
}

function NumberIllustration({number}: NumberIllustrationProps) {
	const splitNumber = number.toString().split('');

	return (
		<div class="number-illustration">
			<div class="number-window"></div>
			{splitNumber.map(n => (
				<NumberStrip
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
						onChange={({target}) => this.number = (target as any).value}
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
