import axios from 'axios';
import {API_VERSION, MAIN_API, SEARCH_INDEX_NAME} from '../lib/apiConstants';
import {AzureKeyCredential, SearchClient} from "@azure/search-documents";


const AUTOCOMPLETE_MAIN_API = `${MAIN_API}/indexes/${SEARCH_INDEX_NAME}/docs/autocomplete?api-version=${API_VERSION}`;
const apiKey = "2A24BEE0627BC1A906B27F0901477AD8";
const searchClient = new SearchClient(MAIN_API, "map-features", new AzureKeyCredential(apiKey));

export class MapService {
  static async postAutocompleteQuery(searchText: string, displayAutcompleteItem:Function): Promise<any> {
    if(!searchText) return []
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

  static async queryDocuments(
    searchQuery: string,
  ): Promise<any> {
    console.log('Query #1 - search everything:');
    let searchOptions = {
      // select: ["HotelId", "HotelName", "Rating"],
      searchFields: ["keywords", "name", "description"],
      orderBy:["geo.distance(location, geography'POINT(3.9 7.4)')"],
      top:5
    };

    // @ts-ignore
    let searchResults = await searchClient.search(searchQuery, searchOptions);
    return searchResults
  }
}


