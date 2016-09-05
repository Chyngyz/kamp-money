import { TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';

describe('Signin Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [SigninComponent]});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('About Works!');
  });

});
