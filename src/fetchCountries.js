import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(searchСountry) {
    return fetch(`https://restcountries.com/v3.1/name/${searchСountry}?fields=name,capital,population,flags,languages`)
         .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })

    .catch(err => {return Notify.failure("Oops, there is no country with that name")});
}

        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error(response.status);
        //     }
        //     return response.json();
        // })
//         .catch(err => console.log('Error!'));
       
// }