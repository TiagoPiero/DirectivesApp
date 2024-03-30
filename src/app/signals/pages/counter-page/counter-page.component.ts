import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styles: [
  ]
})
export class CounterPageComponent {

  public counter = signal(10);
  public squareCounter = computed( () => this.counter() * this.counter() ) //señal computada. es para solo lectura. No podemos modificarlo en ninguna parte del codigo

  increaseBy( value: number ):void {

    // this.counter.set( this.counter() + value);

    this.counter.update( current => current + value ); //otra forma mas facil de hacer la actualizacion. Actualiza el valor que ya tiene

  }
}
