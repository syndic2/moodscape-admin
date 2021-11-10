import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { hexToRgb, rgbToHex, getColorShades } from 'src/app/utilities/helpers';
import { validateUpdateTheme } from 'src/app/store/actions/theme.actions';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-theme-detail-modal',
  templateUrl: './theme-detail-modal.component.html',
  styleUrls: ['./theme-detail-modal.component.scss']
})
export class ThemeDetailModalComponent implements OnInit, OnDestroy {
  public updateThemeForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ThemeDetailModalComponent>,
    private store: Store,
    public utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.updateThemeForm.patchValue({ ...this.data.theme });
    this.updateThemeForm.updateValueAndValidity();
  }

  ngOnDestroy() {
  }

  get name() {
    return this.updateThemeForm.get('name');
  }

  get colors() {
    return this.updateThemeForm.get('colors');
  }

  get primaryColor() {
    return this.updateThemeForm.get('colors.primary');
  }

  get primaryRgbColor() {
    return this.updateThemeForm.get('colors.primaryRgb');
  }

  get contrastColor() {
    return this.updateThemeForm.get('colors.primaryContrast');
  }

  get contrastRgbColor() {
    return this.updateThemeForm.get('colors.primaryContrastRgb');
  }

  get shadeColor() {
    return this.updateThemeForm.get('colors.primaryShade');
  }

  get tintColor() {
    return this.updateThemeForm.get('colors.primaryTint');
  }

  get isActive() {
    return this.updateThemeForm.get('isActive');
  }

  initializeForm() {
    this.updateThemeForm= new FormGroup({
      name: new FormControl('', Validators.required),
      colors: new FormGroup({
        primary: new FormControl('', Validators.required),
        primaryRgb: new FormControl(''),
        primaryContrast: new FormControl('', Validators.required),
        primaryContrastRgb: new FormControl(''),
        primaryShade: new FormControl('', Validators.required), 
        primaryTint: new FormControl('', Validators.required)
      }),
      isActive: new FormControl(null, Validators.required)
    });
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
    this.store.dispatch(validateUpdateTheme({
      themeId: this.data.theme.Id, 
      fields: this.updateThemeForm.value, 
      isInvalid: this.updateThemeForm.invalid 
    }));
  }
}
