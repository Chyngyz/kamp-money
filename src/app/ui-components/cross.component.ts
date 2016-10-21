import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kmp-cross',
    template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 50 50">
        <path fill="#ff0000" style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 L 7.71875 6.28125 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path>
    </svg>
    `,
    styles: [':host {display: block; text-align: center;} :host svg {display: inline-block;}']
})
export class CrossIconComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}