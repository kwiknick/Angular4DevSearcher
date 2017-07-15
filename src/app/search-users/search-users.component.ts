import { Component, OnInit, Input } from '@angular/core';
import { SearchUsersService } from '../search-users.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit 
{
  place: string; // This ties to the property in the inputs in the html.
  language: string; // This ties to the property in the inputs in the html.

  results: any[] = []; // This holds the data coming back from the service.
  selected: boolean = false; // Flag to check if a user is checked or not.
  selectedUser: any; // Presently Selected user details.
  error_text: string = ""; // Error reporting to the user.

  constructor(private searchService: SearchUsersService) { }
  ngOnInit() { }

  search(place: string, language: string)
  {
    this.selected = false;
    this.error_text = "";
    if (place || language)
    {
      this.place = place;
      this.language = language;
      this.searchService.getUsersByPlaceAndLanguage(place, language).subscribe(
        users => {
          this.results = users;
        },
        error => {
          this.results = [];
          this.error_text = "Sorry, No Users found. Try Again.";
          console.error(error);
        }
      )
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
