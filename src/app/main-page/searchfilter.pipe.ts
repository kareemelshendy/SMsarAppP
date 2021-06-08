import { Pipe, PipeTransform } from '@angular/core';
import { Clients } from '../main-page/client.model';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(clients: Clients[], searchValue: string): Clients[] {
    if (!clients || !searchValue) {
      return clients;
    }
    return clients.filter(client => {
      // client.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      client.nationalId.match(searchValue);
    });
  }

}
