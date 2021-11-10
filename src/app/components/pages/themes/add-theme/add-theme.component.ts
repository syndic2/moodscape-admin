import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { hexToRgb, rgbToHex, getColorShades } from 'src/app/utilities/helpers';
import { validateCreateTheme } from 'src/app/store/actions/theme.actions';
import { getIsResetForm } from 'src/app/store/selectors/application.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.scss']
})
export class AddThemeComponent implements OnInit,OnDestroy {
  public createThemeForm: FormGroup;
  private getIsResetFormSubscription: Subscription;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.createThemeForm= new FormGroup({
      name: new FormControl('', Validators.required),
      colors: new FormGroup({
        primary: new FormControl('', Validators.required),
        primaryRgb: new FormControl(''),
        primaryContrast: new FormControl('#ffffff', Validators.required),
        primaryContrastRgb: new FormControl(''),
        primaryShade: new FormControl('', Validators.required), 
        primaryTint: new FormControl('', Validators.required)
      }),
      isActive: new FormControl(true, Validators.required)
    });

    this.getIsResetFormSubscription= this.store.select(getIsResetForm).subscribe(res => {
      if (res) {
        this.createThemeForm.reset();
      }
    });
  }

  ngOnDestroy() {
    this.getIsResetFormSubscription && this.getIsResetFormSubscription.unsubscribe();
  }

  get name() {
    return this.createThemeForm.get('name');
  }

  get colors() {
    return this.createThemeForm.get('colors');
  }

  get primaryColor() {
    return this.createThemeForm.get('colors.primary');
  }

  get primaryRgbColor() {
    return this.createThemeForm.get('colors.primaryRgb');
  }

  get contrastColor() {
    return this.createThemeForm.get('colors.primaryContrast');
  }

  get contrastRgbColor() {
    return this.createThemeForm.get('colors.primaryContrastRgb');
  }

  get shadeColor() {
    return this.createThemeForm.get('colors.primaryShade');
  }

  get tintColor() {
    return this.createThemeForm.get('colors.primaryTint');
  }

  get isActive() {
    return this.createThemeForm.get('isActive');
  }

  onPrimaryColorChange(event) {
    const primaryColor= (event.color.hex as string).substring(1);
    const darkShades= getColorShades(hexToRgb(primaryColor), -10);
    const lightShades= getColorShades(hexToRgb(primaryColor), 10);

    this.primaryColor.setValue(event.color.hex);
    this.primaryRgbColor.setValue(hexToRgb(primaryColor).join(', '));

    this.shadeColor.setValue(rgbToHex(darkShades));
    this.tintColor.setValue(rgbToHex(lightShades));
  }

  onContrastColorChange(event) {
    const contrastColor= event.color.hex;

    this.contrastColor.setValue(contrastColor); 
    this.contrastRgbColor.setValue(hexToRgb(contrastColor).join(', '));
  }

  onShadeColorChange(event) {
    this.shadeColor.setValue(event.color.hex);
  }

  onTintColorChange(event) {
    this.tintColor.setValue(event.color.hex);
  }

  onSubmit() {
    this.store.dispatch(validateCreateTheme({ fields: this.createThemeForm.value, isInvalid: this.createThemeForm.invalid }));
  }
}
