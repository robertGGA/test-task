import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'rg-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
	@Input() width!: number | string;
	@Input() height!: number | string;
	@Input() name: string = '';


	getPath() {
		const item = this.name;
		this.name = `src/assets/sprite.svg#${item}`
		return this.name;
	}

}
