import { Component, h, Prop } from '@stencil/core';

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


@Component({
	tag: 'app-number-box',
})
export class NumberStrip {
	@Prop() selectedDigit?: number;

	render() {
		const range = [...Array(10).keys()];
		return (
			<div
				class="number-strip"
				style={{
					top: this.selectedDigit ?  `-${this.selectedDigit * 50}px` : '0',
				}}
			>
				{range.map(n => (
					<NumberBox
						value={n}
						selected={this.selectedDigit === n}
					/>
				))}
			</div>
		);
	}
}
