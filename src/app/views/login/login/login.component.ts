import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '../../../models/profile';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginProfile: Profile = {};

  username: string = "";
  password: string = "";

  error: boolean = false;
  missing: boolean = false;

  constructor(private profileService:ProfileService, private router: Router) { 
  }

  ngOnInit(): void {
    
  }

  login(){
    //Resetting all the error divs
    this.error = false;
    this.missing = false;

    //Check both field if there's value
    if(this.username != "" && this.password!= "")
    {
      //console.log("test", this.username, this.password);
      this.profileService.login(this.username, this.password).subscribe(
        r => {           
          if (r.body !== null)
          {
            let profile = r.body;     

            //Store the return body into sessionStorage and then redirect to profile page
            sessionStorage.setItem("Authorization", JSON.stringify(profile) );
            this.router.navigate(['/profile']); 
          } else {
            //Error in case if something in the backend doesn't give us data for w.e reason.
            console.log("Returned profile but no data")
          }                  
        }
      )


    } else { //If one of the field is empty missing div shows up
      this.missing = true;
    }
  }

}
