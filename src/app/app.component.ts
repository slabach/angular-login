import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ango-ui'
  // init username and password 
  log_user = ''
  log_pwd = ''

  // init http client interface
  constructor(
    private httpClient: HttpClient
  ) {}

  // handle submit login request
  async submitLogin(){
		// get time for token comparison
    let today = new Date()
    let cur_hour = today.getHours().toString().padStart(2, '0')
    let cur_minute = today.getMinutes().toString().padStart(2, '0')
    let token = `${cur_hour}${cur_minute}`
    let token_int = parseInt(token)

    // POST request to api
    await this.httpClient.post('/api/login', {
      username: this.log_user,
      password: this.log_pwd,
      timestamp: token_int
    }).subscribe({
      // if success response, alert success
      next: resp => {        
        // console.log(resp)
        Swal.fire({
          title: 'Success!',
          text: 'Do you want to continue',
          icon: 'success',
          confirmButtonText: 'Cool'
        }).then((result) => {
          // if confirm button selected, navigate to next page
          if (result.isConfirmed) {
            document.location.href = 'http://onecause.com'
          }
        })
      },
      // if error, display alert with error message from API
      error: error => {
        // console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Shucks'
        })
      }
    })

    // reset username and password fields on DOM
    this.log_user = ''
    this.log_pwd = ''
  }
}

// {
//   "username": "c137@onecause.com",
//   "password": "#th@nH@rm#y#r!$100%D0p#"
// }