import { Component, OnInit, Input } from '@angular/core';
import { SearchUsersService } from '../search-users.service';
import { SalesLeadsService } from '../sales-leads.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
  place: string; // This ties to the property in the inputs in the html.
  language: string; // This ties to the property in the inputs in the html.

  results: any[] = []; // This holds the data coming back from the service.
  selected: boolean = false; // Flag to check if a user is checked or not.
  selectedUser: any; // Presently Selected user details.
  errorText: string = ''; // Error reporting to the user.

  hideSalesLeads: boolean = true; // Flag to hide salesLeads div.
  hideSearchUsers: boolean = false; // Flag to hide/show searchUsers div.
  expandedIndex: number = -1;

  constructor(private searchService: SearchUsersService, private salesLeadsService: SalesLeadsService) { }
  ngOnInit() { }

  expandRow(index: number): void
  {
    console.log('The expandRow method fired. ' + index + ' ' + this.expandedIndex)
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }

  grabAllMerchants()
  {
    console.log('The grabAllMerchants method fired.')
    this.errorText = '';
    this.salesLeadsService.getSalesLeads().subscribe(
      merchants => {
        this.results = merchants;
        console.log('The count of results: ' + this.results.length)
      },
      error => {
        this.results = [];
        this.errorText = 'Sorry, No Merchants found. Try Again.';
        console.error(error);
      }
    )
  }

  search(place: string, language: string)
  {
    this.selected = false;
    this.errorText = '';
    if ((place || language) && (place !== 'gribbins'))
    {
      this.place = place;
      this.language = language;
      this.searchService.getUsersByPlaceAndLanguage(place, language).subscribe(
        users => {
          this.results = users;
        },
        error => {
          this.results = [];
          this.errorText = 'Sorry, No Users found. Try Again.';
          console.error(error);
        }
      )
    } else {
      console.log('This is for the Sales Leads Stuff')
      this.hideSalesLeads = false;
      this.hideSearchUsers = true;
      this.grabAllMerchants();
      console.log('The SalesLeads stuff should be shown now.')
    }
  }

  getDetails(username: string)
  {
    this.searchService.getDetailsByUserName(username).subscribe(
      userDetails => {
        this.selectedUser = userDetails;
        this.selected = true;
      },
      error => {
        this.selected = false;
        console.error(error);
      }
    )
  }

}
