import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kmp-tick',
    template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
        <path fill="#32c24d" style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 42.875 8.625 A 1.0001 1.0001 0 0 0 42.78125 8.65625 A 1.0001 1.0001 0 0 0 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 A 1.0001 1.0001 0 1 0 6.34375 29.59375 L 21.25 43.09375 A 1.0001 1.0001 0 0 0 22.75 42.875 L 43.84375 10.1875 A 1.0001 1.0001 0 0 0 42.875 8.625 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path>
    </svg>
    `,
    styles: [':host {display: block; text-align: center;} :host svg {display: inline-block;}']
})
export class TickIconComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}