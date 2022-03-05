/* eslint-disable no-new */
/* eslint-disable no-undef */
import Autobind from '@decorators/Autobind';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
import settings from '../settings';

class Map <T extends HTMLElement> {
  private form: T;

  private loader: Loader;

  private addressinput: HTMLInputElement;

  constructor() {
    this.form = document.querySelector('#map-form') as T;
    this.addressinput = document.getElementById('address') as HTMLInputElement;

    this.loader = new Loader({
      apiKey: settings.GOOGLE_API_KEY!,
      version: 'weekly',
    });

    this.configure();
  }

  @Autobind
  private searchAddressHandler(event: Event) {
    event?.preventDefault();
    const enteredAddress = this.addressinput?.value;

    axios.get(`
    https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${settings.GOOGLE_API_KEY}
    `)
      .then((res) => {
        if (res.data.status !== 'OK') {
          throw new Error('Couldn\'t fetch');
        }
        const coordinate = res.data.results[0].geometry.location;
        let map;

        this.loader.load().then(() => {
          map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
            center: { ...coordinate },
            zoom: 8,
          });
        });

        const marker = new google.maps.Marker({
          position: { ...coordinate },
          map,
          title: 'Hello World!',
        });
      });
  }

  configure() {
    this.form.addEventListener('submit', this.searchAddressHandler);
  }
}

export default Map;
