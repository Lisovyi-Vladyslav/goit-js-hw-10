import './css/styles.css';
import fetchCountries from '../src/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}


refs.searchInput.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e) {
    const searchСountry = e.target.value.trim();
    
    refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

    if (searchСountry === '') {
      return  
    } 
    fetchCountries(searchСountry)
        .then(countries => {
            
            
        if (Math.floor(countries.length) === 1) {
            renderCountryInfo(countries)
         } else if (Math.floor(countries.length) <= 10) {
           renderCountryList(countries)
         } else {
             return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
         }
        })
}
function renderCountryList(countries) {
    const markup = countries.map(({ flags, name }) => {
      return `
                 <il class="country-list__item list">
                 <img src="${flags.svg}"alt="Flag of ${name.official}" width = 50px >
                 <p class="country-list__text">${name.official}</p>
                 </il>
                `;
    }).join('');
    
   refs.countryList.insertAdjacentHTML("beforeend", markup);
}

function renderCountryInfo(countries) {
    const markup = countries.map(({name, capital, population, flags, languages}) => {
        return `
      <ul class="country-info__list list">
        <li class="country-info__item">
          <img
            class="country-info__img"
            src="${flags.svg}"
            alt="Flag of ${name.official}"
            width="50px"
          />
          <p class="country-info__text">${name.official}</p>
        </li>
        <il class="country-info__item">
          <p class="country-info__text">Capital: ${capital}</p>
        </il>
        <li class="country-info__item">
          <p class="country-info__text">Population: ${population}</p>
        </li>
        <li class="country-info__item">
          <p class="country-info__text">Languages: ${Object.values(
              languages
            )}</p>
        </li>
      </ul>
                `;
    }).join('');
    
   refs.countryInfo.insertAdjacentHTML("beforeend", markup);
}

