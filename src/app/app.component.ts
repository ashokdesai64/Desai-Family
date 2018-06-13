import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
          <a class="menu-profile" color="pink">
            <ion-avatar item-start>
              <img src="assets/img/ian-avatar.png" />
            </ion-avatar>
            <h4 class="title">Jony Deo</h4>
            <span class="address">jonydeo123@gmail.com</span>
          </a>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          <ion-icon class="menu-icon" name="{{p.icon}}"></ion-icon> {{p.title}}
        </button>
      </ion-list>
    </ion-content>

    <ion-footer text-center> 
        <button ion-button full outline no-margin class="" color="pink">
          Log Out &ensp; <ion-icon name="log-out"></ion-icon></button>
    </ion-footer>
  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'HomePage', icon: 'home' },
    { title: 'About Family', component: 'AboutFamilyPage', icon: 'information-circle' },
    { title: 'My Profile', component: 'ProfilePage', icon: 'contact'},
    { title: 'Gallery', component: 'GalleryPage', icon: 'images'},
    { title: 'News', component: 'NewsPage', icon: 'paper'},
    // { title: 'Family List', component: 'FamilylistPage', icon: 'people'},
    { title: 'Result', component: 'ResultPage', icon: 'document'},
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
