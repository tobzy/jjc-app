import axios from 'axios';
import {API_VERSION, MAIN_API, SEARCH_INDEX_NAME} from '../lib/apiConstants';


const AUTOCOMPLETE_MAIN_API = `${MAIN_API}/indexes/${SEARCH_INDEX_NAME}/docs/autocomplete?api-version=${API_VERSION}`;

export class MapService {
  static async postAutocompleteQuery(searchText: string, displayAutcompleteItem:Function): Promise<any> {

    const { data } = await axios.post(`${AUTOCOMPLETE_MAIN_API}`, {
      "fuzzy": true,
      "search": searchText,
      "searchFields": "keywords, name",
      "suggesterName": "sg",
      "top": 6
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '90AE357E0F1F664C1E0C55618665998D'
      },
    });

    return [
      {
        sourceId: 'predictions',
        getItems() {
          return data?.value || [];
        },
        getItemUrl({ item }:any) {
          return item.queryPlusText;
        },
        // getItemInputValue({ item }:{item:any}) {
        //   return item.queryPlusText;
        // },
        templates: {
          header() {
            return null;
          },
          item({ item, components }:any) {
            return displayAutcompleteItem(item, components)
          },
          footer() {
            return null;
          },
        },
      },
    ]
  }

}