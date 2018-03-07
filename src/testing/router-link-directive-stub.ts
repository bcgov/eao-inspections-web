import { Component, Directive, Input, Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})

export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;

  navigatedTo: any = null;
  
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}