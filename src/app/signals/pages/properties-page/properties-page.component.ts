import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styles: [
  ]
})
export class PropertiesPageComponent implements OnDestroy, OnInit{



  public user = signal<User>(
    {
      id: 5,
      email: 'charles.morris@reqres.in',
      first_name: 'Charles',
      last_name: 'Morris',
      avatar: "https://reqres.in/img/faces/5-image.jpg"
    }
    )

    public fullName = computed( () => `${ this.user().first_name} ${ this.user().last_name}`);
    public counter = signal(10)


    userChangedEffect = effect( () => {

      //* el disparador se va a realizar solo si se modifican las dependencias que estan referenciadas dentro del metodo. En este caso esta referenciado el first_name y el counter por lo que el console.log se dispara solo si se modifica una de dichas señales
      console.log(`${ this.user().first_name } - ${ this.counter() }`)

    })


    ngOnInit(): void {
      setInterval( () => {
        this.counter.update( current => current +1 )

        if ( this.counter() == 15 )
          this.userChangedEffect.destroy();
      },1000)
    }


    ngOnDestroy(): void {
      // this.userChangedEffect.destroy();
    }

    onFieldUpdated( field: keyof User, value: string) {

      // this.user.set({
        //   ...this.user(),
    //   [field] : value,
    // })

    // this.user.update( current => ({
    //   ...current,
    //   [field]: value
    // }))

    this.user.update( current => {

      switch( field ) {

        case 'email':
          current.email = value;
          break;

        case 'avatar':
          current.avatar = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number(value)

      }

      return current

    })
  }

  increaseBy( value: number) {
    this.counter.update(current => current + value);
  }
}
