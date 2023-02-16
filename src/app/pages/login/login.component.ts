import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@services/auth.service";
import {mergeMap, takeUntil} from "rxjs";
import {DestroyService} from "@services/destroy.service";
import {Router} from "@angular/router";

@Component({
  selector: 'rg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private destroy$: DestroyService,
              private router: Router) {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submit() {
    this.authService.login(this.form.getRawValue())
      .pipe(takeUntil(this.destroy$), mergeMap(value => {
        this.authService.saveKey(value.auth_token);
        return this.authService.getMainToken(value.auth_token)
      }))
      .subscribe(value => {
        this.authService.authorize(value.tokens[0].token);
        this.router.navigateByUrl('/profile');
      });
  }
}
