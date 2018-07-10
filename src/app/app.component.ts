import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NetworkProvider } from '../providers/network/network'
// import { TranslateService } from '@ngx-translate/core';
import { Nav, Platform, MenuController, Events, ToastController } from 'ionic-angular';//Config
import { FirstRunPage, HomePage } from '../pages';

import { GLOBAL } from '../app/global';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FirstRunPage;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'HomePage', icon: 'home' },
    { title: 'Results', component: 'ResultsPage', icon: 'document'},
    { title: 'About Family', component: 'AboutFamilyPage', icon: 'information-circle' },
    { title: 'Gallery', component: 'GalleryPage', icon: 'images'},
    { title: 'News', component: 'NewsPage', icon: 'paper'},
    { title: 'My Profile', component: 'MyProfilePage', icon: 'contact'},
  ]
  _user: any;
  
  constructor(
    // private translate: TranslateService, 
    platform: Platform, 
    // private config: Config, 
    public toastCtrl: ToastController,
    private events: Events, 
    private statusBar: StatusBar, 
    private menuCtrl: MenuController, 
    public networkProvider: NetworkProvider,
    private splashScreen: SplashScreen
  ) {
    if (GLOBAL.IS_LOGGEDIN){
      this.rootPage = HomePage;  
    }
    this._user = GLOBAL.USER;
    this.events.subscribe('user:loggedIn', (user) => { 
      GLOBAL.IS_LOGGEDIN = true;
      GLOBAL.USER = user;
      this._user = user; 
    });
    platform.ready().then(() => {
      
      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        let toast = this.toastCtrl.create({
          message: 'No internet connection',
          duration: 2000,
          cssClass:'toast-error',
          position: 'bottom'
        });
        toast.present();  
      });

      // Online event
      this.events.subscribe('network:online', () => {
        let toast = this.toastCtrl.create({
          message: 'Internet connection is on',
          duration: 2000,
          cssClass: 'toast-success',
          position: 'bottom'
        });
        toast.present();  
      });

      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
    // this.initTranslate();
  }

  // initTranslate() {
    // Set the default language for translation strings, and the current language.
    // this.translate.setDefaultLang('en');
    // const browserLang = this.translate.getBrowserLang();

    // if (browserLang) {
    //   if (browserLang === 'zh') {
    //     const browserCultureLang = this.translate.getBrowserCultureLang();

    //     if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
    //       this.translate.use('zh-cmn-Hans');
    //     } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
    //       this.translate.use('zh-cmn-Hant');
    //     }
    //   } else {
    //     this.translate.use(this.translate.getBrowserLang());
    //   }
    // } else {
    //   this.translate.use('en'); // Set your language here
    // }

    // this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
    //   this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    // });
  // }

  openPage(page) {
    this.nav.push(page.component);
  }

  logout() {
    GLOBAL.IS_LOGGEDIN = false;
    GLOBAL.USER = null;
    localStorage.removeItem('is_loggedin');
    this.nav.setRoot('LoginPage');
    this.menuCtrl.close();
  }
}
