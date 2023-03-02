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
    this.name = `assets/sprite.svg#${this.name}`
		return this.name;
	}

}
